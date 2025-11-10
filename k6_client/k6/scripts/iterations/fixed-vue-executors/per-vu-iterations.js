import http from 'k6/http'
import { sleep } from 'k6'

export const options = {
    scenarios:{
        per_vu_example:{
           executor: 'per-vu-iterations',
           vus:3,
           iterations:4,
           maxDuration:'30s'
        }
    }
}


export default function (){
    const res = http.get('https://httpbin.org/get')
    console.log(`VU=${__VU} iteration=${__ITER} status=${res.status}`);
    sleep(1);

}