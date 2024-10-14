import { Inter } from "next/font/google";
import Sidebar from "@/components/back/side-bar";
import HeaderComp from "@/components/back/header";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} bg-black/5 min-h-screen flex flex-col`}>
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <HeaderComp />
      </div>

      {/* Main content */}
      <div className="flex-grow flex pt-[60px]">
        {" "}
        {/* Adjust top padding to account for fixed header */}
        {/* Sidebar for larger screens */}
        <aside className="fixed top-[50px] left-0 bottom-0 bg-white/60 backdrop-blur-md w-64 flex-shrink-0 hidden md:block border-r shadow-md overflow-y-auto">
          <Sidebar />
        </aside>
        {/* Page content */}
        <main className="flex-grow p-6 overflow-auto md:ml-64">{children}</main>
      </div>
    </div>
  );
}
