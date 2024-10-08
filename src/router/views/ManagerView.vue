<template>
  <!-- 站娘 -->
  <l2dtest></l2dtest>

  <div class="test">
    <p>Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
      ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure
      dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
  </div>

  <!-- 悬浮任务栏-->
  <float-btn></float-btn>
</template>

<script>
import l2dtest from "@/manage/components/l2dtest.vue";
import floatBtn from "@/manage/components/floatBtn.vue";
export default {
  components:{
    l2dtest,
    floatBtn
  },
  data(){
    return{

    }
  }
}
</script>
