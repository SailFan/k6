#!/bin/bash
set -e

echo "🚀 Starting InfluxDB, Grafana, and Telegraf..."

echo "🏃 Running K6 test..."
k6 run ./k6/scripts/load_test.js


echo "✅ Done! Metrics stored in InfluxDB. View in Grafana: http://localhost:3000"
