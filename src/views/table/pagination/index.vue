<template>
  <div class="pagination">
    <a-pagination
      :pageSize="pageSize"
      v-model:current="current2"
      show-quick-jumper
      :total="all"
      show-less-items
      @change="onChange"
      @showSizeChange="onSizeChange"
    />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import useTableStore from "../../../store/modules/table.ts";
import { getAllData } from '../../../api/table/index.ts'

onMounted(() => {
  onAllData()
})

let pageSize = ref<string>('10')
const all = ref<number>(1000)
const tableStore = useTableStore()
const current2 = ref<number>(1);

const onChange = (pageNumber: string) => {
  tableStore.pageIndex = pageNumber
  tableStore.onTableData(tableStore.pageIndex,pageSize.value)
};

const onAllData = async () => {
  const result:number = await getAllData()
  all.value = result
}

const onSizeChange = (current, size:string) => {
  pageSize.value = size
}
</script>
