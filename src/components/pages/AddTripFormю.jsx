import React, { useState } from 'react';
import { createTrip } from '../services/tripService';

const AddTripForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTrip = await createTrip({ title, description });
    onAdd(newTrip);
    setTitle('');
    setDescription('');
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
      <button type="submit">Додати</button>
    </form>
  );
};

export default AddTripForm;
