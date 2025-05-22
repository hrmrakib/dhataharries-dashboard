"use client";

import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetProfileQuery } from "@/redux/feature/settingAPI";
import Loading from "./loading/Loading";

export default function DashboardHeader() {
  const pathname = usePathname();
  const { data, isLoading } = useGetProfileQuery({});

  if (isLoading) {
    return <Loading />;
  }

  if (
    pathname === "/signin" ||
    pathname === "/create-account" ||
    pathname === "/forget-password" ||
    pathname === "/verify-password" ||
    pathname === "/verify-otp" ||
    pathname === "/reset-password"
  ) {
    return null;
  }

  console.log(data);

  return (
    <header className='w-[98%] mx-auto sticky top-0 z-20 flex h-[72px] items-center justify-between bg-[#760C2A] px-4 text-white rounded md:px-6 my-6'>
      <div className='flex items-center gap-4'>
        <SidebarTrigger className='text-white md:hidden' />
        <div>
          <h1 className='text-2xl font-medium'>Welcome, {data?.full_name}</h1>
          <p className='text-sm opacity-80'>Have a nice day</p>
        </div>
      </div>

      <div className='flex items-center gap-4'>
        <Button variant='ghost' size='icon' className='relative text-white'>
          <Bell className='h-5 w-5' />
          <span className='absolute right-1 top-1 flex h-2 w-2 rounded-full bg-red-500'></span>
        </Button>

        <div className='flex items-center gap-2'>
          <Link href='/setting/personal-information'>
            <Avatar>
              <AvatarImage
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data?.profile_pic}`}
                alt={data?.full_name}
              />
              <AvatarFallback>{data?.full_name}</AvatarFallback>
            </Avatar>
          </Link>
          <span className='hidden md:inline'>{data?.full_name}</span>
        </div>
      </div>
    </header>
  );
}
