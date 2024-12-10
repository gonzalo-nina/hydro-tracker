import { useState } from 'react';
import styled from 'styled-components';
import { storage, StorageKeys } from '../utils/storage';

const LoginContainer = styled.div`
  padding: 1rem;
  width: 100%;
  max-width: 400px;
  margin: 1rem auto;
  box-sizing: border-box;
`;

const Input = styled.input`
  width: 100%;
  max-width: 300px;
  box-sizing: border-box;
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

const Form = styled.form`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;

interface LoginProps {
  onLogin: (user: { username: string; dailyGoal: number }) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      // Check if this username already exists in storage
      const existingUserData = localStorage.getItem(StorageKeys.LOGS_PREFIX + username);
      
      const user = {
        username,
        dailyGoal: 2000,
        // Only set as new user if no previous data exists
        isNewUser: !existingUserData
      };
      
      storage.setUser(user);
      onLogin(user);
    }
  };

  return (
    <LoginContainer>
      <h1>HydroTracker</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Ingresa tu nombre"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Button type="submit">Comenzar</Button>
      </Form>
    </LoginContainer>
  );
}