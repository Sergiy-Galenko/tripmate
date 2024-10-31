import React, { useEffect, useState } from 'react';
import { fetchTrips, deleteTrip } from '../services/tripService';

const TripList = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const loadTrips = async () => {
      const fetchedTrips = await fetchTrips();
      setTrips(fetchedTrips);
    };
    loadTrips();
  }, []);

  const handleDelete = async (id) => {
    await deleteTrip(id);
    setTrips(trips.filter((trip) => trip._id !== id));
  };

  return (
    <div>
      <h2>Маршрути подорожей</h2>
      <ul>
        {trips.map((trip) => (
          <li key={trip._id}>
            <h3>{trip.title}</h3>
            <button onClick={() => handleDelete(trip._id)}>Видалити</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripList;
