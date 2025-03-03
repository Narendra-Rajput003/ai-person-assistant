"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="p-4">
      <Image
        src="/logo.svg"
        alt="AI Personal Assistant Logo"
        width={50}
        height={50}
        priority
      />
    </div>
  );
}
