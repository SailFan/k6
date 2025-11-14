#!/bin/bash
set -e
set -x


echo "✅ InfluxDB validation passed."

# ✅ URL 中使用 orgID 和 bucketID
./k6 run ./iterations/fixed_vue_executors/shared_iterations.js 

  #"xk6-influxdb=${INFLUX_URL}/api/v2/write?orgID=${ORG_ID}&bucketID=${BUCKET_ID}"

echo "✅ Done! Metrics stored in InfluxDB. View in Grafana: http://localhost:3000"



50176377700354310