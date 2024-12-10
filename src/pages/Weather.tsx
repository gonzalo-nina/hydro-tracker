// src/pages/Weather.tsx
import { WeatherPanel } from '../WeatherPanel';
import styled from 'styled-components';

const WeatherPageContainer = styled.div`
  padding: 1rem;
  max-width: 800px;
  margin: 80px auto 0;
  text-align: center;
`;

export function Weather() {
  return (
    <WeatherPageContainer>
      <h2>Clima</h2>
      <WeatherPanel />
    </WeatherPageContainer>
  );
}