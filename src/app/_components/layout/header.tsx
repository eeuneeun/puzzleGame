"use client";
import Link from "next/link";
import React, { useState } from "react";

type Props = {};

export default function Header({}: Props) {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <header className="header">
      <span className="title">Puzzle App</span>
      <div className="login-wrap">
        {isLogin ? (
          <button>signout</button>
        ) : (
          <Link href={"/signin"}>signin</Link>
        )}
      </div>
    </header>
  );
}
