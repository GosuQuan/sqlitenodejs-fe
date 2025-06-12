import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SnakeGame from '../components/SnakeGame';
import '../styles/SnakePage.css';

export default function SnakePage() {
  const [started, setStarted] = useState(false);

  return (
    <div className="snake-page container">
      <h1 className="glitch-title" data-text="SNAKE">SNAKE</h1>

      {!started && (
        <>
          <section className="instructions">
            <h2>玩法说明</h2>
            <ul>
              <li>← → ↑ ↓：控制蛇移动方向</li>
              <li>吃到食物会成长并加分</li>
              <li>撞到墙壁或自己身体即游戏结束</li>
            </ul>
          </section>
          <button className="btn btn-primary" onClick={() => setStarted(true)}>
            开始游戏
          </button>
          <div style={{ marginTop: '16px' }}>
            <Link to="/" className="btn btn-secondary">返回首页</Link>
          </div>
        </>
      )}

      {started && (
        <>
          <SnakeGame />
          <button className="btn btn-secondary" onClick={() => setStarted(false)}>
            退出游戏
          </button>
        </>
      )}
    </div>
  );
}
