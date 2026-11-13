"use client";

import { LazyMotion, domMax } from "framer-motion";
import React from "react";

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      {children}
    </LazyMotion>
  );
}