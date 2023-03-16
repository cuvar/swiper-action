"use client";

import React, { useState, useRef } from "react";
import "./index.css";
import Action from "./Action";
import type { SwiperActionProps } from "./types";

export { Action };

export default function SwiperAction(props: SwiperActionProps) {
  const actionChildren = Array.isArray(props.actions.props.children)
    ? props.actions.props.children
    : [];

  const BUTTON_WIDTH = actionChildren.length < 4 ? 100 : 50;
  const LIMIT = -actionChildren.length * BUTTON_WIDTH;

  const [swiping, setSwiping] = useState(false);
  const [startX, setStartX] = useState(0);
  const [deltaX, setDeltaX] = useState(0);
  const swiperRef = useRef(null);
  const actionRef = useRef(null);

  function handleMouseDown(ev: React.MouseEvent<Element, MouseEvent>) {
    setSwiping(true);
    setStartX(ev.clientX);
  }

  function handleMouseUp(ev: React.MouseEvent<Element, MouseEvent>) {
    if (0.5 * LIMIT >= deltaX) {
      enlarge(LIMIT);
    } else {
      enlarge(0);
    }

    setSwiping(false);
  }

  function handleMouseMove(ev: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (swiping) {
      const delta = ev.clientX - startX;

      if (delta > 0) {
        reset();
        return;
      }

      console.log(delta, LIMIT, delta > LIMIT);

      if (delta < 0 && delta > LIMIT) {
        enlarge(delta);
      }
    }
  }

  function enlarge(x: number) {
    setDeltaX(x);
    if (!actionRef.current) return;
    (actionRef.current as HTMLElement).style.width = `${Math.abs(x)}px`;
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
