<template>
  <div class="building">
      <div class="right-panel">
        <BuildingPanel></BuildingPanel>
      </div>
      <div class="bottom-bg"></div>
      <div class="bottom-menu">
        <!--    外部子菜单S    -->
        <div class="outer-menu roma" :class="currentMenuIndex === 0 ? 'show' : '' ">
        <!--   <button @click="startMapRoam()">漫游</button>-->
          <div
            class="menu"
            v-for="(item, index) in roamData"
            :key="index"
            @click="startMapRoam(index)"
          >
            <div class="icon"></div>
            <div class="name">{{item.name}}</div>
          </div>

        </div>
        <div class="outer-menu time" :class="currentMenuIndex === 1 ? 'show' : '' ">
          <div
              class="menu"
              v-for="(item, index) in timeData"
              :key="item.value"
              @click="switchTime(item)"
          >
            <div class="icon"></div>
            <div class="name">{{item.title}}</div>
          </div>
        </div>
        <div class="outer-menu weather" :class="currentMenuIndex === 2 ? 'show' : '' ">
          <div
              class="menu"
              v-for="(item, index) in weatherData"
              :key="item.value"
              @click="switchWeather(item)"
          >
            <div class="icon"></div>
            <div class="name">{{item.title}}</div>
          </div>
        </div>
        <div class="outer-menu season" :class="currentMenuIndex === 3 ? 'show' : '' ">
          <div
              class="menu"
              v-for="(item, index) in seasonData"
              :key="item.value"
              @click="switchSeason(item)"
          >
            <div class="icon"></div>
            <div class="name">{{item.title}}</div>
          </div>
        </div>
        <!--    外部子菜单E    -->

        <!--     内部主菜单S   -->
        <div class="inner-menu">
          <div
              class="menu roma"
              :class="currentMenuIndex === 0 ? 'active' : '' "
              @click="onMenuSelect(0, 'roma')"
          >
            <img src="./images/icon_roam.png" class="icon" alt="">
            <span class="name">漫游</span>
          </div>
          <div
              class="menu time"
              :class="currentMenuIndex === 1 ? 'active' : '' "
              @click="onMenuSelect(1, 'time')"
          >
            <img src="./images/icon_diurnalchange.png" class="icon" alt="">
            <span class="name">昼夜</span>
          </div>
          <div
              class="menu weather"
              :class="currentMenuIndex === 2 ? 'active' : '' "
              @click="onMenuSelect(2, 'weather')"
          >
            <img src="./images/icon_weather.png" class="icon" alt="">
            <span class="name">天气</span>
          </div>
          <div
              class="menu season"
              :class="currentMenuIndex === 3 ? 'active' : '' "
              @click="onMenuSelect(3, 'season')"
          >
            <img src="./images/icon_seasons.png" class="icon" alt="">
            <span class="name">季节</span>
          </div>
        </div>
        <!--     内部主菜单E   -->
      </div>
  </div>
</template>

<script>
import BuildingPanel from './BuildingPanel'
import {weatherData,seasonData,timeData,roamData,menuData} from './staticData.js'
export default {
  name: "Building",
  components: {
    BuildingPanel
  },
  data() {
    return {
      weatherData,
      seasonData,
      timeData,
      roamData,
      menuData,
      currentMenuIndex: -1
    }
  },
  mounted() {
    mapmostUE.setCompassVisibility(false);
    this.$pubSub.subscribe('socketMessage', (event, data) => {
      const {command, type, param} = data
      if(param) {
        this[command] && this[command]({...param})
      }else {
        this[command] && this[command]()
      }

    })
  },
  destroyed() {
    this.reset()
  },
  methods: {

    //复原场景
    reset() {
      mapmostUE.stopMapRoam()
      $UE4.changeWeather({Type: 'Spring'})
      $UE4.changeSeason({Type: 'Sunlight'})
      $UE4.changeTime({Type: '早上'})
    },


    //底部菜单切换
    onMenuSelect(index, menu) {
      if(index === this.currentMenuIndex){
        return
      }
      this.currentMenuIndex = index
      this.reset()
    },

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
    //漫游，为了方便遥控，不直接传递路线数据，为了方便遥控，传递路线的索引就行
    startMapRoam(index) {
      mapmostUE.stopMapRoam()
      mapmostUE.startMapRoam(this.roamData[index].data, (index) => {})
    }

  },


}
</script>

<style scoped lang="scss">
  .building {
    position: relative;
    width: 100%;
    height: 100%;
    .right-panel {
      position: absolute;
      right: 0;
      z-index: 335;
    }
    .bottom-bg {
      width: 100%;
      height: vh(400);
      background: linear-gradient(0deg, rgba(0, 12, 19, 0.9) 0%, rgba(0, 12, 19, 0) 100%);
      position: absolute;
      bottom: 0;
    }

    .bottom-menu {
      width: vw(1800);
      height: vh(200);
      position: absolute;
      bottom: 10px;
      left: vw(1100);
     // border: 1px solid green;

      //内部主菜单S
      .inner-menu {
        position: absolute;
        width: 100%;
        height: 50%;
        background-image: url("images/bg01.png");
        background-size: 100% 100%;
        z-index: 9;
        bottom: 0;
       // outline: 1px solid red;
        .menu {
          width: vw(160);
          height: vh(64);
          background-image: url("images/box_normat.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          cursor: pointer;
          .icon {
            width: vw(40);
            height: vh(32);
          }
          .name {
            font-size: vh(32);
            color: #fff;
            text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.3);
            font-weight: 500;
          }

          &.roma{
            left: vw(479);
          }
          &.time {
            left: vw(712);
            top: vh(-18);
          }
          &.weather {
            left: vw(940);
            top: vh(-18);
          }

          &.season {
            left: vw(1168);
          }
          &.active {
            background-image: url("images/box_selected.png");
          }
        }
      }
      //内部主菜单E

      //外部子菜单S
      .outer-menu {
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: url("images/bg02.png");
        background-size: 100% 100%;
        transition: all .2s;
        transform: translateY(100%);
       // border: 1px solid blue;
        &.show{
          transform: translateY(0);
        }
        .menu {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: vw(100);
          flex-wrap: wrap;
          cursor: pointer;
         //  border: 1px solid red;
          &:nth-of-type(1) {
            left: vw(473);
            top: vh(27);
          }
          &:nth-of-type(2) {
            left: vw(742);
            top: vh(12);
          }
          &:nth-of-type(3) {
            left: vw(1006);
            top: vh(12);
          }
          &:nth-of-type(4) {
            left: vw(1273);
            top: vh(30);
          }
          .icon {
            width: vw(20);
            height: vw(20);
            background: linear-gradient(0deg, #47FCEB, #47C3FC);
            border-radius: 50%;
            &.active {
              //background: red;
            }
          }
          .name {
            font-size: vh(28);
            color: #fff;
            font-weight: 300;
            width: 100%;
          }
        }

        &.season {
          //transform: translateY(0);
        }
      }
      //外部子菜单E


      button {
        font-size: vh(28);
        display: inline-block;
        margin: vh(10);
      }
    }

  }


</style>
