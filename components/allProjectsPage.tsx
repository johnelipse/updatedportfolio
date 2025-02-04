"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Contact } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@prisma/client";

export type ProjectProps = {
  title: string;
  description: string;
  id?: string;
  slug: string;
  gitLink?: string | undefined;
  liveLink: string;
  imageUrl: string;
};

export default function ProjectsPage({ projects }: { projects: Project[] }) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateCursorPosition);
    return () => window.removeEventListener("mousemove", updateCursorPosition);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden relative">
      <div className="absolute inset-0 bg-[#131418ff]" />
      <div className="relative z-10 min-h-screen flex flex-col bg-black bg-opacity-80">
        <motion.div
          className="fixed w-6 h-6 rounded-full bg-white opacity-50 pointer-events-none z-50"
          style={{
            x: cursorPosition.x - 12,
            y: cursorPosition.y - 12,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
        <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-black bg-opacity-90 border-gray-800 overflow-hidden group">
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      width={400}
                      height={225}
                      className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardContent className="py-2 px-4">
                    <h2 className="text-2xl font-semibold mb-2 text-white">
                      {project.title}
                    </h2>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                  </CardContent>
                  <CardFooter className="bg-transparent  border-t border-gray-800 px-4 py-2 flex justify-between">
                    {project.gitLink ? (
                      <Link
                        href={project.gitLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 flex items-center transition duration-300"
                      >
                        <Github size={16} className="mr-1" /> GitHub
                      </Link>
                    ) : (
                      <Link
                        href="https://wa.me/message/AAMYVSAYB4YOC1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 flex items-center transition duration-300"
                      >
                        <Contact size={16} className="mr-1" /> Contact Developer
                      </Link>
                    )}
                    <Link
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <ExternalLink size={20} />
                      <span>go live</span>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
