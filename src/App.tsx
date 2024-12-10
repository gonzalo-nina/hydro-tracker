import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Login } from './auth/Login';
import { Dashboard } from './dashboard/Dashboard';
import { Settings } from './settings/Settings';
import { storage } from './utils/storage';
import { User } from './types';
import { Navigation } from './components/common/Navigation';
import './App.css';

// src/App.tsx - Actualizar para manejar la redirección
function App() {
  const [user, setUser] = useState<User | null>(storage.getUser());

  const handleLogout = () => {
    storage.clearUser();
    setUser(null);
  };

  const handleUpdateUser = (updatedUser: User) => {
    storage.setUser(updatedUser);
    setUser(updatedUser);
  };

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!user) return <Navigate to="/login" />;
    
    // Redirigir usuarios nuevos a configuración
    if (user.isNewUser && window.location.pathname !== '/configuracion') {
      return <Navigate to="/configuracion" />;
    }

    return (
      <>
        <Navigation onLogout={handleLogout} />
        {children}
      </>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          !user ? <Login onLogin={setUser} /> : <Navigate to="/panel" />
        } />
        <Route path="/panel" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/configuracion" element={
          <ProtectedRoute>
            <Settings onUpdateUser={handleUpdateUser} />
          </ProtectedRoute>
        } />
        <Route path="/" element={<Navigate to="/panel" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
