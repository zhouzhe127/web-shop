<template>
	<div>
		<win @winEvent="getDetail" :align="'right'" :width="600" :height="660" :ok="okStyle" :cancel="cancelStyle">
			<span slot="title">{{title}}</span>
			<div id="weighTan" slot="content" v-cloak>
				<div v-if="type == 1">
					<h2 class="tag">配置名称:</h2>
					<div class="mes">{{list.name}}</div>
					<div class="clear"></div>
					<h2 class="tag">识别码设置:</h2>
					<div class="mes">{{list.code}}</div>
					<div class="clear"></div>
					<h2 class="tag">重量单位:</h2>
					<div class="mes">{{list.weightCompany}}</div>
					<div class="clear"></div>
					<h2 class="tag">重量格式:</h2>
					<div class="mes weightType">{{list.weighType}}</div>
					<div class="clear"></div>
					<h2 class="tag">价格格式:</h2>
					<div class="mes weightType">{{list.priceType}}</div>
					<div class="clear"></div>
					<h2 class="tag">价格取整:</h2>
					<div class="mes">{{list.priceRound}}</div>
					<div style="width: 100%; clear: both;"></div>
				</div>
				<div v-else>
					<h2 class="tag">配置名称</h2>
					<div class="mes">
						<input type="text" placeholder="输入配置名称" v-model="list.name" maxlength="10" />
					</div>
					<div class="clear"></div>
					<h2 class="required tag">识别码设置</h2>
					<div class="mes">
						<span v-if="edit" style="padding-left: 12px;">{{list.code}}</span>
						<input v-else type="text" placeholder="输入识别码（2位,从1开始）" v-model="list.code" onkeyup="value=value.replace(/[^\d]/g,'')" style="width: 210px;"
						    maxlength="2" />
					</div>
					<div class="clear"></div>
					<h2 class="required tag">重量单位</h2>
					<div class="mes">
						<radiobtn @selOn="editWeightCompany" :list="weightList" :index="list.weightCompany" :name='"name"'></radiobtn>
					</div>
					<div class="clear"></div>
					<h2 class="required tag">重量格式</h2>
					<div class="mes weightType">
						<radiobtn @selOn="editWeighType" :list="typeList" :index="list.weighType" :name='"name"'></radiobtn>
					</div>
					<div class="clear"></div>
					<h2 class="required tag">价格格式</h2>
					<div class="mes weightType">
						<radiobtn @selOn="editPriceType" :list="priceList" :index="list.priceType" :name='"name"'></radiobtn>
					</div>
					<div class="clear"></div>
					<h2 class="required tag">价格取整</h2>
					<div class="mes">
						<radiobtn @selOn="editPriceRound" :list="round" :index="list.priceRound" :name='"name"'></radiobtn>
					</div>
					<div style="width: 100%; clear: both;"></div>
				</div>
			</div>
		</win>
	</div>



</template>

