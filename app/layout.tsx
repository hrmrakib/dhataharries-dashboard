import type { Metadata } from "next";
import "./globals.css";

import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardHeader from "@/components/dashboard-header";
import DashboardSidebar from "@/components/dashboard-sidebar";

export const metadata: Metadata = {
  title: "DesignDoc We Simplify",
  description: "Created with",
  generator: "dev",
};

const username = "Arjun";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body upword-verified='true'>
        <SidebarProvider>
          <div className='flex min-h-screen bg-gray-50 w-full'>
            <DashboardSidebar />
            <div className='flex-1 w-full'>
              <DashboardHeader username={username} />
              {children}
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}

// import type { Metadata } from "next";
// import "./globals.css";

// import { useState } from "react";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import DashboardHeader from "@/components/dashboard-header";
// import DashboardSidebar from "@/components/dashboard-sidebar";

// export const metadata: Metadata = {
//   title: "DesignDoc We Simplify",
//   description: "Created with",
//   generator: "dev",
// };
// const username = "Arjun";

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang='en'>
//       <body upword-verified='true'>
//         <SidebarProvider>
//           <div className='flex min-h-screen bg-gray-50 w-full'>
//             <DashboardSidebar />
//             <div className='flex-1 w-full'>
//               <DashboardHeader username={username} />
//               {children}
//             </div>
//           </div>
//         </SidebarProvider>
//       </body>
//     </html>
//   );
// }
