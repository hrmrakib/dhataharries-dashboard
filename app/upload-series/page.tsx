"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, ArrowLeft, Pencil, Trash2, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetUploadSeriesQuery } from "@/redux/feature/uploadSeriesAPI";

// ✅ Define Post type
export interface Post {
  id: number;
  author: number;
  author_name: string;
  title: string;
  video_url: string;
  description: string;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

// ✅ PostCard Component
function PostCard({
  post,
  onEdit,
  onDelete,
}: {
  post: Post;
  onEdit: (id: string | number) => void;
  onDelete: (id: string | number) => void;
}) {
  const getYouTubeEmbedUrl = (url: string): string | null => {
    if (!url) return null;
    const videoIdMatch = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/
    );
    return videoIdMatch
      ? `https://www.youtube.com/embed/${videoIdMatch[1]}`
      : null;
  };

  const embedUrl = getYouTubeEmbedUrl(post.video_url ?? "");

  console.log("post card", post);

  return (
    <Card className='flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg'>
      <CardHeader className='space-y-2 pb-4'>
        <CardTitle className='text-balance text-xl font-semibold leading-tight sm:text-2xl'>
          {post.title}
        </CardTitle>
        <p className='text-sm text-muted-foreground'>
          {new Date(post.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </CardHeader>

      <CardContent className='flex-1 space-y-4 pb-4'>
        <p className='text-pretty text-sm leading-relaxed text-foreground/90 sm:text-base'>
          {post.description}
        </p>

        {embedUrl && (
          <div className='aspect-video w-full overflow-hidden rounded-lg border bg-muted'>
            <iframe
              src={embedUrl}
              title={post.title}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              className='h-full w-full'
            />
          </div>
        )}

        {post.video_url && !embedUrl && (
          <a
            href={post.video_url}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 text-sm text-primary hover:underline'
          >
            Watch on YouTube
            <ExternalLink className='h-4 w-4' />
          </a>
        )}
      </CardContent>

      <CardFooter className='flex gap-2 border-t bg-muted/30 pt-4'>
        <Button
          onClick={() => onEdit(post.id)}
          variant='outline'
          size='sm'
          className='flex-1 gap-2'
        >
          <Pencil className='h-4 w-4' />
          Edit
        </Button>
        <Button
          onClick={() => onDelete(post.id)}
          variant='destructive'
          size='sm'
          className='flex-1 gap-2'
        >
          <Trash2 className='h-4 w-4' />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

// ✅ Posts Page with Pagination
export default function PostsPage() {
  const [deletePostId, setDeletePostId] = useState<string | number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 3;

  const router = useRouter();
  const { toast } = useToast();
  const { data: series } = useGetUploadSeriesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  console.log(series?.data, "upload series data");

  const handleEdit = (id: string | number) => {
    router.push(`/upload-series/create-post?edit=${id}`);
  };

  const handleDeleteConfirm = () => {
    if (deletePostId) {
      setDeletePostId(0);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(series?.data?.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = series?.data?.slice(
    startIndex,
    startIndex + postsPerPage
  );

  return (
    <main className='min-h-screen bg-background'>
      <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:py-16'>
        <div className='mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl'>
              All Posts
            </h1>
            <p className='mt-3 text-pretty text-base text-muted-foreground sm:mt-4 sm:text-lg'>
              Browse and manage your blog posts
            </p>
          </div>
          <div className='flex gap-3'>
            <Button
              asChild
              variant='outline'
              size='lg'
              className='gap-2 bg-transparent'
            >
              <Link href='/'>
                <ArrowLeft className='h-4 w-4' />
                Home
              </Link>
            </Button>
            <Button asChild size='lg' className='gap-2'>
              <Link href='/upload-series/create-post'>
                <Plus className='h-4 w-4' />
                New Post
              </Link>
            </Button>
          </div>
        </div>

        {series?.data?.length === 0 ? (
          <div className='flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/30 px-4 py-12'>
            <h2 className='text-balance text-xl font-medium text-foreground sm:text-2xl'>
              No posts yet
            </h2>
            <p className='mt-2 text-pretty text-center text-muted-foreground'>
              Create your first post to get started
            </p>
            <Button asChild size='lg' className='mt-6 gap-2'>
              <Link href='/upload-series/create-post'>
                <Plus className='h-4 w-4' />
                Create Post
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {series?.data?.map((post: Post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onEdit={handleEdit}
                  onDelete={(id) => setDeletePostId(id)}
                />
              ))}
            </div>

            {/* Pagination buttons */}
            <div className='mt-10 flex justify-center gap-4'>
              <Button
                variant='outline'
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Previous
              </Button>
              <span className='text-sm text-muted-foreground'>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant='outline'
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={!!deletePostId}
        onOpenChange={(open) => !open && setDeletePostId(0)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
