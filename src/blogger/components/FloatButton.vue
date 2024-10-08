
<template>
  <transition name="btnGroupTrans">
    <div class="button-group-container" v-if="show.present">
      <AFloatButtonGroup shape="circle" class="button-group" trigger="click">
        <template #icon>
          <MenuOutlined />
        </template>
        <div>
          <FloatButton class="home-button" @click="handleClick" >
            <template #icon>
              <HomeOutlined />
            </template>
            <template #tooltip>
              <div>回到主页</div>
            </template>
          </FloatButton>
        </div>
        <div>
          <FloatButton class="group-button" @click="groupClick" >
            <template #icon>
              <GroupOutlined />
            </template>
            <template #tooltip>
              <div>进入群组</div>
            </template>
          </FloatButton>
        </div>
        <div>
          <FloatButton class="about-button"  @click="aboutClick" >
            <template #icon>
              <InfoCircleOutlined />
            </template>
            <template #tooltip>
              <div>关于本站</div>
            </template>
          </FloatButton>
        </div>
        <div>
          <FloatButton class="login-button" @click="loginClick" >
            <template #icon>
              <UserOutlined />
            </template>
            <template #tooltip>
              <div>后台登录</div>
            </template>
          </FloatButton>
        </div>
      </AFloatButtonGroup>
    </div>
  </transition>





  <a-back-top></a-back-top>
</template>
<script>
import {MenuOutlined, UserOutlined, HomeOutlined, InfoCircleOutlined, GroupOutlined} from
      "@ant-design/icons-vue"
import {FloatButton} from "ant-design-vue";
import {reactive} from "vue";
import {test} from "@/manage/manageApi/manage";

  export default {
    data(){
      return{
        flag:true,
        loginUrl:window.location.host + "/slogmanage",
        show: reactive({
          present:false
        })
      }
    },
    methods:{
      handleClick(){
        if(this.$route.fullPath !== '/Blogger/'){
          this.$router.push('/Blogger/')
        }
      },
      aboutClick(){
        if(this.$route.fullPath !== '/Blogger/About'){
          this.$router.push('/Blogger/About')
        }
      },
      groupClick(){
        console.log('click group button')
        // if(this.$route.fullPath !== '/Blogger/Group'){
        //   this.$router.push('/Blogger/Group')
        // }
        test()
      },
      loginClick(){
        if(this.$route.fullPath !== '/Login'){
          this.$router.push('/Login')
        }
      },
      changePresent(state){
        this.show.present = state
      }
    },
    components:{
      FloatButton,
      MenuOutlined,
      UserOutlined,
      HomeOutlined,
      InfoCircleOutlined,
      GroupOutlined
    }
  }
</script>
<style lang="scss" scoped>
.button-group-container{
  z-index: 2;
}
.button-group{
  left: 120px;
  top: 90px;
  /deep/ >.ant-float-btn{
    width: 80px;
    height: 80px;
  }
}
.home-button{
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
  margin-left: 130px;
}
.group-button{
  width: 80px;
  height: 80px;
  margin-bottom: 50px;
  margin-left: 70px;
}
.about-button{
  width: 80px;
  height: 80px;
  margin-bottom: 70px;
  margin-left: 30px;
}
.login-button{
  width: 80px;
  height: 80px;
  margin-bottom: 80px;
  margin-left: 10px;
  background-color: #FFF;
}
.btnGroupTrans{
  &-enter{
    &-from{
      transform: translateX(-160px);
    }
    &-active{
      transition: transform 0.5s;
    }
  }
  &-leave{
    &-to{
      transform: translateX(-160px);
    }
    &-active{
      transition: transform 0.5s;
    }
  }
}
</style>

