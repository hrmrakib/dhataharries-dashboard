"use client";

import type React from "react";

import Link from "next/link";
import {
  LayoutDashboard,
  DollarSign,
  Users,
  Ticket,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import LogoutModal from "./logout-modal";
import { useState } from "react";

export default function DashboardSidebar() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    // Perform logout actions here (clear tokens, etc.)
    console.log("User logged out");
    // Redirect to login page
    router.push("/login");
  };

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

  return (
    <>
      <div className='!bg-white md:!bg-transparent'>
        <Sidebar className='border-r border-gray-200 fixed left-0 h-full z-30 !bg-white md:!bg-transparent'>
          <SidebarContent>
            <div className='flex items-center gap-2 px-4 py-6'>
              <Image
                src='/logo.png'
                alt='logo'
                width={190}
                height={190}
                className=''
              />
            </div>

            <SidebarMenu className='px-6 space-y-4'>
              <NavItem
                href='/'
                icon={LayoutDashboard}
                label='Dashboard'
                active={pathname === "/"}
              />
              <NavItem
                href='/earning'
                icon={DollarSign}
                label='Earning'
                active={
                  pathname === "/earning" || pathname.startsWith("/earning/")
                }
              />
              <NavItem
                href='/users'
                icon={Users}
                label='Users'
                active={pathname === "/users" || pathname.startsWith("/users/")}
              />
              <NavItem
                href='/subscription'
                icon={Ticket}
                label='Subscription'
                active={
                  pathname === "/subscription" ||
                  pathname.startsWith("/subscription/")
                }
              />
              <NavItem
                href='/setting'
                icon={Settings}
                label='Setting'
                active={
                  pathname === "/setting" || pathname.startsWith("/setting/")
                }
              />
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className='p-6'>
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className='flex w-full items-center gap-3 bg-[#F99F04] px-4 py-3 text-white hover:bg-[#f99f04d2]'
            >
              <svg
                width='25'
                height='24'
                viewBox='0 0 25 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M17.5 16L21.5 12M21.5 12L17.5 8M21.5 12L7.5 12M13.5 16V17C13.5 18.6569 12.1569 20 10.5 20H6.5C4.84315 20 3.5 18.6569 3.5 17V7C3.5 5.34315 4.84315 4 6.5 4H10.5C12.1569 4 13.5 5.34315 13.5 7V8'
                  stroke='#FAFAFA'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>

              <span>Log out</span>
            </button>
          </SidebarFooter>
        </Sidebar>
        <LogoutModal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          onConfirm={handleLogout}
        />
      </div>
    </>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
}

function NavItem({ href, icon: Icon, label, active }: NavItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link
          href={href}
          className={cn(
            "flex items-center gap-3 px-4 py-2 transition-colors rounded-full",
            active
              ? "bg-[#20474E] text-white"
              : "text-gray-700 hover:bg-gray-100"
          )}
        >
          <Icon size={18} />
          <span
            className={`text-lg text-primary ${active ? "text-white" : ""}`}
          >
            {label}
          </span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
