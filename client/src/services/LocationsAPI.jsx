import axios from "axios";

const getAllEvents = () => {
    return axios.get('/api/events').then(res => res.data)
}

const getEventsById = (id) => {
    return axios.get(`/api/events/${id}`).then(res => res.data)
}

const getAllLocations = () => {
    return axios.get('/api/locations').then(res => res.data)
}

const getLocationsById = (id) => {
    return axios.get(`/api/locations/${id}`).then(res => res.data)
}


export default { getAllEvents, getEventsById, getAllLocations, getLocationsById }



