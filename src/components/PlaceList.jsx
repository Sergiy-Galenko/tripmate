import React from 'react';
import { useNavigate } from 'react-router-dom';

const places = [
  { id: 1, name: 'Місце 1', latitude: 50.4501, longitude: 30.5234 },
  { id: 2, name: 'Місце 2', latitude: 49.8397, longitude: 24.0297 },
  { id: 3, name: 'Місце 3', latitude: 48.9226, longitude: 24.7111 },
];

const PlaceList = () => {
  const navigate = useNavigate();

  const handlePlaceClick = (place) => {
    if (place.latitude && place.longitude) {
      navigate(`/map?latitude=${place.latitude}&longitude=${place.longitude}`);
    }
  };

  return (
    <div>
      <h2>Цікаві місця</h2>
      <ul>
        {places.map((place) => (
          <li key={place.id} onClick={() => handlePlaceClick(place)}>
            {place.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceList;
