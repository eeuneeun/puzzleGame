import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user: User;
  }

  interface User {
    accessToken: string;
    refreshToken: string;
    email?: string;
    name?: string;
    image?: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
  }
}
