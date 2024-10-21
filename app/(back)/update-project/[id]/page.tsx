/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSingleProject } from "@/Actions/ProjectActions";
import { CreateProject } from "@/components/back/addProject";
import React from "react";

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

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const gottenProject = await getSingleProject(id);
  // Check if singleUser is undefined or an empty array
  if (
    !gottenProject ||
    (Array.isArray(gottenProject) && gottenProject.length === 0)
  ) {
    return <div>User not found</div>;
  }

  // If singleUser is an array, take the first item, otherwise use as is
  const userData: ProjectProps = Array.isArray(gottenProject)
    ? gottenProject[0]
    : gottenProject;
  return (
    <div>
      <CreateProject userData={userData} />
    </div>
  );
}
