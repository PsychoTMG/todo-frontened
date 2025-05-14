'use client'

import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const api = process.env.NEXT_PUBLIC_API_URL

const page = () => {

    const [email, setEmail] = useState<string | ''>('')
    const [password, setPassword] = useState<string | ''>('')
    const [error, setError] = useState<string | ''>('')
    const [success, setSuccess] = useState<string | ''>('')

    const body = {
        email,
        password
    }

    const registerData = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        try {
            const response = await axios.post(`${api}/auth/register`, body)
            if (response.status === 201 || response.status === 200) {
                setSuccess('Регистрация успешна!')
                setEmail('')
                setPassword('')
            }
        } catch (err: any) {
            if (err) {
                console.error('Ошибка регистрации:', err.response.status)
                setError(err.response.data?.message || 'Что-то пошло не так')
            } else {
                setError('Произошла неизвестная ошибка')
            }
        }
    }

    return (
        <div className='flex justify-center' >
            <div className='flex w-[350px] flex-col justify-center'>
                <div className='pb-[16px]'> <Image
                    src='/logo.svg'
                    width={32}
                    height={32}
                    alt="logo"
                /> </div>
                <div className='pt-[12px]'><h1 className="font-bolds text-[32px]">Регистрация</h1></div>
                <div>
                    <form className='flex flex-col gap-[20px]' onSubmit={registerData}>
                        <input
                            className="outline-none rounded-[5px] border-1 border-[#e6e6e6] h-[62px] p-[5px] "
                            type="text"
                            placeholder='Введите личный Email...'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            className="outline-none rounded-[5px] border-1 border-[#e6e6e6] h-[62px] p-[5px] "
                            type="password"
                            placeholder='Введите пароль...'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="flex h-[48px] items-center justify-center rounded-[5px] bg-[#DC4C3E] text-[#fff]" type="submit">
                            Зарегистрироваться через Email
                        </button>
                    </form>
                </div>
                <div>
                    <span>Уже есть аккаунт? Тогда </span>
                    <span><Link href='/auth/login' className="text-[#ff6a6a] underline">войдите</Link></span>
                </div>
                <div className='text-[#00c700]'>{success !== '' ? 'Регистрация успешна!' : null}</div>
                {error && <div className="text-red-500">{error}</div>}
            </div>
        </div>
    )
}

export default page