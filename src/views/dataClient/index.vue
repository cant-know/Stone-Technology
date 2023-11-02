<template>
  <div ref="container" class="container" style="{width: 100%;height: 100%;}">
    <div class="left">
      <div class="item">
        <Line></Line>
      </div>
      <div class="item">
        <Pie></Pie>
      </div>
    </div>
    <div class="middle">
      <div class="title">
        <div class="sum">统计图</div>
        <div class="mom">(母亲大人想的名称)</div>
      </div>
      <div class="map">
        <Map></Map>
      </div>
    </div>
    <div class="right">
      <div class="item">
        <Bar></Bar>
      </div>
      <div class="item">
        <Radar></Radar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Line from "./line/index.vue";
import Pie from "./pie/index.vue";
import Bar from "./bar/index.vue";
import Radar from "./radar/index.vue";
import Map from './map/index.vue'
// import { useRouter } from 'vue-router'

// const $router = useRouter()

// onMounted(() => {
//   window.addEventListener('resize',() => {
//     $router.go(0)
//   })
// })

</script>

<style lang="scss" scoped>
@import './index.scss'
</style>