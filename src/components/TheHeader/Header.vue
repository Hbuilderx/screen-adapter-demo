<template>
	<div class="header">

    <div class="title">
      数字大厦数字孪生可视化平台
    </div>

		<div class="bg"></div>
		<div class="tools">
      
      <div class="date-box">
        <DateTime></DateTime>
      </div>
      <div class="weather-box">
        <Weather></Weather>
      </div>
      <div class="air-box">
        <Air></Air>
      </div>

		</div>
	</div>
</template>

<script>
import DateTime from '../DateTime/DateTime.vue'
import Weather from '../Weather/Weather.vue'
import Air from '../Air/Air.vue'
	export default {
		name: "TheHeader",
    components:{
      DateTime,
      Weather,
      Air
    },
		data() {
			return {
				currentRouteIndex: 1,
			}
		},

		methods: {

		}
	}
</script>

<style scoped="scoped" lang="scss">
	.header {
		width: 100%;
		height: vh(184);
		position: relative;
		margin: 0;
    font-family: "microsoft yahei";
    .bg {
      width: vw(4370);
      height: 100%;
      position: absolute;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url("images/bg_top.png");
     // background-color: #000;
    }
    .title {
      font-size: vh(68);
      position: absolute;
      z-index: 33;
      color: #fff;
      left: vw(100);
      top: vh(50);
      font-weight: 600;
      font-style: italic;
    }
		.tools {
			width: vw(800);
			height: 100%;
			position: absolute;
      //border: 1px solid red;

      right: 0;
      display: flex;
      align-items: center;
      .date-box {

      }
      
      .weather-box {

      }

		}
	}
</style>
