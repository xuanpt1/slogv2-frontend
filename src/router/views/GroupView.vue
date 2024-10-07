<template>
  <Demo v-show="show" ref="btnGroupInst"></Demo>
  <div class="group-body">
    <blog-top></blog-top>
    <div class="group-background">
    </div>

    <div class="group-section">
      <h1>这是沟槽的群组</h1>
      <a-divider>
        <b>请选择您的乐队</b>
      </a-divider>
      <!--    这里是注释，下面是群组分页    -->
      <a-pagination v-model:current="currentPage" @change="groupChangePage"  :total="totalGroup" :default-page-size="3" show-less-items>

      </a-pagination>

      <div class="group-select">
        <div style="padding: 20px">
          <a-row :gutter="16">
            <div class="group-single" v-for="item in this.previewGroup" :key="item">
              <a-col>
                <a-card v-bind:title="item.groupTitle" :bordered="false" >
                  <div v-for="f in item.feeds" :key="f">
                    <a-button type="link" @click="openNewPage(f)">{{f}}</a-button>
                  </div>
                </a-card>
                <a-button style="margin-top: 10px" @click="getGroupData(item.groupId)">
                  了解乐队
                </a-button>
              </a-col>
            </div>
          </a-row>

          <a-divider>
          </a-divider>

        </div>
      </div>

      <div class="group-show">
        <GroupData ref="groupData"></GroupData>
      </div>

    </div>
  </div>

</template>

<script>
import {ref} from "vue";
import BlogTop from "@/blogger/components/BlogTop";
import GlobalVariable from "@/blogger/helper/GlobalVariable";
import GroupData from "@/blogger/components/GroupData";
import {fetchGroups,fetchGroupDataById} from "@/blogger/blogApi/blogger";
import Demo from "@/blogger/components/FloatButton";

export default {
  components: {BlogTop,GroupData,Demo},
  data(){
    return{
      previewGroup:[],
      currentPage:ref(1),
      groupList:[],
      totalGroup:ref(15),
      show:ref([]),
    }
  },
  methods:{
    init(){
      this.$refs.btnGroupInst.changePresent(true)
      fetchGroups().then(response=>{
        console.log(response.data.data)
        this.totalGroup = response.data.data.length
        this.groupList = response.data.data
        this.groupChangePage(1,3)
      })
      .catch(error=>{
        console.log(error)
      })
    },
    openNewPage(link){
      window.open(link)
    },
    groupChangePage(page,pageSize){
      //todo
      console.log(pageSize)
      let pageMin = (page-1)*3 +1
      let pageMax = page*3
      if(pageMax > this.totalGroup)
        pageMax = this.totalGroup
      let newGroup = []
      for(let i=0;i<pageMax-pageMin+1;i++){
        if(this.groupList.length>pageMin+i-1)
          newGroup.push(this.groupList[pageMin+i-1])
      }
      this.previewGroup = newGroup
    },
    getGroupData(groupId){
      fetchGroupDataById(groupId).then(response=>{
        if(response.data.data)
          this.$refs.groupData.setData(response.data.data)
      }).catch(error=>{
        console.log(error)
      })
    }
  },
  mounted() {
    GlobalVariable.setPage(['Group'])
    this.init()
  }
}

</script>

<style lang="scss" scoped>
.group-body{
  margin: auto;
  height: 100%;
}

.group-background{
  background: rgba(255,255,255,0.4);
  box-shadow:  0 5px 15px -5px #f5f5f5;;
  width: 1200px;
  height: 100%;
  margin: auto;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
}

.group-section{
  overflow: hidden;
  position: relative;
  margin: auto;
  text-align: center;
  width: 1000px;
  left: 0;
  right: 0;
}

.group-single{
  width: 320px;
}

</style>
