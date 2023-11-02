<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="昵称">
      <a-input v-model:value="formState.name" :disabled="edit"/>
    </a-form-item>
    <a-form-item label="居住地">
      <a-input v-model:value="formState.region" :disabled="edit"/>
    </a-form-item>
    <a-form-item label="职业">
      <a-checkbox-group v-model:value="formState.work" :disabled="edit">
        <a-checkbox value="1" name="type">学生</a-checkbox>
        <a-checkbox value="2" name="type">教师</a-checkbox>
        <a-checkbox value="3" name="type">地球上的职业</a-checkbox>
        <a-checkbox value="4" name="type">创造世界</a-checkbox>
        <a-checkbox value="5" name="type">钝角</a-checkbox>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="性别">
      <a-radio-group v-model:value="formState.sex" :disabled="edit">
        <a-radio value="1">男</a-radio>
        <a-radio value="2">女</a-radio>
        <a-radio value="3">疑似女性</a-radio>
        <a-radio value="4">其他</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="出生日期">
      <a-input v-model:value="formState.birth" :disabled="edit"/>
    </a-form-item>
    <a-form-item label="自我介绍">
      <a-textarea v-model:value="formState.resume" :disabled="edit"/>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onEdit" v-if="edit">编辑资料</a-button>
      <a-button type="primary" @click="onEdit" v-else>完成</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { editUserInfo, getUserInfo } from '../../../../api/modal/index.ts'
import useUserStore from "../../../../store/modules/user.ts";
import type { UnwrapRef } from 'vue';

interface FormState {
  name: string;
  region: string;
  work: string[];
  sex: string;
  birth: string;
  resume: string;
  phone: string;
}

onMounted(() => {
  onUserInfo()
})

let edit = ref<boolean>(true)
const userStore = useUserStore()
const formState: UnwrapRef<FormState> = reactive({
  name: '',
  region: '',
  work: [],
  sex: '',
  birth: '',
  resume: '',
  phone: userStore.phone
});

const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };

const onEdit = async () => {
  if(edit.value == false){
    await editUserInfo(formState)
  }
  edit.value = !edit.value
}

const onUserInfo = async () => {
  // @ts-ignore
  const result:UnwrapRef<FormState> = await getUserInfo(formState.phone)
  formState.name = result.name
  formState.region = result.region
  formState.work = result.work
  formState.sex = result.sex
  formState.birth = result.birth
  formState.resume = result.resume
  formState.phone = result.phone
}
</script>

<style lang="scss">
@import './index.scss'
</style>