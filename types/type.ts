import { Project } from "@prisma/client";

export type LoginProps = {
  email: string;
  password: string;
};
export type UserProps = {
  firstName: string;
  id?: string;
  lastName: string;
  email: string;
  imageUrl: string | null;
  password: string;
};

export type ProjectProps = {
  id: string;
  title: string;
  slug: string;
  description: string;
  gitLink: string;
  liveLink: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: string | null;
}[];

// Server action return types
export type QueriesResponse = {
  data: Project[];
  error?: string;
};

// For single contact queries
export type SingleQueryResponse = {
  data: Project | null;
  error?: string;
};

// For mutation operations
export type MutationResponse = {
  success: boolean;
  data?: Project;
  error?: string;
};
