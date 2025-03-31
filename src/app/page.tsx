import React from "react";

type Props = {};

export default function Main({}: Props) {
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

      <button className="game-start-btn">GAME START</button>
    </div>
  );
}
