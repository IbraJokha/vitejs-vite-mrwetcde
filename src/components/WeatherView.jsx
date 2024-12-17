import React from 'react';

function WeatherView({ weatherData, onBack }) {
  const { date, dayAverage } = weatherData;
  const { temperature } = dayAverage;

  return (
    <div style={styles.container}>
      <h1>Weather Details</h1>
      <p><strong>Date:</strong> {date}</p>

      <h3>Temperature:</h3>
      <p><strong>Low:</strong> {temperature.low}°C</p>
      <p><strong>High:</strong> {temperature.high}°C</p>
      <p><strong>Feels Like:</strong> {temperature.feelsLike.toFixed(1)}°C</p>

      <button onClick={onBack} style={styles.button}>Back</button>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'left',
    maxWidth: '500px',
    margin: 'auto',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default WeatherView;
