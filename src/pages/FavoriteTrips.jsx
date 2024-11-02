import React, { useState, useEffect } from 'react';

const FavoriteTrips = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <div>
      <h2>Улюблені Місця</h2>
      {favorites.length > 0 ? (
        favorites.map((place) => (
          <div key={place.id}>
            <h4>{place.name}</h4>
            <p>{place.category}</p>
          </div>
        ))
      ) : (
        <p>Немає улюблених місць</p>
      )}
    </div>
  );
};

export default FavoriteTrips;
