import React from 'react'

function PlaceInfo({placeName, lat, lng }) {
  return (
    <div
      className='
        w-full h-40
        flex items-center justify-center flex-col
        bg-black
        text-2xl text-gray-200'
    >
      <div
        className='text-xl'
      >{placeName}</div>
      <table>
        <tbody>
          <tr>
            <td>緯度：</td>
            <td>{ lat }</td>
          </tr>
          <tr>
            <td>経度：</td>
            <td>{ lng }</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default PlaceInfo