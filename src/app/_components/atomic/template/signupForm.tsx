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

// @ TYPE : 폼 입력 값
type FormValues = {
  email: string;
  password: string;
};

// # 회원가입 폼폼
export default function SigninForm() {
  // # 폼 훅 리졸버
  const resolver: Resolver<FormValues> = async (values) => {
    return {
      values: values.email ? values : {},
      errors: !values.password
        ? {
            email: {
              type: "required",
              message: "이메일을 입력해주세요!",
            },
          }
        : {},
    };
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit = handleSubmit(
    async (data) =>
      await axios
        .post("http://localhost:8080/signup/user", {
          email: data.email,
          password: data.password,
        })
        .then(function (response) {
          console.log(response);
          if (response.status == 201) {
            router.push("/signin");
            // console.log(accessToken);
            // console.log(refreshToken);

            // router.push("/");
          }
        })
        .catch(function (error) {
          console.log(error);
        })
  );

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
            <label htmlFor="id">ID</label>
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
        <button className="sign-btn" onClick={(event) => signUp(event)}>
          회원가입
        </button>
        {/* <p>{errorMsg}</p> */}
      </form>
    </div>
  );
}
