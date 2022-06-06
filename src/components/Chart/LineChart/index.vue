<template>
  <h2
    v-if="isSeriesEmpty"
  >暂无数</h2>
  <line-chart v-else v-bind="$props" />
</template>

<script>
import { isEmpty } from "lodash";
import LineChart from "./LineChart.vue";


export default {
  name: "EchartLine",
  components: { LineChart },
  props: LineChart.props,
  computed: {
    // 针对饼图数据是不是无效的判断
    isSeriesEmpty() {
      return (
        isEmpty(this.seriesData) || this.seriesData.every((item) => !item.value)
      );
    },
  },
};
</script>
