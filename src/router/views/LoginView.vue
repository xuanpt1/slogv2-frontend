<template>
  <div class="back-image"></div>

  <div class="body">
    <div class="login-container">
      <div class="text" style="text-align: center">
        <p>登陆到Slog后台</p>
        <br>
      </div>

      <div class="login-form-div">
        <a-form
            :model="formState"
            name="normal_login"
            class="login-form"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
        >
          <a-form-item
              label="用户名"
              name="username"
              :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <a-input v-model:value="formState.username">
              <template #prefix>
                <UserOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
              label="密码&nbsp;&nbsp;&nbsp;&nbsp;"
              name="password"
              :rules="[{ required: true, message: 'Please input your password!' }]"
          >
            <a-input-password v-model:value="formState.password">
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>

          <div class="login-fail" style="visibility: hidden">
            <p>用户名或密码错误</p>
          </div>

          <a-form-item>
            <a-form-item name="remember" no-style>
              <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
            </a-form-item>
            <a class="login-form-forgot" href="">Forgot password</a>
          </a-form-item>

          <a-form-item>
            <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
              Log in
            </a-button>
            Or
            <a href="">register now!</a>
          </a-form-item>
        </a-form>
      </div>

      <a-button @click="onTestButtonClicked">test button</a-button>
    </div>
  </div>

</template>
<script>
import { defineComponent, reactive, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import {login, test} from "@/manage/manageApi/manage";
import {setToken} from "@/router/auth";
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const formState = reactive({
      username: '',
      password: '',
      remember: true,
    });
    const onFinish = values => {
      console.log('Success:', values);
      login(values).then(response=>{
        setToken(response.data.data)
        window.location.href = '/#/managerView'
      })
    };
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
      var div = document.getElementsByClassName('login-fail')
      div.style.visibility = 'visible'
    };
    const disabled = computed(() => {
      return !(formState.username && formState.password);
    });
    const onTestButtonClicked = () => {
      test().then(response=>{
        console.log(response)
      })
    }
    return {
      formState,
      onFinish,
      onFinishFailed,
      onTestButtonClicked,
      disabled,
    };
  },
});
</script>

<style lang="scss" scoped>

.body{
  width: 100%;
  height: 100vh;

  background-image: -webkit-linear-gradient(left top, rgba(255,100,180,1), rgba(0,0,0,0.4), rgba(200,255,255,0.4));
}

.text{

}

.login-container{
  position: absolute;
  left: 50%;
  transform: translate(-50%, 80%);
  background: #ecf0f3;
  border-radius: 20px;
  padding: 20px;
  width: 40%;
  max-width: 500px;
  height: auto;
}

.login-form-div{
  text-align: center;
}

#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}

</style>
