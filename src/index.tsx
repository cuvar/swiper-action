"use client";

import React from "react";
import "./index.css";

interface IProps {
  children: React.ReactNode;
}
export default function SwiperAction(props: IProps) {
  return (
    <div>
      <div>{props.children}</div>
    </div>
  );
}
