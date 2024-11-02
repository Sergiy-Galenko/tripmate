import React, { useState } from "react";

const AddPlaceForm = ({ onAddPlace }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !category || !latitude || !longitude) {
      alert("Будь ласка, заповніть усі поля.");
      return;
    }

    const newPlace = {
      id: Date.now(),
      name,
      category,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };

    onAddPlace(newPlace);

    setName("");
    setCategory("");
    setLatitude("");
    setLongitude("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Додати нове місце</h3>
      <label>
        Назва:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Категорія:
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </label>
      <label>
        Широта:
        <input
          type="number"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
      </label>
      <label>
        Довгота:
        <input
          type="number"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
      </label>
      <button type="submit">Додати місце</button>
    </form>
  );
};

export default AddPlaceForm;
