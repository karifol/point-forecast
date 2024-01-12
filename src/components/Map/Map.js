import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
function Map({ placeInfo, setPlaceInfo, setIsMapLoading }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
            rtile: {
                type: 'raster',
                tiles: [
                    'https://tile.openstreetmap.jp/{z}/{x}/{y}.png',
                ],
                tileSize: 256,
                attribution:
                    '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
            },
        },
        layers: [
            {
                id: 'raster-tiles',
                type: 'raster',
                source: 'rtile',
                minzoom: 0,
                maxzoom: 22,
            },
        ],
    },
      center: [placeInfo.lng, placeInfo.lat],
      zoom: placeInfo.zoom,
    });
    // クリックでマーカーを設置
    map.current.on('click', async (e) => {
      if (window.marker) {
        window.marker.remove();
      }
      setIsMapLoading(true);
      await update(e);
      setIsMapLoading(false);
    });
    update({ lngLat: { lng: placeInfo.lng, lat: placeInfo.lat } });
  }, []);

  const update = async (e) => {
    const lngLat = e.lngLat;
    window.marker =  new maplibregl.Marker()
      .setLngLat(lngLat)
      .addTo(map.current);
    const lng = Math.round(lngLat.lng * 10000) / 10000;
    const lat = Math.round(lngLat.lat * 10000) / 10000;
  
    const address = await reverseGeocode(lng, lat);
    setPlaceInfo({
      ...placeInfo,
      lng,
      lat,
      name: address,
      zoom: map.current.getZoom()
    });
  }

  return (
    <div
      ref={mapContainer}
      id="map"
      className='
        w-full h-full
        rounded-lg
        map
        '
    >
    </div>
  )
}

const reverseGeocode = async (lng, lat) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
  const res = await fetch(url);
  const data = await res.json();
  const displayName = data.display_name;
  const text = displayName
  return text;
}



export default Map