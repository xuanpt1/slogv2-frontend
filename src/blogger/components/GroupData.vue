<template>
  <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
    <template #footer>
      <div>
      </div>
    </template>
    <template #renderItem="{ item }">
      <a-list-item key="item.rcid" style="color: white;margin-top: 50px;background: rgba(255,255,255,0.5)">
        <a-list-item-meta :description="item.author">
          <template #title>
            <a :href="item.link" style="color: white">{{ item.title }}</a>
          </template>
        </a-list-item-meta>
        <p v-html="item.text" class="group-html"></p>
      </a-list-item>
    </template>
  </a-list>
</template>
<script>

import {ref} from "vue";

export default {
  data(){
    return{
      listData:ref([]),
      pagination:{
        onChange:page=>{
          console.log(page)
        },
        pageSize: 4
      }
    }
  },
  methods:{
    setData(datas){
      this.listData = datas

    }
  }
}

</script>

<style lang="scss">
.group-html{
  img{
    width: 80%;
  }
}
</style>
