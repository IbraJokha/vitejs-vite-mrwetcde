import React, { useState } from 'react';
import './App.css';
import SearchComponent from './components/SearchComponent';
import WeatherView from './components/WeatherView';

function App() {
  const [weatherData, setWeatherData] = useState(null);

  return (
    <div className="App">
      {!weatherData ? (
        <SearchComponent onSearch={(data) => setWeatherData(data)} />
      ) : (
        <WeatherView
          weatherData={weatherData}
          onBack={() => setWeatherData(null)}
        />
      )}
    </div>
  );
}

export default App;
