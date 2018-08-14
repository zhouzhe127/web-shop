<template>
	<win :align="'right'" :height="600" :width="560" @winEvent="funGetSelfWin">
		<span slot="title">口味详情</span>
		<div id="attr_sync_detail" class="tas-addtas" slot="content" v-cloak>
			<div class="tas-type">
				<p class="tas-text required fl" style="text-align: left;">类型</p>
				<span v-bind:class='{"sign":taste.attr == 0}'>单选口味</span>
				<span v-bind:class='{"sign":taste.attr == 1}'>多选口味</span>
				<p class="tas-text required fl" style="width: 70px;">排序</p>
			</div>
			<span class="attr-sort">
				<sub-add :minnum='1' :bindnum="taste.sort" :sign='false' @toClick="''"></sub-add>
			</span>
			<div class="taste-max">
				<div class="taste-editAttr" v-cloak>
					<div>
						<div class="tas-inputname">
							<label class="tas-text2 required fl">口味分組</label>
							<input type="text" readonly="readonly" v-model="taste.name" maxlength='10' />
						</div>
						<div class="tas-change" v-for="(item,index) in options" :key="index">
							<label class="tas-text2 required fl">口味名称</label>
							<input type="text" readonly="readonly" :value="item.name" maxlength='10' />
							<label class="tas-text2  fl" style="width: 64px;text-indent: 14px;">价格</label>
							<input type="text" :value="item.price" readonly="readonly" style="width: 100px;margin-left: 0px;" maxlength='6' />
						</div>
					</div>
				</div>
			</div>
		</div>
	</win>
</template>

<script>
	export default {
		data() {
			return {
				taste: {}, //单个口味
				options: [], //口味属性
			};
		},
		props: {
			pObj: null,
		},
		methods: {
			funGetSelfWin() {//res
				this.$emit('throwAttrSyncDetail');
			},
			initData() {
				this.taste = this.pObj;
				this.options = this.formatStr(this.taste.options);
			},
			//将口味属性转化为数组
			formatStr(str) {
				if (!str) return '';
				let temp = [];
				let arr = str.split('|');
				arr.forEach((ele) => {
					let sin = ele.split(':');
					let obj = {};
					obj = {
						name: sin[0],
						price: sin[1]
					};
					temp.push(obj);
				});
				return temp;
			}
		},
		// props: {
		// 	pObj: null,
		// },
		mounted() {
			this.initData();
		},
		components: {
			win: () =>
				import ( /*webpackChunkName:'win'*/ 'src/components/win'),
			subAdd: () =>
				import ( /*webpackChunkName:'subadd'*/ 'src/components/subadd'),
		}
	};
</script>
<style lang="less" scoped>
	/*  一级弹框   */

	.tas-addtas {
		height: 600px;
		background-color: #F2F2F2;
		padding: 30px;
		color: #333;
		width: 600px;
	}

	.tas-type {
		width: 100%;
		height: 40px;
		font-size: 0;
	}

	.tas-text,
	.tas-text2 {
		font-size: 14px;
		line-height: 40px;
		text-align: center;
		width: 54px;
	}

	.tas-text2 {
		width: 85px;
		text-align: left;
	}

	.tas-type span {
		width: 100px;
		height: 40px;
		background-color: #FFFFFF;
		display: inline-block;
		float: left;
		font-size: 14px;
		line-height: 40px;
		text-align: center;
	}

	.tas-type:first-child span {
		border: 1px solid #F1F1F1;
		cursor: pointer;
	}

	.tas-inputname,
	.tas-change {
		margin-top: 10px;
		overflow: hidden;
	}

	.tas-inputname input,
	.tas-change input,
	.tas-tastype a {
		border: none;
		width: 404px;
		height: 38px;
		outline: none;
		/* margin-left: 14px;*/
		padding: 0;
		text-indent: 16px;


	}

	.tas-tastype a {
		cursor: pointer;

	}

	.tas-change input {
		width: 180px;
		float: left;
		padding: 0;
	}

	.tas-tastype {
		margin: 10px;
		width: 504px;

	}

	.tas-add-text {

		background-color: #E7E7E7;
		width: 490px;
		clear: both;

	}

	.tas-add-content {
		line-height: 24px;
		margin-top: 10px;
	}


	.tas-tastype a {
		margin-left: -10px;

	}

	.cata-delete {
		display: inline-block;
		cursor: pointer;
		background: url(../../../res/icon/delete.png) center center no-repeat;
		height: 40px;
		width: 60px;
	}

	.attr-sort {
		position: absolute;
		width: auto;
		top: 80px;
		vertical-align: center;
		right: 30px;
	}
</style>