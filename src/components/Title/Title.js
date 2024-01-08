import React from 'react'
import { useEffect, useState } from 'react'

function Title({ text, fontSize }) {
  useEffect(() => {
    const title = document.getElementById('title')
    title.style.fontSize = fontSize
  }, [])
  return (
    <div
      id='title'
      className='
        w-full h-20
        flex items-center justify-center
        bg-black
        bold
        text-gray-200'
      >
      {text}
    </div>
  )
}

export default Title