import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="landing-page">
      <div className="container">
        <h1>u6b22u8fceu6765u5230React Dockeru5e94u7528</h1>
        <p>
          u8fd9u662fu4e00u4e2au4f7fu7528Reactu6784u5efau5e76u652fu6301Dockeru5bb9u5668u5316u90e8u7f72u7684u73b0u4ee3u5316Webu5e94u7528u3002
          u6211u4eecu63d0u4f9bu7b80u6d01u3001u9ad8u6548u7684u7528u6237u754cu9762u548cu51fau8272u7684u529fu80fdu3002
        </p>
        <p>
          u4f7fu7528u6700u65b0u7684u524du7aefu6280u672fu6808uff0cu5305u62ecReact 18u3001React Routeru548cu73b0u4ee3CSSu6837u5f0fu3002
          u6211u4eecu7684u5e94u7528u53efu4ee5u901au8fc7Dockeru8fdbu884cu5bb9u5668u5316u90e8u7f72uff0cu5b9eu73b0u5febu901fu3001u7a33u5b9au7684u90e8u7f72u548cu6269u5c55u3002
        </p>
        <div>
          <Link to="/about" className="btn">u4e86u89e3u66f4u591a</Link>
          <a href="https://github.com" className="btn" target="_blank" rel="noopener noreferrer">u67e5u770bu4ee3u7801</a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
