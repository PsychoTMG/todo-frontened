import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface ApiResponse {
    title: string,
    desc: string
}

interface ModuleSearch {
    setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search: React.FC<ModuleSearch> = ({ setOpenSearch }) => {



    const [search, setSearch] = useState<string>('')
    const [resData, setResData] = useState<ApiResponse[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (!search) {
            setResData([])
            return
        }

        const delayDebounce = setTimeout(async () => {
            setLoading(true)
            try {
                const response = await axios.get<ApiResponse[]>(`http://localhost:3001/search?query=${search}`)
                setResData(response.data)
                setLoading(false)
            } catch (error) {
                console.error("Ошибка при загрузке данных", error)
            }

        }, 300)
        return () => clearTimeout(delayDebounce)
    }, [search])

    return (
        <div className='fixed flex w-[800px] h-[500px] bg-[#ffffff] shadow-2xl rounded-2xl p-[15px] flex-col'>
            <div className='flex justify-center items-center gap-[10px] w-full '>
                <div>
                    <Image
                        src='/search.svg'
                        width={30}
                        height={30}
                        alt='поиск'
                    />
                </div>
                <input
                    type="text"
                    placeholder="Введите запрос или команду..."
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    className=" rounded outline-none w-full"
                />
                <Image
                    className='cursor-pointer'
                    onClick={() => setOpenSearch(false)}
                    src='/close.svg'
                    width={30}
                    height={30}
                    alt='закрыть'
                />
            </div>
            <div className="mt-4">
                {!loading ? resData.map((item, index) => (
                    <div key={index} className="border-b py-2">
                        <strong>{item.title}</strong> - {item.desc}
                    </div>
                )) : <div>Идет загрузка</div>
                }
            </div>
        </div>
    )
}

export default Search






