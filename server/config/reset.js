import { pool } from "../config/database.js";
import { eventsData, locationsData } from "../data.js";

const createEventsTable = async () => {
    const createEventsTableQuery = `
        DROP TABLE IF EXISTS events;

        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            description TEXT NOT NULL
        )
    `

    try {
        const res = await pool.query(createEventsTableQuery)
        console.log('🎉 events table created successfully')
    } catch (err) {
        console.error('⚠️ error creating events table', err)
    }
}

const createLocationsTable = async () => {
    const createLocationsTableQuery = `
        DROP TABLE IF EXISTS locations;

        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            zip VARCHAR(255) NOT NULL
        )
    `

    try {
        const res = await pool.query(createLocationsTableQuery)
        console.log('🎉 locations table created successfully')
    } catch (err) {
        console.error('⚠️ error creating locations table', err)
    }
}

const createEventsAndLocationsTables = async () => {
    try {
        await createEventsTable()
        await createLocationsTable()
    } catch (err) {
        console.error('⚠️ error creating tables', err)
    }
}

const seedEventsTable = async () => {
    const seedEventsQuery = `
        INSERT INTO events (name, image, description)
        VALUES ($1, $2, $3)
    `

    for (const event of eventsData) {
        try {
            await pool.query(seedEventsQuery, [event.name, event.image, event.description])
            console.log(`🎉 ${event.name} seeded successfully`)
        } catch (err) {
            console.error('⚠️ error seeding event', err)
        }
    }
}

const seedLocationsTable = async () => {
    const seedLocationsQuery = `
        INSERT INTO locations (name, address, city, state, zip)
        VALUES ($1, $2, $3, $4, $5)
    `

    for (const location of locationsData) {
        try {
            await pool.query(seedLocationsQuery, [location.name, location.address, location.city, location.state, location.zip])
            console.log(`🎉 ${location.name} seeded successfully`)
        } catch (err) {
            console.error('⚠️ error seeding location', err)
        }
    }
}


const seedDatabase = async () => {
    await createEventsAndLocationsTables()
    await seedEventsTable()
    await seedLocationsTable()
}

seedDatabase()
