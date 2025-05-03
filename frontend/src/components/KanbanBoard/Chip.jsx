import React from 'react'
import { IoMdClose } from "react-icons/io";

const Chip = (props) => {
  return (
    <div className='flex items-center gap-2 px-2 py-1 rounded-full text-xs w-fit text-white' style={{backgroundColor: props.color}}>
        {props.text}
        {props.close && <IoMdClose onClick={props.onClose ? props.onClose():""} className='hover:cursor-pointer hover:text-red-500 ' />}
    </div>
  )
}

export default Chip