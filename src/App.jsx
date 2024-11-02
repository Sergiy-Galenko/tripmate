// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TripList from "./components/TripList";
import TripDetails from "./pages/TripDetails";
import AddTripForm from "./components/AddTripForm";
import FavoriteTrips from "./pages/FavoriteTrips";
import MapWithPlaces from "./components/MapWithPlaces";
import PlaceList from "./components/PlaceList";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/App.css";

function App() {
    return (
        <Router>
            <Navbar />
            <div>
                <ToastContainer position="top-right" autoClose={3000} />
                <h1>TripMate</h1>
                <AddTripForm />
                <Routes>
                    <Route path="/" element={<TripList />} />
                    <Route path="/trips/:id" element={<TripDetails />} />
                    <Route path="/favorites" element={<FavoriteTrips />} />
                    <Route path="/map" element={<MapWithPlaces />} />
                    <Route path="/places" element={<PlaceList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
