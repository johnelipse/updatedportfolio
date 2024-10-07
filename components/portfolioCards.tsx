import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

export default function PortfolioCards() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={staggerChildren}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300"
        variants={fadeInUp}
      >
        <Image
          src="/profile2.jpg"
          alt="me"
          width={400}
          height={225}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">thanks</h3>
          <div className="flex justify-between mt-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 flex items-center transition duration-300"
            >
              <ExternalLink size={16} className="mr-1" /> Live
            </a>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 flex items-center transition duration-300"
            >
              <Github size={16} className="mr-1" /> GitHub
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
