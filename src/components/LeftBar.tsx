"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SearchMod {
    setOpenSearch: (value: boolean) => void;
}

const LeftBar: React.FC<SearchMod> = ({ setOpenSearch }) => {
    const [todoLength, setTodoLength] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get<string>("http://localhost:3000/inbox");
            setTodoLength(response.data.length);
        };
        fetchData();
    }, []);

    return (
        <div className="w-[280px] h-full bg-[#fffbf7] flex flex-col gap-5 p-5">
            <div className="flex items-center gap-3">
                <Image
                    className="rounded-full"
                    src="/ava.png"
                    width={35}
                    height={35}
                    alt="ded"
                />
                <h1>Алексей</h1>
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                    <button className="w-5 h-5 bg-red-500 flex items-center justify-center rounded-full">
                        +
                    </button>
                    <p>Добавить задачу</p>
                </div>
                <div>
                    <button onClick={() => setOpenSearch(true)}>Поиск</button>
                </div>
                <div>
                    <Link className="flex justify-between" href="/inbox">
                        <span>Входящие</span> <span>{todoLength}</span>
                    </Link>
                </div>
                <div>
                    <button >Сегодня</button>
                </div>
                <div>
                    <button>Предстоящие</button>
                </div>
                <div>
                    <button>Фильтры и метки</button>
                </div>
            </div>
        </div>
    );
};

export default LeftBar;