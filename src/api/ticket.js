import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getTickets = (token) => API.get("/tickets", { headers: { Authorization: `Bearer ${token}` } });
export const createTicket = (formData, token) => API.post("/tickets", formData, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } });
export const updateTicket = (id, data, token) => API.put(`/tickets/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
export const deleteTicket = (id, token) => API.delete(`/tickets/${id}`, { headers: { Authorization: `Bearer ${token}` } });

export const getTicket = (id, token) =>
    API.get(`/tickets/${id}`, { headers: { Authorization: `Bearer ${token}` } });
export const getComments = (ticketId, token) =>
    API.get(`/tickets/${ticketId}/comments`, { headers: { Authorization: `Bearer ${token}` } });
export const addComment = (ticketId, message, token) =>
    API.post(`/tickets/${ticketId}/comments`, { message }, { headers: { Authorization: `Bearer ${token}` } });

