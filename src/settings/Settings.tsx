import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { storage } from '../utils/storage';
import { User } from '../types';

const SettingsContainer = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
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

interface SettingsProps {
  onUpdateUser: (user: User) => void;
}

export function Settings({ onUpdateUser }: SettingsProps) {
  const navigate = useNavigate();
  const [dailyGoal, setDailyGoal] = useState(2000);

  useEffect(() => {
    const user = storage.getUser();
    if (user) {
      setDailyGoal(user.dailyGoal);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = storage.getUser();
    if (user) {
      const updatedUser = {
        ...user,
        dailyGoal,
        isNewUser: false
      };
      onUpdateUser(updatedUser);
      navigate('/panel');
    }
  };

  return (
    <SettingsContainer>
      <h1>Configuración</h1>
      <Form onSubmit={handleSubmit}>
        <label>
          Meta diaria de agua (ml):
          <Input
            type="number"
            min="500"
            max="5000"
            step="100"
            value={dailyGoal}
            onChange={(e) => setDailyGoal(Number(e.target.value))}
          />
        </label>
        <Button type="submit">Guardar</Button>
      </Form>
    </SettingsContainer>
  );
}