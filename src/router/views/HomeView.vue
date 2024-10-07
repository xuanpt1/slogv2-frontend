<template>
  <div class="home-background-layer"></div>
  <div class="home-background"></div>
  <div class="btn-group-trans">
    <Demo v-show="show" ref="btnGroupInst"></Demo>
  </div>

    <div class = "top" ref="topImg">
      <div class="fp-table-cell">
        <div class="media-cover"></div>
        <div class="slide-overlay-wrapper" style="background-color: rgba(0, 0, 0, 0.15);"></div>
        <div class="cover">
          <div class="fp">
            <img alt="head" src="@/assets/img/Head.png" :style="{width:'10%'}">
            <h1>Xuan Pt.2</h1>
            <p>Fresh Peach Heart Shower</p>
          </div>
        </div>
      </div>
    </div>


    <div ref="hometop">
      <BlogTop ></BlogTop>
    </div>


    <div class = "up-border">
      <br>
      <a-divider><b>博文</b></a-divider>
      <h1 style="text-align: center">分享脑中所想</h1>
    </div>

    <div class = "blog-list">
      <div v-for="item in this.blogList" :key="item" class = "test" ref="pronbit">
        <div  class = "top-container" >
          <div class="text-container">
            <div :style="{textAlign:'left',marginLeft:'15px',fontSize:'30px',marginTop: '15px'}"><b>{{item.title}}</b></div>
<!--            <a-divider></a-divider>-->
            <div :style="{color:'grey',textAlign: 'left',marginLeft:'15px',fontSize:'13px',marginTop:'10px'}">
                {{item.abstract}}
            </div>
            <div class = "tag-container">
              <div v-for="item2 in item.tagList" :key="item2" class = "tag-single">
                <AButton size="large" shape="round" @click="selectTag(item2)" :style="{backgroundColor:'#87ceeb'}">{{item2.name}}</AButton>
              </div>
            </div>
          </div>
          <div class="img-container">
            <img :src="item.imgUrl? item.imgUrl: ''" alt :onerror="defaultImg" />
            <AButton type="link" size="large" style="bottom: 10px" @click="gotoBlog(item.aid)">阅读更多 -></AButton>
          </div>
        </div>

      </div>

      <a-divider></a-divider>
      <a-pagination v-model:current="currentPage" @change="blogChangePage" style="text-align: center" :total="this.pageInfo.total" :pageSize="this.pageInfo.page_size" show-less-items>

      </a-pagination>
    </div>

    <div class = "nothing">
      <br>
      <br>
      <br>
      <br>
      <br>
      <h1>End</h1>

    </div>
  <div class="tag-menu-trans">
    <TagMenu v-show="show" ref="tagMenuInst"></TagMenu>
  </div>>
</template>

<script>
import {Button as AButton} from "ant-design-vue";
import TagMenu from "@/blogger/components/TagMenu";
import {ref} from "vue";
import BlogTop from "@/blogger/components/BlogTop";
import GlobalVariable from "@/blogger/helper/GlobalVariable";
import {fetchAllArticles,fetchArticleByTags, fetchArticleListInfo, fetchArticlesByPage} from "@/blogger/blogApi/blogger";
import Demo from "@/blogger/components/FloatButton";


export default {
  components: {
    BlogTop,
    AButton,
    TagMenu,
    Demo
  },
  methods:{
    init(){
      // fetchAllArticles().then(response=>{
      //   console.log(response.data.data)
      //   this.totalBlogs = response.data.data
      //   this.totalBlog = this.totalBlogs.length
      //   this.blogChangePage(1,6)
      // })
      //     .catch(error=>{
      //       console.log(error)
      //     })
      fetchArticleListInfo().then(response=>{
        //console.log(response.data.data)
        this.pageInfo = response.data.data
        this.pageSize = response.data.data.page_size
        this.total = response.data.data.total
        fetchArticlesByPage(response.data.data).then(response=>{
          this.blogList = response.data.data
          this.currentPage = 1
          console.log('begin')
          console.log(this.pageInfo)
          console.log(this.blogList)
        })
      })

    },
    // initByTags(){
    //   if(!this.$refs.tagMenuInst)
    //     return
    //   let tagList = this.$refs.tagMenuInst.filter()
    //   if(tagList.length==0){
    //     this.init()
    //     return;
    //   }
    //   fetchArticleByTags(tagList).then(response=>{
    //     this.totalBlogs = response.data.data
    //     this.totalBlog = this.totalBlogs.length
    //     this.blogChangePage(1,6)
    //   })
    //       .catch(error=>{
    //         console.log(error)
    //       })
    // },
    handleScroll(){
      if(this.blogList&&this.blogList.length>0)
        this.blogList.forEach(this.changePosition)
      let sHeight = this.$refs.hometop.getBoundingClientRect().top
      if(sHeight<600){
        this.$refs.tagMenuInst.changePresent2(true)
        this.$refs.btnGroupInst.changePresent(true)
      }
      else{
        this.$refs.tagMenuInst.changePresent2(false)
        this.$refs.btnGroupInst.changePresent(false)
      }
    },
    changePosition(item,index){
      let mid = 0
      let sHeight = document.getElementsByClassName("test")[index].getBoundingClientRect().top
      //let sHeight = this.$refs.pronbit[this.blogList.length-1-index].getBoundingClientRect().top
      if(sHeight<120)
        sHeight = mid +60 -sHeight/2
      else
        sHeight = mid

      document.getElementsByClassName("test")[index].style.left = sHeight.toString() + "px"
    },
    gotoBlog(id){
      this.$router.push('/Blogger/Blog/'+id)
    },
    selectTag(item){
      console.log(item.id)
      this.$refs.tagMenuInst.addTag(item)
    },
    blogChangePage(page,pageSize){
      let data = {
        page: page,
        page_size: pageSize,
        total: 0
      }
      let h = this.$refs.topImg.offsetHeight
      console.log(h)
      document.documentElement.scrollTop = h
      fetchArticlesByPage(data).then(response=>{
        this.blogList = response.data.data
      })
    }
  },
  data(){
    return{
      show:ref([]),
      sHeight:0,
      blogList:ref([]),
      currentPage:ref(1),
      pageInfo:{},
      //totalBlog:ref(15),
      //totalBlogs:[]
    }
  },
  mounted() {
    GlobalVariable.setPage(['Home'])
    this.init()
    window.addEventListener('scroll',this.handleScroll,true)
    window.addEventListener('resize',this.handleScroll,true)
    this.handleScroll()
  },
  unmounted() {
    window.removeEventListener('scroll',this.handleScroll,true)
    window.removeEventListener('resize',this.handleScroll,true)
  },
  setup(){
    return{}
  },
  computed: {
    defaultImg () {
      return 'this.src="' + require('@/assets/img/SLOG.jpg') + '"'
    }
  }
}

