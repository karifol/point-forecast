import './App.css';
import Map from './components/Map/Map.js';
import Title from './components/Title/Title.js';
import PlaceInfo from './components/PlaceInfo/PlaceInfo.js';
import LoadingMap from './components/LoadingMap/LoadingMap.js';
import Forecast from './components/Forecast/Forecast.js';
import Button from './components/Button/Button.js';
import { useState } from 'react';

function App() {
  const [placeInfo, setPlaceInfo] = useState({
    lng: 139.767125,
    lat: 35.681236,
    zoom: 9,
    name: '東京' 
  });
  const [isMapLoading, setIsMapLoading] = useState(false);
  const [page, setPage] = useState("title");
  return (
    <div className="App">
      {
        page === "title" ? (
          <div className='w-screen h-screen flex flex-col items-center bg-black'>
            <Title text={ "Pin Point Forecast" } />
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
        ) : 
        (
          <Forecast 
            placeInfo={ placeInfo }
          />
        )
      }

    </div>
  );
}

export default App;
