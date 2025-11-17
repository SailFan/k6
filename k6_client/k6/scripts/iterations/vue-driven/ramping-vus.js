/**
 * ramping-vus
 * 按照阶段（stages）逐步增减虚拟用户，用于模拟负载曲线，找系统瓶颈和性能边界
 * 可以控制负载上升，峰值，下降
 * 每个阶段可以定义VU数量和持续时间
 * 非常适合阶梯式压力测试
 * 
 */
import http from 'k6/http';
import { Trend, Rate } from 'k6/metrics';
import { sleep } from 'k6';
import { check } from 'k6';


// 自定义指标
export let successRate =  new Rate("success_rate");
export let customTrend = new Trend('response_time');




// 阶段定义
export const options = {
    stages:[
        { duration:'30s', target:5 },
        { duration:'1m', target:20 },
        { duration:'1m', target:50 },
        { duration:'1m', target:100 },
        { duration:'30s', target:0 }
    ],thresholds: {
        'http_req_duration': ['p(95)<500'], // 95%请求响应 < 500ms
        // 百分之95的请求大于等于500，则整个测试标记失败
        'success_rate': ['rate>0.95'],     // 成功率 > 95%
        // 成功率小于等于95%，标记整个用例执行失败
    },
}

export default function(){
    const res  = http.post('http://localhost:9527/api/data')
    customTrend.add(res.timings.duration,{
        status_group: res.status >=200 && res.status < 400 ? 'ok' : 'error' 
    })

    successRate.add(res.status >=200 && res.status < 400)


    check(response, {
        'is status code 200': (r) => r.status === 200
    });
}







// 
// 
// 
// 



// // --------------------
// // 默认函数
// // --------------------
// export default function () {
//     // --------------------
//     // 阶段标签自动识别
//     // --------------------
//     let stageTag;
//     let vus = __VU;
//     if (vus <= 5) stageTag = 'warmup';
//     else if (vus <= 20) stageTag = 'low';
//     else if (vus <= 50) stageTag = 'medium';
//     else stageTag = 'high';

//     // --------------------
//     // 请求模拟业务流程
//     // --------------------
//     let res = http.get('http://localhost/api', {
//         tags: { stage: stageTag }
//     });

//     // --------------------
//     // 指标记录
//     // --------------------
//     customTrend.add(res.timings.duration, { stage: stageTag });
//     successRate.add(res.status >= 200 && res.status < 400, { stage: stageTag });

//     // --------------------
//     // 校验
//     // --------------------
//     check(res, {
//         'status is 2xx or 3xx': (r) => r.status >= 200 && r.status < 400,
//     });

//     // --------------------
//     // 模拟用户思考时间
//     // --------------------
//     sleep(Math.random() * 2); // 0~2秒随机间隔
// }

// // --------------------
// // Summary 输出
// // --------------------
// export function handleSummary(data) {
//     return {
//         // JSON 文件
//         "summary.json": JSON.stringify(data, null, 2),

//         // 如果使用 InfluxDB，可在这里输出
//         // "http://localhost:8086/api/v2/write?bucket=k6&org=k6&precision=s": JSON.stringify(data)
//     };
// }