</script>

<style lang="scss" scoped>


.top{
  position: relative;
  overflow: hidden;
  display: table;
  table-layout: fixed;
  width: 100%;
  background-size: cover;
  height: 100vh;
  padding: 0;
  box-shadow:  0 5px 15px -5px #333;;
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
  }
}
.fp-table-cell{
  vertical-align: middle;
  width: 100%;
  height: 100%;
  top:0;
  left: 0;
  position: relative;
  z-index: 1;
}
.media-cover{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  padding: 0;
  z-index: 0;
  background-color: transparent;
  background-image: url('../../assets/img/background/starNight.png');
  background-repeat: no-repeat;
  background-size:100% 100%;
  -moz-background-size:100% 100%;
  -webkit-animation: slideScale 30s linear;
  -moz-animation: slideScale 30s linear;
  -o-animation: slideScale 30s linear;
  animation: slideScale 30s linear;
  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  -o-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

}
.slide-overlay-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1;
}
.cover{
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  z-index: 2;
  .fp {
    text-align: center;
    color: #fff;
    h1 {
      font-family: fzzys,SourceHanSansSC,serif;
      text-shadow: 0px 2px 5px #FFFFFF;
      font-size:60px;
    }
    p {
      font-size: 4em;
      font-weight: 300;
      letter-spacing: 10px;
      letter-spacing: .5px;
      line-height: 1.3em;
      margin: 20px 0;
      text-shadow: 0 2px 5px #FFFFFF;
      font-family:
          fzzys,SourceHanSansSC,"STXingkai","STXinwei","STKaiti","STLiti","Xingkai SC","KaiTi","Microsoft Yahei","SimSun",serif;
    }

  }
  .next {
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    bottom: 30px;
    left: 50%;
    padding-top: 2px;
    margin-left: -25px !important;
    z-index: 0;
    -webkit-transition: all .5s ease-out;
    transition: all .5s ease-out;
    cursor: pointer;
    animation-duration: 2s;
    -webkit-animation-duration: 2s;
    animation-delay: .4s;
    -webkit-animation-delay: .4s;
    &:hover {
      background-color: #6bc30d;
    }
    i {
      color: #fff;
      font-size: 3rem;
      display: table;
      margin: 0 auto;
    }
  }
}
.test{
  position: relative;
  width: 800px;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  transition: all 10ms ease-in-out;
}
.top-container{
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  background: #ecf0f3;
  width: 800px;
  height:250px;
  margin-top: 50px;
  border-radius: 20px;
  //box-shadow:  0 5px 5px -5px #f5f5f5;;
  &:hover{
    box-shadow: 0 5px 15px -5px #f5f5f5;
    background: #f5f5f5;
  }
  &::-moz-viewport-scroll{

  }
}
.blog-list{
  overflow: hidden;
  position: relative;
}
.text-container{
  width: 60%;
  height: 100%;
}
.img-container{
  width: 40%;
  height: 100%;
  margin-top: 0px;
}
.img-container img{
  width: 90%;
  height: 70%;
  margin-top: 5%;
  margin-bottom: 5%;
  border-radius: 4%;
}
.tag-container{
  display: flex;
  flex-direction: row;

  position: absolute;
  left: 10px;
  bottom: 10px;

}
.tag-single{
  padding: 10px;
}

.nothing{
  text-align: center;
}

.home-background-layer{
  position: fixed;
  left: 0;
  right: 0;
  margin: auto;
  width: 80%;
  height: 100%;
  //box-shadow:  0 5px 15px -5px #f5f5f5;;
  //background: rgba(200,255,255,0.4);
  background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  -webkit-background-size: cover;
  background-image: -webkit-linear-gradient(left, rgba(0,0,0,0.4), rgba(200,255,255,0.4) 50%, rgba(0,0,0,0.4));
  z-index: -998;
}
.home-background{
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/img/background/bg05.jpg");
  background-position: top center;
  background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  -webkit-background-size: cover;
  z-index: -999;
}

</style>
