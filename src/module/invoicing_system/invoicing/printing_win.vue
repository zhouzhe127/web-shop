<template>
	<win :width="width" :height="height" @winEvent="winEvent" :align="'center'">
		<span slot="title">{{title}}</span>
		<!--生成条码弹框-->
		<div id="tan" slot="content" slot-scope="props">
			<!--普通商品弹框-->
			<div class="general-goods" v-if="goodsDel.type == 0">
				<span>打印条码数量：</span>
				<input :numIndex="1" @input="toPraparseInt" maxlength="20" style="width:200px;border: 1px solid #CCCCCC;" placeholder="请输入数量"
				    type="text" />
			</div>
			<!--称重商品弹框-->
			<div class="weigh-item" v-if="goodsDel.type == 1">
				<div class="tanTop">
					<div class="barName">
						<span>商品名称：</span>
						<span>{{goodsDel.gName}}</span>
					</div>
					<div class="barPice">
						<span>售价：</span>
						<span style="display: inline-block;height: 20px;">{{goodsDel.price}}元</span>
					</div>
				</div>
				<div class="tanContent" v-for="i in addNum" :key="i">
					<div class="barweight">
						<span>重量({{goodsDel.unit}})</span>
						<input type="text" :dataIndex="i" id="" value="" maxlength="20" placeholder="输入重量" @input="resOn" />
					</div>
					<div class="barNum">
						<span>打印数量</span>
						<input type="text" :numIndex="i" maxlength="20" value="" placeholder="打印数量" @input="toPraparseInt" />
					</div>
					<p v-if="i == addNum && i != 1" @click="delBar"></p>
				</div>
				<a href="javascript:void(0);" @click="addbar" class="addclassify" style="width:100px;display: block; margin: 10px auto;">添加</a>
			</div>
		</div>
	</win>
</template>
<script>
	export default {
		data() {
			return {
				width: 700,
				height: 300,
				addNum: 1,
				classWeight: [],
				classification: []
			};
		},
		props: {
			goodsDel: Object,
			title: String,
			listDel: Object
		},
		methods: {
			addbar: function () {
				this.addNum < 5 ? this.addNum++ : (this.addNum = 5);
			},
			delBar: function () {
				this.addNum > 1 ? this.addNum-- : (this.addNum = 1);
				this.classWeight.length = this.addNum;
				this.classification.length = this.addNum;
			},
			toPraparseInt: function (event) {
				let index = event.target.getAttribute('numIndex') - 1;
				let val = event.target.value;
				if (isNaN(val)) {
					this.alert('输入不合法');
					event.target.value = '';
					return;
				}
				if (val) {
					event.target.value = Math.floor(val);
				}
				this.classification[index] = val;
			},
			resOn: function () {
				let index = event.target.getAttribute('dataIndex') - 1;
				let val = event.target.value;
				if (isNaN(val)) {
					this.alert('输入不合法');
					event.target.value = '';
					return;
				}

				if (val.indexOf('.') > -1) {
					val = val.substr(0, 6);
				} else {
					val = val.substr(0, 5);
				}
				if (this.listDel.weighType == 3) {
					this.classWeight[index] = val;
					let tempArr = val.split('.');
					if (tempArr.length == 2) {
						tempArr[0] = tempArr[0].substr(0, 2);
						this.classWeight[index] = tempArr[0] + '.' + tempArr[1].substr(0, 3);
					} else {
						this.classWeight[index] = tempArr[0].substr(0, 2);
					}
					event.target.value = this.classWeight[index];
				} else if (this.listDel.weighType == 2) {
					this.classWeight[index] = val;
					let tempArr = val.split('.');
					if (tempArr.length == 2) {
						tempArr[0] = tempArr[0].substr(0, 3);
						this.classWeight[index] = tempArr[0] + '.' + tempArr[1].substr(0, 2);
					} else {
						this.classWeight[index] = tempArr[0].substr(0, 3);
					}
					event.target.value = this.classWeight[index];
				} else if (this.listDel.weighType == 1) {
					this.classWeight[index] = val;
					let tempArr = val.split('.');
					if (tempArr.length == 2) {
						tempArr[0] = tempArr[0].substr(0, 4);
						this.classWeight[index] = tempArr[0] + '.' + tempArr[1].substr(0, 1);
					} else {
						this.classWeight[index] = tempArr[0].substr(0, 4);
					}
					event.target.value = this.classWeight[index];
				} else {
					event.target.value = Math.floor(val);
					this.classWeight[index] = val;
				}
			},
			winEvent(str) {
				this.$emit('winEvent', str);
			},
			alert(con, title) {
				this.$store.commit('setWin', {
					title: title,
					winType: 'alert',
					content: con
				});
			}
		},
		components: {
			win: () =>
				import ( /*webpackChunkName: 'win'*/ 'src/components/win')
		}
	};
</script>
<style scoped>
	/* 打印条码弹窗样式 */

	#tan .general-goods {
		padding: 100px 150px;
	}

	#tan .general-goods input {
		height: 41px;
		text-indent: 10px;
	}

	#tan .tanTop {
		margin: 28px auto;
		width: 380px;
		white-space: nowrap;
		overflow: hidden;
	}

	#tan .tanTop .barName {
		float: left;
	}

	#tan .tanTop .barPice {
		float: right;
	}

	#tan .tanTop span {
		max-width: 110px;
		display: inline-block;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		font-size: 18px;
	}

	#tan .tanContent {
		width: 520px;
		height: 41px;
		margin: 28px auto;
		position: relative;
	}

	#tan .tanContent .barweight {
		float: left;
		margin-right: 60px;
	}

	#tan .tanContent .barNum {
		float: left;
	}

	#tan .tanContent p {
		width: 20px;
		height: 20px;
		position: absolute;
		right: -30px;
		top: 11px;
		margin: auto;
		cursor: pointer;
		background: url(../../../res/icon/icondelete.png) no-repeat;
	}

	#tan .tanContent span {
		font-size: 16px;
		margin-right: 10px;
	}

	#tan .tanContent input {
		width: 150px;
		height: 41px;
		text-indent: 10px;
	}
</style>