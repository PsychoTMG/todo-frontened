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
            const response = await axios.get<string>("http://localhost:3001/inbox");
            setTodoLength(response.data.length);
        };
        fetchData();
    }, []);

    return (
        <div className="w-[280px] h-full bg-[#fffbf7] flex flex-col gap-5 p-5">
            <button className="flex items-center gap-3 cursor-pointer">
                <Image
                    className="rounded-full"
                    src="/ava.png"
                    width={26}
                    height={26}
                    alt="ded"
                />
                <h1 className="font- text-[14px]">Алексей</h1>
            </button>

            <div className="flex flex-col gap-[2px]" >
                <button className="flex gap-2 cursor-pointer hover:bg-[#f3f3f3] hover:rounded-[5px] transition-all ease-in-out duration-500 items-center p-[5px]">
                    <p className="w-[24px] h-[24px] bg-[#dc4c3e] text-[#fff] flex items-center justify-center rounded-full">
                        +
                    </p>
                    <p className="text-[#dc4c3e] font-[600] text-[14px]">Добавить задачу</p>
                </button>

                <div className="flex flex-col gap-3 ">
                    <button onClick={() => setOpenSearch(true)} className="flex gap-2 cursor-pointer hover:bg-[#f3f3f3] hover:rounded-[5px] transition-all ease-in-out duration-500 items-center p-[5px]">
                        <Image
                            src='/search.svg'
                            width={24}
                            height={24}
                            alt="поиск"
                        />
                        <span className="text-[14px]">Поиск</span>
                    </button>
                </div>
                <div >
                    {!todoLength ? <Link className="flex justify-between  hover:bg-[#f3f3f3] hover:rounded-[5px] transition-all ease-in-out duration-500 items-center p-[5px]" href="/inbox">
                        <span className="flex gap-3"> <Image
                            src='/inbox.svg'
                            width={20}
                            height={20}
                            alt="поиск"
                        />
                            Входящие</span> <span>{todoLength}</span>
                    </Link> : <Link className="flex justify-between  bg-[#ffc5be] rounded-[5px] items-center p-[5px]" href="/inbox">
                        <span className="flex gap-3 text-[#dc4c3e] text-[14px]"> <Image
                            src='/inboxred.svg'
                            width={20}
                            height={20}
                            alt="поиск"
                        />
                            Входящие</span>
                        <span className="text-[#dc4c3e]">{todoLength}</span>
                    </Link>}

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