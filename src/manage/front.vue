<template>
  <button @click="toLogin">登录</button>
  <button @click="totest">l2d测试</button>
  <button @click="totestBtn">悬浮菜单测试</button>
  <button @click="tositeset">设置页测试</button>
  <button @click="togroup">群组页测试</button>
  <button @click="toheadertest">页头测试</button>
  <button @click="tojumpTest">页头跳转测试</button>
</template>

<script>
import router from "@/router/router.js";;
export default {
  methods:{
    toLogin(){
      router.push("/manage")
    },
    totest(){
      router.push("/test")
    },
    totestBtn(){
      router.push("/testBtn")
    },
    tositeset(){
      router.push("/manage/siteset")
    },
    togroup(){
      router.push("/manage/group")
    },
    toheadertest(){
      router.push("/headertest")
    },
    tojumpTest(){
      router.push("/jumpTest")
    }
  }
}
</script>
