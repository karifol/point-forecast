import React, { useEffect } from 'react'
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

function Map({ setLngLat }) {
  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [139.767125, 35.681236],
      zoom: 8
    });
    map.addControl(new mapboxgl.NavigationControl());
    // クリックでマーカーを設置
    map.on('click', (e) => {
      if (window.marker) {
        window.marker.remove();
      }
      window.marker = new mapboxgl.Marker()
        .setLngLat(e.lngLat)
        .addTo(map);
      const lng = Math.round(e.lngLat.lng * 10000) / 10000;
      const lat = Math.round(e.lngLat.lat * 10000) / 10000;
      setLngLat({ lng, lat });
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