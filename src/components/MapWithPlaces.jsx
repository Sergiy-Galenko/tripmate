import React, { useState, useEffect, useCallback, useMemo } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl";
import AddPlaceForm from "./AddPlaceForm";
import CategoryFilter from "./CategoryFilter";
import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/MapWithPlaces.css";

const MapWithPlaces = () => {
  const initialPlaces = JSON.parse(localStorage.getItem("places")) || [];
  const [places, setPlaces] = useState(initialPlaces);
  const [viewState, setViewState] = useState({
    latitude: 50.4501,
    longitude: 30.5234,
    zoom: 6,
  });
  const [selectedCategory, setSelectedCategory] = useState("Всі");
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [travelTime, setTravelTime] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isSelectingStart, setIsSelectingStart] = useState(false);
  const [isSelectingEnd, setIsSelectingEnd] = useState(false);

  const availablePlaces = useMemo(
    () => [
      {
        name: "Restaurant Park Café",
        type: "restaurant",
        address: "Seestraße 22, Bad Saarow, Brandenburg 15526, Germany",
        coordinates: [14.0737, 52.2834],
      },
      {
        name: "Hotel & Restaurant Park Cafe ISA",
        type: "hotel",
        address: "Sternberger Straße 6, Erfurt, Thuringia 99091, Germany",
        coordinates: [11.0405, 51.0036],
      },
      // Додайте інші місця тут
    ],
    []
  );

  useEffect(() => {
    localStorage.setItem("places", JSON.stringify(places));
  }, [places]);

  const handleAddPlace = (newPlace) => {
    setPlaces((prevPlaces) => [...prevPlaces, newPlace]);
  };

  const fetchRoute = useCallback(async () => {
    if (!startPoint || !endPoint) return;

    const response = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${startPoint.longitude},${startPoint.latitude};${endPoint.longitude},${endPoint.latitude}?geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
    );
    const data = await response.json();
    const routeCoordinates = data.routes[0].geometry.coordinates;
    setRouteData(data.routes[0].geometry);
    setTravelTime((data.routes[0].duration / 60).toFixed(2));

    const placesOnRoute = availablePlaces.filter((place) =>
      routeCoordinates.some(
        (routePoint) =>
          Math.abs(routePoint[0] - place.coordinates[0]) < 0.1 &&
          Math.abs(routePoint[1] - place.coordinates[1]) < 0.1
      )
    );

    setFilteredPlaces(placesOnRoute);
  }, [startPoint, endPoint, availablePlaces]);

  useEffect(() => {
    fetchRoute();
  }, [fetchRoute]);

  const handleMapClick = (event) => {
    const { lngLat } = event;
    if (isSelectingStart) {
      setStartPoint({ longitude: lngLat.lng, latitude: lngLat.lat });
      setIsSelectingStart(false);
    } else if (isSelectingEnd) {
      setEndPoint({ longitude: lngLat.lng, latitude: lngLat.lat });
      setIsSelectingEnd(false);
    }
  };

  return (
    <div className="map-container">
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <AddPlaceForm onAddPlace={handleAddPlace} />
      <div className="route-buttons">
        <button onClick={() => setIsSelectingStart(true)}>Вибрати стартову точку</button>
        <button onClick={() => setIsSelectingEnd(true)}>Вибрати кінцеву точку</button>
        <button onClick={() => { setStartPoint(null); setEndPoint(null); setRouteData(null); setTravelTime(null); setFilteredPlaces([]); }}>Очистити точки та маршрут</button>
        <button onClick={() => setShowModal(true)}>Показати цікаві місця</button>
      </div>

      {travelTime && <div className="info-card">Час подорожі: <strong>{travelTime} хвилин</strong></div>}

      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        onClick={handleMapClick}
        style={{ width: "100%", height: "500px" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        {startPoint && (
          <Marker longitude={startPoint.longitude} latitude={startPoint.latitude} anchor="bottom">
            <div style={{ fontSize: "24px", color: "blue" }}>🏁</div>
          </Marker>
        )}

        {endPoint && (
          <Marker longitude={endPoint.longitude} latitude={endPoint.latitude} anchor="bottom">
            <div style={{ fontSize: "24px", color: "red" }}>🏁</div>
          </Marker>
        )}

        {filteredPlaces.map((place, index) => (
          <Marker
            key={index}
            longitude={place.coordinates[0]}
            latitude={place.coordinates[1]}
            anchor="bottom"
          >
            <div style={{ fontSize: "24px", color: "purple", cursor: "pointer" }}>⭐</div>
          </Marker>
        ))}

        {routeData && (
          <Source id="route" type="geojson" data={{ type: "Feature", geometry: routeData }}>
            <Layer
              id="route-layer"
              type="line"
              paint={{
                "line-color": "#3b9ddd",
                "line-width": 4,
              }}
            />
          </Source>
        )}
      </Map>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Цікаві місця по маршруту</h3>
            {filteredPlaces.length > 0 ? (
              filteredPlaces.map((place, index) => (
                <div key={index} className="recommendation-card">
                  <p><strong>{place.name}</strong> - {place.type}</p>
                  <p>{place.address}</p>
                </div>
              ))
            ) : (
              <p>Немає цікавих місць</p>
            )}
            <button onClick={() => setShowModal(false)}>Закрити</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapWithPlaces;
