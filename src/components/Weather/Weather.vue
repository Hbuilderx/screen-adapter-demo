<template>
  <div class="weather">
  	<img :src="weatherIcon.length>0?weatherIcon:''">
  	<span>{{weatherTemp}}℃</span>
  </div>
</template>

<script>
  const path = require('path')
  //批量加载天气预报图标
  const files = require.context('./wheather-icon', true, /.png$/)
  const modules = {}
  files.keys().forEach(key => {
  	//console.log(key)
  	const name = path.basename(key, '.png')
  	modules[name] = files(key).default || files(key)
  })
  
  
  export default {
    name: 'Weather',
    data() {
      return {
        imgModules: {},
        weatherIcon: '',
        weatherTemp: '33',
        weatherTimer: null,
        weatherStatus: '晴',
      }
    },
    mounted() {
      let _this = this
      this.getWeather()
      
      this.weatherTimer = setInterval(() => {
      	_this.getWeather()
      }, 1000 * 60 * 30)
      
      //console.log(modules)
      this.imgModules = modules;
    },
    
    beforeDestroy() {
    	this.timer && clearInterval(this.timer)
    	this.weatherTimer && clearInterval(this.wheatherTimer)
    
    },
    
    methods:{
      getWeather() {
      	let _this = this;
      	//https://dev.qweather.com/docs/api/weather/weather-now/
      	//https://devapi.qweather.com/v7/weather/now?location=120.727517,31.298628&key=483195553ee44788ad351b62a14d759c
      	fetch(
      			'https://devapi.qweather.com/v7/weather/now?location=120.608429,31.190704&key=483195553ee44788ad351b62a14d759c')
      		.then(function (response) {
      			return response.json();
      		})
      		.then(function (myJson) {
      			const {
      				icon,
      				temp,
      				text
      			} = myJson.now;
      			_this.weatherIcon = modules[icon];
      			_this.weatherTemp = temp;
      			_this.weatherStatus = text
      		});
      }
    }
  }
</script>

<style scoped lang="scss">
.weather {
  padding-right: vw(49);
  padding-left: vw(53);
  border-right: 2px solid rgba(255,255,255,.4);
  height: vh(100);
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: vw(60);
    height: vh(60);
    margin-right: vw(10);
  }

  span {
    font-size: vh(40);
    color: #fff;
    font-weight: 500;
  }
}
</style>