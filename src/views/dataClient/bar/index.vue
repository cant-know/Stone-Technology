<template>
  <div ref="chart" style="{width: 100%;height: 100%;}">
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;

const chart = ref()

onMounted(() => {
  getChart()
})

const getChart = () => {
  const echart = echarts.init(chart.value,'dark')
  let option: EChartsOption

option = {
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
    }
  ]
};

option && echart.setOption(option);

}

</script>

<style lang="scss" scoped>

</style>