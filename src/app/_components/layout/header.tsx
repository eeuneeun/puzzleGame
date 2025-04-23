"use client";
import useUserStore from "@/app/_store/user";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import LogoutIcon from "@mui/icons-material/Logout";
import { fetchData } from "next-auth/client/_utils";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {};

export default function Header({}: Props) {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const { data: sessionData, update } = useSession();
  console.log("data", sessionData);

  // ★ 로그 아웃
  function logout() {
    // fetch("http://localhost:8080/logout")
    //   .then((response) => {
    //     console.log(response);
    //     return response.json();
    //   })
    //   .then((data) => {
    //     let authors = data;
    //   });
    axios
      .get("http://localhost:8080/logout", {
        headers: {
          withCredentials: true,
          Authorization: `Bearer eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..HFJ9boKE_OoxHhGw.s8JihR3BPoPHn1Bin6p1ZmDD8X26kO7W4nM4Emej7ARN3en_rU4ya4zZPeh7bmG7u60ATxM4V8qT0L0CLJvWAQjl1FsUu4-3tYpRDhxe6arEa20H9OQ5j2G6PGRkw3QF-e2Nxzxa5b_vIgVFDmk6Kwg9sId2WGou0G99oevJoB65qPyhVWCX.rNCX67ijvcwCNQIpuWSzQQ`,
        },
      })
      .then(function (response) {
        if (response.status == 200) {
          alert("로그아웃 처리 되었습니다.");
          router.push("/");
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // const { updateUser } = useUserStore();
  // updateUser(session?.user)
  useEffect(() => {
    console.log("useEffect -> session : ", sessionData?.user);
    if (sessionData?.user == undefined) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [sessionData]);
  return (
    <header className="header">
      <span className="title">Puzzle App</span>
      <div className="login-wrap">
        {isLogin ? (
          <button onClick={() => logout()}>
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
