import React from 'react'

const page = ({param}: {param: string}) => {
  const id = param
  return (
    <div>Profile page for user: {id}</div>
  )
}

export default page