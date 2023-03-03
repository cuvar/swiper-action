"use client";

import React, { useState, useRef } from "react";
import "./index.css";

interface IProps {
  children: React.ReactNode;
  actions: React.ReactNode;
}

export default function SwiperAction(props: IProps) {
  const [swiping, setSwiping] = useState(false);
  const [deltaX, setDeltaX] = useState(0);
  const [startX, setStartX] = useState(0);
  const swiperRef = useRef(null);

  function handleMouseDown(ev: React.MouseEvent<Element, MouseEvent>) {
    setSwiping(true);
    setDeltaX(0);
    setStartX(ev.clientX);
    // console.log(ev.clientX);
    // console.log("mouse down");
  }

  function handleMouseUp(ev: React.MouseEvent<Element, MouseEvent>) {
    setSwiping(false);
    // console.log("mouse up");
  }

  function handleMouseMove(ev: React.MouseEvent<Element, MouseEvent>) {
    if (swiping) {
      const delta = ev.clientX - startX;
      setDeltaX(delta);
      console.log(delta);
    }
  }

  return (
    <div className="w-full">
      <div
        className="relative w-full debug2"
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseUp={(e) => handleMouseUp(e)}
        onMouseMove={(e) => handleMouseMove(e)}
        ref={swiperRef}
      >
        <div className="item w-full z-1 absolute left-0">{props.children}</div>
        <div className="actions flex-row z-0 absolute right-0">
          {props.actions}
        </div>
      </div>
    </div>
  );
}
