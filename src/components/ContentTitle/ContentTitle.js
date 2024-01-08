import React from 'react'

function ContentTitle({ text }) {
  return (
    <div
      className='
        w-6/12 h-20
        flex items-center justify-center
        bg-black
        text-4xl text-gray-200
        border-b-2 border-white
        pb-5
        m-5
      '
    >
      { text }
    </div>
  )
}

export default ContentTitle