<!--
    **使用时段
    *
    * 
    * *miaochuan.sha
    *
-->
<template>
	<div id="useTime">
		<div class="right clearfix">
			<section class="clearfix" style="margin-bottom:10px;">
				<el-select class="fl" v-model="validTime" @change="selData" style="color:#c0c4cc">
					<el-option v-for="(item,index) in useDate.list" :key="index" :label="item" :value="index">
					</el-option>
				</el-select>
				<div class="fl" style="width: 100px;height: 40px;text-align: center;line-height: 40px;padding: 0;cursor: pointer;">
					<div class="fl" style="width: 50%;color: #F1801A;" @click="cleanUseDate" v-if="useDate.index != 0 && (useDate.week.length > 0 || useDate.month.length > 0)">
						清空
					</div>
					<div class="fl" style="width: 50%;color: #2397de;" @click="addUseDate" v-if="useDate.index != 0">
						添加
					</div>
				</div>
			</section>
			<!--change week-->
			<template v-for="(weeks,windex) in useDate.week" v-if="useDate.index == 1">
				<div :key="windex" class="select-week">
					<div class="show-week">
						<ul class="clearfix">
							<template v-for="(d,index) in week">
								<li style="text-align:center;" @click="selectWeek(windex,index)" :key="index" :class="{'selected':hasItemInArr(index,weeks.week)}">周{{d}}</li>
							</template>
						</ul>
					</div>
					<div class="show-time" style="width: 100%;height: auto;overflow: hidden;margin-top: 10px;">
						<div class="fl" style="overflow: hidden;">
							<div class="time">
								<input class="fl input" style="height: 40px;width: 25px;margin-left: 8px;color:#2393D6 ;" v-model="weeks.startslotH" maxlength="2" />
								<div class="fl" style="width: 10px;height: 38px;line-height: 38px;">:</div>
								<input class="fl input" style="height: 40px;width: 25px;margin-right: 8px;color:#2393D6 ;" v-model="weeks.startslotM" maxlength="2" />
								<div class="time-change">
									<div style="border-bottom: 10px solid #A3A4A5;top: 5px;" @click="changeUseTime({index:windex, worm:'week', sore:'s', type:'add'})"></div>
									<div style="border-top: 10px solid #A3A4A5;bottom: 5px;" @click="changeUseTime({index:windex, worm:'week', sore:'s', type:'down'})"></div>
								</div>
							</div>
						</div>
						<div class="fl" style="position: relative;width: 42px;height: 42px;">
							<div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);width: 28px;height: 1px;background-color: #999;"></div>
						</div>
						<div class="fl" style="overflow: hidden;">
							<div class="time">
								<input class="fl input" style="height: 40px;width: 25px;margin-left: 8px;color:#2393D6 ;" v-model="weeks.endslotH" maxlength="2" />
								<div class="fl" style="width: 10px;height: 38px;line-height: 38px;">
									:
								</div>
								<input class="fl input" style="height: 40px;width: 25px;margin-right: 8px;color:#2393D6 ;" v-model="weeks.endslotM" maxlength="2" />
								<div class="time-change">
									<div style="border-bottom: 10px solid #A3A4A5;top: 5px;" @click="changeUseTime({index:windex, worm:'week', sore:'e', type:'add'})"></div>
									<div style="border-top: 10px solid #A3A4A5;bottom: 5px;" @click="changeUseTime({index:windex, worm:'week', sore:'e', type:'down'})"></div>
								</div>
							</div>
						</div>
						<div class="fl " @click="changeNextday(windex)" :class="{'blueBySelect':weeks.isNextDay}" style="width: 20px;height: 20px;border: 1px solid #999;margin: 10px 10px 10px 20px;line-height: 20px;text-align: center;cursor: pointer;">
							<img src="../../../res/icon/selected.png" />
						</div>
						<div class="fl " style="width: 30px;height: 20px;margin: 10px 0;line-height: 20px;text-align: center;">
							隔日
						</div>
						<div class="fl " style="width: 20px;height: 20px;margin: 10px 20px;line-height: 20px;text-align: center;cursor: pointer;" @click="delectedOneDate('week',windex)">
							<img src="../../../res/images/delete.png" />
						</div>
					</div>
				</div>
			</template>
			<!--月的选择样式-->
			<template v-for="(month,mindex) in  useDate.month" v-if="useDate.index == 2">
				<!-- <div :key="mindex + 'l'" class="left ">
				</div> -->
				<div :key="mindex + 'r'" class="clearfix" style="margin-bottom:10px;">
					<div class="fl" style="width: 250px;height: 42px;padding: 0;position: relative;cursor: pointer;">
						<div v-if="month.month.length == 0" class="fl" style="border: 1px solid #999;width: 200px;height: 42px;padding: 0;text-align:center;line-height:42px;" @click="openMonth(mindex)">
							请选择日期
						</div>
						<div v-else class="fl" style="border: 1px solid #999;width: 200px;height: 42px;padding: 0;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;text-align:center;line-height:42px;" @click="openMonth(mindex)">
							{{changeDays(month.month)}}
						</div>
						<div style="border:1px solid #999;width: 40px;float: left;height:42px;border-left: none;text-align:center;line-height:42px;" @click="openMonth(mindex)">
							<img src="../../../res/icon/q2x.png" />
						</div>
						<div class="show-days" v-if="openMonthIndex == mindex">
							<ul>
								<template v-for="(i,index) in 31">
									<li :key="index" :class="{'select':hasItemInArr(index+1,month.month)}" @click="selectMonth(mindex,index+1)">{{i}}</li>
								</template>
							</ul>
							<div style="position: absolute;bottom: 0;left: 0;width: 100%;height: 40px;text-align: center;border-top: 1px solid #999;">
								<div style="width: 33.33%;float: left;">
									<a href="javascript:void(0);" class="yellow" style="width: 100%;height: 40px;line-height: 40px;" @click="selectAll(mindex,month)">全选</a>
								</div>
								<div style="width: 33.33%;float: left;">
									<a href="javascript:void(0);" class="red" style="width: 100%;height: 40px;line-height: 40px;" @click="selectClean(mindex,month)">清空</a>
								</div>
								<div style="width: 33.33%;float: left;">
									<a href="javascript:void(0);" class="blue" style="width: 100%;height:40px;line-height: 40px;" @click="openMonth(mindex)">确定</a>
								</div>
							</div>
						</div>
					</div>
					<div class="fl" style="overflow: hidden;">
						<div class="time">
							<input class="fl input" style="height: 40px;width: 25px;margin-left: 8px;color:#2393D6 ;" v-model="month.startslotH" maxlength="2" />
							<div class="fl" style="width: 10px;height: 38px;line-height: 38px;padding: 0;">
								:
							</div>
							<input class="fl input" style="height: 40px;width: 25px;margin-right: 8px;color:#2393D6 ;" v-model="month.startslotM" maxlength="2" />
							<div class="time-change">
								<div style="border-bottom: 10px solid #A3A4A5;top: 5px;" @click="changeUseTime({index:mindex, worm:'month', sore:'s', type:'add'})"></div>
								<div style="border-top: 10px solid #A3A4A5;bottom: 5px;" @click="changeUseTime({index:mindex, worm:'month', sore:'s', type:'down'})"></div>
							</div>
						</div>
					</div>
					<div class="fl" style="position: relative;width: 42px;height: 42px;">
						<div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);width: 28px;height: 1px;background-color: #999;"></div>
					</div>
					<div class="fl" style="overflow: hidden;">
						<div class="time">
							<input class="fl input" style="height: 40px;width: 25px;margin-left: 8px;color:#2393D6 ;" v-model="month.endslotH" maxlength="2" />
							<div class="fl" style="width: 10px;height: 38px;line-height: 38px;padding: 0;">
								:
							</div>
							<input class="fl input" style="height: 40px;width: 25px;margin-right: 8px;color:#2393D6 ;" v-model="month.endslotM" maxlength="2" />
							<div class="time-change">
								<div style="border-bottom: 10px solid #A3A4A5;top: 5px;" @click="changeUseTime({index:mindex, worm:'month', sore:'e', type:'add'})"></div>
								<div style="border-top: 10px solid #A3A4A5;bottom: 5px;" @click="changeUseTime({index:mindex, worm:'month', sore:'e', type:'down'})"></div>
							</div>
						</div>
					</div>
					<div class="fl " @click="changeNextday(mindex,'month')" :class="{'blueBySelect':month.isNextDay}" style="width: 20px;height: 20px;border: 1px solid #999;margin: 10px 10px 10px 20px;line-height: 20px;text-align: center;cursor: pointer;padding: 0;">
						<img src="../../../res/icon/selected.png" />
					</div>
					<div class="fl " style="width: 30px;height: 20px;margin: 10px 0;line-height: 20px;text-align: center;padding: 0;">
						隔日
					</div>
					<div class="fl " style="width: 20px;height: 20px;margin: 10px 20px;line-height: 20px;text-align: center;cursor: pointer;padding: 0;" @click="delectedOneDate('month',mindex)">
						<img src="../../../res/images/delete.png" />
					</div>
				</div>
			</template>
		</div>
	</div>
