import './App.css';
import Map from './components/Map/Map.js';
import Title from './components/Title/Title.js';
import PlaceInfo from './components/PlaceInfo/PlaceInfo.js';
import { useState } from 'react';

function App() {
  const [lngLat, setLngLat] = useState({ lng: 139.767125, lat: 35.681236 });
  return (
    <div className="App">
      <div className='w-screen h-screen flex flex-col items-center bg-black'>
        <Title text={ "PinPoint予報" } />
        <PlaceInfo
          placeName={ "東京" }
          lat={ lngLat.lat }
          lng={ lngLat.lng }
        />
        <div className='w-9/12 h-4/6'>
          <Map 
            setLngLat={ setLngLat }
          />
        </div>
      </div>
    </div>
  );
}

export default App;
