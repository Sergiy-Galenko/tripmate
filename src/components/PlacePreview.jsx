import React from 'react';

const PlacePreview = ({ place }) => {
  return (
    <div className="place-preview">
      <h4>{place.name}</h4>
      <p>Категорія: {place.category}</p>
      <p>Рейтинг: {place.reviews.length ? (place.reviews.reduce((acc, r) => acc + r.rating, 0) / place.reviews.length).toFixed(1) : 'N/A'}</p>
    </div>
  );
};

export default PlacePreview;
