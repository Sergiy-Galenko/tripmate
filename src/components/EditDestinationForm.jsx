import React, { useState } from 'react';
import '../styles/EditDestinationForm.css';

const EditDestinationForm = ({ destination, onUpdate, onCancel }) => {
  const [name, setName] = useState(destination.name);
  const [description, setDescription] = useState(destination.description);
  const [lat, setLat] = useState(destination.lat);
  const [lng, setLng] = useState(destination.lng);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      ...destination,
      name,
      description,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Назва"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Опис"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Широта"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Довгота"
        value={lng}
        onChange={(e) => setLng(e.target.value)}
        required
      />
      <button type="submit">Зберегти</button>
      <button type="button" onClick={onCancel}>Скасувати</button>
    </form>
  );
};

export default EditDestinationForm;
