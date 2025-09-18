"use client";

import Image from "next/image";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

import {
  useDeleteMSPostMutation,
  useGetMSPostQuery,
} from "@/redux/feature/msPostAPI";
import Loading from "@/components/loading/Loading";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
}

export default function Home() {
  const { data, isLoading } = useGetMSPostQuery(undefined);
  const [deleteMSPost] = useDeleteMSPostMutation({});

  if (isLoading) {
    return <Loading />;
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      await deleteMSPost(id).unwrap();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <main className='min-h-screen bg-pink-50 p-4 md:p-8'>
      <div className='w-full mx-auto'>
        {/* Header with Add Post button */}
        <div className='flex justify-end mb-6'>
          <Link
            href='/ms-post/create'
            className='flex items-center gap-2 bg-red-900 hover:bg-red-800 text-white px-4 py-2 rounded-full transition-colors'
          >
            <PlusIcon size={16} />
            <span>Add Post</span>
          </Link>
        </div>

        {/* Blog posts grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {data?.map((post: BlogPost) => (
            <div
              key={post.id}
              className='bg-white rounded-lg overflow-hidden shadow-sm'
            >
              <div className='relative max-h-48 w-full'>
                <Image
                  src={post?.image}
                  alt={post.title}
                  width={600}
                  height={400}
                  className='object-cover h-48 w-full'
                />
              </div>
              <div className='p-4 flex flex-col'>
                <h2 className='text-2xl text-[#2C383C] font-semibold mb-2 hover:underline'>
                  <Link href={`/posts/${post.id}`}>{post?.title}</Link>
                </h2>
                <p className='text-sm text-[#727A7C] mb-4 line-clamp-4 flex-1'>
                  {post?.description}
                </p>
                <div className='flex justify-between'>
                  <Link
                    href={`/ms-post/${post.id}`}
                    className='inline-block border border-red-900 text-[#FFFFFF] hover:text-red-900 bg-[#760C2A] hover:bg-transparent px-6 py-2 rounded-md text-sm transition-colors'
                  >
                    Edit Post
                  </Link>

                  <button
                    onClick={() => handleDelete(post.id)}
                    className='inline-block border border-red-500 text-[#FFFFFF] hover:text-red-900 bg-[#fa2e68] hover:bg-transparent px-6 py-2 rounded-md text-sm transition-colors'
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