</template>
<script>
import utils from 'src/verdor/utils';

export default {
	props: {
		useDate: Object
	},
	data() {
		return {
			week: ['日', '一', '二', '三', '四', '五', '六'],
			openMonthIndex: -1, //打开日期选择的下标  
			validTime: ''
		};
	},
	methods: {
		selectItemShow(item) {
			this[item].show = !this[item].show;
		},
		delectedOneDate(type, index) {
			if (type == 'month') {
				this.useDate.month.splice(index, 1);
			} else {
				this.useDate.week.splice(index, 1);
			}
		}, //删除一条 
		changeUseTime({ index, worm, sore, type }) {
			let obj = this.useDate[worm][index];

			function zero(num) {
				if (num < 10) {
					return '0' + num;
				} else {
					return num;
				}
			}
			let m;
			if (sore == 's') {
				m = 'startslotM';
			} else {
				m = 'endslotM';
			}
			if (type == 'add') {
				obj[m] -= 0;
				if (obj[m] < 59) {
					obj[m]++;
					obj[m] = zero(obj[m]);
				} else {
					obj[m] = '00';
					let item;
					if (sore == 's') {
						item = 'startslotH';
					} else {
						item = 'endslotH';
					}
					obj[item] -= 0;
					if (obj[item] >= 23) {
						obj[item] = '00';
					} else {
						obj[item]++;
						obj[item] = zero(obj[item]);
					}
				}

			} else {
				obj[m] -= 0;
				if (obj[m] > 0) {
					obj[m]--;
					obj[m] = zero(obj[m]);
				} else {
					obj[m] = 59;
					let item;
					if (sore == 's') {
						item = 'startslotH';
					} else {
						item = 'endslotH';
					}
					obj[item] -= 0;
					if (obj[item] <= 1) {
						obj[item] = '23';
					} else {
						obj[item]--;
						obj[item] = zero(obj[item]);
					}
				}
			}
			this.useDate[worm].splice(index, 1, obj);
		},
		changeItemIndex(item, index) {
			this[item].index = index;
		},
		hasItemInArr(item, arr, type) {
			if (arr.indexOf(item) == -1) {
				return false;
			}
			if (type) {
				return arr.indexOf(item);
			}
			return true;
		},
		addUseDate() {
			if (this.useDate.index == 1) {
				if (this.useDate.week.length < 5) {
					let obj = {
						'startslotH': '12',
						'startslotM': '00',
						'endslotH': '00',
						'endslotM': '00',
						'isNextDay': false,
						'week': []
					};
					this.useDate.week.push(obj);
				} else {
					this.valiData('使用时段限制最多只能五个', '温馨提示');

				}
			} else if (this.useDate.index == 2) {
				if (this.useDate.month.length < 5) {
					let obj = {
						'startslotH': '12',
						'startslotM': '00',
						'endslotH': '00',
						'endslotM': '00',
						'isNextDay': false,
						'month': []
					};
					this.useDate.month.push(obj);
				} else {
					this.valiData('使用时段限制最多只能五个', '温馨提示');
				}
			}
		},
		cleanUseDate() {
			if (this.useDate.index == 1) {
				this.useDate.week = [];
			} else if (this.useDate.index == 2) {
				this.useDate.month = [];
			}
		},
		selectWeek(w, d) {
			let week = this.useDate.week[w].week;
			if (!this.hasItemInArr(d, week)) {
				week.push(d);
			} else {
				week.splice(week.indexOf(d), 1);
			}
			this.useDate.week[w].week = week;
		}, //选择周  
		openMonth(index) {
			if (this.openMonthIndex == index) {
				this.openMonthIndex = -1;
			} else {
				this.openMonthIndex = index;
			}
		},
		selectAll(index) {
			this.useDate.month[index].month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
				23, 24, 25, 26, 27, 28, 29, 30, 31
			];
		},
		changeNextday(w, type) {
			if (type == 'month') {
				this.useDate.month[w].isNextDay = !this.useDate.month[w].isNextDay;
			} else {
				this.useDate.week[w].isNextDay = !this.useDate.week[w].isNextDay;
			}

		}, //是否隔天 
		valiData(content, title = '提示信息', winType = 'alert') {
			this.$store.commit('setWin', {
				winType: winType,
				title: title,
				content: content
			});
		},
		selectMonth(w, d) {
			let month = this.useDate.month[w].month;
			if (!this.hasItemInArr(d, month)) {
				month.push(d);
			} else {
				month.splice(month.indexOf(d), 1);
			}
			this.useDate.month[w].month = month;
		}, //选择月 
		changeDays(arr) {
			arr = utils.deepCopy(arr);
			if (arr.length == 0) {
				return '请选择日期';
			}
			arr = arr.sort(function(a, b) {
				return a - b;
			});
			let str = '';
			for (let j = 0; j < arr.length; j++) {
				if (arr[j] - arr[j - 1] != 1) {
					str += this.findItem(arr[j], arr);
				}
			}

			return str;
		},
		findItem(item, arr) {
			let index = arr.indexOf(item);
			for (let i = index; i < arr.length; i++) {
				if (arr[i + 1] - arr[i] != 1) {
					let rs = '';
					if (arr[i] - item == 0) {
						rs = arr[i];
					} else if (arr[i] - item == 1) {
						rs = item + ',' + arr[i];
					} else {
						rs = item + '到' + arr[i];
					}
					if (i < arr.length - 1) {
						rs += ',';
					}
					return rs;
				}
			}
		},
		emitMethod() { //派发事件
			this.$emit('getTime', this.useDate);
		},
		selData: function(value) { //领取后生效
			this.useDate.index = value;
		},
		getvalidTime:function(){
			this.validTime = this.useDate.list[this.useDate.index];
		}
	},
	watch: {
		'useDate': {
			handler() {
				this.getvalidTime();
				this.emitMethod(); //派发事件
			},
			deep: true
		}
	},
	mounted(){
		this.getvalidTime();
	}
};
</script>
<style type="text/css" scoped>
#useTime {
	/* width: 1200px;
    line-height: 40px;
    text-align: center;
    color: #333;
    overflow: hidden;
    position: relative; */
}

