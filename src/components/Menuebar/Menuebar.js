import React from 'react'

function Menuebar({ text }) {
  return (
    <div 
      className='border-2 border-white w-80 h-screen
      flex flex-col justify-center items-center
      text-white font-bold text-2xl
      mt-5 mb-5
      w-60 h-20'
    >
      { text }
    </div>
  )
}

export default Menuebar