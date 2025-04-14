import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/signin",
  },
  jwt: {
    async encode({ secret, token }) {
      return jwt.sign(token, secret);
    },
    async decode({ secret, token }) {
      return jwt.verify(token, secret);
    },
  },
  callbacks: {
    //@ts-ignore
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      if (isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
