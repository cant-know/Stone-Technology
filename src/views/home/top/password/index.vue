<template>
  <div class="password">
    <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
  >
      <h1 class="fake">点击输入框后将发送验证码到手机号为{{ userStore.phone }}的手机</h1>
      <h1>点击输入框自动获取验证码(1000~9999的随机数)</h1>
    <a-form-item
      label="验证码"
    >
      <a-input v-model:value="code" placeholder="请输入验证码" @click="onCode"/>
    </a-form-item>

    <a-form-item
      label="新密码"
      name="password"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item
      label="确认密码"
      name="confirm"
    >
      <a-input-password/>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit" @click="onPassword">保存修改</a-button>
    </a-form-item>
  </a-form>
  </div>
</template>

<script setup lang="ts">
import { getCode, getPassword } from "../../../../api/modal/index.ts";
import useUserStore from "../../../../store/modules/user.ts";
import { reactive, ref } from 'vue';

interface FormState {
  phone: string;
  password: string;
}

const userStore = useUserStore()
const code = ref<string>('')
const formState = reactive<FormState>({
  phone: userStore.phone,
  password: '',
});

const onCode = async () => {
  // @ts-ignore
  const result:string = await getCode()
  code.value = result
}

const onPassword = async () => {
  const result = await getPassword(formState)
  console.log(result)
}
</script>

<style lang="scss" scoped>
@import './index.scss'
</style>