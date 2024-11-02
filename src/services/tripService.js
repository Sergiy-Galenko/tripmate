const API_URL = 'http://localhost:5001/api/trips';

// Отримання всіх маршрутів
export const fetchTrips = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

// Створення нового маршруту
export const createTrip = async (tripData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tripData),
  });
  return response.json();
};

// Оновлення маршруту
export const updateTrip = async (id, tripData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tripData),
  });
  return response.json();
};

// Видалення маршруту
export const deleteTrip = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};
