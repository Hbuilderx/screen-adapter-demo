
# 可视化大屏系统--屏幕适配方案

> 前言：在综合了自己所做的几个可视化大屏项目后，总结了以下常用的可视化大屏系统屏幕适配方案

## 前置知识
常见的屏幕分辨率

- 1280 * 720： 老式电脑的屏幕，目前很少见到
- 1366 * 768 ： 普通液晶显示器
- 1920 * 1080： 高清液晶显示器
- 2560 * 1440： 2K高清显示器
- 4096 * 2160： 4K高清显示器



自适应的难点
- 要兼容不同屏幕尺寸的分辨率让页面在不同分辨率的屏幕下都保持正常的显示效果和比例
- 不同分辨率，显示场景不同，不能固定写死px单位
- 一些图表的自适应方式需要特别处理



关于vw和vh

- 屏幕视口宽度 = 100vw
- 屏幕视口高度 = 100vh
- vw和vh也是css中标准的单位，和px,rem, %一样

## 适配方案

### vw和vh适配

##### 处理思路
- 按照设计稿的尺寸，将`px`按比例计算转为`vw`和`vh`
- 转换公式如下

```
	假设设计稿尺寸为1920*1080（做之前一定问清楚UI设计稿的尺寸）
	即：
	网页宽度=1920px
	网页高度=1080px

	我们都知道
	网页宽度=100vw
	网页宽度=100vh
	
	所以，在1920x*1080px的屏幕分辨率下
	
	1920px = 100vw
	
	1080px = 100vh
	
	这样一来，以一个宽300px和200px的div来说，其作所占的宽高，以vw和vh为单位，计算方式如下:
	
	vwDiv = (300px / 1920px ) * 100vw
	vhDiv = (200px / 1080px ) * 100vh
	
	所以，就在1920*1080的屏幕分辨率下，计算出了单个div的宽高
	
	当屏幕放大或者缩小时，div还是以vw和vh作为宽高的，就会自动适应不同分辨率的屏幕
	

```

但是每次都手动计算时不现实的，所以，我需要封装一个处理函数，让它帮我自动计算

这里我用到了scss

- 在`src/styles`下新建一个`utils.scss`文件，定义好设计稿的宽度和高度两个变量

- 在这里使用scss内置的`math.div`函数，定义两个`vw`和`vh`的计算函数

- 我们传入具体的像素值，其帮我们自动计算出vw和vh的值

```js
//使用scss的math函数，https://sass-lang.com/documentation/breaking-changes/slash-div
@use "sass:math"; 


//默认设计稿的宽度
$designWidth:1920;
//默认设计稿的高度
$designHeight:1080;


//px转为vw的函数
@function vw($px) {
  @return math.div($px , $designWidth) * 100vw;
}

//px转为vh的函数
@function vh($px) {  
  @return math.div($px , $designHeight) * 100vh;
}

```

### 使用方式

##### 依赖项

使用前安装对应版本的node包

- "sass": "^1.26.5",
- "sass-loader": "^8.0.2",

##### 路径配置
我这里使用的是vue2.6和vue-cli3搭建的vue项目，所以，我只需要在`vue.config.js`里配置一下`utils.scss`的路径,就可以全局使用了

```js
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}



module.exports={
	publicPath: '', 
	configureWebpack: {
	  name: "app name",
	  resolve: {
	    alias: {
	      '@': resolve('src')
	    }
	  }
	},
	css:{
		//全局配置utils.scss,详细配置参考vue-cli官网
		loaderOptions:{
			sass:{
				 prependData:`@import "@/styles/utils.scss";`
			}
		}
	}
}
```

##### 在`.vue`文件中使用
```html
<template>
	<div class="box">			
	</div>
</template>

<script>
	export default{
		name: "Box",
		
	}
</script>

<style lang="scss" scoped="scoped">
		/* 
		 直接使用vw和vh函数，将像素值传进去，得到的就是具体的vw vh单位		 
		 */

		.box{
			width: vw(300);
			height: vh(100);
			font-size: vh(16);
			background-color: black;
			margin-left: vw(10);
			margin-top: vh(10);
			border: vh(2) solid red;
		}

</style>
```

### 特殊的使用情况

有的时候可能不仅在`.vue`文件中使用，比如在js中动态创建的DOM元素

它可能是直接渲染到html里面的

```
let oDiv = document.createElement('div')
document.body.appendChild(oDiv)

```
这样的话，我用了以下两种处理方式,来给创建的div设置样式

##### 1. 定义一些全局的class

新建一个`global.scss`文件，在main.js中引入

global.scss

```css
	.global-div{
		width: vw(300);
		height: vw(200);
		background-color: green;
	}
	
```

