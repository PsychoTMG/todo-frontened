
import React from 'react'

interface Props {
  params: {
    id: string
  }
}
const Page = ({ params }: Props) => {
  const id = params.id;
  return (
    <div>{id}</div>
  )
}

export default Page