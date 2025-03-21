"use client"

import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"


interface ApiResponce {
    id: number,
    title: string,
    desc: string,
    createdAt: string,
    date: string
}
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const TodoCurrent = () => {
    const params = useParams<{ id: string }>();
    const id = params.id;

    const router = useRouter();

    const handleRedirect = () => {
        router.push("/inbox");
    };



    const [todo, setTodo] = useState<ApiResponce | null>(null);
    const [updTitle, setUpdTitle] = useState<string>("");
    const [updDesc, setUpdDesc] = useState<string>("");
    const [upd, setUpd] = useState<boolean>(false);

    useEffect(() => {
        const fetchTodo = async () => {
            const response = await axios.get<ApiResponce>(`${API_URL}/inbox/${id}`);
            setTodo(response.data);
        };
        fetchTodo();
    }, [id]);

    const deleteTodo = async (id: number) => {
        await axios.delete(`${API_URL}/delete/${id}`);
        setTodo(null);

    };

    const updateTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await axios.patch<ApiResponce>(`${API_URL}/update/${id}`, {
            title: updTitle,
            desc: updDesc,
        });

        setTodo(response.data);
        setUpd(false);

    };

    return (
        <div>
            {!upd ? (
                <div>
                    {todo ? (
                        <>
                            <div>
                                <h1>{todo.title}</h1>
                                <p>{todo.desc}</p>
                                <p>Дата создания: {todo.createdAt}</p>
                                <p>Выполнить до: {todo.date}</p>
                            </div>
                            <div className="flex gap-[10px]">
                                <button onClick={() => deleteTodo(todo.id)} className="bg-red-500 cursor-pointer">Удалить</button>
                                <button onClick={() => setUpd(true)} className="bg-blue-500 cursor-pointer">Редактировать</button>
                            </div>
                        </>
                    ) : (
                        <p onClick={handleRedirect}>Перейти на главную страницу </p>

                    )}
                </div>
            ) : (
                <form onSubmit={updateTodo}>
                    <input
                        type="text"
                        placeholder="Введите заголовок"
                        value={updTitle}
                        onChange={(e) => setUpdTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Введите описание"
                        value={updDesc}
                        onChange={(e) => setUpdDesc(e.target.value)}
                    />
                    <button type="submit">Сохранить</button>
                    <button type="button" onClick={() => setUpd(false)}>Отмена</button>
                </form>
            )}
        </div>
    );
};

export default TodoCurrent;