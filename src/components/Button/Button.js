import React from 'react'

function Button({ setPage }) {
  return (
    <div
      className='
      w-40 h-10
      bg-black
      mb-4
      cursor-pointer
      border-2 border-white rounded-lg
      text-2xl text-white
      flex items-center justify-center
      hover:bg-white hover:text-black
      '
      onClick={ () => setPage("forecast")}
    >
      予測を見る
    </div>
  )
}

export default Button