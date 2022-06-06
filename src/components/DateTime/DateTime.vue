<template>
  	<div class="date-time">
  			<div class="date" >{{currentDate}}</div>
  			<div class="time"> {{ currentTime}}</div>
  	</div>
</template>

<script>
  export default {
    name: 'DateTime',
    data() {
      return {
        currentTime: '',
        currentDate: '',
        currentWeek:'',
        timer: null,
      }
    },
    
    beforeDestroy() {
    	this.timer && clearInterval(this.timer)   
    },
    
    mounted() {
      let _this = this;
      this.timer = setInterval(() => {
      	_this.getCurrentDateTime()
      }, 1000)
    },
    methods:{
      
      _formatWeek(day) {
      	const dayWeekMap = {
      		"1":"星期一",
      		"2":"星期二",
      		"3":"星期三",
      		"4":"星期四",
      		"5":"星期五",
      		"6":"星期六",
      		"7":"星期日"
      	}
      	
      	return dayWeekMap[day]
      },
      
      getCurrentDateTime() {
      	const _this = this
      	//时间数字小于10，则在之前加个“0”补位。
      	function check(i) {
      		var num;
      		i < 10 ? num = "0" + i : num = i;
         // i < 10 ? num =  i : num = i;
      		return num;
      	}
      
      	let time = new Date();
      	let year = time.getFullYear();
      	let month = time.getMonth() + 1; //getMonth()获取的是0-11月份，要+1
      	let day = time.getDate();
      	let nowDayOfWeek = time.getDay(); //今天本周的第几天
      
      	//获取时分秒
      	let h = time.getHours();
      	let m = time.getMinutes();
      	let s = time.getSeconds();
      
      	//检查是否小于10
      	h = check(h);
      	m = check(m);
      	s = check(s);
      
      	this.currentDate = `${year}-${month}-${check(day)}`
      	this.currentTime = `${h}:${m}:${s}`
      	this.currentWeek =  _this._formatWeek(nowDayOfWeek)
      },
    }
  }
</script>

<style scoped lang="scss">
  .date-time {
  	color: #fff;
  	box-sizing: border-box;
  	font-family: DinRegular;
    height: vh(100);
    border-right: 2px solid rgba(255,255,255,.4);
    padding-right: vw(64);

    .date {
      width: vw(180);
      font-size: vh(28);
      text-align: center;
    }
    .time {
      width: vw(180);
      font-size: vh(40);
      text-align: center;
    }
  }

</style>