<script>
	export default {
		data() {
			return {
				title: '',
				edit: false,
				list: {
					name: '', //名称
					code: '', //识别码
					weightCompany: -1, //选中重量单位
					weighType: -1, //选中重量格式
					priceType: -1, //选中价格格式
					priceRound: -1, //选中价格取整
				},
				weightList: [{
					name: 'g'
				},
				{
					name: 'Kg'
				}],
				typeList: [{
					name: '保留小数点前一位（如：XXX.）'
				},
				{
					name: '保留小数点后一位（如：XXX.X）'
				},
				{
					name: '保留小数点后两位（如：XXX.XX）'
				},
				{
					name: '保留小数点后三位（如：XX.XXX）'
				}],
				priceList: [{
					name: '保留小数点前一位（如：￥XXX.）'
				},
				{
					name: '保留小数点后一位（如：￥XXX.X）'
				},
				{
					name: '保留小数点后两位（如：￥XXX.XX）'
				}],
				round: [{
					name: '四舍五入'
				},
				{
					name: '上取整'
				},
				{
					name: '下取整'
				}],
				okStyle: null,
				cancelStyle: null
			};
		},
		props: {
			configList: Object,
			type: Number //1表示查看详情 2表示新增 3表示编辑
		},
		methods: {
			getDetail(res) {
				if ((this.type == 2 || this.type == 3) && res == 'ok') {
					let list = this.list;
					if (list.name == '') {
						this.errorShow('请输入名称');
						return false;
					}
					if (list.code.length < 2 || list.code < 10) {
						this.errorShow('识别码请输入大于10的两位整数');
						return false;
					}
					if (list.weightCompany == -1) {
						this.errorShow('请选择重量单位');
						return false;
					}
					if (list.weighType == -1) {
						this.errorShow('请选择重量格式');
						return false;
					}
					if (list.priceType == -1) {
						this.errorShow('请选择价格格式');
						return false;
					}
					if (list.priceRound == -1) {
						this.errorShow('请选择价格取整');
						return false;
					}
				}
				this.$emit('detail', res, this.list);
			},
			errorShow(content) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: content
				});
			},
			//重量单位选择
			editWeightCompany(res) {
				this.list.weightCompany = res;
			},
			//重量格式选择
			editWeighType(res) {
				this.list.weighType = res;
			},
			//价格格式选择
			editPriceType(res) {
				this.list.priceType = res;
			},
			//价格取整选择
			editPriceRound(res) {
				this.list.priceRound = res;
			}
		},
		mounted() {
			this.okStyle = {
				content: '确定',
				style: {
					background: '#f8941f'
				}
			};
			if (this.type == 1) {
				this.title = '称重商品类型详情';
				this.list.name = this.configList.name;
				this.list.code = this.configList.code;
				this.list.weightCompany = this.configList.weightCompany;
				this.list.weighType = this.typeList[this.configList.weighType].name;
				this.list.priceType = this.priceList[this.configList.priceType].name;
				this.list.priceRound = this.round[this.configList.priceRound].name;
			} else if (this.type == 2) {
				this.title = '新建称重商品类型';
			} else {
				this.cancelStyle = {
					content: '删除',
					style: {
						background: '#c33'
					}
				};
				this.title = '修改称重商品类型';
				this.edit = true;
				setTimeout(() => {
					this.list = this.configList;
					this.list.weightCompany = this.configList.weightCompany == 'g' ? 0 : 1;
				});
			}

		},
		components: {
			win: () =>
				import ( /*webpackChunkName: 'win'*/ 'src/components/win'),
			radiobtn: () =>
				import ( /*webpackChunkName: 'radio_btn'*/ 'src/components/radio_btn')
		}
	};
</script>
<style lang="less">
	#weighTan {
		.selectbtns {
			span {
				width: 100px;
				height: 40px;
				border: 1px solid #CECDCD;
				background-color: #FFFFFF;
				color: #333333;
				margin-right: 10px;
				padding-left: 12px;
			}
			.sign {
				background: #FFF3E4;
				border: 1px solid #FF9800;
				color: #FF9800;
			}
		}
		.weightType {
			.selectbtns {
				span {
					width: 400px;
					text-align: left;
					margin-right: 0;
					margin-bottom: 5px;
				}
			}
		}
	}
</style>

<style lang="less" scoped>
	#weighTan {
		width: 580px;
		min-height: 480px;
		height: auto;
		padding-top: 20px;
		.clear {
			clear: both;
			font-size: 0;
			line-height: 0;
			height: 20px;
			width: 100%;
		}
		.tag {
			float: left;
			width: 102px;
			height: 40px;
			line-height: 40px;
			text-align: right;
			color: #333333;
			font-size: 16px;
		}
		.mes {
			float: left;
			width: 420px;
			height: auto;
			padding-left: 15px;
			line-height: 40px;
			font-size: 16px;
			input {
				height: 38px;
				width: 390px;
				border: 1px solid #CECDCD;
				padding-left: 12px;
			}
		}
	}
</style>