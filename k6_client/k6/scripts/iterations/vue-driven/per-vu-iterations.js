import http from 'k6/http'
import { sleep } from 'k6'


// 不受时间影响

// 1、每个用户固定流程的场景测试
// 2、前后端耗时基准测试
// 3、不想被执行时长干扰的测试
// 4、用于流程测试，基本不用压力测试



export const options = {
    scenarios:{
        test_scenario:{
            executor:'per-vu-iterations',
            vus:5,
            iterations:10,
            maxDuration: '1m'
        }
    }
}

// 5 VU *  执行 10 次 = 50 次迭代



export default function(){
    http.post("/login")
    sleep(1)
}