"use client";
import React, { useRef } from "react";
import { ActionProps, InteractionEvent } from "./types";

export default function Action(props: ActionProps) {
  const buttonRef = useRef(null);

  function handleClick(e: InteractionEvent) {
    if (buttonRef.current) {
      // @ts-ignore
      const parent = buttonRef.current.parentElement;
      parent.style.transition = `width 0.2s`;
      parent.style.width = `0`;
      // parent.style.transition = ``;
    }
    props.action(e);
  }

  return (
    <button
      className="action debug w-full h-full"
      onClick={(e) => handleClick(e)}
      ref={buttonRef}
    >
      <div>{props.children}</div>
    </button>
  );
}
