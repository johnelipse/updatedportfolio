import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "./ui/sheet";
import { MenuIcon, SquareDashedKanban } from "lucide-react";
import Link from "next/link";

const navBtns = [
  // {
  //   icon: <Home className="h-4 w-4" />,
  //   title: "HOME",
  //   link: "#name-section",
  // },
  // {
  //   icon: <UserCheck className="h-4 w-4" />,
  //   title: "ABOUT ME",
  //   link: "#about-me",
  // },
  // {
  //   icon: <Briefcase className="h-4 w-4" />,
  //   title: "PORTFOLIO",
  //   link: "#portfolio",
  // },
  // {
  //   icon: <BarChart2 className="h-4 w-4" />,
  //   title: "SERVICES",
  //   link: "#services",
  // },
  // {
  //   icon: <MapPin className="h-4 w-4" />,
  //   title: "CONTACT ME",
  //   link: "#contact-me",
  // },
  {
    icon: <SquareDashedKanban className="h-4 w-4" />,
    title: "DASHBOARD",
    link: "/dashboard",
  },
];

export default function Header() {
  return (
    <header className="bg-transparent backdrop-blur-md shadow-md fixed top-0 left-0 w-full z-50 lg:hidden md:hidden block">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-bg-gray-950"
            >
              <MenuIcon className="h-5 w-5 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="bg-gray-950">
            {navBtns.map((btn, i) => {
              return (
                <SheetClose key={i} asChild>
                  <Link
                    className={`flex items-center gap-3 space-x-3 px-3 py-2 rounded-lg transition duration-150 ease-in-out hover:bg-gray-700 text-white focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-50`}
                    href={btn.link}
                  >
                    {btn.icon}
                    {btn.title}
                  </Link>
                </SheetClose>
              );
            })}
            <SheetFooter></SheetFooter>
          </SheetContent>
        </Sheet>
        <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Banyweire
        </h1>
      </div>
    </header>
  );
}
