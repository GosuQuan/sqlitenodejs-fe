# React Docker 应用

这是一个使用React构建并支持Docker容器化部署的现代化Web应用。项目包含两个简单的落地页：首页和关于我们页面。

## 项目结构

```
├── public/                 # 静态资源
├── src/                    # 源代码
│   ├── components/         # 组件
│   ├── pages/              # 页面
│   │   ├── HomePage.js     # 首页
│   │   └── AboutPage.js    # 关于我们页面
│   ├── App.js              # 应用主组件
│   ├── App.css             # 应用样式
│   ├── index.js            # 入口文件
│   └── index.css           # 全局样式
├── Dockerfile              # Docker构建文件
├── docker-compose.yml      # Docker Compose配置
├── nginx.conf              # Nginx配置
├── package.json            # 项目依赖
└── README.md               # 项目说明
```

## 开发环境运行

确保您已安装Node.js (推荐v16+)：

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start
```

应用将在 http://localhost:3000 运行。

## 使用Docker部署

### 在本地构建并运行Docker容器

```bash
# 使用Docker Compose构建并启动
docker-compose up -d
```

应用将在 http://localhost:3000 运行。

### 单独使用Dockerfile

```bash
# 构建Docker镜像
docker build -t react-docker-app .

# 运行容器
docker run -p 3000:80 -d react-docker-app
```

### 在已有后端服务的云主机上部署

本项目配置为可以与现有后端服务共存于同一台云主机上。前端应用将通过3000端口访问，而不会干扰后端服务。

1. CI/CD自动部署：
   - 项目包含GitHub Actions工作流配置，可自动构建并部署到云主机
   - 部署脚本会自动创建独立的前端应用目录并配置Docker
   - 前端应用将在云主机的3000端口上运行

2. 手动部署：
   ```bash
   # 在服务器上创建前端应用目录
   mkdir -p /path/to/frontend
   cd /path/to/frontend
   
   # 创建docker-compose.yml文件
   # 文件内容见项目中的docker-compose.yml
   
   # 拉取并运行Docker镜像
   docker pull yourusername/react-docker-app:latest
   docker-compose up -d
   ```

## 功能特点

- 响应式设计，适配各种设备
- 使用React Router进行页面路由
- Docker容器化支持，便于部署
- Nginx作为生产环境的Web服务器
- 简洁现代的UI设计

## 技术栈

- React 18
- React Router v6
- Docker & Docker Compose
- Nginx
- CSS3
