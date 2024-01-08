import React from 'react'
import DateButton from '../DateButton/DateButton'
import SingleModelChart from '../SingleModelChart/SingleModelChart'
import EnsModelChart from '../EnsModelChart/EnsModelChart'
import ContentTitle from '../ContentTitle/ContentTitle'
import Title from '../Title/Title'
import { useEffect, useState } from 'react'

function ForecastPage({ placeInfo }) {
  const [date, setDate] = useState('')
  const [data, setData] = useState({})
  const [dateArray, setDateArray] = useState([])
  const [ensDate, setEnsDate] = useState('')
  const [ensData, setEnsData] = useState({})
  const [ensDateArray, setEnsDateArray] = useState([])

  return (
    <>
    <div
      className='
        w-screen h-screen
        flex flex-col items-center
        bg-black
        text-white text-2xlnp
      '
    >
      <Title
        text = { placeInfo.name }
        fontSize='2rem'
      />
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
      {/* <div 
        className='m-5'
      />
      <ContentTitle
        text='Ensemble Model Forecast'
      />
      <DateButton 
        dateArray = { ensDateArray }
        setDate   = { setEnsDate }
      />
      <EnsModelChart
        placeInfo = { placeInfo }
        date = { ensDate }
        setDate = { setEnsDate }
        data = { ensData }
        setData = { setEnsData }
        dateArray = { ensDateArray }
        setDateArray = { setEnsDateArray }
      /> */}
    </div>
    </>

  )
}
export default ForecastPage