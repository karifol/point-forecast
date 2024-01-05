import React from 'react'

function PlaceInfo({placeName, lat, lng }) {
  return (
    <div
      className='
        w-full h-40
        flex items-center justify-center
        bg-black
        text-3xl text-gray-200'
    >
      <table>
        <tbody>
          <tr>
            <td colSpan={2}>{ placeName }</td>
          </tr>
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