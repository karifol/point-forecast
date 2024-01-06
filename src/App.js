import './App.css';
import Map from './components/Map/Map.js';
import Title from './components/Title/Title.js';
import PlaceInfo from './components/PlaceInfo/PlaceInfo.js';
import LoadingMap from './components/LoadingMap/LoadingMap.js';
import { useState } from 'react';

function App() {
  const [placeInfo, setPlaceInfo] = useState({
    lng: 139.767125,
    lat: 35.681236,
    zoom: 9,
    name: '東京' 
  });
  const [isMapLoading, setIsMapLoading] = useState(false);
  return (
    <div className="App">
      <div className='w-screen h-screen flex flex-col items-center bg-black'>
        <Title text={ "PinPoint予報" } />
        <PlaceInfo
          placeName={ placeInfo.name }
          lat={ placeInfo.lat }
          lng={ placeInfo.lng }
        />
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
          <div className='w-9/12 h-4/6 absolute'>
            <Map
              placeInfo={ placeInfo }
              setPlaceInfo={ setPlaceInfo }
              setIsMapLoading={ setIsMapLoading }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
