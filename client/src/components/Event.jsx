import React, { useState, useEffect } from 'react'
import '../css/Event.css'
import EventsAPI from '../services/EventsAPI'
import dates from '../services/DatesAPI'
import darkCastle from '../assets/dark_castle.png'

const Event = (props) => {

    const [event, setEvent] = useState([])
    const [time, setTime] = useState([])
    const [remaining, setRemaining] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const eventData = await EventsAPI.getEventsById(props.id)
                setEvent(eventData)
            }
            catch (error) {
                console.error(error)
            }
        })()
    }, [props.id])

    useEffect(() => {
        (async () => {
            if (!event.time) return;
            try {
                const result = await dates.formatTime(event.time)
                setTime(result)
            }
            catch (error) {
                console.error(error)
            }
        })()
    }, [event.time])

    useEffect(() => {
        (async () => {
            if (!event.remaining) return;
            try {
                const timeRemaining = await dates.formatRemainingTime(event.remaining)
                setRemaining(timeRemaining)
                dates.formatNegativeTimeRemaining(remaining, event.id)
            }
            catch (error) {
                console.error(error)
            }
        })()
    }, [event.remaining, event.id, remaining])

    // Fallback image handling
    const handleImageError = (e) => {
        e.target.onerror = null; // Prevent infinite loop if fallback also fails
        e.target.src = darkCastle;
    }

    return (
        <article className='event-information'>
            <img src={props.image || event.image || darkCastle} alt={event.name || props.title} onError={handleImageError} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{event.name || props.title}</h3>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {event.date || props.date} <br /> {time || props.time}</p>
                    <p id={`remaining-${props.id}`}>{remaining}</p>
                </div>
            </div>
        </article>
    )
}

export default Event