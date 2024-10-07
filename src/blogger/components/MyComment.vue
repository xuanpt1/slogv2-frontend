<template>
  <div class="comment-total">
    <a-comment class="comment-body">
      <template #actions>
        <span key="comment-basic-like">
          <a-tooltip title="Like">
            <template v-if="action === 'liked'">
              <LikeFilled @click="like" />
            </template>
            <template v-else>
              <LikeOutlined @click="like" />
            </template>
          </a-tooltip>
          <span style="padding-left: 8px; cursor: auto">
            {{ likes }}
          </span>
        </span>
        <span key="comment-basic-dislike">
          <a-tooltip title="Dislike">
            <template v-if="action === 'disliked'">
              <DislikeFilled @click="dislike" />
            </template>
            <template v-else>
              <DislikeOutlined @click="dislike" />
            </template>
          </a-tooltip>
          <span style="padding-left: 8px; cursor: auto">
            {{ dislikes }}
          </span>
        </span>
        <span key="comment-basic-reply-to" @click="reply">Reply</span>
        <span v-if="commentData.replyList.length>0" key="comment-basic-reply-to" @click="replyS">展开{{commentData.replyList.length}}条回复</span>
      </template>
      <template #author>
        <a>
          {{author}}
        </a>
        <a>
          {{agent}}
        </a>
      </template>

      <template #content>
        <p>
          {{content}}
        </p>
      </template>
      <template #datetime>

<!--        <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">-->
<!--          <span>{{ dayjs().fromNow() }}</span>-->
<!--        </a-tooltip>-->
      </template>
      <a-divider></a-divider>

      <a-comment v-if="replyTo">
        <template #avatar>
          <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        </template>
        <template #content>
          <a-form-item>
            <a-textarea v-model:value="replayText" :rows="4" />
          </a-form-item>
          <a-form-item>
            <a-button html-type="submit"  type="primary" @click="sendComment()" >
              回复
            </a-button>
          </a-form-item>
        </template>
      </a-comment>

      <div v-if="replyShow">
        <div v-for="item in commentData.replyList" :key="item">
          <MyComment :cdata="item"></MyComment>
        </div>
      </div>

    </a-comment>
  </div>
</template>
<script>
import LikeFilled from "@ant-design/icons-vue/lib/icons/LikeFilled";
import DislikeFilled from "@ant-design/icons-vue/lib/icons/DislikeFilled";
import LikeOutlined from "@ant-design/icons-vue/lib/icons/LikeOutlined";
import DislikeOutlined from "@ant-design/icons-vue/lib/icons/DislikeOutlined";
import dayjs from 'dayjs';
import { ref } from 'vue';
import relativeTime from 'dayjs/plugin/relativeTime';
import GlobalVariable from "@/blogger/helper/GlobalVariable";
import {message, notification} from "ant-design-vue";
import {sendComment,getLiked,getDisiked} from "@/blogger/blogApi/blogger";

export default {
  components:{
    LikeFilled,
    DislikeFilled,
    LikeOutlined,
    DislikeOutlined,

  },
  props:{
    cdata:{
      coid:Number,
      cid:Number,
      pcoid:Number,
      replyList:Array
    }
  },
  data(){
    return{
      likes:ref(0),
      dislikes:ref(0),
      hasLiked:ref(false),
      action:ref(),
      replyShow:ref(false),
      replyTo:ref(false),
      content:ref('哈哈！太幽默了！哈哈！太幽默了！哈哈！太幽默了！哈哈！太幽默了！哈哈！太幽默了！'),
      author:ref(''),
      replayText:ref(''),
      agent:ref(''),
      commentData:{
        // coid:1,
        // cid:1,
        // pcoid:null,
        // replyList:[
        //   {
        //     coid:2,
        //     cid:1,
        //     pcoid:1,
        //     replyList:[ {
        //       coid:4,
        //       cid:1,
        //       pcoid:2,
        //       replyList:[]
        //     },
        //       {
        //         coid:5,
        //         cid:1,
        //         pcoid:2,
        //         replyList:[]
        //       }]
        //   },
        //   {
        //     coid:3,
        //     cid:1,
        //     pcoid:1,
        //     replyList:[ {
        //       coid:6,
        //       cid:1,
        //       pcoid:3,
        //       replyList:[]
        //     },
        //       {
        //         coid:7,
        //         cid:1,
        //         pcoid:3,
        //         replyList:[]
        //       }]
        //   }
        // ]
      }
    }

  },
  inject:['refreshComments'],
  mounted() {
    dayjs.extend(relativeTime);
  },
  created() {
    if(this.cdata!=undefined){
      this.commentData = this.cdata
      this.content = this.commentData.text
      this.author = this.commentData.author
      this.likes = this.commentData.like
      this.dislikes = this.commentData.dislike
      this.agent = this.commentData.agent
    }

  },
  methods:{
    like(){
      if(!this.hasLiked){
        this.action = 'liked';
        this.hasLiked = true
        getLiked(this.commentData.coid).then(response=>{
          this.likes = response.data.data
        })

      }
    },
    dislike(){
      if(!this.hasLiked){
        this.action = 'disliked';
        this.hasLiked = true
        getDisiked(this.commentData.coid).then(response=>{
          this.dislikes = response.data.data
        })

      }
    },
    reply(){
      if(this.replyTo===true)
        this.replyTo = false
      else
        this.replyTo = true
    },
    replyS(){
      if(this.replyShow===true)
        this.replyShow = false
      else
      {
        this.replyShow = true
      }
    },
    sendComment(){
      //console.log(this.commentData.coid)
      console.log('pcoid:'+this.commentData.coid+' - text:'+this.replayText)
      if(this.replayText==''){
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
            cid:this.commentData.cid,
            createdTime:GlobalVariable.getCurrentTime(),
            author:form.name,
            authorId:0,
            mail:form.email,
            url:'www.'+form.url+'.com',
            ip:localStorage.getItem('Ip'),
            agent:navigator.userAgent,
            text:this.replayText,
            status:'public',
            pcoid:this.commentData.coid,
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
              this.refreshComments()
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
    }

    // setComment(item){
    //   this.commentData = item
    //   this.content = item.coid
    // },
    // changeChild(item){
    //     let reff = 'Com'+item.coid
    //     this.$refs[reff].setComment(item)
    // }
  }
}


</script>
<style lang="scss">
.comment-body{
  margin-left: 20px;

}
.comment-total{

}
</style>
