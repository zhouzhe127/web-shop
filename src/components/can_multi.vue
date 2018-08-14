<!-- 时间日历组件-跨时间段 -->
<template>
	<div class="canlandar-multi" onselectstart="return false;">
		<div>
			<div class="header">
				<span class="pre-btn" @click="preYear">上一年</span><span class="pre-btn" @click="preMonth">上一月</span>
				<span class="now-y-m">{{ nowYear }}/{{nowMonth}}</span>
				<span class="next-btn" @click="nextYear">下一年</span><span class="next-btn" @click="nextMonth">下一月</span>
			</div>
			<div class="title">
				<span v-for="week in weeks" :key="week">{{ week }}</span>
			</div>
			<div class="content">
				<ul>
					<div v-for="i in 42" :key="i">
						<li @click="clickHandle(i+1)" :class="{'yellow' :isSelected(i+1,true) === 'yellow','gray' :isSelected(i+1,true) === 'gray'}" v-if='i>=index && (i-index)<len'>
							{{ i-index+1 }}
							<div class="festival" style="font-size: 8px;">
								<!--节日名-->
							</div>
							<div class="startOrend"> {{isSelected(i+1,false)}}</div>
						</li>
						<div v-else>
							<div class="placeholder"></div>
						</div>
					</div>
				</ul>
			</div>
			<div class="operat">
				<div class="esc" @click="cancel">取消</div>
				<div class="choose" @click="changeType">
					{{type ? "选择结束时间":"选择开始时间"}}
				</div>
				<div class="ent" @click="confirm">确定</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import utils from "src/verdor/utils";

	export default {
		props: ['sideStart', 'sideEnd', 'apartDays'],
		data() {
			return {
				weeks: ['日', '一', '二', '三', '四', '五', '六'],
				index: 0,
				len: 0,
				type: true, //选择开始时间
				now: Date.now(), // 当前时间
				start: Date.now(), //开始的时间（秒）
				end: Date.now(), //结束的时间戳（秒）
				nowMonth: null,
				nowYear: null,
				starttime:'',
				endtime:'',
				time:false
			}
		},
		watch:{
			/* 'open':function(){
				this.$emit('castTime',this.starttime,this.endtime);
			} */
		},
		mounted: function() {

			
			if(this.sideStart){
                this.now = new Date(this.sideStart);
            }else{
                this.now = new Date();
			}
			
			this.time = false;
console.log(this.end)
			console.log(this.sideStart,this.sideEnd)
		
			this.init();
		},
		methods: {
			changeType: function() {
				this.type = !this.type;
			},
			init: function() {
				
				if(!(this.start instanceof Date)){
					//毫数
					if((this.start+'').length==10){
						this.start = new Date(Number(this.start)*1000)
					}else{
						this.start = new Date(Number(this.start));
					}
					
				}else{
					this.start = new Date(this.start.getTime());
				}

				if(!(this.end instanceof Date)){
					//毫数
					if((this.end+'').length==10){
						this.end = new Date(Number(this.end)*1000)
					}else{
						this.end = new Date(Number(this.end));
					}
					
				}else{
					this.end = new Date(this.end.getTime());
				}

				this.start.setHours(0,0,0,0);
				this.end.setHours(0,0,0,0);
				this.len = (new Date(this.now.getFullYear(), this.now.getMonth() + 1, 0)).getDate();
				this.index = (new Date(this.now.getFullYear(), this.now.getMonth(), 1)).getDay()+1;
				this.nowMonth = this.now.getMonth() + 1;
				this.nowYear = this.now.getFullYear();
				
			},
			preMonth: function() {
				this.now.setMonth(this.now.getMonth() - 1, 1);
				this.nowMonth = this.now.getMonth() + 1;
				this.init();
			},
			nextMonth: function() {
				this.now.setMonth(this.now.getMonth() + 1, 1);
				this.nowMonth = this.now.getMonth() + 1;
				this.init();
			},
			preYear: function() {
				this.now.setYear(this.nowYear - 1)
				this.init();
			},
			nextYear: function() {
				this.now.setYear(this.nowYear + 1)
				this.init();
			},
			clickHandle: function(i) {

				if(i < this.index && (i - this.index) >= this.len) return;

				if(this.type) {
					this.start = (new Date(this.now.getFullYear(), this.now.getMonth(), i - this.index)).setHours(0,0,0,0);
				} else {
					this.end = (new Date(this.now.getFullYear(), this.now.getMonth(), i - this.index)).setHours(0,0,0,0);
				}
				if(this.type) {
					if(this.start > this.end) {
						this.end = this.start;
					}
				} else {
					if(this.start> this.end) {
						this.start = this.end;
					}
				}
			},
			isSelected: function(i, type) {
				var selectedTime = (new Date(this.now.getFullYear(), this.now.getMonth(), i - this.index)).setHours(0,0,0,0);

				let st = this.start;
				let et = this.end;
				if(st instanceof Date){
					st = utils.getTime({time:this.start}).start
				}
				if(et instanceof Date){
					et = utils.getTime({time:this.end}).start
				}

				if(type) {
					if(selectedTime > st && selectedTime < et) {
						return "gray";
					} else if(selectedTime == st || selectedTime == et) {
						return 'yellow';
					} else {
						return 'white';
					}
				} else {
					if(selectedTime == st && selectedTime == et) {
						return "开始/结束"
					} else {
						if(selectedTime == st) {
							return "开始";
						}
						if(selectedTime == et) {
							return '结束';
						}
					}
					return "";
				}
			},
			cancel: function() {
				this.back();
			},
			confirm: function() {
				let days;
				if(this.apartDays) {
					// 计算相隔天数
					days = this.end - this.start;
					days = (days / (60 * 60 * 24 * 1000)) + 1;
					if(this.apartDays < days) {
						this.$store.commit("setWin",{title:"提示信息:",content:'相隔天数大于' + this.apartDays + '天，请重新选择'})
						return false;
					}
				}

				this.starttime = this.start;
				this.endtime = this.end;
				this.time = true;
				this.$emit('castTime',{startTime:this.starttime,endTime:this.endtime,days: days});
			},
			//选中重置
			back: function() {
				
				this.now = new Date();
				this.start = new Date();
				this.end = new Date();
				this.init();
				this.$emit('closeCan')
			}
		}
	}
</script>
<style lang="less">
	.canlandar-multi {
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