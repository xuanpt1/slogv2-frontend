import axios from "axios";

const request = axios.create({
    baseURL:'http://120.55.67.212:8888',
    timeout:20000,
    method:'post',
    headers:{},
})

export default request;
