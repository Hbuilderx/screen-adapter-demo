<template>
  <div class="air">
    <div class="type">PM2.5</div>
    <div class="value">50</div>
  </div>
</template>

<script>
export default {
  name: "Air"
}
</script>

<style scoped lang="scss">
.air {
  display: flex;
  flex-wrap: wrap;
  color: #fff;
  width: 75px;
  justify-content: center;
  height: vh(100);
  align-items: center;
  padding-left: 90px;
  .type {
    font-size: vh(28);
    text-align: center;
  }
  .value {
    font-size: vh(40);
    text-align: center;
  }
}

</style>