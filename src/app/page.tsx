"use client";

import React from "react";
import { useRouter } from "next/navigation";
type Props = {};

export default function Main({}: Props) {
  const router = useRouter();
  function goGame() {
    router.push("/game");
  }
  return (
    <div className="main">
      <ul className="job">
        <li>
          <button>
            <img src="/warrior.png" />
            <span>전사</span>
          </button>
        </li>
        <li>
          <button>
            <img src="/wizard.png" />
            <span>마법사</span>
          </button>
        </li>
        <li>
          <button>
            <img src="/archar.png" />
            <span>궁수</span>
          </button>
        </li>
        <li>
          <button>
            <img src="/theff.png" />
            <span>도적</span>
          </button>
        </li>
      </ul>

      <button className="game-start-btn" onClick={goGame}>
        GAME START
      </button>
    </div>
  );
}
