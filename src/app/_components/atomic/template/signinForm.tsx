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

export default function SigninForm() {
  // const [errorMsg, dispatch] = useState("");
  // const [errorMsg, dispatch] = useFormState(authenticate, undefined);
  // Login API Params
  let signinApiParams = {
    url: "http://localhost:8080/signup/user",
    headers: { "content-type": "application/json" },
    method: "post",
    withCredentials: true,
    body: {},
  };

  const [signinParam, setSigninPram] = useState({
    email: "",
    password: "",
  });

  // 회원가입
  function signUp(event: any) {
    event.preventDefault();

    axios
      .post("http://localhost:8080/signup/user", {
        email: "Fred@aaa.aaa",
        password: "Flintstone",
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="signin-form">
      <form className="flex flex-col">
        <ul className="list flex flex-col">
          <li>
            <label htmlFor="id">ID</label>
            <input className="bg-blue-300 text-black" id="id" name="id"></input>
          </li>
          <li>
            <label htmlFor="password">PASSWORD</label>
            <input
              className="bg-yellow-300 text-black"
              id="password"
              name="password"
              type="password"
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
