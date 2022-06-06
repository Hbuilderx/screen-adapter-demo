<template>
  <div class="box">

    <div class="left-list">
        <div class="index-item" v-for="(item, index) in indicesData" :key="index">
          <img :src="item.icon" alt="" class="icon">
          <div class="con">
            <div class="value"> {{item.value}}</div>
            <div class="name-unit">
              {{item.name}}  {{item.unit}}
            </div>
          </div>
        </div>
    </div>
    <div class="right-panel">
      <div class="card person">
        <div class="title">
          <div class="con">
            人员信息总览
          </div>
        </div>
        <PersonChart></PersonChart>
      </div>
      <div class="card assets">
        <div class="title">
          <div class="con">
            资产分类
          </div>
        </div>

        <div class="assets-list">
          <div class="assets-item" v-for="(item, index) in assetsData" :key="item.value">
            <img class="icon" :src="item.icon" alt=""/>
            <div class="name-unit">
             {{item.name}}/{{item.unit}}
            </div>
            <div class="value">
              {{item.value}}
            </div>
          </div>

        </div>


      </div>
      <div class="card alarm-slide">
        <div class="title">
          <div class="con">
            预警轮播
          </div>
        </div>
        <WarningCarousel></WarningCarousel>

      </div>
      <div class="card alarm-type">
        <div class="title">
          <div class="con">
            智能预警
          </div>
        </div>
        <WarningChart></WarningChart>
      </div>

      <div class="card car">
        <div class="title">
          <div class="con">
            车辆出入统计分析
          </div>
        </div>
        <VehicleChart></VehicleChart>
      </div>

    </div>

  </div>
</template>

<script>
import PersonChart from './children/PersonChart'
import VehicleChart from './children/VehicleChart'
import WarningCarousel from './children/WarningCarousel'
import WarningChart from './children/WarningChart'
export default {
  name: "leftCharts",
  components:{
    PersonChart,
    VehicleChart,
    WarningCarousel,
    WarningChart
  },
  data() {
    return {
      assetsData: [
        {
          icon: require('./images/icon_room.png'),
          name: '房间',
          unit: '间',
          value: 105
        },
        {
          icon: require('./images/icon_architecture.png'),
          name: '建筑面积',
          unit: 'm2',
          value: 1359800
        },
        {
          icon: require('./images/icon_renting.png'),
          name: '可租面积',
          unit: 'm2',
          value: 2565
        },
        {
          icon: require('./images/icon_equipment.png'),
          name: '机器设备',
          unit: '台',
          value: 122
        },
        {
          icon: require('./images/icon_electron.png'),
          name: '电子设备',
          unit: '台',
          value: 104
        },
        {
          icon: require('./images/icon_property.png'),
          name: '无形资产',
          unit: '个',
          value: 56
        }
      ],
      indicesData:[
        {
          icon: require('./images/icon_area.png'),
          name: '占地面积',
          unit: '(m2)',
          value: 108200
        },
        {
          icon: require('./images/icon_enterprise.png'),
          name: '入驻企业',
          unit: '(家)',
          value: 11
        },
        {
          icon: require('./images/icon_outputvalue.png'),
          name: '累计产值',
          unit: '(万元)',
          value: 2464
        },
        {
          icon: require('./images/icon_carport.png'),
          name: '车位',
          unit: '(个)',
          value: 1023
        }
      ]
    }
  },
  methods:{
    //初始化资产分类
    initAssets() {

    }
  }
}
</script>

<style scoped lang="scss">
  .box {

  }
  .left-list {
    float: left;
    margin-right: vw(40);
    .index-item {
      width: vw(380);
      height: vh(140);
      background-image: url("./images/bg_box.png");
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .icon {
        display: inline-block;
        margin-left: vw(8);
      }
      .con {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        width: vw(250);
        .value {
          font-size: vh(64);
          font-weight: bold;
          color: #47FCEB;
          width: 100%;
          font-family: digital;
        }
        .name-unit {
          font-size: vh(28);
          font-weight: 300;
          color: #fff;
        }
      }
    }
  }
  .right-panel {
    width: vw(1600);
    float: left;
    .person {
      float: left;
      margin-right: vw(10);
      margin-bottom: vh(10);
    }
    .assets {
      float: left;
      margin-bottom: vh(10);
      .assets-list {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-evenly;
        margin-top: vh(45);
        .assets-item {
          min-width: vw(200);
          margin-bottom: vh(20);
          .icon {
            width: vh(64);
            height: vh(64);
            margin-bottom: vh(22);
          }
          .name-unit {
            font-size: vh(24);
            color: #E8F7FF;
            line-height: vh(35);
            text-align: center;
          }
          .value {
            font-size: vh(40);
            font-weight: bold;
            color: #00E6FF;
            background: linear-gradient(0deg, #FFFFFF 0%, #B2E6FF 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
    }
    .alarm-slide {
      height: vh(1130);
      float: left;
      margin-right: vw(10);
      margin-bottom: vh(10);
    }
    .alarm-type {
      height: vh(560);
      float: left;
      margin-bottom: vh(10);
    }
    .car {
      float: left;
      margin-bottom: vh(10);
    }

  }

  //通用卡片，不要嵌套
  .card {
    width: vw(780);
    min-height: vh(560);
    box-sizing: border-box;
    background-color: rgba(0, 12, 19, .8);
    border: 1px solid rgba(0,0,0,0);
    padding-left: vw(25);
    padding-right: vw(25);
    border-radius: vw(8);
    .title {
      border-bottom: 2px solid rgba(255,255,255,.3) ;
      padding-bottom: vh(15);
      padding-top: vh(15);
      position: relative;
      &::after {
        content: '';
        position: absolute;
        border: 1px solid rgba(255,255,255,.15);
        width: 100%;
        left: 0;
        bottom: vh(-10);
      }
      .con {
        width: fit-content;
        margin: 0 auto;
        font-size: vh(40);
        font-weight: 400;
        color: #FFFFFF;
        text-align: center;
        position: relative;

        &::before {
          content: '';
          position: absolute;
          width: vh(32);
          height: vh(32);
          background-image: url("./images/title_decorate.png");
          background-size: 100% 100%;
          left: vw(-50);
          top: vh(8);
        }
        &::after {
          content: '';
          position: absolute;
          width: vh(32);
          height: vh(32);
          background-image: url("./images/title_decorate.png");
          background-size: 100% 100%;
          right: vw(-50);
          top: vh(8);
        }
      }

    }
  }


</style>
