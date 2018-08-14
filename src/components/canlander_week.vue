<template>
	<div id="weeken" class="canlander-weeken" onselectstart="return false;">
		<div class="sevenToSix chairFix">
			<span v-for="(item,i) in week" @click="selected(i)" :key="i" :class="{'active': week[i]}">{{i}}</span>
		</div>
		<div class="timeSlot chairFix">
			<div class="show chairFix">
				<span @click="chooseStart">{{startslot}}</span>
				<span>-</span>
				<span @click="chooseEnd">{{endslot}}</span>
			</div>
			<div class="chooseTime" v-if="showChoose">
				<div class="chairFix hourOrMinute">
					<span>时</span>
					<div class="timeDrag" id='timeDrag'>
						<div class="dragTiao"></div>
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
		props: [
			'start', // 开始时间
			'ends', // 结束时间
			'introWeeks',
    		'error'
		],
		watch:{
			"week":{
				handler:function(){
					this.$emit('castTime',this.week,this.startslot,this.endslot);
				}
			},
			"startslot":function(){
			    console.log('返回=============================')
			    console.log(this.startslot);
				this.$emit('castTime',this.week,this.startslot,this.endslot);
			},
			"endslot":function(){
				this.$emit('castTime',this.week,this.startslot,this.endslot);
			}
		},
		data() {
			return {
				hour: '',
				minute: '',
				hourStyle: 11,
				minuteStyle: 0,
				showChoose: false,
				startTime: true,
				startslot: '00:00',
				endslot: '00:00',
				week: { // 周六到周一
	    			'周天': false,
	    			'周一': false,
	    			'周二': false,
	    			'周三': false,
	    			'周四': false,
	    			'周五': false,
	    			'周六': false
	    		}
			}
		},
		methods: {
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
				if(!this.error) {
					if(end < start) {
						store.commit("setWin",{title:"提示信息:",content:"开始时间不能大于结束时间"})
						return false;
					}
				}
				this.showChoose = false;
			}

		},
		mounted: function() {
			this.init();
			this.week = this.introWeeks? this.introWeeks:this.week;
			this.startslot = this.start? this.start:this.startslot;
			this.endslot = this.ends? this.ends:this.endslot;
		},
        beforeUpdate(){
//            this.init();
            this.week = this.introWeeks? this.introWeeks:this.week;
            this.startslot = this.start? this.start:this.startslot;
            this.endslot = this.ends? this.ends:this.endslot;
        }
	}
</script>
<style lang="less">
	.clearfix {
		&:after {
			content: '';
			display: block;
			clear: both;
		}
	}
	
	.canlander-weeken {
		.chairFix {
			&:after {
				content: '';
				display: block;
				clear: both;
			}
		}
		.sevenToSix span {
			color: #29abe2;
			display: block;
			float: left;
			height: 41px;
			width: 62px;
			border: 1px #29abe2 solid;
			margin-right: 5px;
			line-height: 41px;
			text-align: center;
			cursor: pointer;
			&.active {
				color: #fff;
				background: #29abe2;
			}
		}
		.timeSlot {
			margin-top: 20px;
			position: relative;
			.show span {
				width: 80px;
				height: 41px;
				line-height: 41px;
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
				top: 42px;
				left: 0px;
				border: 1px #ccc solid;
				background-color: #fff;
				&>div {
					position: relative;
					&:nth-of-type(1) {
						border-bottom: 1px #ccc solid;
					}
					.timeDrag {
						margin: 0;
						margin-left: 5px;
						display: block;
						float: left;
						height: 41px;
						width: 153px;
						border: none;
						margin-top: -1px;
						position: relative;
					}
				}
				.hourOrMinute>span:nth-of-type(1) {
					color: #fff;
					line-height: 41px;
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
						margin-top: 25px;
						background: #29abe2;
					}
					.dragKuai {
						height: 16px;
						width: 12px;
						top: 17px;
						border: 1px #29abe2 solid;
						position: absolute;
						background: #fff;
						span {
							font-size: 12px;
							color: #29abe2;
							position: absolute;
							top: -18px;
						}
					}
				}
			}
		}
	}
	/*时间日历---跨时间段*/
	
	.calendar-multi {
		/*margin: 20px auto;*/
		width: 350px;
		border-radius: 3px;
		box-shadow: 0 0 10px #ccc;
		position: relative;
		background-color: #fff;
		z-index: 10;
		.header {
			height: 40px;
			line-height: 40px;
			text-align: center;
			border-radius: 3px 3px 0 0;
			border-bottom: 1px solid #CCCCCC;
			.pre-btn {
				display: block;
				float: left;
				padding: 0 10px;
				cursor: pointer;
			}
			.next-btn {
				display: block;
				float: right;
				padding: 0 10px;
				cursor: pointer;
			}
		}
		.title {
			font-size: 0;
			border-bottom: 1px solid #eee;
			margin-bottom: 6px;
			span {
				font-size: 14px;
				display: inline-block;
				width: 50px;
				text-align: center;
				line-height: 30px;
			}
		}
		.content {
			overflow: hidden;
			padding-bottom: 6px;
			ul .placeholder,
			ul li {
				display: block;
				float: left;
				width: 48px;
				height: 40px;
				text-align: center;
				line-height: 40px;
				cursor: pointer;
				margin: 1px;
				transition: all 0.1s;
				position: relative;
			}
			ul li {
				&:hover {
					background: #F5F5F5;
				}
				.festival,
				.startOrend {
					position: absolute;
					top: 2px;
					right: -5px;
					font-size: 10px!important;
					transform-origin: 0,0;
					transform: scale(0.80);
					height: 10px;
					width: 48px;
					text-align: center;
					line-height: 10px;
					color: red;
				}
				.startOrend {
					bottom: 2px;
					right: -8px;
					font-size: 8px!important;
					width: 54px;
					color: #FFFFFF;
				}
				&.gray {
					background-color: #ccc;
				}
				&.yellow {
					background-color: #F8931F;
					color: #fff;
				}
			}
		}
		.operat {
			position: absolute;
			width: 100%;
			bottom: -40px;
			height: 40px;
		}
		.esc,
		.choose,
		.ent {
			width: 33.3%;
			height: 100%;
			float: left;
			background-color: #A0A0A0;
			text-align: center;
			line-height: 40px;
			color: #FFFFFF;
			cursor: pointer;
		}
		.ent {
			background-color: #F8941F;
			&:hover {
				background-color: #bd823e;
			}
		}
		.esc:hover {
			background-color: #918686;
		}
		.choose {
			background-color: #0d9d58;
			&:hover {
				background-color: #0fad68;
			}
		}
	}
</style>