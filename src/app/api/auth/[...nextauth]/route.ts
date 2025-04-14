import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";

interface Credentials {
  username: string;
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
  // pages: {
  //   signIn: "/",
  // },
  secret: process.env.SECRET,
  providers: [
    // CredentialsProvider({
    //   // The name to display on the sign in form (e.g. "Sign in with...")
    //   name: "Credentials",
    //   // `credentials` is used to generate a form on the sign in page.
    //   // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   // You can pass any HTML attribute to the <input> tag through the object.
    //   credentials: {
    //     username: { label: "Username", type: "text", placeholder: "jsmith" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials: Credentials | undefined) {
    //     if (!credentials) {
    //       console.error("No credentials provided");
    //       return null;
    //     }
    //     try {
    //       const response = await signIn({
    //         username: credentials.username,
    //         password: credentials.password,
    //       });
    //       if (response) {
    //         const tokens = response.data;
    //         return {
    //           id: credentials.username, // nextauth 타입 맞추기용
    //           ...tokens,
    //         };
    //       }
    //       return null;
    //     } catch (error) {
    //       console.error("Authorize error:", error);
    //       return null;
    //     }
    //   },
    // }),
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
