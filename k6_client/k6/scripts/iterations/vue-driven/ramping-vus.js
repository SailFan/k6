/**
 * ramping-vus
 * 按照阶段（stages）逐步增减虚拟用户，用于模拟负载曲线，找系统瓶颈和性能边界
 * 可以控制负载上升，峰值，下降
 * 每个阶段可以定义VU数量和持续时间
 * 非常适合阶梯式压力测试
 * 
 */


export const options = {
    stages:[
        { duration:'30s', target:5 },
        { duration:'1m', target:20 },
        { duration:'1m', target:50 },
        { duration:'1m', target:100 },
        { duration:'30s', target:0 }
    ],thresholds: {
        'http_req_duration': ['p(95)<500'], // 95%请求响应 < 500ms
        'success_rate': ['rate>0.95'],     // 成功率 > 95%
    },
}