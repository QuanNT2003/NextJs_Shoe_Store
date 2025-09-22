"use client";
import ProInput from "@/component/Input/input";
import { useState } from "react";
export default function Home() {
  const [value, setValue] = useState("");
  return (
    <div className="">
      {" "}
      <ProInput
        required
        placeholder="hello text"
        title="test input"
        value={value}
        type="password"
        onChange={setValue}
        error="123"
      />
    </div>
  );
}