main.js
```js
import './styles/global.scss'
```

使用时，给创建的div设置className,

```js
let oDiv = document.createElement('div')
oDiv.className = "global-div"
```
##### 2. 定义js样式处理函数
这种处理方式和scss处理函数类似，只不过使用了纯js将px转为vw和vh

新建一个`styleUtil.js`文件，内容如下

```js
//定义设计稿的宽高
const designWidth = 1920;
const designHeight = 1080;

let styleUtil = {
    // px转vw
    px2vw: function (_px) {
        return _px * 100.0 / designWidth + 'vw';
    },
		// px转vh
    px2vh: function (_px) {
        return _px * 100.0 / designHeight + 'vh';
    },

};

export default styleUtil;
```
使用时，单独设置宽高等属性

```js
import styleUtil from "./src/utils/styleUtil.js"

let oDiv = document.createElement('div')
oDiv.style.width = styleUtil.px2vw(300)
oDiv.style.height = styleUtil.px2vh(200)
oDiv.style.margin = styleUtil.px2vh(20)
```

**不过这种使用方式有种弊端，就是屏幕尺寸发生变化后，需要手动刷新一下才能完成自适应调整**


## 关于Echarts图表组件的封装以及自适处理


### 封装
##### 为何要封装？
- 每种图表的option配置都有类似，每次都要在业务代码里重写，十分冗余
- 在同一个项目中，各类图表设计十分相似，甚至是相同，没必要一直做重复工作
- 可能有一些开发者忘记考虑echarts更新数据的特性，以及窗口缩放时的适应问题。这样导致数据更新了echarts视图却没有更新，窗口缩放引起echarts图形变形问题

##### 封装后实现的效果
- 业务数据和样式配置数据分离，我只需要传入业务数据就行了
- 它的大小要完全由使用者决定
- 不会因为缩放出现变形问题，而是能很好地自适应
- 有时候某个图表的样式可能有点不一样，希望能保留自己配置样式的灵活性
- 无论传入什么数据都能正确地更新视图
- 如果我传入的数据为空，能展示一个空状态

##### 封装的建议
- 将所有的图表组件都放在`components/Chart`文件夹中
- 每种图表单独新建一个文件夹,如`components/Chart/PieChart`，`components/Chart/LineChart`等
- 每种图表中都有一个默认的`defaultOption.js`配置文件
- 图表的须有一个`README.md`文件

##### 依赖项
- "echarts": "^5.1.2",
- "element-resize-detector": "^1.2.3",
- "lodash": "^4.17.21",



##### 具体封装，以饼图为例

- PieChart.vue

```html
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
import {pieChartColor} from "./../color.js"

	export default{
		name: "PieChart",
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
				    isEmpty(this.seriesData) || this.seriesData.every((item) => !item.value)
				  );
				},
			},
			
			
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
				
				/* 合并配置项和数据，对于需要自定义的配置项以及数据，使用merge函数将其合并为一个option */
				
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
							legend: { formatter },
							series: [{ data: this.seriesData }],
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

```

##### 图表配置的尺寸自适应

