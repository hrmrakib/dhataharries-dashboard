"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCreatePostMutation } from "@/redux/feature/uploadSeriesAPI";

interface FormData {
  author_name: string;
  title: string;
  description: string;
  youtube_link: string;
}

interface FormErrors {
  author_name?: string;
  title?: string;
  description?: string;
  youtube_link?: string;
}

export default function CreatePostForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    author_name: "",
    title: "",
    description: "",
    youtube_link: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();
  const [createPost] = useCreatePostMutation();

  const validateYouTubeUrl = (url: string): boolean => {
    if (!url) return true; // Optional field
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return youtubeRegex.test(url);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (formData.youtube_link && !validateYouTubeUrl(formData.youtube_link)) {
      newErrors.youtube_link = "Please enter a valid YouTube URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      const res = await createPost({
        title: formData.title,
        author_name: formData.author_name,
        video_url: formData.youtube_link,
        description: formData.description,
      }).unwrap();

      console.log("submitted:", res);

      toast({
        title: "✅ Success!",
        description: "Your post has been created successfully.",
      });

      // Reset form
      setFormData({
        author_name: "",
        title: "",
        description: "",
        youtube_link: "",
      });
      setErrors({});
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='container mx-auto space-y-6 sm:space-y-8'
      >
        <div className='flex items-center mb-6 gap-5'>
          <button type='button' onClick={() => router.back()}>
            <ArrowLeft />
          </button>
          <h2 className='text-2xl font-semibold'>Create Post</h2>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='title' className='text-lg font-medium'>
            Title <span className='text-destructive'>*</span>
          </Label>
          <Input
            id='title'
            name='title'
            type='text'
            placeholder='Enter your post title'
            value={formData.title}
            onChange={handleChange}
            className={`h-11 ${errors.title ? "border-destructive" : ""}`}
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && (
            <p id='title-error' className='text-sm text-destructive'>
              {errors.title}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='description' className='text-lg font-medium'>
            Description <span className='text-destructive'>*</span>
          </Label>
          <Textarea
            id='description'
            name='description'
            placeholder='Write your post description...'
            value={formData.description}
            onChange={handleChange}
            rows={8}
            className={`resize-none ${
              errors.description ? "border-destructive" : ""
            }`}
            aria-invalid={!!errors.description}
            aria-describedby={
              errors.description ? "description-error" : undefined
            }
          />
          {errors.description && (
            <p id='description-error' className='text-sm text-destructive'>
              {errors.description}
            </p>
          )}
          <p className='text-sm text-muted-foreground'>
            {formData.description.length} characters
          </p>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='youtube_link' className='text-lg font-medium'>
            YouTube Link{" "}
          </Label>
          <Input
            id='youtube_link'
            name='youtube_link'
            type='url'
            placeholder='https://youtube.com/watch?v=...'
            value={formData.youtube_link}
            onChange={handleChange}
            className={`h-11 ${
              errors.youtube_link ? "border-destructive" : ""
            }`}
            aria-invalid={!!errors.youtube_link}
            aria-describedby={errors.youtube_link ? "youtube-error" : undefined}
          />
          {errors.youtube_link && (
            <p id='youtube-error' className='text-sm text-destructive'>
              {errors.youtube_link}
            </p>
          )}
        </div>

        <div className='space-y-2 w-full'>
          <Label htmlFor='title' className='text-lg font-medium'>
            Author <span className='text-destructive'>*</span>
          </Label>
          <Input
            id='title'
            name='author_name'
            type='text'
            placeholder='Enter your name'
            value={formData.author_name}
            onChange={handleChange}
            className={`h-11 ${errors.author_name ? "border-destructive" : ""}`}
            aria-invalid={!!errors.author_name}
            aria-describedby={errors.author_name ? "title-error" : undefined}
          />
          {errors.author_name && (
            <p id='title-error' className='text-sm text-destructive'>
              {errors.author_name}
            </p>
          )}
        </div>

        <div className='flex flex-col gap-3 pt-2 sm:flex-row sm:gap-4'>
          <Button
            type='submit'
            disabled={isSubmitting}
            className='h-11 flex-1 sm:flex-none sm:px-8'
          >
            {isSubmitting ? "Publishing..." : "Publish Post"}
          </Button>
          <Button
            type='button'
            variant='outline'
            onClick={() => {
              setFormData({
                author_name: "",
                title: "",
                description: "",
                youtube_link: "",
              });
              setErrors({});
            }}
            disabled={isSubmitting}
            className='h-11 flex-1 sm:flex-none sm:px-8'
          >
            Clear
          </Button>
        </div>
      </form>
      <Toaster />
    </>
  );
}
