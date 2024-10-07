<template>
  <BloggerView v-if="showBlogger"></BloggerView>
  <ManagerView v-if="showManager"></ManagerView>


  <main class="main">
    <router-view/>
    <div class="police-code">
      <a-divider></a-divider>
      <div style="color: white;text-align: center">
        备案号：鄂ICP备2024058202号-1
      </div>
    </div>
  </main>
</template>

<script>
import BloggerView from "@/router/views/BloggerView";
import {ref} from "vue";
import ManagerView from "@/router/views/ManagerView";
import "@/assets/font/font.scss"

export default {
  components:{
    ManagerView,
    BloggerView
  },
  data(){
    return{
      showBlogger: ref(true),
      showManager: ref(false)
    }
  },
  mounted() {
    this.$router.push('/Blogger/')
  }

}
</script>

<style>
body{
  margin: 0;
  height: 100%;

}
.police-code{
  margin-bottom: 0px;
  position: relative;
  //background: darkcyan;
  min-height: 70px;
  //box-shadow:  0 5px 5px 10px #f5f5f5;;
}
</style>
