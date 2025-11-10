# 使用轻量 Node.js 镜像
FROM node:20-alpine



# 设置工作目录
WORKDIR /app

# 复制依赖描述文件并安装依赖
COPY package*.json ./
RUN npm install --production

# 复制代码
COPY server.js ./

# 暴露端口
EXPOSE 9527

# 启动服务
CMD ["node", "server.js"]
