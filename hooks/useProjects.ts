"use client";
import { fetchProjects, getSingleProject } from "@/Actions/ProjectActions";
import { useQuery } from "@tanstack/react-query";
// import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useProjects() {
  // Query for fetching all contacts
  const projectQuery = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const data = await fetchProjects();
      return data;
    },
  });

  return {
    projects: projectQuery.data?.data ?? [],
    isLoading: projectQuery.isLoading,
    error: projectQuery.data?.error || projectQuery.error,
  };
}
export function useProject(id: string) {
  // Query for fetching all contacts
  const projectQuery = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const data = await getSingleProject(id);
      return data;
    },
  });

  return {
    project: projectQuery.data?.data ?? null,
    isLoading: projectQuery.isLoading,
    error: projectQuery.data?.error || projectQuery.error,
  };
}
