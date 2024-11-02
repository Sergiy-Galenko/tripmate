import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTrips, updateTrip } from '../services/tripService';
import MapComponent from '../components/MapComponent';
import EditDestinationForm from '../components/EditDestinationForm';
import '../styles/TripDetails.css';


const TripDetails = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [editingDestination, setEditingDestination] = useState(null);
  const [newDestination, setNewDestination] = useState({
    name: '',
    description: '',
    lat: '',
    lng: '',
  });

  useEffect(() => {
    const loadTrip = async () => {
      const trips = await fetchTrips();
      const selectedTrip = trips.find((trip) => trip._id === id);
      setTrip(selectedTrip);
    };
    loadTrip();
  }, [id]);

  const handleAddDestination = async (e) => {
    e.preventDefault();
    const updatedDestinations = [...trip.destinations, newDestination];
    const updatedTrip = await updateTrip(id, { ...trip, destinations: updatedDestinations });
    setTrip(updatedTrip);
    setNewDestination({ name: '', description: '', lat: '', lng: '' });
  };

  const handleUpdateDestination = async (updatedDestination) => {
    const updatedDestinations = trip.destinations.map((dest) =>
      dest._id === updatedDestination._id ? updatedDestination : dest
    );
    const updatedTrip = await updateTrip(id, { ...trip, destinations: updatedDestinations });
    setTrip(updatedTrip);
    setEditingDestination(null);
  };

  if (!trip) {
    return <div>Завантаження...</div>;
  }

  return (
    <div>
      <h2>{trip.title}</h2>
      <p>{trip.description}</p>

      <h3>Пункти призначення:</h3>
      <ul>
        {trip.destinations.map((destination) => (
          <li key={destination._id}>
            {editingDestination && editingDestination._id === destination._id ? (
              <EditDestinationForm
                destination={destination}
                onUpdate={handleUpdateDestination}
                onCancel={() => setEditingDestination(null)}
              />
            ) : (
              <>
                <strong>{destination.name}</strong>: {destination.description}
                <button onClick={() => setEditingDestination(destination)}>Редагувати</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <h3>Додати новий пункт призначення</h3>
      <form onSubmit={handleAddDestination}>
        <input
          type="text"
          placeholder="Назва"
          value={newDestination.name}
          onChange={(e) => setNewDestination({ ...newDestination, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Опис"
          value={newDestination.description}
          onChange={(e) => setNewDestination({ ...newDestination, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Широта"
          value={newDestination.lat}
          onChange={(e) => setNewDestination({ ...newDestination, lat: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Довгота"
          value={newDestination.lng}
          onChange={(e) => setNewDestination({ ...newDestination, lng: e.target.value })}
          required
        />
        <button type="submit">Додати пункт призначення</button>
      </form>

      <MapComponent locations={trip.destinations} />
    </div>
  );
};

export default TripDetails;