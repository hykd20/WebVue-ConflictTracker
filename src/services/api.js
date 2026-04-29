import axios from 'axios'

const api = axios.create({
  baseURL: 'https://conflict-tracker-bgqk.onrender.com'
})

// CONFLICTS
export const getConflicts = () => api.get('/conflicts')
export const getConflictsByStatus = (status) => api.get(`/conflicts?status=${status}`)
export const getConflictById = (id) => api.get(`/conflicts/${id}`)
export const createConflict = (data) => api.post('/conflicts', data)
export const updateConflict = (id, data) => api.put(`/conflicts/${id}`, data)
export const deleteConflict = (id) => api.delete(`/conflicts/${id}`)

// COUNTRIES
export const getCountries = () => api.get('/countries')
export const createCountry = (data) => api.post('/countries', data)
export const deleteCountry = (id) => api.delete(`/countries/${id}`)

// FACTIONS
export const getFactions = () => api.get('/factions')
export const createFaction = (data) => api.post('/factions', data)
export const deleteFaction = (id) => api.delete(`/factions/${id}`)

// EVENTS
export const getEvents = () => api.get('/events')
export const createEvent = (data) => api.post('/events', data)
export const deleteEvent = (id) => api.delete(`/events/${id}`)
