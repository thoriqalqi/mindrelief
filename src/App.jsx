import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import CurhatPage from './pages/CurhatPage';
import AnalisisPage from './pages/AnalisisPage';
import DashboardPage from './pages/DashboardPage';
import TentangPage from './pages/TentangPage';
import Footer from './components/Footer';
import { AnalysisProvider } from './context/AnalysisContext';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <AnalysisProvider>
      <Router>
        <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/curhat" element={<CurhatPage />} />
            <Route path="/analisis" element={<AnalisisPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/tentang" element={<TentangPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AnalysisProvider>
  );
}

export default App;


