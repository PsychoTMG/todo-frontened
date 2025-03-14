// app/layout.tsx

import { Metadata } from 'next';
import LeftBar from "@/components/LeftBar";
import "./globals.css";
import { useState } from "react";
import Image from "next/image";
import Search from "@/components/Search";
import Head from "next/head";  // Импортируем Head для метатегов

// Обновленный объект metadata без yandex-verification
export const metadata: Metadata = {
  title: "Мой ToDo List",
  description: "Управляй своими задачами легко!",
  keywords: "todo, список дел, задачи, управление временем",
  robots: "index, follow",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [leftBar, setLeftBar] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);

  return (
    <html lang="en">
      <head>
        {/* Здесь добавляем метатег для Яндекса */}
        <Head>
          <meta name="yandex-verification" content="1c9b9ab69c3b700e" />
        </Head>
      </head>
      <body className="flex">
        {/* Боковая панель с анимацией */}
        <div
          className={`fixed top-0 left-0 h-full bg-[#fffbf7] w-[280px] transition-transform duration-300 ${leftBar ? "translate-x-0" : "-translate-x-full"}`}
        >
          <LeftBar setOpenSearch={setOpenSearch} />
        </div>

        {/* Одна кнопка, которая смещается */}
        <button
          onClick={() => setLeftBar((prev) => !prev)}
          className={`fixed top-7 left-5 text-white rounded transition-transform duration-300 ${leftBar ? "translate-x-[220px]" : "translate-x-0"}`}
        >
          <div className={"cursor-pointer"}>
            <Image src="/menu.svg" width={20} height={20} alt="Меню" />
          </div>
        </button>

        {/* Основной контент */}
        <div
          className={`flex w-full h-screen justify-center pt-10 transition-all duration-300 ${leftBar ? "ml-[280px]" : "ml-0"}`}
        >
          {openSearch && (
            <div className="flex top-0 left-0 fixed justify-center items-center w-full h-screen z-50 bg-[#e1e1e123]">
              <Search />
            </div>
          )}
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;