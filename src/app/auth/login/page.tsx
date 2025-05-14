'use client'
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { setAuth } from "@/app/redux/authSlice"

const api = process.env.NEXT_PUBLIC_API_URL

interface Data {
    accessToken: string
}

const Page = () => {
    const redirect = useRouter()
    const dispatch = useDispatch();

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const getToken = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await axios.post<Data>(
                `${api}/auth/login`,
                { email, password },
                { withCredentials: true }
            )
            const token = response.data.accessToken
            dispatch(setAuth(token))
            setPassword('')
            setEmail('')
            redirect.push('/inbox')
            console.log('access_token:', token)
        } catch (err: any) {
            console.error('Ошибка входа', err)
            console.log(err.response?.data?.message )
        }
    }
    const logout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            await axios.post<any>(`${api}/auth/logout`, {}, { withCredentials: true });
            dispatch(setAuth(null)); // обнуляем токен в Redux
        } catch (err) {
            console.error('Ошибка выхода', err);
        }
    }


    return (
        <div className="flex justify-center">
            <div className="flex flex-col w-[350px] justify-center">
                <div className='pb-[16px]'>
                    <Image src='/logo.svg' width={32} height={32} alt="logo" />
                </div>
                <div className='pt-[12px]'>
                    <h1 className="font-bolds text-[32px]">Войти</h1>
                </div>
                <form className="flex flex-col gap-[20px]" onSubmit={getToken}>
                    <input
                        className="outline-none rounded-[5px] border border-[#e6e6e6] h-[62px] p-[5px]"
                        type="text"
                        placeholder="Введите Email-адрес..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="outline-none rounded-[5px] border border-[#e6e6e6] h-[62px] p-[5px]"
                        type="password"
                        placeholder="Введите пароль..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="h-[48px] rounded-[5px] bg-[#DC4C3E] text-white" type="submit">
                        Войти
                    </button>
                </form>
                <button onClick={logout} className="h-[48px] rounded-[5px] bg-[#5ba48d] text-white mt-5" >
                    выйти
                </button>



                <div className="pt-4 text-sm text-gray-500">Забыли пароль?</div>
                <div className="flex gap-[10px] text-sm">
                    <span>Еще нет аккаунта?</span>
                    <Link href='/auth/register' className="text-[#ff6a6a] underline">
                        Зарегистрироваться
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Page













