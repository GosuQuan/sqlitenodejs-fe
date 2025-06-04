import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

// ScrollToTop component to ensure page scrolls to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        {/* Scanlines effect overlay */}
        <div className="scanlines"></div>
        
        <header className="header">
          <div className="container">
            <nav className="nav">
              <Link to="/" className="nav-logo">CYBER<span className="logo-accent">NEXUS</span></Link>
              <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
                <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>首页</Link>
                <Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>关于我们</Link>
              </div>
              <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                <div className={`hamburger ${menuOpen ? 'active' : ''}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </nav>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-logo">
                CYBER<span className="logo-accent">NEXUS</span>
              </div>
              <p className="copyright">&copy; {new Date().getFullYear()} CYBERNEXUS. 保留所有权利。</p>
              <div className="footer-links">
                <Link to="/" className="footer-link">首页</Link>
                <Link to="/about" className="footer-link">关于我们</Link>
                <a href="https://github.com" className="footer-link" target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
