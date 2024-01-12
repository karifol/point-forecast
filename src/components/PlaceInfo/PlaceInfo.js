import React from 'react'

function PlaceInfo({placeName, lat, lng }) {
  return (
    <div
      className='
        w-full h-full
        flex items-center justify-center flex-col
        bg-black
        text-2xl text-gray-200'
    >
      <div
        className='text-xl'
      >{placeName}</div>
    </div>
  )
}

export default PlaceInfo