#!/bin/bash
set -e

# 容器和镜像名称
IMAGE_NAME="node-stress-server"
CONTAINER_NAME="stress-server"
PORT=9527

echo "🚀 构建 Docker 镜像..."
docker build -t $IMAGE_NAME .

# 检查是否已有同名容器在运行，如果有则先停止并删除
if [ "$(docker ps -a -q -f name=$CONTAINER_NAME)" ]; then
    echo "⚠️ 停止已存在的容器 $CONTAINER_NAME..."
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
fi

echo "🎯 启动容器 $CONTAINER_NAME..."
docker run -d -p $PORT:9527 --name $CONTAINER_NAME $IMAGE_NAME

echo "✅ 容器已启动，访问接口：http://localhost:$PORT/api/data"
