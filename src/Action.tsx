"use client";
import React from "react";
import { ActionProps } from "./types";

export default function Action(props: ActionProps) {
  return (
    <button className="action debug" onClick={(e) => props.action(e)}>
      <div>{props.children}</div>
    </button>
  );
}
