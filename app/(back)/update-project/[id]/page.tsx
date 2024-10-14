import { getSingleProject } from "@/Actions/ProjectActions";
import { CreateProject } from "@/components/back/addProject";
import { ProjectProps } from "@/types/type";
import React from "react";

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
