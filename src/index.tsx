"use client";

import React, { useState, useRef } from "react";
import { Action } from "./Action";
import type { InteractionEvent, SwiperActionProps, ActionData } from "./types";

// export { Action };
export type { ActionData };

export function SwiperAction(props: SwiperActionProps) {
  const BUTTON_WIDTH = props.actionsData.length < 4 ? 100 : 50;
  const LIMIT = -props.actionsData.length * BUTTON_WIDTH;
  const MINIMUM_SWIPE = 0.2 * LIMIT;

  const [swiping, setSwiping] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [startX, setStartX] = useState(0);
  const [deltaX, setDeltaX] = useState(0);
  const swiperRef = useRef(null);
  const actionRef = useRef(null);

  function handleDown(ev: InteractionEvent) {
    if (props.actionsData.length === 0) return;
    setSwiping(true);
    if (isMouseEvent(ev)) {
      setStartX(ev.clientX);
    } else {
      setStartX(ev.targetTouches[0].clientX);
    }
  }

  function handleUp(ev: InteractionEvent) {
    if (props.actionsData.length === 0) return;
    if (MINIMUM_SWIPE >= deltaX) {
      enlarge(LIMIT);
    } else {
      enlarge(0);
    }

    setSwiping(false);
  }

  function handleMove(ev: InteractionEvent) {
    if (props.actionsData.length === 0) return;
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

    // console.log(delta, LIMIT, delta > LIMIT);

    if (delta < 0 && delta > LIMIT) {
      enlarge(delta);
    } else if (delta < LIMIT) {
      setSwiping(false);
    }
  }

  function enlarge(x: number) {
    setDeltaX(x);
    if (!actionRef.current) return;
    const elem = actionRef.current as HTMLElement;
    if (x === LIMIT) {
      elem.style.transition = `width 0.2s`;
    }
    elem.style.width = `${Math.abs(x)}px`;
    setTimeout(() => {
      elem.style.transition = ``;
    }, 200);
  }

  function reset() {
    setDeltaX(0);

    if (!actionRef.current) return;
    const elem = actionRef.current as HTMLElement;

    elem.style.transition = `width 0.2s`;
    elem.style.width = `0`;
    setTimeout(() => {
      elem.style.transition = ``;
    }, 200);
  }

  function isMouseEvent(ev: InteractionEvent): ev is React.MouseEvent {
    return ev.type.includes("mouse");
  }

  const newActions = [];
  for (let i = 0; i < props.actionsData.length; i++) {
    const d = props.actionsData[i];
    const action = (
      <Action
        children={d.children}
        action={d.action}
        args={d.args}
        key={"sa-" + i}
      ></Action>
    );
    newActions.push(action);
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
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
        {newActions}
      </div>
    </div>
  );
}
