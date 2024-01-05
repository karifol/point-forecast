import React, { useEffect } from 'react'
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

function Map() {
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2FpdG8wNTAyIiwiYSI6ImNsNmRiZG42aTI2dzkzZW8xYnh6MjZ0ZTIifQ.x92zPsPkjOTIZTmLY-j4vA';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [139.767125, 35.681236],
      zoom: 8
    });
  }, [])
  return (
    <div 
      id="map"
      className='
        w-full h-full
        rounded-lg'
    >
    </div>
  )
}

export default Map