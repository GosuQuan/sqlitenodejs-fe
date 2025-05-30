#!/bin/bash

# 此脚本帮助初始化Git仓库并推送到GitHub

# 颜色定义
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
NC="\033[0m" # No Color

echo -e "${YELLOW}开始初始化Git仓库...${NC}"

# 初始化Git仓库
git init

# 添加.gitignore文件
cat > .gitignore << EOL
# 依赖
/node_modules
/.pnp
.pnp.js

# 测试
/coverage

# 生产构建
/build

# 杂项
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

# 编辑器配置
.idea/
.vscode/
*.swp
*.swo
EOL

echo -e "${GREEN}创建了.gitignore文件${NC}"

# 添加所有文件到暂存区
git add .

# 创建第一次提交
git commit -m "初始化React Docker应用"

echo -e "${YELLOW}请输入您的GitHub仓库URL (例如: https://github.com/username/repo.git):${NC}"
read repo_url

# 添加远程仓库
git remote add origin $repo_url

echo -e "${YELLOW}选择分支名称 (默认: main):${NC}"
read branch_name
branch_name=${branch_name:-main}

# 重命名当前分支
git branch -M $branch_name

# 推送到GitHub
echo -e "${YELLOW}正在推送到GitHub...${NC}"
git push -u origin $branch_name

echo -e "${GREEN}完成! 您的代码已成功推送到GitHub仓库: $repo_url${NC}"
echo -e "${YELLOW}注意: 您需要在GitHub上设置以下Secrets以使CI/CD工作流正常工作:${NC}"
echo -e "  - DOCKER_HUB_USERNAME: 您的Docker Hub用户名"
echo -e "  - DOCKER_HUB_ACCESS_TOKEN: 您的Docker Hub访问令牌"
echo -e "  - DEPLOY_HOST: 部署服务器的主机名或IP"
echo -e "  - DEPLOY_USERNAME: 部署服务器的用户名"
echo -e "  - DEPLOY_SSH_KEY: 部署服务器的SSH私钥"
