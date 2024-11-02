import React, { useState, useEffect } from 'react';
import '../styles/EditTripModal.css';

const EditTripModal = ({ trip, onClose, onSave }) => {
  const [title, setTitle] = useState(trip.title);
  const [description, setDescription] = useState(trip.description);

  useEffect(() => {
    setTitle(trip.title);
    setDescription(trip.description);
  }, [trip]);

  const handleSave = () => {
    onSave({
      ...trip,
      title,
      description,
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Редагувати маршрут</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Назва маршруту"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Опис маршруту"
        />
        <div className="modal-actions">
          <button onClick={handleSave}>Зберегти</button>
          <button onClick={onClose}>Скасувати</button>
        </div>
      </div>
    </div>
  );
};

export default EditTripModal;
