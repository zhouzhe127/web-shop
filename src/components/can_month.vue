<!-- 指定时段-每月组件 -->
<template>
	<div class="calsnder-month chairFix">
		<div class="inp chairFix" style="float: left;">
			<section class="chairFix" @click="showMonth">
				<div class="showDate">{{showdate}}</div>
				<div>
					<i></i>
				</div>
			</section>
			<div v-if="showKuang" class="chooseMonth chairFix">
				<div class="chairFix">
					<div class="chooseKusi" v-for="i in dateList" :class="{'active': chooseDate.indexOf(i)!=-1}" :key="i" @click="selectMonth(i)">{{i}}</div>
				</div>
				<div class="monthBtn chairFix" style="width: 100%;height: 26px;margin-top: 5px;">
					<span @click="allChoose('1')">全选</span>
					<span @click="allChoose('2')">清空</span>
					<span @click="allChoose('3')">确定</span>
				</div>
			</div>
		</div>
		<div class="timeSlot chairFix" style="float: left;margin-left: 10px;">
			<div class="show chairFix">
				<span @click="chooseStart">{{startslot}}</span>
				<span>-</span>
				<span @click="chooseEnd">{{endslot}}</span>
			</div>
			<div class="chooseTime" v-if="showChoose">
				<div class="chairFix hourOrMinute">
					<span>时</span>
					<div class="timeDrag" id='timeDrag'>
						<div id="dragTiao1" class="dragTiao"></div>
						<div class="dragKuai" :style="{left: hourStyle + 'px'}" @mousedown="drag($event,true)">
							<span>{{hour}}</span>
						</div>
					</div>
				</div>
				<div class="chairFix hourOrMinute">
					<span>分</span>
					<div class="timeDrag">
						<div class="dragTiao"></div>
						<div class="dragKuai" :style="{left: minuteStyle + 'px'}" @mousedown="drag($event,false)">
							<span>{{minute}}</span>
						</div>
					</div>
				</div>
				<div @click="startOrEnd" style="height: 41px;background: #29abe2;line-height: 41px;border-top: 1px #ccc solid;text-align: center;color: #fff;cursor: pointer;">完成</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import store from "src/manager/store";

	export default {
		props: ['start', 'end', 'month'],
		data() {
			return {
				showKuang: false,
				hour: '00',
				minute: '00',
				hourStyle: 0,
				minuteStyle: 0,
				showChoose: false,
				startTime: true,
				dayToDay: '',
				x: true,
				startslot:'00:00',
				endslot: '00:00',
				dateList:0,
				showdate:'请选择日期',
				chooseDate:[]
			}
		},
		watch:{
			startslot:function(){
				this.$emit('castTime',this.startslot,this.endslot,this.chooseDate);
			},
			endslot:function(){
				this.$emit('castTime',this.startslot,this.endslot,this.chooseDate);
			},
			chooseDate:function(){
				this.$emit('castTime',this.startslot,this.endslot,this.chooseDate);
			}
		},
		methods: {                                                                            
			allChoose: function(type) {
				if(type == '1') { 
					this.chooseDate.splice(0,this.chooseDate.length);
					for(var i=0; i<this.dateList;i++) {
						this.chooseDate.push(i+1);
					}
				}
				if(type == '2') {
					this.chooseDate.splice(0,this.chooseDate.length)
				}
				if(type == '3') {
					var str = '';
					var arr = [];
					var copyArr = [];
					var arr2 = [];
					var arr3 = [];
					var previous = 0;
					this.chooseDate.sort((a,b)=>{return a>b? 1:-1})
					copyArr = this.chooseDate.map(function(a){return a+"日"})
					str = copyArr.join(",");
					if(str == '') {
						this.showdate = '请选择日期'
					} else {
						this.showdate = str;
					}
					this.showKuang = false;
				}

			},
			selectMonth: function(i) {
				if(this.chooseDate.indexOf(i)!=-1){
					this.chooseDate.splice(this.chooseDate.indexOf(i),1)
				}else{
					this.chooseDate.push(i)
				}
			},
			showMonth: function() {
				this.showKuang = !this.showKuang;
			},
			init: function() {
				if(this.startTime) {
					this.startslot = (this.startslot == '' ? '00:00' : this.startslot);
					var startArr = this.startslot.split(':');
					this.hour = startArr[0];
					this.minute = startArr[1];
					this.hourStyle = 136 / 23 * this.hour;
					this.minuteStyle = 136 / 59 * this.minute;
				} else {
					this.endslot = (this.endslot == '' ? '00:00' : this.endslot);
					var startArr = this.endslot.split(':');
					this.hour = startArr[0];
					this.minute = startArr[1];
					this.hourStyle = 136 / 23 * this.hour;
					this.minuteStyle = 136 / 59 * this.minute;
				}
			},
			selected: function(i) {
				this.week[i] = !this.week[i];
			},
			drag: function(e, type) {
				var weeken = this;
				var _this = e.target;
				var tiao = e.target.previousElementSibling.offsetParent;
				var x = e.clientX,
					left = this.offset(_this),
					tiaoLeft = this.offset(tiao),
					disX = x - left;

				document.onmousemove = function(e) {
					var xx = e.clientX;
					var ydx = xx - x;
					if(_this.offsetLeft < 0) {
						_this.style.left = 0 + 'px';
						if(type) {
							weeken.hour = '00';
						} else {
							weeken.minute == '00';
						}

						document.onmousemove = null;
						return;
					}

					if(_this.offsetLeft > 136) {
						_this.style.left = 136 + 'px';
						if(type) {
							weeken.hour = '23';
						} else {
							weeken.minute == '59';
						}
						document.onmousemove = null;
						return;
					}
					if(type) {
						weeken.hour = Math.round((_this.offsetLeft) / 136 * 23);
					} else {
						weeken.minute = Math.round((_this.offsetLeft) / 136 * 59);
					}

					if(type) {
						if(weeken.hour < 10) {
							weeken.hour = "0" + weeken.hour;
						}
					} else {
						if(weeken.minute < 10) {
							weeken.minute = "0" + weeken.minute;
						}
					}
					if(type) {
						weeken.hourStyle = ydx + left - tiaoLeft;
					} else {
						weeken.minuteStyle = ydx + left - tiaoLeft;
					}

					if(weeken.startTime) {
						weeken.startslot = weeken.hour + ':' + weeken.minute;
					} else {
						weeken.endslot = weeken.hour + ':' + weeken.minute;
					}

					return false;

				}
				document.onmouseup = function(e) {
					document.onmousemove = null;
					_this.onmousemove = null;
				}
			},
			offset: function(obj) {
				var left = 0;
				while(obj) {
					left += obj.offsetLeft;
					obj = obj.offsetParent;
				}
				return left;
			},
			chooseStart: function() {
				this.startTime = true;
				if(!this.showChoose) {
					this.showChoose = true;
				}
				this.init();
			},
			chooseEnd: function() {
				this.startTime = false;
				if(!this.showChoose) {
					this.showChoose = true;
				}
				this.init();
			},
			startOrEnd: function() {
				var end = parseInt(this.endslot.split(':')[0]) * 60 + parseInt(this.endslot.split(':')[1]);
				var start = parseInt(this.startslot.split(':')[0]) * 60 + parseInt(this.startslot.split(':')[1]);
				if(end < start) {
					store.commit("setWin",{title:"提示信息:",content:"开始时间不能大于结束时间"})
					return false;
				}
				this.showChoose = false;
			}

		},
		mounted: function() {
			if(this.chooseDate.length>0) {
				this.allChoose(3)
			};
			this.dateList = new Date(new Date().getFullYear(),this.month,0).getDate();
			this.init();
		}
	}
