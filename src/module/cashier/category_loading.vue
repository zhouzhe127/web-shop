/*
 * @Author: zhengu.jiang 
 * @Date: 2018-06-15 15:44:43 
 * @Module: {请求加载loading} 
 */

<template>
	<div id="loading">
		<div class="test_loading">
			<div class="textload" v-if="!isOver">正在为您拼命检索中...(1/2)</div>
			<div class="textload" v-else>检索已完成，正在为您绘制报表...(2/2)</div>
			<div class="container">
				<div class="bar" :style="{'width': load}"></div>
				<div class="num">{{load}}</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			load: '0%',
			timer: null,
			isOver: false,
			count: 1,
		};
	},
	props: ['taskCountTotal','taskCount','totalCount'],
	watch: {
		taskCount: function(){
			this.init();
		}
	},
	methods: {
		init(){
			if(this.taskCount === false){
				this.isOver = true;
				this.load = '0%';
				let time = parseInt(this.totalCount/2);
				this.count = 1;
				this.timer = setInterval(this.run,time/60*1000);
			}else{
				if(this.taskCountTotal){
					this.load = parseInt((1-this.taskCount/this.taskCountTotal) *100) + '%';
				}
			}
		},
		run(){
			this.load = (this.count++) + '%';
			if(this.count == 99){
				clearInterval(this.timer);
			}
		}
	},
	destroyed() {
		clearInterval(this.timer);
	}
};
</script>
<style type="text/css" scoped>
#loading .test_loading {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	background-color: rgba(0,0,0,0.8)
}

#loading .container {
	margin: 0 auto;
	width: 450px;
	border: 1px solid #707070;
	height: 5px;
	border-radius: 2px;
	position: relative;
}
#loading .num{
	position: absolute;
	right: -70px;
	color: #fff;
	font-size: 26px;
	line-height: 8px;
}
#loading .container .bar{
	background: #fff;
	float: left;
	height: 100%;
	text-align: center;
	line-height: 150%;
}
#loading .textload {
	width: 100%;
	text-align: center;
	font-size: 24px;
	margin-top: 300px;
	margin-bottom: 30px;
	color: #fff;
}

</style>