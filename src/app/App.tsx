import { Routes, Route } from "react-router";
import { Theme } from "../types/sharedTypes";
import { useTheme } from "../context/ThemeContext";
import styled from "@emotion/styled";
import HomePage from "../pages/HomePage";
import SongForm from "../features/songs/components/SongForm/SongForm";
import Statistics from "../features/stats/components/Statistics";
import Navigation from "../components/Navigation";
import { Toaster } from "sonner";

const AppContainer = styled.div<{ theme: Theme }>`
  min-height: 100vh;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.primaryText};
  transition: all 0.3s ease;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

function App() {
  const { theme } = useTheme();

  return (
    <AppContainer theme={theme}>
      <Toaster position="top-right" richColors expand={true} />
      <Navigation />
      <MainContent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<SongForm />} />
          <Route path="/edit/:id" element={<SongForm />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </MainContent>
    </AppContainer>
  );
}

export default App;
