import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getTickets = (token) => API.get("/tickets", { headers: { Authorization: `Bearer ${token}` } });
export const createTicket = (formData, token) => API.post("/tickets", formData, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } });
export const updateTicket = (id, data, token) => API.put(`/tickets/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
export const deleteTicket = (id, token) => API.delete(`/tickets/${id}`, { headers: { Authorization: `Bearer ${token}` } });
