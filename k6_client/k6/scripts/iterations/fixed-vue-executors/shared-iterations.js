import http from 'k6/http'
import { sleep } from 'k6'

export const options = {
    discardResponseBodies: true,
    scenarios:{
        contacts:{
            executor: 'shared-iterations',
            vus:10,
            iterations:200,
            maxDuration:'30s'
        }
    }
}

export default function (){
    http.get('http://127.0.0.1:9527/api/data')
}




//  所有 VU（虚拟用户）共享总迭代次数。例如总共执行 100 次请求，不论几个用户
// 30s内未完成200请求，强行停止



// 适用场景
// 1、功能验证/小规模测试
// 2、总请求数已知的场景
// 3、脚本调试
// 4、简单负载测试

