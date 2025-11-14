#!/bin/bash
set -e

# 脚本功能：启动或停止 InfluxDB、Telegraf、Grafana

COMPOSE_FILE="docker-compose.yml"

function start_services() {
    echo "=============================="
    echo "🟢 Starting InfluxDB, Telegraf, and Grafana..."
    echo "=============================="

    docker-compose -f $COMPOSE_FILE up -d

    # 等待 InfluxDB 启动
    echo "⏳ Waiting for InfluxDB to initialize..."
    sleep 5

    # 打印容器状态
    echo "=============================="
    echo "📊 Container status:"
    docker ps --filter "name=influxdb" --filter "name=telegraf" --filter "name=grafana"
    echo "=============================="

    echo "✅ All services are up!"
    echo "InfluxDB: http://localhost:8086"
    echo "Grafana: http://localhost:3000"
    echo "Login to Grafana with: User: admin / Password: admin123"
}

function stop_services() {
    echo "=============================="
    echo "🔴 Stopping InfluxDB, Telegraf, and Grafana..."
    echo "=============================="

    docker-compose -f $COMPOSE_FILE down

    echo "✅ All services stopped."
}

# 判断参数
if [ "$1" == "start" ]; then
    start_services
elif [ "$1" == "stop" ]; then
    stop_services
else
    echo "Usage: $0 {start|stop}"
    exit 1
fi
