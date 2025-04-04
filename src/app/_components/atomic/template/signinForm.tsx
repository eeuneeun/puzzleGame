"use client";
import { useState } from "react";
// import { authenticate } from "@/lib/actions";
import { useFormState } from "react-dom";

export default function SigninForm() {
  const [errorMsg, dispatch] = useState("에러");
  //   const [errorMsg, dispatch] = useFormState(authenticate, undefined);
  return (
    <div className="signin-form">
      <form className="flex flex-col action={dispatch}">
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
        <button className="sign-btn">로그인</button>
        <p>{errorMsg}</p>
      </form>
    </div>
  );
}
