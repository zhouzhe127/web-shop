<!--
	**市别设置弹窗
	*
	* 胡江
	* *
	*
-->
<template>
	<win @winEvent="clickResult" :align="'center'" :width=" 500" :height="300">
		<!--标题-->
		<span slot="title">编辑</span>
		<!--内容-->
		<div slot="content">
			<section id="marketTan">
				<div class="oBox" style="margin-top: 30px;">
					<h3 style="">市别名称：</h3>
					<input v-if="ischain == '1' || ischain == '2'" v-model="name" class="input timeNameOne" disabled="disabled" maxlength="6">
					<input v-if="ischain == '0' || ischain == '3'" v-model="name" class="input timeNameTwo" maxlength="6">
				</div>
				<div v-if="ischain != '3'" class="oBox marBox">
					<h3 style="margin-top: 20px;">市别时段：</h3>
					<calanderWeek @castTime="doSet" :start="startslot" :ends="endSlot" :error="true" :introWeeks="{}" style="margin-top:0;float:left;">
					</calanderWeek>
				</div>
				<div class="oBox">
					<h3>市别状态：</h3>
					<div class="fl">
						<section v-on:click="openBtn(1)" class="play" :class="{'click': status == 1}">开启</section>
						<section v-on:click="openBtn(0)" class="play" :class="{'click': (status == 0 || status == -1)}">关闭</section>
					</div>
				</div>
			</section>
		</div>
	</win>
</template>

<script>
import http from 'src/manager/http';
export default {
	data() {
		return {
			marketDetial: this.item, //市别详情
			name: this.item.name,
			status: this.item.status,
			startslot:
				this.item.intervalTime && this.item.intervalTime !== ''
					? this.item.intervalTime.split('--')[0]
					: '',
			endSlot:
				this.item.intervalTime && this.item.intervalTime !== ''
					? this.item.intervalTime.split('--')[1]
					: '',
			ischain: this.userData.currentShop.ischain //如果是品牌或者单店，市别时段不显示
		};
	},
	props: {
		userData: Object,
		list: Array,
		item: Object
	},
	mounted() {
		//            if(this.item.intervalTime && this.item.intervalTime!==''){
		//                this.startslot = this.item.intervalTime.split('--')[0];
		//                this.endSlot =  this.item.intervalTime.split('--')[1];
		//            }
		//            console.log(this.startslot)
		//            console.log(this.endSlot)
	},
	methods: {
		//接受时间组件返回的值
		doSet(week, startslot, endslot) {
			this.startslot = startslot;
			this.endSlot = endslot;
			//                console.log(week+startslot+endslot);
		},
		openBtn(num) {
			this.status = num;
		},
		//创建
		async create(startTime, endTime) {
			let res = await http.timeintervalCreate({
				data: {
					shopId: this.userData.currentShop.id,
					id: this.item.id,
					name: this.name,
					startTime: startTime * 60,
					endTime: endTime * 60,
					status: this.status == -1 ? 0 : this.status
				}
			});
			if (res) {
				return res;
			}
		},
		//编辑
		async edit(startTime, endTime) {
			let res = await http.timeintervalEdit({
				data: {
					shopId: this.userData.currentShop.id,
					id: this.item.id,
					name: this.name,
					startTime: startTime * 60,
					endTime: endTime * 60,
					status: this.status == -1 ? 0 : this.status
				}
			});
			if (res) {
				return res;
			}
		},
		clickResult(res) {
			if (res == 'ok') {
				//开通
				let startslot = this.startslot.split(':');
				let startTime = startslot[0] * 60 + parseInt(startslot[1]);
				let endSlot = this.endSlot.split(':');
				let endTime = endSlot[0] * 60 + parseInt(endSlot[1]);
				for (let i = 0; i < this.list.length; i++) {
					//开通或者修改市别，name值不能相同
					if (
						this.item.name !== this.name &&
						this.name == this.list[i].name
					) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							winType: 'alter',
							content: '市别名重复，请重新输入'
						});
						return false;
					}
				}
				let newData = {
					name: this.name,
					intervalTime: this.startslot + '--' + this.endSlot,
					status: this.status == -1 ? 0 : this.status
				};
				if (this.item.status == -1) {
					this.create(startTime, endTime).then(() => {
						this.$emit('throwWinResult', res, newData); //抛出一个事件给父组件
					});
				} else {
					this.edit(startTime, endTime).then(() => {
						this.$emit('throwWinResult', res, newData); //抛出一个事件给父组件
					});
				}
			} else {
				this.$emit('throwWinResult', res); //抛出一个事件给父组件
			}
		}
	},
	components: {
		win: () => import(/*webpackChunkName: "win"*/ 'src/components/win'),
		calanderWeek: () =>
			import(/*webpackChunkName: "canlander_week"*/ 'src/components/canlander_week')
	}
};
</script>

<style lang="less" scoped>
#marketTan {
	position: relative;
	.oBox {
		width: 100%;
		height: 60px;
		h3 {
			width: 40%;
			height: 40px;
			font-size: 16px;
			line-height: 40px;
			text-align: right;
			float: left;
			padding-right: 20px;
		}
		.timeNameOne {
			width: 40%;
			text-align: left;
			float: left;
			border: 1px solid #919191;
		}
		.timeNameTwo {
			width: 40%;
			text-align: left;
			float: left;
			border: 1px solid #919191;
		}
		div {
			.play {
				width: 100px;
				height: 40px;
				line-height: 40px;
				text-align: center;
				border: 1px solid #919191;
				cursor: pointer;
				float: left;
				background-color: #fefefe;
				color: #919191;
				margin-right: 15px;
			}
			.click {
				border: 1px solid #ff9801;
				color: #ff9801;
				background-color: #fff1e4;
			}
		}
	}
	.marBox {
		margin-bottom: 30px;
		position: relative;
	}
}
</style>
