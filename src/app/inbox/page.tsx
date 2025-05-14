'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import withAuth from "../hoc/withAuth";

const api = process.env.NEXT_PUBLIC_API_URL;

interface Response {
    title: string
    desc: string
    id: number
}

function Page() {
    const [data, setData] = useState<Response[] | null>(null);
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {

        const fetch = async () => {
            try {
                const response = await axios.get<Response[] | null>(`${api}/inbox`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setData(response.data);
            } catch (err) {
                console.error(err, 'вы не авторизованы');
            }
        };
        fetch();
    }, [token]);


    return (
        <div className="flex justify-center w-[280px]">
            <div className="flex flex-col">

                {data ? (data.map(item=><Link href={`/inbox/${item.id}`} key={item.id}>
                        <div className="flex flex-col pb-[20px] cursor-pointer">
                            <span className="flex text-[14px] gap-[10px]">
                                <div className="w-[18px] h-[18px] border-[1px] border-[#000] rounded-2xl"></div>
                                <div>{item.id}</div>
                                <div>{item.title}</div>
                                <div>{item.desc}</div>
                            </span>

                        </div>
                    </Link>)
                    
                ) : 'Нет данных'}

                {/* Добавление задачи */}
                <div className="flex gap-[11px] items-center">
                    <span>+</span>
                    <span className="text-[#808080] text-[14px]">Добавить задачу</span>
                </div>
            </div>
        </div>
    );
}


export default withAuth(Page)
