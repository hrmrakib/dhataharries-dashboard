"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  useGetASingleMSPostQuery,
  useUpdateMSPostMutation,
} from "@/redux/feature/msPostAPI";
import Loading from "@/components/loading/Loading";
import { toast } from "sonner";

export default function EditPost() {
  const router = useRouter();
  const [post, setPost] = useState({
    title: "What Does The 2025 Spring Statement Mean For People MS?",
    description:
      "Key Proposals include Tightening Eligibility Criteria For Personal Independence Payment (PIP) From November 2026. Claimants Will Need To Score At Least Four Points On A Single Daily Living Activity To Qualify For The Daily Living Component, Potentially Reducing Support For Those With Fluctuating Conditions Like MS.",
    image: "/post.jpg",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const params = useParams();

  const [updateMSPost] = useUpdateMSPostMutation();
  const { data, isLoading: isPostLoading } = useGetASingleMSPostQuery(
    (params.edit as string) || ""
  );

  useEffect(() => {
    if (data) {
      setPost({
        title: data?.title,
        description: data?.description,
        image: data?.image || "/placeholder.svg",
      });
    }
  }, [data]);

  if (isPostLoading) {
    return <Loading />;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();

    formData.append("title", post.title);
    formData.append("description", post.description);
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await updateMSPost({
        id: (params.edit as string) || "",
        data: formData,
      });

      if (res?.data) {
        toast.success("Post updated successfully!");
        router.push("/ms-post");
      } else {
        toast.error("Failed to create post");
      }
    } catch (error) {
      toast.error("Error creating post:");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-pink-50 p-4 md:p-8'>
      <div className='max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6'>
        <h1 className='text-2xl text-[#760C2A] font-bold mb-6'>Edit Post</h1>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-2'>
            <label
              htmlFor='title'
              className='block text-lg font-medium text-[#760C2A]'
            >
              Title
            </label>
            <input
              type='text'
              id='title'
              name='title'
              value={post?.title}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500'
              required
            />
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='content'
              className='block text-lg font-medium text-[#760C2A]'
            >
              Content
            </label>
            <textarea
              id='description'
              name='description'
              value={post?.description}
              onChange={handleChange}
              rows={6}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500'
              required
            />
          </div>

          <div className='space-y-2'>
            <label className='block text-lg font-medium text-[#760C2A]'>
              Current Image
            </label>
            <div className='relative h-48 w-full'>
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt='Post image'
                  fill
                  className='object-cover rounded-md'
                />
              ) : (
                <Image
                  src={post?.image || "/post.jpg"}
                  alt='Post image'
                  fill
                  className='object-cover rounded-md'
                />
              )}
            </div>
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='image'
              className='block text-lg font-medium text-[#760C2A]'
            >
              Upload New Image
            </label>
            <input
              type='file'
              id='image'
              onChange={handleImageChange}
              name='image'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500'
            />
          </div>

          <div className='flex gap-4 justify-end'>
            <Link
              href='/'
              className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'
            >
              Cancel
            </Link>
            <button
              type='submit'
              className='px-4 py-2 bg-red-900 text-white rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