#useTime .left,
#useTime .right {
	height: auto;
	float: left;
	margin-bottom: 15px;
}

#useTime .left {
	color: #000000;
	width: 170px;
}

#useTime .right {
	width: 970px;
}

#useTime .right .fl {
	/* padding-left: 10px; */
}

#useTime .select-week {
	width: 100%;
	overflow: hidden;
	float: left;
	margin-bottom: 10px;
}

#useTime .show-week {
	width: 800px;
	height: 40px;
}

#useTime .show-week ul li {
	width: 66px;
	height: 38px;
	border: 1px solid #2393D6;
	float: left;
	margin-right: 10px;
	color: #2393D6;
	cursor: pointer;
	line-height: 38px;
}

#useTime .show-week ul li.selected {
	background-color: #2393D6;
	color: #FFF;
}

#useTime .time {
	width: 120px;
	height: 42px;
	line-height: 40px;
	border: 1px solid #999;
}

#useTime .time .time-change {
	width: 20px;
	height: 40px;
	float: right;
	border-left: 1px solid #999;
	position: relative;
}

#useTime .time .time-change div {
	position: absolute;
	width: 0;
	height: 0;
	border-left: 6px solid transparent;
	border-right: 6px solid transparent;
	left: 3px;
	cursor: pointer;
}

#useTime .left .text {
	float: right;
	height: 100%;
	padding: 0 10px;
	text-align: right;
}

#useTime .blueBySelect {
	background-color: #2393D6 !important;
}

.show-days {
	position: absolute;
	top: 42px;
	left: 0;
	width: 240px;
	padding: 10px;
	padding-bottom: 50px;
	background-color: #fff;
	z-index: 333;
	border: 1px solid #999;
	border-top: none;
}

.show-days ul li {
	width: 32px;
	height: 32px;
	text-align: center;
	line-height: 32px;
	float: left;
	margin: 2px;
	border: 1px solid #999;
	cursor: pointer;
	line-height: 32px;
}

.show-days ul li.select {
	background-color: #2393D6;
	color: #FFF;
}

#useTime .right .list {
	text-align: left;
	text-indent: 10px;
	width: 190px;
	position: absolute;
	top: 40px;
	left: 0;
	border: 1px solid #999;
	border-top: none;
	z-index: 333;
	background-color: #FFF;
}

#useTime .right .list ul {
	width: 100%;
}

#useTime .right .list ul li {
	width: 100%;
	height: 40px;
	line-height: 40px;
}

#useTime .right .list ul li:hover {
	background-color: #edeff0;
}
</style>