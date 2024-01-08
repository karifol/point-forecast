import React from 'react'

function DateButton({ dateArray, setDate }) {
  return (
    <div 
      className='
        m-5
      '
    >
      {
        dateArray.map((date, index) => {
          return (
            <button
              className='
                w-20 h-10
                m-2 p-0
                border-2 border-white rounded-full
                text-white text-2xl
                hover:bg-white hover:text-black
              '
              key={index}
              onClick={() => setDate(date)}
            >
              {date}
            </button>
          )
        })
      }
    </div>
  )
}

export default DateButton