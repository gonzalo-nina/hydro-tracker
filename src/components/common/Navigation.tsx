// src/components/common/Navigation.tsx
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Nav = styled.nav`
  background-color: #1a1a1a;
  padding: 1rem;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const NavContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavButton = styled.button`
  background: transparent;
  color: #646cff;
  border: 1px solid #646cff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #646cff;
    color: white;
  }
`;

export function Navigation({ onLogout }: { onLogout: () => void }) {
  const navigate = useNavigate();

  return (
    <Nav>
      <NavContent>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>HydroTracker</h1>
        <ButtonGroup>
          <NavButton onClick={() => navigate('/configuracion')}>
            Configuración
          </NavButton>
          <NavButton onClick={onLogout}>
            Cerrar Sesión
          </NavButton>
        </ButtonGroup>
      </NavContent>
    </Nav>
  );
}