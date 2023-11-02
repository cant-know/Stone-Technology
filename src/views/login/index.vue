<template>
    <div class="container">
    <Block class="picture"></Block>
    <div class="login">
      <div class="box">
        <div class="header">
          <span class="top">Stone</span>
          <span class="bottom">technology</span>
        </div>
        <div class="form">
          <a-form
            class="page"
            v-model="formState"
            name="basic"
            :rules="rules"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
          >
            <a-form-item
              label="手机号"
              name="phone"
            >
              <a-input v-model:value="formState.phone" />
            </a-form-item>

            <a-form-item
              label="密码"
              name="password"
            >
              <a-input-password v-model:value="formState.password" />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
              <a-button type="primary" html-type="submit" size="large" @click="onLogin">登录</a-button>
              <a-button html-type="submit" size="large" @click="onRegister">注册</a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Block from './images/block.vue'
import { reactive } from 'vue';
import { getRegister,getLogin } from "../../api/login/index.ts";
import useUserStore from "../../store/modules/user.ts";
import { useRouter } from 'vue-router';
import type { LoginResponse } from '../../api/login/type.ts'
import type { Rule } from 'ant-design-vue/es/form';

interface FormState {
  phone: string;
  password: string;
}

const formState = reactive<FormState>({
  phone: '',
  password: '',
});

const userStore = useUserStore()
const router = useRouter()

const validatePass = () => {
  const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  if(!reg.test(formState.phone)){
    return Promise.reject('请输入正确的手机号!')
  }
}

const validatePass2 = () => {
  const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  if(!reg.test(formState.password)){
    return Promise.reject('密码格式应为至少8个字符，至少1个大写字母，1个小写字母和1个数字,不能包含特殊字符（非数字字母）!')
  }
}

const onRegister = () => {
  getRegister(formState)
}

const onLogin = async () => {
  // @ts-ignore
  const result:LoginResponse = await getLogin(formState)
  userStore.token = result.token
  if(userStore.token){
    localStorage.setItem('token',userStore.token)
    userStore.phone = formState.phone
    router.push({path: '/home'})
  }
}

const rules: Record<string, Rule[]> = {
  phone: [{ required: true, validator: validatePass, trigger: 'blur' }],
  password: [{ required: true, validator: validatePass2, trigger: 'blur' }],
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>