<template>
  <div class="header" style="border: 1px solid rgb(235, 237, 240)">
    <a-page-header title="标题测试" sub-title="This is a subtitle" @back="() => $router.go(-1)">
      <template #extra>
        <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items1" />
      </template>
    </a-page-header>
  </div>

  <div>
    <a-affix :offset-top="top">
    <a-switch :checked="state.mode === 'vertical'" @change="changeMode" />
    Mode
    <span class="ant-divider" style="margin: 0 1em" />
    <a-switch :checked="state.theme === 'dark'" @change="changeTheme" />
    Theme
    <br />
    <br />
    <a-menu
        v-model:openKeys="state.openKeys"
        v-model:selectedKeys="state.selectedKeys"
        style="width: 256px"
        :mode="state.mode"
        :items="items"
        :theme="state.theme"
    ></a-menu>
    </a-affix>
  </div>

  <a-table class="table" :columns="columns" :data-source="dataSource" bordered>
    <template #bodyCell="{ column, text, record }">
      <template v-if="['name', 'age', 'address'].includes(column.dataIndex)">
        <div>
          <a-input
              v-if="editableData[record.key]"
              v-model:value="editableData[record.key][column.dataIndex]"
              style="margin: -5px 0"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <span v-if="editableData[record.key]">
            <a-typography-link @click="save(record.key)">Save</a-typography-link>
            <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="edit(record.key)">Edit</a>
          </span>
        </div>
      </template>
    </template>
  </a-table>

</template>

<script setup>
import { cloneDeep } from 'lodash-es';
import { h, reactive, ref } from 'vue';
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';
const state = reactive({
  mode: 'inline',
  theme: 'light',
  selectedKeys: ['1'],
  openKeys: ['sub1'],
});
const current = ref(['mail']);
const items1 = ref([
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
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = reactive([
  getItem('Navigation One', '1', h(MailOutlined)),
  getItem('Navigation Two', '2', h(CalendarOutlined)),
  getItem('Navigation Two', 'sub1', h(AppstoreOutlined), [
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
    getItem('Submenu', 'sub1-2', null, [getItem('Option 5', '5'), getItem('Option 6', '6')]),
  ]),
  getItem('Navigation Three', 'sub2', h(SettingOutlined), [
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
  ]),
]);
const changeMode = checked => {
  state.mode = checked ? 'vertical' : 'inline';
};
const changeTheme = checked => {
  state.theme = checked ? 'dark' : 'light';
};
const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    width: '25%',
  },
  {
    title: 'age',
    dataIndex: 'age',
    width: '15%',
  },
  {
    title: 'address',
    dataIndex: 'address',
    width: '40%',
  },
  {
    title: 'operation',
    dataIndex: 'operation',
  },
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
const dataSource = ref(data);
const editableData = reactive({});
const edit = key => {
  editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
};
const save = key => {
  Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
  delete editableData[key];
};
const cancel = key => {
  delete editableData[key];
};
</script>

<style scoped>
.header {
  padding-bottom: 20px;
}
.header tr:last-child td {
  padding-bottom: 0;
}
.editable-row-operations a {
  margin-right: 8px;
}
.table{
  position: absolute;
  width: 80%;
  left: 20%;
  top: 20%;
}
</style>