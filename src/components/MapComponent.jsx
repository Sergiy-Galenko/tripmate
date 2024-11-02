import React, { useEffect, useRef } from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

const MapComponent = ({ locations = [] }) => {
  const mapRef = useRef(null);

  // Генеруємо лінію для маршруту
  const routeLine = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: locations
        .filter((loc) => loc.lng && loc.lat)
        .map((loc) => [loc.lng, loc.lat]),
    },
  };

  const lineLayer = {
    id: 'route',
    type: 'line',
    source: 'route',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': '#3b9ddd',
      'line-width': 4,
    },
  };

  useEffect(() => {
    if (mapRef.current && locations.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      locations.forEach((loc) => {
        if (loc && loc.lng !== undefined && loc.lat !== undefined) {
          bounds.extend([loc.lng, loc.lat]);
        }
      });
      mapRef.current.fitBounds(bounds, { padding: 50 });
    }
  }, [locations]);

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: 31.1656,
        latitude: 48.3794,
        zoom: 5,
      }}
      style={{ width: '100%', height: '400px' }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      {locations.length > 0 &&
        locations.map((location, index) => (
          location.lng !== undefined && location.lat !== undefined && (
            <Marker
              key={index}
              longitude={location.lng}
              latitude={location.lat}
              anchor="bottom"
            >
              <div style={{ color: 'red' }}>📍</div>
            </Marker>
          )
        ))}

      {locations.length > 1 && (
        <Source id="route" type="geojson" data={routeLine}>
          <Layer {...lineLayer} />
        </Source>
      )}
    </Map>
  );
};

export default MapComponent;
