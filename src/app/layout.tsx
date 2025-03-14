// app/layout.tsx
import { Head } from 'next/document'; // Импортируем компонент Head для правильного добавления в head
import LeftBar from "@/components/LeftBar";
import "./globals.css";
import { useState } from "react";
import Image from "next/image";
import Search from "@/components/Search";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [leftBar, setLeftBar] = useState<boolean>(false);
  const [openSearh, setOpenSearch] = useState<boolean>(false);

  return (
    <html lang="en">
      <Head>
        <meta name="yandex-verification" content="1c9b9ab69c3b700e" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <body className="flex">
        <div
          className={`fixed top-0 left-0 h-full bg-[#fffbf7] w-[280px] transition-transform duration-300 ${leftBar ? "translate-x-0" : "-translate-x-full"}`}
        >
          <LeftBar setOpenSearch={setOpenSearch} />
        </div>

        <button
          onClick={() => setLeftBar((prev) => !prev)}
          className={`fixed top-7 left-5 text-white rounded transition-transform duration-300 ${leftBar ? "translate-x-[220px]" : "translate-x-0"}`}
        >
          <div className={"cursor-pointer"}>
            <Image src="/menu.svg" width={20} height={20} alt="Меню" />
          </div>
        </button>

        <div
          className={`flex w-full h-screen justify-center pt-10 transition-all duration-300 ${leftBar ? "ml-[280px]" : "ml-0"}`}
        >
          {openSearh && (
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