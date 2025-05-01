"use client";
import useUserStore from "@/app/_store/user";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import LogoutIcon from "@mui/icons-material/Logout";
import { fetchData } from "next-auth/client/_utils";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {};

export default function Header({}: Props) {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const { data: sessionData, update } = useSession();
  console.log("클라이언트 세션 : ", sessionData);

  // ★ 로그 아웃
  async function logout() {
    if (!sessionData?.accessToken) {
      console.error("No access token!");
      return;
    }
    console.log(sessionData.accessToken);
    const res = await fetch("http://localhost:8080/logout", {
      method: "POST",
      mode: "cors",
      credentials: "include", // 🍪 쿠키 쓰면 추가
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionData.accessToken}`, // accessToken 보내기
      },
    });

    const result = await res;
    if (result.status == 200) {
      signOut({ callbackUrl: "/" });
      alert("로그아웃 처리 되었습니다.");
      router.push("/");
    } else {
      console.log("로그아웃 실패");
    }
  }
  // const { updateUser } = useUserStore();
  // updateUser(session?.user)
  useEffect(() => {
    console.log("useEffect -> session : ", sessionData?.user);
    if (sessionData?.user == undefined) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [sessionData]);
  return (
    <header className="header">
      <span className="title">Puzzle App </span>
      <div className="login-wrap">
        {isLogin ? (
          <button onClick={() => logout()}>
            <LogoutIcon />
            signout
          </button>
        ) : (
          <Link href={"/signin"}>
            <SensorOccupiedIcon />
            signin
          </Link>
        )}
      </div>
    </header>
  );
}
