# 使用官方的 Node.js 镜像作为基础镜像
FROM node:latest

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json 文件
COPY package*.json ./

# 复制项目文件
COPY . .

RUN npm install -g pnpm

# 安装项目依赖
RUN npm install


# 生成 Prisma 客户端
RUN npm run db:generate

RUN npm run build
# 暴露应用程序端口
EXPOSE 8000

# 启动应用程序
CMD ["pnpm", "start"]
