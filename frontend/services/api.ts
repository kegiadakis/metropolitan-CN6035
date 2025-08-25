import axios from 'axios';
import { API_BASE_URL } from '../constants/config';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Auth
export const loginUser = async (email: string, password: string) => {
  const res = await api.post('/auth/login', { email: email, password: password });
  return res.data;
};

export const registerUser = async (name: string, email: string, password: string) => {
  const res = await api.post('/auth/register', { name: name, email: email, password: password });
  return res.data;
};

// Cinemas
export const getCinemas = async (token: string) => {
  const res = await api.get('/cinemas', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getAllMovies = async(token: string) => {
  const res = await api.get(`/movies`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// Movies by Cinema
export const getMoviesByCinema = async (cinemaId: number, token: string) => {
  const res = await api.get(`/movies?cinema_id=${cinemaId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Reservations
export const getUserReservations = async (token: string) => {
  const res = await api.get('/reservations', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createReservation = async (
  token: string,
  movie_id: number,
  cinema_id: number,
  date: string,
  time: string,
  seat_numbers: string
) => {
  const res = await api.post(
    '/reservations',
    { movie_id: movie_id, cinema_id: cinema_id, date: date, time: time, seat_numbers: seat_numbers },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// Delete reservation
export const deleteReservation = async (token: string, reservationId: number) => {
  return await api.delete(`/reservations/${reservationId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Update reservation
export const updateReservation = async (
  token: string,
  reservationId: number,
  updatedData: { date?: string; time?: string; seat_numbers?: string }
) => {
  var dataToUpdate: { date?: string; time?: string; seat_numbers?: string } = {};
  if (updatedData.date) {
    dataToUpdate.date = updatedData.date;
  }

  if (updatedData.time) {
    dataToUpdate.time = updatedData.time;
  }

  if (updatedData.seat_numbers) {
    dataToUpdate.seat_numbers = updatedData.seat_numbers;
  }

  return await api.put(`/reservations/${reservationId}`, dataToUpdate, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default api;