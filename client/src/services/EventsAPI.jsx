import axios from "axios";

const getAllEvents = () => {
    return axios.get('/api/events').then(res => res.data)
}

const getEventsById = (id) => {
    return axios.get(`/api/events/${id}`).then(res => res.data)
}

export default { getAllEvents, getEventsById }
