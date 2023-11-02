<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible @collapse="onCollapse">
      <div v-if="logoVisible" class="logo">
        <span>Stone</span>
        <span>technology</span>
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1" @click="changeRoute(1)">
          <pie-chart-outlined />
          <span>首页</span>
        </a-menu-item>
        <a-menu-item key="2" @click="onDataClient">
          <desktop-outlined />
          <span>数据大屏</span>
        </a-menu-item>
        <a-sub-menu key="3" @click="changeRoute(3)">
          <template #title>
            <span>
              <user-outlined />
              <span>Echarts</span>
            </span>
          </template>
          <a-menu-item key="31">Tom</a-menu-item>
          <a-menu-item key="32">Bill</a-menu-item>
          <a-menu-item key="33">Alex</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="4" @click="changeRoute(4)">
          <desktop-outlined />
          <span>超级表格</span>
        </a-menu-item>
        <a-menu-item key="5" @click="changeRoute(5)">
          <file-outlined />
          <span>关于项目</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <!-- <a-layout-header style="background: #fff; padding: 0" /> -->
      <Top></Top>
      <Tab></Tab>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  FileOutlined,
} from '@ant-design/icons-vue';
import { onMounted, ref } from 'vue';
import { useRouter } from "vue-router";
import Top from './top/index.vue'
import Tab from './tab/index.vue'
// 在table页面发送请求获得数据后，数据无法渲染，需提前在home页面获取
import userTableStore from '../../store/modules/table.ts'

onMounted(() => {
  tableStore.onTableData(tableStore.pageIndex,'10')
})

const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(['1']);
const logoVisible = ref<boolean>(true)
const $router = useRouter()
const shit = ref<boolean>(true)
const tableStore = userTableStore()

const onCollapse = () => {
  logoVisible.value = !logoVisible.value
}

const changeRoute = (key:number) => {
  switch(key){
    case 1: $router.push({path: '/home/welcome'});break
    case 3: $router.push({path: '/home/echarts'});break
    case 4: $router.push({path: '/home/table'});break
    case 5: $router.push({path: '/home/about'});break
  }
}

const onDataClient = () => {
  $router.push({path: '/dataClient'})
  document.documentElement.requestFullscreen()
  document.addEventListener('fullscreenchange',() => {
    if(shit.value == true){
      shit.value = !shit.value
      return;
    }
    if(shit.value == false){
      shit.value = !shit.value
      $router.push({path: '/home'})
      return;
    }
  })
}

</script>
<style lang="scss" scoped>
@import './index.scss'
</style>
