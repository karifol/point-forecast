import React from 'react'
import Map from '../Map/Map.js';
import Title from '../Title/Title.js';
import PlaceInfo from '../PlaceInfo/PlaceInfo.js';
import LoadingMap from '../LoadingMap/LoadingMap.js';
import Button from '../Button/Button.js';

function TitlePage( { placeInfo, setPlaceInfo, isMapLoading, setIsMapLoading, setPage }) {
  return (
    <div className='w-screen h-screen flex flex-col items-center bg-black'>
      <Title
        text={ "Pin Point Forecast" }
        fontSize={ "4rem" }
      />
      <PlaceInfo
        placeName={ placeInfo.name }
        lat={ placeInfo.lat }
        lng={ placeInfo.lng }
      />
      <Button setPage={ setPage } />
      <div className='w-9/12 h-4/6'>
        {
          isMapLoading ? (
            <div
              className='w-9/12 h-4/6 flex items-center justify-center absolute z-10'
            >
              <LoadingMap />
            </div>
          ) : null
        }
        <div className='w-full h-full'>
          <Map
            placeInfo={ placeInfo }
            setPlaceInfo={ setPlaceInfo }
            setIsMapLoading={ setIsMapLoading }
          />
        </div>
      </div>
    </div>
  )
}

export default TitlePage