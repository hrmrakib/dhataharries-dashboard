import type { Metadata } from "next";
import "./globals.css";

import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardHeader from "@/components/dashboard-header";
import DashboardSidebar from "@/components/dashboard-sidebar";
import Providers from "@/redux/Providers";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "DesignDoc We Simplify",
  description: "Created with",
  generator: "dev",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body upword-verified='true'>
        <Toaster position='top-center' />
        <Providers>
          <SidebarProvider>
            <div className='flex min-h-screen bg-gray-50 w-full'>
              <DashboardSidebar />
              <div className='flex-1 w-full bg-[#FFF0F4]'>
                <DashboardHeader  />
                {children}
              </div>
            </div>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
