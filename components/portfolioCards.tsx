/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Contact, ExternalLink, Github } from "lucide-react";
import { fetchProjects } from "@/Actions/ProjectActions";
import Link from "next/link";
import { useProjects } from "@/hooks/useProjects";
import { Project } from "@prisma/client";
import ProjectSkeleton from "./skeleton-loader";

export type ProjectProps = {
  title: string;
  description: string;
  id?: string;
  slug: string;
  gitLink: string;
  liveLink: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: string;
};

export default function PortfolioCards() {
  const { projects, isLoading } = useProjects();
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function getLatestNews(initialProjects: Project[]) {
    // Step 1: Sort the articles by date
    const sortedProject = initialProjects.sort((a: any, b: any) => {
      const dateA: any = new Date(a.createdAt);
      const dateB: any = new Date(b.createdAt);
      return dateB - dateA; // This sorts from newest to oldest
    });

    // Step 2: Get the first 4 articles
    const latestProject = sortedProject.slice(0, 3);

    return latestProject;
  }
  const finalProjects = getLatestNews(projects);
  if (isLoading) {
    return <ProjectSkeleton />;
  }
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={staggerChildren}
      initial="initial"
      animate="animate"
    >
      {finalProjects.map((project) => {
        return (
          <motion.div
            key={project.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300"
            variants={fadeInUp}
          >
            <Image
              src={project.imageUrl}
              alt="me"
              width={400}
              height={225}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p>{project.description}</p>
              <div className="flex justify-between mt-4">
                <Link
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 flex items-center transition duration-300"
                >
                  <ExternalLink size={16} className="mr-1" /> Live
                </Link>
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
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
