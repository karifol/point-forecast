import React from 'react'

function ContentTitle({ text }) {
  return (
    <div
      className='
        mt-4
        w-9/12 h-10
        flex items-center justify-center
        bg-black
        text-2xl text-gray-200
        border-b-2 border-white
      '
    >
      { text }
    </div>
  )
}

export default ContentTitle