</script>
<style lang="less">
	.calsnder-month {
		.chairFix:after {
			content: '';
			display: block;
			clear: both;
		}
		.showDate {
			padding-left: 10px;
			padding-right: 10px;
			line-height: 40px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			box-sizing: border-box;
		}
		.inp {
			width: 191px;
			height: 40px;
			border: 1px #ccc solid;
			position: relative;
			section div {
				float: left;
				&:first-of-type {
					width: 150px;
					height: 40px;
					border-right: 1px #ccc solid;
				}
				&:nth-of-type(2) {
					width: 40px;
					height: 40px;
					position: relative;
					left: 150px;
					top: -40px;
				}
				&:nth-of-type(2) i {
					width: 10px;
					height: 10px;
					position: absolute;
					left: 50%;
					top: 50%;
					margin-left: -5px;
					margin-top: -5px;
					display: block;
					transform-origin: center center;
					transform: rotate(180deg);
					border-left: 5px solid transparent;
					border-right: 5px solid transparent;
					border-bottom: 10px solid #ccc;
					box-sizing: border-box;
				}
			}
			.chooseMonth {
				height: 220px;
				width: 100%;
				position: absolute;
				left: -1px;
				top: 40px;
				border: 1px #ccc solid;
				background-color: #fff;
				z-index: 10;
				.chooseKusi {
					color: #29abe2;
					text-align: center;
					line-height: 26px;
					font-size: 12px;
					height: 26px;
					width: 26px;
					float: left;
					box-sizing: border-box;
					margin-left: 5px;
					margin-top: 5px;
					border: #29abe2 solid 1px;
					cursor: pointer;
					&.active {
						color: #fff;
						background: #29abe2;
					}
				}
			}
		}
		.timeSlot {
			width: 204px;
			position: relative;
			.show span {
				width: 80px;
				height: 40px;
				line-height: 40px;
				text-align: center;
				margin-right: 10px;
				border: #ccc solid 1px;
				display: block;
				float: left;
				&:nth-of-type(2) {
					width: 10px;
					border: none;
				}
			}
			.chooseTime {
				width: 200px;
				position: absolute;
				top: 41px;
				left: 0px;
				border: 1px #ccc solid;
				background-color: #fff;
				z-index: 10;
				&>div {
					position: relative;
				}
				&>div:nth-of-type(1) {
					border-bottom: 1px #ccc solid;
				}
				&>div .timeDrag {
					margin: 0;
					margin-left: 5px;
					display: block;
					float: left;
					height: 40px;
					width: 153px;
					border: none;
					margin-top: -1px;
					position: relative;
				}
				.hourOrMinute>span:nth-of-type(1) {
					color: #fff;
					line-height: 40px;
					text-align: center;
					width: 34px;
					height: 41px;
					background: #29abe2;
					display: block;
					float: left;
				}
				.timeDrag {
					.dragTiao {
						height: 4px;
						width: 148px;
						margin-top: 30px;
						background: #29abe2;
					}
					.dragKuai {
						height: 16px;
						width: 12px;
						top: 24px;
						border: 1px #29abe2 solid;
						position: absolute;
						background: #fff;
						span {
							font-size: 12px;
							color: #29abe2;
							position: absolute;
							top: -20px;
						}
					}
				}
			}
		}
		.monthBtn span {
			color: #f7931e;
			font-size: 12px;
			text-align: center;
			line-height: 26px;
			width: 33%;
			float: left;
			display: block;
			cursor: pointer;
		}
		.chairFix span {
			display: inline-block;
			height: 16px;
		}
	}
</style>