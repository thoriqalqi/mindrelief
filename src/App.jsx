import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import CurhatPage from './pages/CurhatPage';
import ArtikelPage from './pages/ArtikelPage';
import BlogPage from './pages/BlogPage';
import TentangPage from './pages/TentangPage';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Check for saved theme preference or default to light mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    in: {
      opacity: 1,
      y: 0
    },
    out: {
      opacity: 0,
      y: -20
    }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
  };

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'dark' : ''
      }`}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <AnimatePresence mode="wait">
          <Routes>
            <Route 
              path="/" 
              element={
                <motion.div
                  key="landing"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <LandingPage />
                </motion.div>
              } 
            />
            <Route 
              path="/curhat" 
              element={
                <motion.div
                  key="curhat"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <CurhatPage />
                </motion.div>
              } 
            />
            <Route 
              path="/artikel" 
              element={
                <motion.div
                  key="artikel"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <ArtikelPage />
                </motion.div>
              } 
            />
            <Route 
              path="/blog" 
              element={
                <motion.div
                  key="blog"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <BlogPage />
                </motion.div>
              } 
            />
            <Route 
              path="/tentang" 
              element={
                <motion.div
                  key="tentang"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <TentangPage />
                </motion.div>
              } 
            />
          </Routes>
        </AnimatePresence>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">M</span>
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    MindRelief
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
                  Platform kesehatan mental yang didukung AI untuk membantu Anda menemukan ketenangan dan keseimbangan hidup.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  © 2024 MindRelief. Semua hak dilindungi.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Layanan</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li><a href="/curhat" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">AI Curhat</a></li>
                  <li><a href="/artikel" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Artikel</a></li>
                  <li><a href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blog</a></li>
                  <li><a href="/tentang" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Tentang Kami</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Dukungan</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pusat Bantuan</a></li>
                  <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Kebijakan Privasi</a></li>
                  <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Syarat Layanan</a></li>
                  <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Kontak</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

