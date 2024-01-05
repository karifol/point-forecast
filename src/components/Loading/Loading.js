import React from 'react'
import { useState, useEffect } from 'react'

function Loading() {
  const [text, setText] = useState('Loading')
  
  useEffect(() => {
    let progress = 0;
    loading(progress)
  }, [])

  const loading = (progress) => {
    setInterval(() => {
      // 表示更新
      const dots = '.'.repeat(progress)
      setText(`Loading${dots}`)
      // progress更新
      if (progress < 3) {
        progress++
      } else {
        progress = 0
      }
    }, 500)
  }

  return (
    <div
      className='
        w-screen h-screen
        flex justify-center items-center
        text-5xl
      '
    >{text}</div>
  )
}



export default Loading