import React from 'react'
import DateButton from '../DateButton/DateButton'
import SingleModelChart from '../SingleModelChart/SingleModelChart'
import ContentTitle from '../ContentTitle/ContentTitle'
import { useEffect, useState } from 'react'

function Forecast({ placeInfo }) {
  const [date, setDate] = useState('')
  const [data, setData] = useState({})
  const [dateArray, setDateArray] = useState([])

  return (
    <>
    <div
      className='
        w-screen h-screen
        flex flex-col items-center justify-center
        bg-black
        text-white text-2xlnp
      '
    >
      <ContentTitle
        text='Multi Model Forecast' 
      />
      <DateButton 
        dateArray = { dateArray }
        setDate   = { setDate }
      />
      <SingleModelChart
        placeInfo = { placeInfo }
        date = { date }
        setDate = { setDate }
        data = { data }
        setData = { setData }
        dateArray = { dateArray }
        setDateArray = { setDateArray }
      />
      <div 
        className='m-5'
      />
      <ContentTitle
        text='Ensemble Model Forecast'
      />
    </div>
    </>

  )
}
export default Forecast