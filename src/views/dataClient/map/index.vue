<template>
  <div ref="chart" style="{width: 100%;height: 100%;}">
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import mapJson from '../../../assets/china.json'

type EChartsOption = echarts.EChartsOption;

const chart = ref()

onMounted(() => {
  getChart()
})

const getChart = () => {
  const echart = echarts.init(chart.value,'dark')
  let option: EChartsOption

  echarts.registerMap('china', mapJson)

option = {
    geo: {
      right: '20%',
      top: '40%',
      map: "china",
      zoom: 3.2,
      center: [102.848234, 32.82333],
      scaleLimit: {
        min: 0.8
      },
      label: {
        color: "#fff",
        show: true
      },
      emphasis: {
        label: {
          color: "#fff",
          show: true
        },
        itemStyle: {
          areaColor: {
            colorStops: [
              {
                offset: 0,
                color: "#073684"
              },
              {
                offset: 1,
                color: "#2B91B7"
              }
            ]
          }
        }
      },
      itemStyle: {
        areaColor: {
          colorStops: [
            {
              offset: 0,
              color: "#073684"
            },
            {
              offset: 1,
              color: "#061E3D"
            }
          ]
        },
        borderColor: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: "#00F6FF"
            },
            {
              offset: 1,
              color: "#87ADCB"
            }
          ],
          false
        ),
        shadowColor: "rgba(10,76,139,1)",
        shadowOffsetY: 0,
        shadowBlur: 30,
        borderWidth: 1
      },
    },
    series: [{
      map: 'china',
    }],
};

option && echart.setOption(option);

}

</script>

<style lang="scss" scoped>

</style>