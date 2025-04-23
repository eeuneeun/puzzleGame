import axios from "axios";
import NextAuth, { getServerSession } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";

interface Credentials {
  email: string;
  password: string;
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
  pages: {
    signIn: "/signin",
  },
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
        try {
          // 여기에 실제 인증 로직을 작성
          const response = await axios
            .post("http://localhost:8080/login", {
              email: credentials?.email,
              password: credentials?.password,
            })
            .then(function (response) {
              console.log("로그인 응답 : ", response);
              console.log(getServerSession());
            })
            .catch(function (error) {
              console.log(error);
            });

          const user = response?.data; // 백엔드에서 받은 유저 데이터

          if (user) {
            return user; // ✅ 성공 시 user 반환 (user 객체는 JWT 토큰에 들어감)
          } else {
            return null; // ❌ 실패 시 null 반환
          }
        } catch (error) {
          console.error("로그인 에러:", error);
          return null;
        }
      },
      // async authorize(credentials: Credentials | undefined) {
      //   if (!credentials) {
      //     console.error("No credentials provided");
      //     return null;
      //   }
      //   try {
      //     const response = await signIn({
      //       username: credentials.username,
      //       password: credentials.password,
      //     });
      //     if (response) {
      //       const tokens = response.data;
      //       return {
      //         id: credentials.username, // nextauth 타입 맞추기용
      //         ...tokens,
      //       };
      //     }
      //     return null;
      //   } catch (error) {
      //     console.error("Authorize error:", error);
      //     return null;
      //   }
      // },
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
});

export { handler as GET, handler as POST };
