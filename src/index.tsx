"use client";

import React, { useState, useRef } from "react";
import "./index.css";
import Action from "./Action";
import type { SwiperActionProps, ActionProps } from "./types";

export { Action };

export default function SwiperAction(props: SwiperActionProps) {
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
    if (!swiperRef.current) return;

    if (swiping) {
      const delta = ev.clientX - startX;
      setDeltaX(delta);
      console.log(delta);
      const limit = -200;
      // console.log(props.actions.props.children.length);
      if (delta > 0) {
        reset(swiperRef.current as Element);
        return;
      }

      if (delta < 0 && delta > limit) {
        moveX(swiperRef.current as Element, delta);
      }
    }
  }

  function moveX(target: Element, x: number) {
    // @ts-ignore
    target.style.translate = `${x}px 0px`;
  }

  function reset(target: Element) {
    moveX(target, 0);
  }

  return (
    <div className="custom-pos w-full h-full red overflow-hidden">
      <div className="w-full h-full flex-row items-center">
        <div
          className="w-full h-full flex-row items-center bg-black"
          onMouseDown={(e) => handleMouseDown(e)}
          onMouseUp={(e) => handleMouseUp(e)}
          onMouseMove={(e) => handleMouseMove(e)}
          ref={swiperRef}
        >
          {props.children}
        </div>
        <div className="flex-row h-full items-center">{props.actions}</div>
      </div>
    </div>
  );
}
