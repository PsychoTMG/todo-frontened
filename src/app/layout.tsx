'use client';

import Image from "next/image";
import "./globals.css";
import { useState } from "react";
import SideBar from "./components/SideBar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sideBar, setSideBar] = useState(false);

  return (
    <html lang="en">
      <body className={`transition ease-in-out duration-500 ${sideBar ? 'bg-[#00000066]  ' : null}`}>
        <header className="h-[56px] flex items-center pl-[12px] pr-[12px] justify-between relative">
          {/* Sidebar */}
          <div className={`fixed  top-0 left-0 h-full bg-[#fff] w-[280px] transition-transform ease-in-out duration-300 ${sideBar ? "translate-x-0" : "-translate-x-full"}`}>
            <SideBar />
          </div>

          {/* Меню */}
          <div
            className={`relative transition-transform duration-300 ${sideBar ? "translate-x-[200px]" : "translate-x-[0]"}`}>
            <Image
              className="cursor-pointer"
              onClick={() => setSideBar(!sideBar)}
              src="/img/menu.svg"
              width={30}
              height={30}
              alt="menu"
            />
          </div>

          <div className="flex gap-[2px]">
            <Image
              className="cursor-pointer"
              src="/img/menu-hor.svg"
              width={30}
              height={30}
              alt="menu"
            />
          </div>
        </header>
        {children}
      </body>
    </html >
  );
}