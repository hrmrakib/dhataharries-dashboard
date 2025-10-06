"use client";

import {
  useState,
  useRef,
  type ChangeEvent,
  type FormEvent,
  type DragEvent,
  useEffect,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import {
  useGetBlogDataByIdQuery,
  useUpdatePostMutation,
} from "@/redux/feature/blogAPI";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

interface FormData {
  title: string;
  description: string;
  image?: File | null;
}

interface FormErrors {
  title?: string;
  description?: string;
  image?: string;
}

export default function PostUpdateForm() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    image: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const params = useParams();
  const { data: post } = useGetBlogDataByIdQuery(params.id as string);
  const [updatePostMutation] = useUpdatePostMutation();

  useEffect(() => {
    if (post?.data) {
      setFormData({
        title: post?.data?.title,
        description: post?.data?.description,
        // image: null,
      });
      setImagePreview(post?.data?.image);
    }
  }, [post?.data]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    } else if (formData.title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    } else if (formData.description.length > 1000) {
      newErrors.description = "Description must be less than 1000 characters";
    }

    if (!formData.image) {
      newErrors.image = "Image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (file: File) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, image: "Please upload an image file" }));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: "Image size must be less than 5MB",
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, image: file }));
    setErrors((prev) => ({ ...prev, image: undefined }));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageChange(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleImageChange(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!validateForm()) {
    //   toast({
    //     title: "Validation Error",
    //     description: "Please fix the errors in the form",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    setIsSubmitting(true);

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);

      if (formData.image instanceof File) {
        form.append("image", formData.image);
      }

      const res = await updatePostMutation({
        id: params.id as string,
        data: form,
      }).unwrap();

      if (res.id) {
        toast.success("Post updated successfully!");
        router.push(`/users-stories`);
      }
    } catch (error) {
      toast.error("Failed to update post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className='max-w-5xl mx-auto border-border bg-card shadow-lg mb-12'>
      <CardContent className='p-6 md:p-8'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Title Field */}
          <div className='space-y-2'>
            <Label
              htmlFor='title'
              className='text-sm font-medium text-card-foreground'
            >
              Post Title
            </Label>
            <Input
              id='title'
              type='text'
              placeholder='Enter your post title...'
              value={formData.title}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, title: e.target.value }));
                // setErrors((prev) => ({ ...prev, title: undefined }));
              }}
              className={`${
                errors.title
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }`}
              disabled={isSubmitting}
            />
            {errors.title && (
              <p className='text-sm text-destructive'>{errors.title}</p>
            )}
            {/* <p className='text-xs text-muted-foreground'>
              {formData.title.length}/100 characters
            </p> */}
          </div>

          {/* Description Field */}
          <div className='space-y-2'>
            <Label
              htmlFor='description'
              className='text-sm font-medium text-card-foreground'
            >
              Description
            </Label>
            <Textarea
              id='description'
              placeholder='Write a detailed description of your post...'
              value={formData.description}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
                // setErrors((prev) => ({ ...prev, description: undefined }));
              }}
              className={`min-h-[150px] resize-none ${
                errors.description
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }`}
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className='text-sm text-destructive'>{errors.description}</p>
            )}
            {/* <p className='text-xs text-muted-foreground'>
              {formData.description.length}/1000 characters
            </p> */}
          </div>

          {/* Image Upload Field */}
          <div className='space-y-2'>
            <Label className='text-sm font-medium text-card-foreground'>
              Post Image
            </Label>

            {!imagePreview ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors md:p-12 ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : errors.image
                    ? "border-destructive bg-destructive/5"
                    : "border-border bg-muted/30 hover:bg-muted/50"
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  onChange={handleFileInputChange}
                  className='hidden'
                  disabled={isSubmitting}
                />
                <div className='flex flex-col items-center gap-3 text-center'>
                  <div className='rounded-full bg-primary/10 p-4'>
                    <Upload className='h-6 w-6 text-primary md:h-8 md:w-8' />
                  </div>
                  <div className='space-y-1'>
                    <p className='text-sm font-medium text-card-foreground md:text-base'>
                      Click to upload or drag and drop
                    </p>
                    <p className='text-xs text-muted-foreground md:text-sm'>
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className='relative overflow-hidden rounded-lg border border-border bg-muted/30'>
                <div className='relative aspect-video w-full'>
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt='Preview'
                    className='h-full w-full object-cover'
                  />
                </div>
                <div className='flex items-center justify-between gap-4 p-4'>
                  <div className='flex items-center gap-3'>
                    <div className='rounded-md bg-primary/10 p-2'>
                      <ImageIcon className='h-5 w-5 text-primary' />
                    </div>
                    <div className='min-w-0 flex-1'>
                      <p className='truncate text-sm font-medium text-card-foreground'>
                        {formData.image?.name}
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        {formData.image &&
                          (formData.image.size / 1024).toFixed(2)}{" "}
                        KB
                      </p>
                    </div>
                  </div>
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    onClick={handleRemoveImage}
                    disabled={isSubmitting}
                    className='shrink-0 hover:bg-destructive/10 hover:text-destructive'
                  >
                    <X className='h-5 w-5' />
                    <span className='sr-only'>Remove image</span>
                  </Button>
                </div>
              </div>
            )}

            {errors.image && (
              <p className='text-sm text-destructive'>{errors.image}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className='flex flex-col gap-3 pt-4 sm:flex-row sm:justify-end'>
            <Button
              type='button'
              variant='outline'
              className='w-full sm:w-auto bg-transparent'
              onClick={() => {
                setFormData({ title: "", description: "", image: null });
                setImagePreview(null);
                setErrors({});
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              className='w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto'
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Updating...
                </>
              ) : (
                "Update Post"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
