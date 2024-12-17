import React, { useState } from 'react';
import weatherData from '../data/weatherData.json';

function SearchComponent({ onSearch }) {
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [errors, setErrors] = useState({ longitude: '', latitude: '' });

  const validateNumber = (value) => !isNaN(value) && value.trim() !== '';

  const handleSearch = () => {
    let newErrors = { longitude: '', latitude: '' };

    // Validate inputs
    if (!validateNumber(longitude))
      newErrors.longitude = 'Longitude must be a valid number.';
    if (!validateNumber(latitude))
      newErrors.latitude = 'Latitude must be a valid number.';

    setErrors(newErrors);

    // If inputs are valid, pass the weatherData.json to the parent
    if (!newErrors.longitude && !newErrors.latitude) {
      const today = new Date().toISOString().split('T')[0];
      const responseData = { ...weatherData };
      responseData.date = selectedDate || today; // Update date if user provides it
      onSearch(responseData);
    }
  };

  return (
    <div>
      <h1>Search for Weather</h1>
      <label>Longitude:</label>
      <input
        type="text"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        placeholder="Enter longitude"
      />
      <p style={{ color: 'red' }}>{errors.longitude}</p>

      <label>Latitude:</label>
      <input
        type="text"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        placeholder="Enter latitude"
      />
      <p style={{ color: 'red' }}>{errors.latitude}</p>

      <label>Select a Date:</label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <br />
      <br />

      <button onClick={handleSearch} style={styles.button}>
        Search
      </button>
    </div>
  );
}

const styles = {
  button: {
    padding: '10px 20px',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default SearchComponent;
