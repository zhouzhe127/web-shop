<!--
	**商品起售弹窗
	*
	* 胡江
	* *
	*
-->

<template>
	<div>
		<win @winEvent="clickResult" :align="'right'" :width="480" :height="'auto'">
			<!--标题-->
			<span slot="title">{{title}}</span>
			<!--内容-->
			<div slot="content" style="background-color: #F2F2F2">
				<div class="jobWin">
					<h2 class="required tag">起售类型</h2>
					<template v-for="(item,index) in computerWay">
						<div class="computeStyle" :class="{icSelect:(index+1)== info.type}" @click="changeSelect(index+1)" :key="index">
							{{item}}
						</div>
					</template>
					<div class="clear"></div>
					<h2 class="required tag">起售商品</h2>
					<div class="mes">
						<a href="javascript:void(0);" class="addclassify" style="width:150px;" v-on:click="edit">添加商品</a>
					</div>
					<div class="clear"></div>
					<div style="color: #999;margin-left: 120px;padding-right: 30px">
						{{info.goodsName}}
					</div>
					<div class="clear"></div>
					<h2 class="required tag">起售数量</h2>
					<div class="mes">
						<input type="text" class="input" maxlength="2" style="width:150px; " v-model="info.num" placeholder="请输起售数量">
					</div>
					<div class="clear"></div>
				</div>
			</div>
		</win>
		<goodListWin v-if="showTan" @goodListWin="doThrowTanResult" :goodsIds="this.info.gid.split(',')" :isGoods="this.info.type==1?false:true" :goInName="'goodSale'" :isOnlyGoods="true" :allGid="allGid" :idAndName="true"></goodListWin>
	</div>
</template>

<script>
import http from 'src/manager/http';
export default {
	data() {
		return {
			title: this.isAdd ? '新建起售商品' : '编辑起售商品', //弹窗的标题
			showTan: false, //是否展示选择商品的弹窗页面
			computerWay: ['单品起售', '多品联动起售'],
			info: {}
		};
	},
	props: {
		item: Object,
		newrecordList: Array,
		isAdd: null,
		jobIndex: '',
		allGid: Array
	},
	created() {
		this.info = {
			id: this.item.id ? this.item.id : '',
			gid: this.item.gid ? this.item.gid : '',
			num: this.item.num ? this.item.num : '',
			type: this.item.type ? this.item.type : '1',
			goodsName: this.item.goodsName ? this.item.goodsName : ''
		};
	},
	methods: {
		//修改类型
		changeSelect(type) {
			if (!this.isAdd) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '不能修改起售配置类型'
				});
				return false;
			}
			this.info.type = type;
		},
		// 添加
		async addJob(backRes) {
			let res = await http.GoodsleastAdd({
				data: {
					gid: this.info.gid,
					num: this.info.num,
					type: this.info.type
				}
			});
			if (res) {
				this.info.id = res.id;
				this.newrecordList.push(this.info);
			}
			this.$emit('throwWinResult', backRes); //抛出一个事件给父组件
		},
		// 修改
		async editJob(backRes) {
			let res = await http.GoodsleastEdit({
				data: {
					id: this.info.id,
					num: this.info.num
				}
			});
			if (res) {
				this.newrecordList.splice(this.jobIndex, 1, this.info);
			}
			this.$emit('throwWinResult', backRes);
		},
		clickResult(res) {
			if (res == 'ok') {
				if (this.info) {
					//                        let emptyReg = /^[0-9]*$/;
					//                        if(!emptyReg.test(Number(this.info.num))) {
					//                            this.$store.commit("setWin",{
					//                                title:'温馨提示',
					//                                winType:'alter',
					//                                content:'请输入整数',
					//                            });
					//                            return false;
					//                        }
					//                        if(Number(this.info.num)<2||Number(this.info.num>99)) {
					//                            this.$store.commit("setWin",{
					//                                title:'温馨提示',
					//                                winType:'alter',
					//                                content:'起售数量为2到99',
					//                            });
					//                            return false;
					//                        }

					let emptyReg = /(^[2-9]{1}$)|(^[1-9]\d{1}$)/;
					if (!emptyReg.test(Number(this.info.num))) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							winType: 'alter',
							content: '起售数量为2到99'
						});
						return false;
					}

					if (this.info.gid == '') {
						this.$store.commit('setWin', {
							title: '温馨提示',
							winType: 'alter',
							content: '请添加起售商品'
						});
						return false;
					}
					if (this.info.type == '1') {
						if (this.info.gid.split(',').length > 1) {
							this.$store.commit('setWin', {
								title: '温馨提示',
								winType: 'alter',
								content: '单品起售只能添加一个商品'
							});
							return false;
						}
					}
					if (this.info.type == '2') {
						if (
							this.info.gid.split(',').length < 2 ||
							this.info.gid.split(',').length > 11
						) {
							this.$store.commit('setWin', {
								title: '温馨提示',
								winType: 'alter',
								content: '多品联动起售只能添加2到10个商品'
							});
							return false;
						}
					}
				} else {
					return true;
				}
				if (this.isAdd) {
					// 添加起售商品
					this.addJob(res);
				} else if (!this.isAdd) {
					// 修改职位
					this.editJob(res);
				}
			} else if (res == 'cancel') {
				this.$emit('throwWinResult', res); //抛出一个事件给父组件
			} else if (res == 'close') {
				this.$emit('throwWinResult', res); //抛出一个事件给父组件
			}
		},
		//打开商品选择弹窗
		edit() {
			if (!this.isAdd) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '不能修改起售商品'
				});
				return false;
			}
			this.showTan = true;
		},
		//商品选择弹窗返回的事件
		doThrowTanResult(res, item) {
			if (res == 'ok') {
				//                    console.log(item);
				if (this.info.type == 1) {
					this.info.goodsName = item.goodArr[0].goodsName;
					this.info.gid = item.goodArr[0].id;
				} else {
					let tName = [];
					let tId = [];
					for (let i = 0; i < item.goodArr.length; i++) {
						tId.push(item.goodArr[i].id);
						tName.push(item.goodArr[i].goodsName);
					}
					this.info.goodsName = tName.join('、'); //字符串
					this.info.gid = tId.join(','); //字符串
				}
			}
			this.showTan = false;
		}
	},
	components: {
		win: () => import(/*webpackChunkName: "win"*/ 'src/components/win'),
		goodListWin: () =>
			import(/*webpackChunkName: "good_list_win"*/ 'src/components/good_list_win')
	}
};
</script>

<style scoped lang="less">
.jobWin {
	width: 480px;
	height: auto;
	min-height: 480px;
	padding-top: 20px;
	background-color: #f2f2f2;
	.tag {
		float: left;
		width: 102px;
		height: 40px;
		line-height: 40px;
		text-align: right;
	}
	.mes {
		float: left;
		width: 300px;
		padding-left: 15px;
		text-indent: 0;
		line-height: 0;
	}
	.clear {
		clear: both;
		font-size: 0;
		line-height: 0;
		height: 15px;
		width: 100%;
	}
	.computeStyle {
		width: 100px;
		height: 38px;
		text-align: center;
		border: 1px solid rgb(189, 190, 191);
		margin-left: 15px;
		cursor: pointer;
		float: left;
		line-height: 38px;
	}
	.icSelect {
		border: 1px solid rgb(244, 147, 50) !important;
		background-color: rgb(249, 240, 227);
		color: #f39801;
	}
}
</style>
