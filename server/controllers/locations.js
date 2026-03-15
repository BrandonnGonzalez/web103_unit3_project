import { pool } from "../config/database.js";

const getLocations = async (req, res) => {
    const getLocationsQuery = `SELECT * FROM locations`;
    try {
        const results = await pool.query(getLocationsQuery)
        res.status(200).json(results.rows)
    } catch (err) {
        console.log('error: ', err)
    }
}

const getLocationById = async (req, res) => {
    const getLocationByIdQuery = `SELECT * FROM locations WHERE id = $1`;
    const locationId = req.params.id;
    try {
        const results = await pool.query(getLocationByIdQuery, [locationId])
        res.status(200).json(results.rows)
    } catch (err) {
        console.log('error: ', err)
    }
}

export { getLocations, getLocationById }
