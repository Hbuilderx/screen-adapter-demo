<template>
  <h2
    v-if="isSeriesEmpty"
  >暂无数</h2>
  <bar-chart v-else v-bind="$props" />
</template>

<script>
import { isEmpty } from "lodash";
import BarChart from "./BarChart.vue";


export default {
  name: "EchartBar",
  components: { BarChart },
  props: BarChart.props,
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
