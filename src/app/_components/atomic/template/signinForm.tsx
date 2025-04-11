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

type FormValues = {
  id: string;
  password: string;
};

export default function SigninForm() {
  const resolver: Resolver<FormValues> = async (values) => {
    return {
      values: values.id ? values : {},
      errors: !values.password
        ? {
            id: {
              type: "required",
              message: "This is required.",
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

  const onSubmit = handleSubmit((data) =>
    axios
      .post("http://localhost:8080/signup/user", {
        email: data.id,
        password: data.password,
      })
      .then(function (response) {
        if (response.status == 200) {
          router.push("/");
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  );

  // @ 회원가입 API Params
  let signinApiParams = {
    url: "http://localhost:8080/signup/user",
    headers: { "content-type": "application/json" },
    method: "post",
    withCredentials: true,
    body: {},
  };

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
            <input {...register("id")} id="id" name="id" placeholder="ID" />
          </li>
          {errors?.id && <li className="message">{errors.id.message}</li>}
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
            <button onClick={() => signIn()}>네이버</button>
          </li>
          <li>
            <button onClick={() => signIn()}>카카오</button>
          </li>
          <li>
            <button>깃헙</button>
          </li>
        </ul>
        <button className="sign-btn" onClick={(event) => signUp(event)}>
          로그인
        </button>
        {/* <p>{errorMsg}</p> */}
      </form>
    </div>
  );
}
