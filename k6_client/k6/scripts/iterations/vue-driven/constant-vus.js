

//  constant-vus 固定数量的 VUs，持续固定时间
//  给你 N 个虚拟用户（VU）
//  这些 VU 不涨不跌
//  每个 VU 持续不断执行 default() 里的逻辑，直到时间结束

// 适合场景
// 稳定压力测试
// 小流量稳定运行测试
// 基准测试


import http from 'k6/http';
import { sleep } from 'k6';




export const options = {
    scenarios: {
        steady_load:{
            executor: 'constant-vus',
            vus: 10,
                  duration: '30s',
        }
    }
}



export default function(){
    http.post("http://localhost/api")
}