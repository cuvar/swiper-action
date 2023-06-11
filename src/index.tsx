"use client";

import React, { useState, useRef } from "react";
import Action from "./Action";
import type { InteractionEvent, SwiperActionProps } from "./types";

export { Action };

export function SwiperAction(props: SwiperActionProps) {
  const BUTTON_WIDTH = props.actions.length < 4 ? 100 : 50;
  const LIMIT = -props.actions.length * BUTTON_WIDTH;
  const MINIMUM_SWIPE = 0.2 * LIMIT;

  const [swiping, setSwiping] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [startX, setStartX] = useState(0);
  const [deltaX, setDeltaX] = useState(0);
  const swiperRef = useRef(null);
  const actionRef = useRef(null);

  function handleDown(ev: InteractionEvent) {
    setSwiping(true);
    if (isMouseEvent(ev)) {
      setStartX(ev.clientX);
    } else {
      setStartX(ev.targetTouches[0].clientX);
    }
  }

  function handleUp(ev: InteractionEvent) {
    if (MINIMUM_SWIPE >= deltaX) {
      enlarge(LIMIT);
    } else {
      enlarge(0);
    }

    setSwiping(false);
  }

  function handleMove(ev: InteractionEvent) {
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

  function isMouseEvent(ev: InteractionEvent): ev is React.MouseEvent {
    return ev.type.includes("mouse");
  }

  return (
    <div
      style={{
        width: "100%",
        height: "max-content",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
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
      <div
        ref={actionRef}
        style={{
          width: "0",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {props.actions}
      </div>
    </div>
  );
}
