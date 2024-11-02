import React, { useState } from "react";
import TripList from '../components/TripList';
import AddTripForm from '../components/AddTripForm';

const HomePage = () => {
    const [trips, setTrips] = useState([]);

    const handleAddTrip = (newTrip) => {
        setTrips((prevTrips) => [...prevTrips, newTrip]);
    };

    return (
        <div>
            <h1>TripMate: Планування подорожей</h1>
            <AddTripForm onAdd={handleAddTrip} />
            <TripList trips={trips} />
        </div>
    );
};

export default HomePage;
