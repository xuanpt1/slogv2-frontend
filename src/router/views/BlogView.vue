<template>
  <Demo v-show="show" ref="btnGroupInst"></Demo>
  <blog-top></blog-top>
  <transition name="blogBodyTrans">
    <div class = "blog-body"  v-if="show.present">
<!--    <div :style="{fontSize:'25px',color:'black',margin:'60px',marginTop:'40px'}">-->
<!--      {{text}}-->
<!--    </div>-->
      <div class="blog-detail">
        <a-divider></a-divider>
        <div class="detail-header">
          <h1 class="detail-title">
            {{article.title}}
          </h1>
          <div class="detail-info">
  <!--     Some informations     -->
            <p style="margin-right: 10px;color: rgb(120,120,120)">浏览量：{{article.clicks}}</p>
          </div>
        </div>
        <div class="detail-body">
          <pre>
            <v-md-preview :text="text"></v-md-preview>
          </pre>
        </div>
        <div class="explain">
          温馨提示：本博客所有内容纯属自娱自乐，如有侵权，请联系博主删除，谢谢。
        </div>
        <a-divider></a-divider>
      </div>
    </div>
  </transition>

  <a-divider></a-divider>

  <transition name="blogBodyTrans">
    <div class = "comment" v-if="show.presentComment">
      <div class="comment-submit">
        <a-comment style="margin-left: 20px;margin-right: 20px">
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
          </template>
          <template #content>
            <a-form-item>
              <a-textarea v-model:value="replyText"  :rows="4" />
            </a-form-item>
            <a-form-item >
              <div style="display: flex;flex-direction: row">
                <a-button html-type="submit"  type="primary" @click="sendComment">
                  发表评论
                </a-button>
                <user-menu>
                </user-menu>
              </div>
            </a-form-item>
          </template>
        </a-comment>

      </div>
      <div class="comment-contained">
        <a-flex wrap="wrap" gap="small" justify="left">
          <div class="comment-single" v-for="item in comments" :key="item">
            <MyComment :cdata="item"></MyComment>
          </div>
        </a-flex>
      </div>
    </div>
  </transition>

</template>

<script>
import MyComment from "@/blogger/components/MyComment";
import {fetchArticleById, fetchCommentsById, sendComment,clickArticleOnce} from "@/blogger/blogApi/blogger";
import BlogTop from "@/blogger/components/BlogTop";
import {reactive, ref} from "vue";
import GlobalVariable from "@/blogger/helper/GlobalVariable";
import UserMenu from "@/blogger/components/UserMenu";
import {message, notification} from "ant-design-vue";
import Demo from "@/blogger/components/FloatButton";

