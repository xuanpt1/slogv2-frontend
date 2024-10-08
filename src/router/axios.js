import axios from "axios";
import {getRefreshToken, getToken, removeRefreshToken, removeToken, setToken} from "@/router/auth";
import {createRouter as route} from "vue-router";


// axios.defaults.baseURL='/api'
// axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.timeout = 10000;
// axios.defaults.validateStatus =  function (status){
//     return status>=100&&status<=511
// }
// axios.defaults.withCredentials = true

// 刷新 access_token 的接口
const refreshToken = () => {
    return instance.post('/refreshToken', { refresh_token: getRefreshToken() }, true)
}

const instance = axios.create({
    baseURL:'/api',
    timeout:10000,
    headers:{
        'Content-Type':'application/json'
    }
})

instance.interceptors.response.use(
    response=>{
        return response
    },
    error=>{
        if (error.response.status === 401){
            return refreshToken().then(res => {
                if (res.data.code === 200) {
                    setToken(res.data.data.access_token)
                    return instance(error.config)
                } else {
                    removeToken()
                    removeRefreshToken()
                    window.location.href = '/login'
                }
            })
        } else {
            console.log(error)
            return Promise.reject(error)
        }
    }
)

const setHeaderToken = (isNeedToken) => {
    console.log('setHeaderToken')
    console.log(isNeedToken)
    const accessToken = isNeedToken ? getToken() : null
    if(isNeedToken){
        if(!accessToken){
            // 没有 token 跳转到登录页
            removeToken()
            removeRefreshToken()
            //跳转登录页
            window.location.href = '/#/login'
        }
        instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    }
}

export const get = (url, params = {}, isNeedToken = false) => {
    setHeaderToken(isNeedToken)
    return instance.get(url, { params })
}

export const post = (url, data, isNeedToken = false) => {
    setHeaderToken(isNeedToken)
    return instance.post(url, data)
}

export const put = (url, data, isNeedToken = false) => {
    setHeaderToken(isNeedToken)
    return instance.put(url, data)
}

export const del = (url, data, isNeedToken = false) => {
    setHeaderToken(isNeedToken)
    return instance.delete(url, { data })
}

export const upload = (url, data, isNeedToken = false) => {
    setHeaderToken(isNeedToken)
    return instance.post(url, data, {
        headers: {
            'Content-Type':'multipart/form-data'
        }
    })
}
export default {
    get,
    post,
    put,
    del,
    upload
}

// //request lj
// axios.interceptors.request.use(req=>{
//     return req
// })
//
//
// //response lj
// axios.interceptors.response.use(res=>{
//
//     if(res.data!=null)
//         return res
// })
//
//
// export default axios
