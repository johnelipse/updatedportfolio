import { fetchProjects } from "@/Actions/ProjectActions";
import ProjectsPage from "@/components/allProjectsPage";

import React from "react";

export default async function page() {
  const projects = (await fetchProjects()) || [];
  return (
    <div>
      <ProjectsPage projects={projects} />
    </div>
  );
}
