<template>
  <a-table :row-selection="rowSelection" :rowKey="(record) => record.id" size="small" :columns="columns" :data-source="tableStore.table" bordered>
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'id'">
        <span>{{ text }}</span>
      </template>
      <template v-if="column.dataIndex === 'gender'">
        <span>{{ text[0] }}</span>
      </template>
      <template v-if="column.dataIndex === 'operation'">
      </template>
    </template>
    <template #title>
      <a-button type="primary" @click="onEdit('')">添加</a-button>
      <a-drawer
          v-model:open="open"
          class="custom-class"
          root-class-name="root-class-name"
          title="用户信息"
          placement="right"
        >
        <Form></Form>
      </a-drawer>
      <a-button @click="onEdit(rowId)" type="primary">修改</a-button>
      <a-drawer
        v-model:open="open"
        class="custom-class"
        root-class-name="root-class-name"
        title="用户信息"
        placement="right"
        @after-open-change="afterOpenChange"
      >
      <Form></Form>
      </a-drawer>
      <a-button danger @click="onDeleteData(rowId)">删除</a-button>
    </template>
    <template #footer>
      <Pagination></Pagination>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import Pagination from './pagination/index.vue';
import useTableStore from '../../store/modules/table.ts'
import Form from './drawer/index.vue'
import type { TableProps, TableColumnType } from 'ant-design-vue';
import { getDeleteData } from '../../api/table/index.ts'

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

let rowId = ref<string>('1')
const tableStore = useTableStore()
const open = ref<boolean>(false);

const columns: TableColumnType<DataType>[] = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '性别',
    dataIndex: 'gender',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
  }
];

const onEdit = (id:string) => {
  tableStore.id = id
  open.value = true;
};

const rowSelection: TableProps['rowSelection'] = {
  onChange: (selectedRowKeys: string, selectedRows: DataType[]) => {
    rowId.value = selectedRowKeys.toString()
    console.log(rowId.value)
    // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
};

const onDeleteData = async (id:string) => {
  await getDeleteData({id: id})
  history.go(0)
}
</script>
<style lang="scss" scoped>
@import './index.scss'
</style>