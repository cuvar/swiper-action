"use client";

import React, { useState, useRef } from "react";
import "./index.css";
import Action from "./Action";
import type { SwiperActionProps, ActionProps } from "./types";

export { Action };

const BUTTON_WIDTH = 100;
const BUTTON_AMOUNT = 2;

export default function SwiperAction(props: SwiperActionProps) {
  const [swiping, setSwiping] = useState(false);
  const [startX, setStartX] = useState(0);
  const swiperRef = useRef(null);
  const actionRef = useRef(null);

  function handleMouseDown(ev: React.MouseEvent<Element, MouseEvent>) {
    setSwiping(true);
    setStartX(ev.clientX);
  }

  function handleMouseUp(ev: React.MouseEvent<Element, MouseEvent>) {
    setSwiping(false);
  }

  function handleMouseMove(ev: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (swiping) {
      const delta = ev.clientX - startX;
      const limit = -BUTTON_AMOUNT * BUTTON_WIDTH; // -200
      if (delta > 0) {
        reset();
        return;
      }
      // console.log(delta, limit, delta > limit);

      if (delta < 0 && delta > limit) {
        enlarge(Math.abs(delta));
      }
    }
  }

  function enlarge(x: number) {
    if (x < 0) return;
    if (!actionRef.current) return;
    (actionRef.current as HTMLElement).style.width = `${x}px`;
  }

  function reset() {
    enlarge(0);
  }

  return (
    <div className="w-full h-full flex-row items-center red overflow-hidden">
      <div
        className="w-full h-full flex-row items-center"
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseUp={(e) => handleMouseUp(e)}
        onMouseMove={(e) => handleMouseMove(e)}
        ref={swiperRef}
      >
        {props.children}
      </div>
      <div className="h-full flex-row items-center w-0" ref={actionRef}>
        {props.actions}
      </div>
    </div>
  );
}
