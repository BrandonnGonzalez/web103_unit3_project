import express from 'express'
// import controllers for events and locations
import { getEvents, getEventsById } from '../controllers/events.js'
import { getLocations, getLocationById } from '../controllers/locations.js'

const eventsRouter = express.Router()
const locationsRouter = express.Router()

// define routes to get events and locations
// events routes
eventsRouter.get('/', getEvents)
eventsRouter.get('/:id', getEventsById)

//locations routes
locationsRouter.get('/', getLocations)
locationsRouter.get('/:id', getLocationById)


export { eventsRouter, locationsRouter }   