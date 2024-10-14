"use client";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FolderIcon,
  GithubIcon,
  Home,
  LinkedinIcon,
  Settings,
  TwitterIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const navBtns = [
  {
    icon: <Home className="h-4 w-4" />,
    title: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: <FolderIcon className="h-4 w-4" />,
    title: "Projects",
    link: "/projects",
  },
];
const socialBtns = [
  {
    icon: <GithubIcon className="h-4 w-4" />,
    title: " GitHub",
    link: "/",
  },
  {
    icon: <LinkedinIcon className="h-4 w-4" />,
    title: " LinkedIn",
    link: "/",
  },
  {
    icon: <TwitterIcon className="h-4 w-4" />,
    title: "Twitter",
    link: "/",
  },
];

export default function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isActive = pathname === `/settings/${session?.user?.id}`;
  return (
    <ScrollArea className="h-full py-4 bg-white/60 backdrop-blur-sm">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold">Navigation</h2>
        <div className="space-y-1">
          {navBtns.map((btn, i) => {
            const isActive = pathname === btn.link;
            return (
              <Link
                key={i}
                className={`flex items-center gap-3 space-x-3 px-3 py-2 rounded-lg transition duration-150 ease-in-out ${
                  isActive
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                } focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-50`}
                href={btn.link}
              >
                {btn.icon}
                {btn.title}
              </Link>
            );
          })}
          <Link
            className={`flex items-center gap-3 space-x-3 px-3 py-2 rounded-lg transition duration-150 ease-in-out ${
              isActive
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:bg-gray-700 hover:text-white"
            } focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-50`}
            href={`/settings/${session?.user?.id}`}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </div>
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold">Social</h2>
        <div className="space-y-1">
          {socialBtns.map((socialBtn, i) => {
            return (
              <Link
                key={i}
                className={`flex items-center gap-3 space-x-3 px-3 py-2 rounded-lg transition duration-150 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-50 hover:bg-gray-700 hover:text-white`}
                href={socialBtn.link}
              >
                {socialBtn.icon}
                {socialBtn.title}
              </Link>
            );
          })}
        </div>
      </div>
    </ScrollArea>
  );
}
