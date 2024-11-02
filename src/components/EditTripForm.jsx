import React, { useState } from 'react';
import { updateTrip } from '../services/tripService';

const EditTripForm = ({ trip, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(trip.title);
  const [description, setDescription] = useState(trip.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTrip = await updateTrip(trip._id, { title, description });
    onUpdate(updatedTrip);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Назва подорожі"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Опис подорожі"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Зберегти</button>
      <button type="button" onClick={onCancel}>Скасувати</button>
    </form>
  );
};

export default EditTripForm;
