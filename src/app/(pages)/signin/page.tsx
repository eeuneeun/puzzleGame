"use client";
import React from "react";
import SigninBtn from "@/app/_components/atomic/molecules/signinBtn";
import SigninForm from "@/app/_components/atomic/template/signinForm";
type Props = {};

export default function Signin({}: Props) {
  return (
    <div>
      <h2>로그인</h2>
      <SigninForm />
      {/* <SigninBtn /> */}
    </div>
  );
}
