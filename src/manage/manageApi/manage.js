import request from '@/router/axios.js'

//TODO 根据新后端重写api

export function test(){
    return request.get('/api/v1/userList', null, true)
}

export function login(loginInfo){
    return request.post('/api/v1/login',loginInfo)
}