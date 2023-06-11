"use client";

import React, { useState, useRef } from "react";
import "./index.css";
import Action from "./Action";
import type { SwiperActionProps } from "./types";

export { Action };
type MoveEvent =
  | React.MouseEvent<Element, MouseEvent>
  | React.TouchEvent<Element>;

export function SwiperAction(props: SwiperActionProps) {
  const actionChildren = Array.isArray(props.actions.props.children)
    ? props.actions.props.children
    : [];

  const BUTTON_WIDTH = actionChildren.length < 4 ? 100 : 50;
  const LIMIT = -actionChildren.length * BUTTON_WIDTH;

  const [swiping, setSwiping] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [startX, setStartX] = useState(0);
  const [deltaX, setDeltaX] = useState(0);
  const swiperRef = useRef(null);
  const actionRef = useRef(null);

  function handleDown(ev: MoveEvent) {
    setSwiping(true);
    if (isMouseEvent(ev)) {
      setStartX(ev.clientX);
    } else {
      setStartX(ev.targetTouches[0].clientX);
    }
  }

  function handleUp(ev: MoveEvent) {
    if (0.5 * LIMIT >= deltaX) {
      enlarge(LIMIT);
    } else {
      enlarge(0);
    }

    setSwiping(false);
  }

  function handleMove(ev: MoveEvent) {
    if (!swiping) return;
    if (isResetting) return;

    const clientX = isMouseEvent(ev) ? ev.clientX : ev.targetTouches[0].clientX;
    const delta = clientX - startX;

    if (delta > 0) {
      setIsResetting(true);
      setSwiping(false);
      reset();
      setIsResetting(false);
      return;
    }

    console.log(delta, LIMIT, delta > LIMIT);

    if (delta < 0 && delta > LIMIT) {
      enlarge(delta);
    } else if (delta < LIMIT) {
      setSwiping(false);
    }
  }

  function enlarge(x: number) {
    setDeltaX(x);
    if (!actionRef.current) return;
    (actionRef.current as HTMLElement).style.width = `${Math.abs(x)}px`;
  }

  function reset() {
    setDeltaX(0);

    if (!actionRef.current) return;
    const elem = actionRef.current as HTMLElement;

    elem.style.transition = `width 0s`;
    elem.style.width = `0`;
    elem.style.transition = ``;
  }

  function isMouseEvent(ev: MoveEvent): ev is React.MouseEvent {
    return ev.type.includes("mouse");
  }

  return (
    <div className="w-full h-max flex-row items-center red overflow-hidden">
      <div
        className="w-full h-full flex-row items-center justify-center"
        onMouseDown={(e) => handleDown(e)}
        onMouseUp={(e) => handleUp(e)}
        onMouseMove={(e) => handleMove(e)}
        onTouchStart={(e) => handleDown(e)}
        onTouchEnd={(e) => handleUp(e)}
        onTouchMove={(e) => handleMove(e)}
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
