import { pool } from "../config/database.js";


const getEvents = async (req, res) => {
    const getEventsQuery = `SELECT * FROM events`;
    try {
        const results = await pool.query(getEventsQuery)
        res.status(200).json(results.rows)
    } catch (err) {
        console.log('error: ', err)
    }
}

const getEventsById = async (req, res) => {
    const getEventByIdQuery = `SELECT * FROM events WHERE id = $1`;
    const eventId = req.params.id;
    try {
        const results = await pool.query(getEventByIdQuery, [eventId])
        res.status(200).json(results.rows[0])
    } catch (err) {
        console.log('error: ', err)
    }
}


export { getEvents, getEventsById }
