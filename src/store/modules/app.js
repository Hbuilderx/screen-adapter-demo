

const state = {

  device: 'desktop',
  enterAddservice:0,
  backRoute:{
    isBack:false,
    backPath:'',
    timeStamp:'',
  },
  currentDay: '', //当前选择的日期
  showRightMenu: true, //是否显示右侧菜单
  showControlDatePicker: false, //是否显示日期选择器控制按钮
  showControlPOI: true, //是否显示POI控制按钮
  showControlReset: true, //是否视角复位按钮
  showControlImage: true, //是否显示影像开关按钮
  showControlMeasure: true, //是否显示测量开关按钮
  showControlFencing: true, //是否显示控制地理围栏的按钮
  showLeftMenu: true, //是否显示左侧菜单
  floorData: [], //楼层信息

}


const mutations = {
  //通过日历改变当天的事件
  CHANGE_CURRENT_DAY: (state, payload) => {
    state.currentDay = payload
   // console.log(state.currentDay)
  },
  
  //更改右侧菜单的显隐控制状态
  CHANGE_SHOW_RIGHT_MENU: (state, flag) => {
    state.showRightMenu = flag
  },
  //更改左侧菜单的显隐控制状态
  CHANGE_SHOW_LEFT_MENU: (state, flag) => {
    state.showLeftMenu = flag
  },
  
  //更改日历的显隐控制状态
  CHANGE_SHOW_CONTROL_DATE_PICKER: (state, flag) => {
    state.showControlDatePicker = flag
  },
  //更改控制POI按钮的显隐状态
  CHANGE_SHOW_CONTROL_POI: (state,flag) => {
    state.showControlPOI = flag
  },
  //更改控制视角复位按钮的显隐状态
  CHANGE_SHOW_CONTROL_RESET: (state, flag) => {
    state.showControlReset = flag
  },
  //更改控制影像按钮的显隐状态
  CHANGE_SHOW_CONTROL_IMAGE: (state, flag) => {
    state.showControlImage = flag
  },
  //更改控制测量按钮的显隐状态
  CHANGE_SHOW_CONTROL_MEASURE: (state, flag) => {
    state.showControlMeasure = flag
  },
  
  //更改控制地理围栏按钮的显隐状态
  CHANGE_SHOW_CONTROL_FENCING:(state, flag) => {
    state.showControlFencing = flag
  },
  
  //设置分层分户的楼层数据
  SET_FLOOR_DATA: (state, payload) => {
    state.floorData = payload
  },
  
  
  
  
  

  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },

  SET_ENTER_ADDSERVER_PAGE_TIMERS:(state, path)=>{
    if(path){
      state.enterAddservice += 1
    }else{
      state.enterAddservice = 0
    }
  }
}

const actions = {
  togglescroll({commit}){
    commit("TOGGLE_SCROOL")
  },
  toggleSideBar({
    commit
  }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({commit},{withoutAnimation}) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({
    commit
  }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,

}