- echarts的字体大小只支持具体数值，不能用百分比或者vw等尺寸，一般字体不会去做自适应，如果需要的话，这里可以对字体写一个自适应的处理函数
- 默认情况下，这里以你的设计稿是1920*1080为例，即网页宽度是1920px (做之前一定问清楚UI设计稿的尺寸）
- 我把这个函数写在一个单独的工具文件`dataUtil.js`里面，在需要的时候调用
- 其原理是计算出当前屏幕宽度和默认设计宽度的比值，将原始的尺寸乘以该值
- 另外，其它echarts的配置项，比如间距、定位、边距也可以用该函数

不过这种使用方式有种弊端，就是屏幕尺寸发生变化后，需要手动刷新一下才能完成字体大小的自适应调整，这和我的图表封装方式有关，如果你不需要手动刷新，请参考下面的教程


> [https://www.cnblogs.com/CZheng7/p/13812426.html](https://www.cnblogs.com/CZheng7/p/13812426.html)




`dataUtil.js`
```js
/* Echarts图表尺寸自适应 */
export const fitChartSize = (size,defalteWidth = 1920) => {
  let clientWidth = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
  if (!clientWidth) return size;
  let scale = (clientWidth / defalteWidth);
  return Number((size*scale).toFixed(3));
}
```

如果你使用的是vue框架，建议将此函数挂载到原型上
`main.js`
```js
import {fitChartSize} from './utils/dataUtil.js'
Vue.prototype.fitChartFont = fitChartSize;
```
这样你可以在`.vue`文件中直接使用`this.fitChartSize()`调用


##### 关于封装的源码说明
- 在源码中，我用到了lodash的一个公共函数merge,用它来合并图表的配置项。后续的来源对象属性会覆盖之前同名的属性
- 另外一个用到的函数isEmpty，当我传入的业务数据为空时，比如空数组[]、undefined、null时，都会被认为这是一个无数据的情况，这时候我们就展示一个空状态的组件，它可能由一张背景图构成；
- 在绑定到具体的DOM元素时，我没有用querySelector选择器去选择一个类或者是用Math.random生成的id，因为这两者都不是绝对可靠的，我直接使用当前vue示例关联的根DOM 元素$el
- 我监听窗口大小的变化，并为这种情况添加对应的事件处理函数--echarts自带的resize方法，使echarts图形不会变形
- 将对应DOM的宽高设为100%，让其大小完全由使用者提供的容器控制
- setOption方法的第二个参数表示传入的新option是否不与之前的旧option进行合并，默认居然是false，即合并。这显然不行，我们需要每次的业务配置都是完全独立的
- 命名非常语义化，一看就懂
- 保留了自己需要单独配置一些定制样式的灵活性，即extraOption
- 将图表字体自适应函数单独解耦，保持灵活性

##### defaultOption.js应该包括哪些内容?
- 正常情况下暴露一个基础配置`basicOption`就可以了
- 如果你需要处理字体和间距大小自适应，请在这里引入`fitChartSize`函数

```js
import {fitChartSize} from "./../src/utils/dataUtil.js"
export const basicOption = {
	title: {
	    text: "某某水果数据",
	    subtext: "来自xx公司",
	    left: "center",
	  },
	  tooltip: {
	    trigger: "item",
	  },
	  legend: {
	    orient: "vertical",
	    left: "left",
			textStyle: {
				color: "RGB(254,66,7)",
				fontSize: fitChartSize(10) //使用字体自适应
			},
	  },
	  series: [
	    {
	      name: "水果购买占比",
	      type: "pie",
	      radius: "50%",
	      emphasis: {
	        itemStyle: {
	          shadowBlur: 10,
	          shadowOffsetX: 0,
	          shadowColor: "rgba(0, 0, 0, 0.5)",
	        },
	      },
	      data: [], // 这里在使用的时候会被业务数据替换
	    },
	  ],
}
```
##### element-resize-detector有何作用？

这是一个用于监听DOM元素尺寸变化的插件。我们已经对窗口缩放做了监听，但是有时候其父级容器的大小也会动态改变的。
我们对父级容器的宽度进行监听，当父级容器的尺寸发生变化时，echart能调用自身的resize方法，保持视图正常。

当然，这个不适用于tab选项卡的情况，在tab选项卡中，父级容器从display:none到有实际的clientWidth，可能会比注册一个resizeDetector先完成，所以等开始监听父级容器resize的时候，可能为时已晚。
解决这个问题，最有效的方法还是在切换选项卡时手动去通过ref获取echart实例，并手动调用resize方法，这是最安全的，也是最有效的。


### 使用
```vue
<template>
  <div class="echart-pie-wrap">
   <pie-chart :series-data="dataList" :extra-option="extraOption"></pie-chart>
  </div>
</template>

<script>
import PieChart from "@/components/Chart/PieChart/PieChart.vue"
export default {
  components: {
    PieChart,
  },
  data() {
    return {
      dataList: [
        {
          name: "西瓜",
          value: 20,
        },
        {
          name: "橘子",
          value: 13,
        },
        {
          name: "杨桃",
          value: 33,
        },
      ],
      extraOption: {
        color: ["#fe883a", "#2d90d1", "#f75981", "#90e2a9"],
				grid: {
					top: this.fitChartSize(30),
					right: this.fitChartSize(10),
					left: this.fitChartSize(20),
					bottom: this.fitChartSize(20)
				},
				textStyle: {
					color: "green",
					fontSize: this.fitChartSize(10) //字体自适应
				},
      },
    };
  },
};
</script>

<style lang="less">
	.echart-pie-wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 20vw;
		height: 20vh;
		margin: 1vw auto;
	}
</style>

```
##### 关于灵活性

上面只是一种封装的思路，面对一些特殊场景可能不适用，大家需要按照自己的业务需求做一些调整


# 参考教程

> [大屏开发中常见问题汇总](https://www.cnblogs.com/CZheng7/p/13681695.html)
 
> [Echarts图表内部尺寸自适应](https://www.cnblogs.com/CZheng7/p/13812426.html)
 
> [如何在vue项目中优雅地封装echarts组件](https://juejin.cn/post/6844904121598738446)
 
> [大屏数据可视化——屏幕适配方案(多分辨率下）](https://blog.csdn.net/Sophie_U/article/details/109582687?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.control)