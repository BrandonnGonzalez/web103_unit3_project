import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import LocationsAPI from '../services/LocationsAPI'
import EventsAPI from '../services/EventsAPI'
import darkCastle from '../assets/dark_castle.png'
import '../css/LocationEvents.css'

const LocationEvents = ({index}) => {
    const [location, setLocation] = useState({})
    const [events, setEvents] = useState([])

    useEffect(() => {
        (async () => {
            try {
                // Fetch the location details
                const locationData = await LocationsAPI.getLocationsById(index)
                if (locationData && locationData.length > 0) {
                    setLocation(locationData[0])
                }

                // Fetch all events and populate them without filtering to fulfill user request
                const eventsData = await EventsAPI.getAllEvents()
                setEvents(eventsData)
            }
            catch (error) {
                console.error("Error fetching location data:", error)
            }
        }) ()
    }, [index])

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location.image || darkCastle} alt={location.name} />
                </div>

                <div className='location-info'>
                    <h2>{location.name}</h2>
                    <p>{location.address}, {location.city}, {location.state} {location.zip}</p>
                </div>
            </header>

            <main>
                {
                    events && events.length > 0 ? events.map((event, i) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.name}
                            date={event.date || 'TBD'}
                            time={event.time || 'TBD'}
                            image={event.image || darkCastle}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents