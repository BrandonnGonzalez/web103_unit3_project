import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'
import darkCastle from '../assets/dark_castle.png'
import '../css/LocationEvents.css'

const Events = () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const eventsData = await EventsAPI.getAllEvents()
                setEvents(eventsData)
            }
            catch (error) {
                console.error(error)
            }
        })()
    }, [])

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={darkCastle} alt="UnityGrid Plaza" />
                </div>

                <div className='location-info'>
                    <h2>All Events</h2>
                    <p>Experience the magic at ConcertHub.</p>
                </div>
            </header>

            <main>
                {
                    events && events.length > 0 ? events.map((event, index) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.name}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default Events
