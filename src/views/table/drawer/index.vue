<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
  >
    <a-form-item label="姓名" name="name">
      <a-input v-model:value="formState.name" />
    </a-form-item>

    <a-form-item label="性别">
      <a-radio-group v-model:value="formState.gender">
        <a-radio value="1">男</a-radio>
        <a-radio value="2">女</a-radio>
      </a-radio-group>
    </a-form-item>

    <a-form-item label="年龄" name="age">
      <a-input v-model:value="formState.age" />
    </a-form-item>

    <a-form-item label="邮箱" name="email">
      <a-input v-model:value="formState.email" />
    </a-form-item>

    <a-form-item label="手机号" name="phone">
      <a-input v-model:value="formState.phone" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button @click="onEditData" type="primary" html-type="submit">完成</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { getEditData } from '../../../api/table/index.ts'
import useTableStore from "../../../store/modules/table.ts";

interface FormState {
  id: string;
  name: string;
  gender: string;
  age: string;
  email: string;
  phone: string;
}

const tableStore = useTableStore()
const formState = reactive<FormState>({
  id: tableStore.id,
  name: '',
  gender: '',
  age: '',
  email: '',
  phone: '',
});

const onEditData = async () => {
  console.log(tableStore.id)
  const result = await getEditData(formState)
  history.go(0)
}
</script>

<style lang="scss" scoped>
@import './index.scss'
</style>
