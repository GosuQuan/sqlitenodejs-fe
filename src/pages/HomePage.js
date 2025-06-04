import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const title = "CYBER FUTURE";

  useEffect(() => {
    // Simulate loading time for animation effect
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Scanlines effect overlay */}
      <div className="scanlines"></div>
      
      <div className={`landing-page ${loaded ? 'loaded' : ''}`}>
        <div className="container">
          <div className="hero-content">
            <h1 className="glitch-title" data-text={title}>{title}</h1>
            <p className="subtitle">
              欢迎来到未来科技前沿 - 突破次元的数字体验
            </p>
            
            <div className="btn-container">
              <Link to="/about" className="btn btn-primary">探索未来</Link>
              <a href="https://github.com" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">查看源码</a>
            </div>
          </div>
          
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">高性能架构</h3>
              <p className="feature-text">
                采用最新React 18技术栈，结合Docker容器化部署，提供极致的用户体验和卓越的性能表现。
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔮</div>
              <h3 className="feature-title">未来设计</h3>
              <p className="feature-text">
                融合赛博朋克美学与前沿UI设计，打造沉浸式数字界面，引领视觉革命。
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3 className="feature-title">安全可靠</h3>
              <p className="feature-text">
                采用先进的安全架构和可靠的技术方案，确保系统稳定运行和数据安全。
              </p>
            </div>
          </div>
          
          <div className="cta-section">
            <h2 className="glitch-title" data-text="JOIN US">JOIN US</h2>
            <p className="subtitle">
              加入我们，共同探索数字世界的无限可能
            </p>
            <div className="btn-container">
              <Link to="/about" className="btn btn-primary">立即加入</Link>
              <Link to="/about" className="btn btn-secondary">了解更多</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
