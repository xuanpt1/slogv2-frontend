<template>
  <Demo v-show="show" ref="btnGroupInst"></Demo>
  <div class="about-background">

  </div>

  <blog-top></blog-top>
  <div class="about-container">
    <div class = "about-top">
      <div class="fp">
        <h1>关于这个网站</h1>
      </div>
    </div>

    <div class="about-body">
      <div class="introduce" data-aos="flip-right">
        <div class="introduce-title">简介</div>
        <div class="field-box">
          <p>一直以来，无论在学上中，还是毕业从业中，我早已养成了收藏的习惯，但凡遇到了有营养的好文章，或者从业中遇到问题，百度到答案后，我都会随手保存到word中，
            放到自己电脑里，进行归类，时间久而久之，文章越来越多，内容越来越杂，收藏的习惯不曾减少，但是回头温习的频率越来越低，看着繁杂的目录，
            搭建一个属于自己的博客便在内心油然而生，它将是我用来记录从业中解决BUG的垫脚石，生活上的美文共享，一句话来领悟人生真谛，于是我暂时放弃了手头上正在整理的spring cloud + Nacos框架，
            转而搭建MYGO!!!，最后本站就这样诞生了。</p>
          <p>
            <span style="font-style:italic">特殊说明：</span>在这里面你可能会看到众多博客的元素，没错，你的眼睛是雪亮的，前期为了找页面设计灵感，我浏览了众多优秀的博客，有H5、VUE、JPS等等，我为了节约时间，
            于是乎，我吸收了他们博客中的一部分元素，然后拼接在一起，当然也有很多我自己的元素在里面，最终一个属于我自己的“四不像”诞生了。o(*￣▽￣*)ブ
          </p>
          <div class="image__preview">
            <!-- <img v-for="(item, index) in kImg" :key="index" :src="item" @click="previewImg(item)"> -->
          </div>
          <h1>开发环境</h1>

          <h1 class="text-center introduce-end" data-aos="fade-up">The End</h1>
        </div>
      </div>
    </div>
  </div>

</template>

<script>


import GlobalVariable from "@/blogger/helper/GlobalVariable";
import BlogTop from "@/blogger/components/BlogTop";
import Demo from "@/blogger/components/FloatButton";
import {ref} from "vue";

export default {
  components: {BlogTop,Demo},
  data(){
    return{
      website:{
        title:"Mygo!!!"
      },
      show:ref([])
    }
  },
  mounted() {
    GlobalVariable.setPage(['About'])
    this.init()
  },
  methods:{
    init(){
      this.$refs.btnGroupInst.changePresent(true)
      console.log(this.$refs.btnGroupInst)
    }
  }
}

</script>

<style lang="scss" scoped>

.about-background{
  box-shadow:  0 5px 15px -5px #f5f5f5;;
  top: 0;
  margin: auto;
  z-index: -1;
  background: rgba(255,255,255,0.4);
  position: fixed;
  width: 60%;
  height: 100vh;
  left: 20%;
}

.about-container{
  position: relative;
  z-index: 2;
  padding: 0 20px;
  min-height: 1000px;
  opacity: 0.9;
  max-width: 1000px;
  margin: auto;
}
.about-top{
  text-align: center;
  //height: 100%;
  width: 100%;
}
.fp{
  text-align: center;
  color: #fff;
  h1 {
    font-family: BarbaraHand;
    font-size:60px;
    text-align: center;
    color: black;
  }
}
.introduce {
  margin-top: 30px;
  margin-bottom: 20px;
  .introduce-title {
    margin-top: 30px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 24px;
  }
  .field-box {
    .image__preview img {
      width: 100px;
      height: 100px;
      margin: 5px 15px;
      cursor:pointer;
    }
    a {
      color: indianred;
    }
    p {
      margin: 5px 0;
      font-size: 18px;
      text-align: left;
      text-indent: 2em;
      line-height: 40px;
    }
    h1 {
      font-weight: bold;
      font-size: 24px;
      text-align: left;
      margin-top: 25px;
    }
  }
}

</style>
