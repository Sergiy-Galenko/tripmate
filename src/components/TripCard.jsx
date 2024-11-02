import React, { useState } from 'react';
import '../styles/TripCard.css';

const TripCard = ({ trip, onToggleFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(trip.favorite);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite(trip._id, !isFavorite); // Передаємо новий статус
  };

  return (
    <div className="trip-card">
      <h3>{trip.title}</h3>
      <p>{trip.description}</p>

      <button onClick={handleFavoriteClick} className={isFavorite ? 'favorite active' : 'favorite'}>
        {isFavorite ? '💖 Улюблений' : '🤍 Додати в улюблені'}
      </button>
    </div>
  );
};

export default TripCard;
