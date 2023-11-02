<template>
  <div class="container">
    <a-menu @click="onMenuItemClick" v-model:selectedKeys="current" mode="horizontal" :items="items" theme="dark" />
    <a-popover title="绝对不是诈骗信息!" trigger="click"
        overlayClassName="notice"
    >
      <template #content>
        <hr>
        <p>我是秦始皇</p>
        <p>肯德基疯狂星期四V我50</p>
        <p>送你十万大军!</p>
        <hr>
        <p>我本是显赫世家的千金</p>
        <p>却被诡计的奸人所害</p>
        <p>家人弃我!师门逐我!</p>
        <p>重生一世,今天肯德基疯狂星期四!谁请我吃!</p>
        <hr>
      </template>
      <div class="popover">
        <BellOutlined />
        消息通知(5)</div>
    </a-popover>
    <div class="name">一只呆瓜、</div>
    <a-dropdown>
    <div class="avatar">
      <img src="../../../assets/test.jpg" alt="我头像呢?">
      <DownOutlined />
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <UserOutlined />
          <a href="javascript:;" @click="showModal">个人信息</a>
          <a-modal
            v-model:open="open"
            width="50%"
            title="个人信息"
            wrap-class-name="full-modal"
            @ok="handleOk"
          >
            <Modal></Modal>
          </a-modal>
        </a-menu-item>
        <a-menu-item>
          <FormOutlined />
          <a href="javascript:;" @click="showPasswordModal">修改密码</a>
          <a-modal
            v-model:open="openPassword"
            width="50%"
            title="修改密码"
            wrap-class-name="full-modal"
            @ok="handleOk"
          >
          <Password></Password>
          </a-modal>
        </a-menu-item>
        <hr>
        <a-menu-item>
          <ExportOutlined />
          <a href="javascript:;" @click="loginOut">退出登录</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue';
import { DownOutlined, BellOutlined, FullscreenOutlined, UserOutlined, FormOutlined, ExportOutlined } from '@ant-design/icons-vue';
import { MenuProps } from 'ant-design-vue';
import Modal from './modal/index.vue'
import Password from './password/index.vue'
import { useRouter } from 'vue-router';
import useUserStore from '../../../store/modules/user';

const open = ref<boolean>(false);
const openPassword = ref<boolean>(false);
const current = ref<string[]>(['mail']);
const $router = useRouter()
const userStore = useUserStore()
const items = ref<MenuProps['items']>([
  {
    key: 'fullScreen',
    icon: () => h(FullscreenOutlined),
    label: '全屏模式',
    title: 'fullScreen',
  },
]);

const onMenuItemClick = (e: { key: string; }) => {
  if(e.key == 'fullScreen'){
    document.documentElement.requestFullscreen()
  }
}

const showModal = () => {
  open.value = true;
};

const showPasswordModal = () => {
  openPassword.value = true
}

const handleOk = () => {
  open.value = false;
};

const loginOut = () => {
  userStore.token = ''
  userStore.phone = ''
  localStorage.setItem('token','')
  $router.push({path: '/login'})
}
</script>

<style lang="scss" scoped>
@import './index.scss'
</style>

