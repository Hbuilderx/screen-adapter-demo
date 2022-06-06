<template>
  <div class="nav-menu">
    <div class="menu" v-for="(item, index) in routeData" :key="item.name">
      <router-link
        :to="{name: item.children[0].name}"
        tag="div"
        class="menu-icon normal"
      >
      </router-link>

      <div class="menu-list">
        <div class="menu-list-title" >
            <router-link :to="{name: item.name}" tag="div">{{item.meta.title}}</router-link>
        </div>
        <div class="menu-list-menu">
          <div
              class="menu-list-menu-item"
              :style="{marginLeft:  styleUtil.px2vh(num*20) }"
              v-for="(child, num) in item.children" :key="child.name"
          >
              <router-link :to="{name: child.name}" tag="div">{{child.meta.title}}</router-link>

          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import styleUtil from '@/utils/styleUtil.js'
import {showRoutes} from '@/router/index'
export default {
  name: "NavMenu",
  data() {
    return {
      routeData: showRoutes,
      styleUtil
    }
  },
}
</script>

<style scoped lang="scss">
.nav-menu {
  min-width: vw(200);
  min-height: vh(200);
  position: absolute;
  left: vw(60);
  top: vh(450);
  z-index: 999;
  .menu {
    height: vh(120);
    width: 100%;
    margin-bottom: vh(80);
    position: relative;
    cursor: pointer;
    &:hover .menu-list{
      display: block;
      transition: all .2s;
      z-index: 44;
    }

    //注意：这里的nth-of-type(n)表示.menu本身, 而不是.menu-icon
    &:nth-of-type(1){
      .normal {
        background-image: url("images/menu_全局总览_normat.png");
      }
      &:hover .menu-icon{
        background-image: url("images/menu_全局总览_selected.png");
        z-index: 55;
      }

      .menu-icon {
        &.router-link-exact-active,
        &.router-active-class {
          background-image: url("images/menu_全局总览_selected.png");
        }
      }
    }
    &:nth-of-type(2){
      .normal {
        background-image: url("images/menu_数字运营管理_normat.png");
      }
      &:hover .menu-icon{
        background-image: url("images/menu_数字运营管理_selected.png");
        z-index: 55;
      }
      .menu-icon {
        &.router-link-exact-active,
        &.router-active-class {
          background-image: url("images/menu_数字运营管理_selected.png");
        }
      }

    }
    &:nth-of-type(3){
      .normal {
        background-image: url("images/menu_数字产业发展_normat.png");
      }
      &:hover .menu-icon{
        background-image: url("images/menu_数字产业发展_normat.png");
        z-index: 55;
      }
      .menu-icon {
        &.router-link-exact-active,
        &.router-active-class {
          background-image: url("images/menu_数字产业发展_selected.png");
        }
      }

    }

    //图标
    .menu-icon {
      position: absolute;
      left: 0;
      height: 120px;
      width: 120px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      z-index: 33;
      transition: all .2s;

    }

    //菜单列表
    .menu-list {
      position: absolute;
      left: vw(120);
      top: vh(25);
      display: none;
      min-width: vw(308);
      min-height: vh(300);
      transition: all .2s;
      .menu-list-title {
        font-size: vh(36);
        text-decoration: none;
        color: #fff;
        font-weight: 400;
        width: vw(328);
        height: vh(64);
        background-image: url("images/box_menu01.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        position: absolute;
        left: vw(-60);
        line-height: vh(64);
        text-align: center;
        cursor: pointer;
      }

      .menu-list-menu {
        position: absolute;
        top: vh(80);
        width: 100%;
        .menu-list-menu-item {
          width: vw(240);
          height: vh(48);
          font-size: vh(28);
          line-height: vh(48);
          color: #fff;
          background-image: url("images/box_menu02.png");
          background-size: 100% 100%;
          margin-bottom: vh(5);
          text-align: left;
          box-sizing: border-box;
          padding-left: vh(25);
          cursor: pointer;
        }
      }
    }
  }
}
</style>