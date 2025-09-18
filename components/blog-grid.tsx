"use client";

import { useState } from "react";

import {
  useDeleteBlogMutation,
  useGetBlogDataQuery,
} from "@/redux/feature/blogAPI";
import Loading from "./loading/Loading";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreVertical } from "lucide-react";

interface IBlog {
  id: number;
  title: string;
  author: number;
  author_name: string;
  created_at: string;
  description?: string;
  image?: string;
}

export default function BlogGrid() {
  const [expanded, setExpanded] = useState(false);
  const { data, isLoading, refetch } = useGetBlogDataQuery({});
  const [deleteBlog] = useDeleteBlogMutation({});

  if (isLoading) {
    return <Loading />;
  }

  const handleBlogDelete = async (id: number | string) => {
    const res = await deleteBlog(id);
    if (res.error) {
    } else {
      refetch();
    }
  };

  return (
    <div className='w-full containe mx-auto'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
        {data.map((blog: IBlog) => (
          <div className='bg-white rounded-lg p-6 relative'>
            <div className='flex justify-between items-start mb-4'>
              <div className='flex items-center'>
                <div className='relative h-16 w-16 rounded-full overflow-hidden'>
                  <Image
                    src={blog.image || "/placeholder.svg"}
                    alt={`author`}
                    width={600}
                    height={600}
                    className='object-cover'
                  />
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' size='icon' className='h-8 w-8'>
                    <MoreVertical className='h-4 w-4' />
                    <span className='sr-only'>Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem onClick={() => handleBlogDelete(blog.id)}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className='space-y-1'>
              <h3 className='font-bold text-lg'>{blog.author_name}</h3>
              <p className='text-base font-medium text-[#566063]'>
                {blog?.title}
              </p>
              <p className='text-sm mt-2'>
                {expanded
                  ? blog?.description
                  : `${blog?.description?.substring(0, 120)}...`}
                <button
                  onClick={() => setExpanded(!expanded)}
                  className='text-gray-500 ml-1 hover:text-gray-700'
                >
                  {expanded ? "less" : "more"}
                </button>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
