import axios from "axios";

const API_BASE_URL = "https://school-restaurant-api.azurewebsites.net";

// hämta bokning
export const fetchBookingAPI = async (
  restaurantId: string = "65ca1c36da99d8d7087f3513"
) => {
  const response = await axios.get(
    `${API_BASE_URL}/booking/restaurant/${restaurantId}`
  );
  return response.data;
};

// skapa bokning
export const createBookingAPI = async (formData: unknown) => {
  const response = await axios.post(`${API_BASE_URL}/booking/create`, formData);
  return response.data;
};

// ta bort bokning
export const deleteBookingById = async (bookingId: string) => {
  await axios.delete(`${API_BASE_URL}/booking/delete/${bookingId}`);
};

// uppdatera bokning
export const updateBookingById = async (
  bookingId: string,
  bookingData: unknown
) => {
  await axios.put(`${API_BASE_URL}/booking/update/${bookingId}`, bookingData);
};
