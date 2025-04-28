import { serialize } from "cookie";
import { NextApiResponse } from "next";

const setTokenCookie = (res: NextApiResponse, token: string) => {
  const cookie = serialize("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 1, // 1시간
    sameSite: "lax",
  });

  res.setHeader("Set-Cookie", cookie);
};

export default setTokenCookie;
