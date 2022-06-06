import Vue from 'vue'
import * as echarts from 'echarts';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import pubSub from 'pubsub-js'

import App from './App.vue'
import router from './router'
import store from './store'
import './styles/global.scss'
import './assets/fonts/fonts.css'
import * as customUeFunction from '@/common/customUeFunction.js'
import command from '@/common/command.js'
import config from '@/config'
Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.$pubSub = pubSub
Vue.prototype.$command = command
Vue.prototype.$config = config
Vue.prototype.$echarts = echarts

//将自定义ue4函数挂载到window对象上
window.$UE4 = customUeFunction

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
