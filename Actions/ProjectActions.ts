"use server";

import { db } from "@/lib/db";
import { ProjectProps } from "@/types/type";
import { revalidatePath } from "next/cache";

export default async function addProject(data: ProjectProps) {
  try {
    const { title, description, slug, gitLink, liveLink, imageUrl } = data;
    const newProject = await db.project.create({
      data: { title, description, slug, gitLink, liveLink, imageUrl },
    });
    revalidatePath("/projects");
    return newProject;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchProjects() {
  try {
    const fetchedProjects = await db.project.findMany();
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
