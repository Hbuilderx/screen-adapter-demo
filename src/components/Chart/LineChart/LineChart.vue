<template>
	
	
	<h3 v-if="isSeriesEmpty">暂无数据</h3>
	
	<div v-else class="chart">
		
	</div>
</template>

<script>
	
import * as Echarts from "echarts"
import ResizeListener from "element-resize-detector";
import { merge, isEmpty } from "lodash";
import {basicOption} from "./defaultOption.js"
import {pieChartColor} from "../color.js"

	export default{
		name: "LineChart",
		props: {
		    // 正常的业务数据，对应echarts饼图配置中series[0].data
		    seriesData: {
		      type: Array,
		      required: true,
		      default: () => [],
		    },
		    // 表示需要特殊定制的配置
		    // 一般UI会规定一个统一的设计规范（比如颜色，字体，图例格式，位置等）
		    // 但不排除某个图标会和设计规范不同，需要特殊定制样式，所以开放这个配置，增强灵活性
		    extraOption: {
		      type: Object,
		      default: () => ({}),
		    },
		  },
		  data() {
		    return {
		      chart: null,
		    };
		  },
			
			computed:{
				isSeriesEmpty() {
				  return (
				    isEmpty(this.seriesData) || this.seriesData.length<=0
				  );
				},
			},
			
			//监听数据变化，更新图表
		  watch: {
		    seriesData: {
		      deep: true,
		      handler() {
		        this.updateChartView();
		      },
		    },
		  },
			
			mounted() {
				this.chart = Echarts.init(this.$el);
				this.updateChartView();
				window.addEventListener("resize", this.handleWindowResize);
				this.addChartResizeListener();
			},
			beforeDestroy() {
			  window.removeEventListener("resize", this.handleWindowResize);
			},
			
			methods:{
				
				/* 合并配置项和数据 */
				
				assembleDataToOption() {
					// 这部分的图例formatter取决于UI要求，如果你的项目中不需要，就可以不写formatter
					// 由于echarts版本的迭代，这里的写法也有稍许改变
					const formatter = (name) => {
						const total = this.seriesData.reduce((acc, cur) => acc + cur.value, 0);
						const data = this.seriesData.find((item) => item.name === name) || {};
						const percent = data.value
							? `${Math.round((data.value / total) * 100)}%`
							: "0%";
		
						return `${name} ${percent}`;
					};
					return merge(
						{},
						basicOption,
						{ color: pieChartColor },
						{
							// legend: { formatter },
							series: this.seriesData,
						},
						this.extraOption
					);
				},
				/**
				 * 对chart元素尺寸进行监听，当发生变化时同步更新echart视图
				 */
				addChartResizeListener() {
					const instance = ResizeListener({
						strategy: "scroll",
						callOnAdd: true,
					});
		
					instance.listenTo(this.$el, () => {
						if (!this.chart) return;
						this.chart.resize();
					});
				},
		
				/**
				 * 更新echart视图
				 */
				updateChartView() {
					if (!this.chart) return;		
					const fullOption = this.assembleDataToOption();
					this.chart.setOption(fullOption, true);
				},
		
				/**
				 * 当窗口缩放时，echart动态调整自身大小
				 */
				handleWindowResize() {
					if (!this.chart) return;
					this.chart.resize();
				},
				
				
			}
		
		
	}
</script>

<style scoped="scoped" lang="scss">
	.chart {
		width: 100%;
		height: 100%;
	}
</style>
