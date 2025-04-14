"use client";
import useUserStore from "@/app/_store/user";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import LogoutIcon from "@mui/icons-material/Logout";

type Props = {};

export default function Header({}: Props) {
  const [isLogin, setIsLogin] = useState(false);
  const { data: session, update } = useSession();
  console.log("data", session);
  // const { updateUser } = useUserStore();
  // updateUser(session?.user)
  useEffect(() => {
    session?.user !== null && setIsLogin(true);
  }, []);
  return (
    <header className="header">
      <span className="title">Puzzle App</span>
      <div className="login-wrap">
        {isLogin ? (
          <button>
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
