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
  legend: {
    top: 'bottom'
  },
  series: [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      radius: [16, 80],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
      data: [
        { value: 40, name: 'rose 1' },
        { value: 38, name: 'rose 2' },
        { value: 32, name: 'rose 3' },
        { value: 30, name: 'rose 4' },
        { value: 28, name: 'rose 5' },
        { value: 26, name: 'rose 6' },
        { value: 22, name: 'rose 7' },
        { value: 18, name: 'rose 8' }
      ]
    }
  ]
};

option && echart.setOption(option);

}

</script>

<style lang="scss" scoped>

</style>