import axios from "axios"
import { useState } from "react"


interface AddTodoProps {
    setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>;
}
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AddTodo: React.FC<AddTodoProps> = ({ setOpenAdd }) => {
    const [title, setTitle] = useState<string>('')
    const [desc, setDesc] = useState<string>('')
    const [date, setDate] = useState<string>('')



    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault()
        await axios.post(`h${API_URL}/addTodo`, { title, desc, date })
        setTitle('')
        setDesc('')
        setDate('')
    }



    return (
        <div className="flex w-full h-[200px] rounded-[20px] border border-[#d5d5d5]">
            <div className="flex w-full p-[10px]">
                <form className="flex flex-col gap-[10px] w-full" action="" onSubmit={submitForm}>
                    <input
                        className="outline-none"
                        type="text"
                        placeholder="Введите заголовок"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        className="outline-none"
                        type="text"
                        placeholder="Описание"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                    <input
                        type="date"
                        value={date || ''}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <div className="flex gap-[10px] justify-end">
                        <button className="bg-[#e1e1e1] p-[7px] rounded-[5px] cursor-pointer" onClick={() => setOpenAdd(false)}>Отмена</button>
                        <button className="bg-[#ff5a5a] p-[7px] text-[#fff] rounded-[5px] cursor-pointer" type="submit">Добавить задачу </button>
                    </div>
                </form>
            </div>


        </div>
    )
}

export default AddTodo