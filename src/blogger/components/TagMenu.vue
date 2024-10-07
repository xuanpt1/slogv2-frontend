<template>
  <Transition name="tagMenuTrans">
    <div class="hot-blog" v-if="show.present2">
      <h2
          style="text-align: center;background: #ddeedd;width: 90%;margin-left: 3%;margin-top: 10px;padding: 5px;border-radius:
      5px;">
        本站还算热门
      </h2>

      <a-flex wrap="wrap" gap="small">
        <div v-for="(item,index) in hotList" :key="item" style="margin-left: 5%" >
          <div v-if="index<10">
            <AButton size="small" shape="round" @click="gotoBlog(item.cid)" style="color: grey;"><b
                style="margin-right: 5px">{{item.text}}
              </b> {{item.clicks}}&nbsp;😆</AButton>
          </div>
        </div>
      </a-flex>
    </div>
  </Transition>

  <Transition name="tagMenuTrans">
    <div class="tag-menu" v-if="show.present">
      <div class = "tag-container-menu">
        <a-flex wrap="wrap" gap="small">
        <div v-for="(item,index) in selectTags" :key="item" class = "tag-single" >
          <AButton size="middle" shape="round" @click="cancelTag(index)" :style="{backgroundColor:'#87ceeb'}">{{item.name}}</AButton>
        </div>
        </a-flex>
      </div>
    </div>
  </Transition>

  <Transition name="tagMenuTrans">
    <div class="tag-menu-button" v-if="show.present">
      <AButton size="middle" shape="round" @click="tagConfirm()" style="background-color:grey;color: white"><b>筛选文章</b></AButton>
      <AButton size="middle" shape="round" @click="resetTag()" style="background-color:grey;color: white;margin-left: 10px"><b>重置选择</b></AButton>
    </div>
  </Transition>


</template>

<script>

import {reactive, ref} from "vue";
import {fetchHotArticles} from "@/blogger/blogApi/blogger";

export default {
  mounted() {
    fetchHotArticles().then(response=>{
      if(response.data.data)
        this.hotList = response.data.data
    })
    .catch(error=>{
      console.log(error)
    })
  },
  methods:{
    addTag(tag){
      if(this.selectTags.some(ele=>ele.id==tag.id))
        return
      this.selectTags.push(tag)
      //if(this.selectTags.length>0)
        //this.show.present = true
    },
    cancelTag(index){
      //data post
      this.selectTags.splice(index,1)
      if(this.selectTags.length<=0){
        //this.show.present = false
      }
    },
    resetTag(){
      this.selectTags = []
      this.$parent.initByTags()
    },
    gotoBlog(id){
      this.$router.push('/Blogger/Blog/'+id)
    },
    changePresent2(state){
      this.show.present = state
      this.show.present2 = state
    },
    filter(){
      let tagList = []
      for(let i =0;i<this.selectTags.length;i++){
        tagList.push(this.selectTags[i].id)
      }
      return tagList
    },
    tagConfirm(){
      this.$parent.initByTags()
    }
  },
  data() {
    return {
      hotList:ref([]),
      selectTags:[

      ],
      show: reactive({
        present:false,
        present2:false
      })
    }
  }
};
</script>

<style lang="scss" scoped>

.tagMenuTrans{
  &-enter{
    &-from{
      transform: translateX(300px);
    }
    &-active{
      transition: transform 0.5s;
    }
  }
  &-leave{
    &-to{
      transform: translateX(300px);
    }
    &-active{
      transition: transform 0.5s;
    }
  }
}

.hot-blog{
  z-index: 2;
  width: 250px;
  height: 370px;
  right: 50px;
  bottom: 450px;
  border-radius: 10px;
  position: fixed;
  background: white;
  background-size: cover;
  box-shadow:  0 5px 15px -5px #f5f5f5;;
  &:hover{
    box-shadow: 0 5px 25px -5px #f5f5f5;
  }
}


.tag-menu{
  z-index: 2;
  width: 250px;
  height: 370px;
  right: 50px;
  bottom: 50px;
  border-radius: 10px;
  position: fixed;
  background: white;
  background-size: cover;
  box-shadow:  0 5px 15px -5px #f5f5f5;;
  &:hover{
    box-shadow: 0 5px 25px -5px #f5f5f5;
  }
}
.tag-single{
  margin: -10px;
  padding: 10px;
}
.tag-container-menu{
  position: relative;
  margin: 20px;
}
.tag-menu-button{
  position: fixed;
  z-index: 3;

  right: 80px;
  bottom: 60px;
}
</style>
