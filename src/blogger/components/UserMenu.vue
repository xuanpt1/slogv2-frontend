<template>
  <a-button type="primary" @click="showDrawer" style="margin-left: 30px">
    <template #icon><PlusOutlined /></template>
    设置发表信息
  </a-button>
  <a-drawer
      title="尽管姓名已经破碎，也请您发表信息之评"
      :width="720"
      :open="open"
      :body-style="{ paddingBottom: '80px' }"
      :footer-style="{ textAlign: 'right' }"
      @close="onClose"
  >
    <a-form :model="form" :rules="rules" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="昵称" name="name">
            <a-input v-model:value="form.name" placeholder="告诉我你的名字喵~" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Url" name="url">
            <a-input
                v-model:value="form.url"
                style="width: 100%"
                addon-before="http://"
                addon-after=".com"
                placeholder="请输入网址喵~"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="邮箱" name="email">
            <a-input v-model:value="form.email" placeholder="联系方式喵~" />
          </a-form-item>
        </a-col>
<!--        <a-col :span="12">-->
<!--          <a-form-item label="Type" name="type">-->
<!--            <a-select v-model:value="form.type" placeholder="Please choose the type">-->
<!--              <a-select-option value="private">Private</a-select-option>-->
<!--              <a-select-option value="public">Public</a-select-option>-->
<!--            </a-select>-->
<!--          </a-form-item>-->
<!--        </a-col>-->
      </a-row>
<!--      <a-row :gutter="16">-->
<!--        <a-col :span="12">-->
<!--          <a-form-item label="Approver" name="approver">-->
<!--            <a-select v-model:value="form.approver" placeholder="Please choose the approver">-->
<!--              <a-select-option value="jack">Jack Ma</a-select-option>-->
<!--              <a-select-option value="tom">Tom Liu</a-select-option>-->
<!--            </a-select>-->
<!--          </a-form-item>-->
<!--        </a-col>-->
<!--        <a-col :span="12">-->
<!--          <a-form-item label="DateTime" name="dateTime">-->
<!--            <a-date-picker-->
<!--                v-model:value="form.dateTime"-->
<!--                style="width: 100%"-->
<!--                :get-popup-container="trigger => trigger.parentElement"-->
<!--            />-->
<!--          </a-form-item>-->
<!--        </a-col>-->
<!--      </a-row>-->
<!--      <a-row :gutter="16">-->
<!--        <a-col :span="24">-->
<!--          <a-form-item label="Description" name="description">-->
<!--            <a-textarea-->
<!--                v-model:value="form.description"-->
<!--                :rows="4"-->
<!--                placeholder="please enter url description"-->
<!--            />-->
<!--          </a-form-item>-->
<!--        </a-col>-->
<!--      </a-row>-->
    </a-form>
    <template #extra>
      <a-space>
        <a-button @click="onClose">关闭</a-button>
        <a-button type="primary" @click="onSave">保存</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>
<script setup>
import {onMounted, onUnmounted, reactive, ref} from 'vue';
import {PlusOutlined} from "@ant-design/icons-vue";
import {notification} from "ant-design-vue";
import GlobalVariable from "@/blogger/helper/GlobalVariable";

const form = reactive({
  name: '',
  url: '',
  email: '',
  // type: '',
  // approver: '',
  // dateTime: null,
  // description: '',
});
const rules = {
  name: [
    {
      required: true,
      message: '必须要有名字喵！',
    },
  ],
  url: [
    {
      required: true,
      message: 'please enter url',
    },
  ],
  email: [
    {
      required: true,
      message: '必须知道怎么联系喵！',
    },
  ],
  // type: [
  //   {
  //     required: true,
  //     message: 'Please choose the type',
  //   },
  // ],
  // approver: [
  //   {
  //     required: true,
  //     message: 'Please choose the approver',
  //   },
  // ],
  // dateTime: [
  //   {
  //     required: true,
  //     message: 'Please choose the dateTime',
  //     type: 'object',
  //   },
  // ],
  // description: [
  //   {
  //     required: true,
  //     message: 'Please enter url description',
  //   },
  // ],
};
const open = ref(false);

const showDrawer = () => {
  //读取本地信息并显示到对应框内
  let saveData = JSON.parse(localStorage.getItem('slogfore-userdata'))
  if(saveData){
    form.name = saveData.name
    form.url = saveData.url
    form.email =saveData.email

  }
  open.value = true;
};
const onSave = () => {
  //保存对应框信息到本地
  if(form.name!=''&&form.url!=''&&form.email!=''){
    let saveData = {
      name:form.name,
      url:form.url,
      email:form.email
    }
    localStorage.setItem('slogfore-userdata',JSON.stringify(saveData))
    notification.open({
      message: '通知信息',
      description:
          '保存成功！',
      duration:3,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
    open.value = false;
  }
  else{
    notification.open({
      message: '通知信息',
      description:
          '请把内容填写完整！',
      duration:3,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }

}
const onClose = () => {
  open.value = false;
};

onMounted(()=>{
  GlobalVariable.userMenu.instance = this
})
onUnmounted(()=>{
  GlobalVariable.userMenu.instance = undefined
})

</script>

