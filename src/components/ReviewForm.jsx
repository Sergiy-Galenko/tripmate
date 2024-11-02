import React, { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, comment });
    setRating(5);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Залишити відгук</h4>
      <label>
        Рейтинг:
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
      </label>
      <br />
      <label>
        Коментар:
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </label>
      <br />
      <button type="submit">Надіслати відгук</button>
    </form>
  );
};

export default ReviewForm;
