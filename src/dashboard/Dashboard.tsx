import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { storage } from '../utils/storage';
import { WaterLog } from '../types/index';
import { WeatherPanel } from '../WeatherPanel';

const DashboardContainer = styled.div`
  padding: 1rem;
  max-width: 800px;
  margin: 80px auto 0; // Añadir margen superior para la navegación
  text-align: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ProgressContainer = styled.div`
  background: #e0e0e0;
  border-radius: 10px;
  height: 20px;
  margin: 1rem 0;
  overflow: hidden;
`;

const ProgressBar = styled.div<{ width: number }>`
  background: #646cff;
  height: 100%;
  width: ${props => Math.min(props.width, 100)}%;
  transition: width 0.3s ease;
`;

const ProgressSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 8px;
  margin: 2rem 0;
`;

const AddWaterForm = styled.form`
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: #646cff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #535bf2;
  }
`;

const WaterInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100px;
  text-align: center;
  font-size: 1.1rem;
`;

// Añadir nuevo estilo para el contenedor de botones
const QuickAddContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 1rem 0;
`;

const QuickAddButton = styled(Button)`
  background: #535bf2;
  
  &:hover {
    background: #4347d9;
  }
`;

// Añadir estilos para el mensaje
const MotivationalMessage = styled.p`
  color: #646cff;
  font-weight: 500;
  margin: 1rem 0;
  font-size: 1.1rem;
  font-style: italic;
`;

// src/dashboard/Dashboard.tsx - Actualizar las funciones que usan los logs
export function Dashboard() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<WaterLog[]>([]);
  const [amount, setAmount] = useState(250);
  const user = storage.getUser();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setLogs(storage.getLogs(user.username));
  }, [navigate, user?.username]);

  const getTodayTotal = () => {
    const today = new Date().setHours(0, 0, 0, 0);
    return logs
      .filter(log => new Date(log.timestamp).setHours(0, 0, 0, 0) === today)
      .reduce((sum, log) => sum + log.amount, 0);
  };

  const handleAddWater = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !user) return;

    const newLog: WaterLog = {
      amount,
      timestamp: Date.now(),
      id: crypto.randomUUID()
    };

    const updatedLogs = [...logs, newLog];
    setLogs(updatedLogs);
    storage.setLogs(user.username, updatedLogs);
  };

  const handleQuickAdd = (amount: number) => {
    if (!user) return;

    const newLog: WaterLog = {
      amount,
      timestamp: Date.now(),
      id: crypto.randomUUID()
    };

    const updatedLogs = [...logs, newLog];
    setLogs(updatedLogs);
    storage.setLogs(user.username, updatedLogs);
  };

  const progress = (getTodayTotal() / (user?.dailyGoal || 2000)) * 100;

  const getMotivationalMessage = () => {
    const total = getTodayTotal();
    const goal = user?.dailyGoal || 2000;
    const remaining = goal - total;

    if (total === 0) {
      return "¡Comienza tu día con un vaso de agua!";
    }
    if (total === 250) {
      return "¡Excelente inicio! Mantén ese ritmo 💧";
    }
    if (total === goal) {
      return "¡Felicitaciones! Has alcanzado tu meta diaria! 🎉";
    }
    if (total >= goal) {
      return "¡Increíble! Has superado tu meta diaria! 🌟";
    }
    if (total === goal / 2) {
      return "¡Vas por la mitad! ¡Sigue así! 💪";
    }
    if (remaining === 500) {
      return "¡Solo te faltan 500ml para tu meta! 🎯";
    }
    if (remaining === 250) {
      return "¡Un vaso más y llegas a tu meta! 🚰";
    }
    return null;
  };

  return (
    <DashboardContainer>
      <h2>¡Hola, {user?.username}!</h2>

      <ProgressSection>
        <h3>Progreso Diario</h3>
        <ProgressContainer>
          <ProgressBar width={progress} />
        </ProgressContainer>
        <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
          {getTodayTotal()}ml de {user?.dailyGoal}ml
        </p>
        {getMotivationalMessage() && (
          <MotivationalMessage>
            {getMotivationalMessage()}
          </MotivationalMessage>
        )}
      </ProgressSection>

      {/* Agregar el panel del clima */}
      <ProgressSection>
        <WeatherPanel />
      </ProgressSection>

      <QuickAddContainer>
        <QuickAddButton onClick={() => handleQuickAdd(250)}>
          +250ml
        </QuickAddButton>
        <QuickAddButton onClick={() => handleQuickAdd(500)}>
          +500ml
        </QuickAddButton>
      </QuickAddContainer>

      <AddWaterForm onSubmit={handleAddWater}>
        <WaterInput
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          min="50"
          max="1000"
          step="50"
        />
        <Button type="submit">Añadir Agua</Button>
      </AddWaterForm>
    </DashboardContainer>
  );
}