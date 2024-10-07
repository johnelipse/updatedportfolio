"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  UserCheck,
  Briefcase,
  BarChart2,
  MapPin,
  ChevronRight,
  Facebook,
  Github,
  Linkedin,
} from "lucide-react";

export default function EnhancedSidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const menuItems = [
    { href: "#name-section", icon: Home, label: "HOME" },
    { href: "#about-me", icon: UserCheck, label: "ABOUT ME" },
    { href: "#portfolio", icon: Briefcase, label: "PORTFOLIO" },
    { href: "#services", icon: BarChart2, label: "SERVICES" },
    { href: "#contact-me", icon: MapPin, label: "CONTACT ME" },
  ];

  const socialLinks = [
    {
      icon: <Facebook className="h-4 w-4" />,
      link: "/",
    },
    {
      icon: <Github className="h-4 w-4" />,
      link: "/",
    },
    {
      icon: <Linkedin className="h-4 w-4" />,
      link: "/",
    },
  ];

  return (
    <motion.aside
      className="fixed top-0 left-0 h-full sidebar-set bg-gradient-to-b from-gray-900 to-black text-white shadow-lg overflow-hidden"
      animate={{ width: isExpanded ? "250px" : "80px" }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute top-4 right-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight
          className={`transform transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </motion.div>

      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-cyan-500 opacity-75"></div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </div>

      <motion.div
        className="absolute left-1/2 top-[23%] flex flex-col items-center"
        animate={{ x: isExpanded ? "-50%" : "-30px" }}
      >
        <Image
          src="/profile2.jpg"
          alt="John"
          width={88}
          height={88}
          className="rounded-full border-4 border-white shadow-lg"
        />
        <motion.h3
          className="mt-2 text-[1rem] font-semibold"
          animate={{ opacity: isExpanded ? 1 : 0 }}
        >
          Banyweire John
        </motion.h3>
      </motion.div>

      <nav className="mt-24 p-4">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.href}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={item.href}
              className="flex items-center gap-4 py-3 px-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
            >
              <item.icon size={24} className="text-emerald-400" />
              <motion.span
                className="text-sm font-medium"
                animate={{
                  opacity: isExpanded ? 1 : 0,
                  width: isExpanded ? "auto" : 0,
                }}
              >
                {item.label}
              </motion.span>
            </Link>
          </motion.div>
        ))}
      </nav>

      <motion.footer
        className="absolute bottom-0 left-0 right-0 p-4 flex justify-center gap-4"
        animate={{ justifyContent: isExpanded ? "center" : "flex-start" }}
      >
        {socialLinks.map((link, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              {link.icon}
            </Link>
          </motion.div>
        ))}
      </motion.footer>
    </motion.aside>
  );
}
