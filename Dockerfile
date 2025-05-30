# 使用Node.js作为基础镜像
FROM node:18-alpine AS build

# 设置工作目录
WORKDIR /app

# 安装pnpm
RUN npm install -g pnpm

# 复制package.json和pnpm-lock.yaml
COPY package.json pnpm-lock.yaml .npmrc ./

# 设置环境变量
ENV NODE_ENV=production
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PATH:$PNPM_HOME

# 安装依赖
RUN pnpm config set store-dir /root/.pnpm-store
RUN pnpm install

# 复制项目文件
COPY . .

# 构建应用
RUN pnpm run build

# 使用nginx作为生产环境的基础镜像
FROM nginx:alpine

# 复制构建产物到nginx目录
COPY --from=build /app/build /usr/share/nginx/html

# 复制nginx配置文件
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露80端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]
