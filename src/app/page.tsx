"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { set } from "react-hook-form";
import useGameStore from "./_store/game";
type Props = {};

export default function Main({}: Props) {
  const router = useRouter();
  const { game, clearAllGameInfo, updateGame } = useGameStore();
  const [job, setJob] = useState("warrior");

  function selectJob(job: string) {
    setJob(job);
    updateGame(job);
  }

  function goGame() {
    router.push("/game");
  }
  return (
    <div className="main">
      <ul className="job">
        <li className={job === "warrior" ? "active" : ""}>
          <button onClick={() => selectJob("warrior")}>
            <img src="/warrior.png" />
            <span>전사</span>
          </button>
        </li>
        <li className={job === "wizard" ? "active" : ""}>
          <button onClick={() => selectJob("wizard")}>
            <img src="/wizard.png" />
            <span>마법사</span>
          </button>
        </li>
        <li className={job === "archer" ? "active" : ""}>
          <button onClick={() => selectJob("archer")}>
            <img src="/archer.png" />
            <span>궁수</span>
          </button>
        </li>
        <li className={job === "thief" ? "active" : ""}>
          <button onClick={() => selectJob("thief")}>
            <img src="/thief.png" />
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
