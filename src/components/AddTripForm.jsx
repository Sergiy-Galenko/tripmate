import React, { useState } from 'react';
import { createTrip } from '../services/tripService';
import { toast } from 'react-toastify';
import '../styles/AddTripForm.css';

const AddTripForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTrip = await createTrip({ title, description });
      onAdd(newTrip);
      setTitle('');
      setDescription('');
      toast.success('Маршрут успішно додано!'); // Сповіщення про успіх
    } catch (error) {
      toast.error('Не вдалося додати маршрут. Спробуйте ще раз.');
    }
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
