"use client";
import axios from "axios";
import Cookies from "universal-cookie";
//@ts-ignore
// import jwt_decode from "jwt-decode";
//@ts-ignore
// import qs from "qs";

import { signIn } from "next-auth/react";
import { EventHandler, useState } from "react";
// import { authenticate } from "@/lib/actions";
import { useFormState } from "react-dom";
import { Resolver, useForm } from "react-hook-form";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import Link from "next/link";
// @ TYPE : 폼 입력 값
type FormValues = {
  email: string;
  password: string;
};

// # 로그인 폼
export default function SigninForm() {
  // # 폼 훅 리졸버
  const resolver: Resolver<FormValues> = async (values) => {
    return {
      values: values.email ? values : {},
      errors: !values.password
        ? {
            email: {
              type: "required",
              message: "This is required.",
            },
          }
        : {},
    };
  };

  // # 리액트 훅 폼 리소스
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  // # 폼 제출
  // - 백엔드 통신 시도
  const onSubmit = handleSubmit(async (data) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/", // 로그인 성공시 이동
    });
  });

  // # 회원가입
  function signUp(event: any) {
    event.preventDefault();
    onSubmit();
  }
  const router = useRouter();

  return (
    <div className="signin-form">
      <form className="flex flex-col">
        <ul className="list flex flex-col">
          <li>
            <label htmlFor="email">ID</label>
            <input
              {...register("email")}
              id="email"
              name="email"
              placeholder="ID"
            />
          </li>
          {errors?.email && <li className="message">{errors.email.message}</li>}
          <li>
            <label htmlFor="password">PASSWORD</label>
            <input
              {...register("password")}
              id="password"
              name="password"
              type="password"
              placeholder="PASSWORD"
            />
          </li>
        </ul>
        <ul className="sns-signin">
          <li>
            <button>구글</button>
          </li>
          <li>
            <button
              onClick={(event) => {
                event.preventDefault();
                signIn("naver", { callbackUrl: "/" });
              }}
            >
              네이버
            </button>
          </li>
          <li>
            <button
              onClick={(event) => {
                event.preventDefault();
                signIn("kakao", { callbackUrl: "/" });
              }}
            >
              카카오
            </button>
          </li>
          <li>
            <button>깃헙</button>
          </li>
        </ul>
        <Link href="/signup">회원가입</Link>
        <button className="sign-btn" onClick={(event) => signUp(event)}>
          로그인
        </button>
        {/* <p>{errorMsg}</p> */}
      </form>
    </div>
  );
}
