/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from "next-auth";
// import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaAdapter } from "@auth/prisma-adapter";

import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import type { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt-ts";
import { db } from "@/lib/db";
// more providers at https://next-auth.js.org/providers
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    EmailProvider({
      server: process.env.GMAIL_EMAIL_SERVER || "", // any SMTP server will work
      from: process.env.EMAIL_FROM || "",
      // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    }),
    GoogleProvider({
      //Checking if the role exista and if not add USER Bydefault
      // profile(profile) {
      //   return { role: profile.role ?? "USER", ... }
      // },
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jb@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // console.log(
          //   "Authorize function called with credentials:",
          //   credentials
          // );
          // Check if user credentials are Correct
          if (!credentials?.email || !credentials?.password) {
            throw { error: "No Inputs Found", status: 401 };
          }
          //Check if user exists
          const existingUser = await db.user.findUnique({
            where: { email: credentials.email },
          });

          if (!existingUser) {
            console.log("No user found");
            throw { error: "No user found", status: 401 };
          }

          let passwordMatch: boolean = false;
          //Check if Password is correct
          if (existingUser && existingUser.password) {
            // if user exists and password exists
            passwordMatch = await compare(
              credentials.password,
              existingUser.password
            );
          }
          if (!passwordMatch) {
            console.log("Password incorrect");
            throw { error: "Password Incorrect", status: 401 };
          }
          const user = {
            id: existingUser.id,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            email: existingUser.email,
          };
          //
          return user;
        } catch (error) {
          console.log("aLL Failed");
          console.log(error);
          throw { error: "Something went wrong", status: 401 };
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      const dbUser = await db.user.findFirst({
        where: { email: token?.email ?? "" },
      });
      if (!dbUser) {
        token.id = user!.id;
        return token;
      }
      return {
        id: dbUser.id,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        email: dbUser.email,
        picture: dbUser.imageUrl,
      };
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.lastName = token.lastName;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
  },
};
