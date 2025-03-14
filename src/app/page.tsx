"use client";

import React, {  useState } from 'react';
// import axios from 'axios';

interface ApiResponce {
  id: number,
  title: string,
  comleted: boolean
}

const Home = () => {
  const [data, setData] = useState<ApiResponce[] | null>(null);

  // useEffect(() => {
  //   const fetch = async () => {
  //     const responce = await axios.get<ApiResponce[]>('https://todo-backend-b3ts.onrender.com/todos');
  //     setData(responce.data);
  //   };

  //   fetch();
  // }, []);

  return (
    <div> Главная страница 
      {/* {data ? data.map(item => <> <div>{item.id}</div><div>{item.title}</div></>) : null} */}
    </div>
  );
};

export default Home;