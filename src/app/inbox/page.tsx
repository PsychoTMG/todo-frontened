"use client"

import AddTodo from '@/components/AddTodo'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface ApiResponse {
    title: string
    desc: string
    id: number
    completed: boolean
}

const Inbox = () => {
    const [curData, setCurData] = useState<ApiResponse[]>([])
    const [openAdd, setOpenAdd] = useState<boolean>(false)
    const [dragIndex, setDragIndex] = useState<number | null>(null)
    const [hovered, setHovered] = useState<number | null>(null)

    // Открытие формы
    const onOpenAdd = () => setOpenAdd(!openAdd)

    // Получение данных
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get<ApiResponse[]>('https://todo-backend-b3ts.onrender.com/inbox')
            setCurData(res.data)
        }
        fetchData()
    }, [])

    // Выполнение задачи
    const onComplete = async (id: number) => {
    
        await axios.patch(`https://todo-backend-b3ts.onrender.com/completed/${id}`, { completed: true });
    
        const updatedData = curData.map(todo =>
            todo.id === id ? { ...todo, completed: true } : todo
        );
        setCurData(updatedData);
    
    
    };

    
    // Отмена выполнения
    const onCompleteFalse = async (id: number) => {
        await axios.patch(`https://todo-backend-b3ts.onrender.com/completed/${id}`, { completed: false })
        const updatedData = curData.map(todo =>
            todo.id === id ? { ...todo, completed: false } : todo
        )
        setCurData(updatedData)
    }

    // Drag & Drop
    const onDragStart = (index: number) => setDragIndex(index)
    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault()
    const onDrop = (index: number) => {
        if (dragIndex === null || !curData) return
        const newData = [...curData]
        const draggedItem = newData[dragIndex]
        newData.splice(dragIndex, 1)
        newData.splice(index, 0, draggedItem)
        setCurData(newData)
        setDragIndex(null)
    }

    return (
        <div className='flex flex-col gap-[20px] relative'>
            <h1 className='font-bold text-[34px]'>Входящие</h1>

            {/* Активные задачи */}
            <div className='flex flex-col gap-[20px] '>
                {curData.filter(item => !item.completed).map((item, index) => (
                    <div
                        key={item.id}
                        className=' flex gap-[10px] p-[10px] border-b-[1px] border-[#e9e9e9] w-[750px] cursor-move 
                        transition-transform duration-300 ease-in-out hover:scale-105'
                        draggable={true}
                        onDragStart={() => onDragStart(index)}
                        onDragOver={onDragOver}
                        onDrop={() => onDrop(index)}
                        onMouseEnter={() => setHovered(index)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        {/* Круглая кнопка завершения */}
                        <div
                            className='w-[20px] h-[20px] border-1 rounded-full cursor-pointer transition'
                            onClick={() => onComplete(item.id)}
                        ></div>

                        {/* Ссылка на страницу задачи */}
                        <Link href={`/inbox/${item.id}`}>
                            <h1 className='flex font-bold text-[14px]'>
                                <p>{index + 1}.</p> {item.title}
                            </h1>
                            <h2 className='text-[12px]'>{item.desc}</h2>
                        </Link>

                        {/* Кнопка редактирования */}
                        <div
                            className={`transition-opacity duration-500 ease-in-out ${hovered === index ? 'opacity-100' : 'opacity-0'} absolute right-[30px] top-[10px]`}>
                            <Link href={`/edit/${item.id}`}>
                                <Image
                                    src='/edit.svg'
                                    alt='edit'
                                    width={20}
                                    height={20}
                                />
                            </Link>
                        </div>
                        
                    </div>
                ))}
            </div>

            {/* Кнопка добавления новой задачи */}
            <div className='cursor-pointer flex items-center gap-[10px]' onClick={onOpenAdd}>
                <span className="flex items-center justify-center bg-red-500 w-[20px] h-[20px] rounded-full">+</span>
                <span>Добавить задачу</span>
            </div>
            {openAdd && <AddTodo setOpenAdd={setOpenAdd} />}

            {/* Выполненные задачи */}
            <div className='flex flex-col gap-[20px]'>
                {curData.filter(item => item.completed).map((item, index) => (
                    <div
                        key={item.id}
                        className='flex gap-[10px] relative p-[10px] border-b-[1px] border-[#e9e9e9] w-[750px]'>
                        <div className='w-[20px] h-[20px] border-1 rounded-full bg-[#d9d9d9]'></div>

                        {/* Ссылка на страницу задачи */}
                        <Link href={`/inbox/${item.id}`}>
                            <h1 className='flex font-bold text-[14px]'>
                                <del> {item.title}</del>
                            </h1>
                            <h2 className='text-[12px]'>{item.desc}</h2>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Inbox