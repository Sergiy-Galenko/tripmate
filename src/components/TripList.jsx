import React, { useEffect, useState } from 'react';
import { fetchTrips, updateTrip } from '../services/tripService';
import TripCard from './TripCard';
import '../styles/TripList.css';

const TripList = () => {
  const [trips, setTrips] = useState([]);
  const [sortOrder, setSortOrder] = useState('date'); // критерій сортування
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false); // фільтр для улюблених маршрутів

  useEffect(() => {
    const loadTrips = async () => {
      const fetchedTrips = await fetchTrips();
      setTrips(fetchedTrips);
    };
    loadTrips();
  }, []);

  const handleToggleFavorite = async (tripId, favorite) => {
    const updatedTrips = trips.map((trip) =>
      trip._id === tripId ? { ...trip, favorite } : trip
    );
    setTrips(updatedTrips);

    const tripToUpdate = updatedTrips.find((trip) => trip._id === tripId);
    await updateTrip(tripId, tripToUpdate);
  };

  // Функція для сортування маршрутів
  const sortedTrips = trips
    .filter((trip) => (showFavoritesOnly ? trip.favorite : true))
    .sort((a, b) => {
      if (sortOrder === 'date') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortOrder === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  return (
    <div className="trip-list">
      <h2>Маршрути</h2>

      {/* Елементи керування для сортування та фільтрації */}
      <div className="controls">
        <label>
          Сортувати за:
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="date">Дата</option>
            <option value="title">Назва</option>
          </select>
        </label>
        <label>
          <input
            type="checkbox"
            checked={showFavoritesOnly}
            onChange={(e) => setShowFavoritesOnly(e.target.checked)}
          />
          Показати лише улюблені
        </label>
      </div>

      <div className="trip-cards">
        {sortedTrips.map((trip) => (
          <TripCard key={trip._id} trip={trip} onToggleFavorite={handleToggleFavorite} />
        ))}
      </div>
    </div>
  );
};

export default TripList;
