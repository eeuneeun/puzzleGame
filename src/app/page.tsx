"use client";

export default function Main() {
  // # 키보드 상하좌우 움직임 함수
  function keyboardMove(event: any) {
    const targetEl = event.target.parentElement.style;
    const nowTop: number = Number(targetEl.top.replace("px", ""));
    const nowLeft: number = Number(targetEl.left.replace("px", ""));

    // # 상하좌우 키 눌렀을 경우 이동 함수
    if (event.key === "ArrowDown") {
      if (nowTop !== 800) targetEl.top = nowTop + 100 + "px";
    } else if (event.key === "ArrowUp") {
      if (nowTop !== 0) targetEl.top = nowTop - 100 + "px";
    } else if (event.key === "ArrowLeft") {
      if (nowLeft !== 0) targetEl.left = nowLeft - 100 + "px";
    } else if (event.key === "ArrowRight") {
      if (nowLeft !== 800) targetEl.left = nowLeft + 100 + "px";
    }
    // # 엔터 키 눌렀을 경우 블럭 이동 함수
    if (event.key === "Enter") {
    }
  }

  // # 임시 배열 함수
  function arrLoop() {
    const newArr = [];
    for (let i = 0; i < 80; i++) {
      newArr.push(<div key={i}>{i + 1}</div>);
    }
    return newArr;
  }
  // useEffect(() => {
  //   return () => {
  //     console.log("useEffect");
  //   };
  // }, []);

  return (
    <div>
      <main className="boundary">
        <div className="me">
          <input type="text" id="me" onKeyDown={(e) => keyboardMove(e)} />
        </div>
        {arrLoop()}
      </main>
    </div>
  );
}
