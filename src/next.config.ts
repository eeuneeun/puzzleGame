import type NextAuthConfig  from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // 유저 인증 확인
      const isLoggedIn = !!auth?.user;
      // 보호하고 싶은 경로 설정
      // 여기서는 /login 경로를 제외한 모든 경로가 보호 되었다
      const isOnProtected = !nextUrl.pathname.startsWith("/login");

      if (isOnProtected) {
        if (isLoggedIn) return true;
        return false; // '/login' 경로로 강제이동
      } else if (isLoggedIn) {
        // 홈페이지로 이동
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
  },
} typeof NextAuthConfig;
