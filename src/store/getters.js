const getters = {

  device: state => state.app.device,
  token: state => state.user.token,
  currentDay: state => state.app.currentDay,
  showRightMenu: state => state.app.showRightMenu,
  showControlDatePicker: state => state.app.showControlDatePicker,
  showControlPOI: state => state.app.showControlPOI,
  showControlReset: state => state.app.showControlReset,
  showControlImage: state => state.app.showControlImage,
  showControlMeasure: state => state.app.showControlMeasure,
  showLeftMenu: state => state.app.showLeftMenu,
  showControlFencing: state => state.app.showControlFencing
}
export default getters
