import React, { useState, useEffect } from 'react'
import LocationsAPI from '../services/LocationsAPI'
import darkCastle from '../assets/dark_castle.png'
import '../css/Locations.css'

const Locations = () => {

    const [locations, setLocations] = useState([])
    const [venueNames, setVenueNames] = useState({venue1: '', venue2: '', venue3: '', venue4: ''})

    useEffect(() => {
        (async () => {
            try {
                const locationsData = await LocationsAPI.getAllLocations()
                setLocations(locationsData)

                setVenueNames({venue1: locationsData[0].name, venue2: locationsData[1].name, venue3: locationsData[2].name, venue4: locationsData[3].name})
            }
            catch (error) {
                throw error
            }
        }) ()
    }, [])

    return (
        <div className='available-locations'>
            <div className='map-container'>
                <img src={darkCastle} id='background-map' alt="Dark Castle Map" />
                
                <a href='/echolounge' className='hotspot venue1-hotspot'>
                    <span className="hotspot-pulse"></span>
                    <span className="hotspot-label">{venueNames.venue1}</span>
                </a>
                
                <a href='/houseofblues' className='hotspot venue2-hotspot'>
                    <span className="hotspot-pulse"></span>
                    <span className="hotspot-label">{venueNames.venue2}</span>
                </a>
                
                <a href='/pavilion' className='hotspot venue3-hotspot'>
                    <span className="hotspot-pulse"></span>
                    <span className="hotspot-label">{venueNames.venue3}</span>
                </a>

                <a href='/americanairlines' className='hotspot venue4-hotspot'>
                    <span className="hotspot-pulse"></span>
                    <span className="hotspot-label">{venueNames.venue4}</span>
                </a>
            </div>
        </div>
    )
}

export default Locations