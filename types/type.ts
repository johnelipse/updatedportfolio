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
  title: string;
  description: string;
  id?: string;
  slug: string;
  gitLink: string;
  liveLink: string;
  imageUrl: string;
};
