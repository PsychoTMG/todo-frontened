'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const api = process.env.NEXT_PUBLIC_API_URL

interface Response {
  title: string
  id: number
  desc: string
}
export default function Home() {
  const [date, setDate] = useState<Response[] | null>(null)

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get<Response[] | null>(`${api}/hi`,{
        
      })
      
      setDate(response.data)
    }
    fetch()
  }, [])
  return (
    <div className="flex justify-center w-[280px]">
      <div className="flex flex-col">
        <div className="flex h-[52px]"> <Link href='inbox' className="text-[26px] font-bold">Входящие</Link></div>
        {date && Array.isArray(date) ? date.map(item =>
          <div key={item.id} className="flex flex-col ">
            <span className="flex text-[14px]  gap-[10px]"><div className=" w-[18px] h-[18px] border-[1px] border-[#000] rounded-2xl"></div> {item.title}</span>
            <span className="text-[12px] text-[#666]">{item.desc}</span>
          </div>
        ) : 'загрузка'}
      </div>
    </div>
  );
}