export default {
  components: {UserMenu, BlogTop, MyComment, Demo},

  data(){
    return{
      startTime:0,
      article:{},
      text:'',
      id:'',
      comments:[],
      replyText:ref(''),
      show:reactive({
        present:false,
        presentComment:false
      })
    }
  },
  watch:{
    '$route':function (newUrl,oldUrl){
      if(newUrl!=oldUrl)
        this.init()
    }
  },
  methods:{
    sendComment(){
      if(this.replyText==''){
        message.error('请输入评论内容！')
        return
      }
      let saveData = JSON.parse(localStorage.getItem('slogfore-userdata'))
      if(saveData){
        let form={
          name:saveData.name,
          url:saveData.url,
          email:saveData.email
        }
        if(form.name!=''&&form.url!=''&&form.email!=''){
          let bData = {
            coid:null,
            cid:this.article.cid,
            createdTime:GlobalVariable.getCurrentTime(),
            author:form.name,
            authorId:0,
            mail:form.email,
            url:'www.'+form.url+'.com',
            ip:localStorage.getItem('Ip'),
            agent:navigator.userAgent,
            text:this.replyText,
            status:'public',
            pcoid:0,
            likeCount:0,
            dislikeCount:0,
          }
          sendComment(bData).then(response=>{
            if(response.data.status==200){
              notification.open({
                message: '通知信息',
                description:
                    '评论成功！',
                duration:3,
                onClick: () => {
                  console.log('Notification Clicked!');
                },
              });
              this.initComments()
            }
            else{
              notification.open({
                message: '通知信息',
                description:
                    '评论失败！',
                duration:3,
                onClick: () => {
                  console.log('Notification Clicked!');
                },
              });
            }
          })
              .catch(error=>{
                console.log(error)
              })


        }
        else{
          notification.open({
            message: '通知信息',
            description:
                '请先填写完整的个人信息！',
            duration:3,
            onClick: () => {
              console.log('Notification Clicked!');
            },
          });
        }

      }
    },
    init(){
      this.$refs.btnGroupInst.changePresent(true)
      document.body.scrollTop=0
      document.documentElement.scrollTop = 0;
      window.pageYOffset = 0;

      this.id = this.$route.params.id
      if(!this.id){
        //todo
        this.$router.push({ path: '/Blogger'})
        return
      }
      //loading todo
      fetchArticleById(this.id)
          .then(response=> {
            this.article =response.data.data;
            this.text = this.article.content
            this.show.present = true
          })
          .then(()=>{
            this.initComments()
          })
          .catch(err => {
            console.log(err)
          })
    },
    initComments(){
      fetchCommentsById(this.id).then(response=>{
        if(response){
          this.comments = response.data.data
        }
        this.show.presentComment = true
      })
          .catch(err => {
            console.log(err)
          })
    },
  },
  provide(){
    return{
      refreshComments:this.initComments
    }
  },
  created() {
    this.startTime = Date.now()
  },
  beforeRouteLeave(to,from,next){
    let stayTime = Date.now()-this.startTime;
    if(stayTime>3000){
      clickArticleOnce(this.article.cid)
      .then(response=>{
        console.log(response)
      })
    }
    next()
  },
  mounted() {
    //test todo
    GlobalVariable.setPage(['Home'])
    this.init()
  }
}

</script>

<style lang="scss" scoped>

.top{
}
.blog-body{
  overflow: hidden;
  width: 1000px;
  //background-color: rgba(208,208,208,0.9);
  border-radius: 10px;
  background-image: -webkit-linear-gradient(left, rgba(0,0,0,0.4), rgba(208,208,208,1) 5px, rgba(208,208,208,1));
  box-shadow:  5px -10px 10px -5px #f5f5f5;;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-top: 25px;
}

.blogBodyTrans{
  &-enter{
    &-from{
      transform: translateY(1000px);
    }
    &-active{
      transition: transform 0.8s;
    }
  }
}


.blog-detail{
  width: auto;
  z-index: 3;
  font-family: Source Sans Pro,Helvetica Neue,Arial,sans-serif;
  line-height: 1.75;

  position: relative;
  margin: auto;
  h1.detail-title{
    color: #918f90;
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 25px;
    margin-left: 25px;
    text-transform: uppercase;
  }
  .detail-info{
    text-align: right;
    i {
      margin: 0 5px;
    }
    span {
      margin-right: 20px;
    }
  }
  .detail-body{
    pre{
      max-width: 100%;
    }

    position: relative;
    min-height: 100vh;
    font-size: 18px;
    line-height: 1.75;
    margin: auto;
    display: flex;
    align-items: center;

  }
}
.explain {

  margin: 10px 10px;
  border-left: 3px solid #6bc30d;
  min-height: 26px;
  line-height: 26px;
  padding: 5px 20px;
  background-color: #f8f9f7;
  font-size: 16px;
  font-weight: 400;
  color: #585957;
  text-shadow: 0 1px 0 rgba(255,255,255,.5);
  clear: both;
}


.comment{
  width: 1000px;
  position: center;
  box-shadow:  5px -10px 10px -5px #f5f5f5;;
  background-color: rgba(168,168,168,0.8);
  margin:auto;
  height: auto;
}
.comment-contained{
  position: relative;
  width: 900px;
  left: 50px;
}
.comment-single{
  background: white;
  width: 900px;
  box-shadow:  0 5px 5px -5px #333;;
  &:hover{
    box-shadow: 0 5px 15px -5px #333;
  }
}

</style>
