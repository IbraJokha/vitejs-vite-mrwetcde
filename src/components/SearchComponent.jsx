import React, { useState } from 'react';

function SearchComponent({ onSearch }) {
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [errors, setErrors] = useState({ longitude: '', latitude: '', date: '' });
  const [loading, setLoading] = useState(false);

  const validateNumber = (value) => !isNaN(value) && value.trim() !== '';
  const validateDate = (value) => value.trim() !== '';

  const handleSearch = async () => {
    let newErrors = { longitude: '', latitude: '', date: '' };

    // Validate inputs
    if (!validateNumber(longitude)) newErrors.longitude = 'Longitude must be a valid number.';
    if (!validateNumber(latitude)) newErrors.latitude = 'Latitude must be a valid number.';
    if (!validateDate(selectedDate)) newErrors.date = 'Please select a date.';

    setErrors(newErrors);

    if (!newErrors.longitude && !newErrors.latitude && !newErrors.date) {
      setLoading(true);

      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_min,temperature_2m_max&timezone=auto`;
        const response = await fetch(url);

        if (!response.ok) throw new Error('Failed to fetch weather data');

        const data = await response.json();

        // Filter the data for the selected date
        const index = data.daily.time.indexOf(selectedDate);
        if (index === -1) throw new Error('No data available for the selected date.');

        const transformedData = {
          date: selectedDate,
          dayAverage: {
            weatherCode: 0, // Placeholder
            rainfall: { mm: 0, chance: 0, humidity: 0 }, // Placeholder
            temperature: {
              low: data.daily.temperature_2m_min[index],
              high: data.daily.temperature_2m_max[index],
              feelsLike: (data.daily.temperature_2m_min[index] + data.daily.temperature_2m_max[index]) / 2,
            },
            wind: { averageSpeed: 0, gustSpeed: 0, direction: 0 }, // Placeholder
          },
        };

        onSearch(transformedData);
      } catch (error) {
        console.error('Error:', error);
        alert('Error retrieving weather data. Please try again.');
      } finally {
        setLoading(false);
      }
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
      <p style={{ color: 'red' }}>{errors.date}</p>

      <br />
      <button onClick={handleSearch} style={styles.button} disabled={loading}>
        {loading ? 'Loading...' : 'Search'}
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
