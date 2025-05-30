import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <div className="container">
            <nav className="nav">
              <Link to="/" className="nav-logo">React Docker应用</Link>
              <div className="nav-links">
                <Link to="/" className="nav-link">首页</Link>
                <Link to="/about" className="nav-link">关于我们</Link>
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
            <p>&copy; {new Date().getFullYear()} React Docker应用. 保留所有权利。</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
