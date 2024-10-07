<template>
<!--  <Demo></Demo>-->
<!--  <BlogHeader></BlogHeader>-->

</template>

<script>
import Demo from "@/blogger/components/FloatButton.vue"
import BlogHeader from "@/blogger/components/BlogHeader";
export default ({
  components:{
    Demo,
    BlogHeader
  },
  methods:{
  },
  data(){
    return{

    }
  }
})
</script>

<style lang="scss">
body{
  margin:0;
  padding:0;
  border:0
}
.main{
  top:0;
  left: 0;
  height: 100%;
  width: 100%;
}

</style>
