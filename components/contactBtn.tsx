"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Circle, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function ContactComp() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="https://wa.me/message/AAMYVSAYB4YOC1"
      className="fixed bottom-8 right-6 z-50"
    >
      <motion.div
        className="bg-[#25D366] relative rounded-full shadow-lg overflow-hidden flex items-center cursor-pointer"
        initial={{ width: "60px", height: "60px" }}
        animate={{
          width: isHovered ? "240px" : "60px",
          height: "60px",
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="flex items-center w-full">
          <div className="flex-shrink-0 w-[60px] h-[60px] flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <motion.div
            className="flex items-center ml-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            <div className="mr-3">
              <p className="text-white font-semibold">Chat with John</p>
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white">
              <Image
                src="/john.png"
                alt="John's profile"
                width={800}
                height={800}
                className="object-cover w-10 h-10 rounded-full"
              />
            </div>
          </motion.div>
        </div>
        <Circle className="w-3 h-3 absolute top-[5%] bg-white animate-ping" />
      </motion.div>
    </Link>
  );
}
