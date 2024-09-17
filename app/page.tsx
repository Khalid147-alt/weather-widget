"use client"
import React, { useState } from 'react';
import axios from 'axios';
import './WeatherApp.css'; // Import the CSS file for styling

const WeatherApp: React.FC = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [message, setMessage] = useState('');

  const API_KEY = 'd374f31afb0b4538b3c161528241709';
  
  const getWeather = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`);
      const data = response.data;
      setWeatherData(data);
      generateMessage(data);
    } catch (error) {
      console.error('Error fetching the weather data:', error);
      setMessage('Failed to retrieve weather data. Please try again.');
    }
  };

  const generateMessage = (data: any) => {
    const condition = data.current.condition.text.toLowerCase();
    const isDay = data.current.is_day;
    let timeOfDay = isDay ? 'day' : 'night';

    if (condition.includes('rain')) {
      setMessage(`It's a rainy ${timeOfDay} in ${location}! A perfect time to enjoy a cup of tea! 🌧`);
    } else if (condition.includes('sunny') || condition.includes('clear')) {
      setMessage(`It's a sunny ${timeOfDay} in ${location}! Stay hydrated! 🌞`);
    } else if (condition.includes('cloud')) {
      setMessage(`It's a cloudy ${timeOfDay} in ${location}, perfect for a walk! ☁️`);
    } else {
      setMessage(`The weather in ${location} is ${condition} this ${timeOfDay}. Stay comfy!`);
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <form onSubmit={getWeather}>
        <input 
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
        />
        <button type="submit">Get Weather</button>
      </form>
      
      {weatherData && (
        <div className="weather-info">
          <h2>Weather in {weatherData.location.name}, {weatherData.location.country}</h2>
          <p>Condition: {weatherData.current.condition.text}</p>
          <p>Temperature: {weatherData.current.temp_c} °C</p>
          <p>{weatherData.current.is_day ? 'Day' : 'Night'} Time</p>
          <p>Feels Like: {weatherData.current.feelslike_c} °C</p>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
