"use server";

import { db } from "@/lib/db";
// import { ProjectProps } from "@/types/type";
import { revalidatePath } from "next/cache";

export type ProjectProps = {
  title: string;
  description: string;
  id?: string;
  slug: string;
  gitLink?: string | undefined;
  liveLink: string;
  imageUrl: string;
};

export default async function addProject(data: ProjectProps) {
  try {
    const { title, description, slug, gitLink, liveLink, imageUrl } = data;
    const newProject = await db.project.create({
      data: { title, description, slug, gitLink, liveLink, imageUrl },
    });
    revalidatePath("/all-projects");
    revalidatePath("/");
    return newProject;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchProjects() {
  try {
    const fetchedProjects = await db.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return fetchedProjects;
  } catch (error) {
    console.log(error);
  }
}

export async function getSingleProject(id: string) {
  try {
    const fetchedProject = await db.project.findUnique({
      where: {
        id,
      },
    });
    return fetchedProject;
  } catch (error) {
    console.log(error);
  }
}

export async function editProject(data: ProjectProps, id: string) {
  // console.log(id, data);
  try {
    const updatedProject = await db.project.update({
      where: {
        id,
      },

      data,
    });
    return updatedProject;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProject({ id }: { id: string }) {
  try {
    const deletedProject = await db.project.delete({
      where: {
        id,
      },
    });
    return deletedProject;
  } catch (error) {
    console.log(error);
  }
}

export async function getLatestProjects(count: number = 3) {
  try {
    const projects = await db.project.findMany({
      orderBy: { createdAt: "desc" },
      take: count,
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    });
    return projects;
  } catch (error) {
    console.error("Error fetching latest projects:", error);
    return [];
  }
}

export async function fetchStats() {
  try {
    const totalViews = await db.pageView.count();
    const ratings = await db.rating.findMany();
    const averageRating =
      ratings.length > 0
        ? ratings.reduce((sum, rating) => sum + rating.value, 0) /
          ratings.length
        : 0;
    const uniqueVisitors = await db.visitor.count();

    return {
      totalViews,
      averageRating,
      uniqueVisitors,
    };
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return {
      totalViews: 0,
      averageRating: 0,
      uniqueVisitors: 0,
    };
  }
}

export async function incrementPageView() {
  try {
    await db.pageView.create({ data: {} });
  } catch (error) {
    console.error("Failed to increment page view:", error);
  }
}

export async function addRating(value: number) {
  try {
    await db.rating.create({ data: { value } });
  } catch (error) {
    console.error("Failed to add rating:", error);
  }
}
