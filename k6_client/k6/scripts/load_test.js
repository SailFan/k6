import http from 'k6/http';
import { sleep } from 'k6';



// scenarios
// 1、 定义executor
// 2、 exec 指定要执行的函数名（默认执行 default 函数）
// 3、vus  执行用户数（虚拟用户数），多数执行器需要
// 4、duration 执行时长，用于持续型执行器（如 constant-vus、ramping-vus）

export const options = {
    scenarios:{
        example_scenario1:{
            executor:'shared-iterations',
            startTime:'10s',
            gracefulStop: '5s',//场景停止的缓存时间
            env:{EXAMPLEVAR:'testing'},
            tags:{ example_tag: 'testing' },
            vus:10,
            iterations:200, //完成200次请求，在maxDuration
            maxDuration:'10s' //最多持续时间
            // 这个场景最长执行maxDuration +gracefulStop，再次期间执行的请求总数小于iterations 会被丢弃
        },

        example_scenario2:{

        }




    }

};






export default function () {
    http.get('http://localhost:3000');
    sleep(1);
}
