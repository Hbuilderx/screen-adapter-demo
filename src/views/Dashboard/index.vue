<template>
  <div class="box">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "index",
	mounted() {
		// this.$pubSub.subscribe('socketMessage', (event, data) => {
    //   const {command, type, param} = data
    //   if(param) {
    //     this[command] && this[command]({...param})
    //   }else {
    //     this[command] && this[command]()
    //   }
		// })
	},
	destroyed() {
		//this.$pubSub.unsubscribe('socketMessage')
	},
  methods: {

    //切换天气
    switchWeather(data){
      const {value} = data
      $UE4.changeWeather({Type: value})
    },
    //切换季节
    switchSeason(data){
      const {value} = data
      $UE4.changeSeason({Type: value})
    },
    //切换季节
    switchTime(data){
      const {value} = data
      $UE4.changeTime({Type: value})
    },

    //缩放
    zoom(data) {
      const {distance} = data
      mapmostUE.zoom(distance)
    },
    //相机旋转
    turnRight(data) {
      const {degree} = data
      mapmostUE.turnRight(degree)
    }
  }
}
</script>

<style scoped lang="scss">
  .box {
    height: 100%;
    width: 100%;
  }
</style>
