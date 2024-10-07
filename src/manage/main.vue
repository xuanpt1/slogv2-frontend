<template>
  <div class="header" style="border: 1px solid rgb(235, 237, 240)">
    <a-page-header title="标题测试" sub-title="This is a subtitle" @back="() => $router.go(-1)">
      <template #extra>
        <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" />
      </template>
    </a-page-header>
  </div>
  <div class="avatar">
  <a-avatar :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }">
    <template #icon>
      <AntDesignOutlined />
    </template>
  </a-avatar>
  </div>
  <div class="jump">
  <a-card class="card1" style="height: 150px">
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </a-card>
  <a-card class="card2" style="width: 300px">
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </a-card>
  <a-card class="card3" style="width: 300px">
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </a-card>
  </div>
</template>

<script setup>
import { h, ref } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined, AntDesignOutlined } from '@ant-design/icons-vue';
const current = ref(['mail']);
const items = ref([
  {
    key: 'mail',
    icon: () => h(MailOutlined),
    label: 'Navigation One',
    title: 'Navigation One',
  },
  {
    key: 'app',
    icon: () => h(AppstoreOutlined),
    label: 'Navigation Two',
    title: 'Navigation Two',
  },
  {
    key: 'sub1',
    icon: () => h(SettingOutlined),
    label: 'Navigation Three - Submenu',
    title: 'Navigation Three - Submenu',
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    key: 'alipay',
    label: h(
        'a',
        {
          href: 'https://antdv.com',
          target: '_blank',
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
.avatar{
  position: absolute;
  left: 20%;
  top: 40%;
  cursor: pointer;
}
.jump{
  position: absolute;
  right: 20%;
  bottom: 5%;
  z-index: 0;
}
.card1{
  right: 30%;
  background-color: #ecf0f3;
}
.card2{
  background-color: #ecf0f3;
}
.card3{
  left: 20%;
  background-color: #ecf0f3;
}
</style>
