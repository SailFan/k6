// server.js
import express from 'express';

const app = express();
const PORT = process.env.PORT || 9527;

// 模拟业务计算函数
function heavyComputation(n) {
  let result = 0;
  for (let i = 0; i < n; i++) {
    result += Math.sqrt(Math.random() * 1000);
  }
  return result;
}

// 生成随机 JSON 数据
function generateRandomData(count = 100) {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      name: `Item_${Math.floor(Math.random() * 10000)}`,
      value: Math.random() * 1000,
      computed: heavyComputation(50), // 每条数据执行一定计算
      timestamp: new Date().toISOString()
    });
  }
  return data;
}

// 接口
app.get('/api/data', (req, res) => {
  const data = generateRandomData(200); // 返回200条随机数据
  res.json({ success: true, count: data.length, data });
});

// 启动服务
// 关键改动：监听 0.0.0.0，让宿主机可以访问
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
