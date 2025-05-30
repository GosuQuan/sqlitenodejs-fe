import React from 'react';
import { Link } from 'react-router-dom';

function AboutPage() {
  return (
    <div className="landing-page">
      <div className="container">
        <h1>关于我们</h1>
        <p>
          我们是一个专注于创建现代化、高性能Web应用的团队。我们的目标是提供简洁、直观且功能强大的用户体验。
        </p>
        <p>
          这个React Docker应用展示了我们的技术能力和设计理念。我们使用最新的前端技术和最佳实践，确保应用的性能、可维护性和可扩展性。
        </p>
        <p>
          我们的应用支持Docker容器化部署，这使得无论在任何环境中都能快速、一致地运行，从开发环境到生产环境，保持一致的体验。
        </p>
        <div>
          <Link to="/" className="btn">返回首页</Link>
          <a href="mailto:contact@example.com" className="btn">联系我们</a>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
