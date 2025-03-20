import { NavLink, useLocation, useNavigate } from "react-router";
import styled from "@emotion/styled";
import { useTheme } from "../context/ThemeContext";
import { ArrowLeft, ChartBar, Moon, Music, Sun } from "lucide-react";
import { Theme } from "../types/sharedTypes";

const Nav = styled.nav<{ theme?: Theme }>`
  background-color: ${(props) => props.theme.surface};
  padding: 1rem 2rem;
  box-shadow: ${(props) => props.theme.shadow};
  transition: all 0.3s ease;
  position: sticky;
  top: 0;
  z-index: 20;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div<{ theme?: Theme }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 1.25rem;
  color: ${(props) => props.theme.primaryText};
  z-index: 30;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled(NavLink)<{ theme?: Theme }>`
  text-decoration: none;
  color: ${(props) => props.theme.secondaryText};
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  padding-bottom: 0.25rem;

  &:hover {
    color: ${(props) => props.theme.primaryText};
  }

  &.active {
    color: ${(props) => props.theme.primaryText};

    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: ${(props) => props.theme.accent};
    }
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0.5rem 0;

    &.active:after {
      bottom: -2px;
    }
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const IconButton = styled.button<{ theme?: Theme }>`
  background: none;
  border: none;
  color: ${(props) => props.theme.primaryText};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 30;

  &:hover {
    background-color: ${(props) => props.theme.surfaceHover};
  }
`;

const MobileNavItem = styled(NavLink)<{ theme?: Theme }>`
  display: none;
  text-decoration: none;
  color: ${(props) => props.theme.secondaryText};
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 50%;

  &:hover {
    color: ${(props) => props.theme.primaryText};
    background-color: ${(props) => props.theme.surfaceHover};
  }

  &.active {
    color: ${(props) => props.theme.primaryText};
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const BackButton = styled.button<{ theme?: Theme }>`
  display: none;
  background: none;
  border: none;
  color: ${(props) => props.theme.primaryText};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  margin-right: 0.5rem;

  &:hover {
    background-color: ${(props) => props.theme.surfaceHover};
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Navigation = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <Nav theme={theme}>
      <NavContainer>
        <LogoContainer>
          {!isHomePage && (
            <BackButton
              onClick={handleBackClick}
              theme={theme}
              aria-label="Back to home"
            >
              <ArrowLeft size={20} />
            </BackButton>
          )}
          <Logo>
            <Music size={20} />
            <span>SongManager</span>
          </Logo>
        </LogoContainer>

        <NavLinks>
          <NavItem to="/" end>
            Home
          </NavItem>
          <NavItem to="/add">Add Song</NavItem>
          <NavItem to="/statistics">Statistics</NavItem>
        </NavLinks>

        <ControlsContainer>
          <MobileNavItem to="/statistics" aria-label="Statistics">
            <ChartBar size={20} />
          </MobileNavItem>

          <IconButton
            onClick={toggleTheme}
            theme={theme}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </IconButton>
        </ControlsContainer>
      </NavContainer>
    </Nav>
  );
};

export default Navigation;
