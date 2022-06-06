
  <template>
    <div id="app" class="cmpt">
      <Header></Header>
      <NavMenu></NavMenu>
      <div class="viewer">
        <transition :name="transitionName">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </template>


<script>
  import Header from "@/components/TheHeader/Header.vue";
  import NavMenu from "@/components/NavMenu/NavMenu.vue";
  import {createSocket} from '@/common/webSocket.js'
	export default {
		name:'App',
    components: {
      NavMenu,
      Header
    },
		data() {
			return {
        transitionName: ''
			}
		},
		mounted() {
			mapmostUE.init()
      createSocket()
      window.addEventListener('onmessageWS', this.publishSocketData)

		},
    destroyed() {
      window.removeEventListener('onmessageWS', this.publishSocketData)

    },
    watch: {
      //使用watch 监听$router的变化
      $route(to, from) {
        if (to.meta.index > from.meta.index) {
          //设置动画名称
          this.transitionName = "slide-left";
        } else {
          this.transitionName = "slide-right";
        }
      },
    },
    methods: {
      publishSocketData(e) {
        const data = e && e.detail.data
				if(!data || data.length < 1 ) {
          return
        }
        if(data === 'ping' || data === 'connect success') {
          return
        }
				let res = JSON.parse(data)
        if(this.$route.name !== res.route) {
          this.$router.push({
            name: res.route
          })
        }
				this.$pubSub.publish('socketMessage', res)
      },
    }
	}
</script>



<style lang="scss" scoped>
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
 // background-color: #0d0d0d;
  overflow: hidden;
}
.viewer {
  width: 100%;
  height: vh(1790);
  //background-color: green;
  overflow: hidden;
  //outline: 2px solid firebrick;
}

</style>

  <style>
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 500ms;
    position: absolute;
  }

  .slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  </style>
