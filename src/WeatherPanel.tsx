import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { WeatherData } from './types/weather';

const WeatherContainer = styled.div`
  padding: 1rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
  background: rgba(255, 255, 255, 0.05);
  color: inherit;
  
  &:focus {
    outline: none;
    border-color: #646cff;
  }
`;

const Button = styled.button`
  padding: 0.5rem;
  background: #646cff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #535bf2;
  }
`;

const WeatherInfo = styled.div`
  width: 100%;
  max-width: 300px;
  margin: 1rem auto;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;

  h3 {
    margin: 0 0 1rem 0;
    color: #646cff;
  }
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  margin: 1rem 0;
  font-size: 0.9rem;
  text-align: center;
`;

const Temperature = styled.p`
  font-size: 2rem !important;
  font-weight: bold;
  color: #646cff;
`;

const Description = styled.p`
  text-transform: capitalize;
`;

export function WeatherPanel() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const apiKey = 'e000eec6dcf2918668a3b609b07d1db0';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!city.trim()) {
      setError('Por favor ingresa una ciudad');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=es`
      );
      setWeather(response.data);
    } catch (error: any) {
      console.error('Error fetching weather data:', error);
      if (error.response?.status === 404) {
        setError('Ciudad no encontrada');
      } else if (error.response?.status === 401) {
        setError('Error de autenticación con el servicio del clima');
      } else {
        setError('Error al obtener el clima. Intenta nuevamente');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContainer>
      <h3>Clima Local</h3>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Ingresa una ciudad"
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Buscando...' : 'Ver Clima'}
        </Button>
      </Form>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      {weather && (
        <WeatherInfo>
          <h3>{weather.name}</h3>
          <Temperature>{Math.round(weather.main.temp)}°C</Temperature>
          <Description>{weather.weather[0].description}</Description>
        </WeatherInfo>
      )}
    </WeatherContainer>
  );
}