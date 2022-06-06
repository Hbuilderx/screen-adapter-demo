<template>
  <div class="waring-carousel">
    <table>
      <thead>
      <tr>
        <td>序号</td>
        <td>预警类型</td>
        <td>原因</td>
        <td>时间</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in waringData" :key="item.id">
        <td>{{ index + 1 }}</td>
        <td>{{ item.type }}</td>
        <td>{{ item.reason }}</td>
        <td>{{ item.time }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "WarningCarousel",
  data() {
    return {
      waringData: [
        {
          id: 1,
          type: "安防预警",
          reason: "体温异常告警",
          time: "2022-07-10",
        },
        {
          id: 2,
          type: "安防预警",
          reason: "强制开门告警",
          time: "2022-07-10",
        },
        {
          id: 3,
          type: "安防预警",
          reason: "体温异常告警",
          time: "2022-07-10",
        },
        {
          id: 4,
          type: "安防预警",
          reason: "强制开门告警",
          time: "2022-07-10",
        },
        {
          id: 5,
          type: "安防预警",
          reason: "体温异常告警",
          time: "2022-07-10",
        },
        {
          id: 6,
          type: "安防预警",
          reason: "强制开门告警",
          time: "2022-07-10",
        },
        {
          id: 7,
          type: "安防预警",
          reason: "体温异常告警",
          time: "2022-07-10",
        },
        {
          id: 8,
          type: "安防预警",
          reason: "强制开门告警",
          time: "2022-07-10",
        },
        {
          id: 9,
          type: "安防预警",
          reason: "体温异常告警",
          time: "2022-07-10",
        },
        {
          id: 10,
          type: "安防预警",
          reason: "强制开门告警",
          time: "2022-07-10",
        },
        {
          id: 11,
          type: "安防预警",
          reason: "体温异常告警",
          time: "2022-07-10",
        },
        {
          id: 12,
          type: "安防预警",
          reason: "强制开门告警",
          time: "2022-07-10",
        },
      ],
    };
  },
};
</script>
<style scoped lang="scss">
.waring-carousel {
  width: vw(700);
  color: #fff;
  table {
    margin-top: vh(48);
    width: 100%;
    font-size: vh(28);
    border-collapse: collapse;
    border: none;
    thead {
      background: rgba(10, 24, 38, .8);
      tr {
        line-height: vh(72);
        td {
          margin: 0;
        }
      }
    }
    tbody {
      tr:hover {
        background: rgba(236, 124, 89, 0.15);
        border-left: vw(8) solid rgba(236, 124, 89, 1);
        box-sizing: border-box;
        cursor: pointer;
      }
      tr {
        line-height: vh(66);
        border-left: vw(8) solid transparent;
      }
    }
  }
}
</style>
