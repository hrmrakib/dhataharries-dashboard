"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import BlogCard from "./blog-card";
import {
  useDeleteBlogMutation,
  useGetBlogDataQuery,
} from "@/redux/feature/blogAPI";
import Loading from "./loading/Loading";
import Image from "next/image";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreVertical } from "lucide-react";

interface BlogPost {
  id: string;
  author: string;
  title: string;
  content: string;
  avatar: string;
  isDeleted: boolean;
}
interface IBlog {
  id: number;
  title: string;
  author: number;
  author_name: string;
  created_at: string;
  description?: string; // Optional
  image?: string; // Optional
}

// Sample data
const BLOGS_PER_PAGE = 8;
const INITIAL_BLOGS: BlogPost[] = Array(24)
  .fill(null)
  .map((_, i) => ({
    id: i.toString(),
    author: "Dr. Jane Nicholson",
    title: "Leading Diagnostic Doctor",
    content:
      "I was 29, chasing dreams and designing a future I could touch with my own hands, when everything changed. It started with a strange numbness in my fingers, then a crushing fatigue that no amount of sleep could cure.",
    avatar: `/user1.jpg`,
    isDeleted: i % 7 === 0, // Mark some as deleted for demo
  }));

export default function BlogGrid() {
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const [expanded, setExpanded] = useState(false);

  const { data, isLoading, refetch } = useGetBlogDataQuery({});
  const [deleteBlog] = useDeleteBlogMutation({});

  if (isLoading) {
    return <Loading />;
  }

  // Filter blogs based on active tab
  const filteredBlogs = blogs.filter((blog) =>
    activeTab === "all"
      ? true
      : activeTab === "deleted"
      ? blog.isDeleted
      : !blog.isDeleted
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);
  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * BLOGS_PER_PAGE,
    currentPage * BLOGS_PER_PAGE
  );

  // Handle delete/restore
  const handleToggleDelete = (id: string) => {
    setBlogs(
      blogs.map((blog) =>
        blog.id === id ? { ...blog, isDeleted: !blog.isDeleted } : blog
      )
    );
  };

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
                    fill
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

      {totalPages > 1 && data.length > 12 && (
        <div className='mt-8 flex justify-center'>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href='#'
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href='#'
                    isActive={currentPage === i + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(i + 1);
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href='#'
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages)
                      setCurrentPage(currentPage + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
