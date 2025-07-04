import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    const data = [
        {path:"/" , text:"Sentiment Analysis"},
        {path:"/text-summarization" , text:"Text Summarization"},
        {path:"/context-answering" , text:"Context Answer Question"},
    ]
  return (
    <div className='fixed top-0 w-full bg-white shadow py-4 px-3 flex  items-end gap-8'>
        <div className='font-bold text-2xl text-blue-500 py-1'>Noble Picks</div>
        {
            data.map((e)=>(
                <NavLink
                    to={e.path}
                    className={`hover:bg-gray-300 text-[15px] rounded py-1 px-1`}
                >
                    {e.text}
                </NavLink>
            ))
        }
    </div>
  )
}

export default NavBar