<template>
  <div class="box">
    <h1>数字运营管理</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "index",
  mounted() {
    //组件内部订阅来自App.vue发布的命令
    this.$pubSub.subscribe('socketMessage', (event, data) => {
      const {command, type, param} = data
      this[command] && this[command]()
    })
  },
  destroyed() {
    this.$pubSub.unsubscribe('socketMessage')
  },
}
</script>

<style scoped lang="scss">
.box {

}
</style>