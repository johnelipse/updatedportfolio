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
