<template>
  <div class="header" style="border: 1px solid rgb(235, 237, 240)">
    <a-page-header title="SLOG博客系统" sub-title="管理端 Ciallo～(∠・ω< )⌒★" @back="() => $router.go(-1)">
      <template #extra>
        <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items"/>
      </template>
    </a-page-header>
  </div>
</template>

<script setup>
import { h, ref } from 'vue';
import {
  HomeOutlined,
  FormOutlined,
  TeamOutlined,
  SettingOutlined,
  ProfileOutlined,
  ContainerOutlined,
  CommentOutlined,
  FolderOpenOutlined,
  ToolOutlined
} from '@ant-design/icons-vue';
import router from "@/router/router.js";

const current = ref(['home']);
const gotest = () => {
  router.push("/manage/siteset");
}

const items = ref([
  {
    key: 'home',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: 'blog',
    icon: () => h(FormOutlined),
    label: '写博客',
    title: '写博客',
  },
  {
    key: 'group',
    icon: () => h(TeamOutlined),
    label: '群组管理',
    title: '群组管理',
  },
  {
    key: 'setting',
    icon: () => h(SettingOutlined),
    label: '站点管理',
    title: '站点管理',
    children: [
      {
        type: 'group',
        children: [
          {
            label: '分类管理',
            key: 'setting:1',
            icon: () => h(ProfileOutlined),
          },
          {
            label: '博文管理',
            key: 'setting:2',
            icon: () => h(ContainerOutlined),
          },
          {
            label: '评论管理',
            key: 'setting:3',
            icon: () => h(CommentOutlined),
          },
          {
            label: '文件管理',
            key: 'setting:4',
            icon: () => h(FolderOpenOutlined),
          },
          {
            label: '站点配置',
            key: 'setting:5',
            icon: () => h(ToolOutlined),
          },
        ],
      },
    ],
  },
  {
    key: '/manage/siteset',
    label: h(
        'span',
        {
          onClick(){
            gotest();
          }
        },
        'Navigation Four - Link',
    ),
    title: 'Navigation Four - Link',
  },
]);
</script>

<style scoped>

.header {
  padding-bottom: 20px;
}
.header tr:last-child td {
  padding-bottom: 0;
}
</style>
