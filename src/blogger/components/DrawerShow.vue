<template>
  <div
      :style="{
      height: '200px',
      overflow: 'hidden',
      position: 'relative',
      border: '1px solid #ebedf0',
      borderRadius: '2px',
      padding: '48px',
      textAlign: 'center',
      background: '#fafafa',
    }"
  >
    Render in this
    <div style="margin-top: 16px">
      <a-button type="primary" @click="showDrawer">Open</a-button>
    </div>
    <a-drawer
        title="Basic Drawer"
        placement="right"
        :closable="false"
        :open="$data.open"
        :get-container="false"
        :style="{ position: 'absolute' }"
        @close="onClose"
    >
      <p>Some contents...</p>
    </a-drawer>
  </div>
</template>
<script>
import { ref } from 'vue';

export default {
  data(){
    return{
      open:ref(false)
    }
  },
  methods:{
    showDrawer(){
      open.value = true;
    },
    onClose(){
      open.value = false;
    }
  }
}
</script>
