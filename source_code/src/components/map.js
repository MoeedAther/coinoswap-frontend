import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import '../css/Contact_us.css';

const center = {
  lat: 37.7749, // Replace with your desired latitude
  lng: -122.4194 // Replace with your desired longitude
};

const MapComponent = () => {
  return (
    <div className="map-container">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={{
            height: "100%", // Full height based on the container
            width: "100%"    // Full width
          }}
          center={center}
          zoom={10}
        >
          <Marker position={center} /> {/* Optional marker */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
