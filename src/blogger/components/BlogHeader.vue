<template>
  <transition name="blogHeaderTrans">
    <div class="blogger-header" v-if="showBlogger.present">
      <div >
        <a-menu class="blogger-menu" v-model:selectedKeys="current.current" @click="changePage" mode="horizontal" :items="items" />
      </div>
    </div>
  </transition>
</template>

<script>
import {reactive, ref} from "vue";
import GlobalVariable from "@/blogger/helper/GlobalVariable";
import MenuProps from 'ant-design-vue'

export default {
  name:'blogHeader',
  props:{
    MenuProps
  },
  data(){
    return{
      current:GlobalVariable.currentPage,
      showBlogger:reactive({
        present:false
      }),
      items:ref(
          [
            {
              key:'Home',
              label:'首页&博文',
              title:'首页&博文'
            },
            {
              key:'Group',
              label:'群组',
              title:'群组'
            },
            {
              key:'About',
              label:'关于',
              title:'关于'
            },
            {
              key:'Other',
              label:'其他',
              title:'其他'
            }
          ]
      ),
      changePage: MenuProps["onClick"] = menuInfo =>{
        switch (menuInfo.key){
          case 'Home':
            if(this.$route.fullPath != '/Blogger/'){
              this.$router.push('/Blogger/')
            }
            break
          case 'Group':
            if(this.$route.fullPath != '/Blogger/Group'){
              this.$router.push('/Blogger/Group')
            }
            break
          case 'About':
            if(this.$route.fullPath != '/Blogger/About'){
              this.$router.push('/Blogger/About')
            }
            break
          default:
            this.$router.push('/Blogger/')
        }
      }
    }
  },
  mounted() {
    window.addEventListener('scroll',this.handleScroll,true)
  },
  unmounted() {
    window.removeEventListener('scroll',this.handleScroll)
  },
  methods:{
    handleScroll(){
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if(scrollTop>50){
        this.showBlogger.present = true
      }
      else{
        this.showBlogger.present = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.blogHeaderTrans{
  &-enter{
    &-from{
      transform: translateY(-50px);
    }
    &-active{
      transition: transform 0.4s;
    }
  }
  &-leave{
    &-to{
      transform: translateY(-50px);
    }
    &-active{
      transition: transform 0.4s;
    }
  }
}

.blogger-header{
  position: fixed;
  z-index: 5;
  background: white;
  width: 100%;
  height: auto;
  box-shadow:  0 5px 5px -5px #333;;

}
.blogger-menu{
  margin-left: 70%;
}

</style>
