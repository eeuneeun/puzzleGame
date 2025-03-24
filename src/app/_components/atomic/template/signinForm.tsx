"use client";
// import { authenticate } from "@/lib/actions";
import { useFormState } from "react-dom";

export default function SigninForm() {
  const [errorMsg, dispatch] = useFormState("에러러", undefined);
  //   const [errorMsg, dispatch] = useFormState(authenticate, undefined);
  return (
    <div>
      <h1>로그인 페이지</h1>
      <form className="flex flex-col action={dispatch}">
        <input className="bg-blue-300 text-black" name="id"></input>
        <input
          className="bg-yellow-300 text-black"
          name="password"
          type="password"
        ></input>
        <button>로그인</button>
        <p>{errorMsg}</p>
      </form>
    </div>
  );
}
