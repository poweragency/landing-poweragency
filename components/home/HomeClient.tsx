"use client";

import { useEffect } from "react";
import { initHome } from "./client";

export default function HomeClient() {
  useEffect(() => initHome(), []);
  return null;
}
