import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";

interface Credentials {
  email: string;
  password: string;
  id?: string;
  role?: string;
}
// const signIn = async (data: SignInFormValues) => {
//   try {
//     const response = await api.post(
//       _config.token,
//       new URLSearchParams({
//         grant_type: "password",
//         username: data.username,
//         password: data.password,
//       }).toString(),
//       {
//         headers: {
//           Authorization: `Basic ${Buffer.from(
//             `${CLIENTID}:${CLIENTPW}`
//           ).toString("base64")}`,
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       }
//     );
//     return response;
//   } catch (error) {
//     handleApiError(error);
//   }
// };

// const userInfo = async (token: any) => {
//   const headers: Record<string, string> = {};
//   headers["Authorization"] = `Bearer ${token.accessToken}`;

//   const response = await api.get(_config.userInfo, {
//     headers: headers,
//   });
//   return response.data;
// };

// const refreshAccessToken = async (token: any) => {
//   try {
//     const response = await api.post(
//       _config.token,
//       new URLSearchParams({
//         grant_type: "refresh_token",
//         refresh_token: token.refreshToken,
//       }).toString(),
//       {
//         headers: {
//           Authorization: `Basic ${Buffer.from(
//             `${CLIENTID}:${CLIENTPW}`
//           ).toString("base64")}`,
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       }
//     );
//     const refreshedTokens = response.data;
//     return {
//       ...token,
//       accessToken: refreshedTokens.access_token,
//       accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
//       refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
//     };
//   } catch (error) {
//     handleApiError(error);
//   }
// };
const handler = NextAuth({
  // pages: {
  //   signIn: "/signin",
  // },
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials: Credentials | undefined, req) {
        console.log("로그인 시도", credentials, req);
        // # 로그인 시도
        const res = await fetch("http://localhost:8080/signup/user", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        // const response = await axios
        //   .post("http://localhost:8080/login", {
        //     email: credentials?.email,
        //     password: credentials?.password,
        //   })
        //   .then(function (response) {
        //     console.log("로그인 응답 : ", response);
        //     console.log(getServerSession());
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
        const user = await res.json();

        if (res.ok && user) {
          return user; // 이 user 객체 안에 accessToken이 있어야 함
        }
        return null;
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID as string,
      clientSecret: process.env.NAVER_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.refreshToken = user.refreshToken; // 세션에도 accessToken 주입
        token.accessToken = user.accessToken; // 로그인 성공 시 accessToken 저장
        token.id = user.id; // 토큰에 유저 ID 저장
        token.role = user?.role; // 토큰에 유저 권한 저장
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken; // 세션에도 accessToken 주입
        session.refreshToken = token.refreshToken; // 세션에도 accessToken 주입
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt", // 세션 방식: jwt 기반
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET, // 반드시 env 설정
  },
});

export { handler as GET, handler as POST };
