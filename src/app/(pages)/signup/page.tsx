"use client";
import React from "react";
import SignupForm from "@/app/_components/atomic/template/signupForm";

type Props = {};

export default function Signin({}: Props) {
  return (
    <div className="signup signin">
      <h2>회원가입</h2>
      <SignupForm />
    </div>
  );
}
