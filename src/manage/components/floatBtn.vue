<template>
  <a-float-button-group trigger="click" type="primary" :style="{ right: '24px' }">
    <template #icon>
      <SmileOutlined />
    </template>

    <a-float-button tooltip="首页" @click="this.$router.push('/manage/main')">
      <template #icon>
        <HomeOutlined />
      </template>
    </a-float-button>

    <a-float-button tooltip="写博客" @click="this.$router.push('/manage/editor')">
      <template #icon>
        <FormOutlined />
      </template>
    </a-float-button>

    <a-float-button tooltip="群组管理" @click="this.$router.push('/manage/group')">
      <template #icon>
        <TeamOutlined />
      </template>
    </a-float-button>

    <a-float-button tooltip="站点管理" @click="this.$router.push('/manage/siteset')">
      <template #icon>
        <SettingOutlined />
      </template>
    </a-float-button>

    <a-back-top tooltip="回到顶部" :visibility-height="0" />

  </a-float-button-group>
</template>

<script setup>
import {
  FormOutlined,
  HomeOutlined,
  SettingOutlined,
  SmileOutlined,
  TeamOutlined
} from "@ant-design/icons-vue";
</script>