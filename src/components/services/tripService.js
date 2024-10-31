const API_URL = 'http://localhost:5001/api/trips';

export const fetchTrips = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

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

export const deleteTrip = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};
