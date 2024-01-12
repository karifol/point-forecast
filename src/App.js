import './App.css';
import ForecastPage from './components/ForecastPage/ForecastPage.js';
import TitlePage from './components/TitlePage/TitlePage.js';
import { useState } from 'react';

function App() {
  const [placeInfo, setPlaceInfo] = useState({
    lng: 139.767125,
    lat: 35.681236,
    zoom: 9,
    name: '-'
  });
  const [isMapLoading, setIsMapLoading] = useState(false);
  const [page, setPage] = useState("title");
  return (
    <div className="App">
      {
        page === "title" ? (
          <TitlePage
            placeInfo={ placeInfo }
            setPlaceInfo={ setPlaceInfo }
            isMapLoading={ isMapLoading }
            setIsMapLoading={ setIsMapLoading }
            setPage={ setPage }
          />
        ) : 
        (
          <ForecastPage
            placeInfo={ placeInfo }
          />
        )
      }

    </div>
  );
}

export default App;
