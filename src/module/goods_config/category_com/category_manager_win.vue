<template>
	<div>
		<win @winEvent="closeSelfWin" :align="'center'" :width="580" :height="300">
			<span slot="title">{{title}}</span>
			<div id="tan" slot="content" v-cloak>
				<section style="margin-top:20px;">
					<el-form label-width="120px">
						<el-form-item label="分类名"  required>
							<el-input v-model="categoryName" maxlength="20" placeholder = "请输入分类名" style="width:250px;"></el-input>
						</el-form-item>
						<el-form-item v-if="ischain=='0'||ischain=='3'" label="分类编码" >
							<el-input v-model="code" maxlength="20" placeholder = "请输入分类编码" style="width:250px;"></el-input>
						</el-form-item>
						<el-form-item v-if="(ischain=='1'||ischain=='2') && code!=''" label="分类编码" >
							<span >{{code}}</span>
						</el-form-item>
						<el-form-item required label="排序">
							<el-input-number v-model="sort" @change="changeSort" style="width:150px;" :min="1" :max="255"></el-input-number>
						</el-form-item>
					</el-form>
				</section>
			</div>
		</win>
	</div>

</template>
<script>
	import global from 'src/manager/global';
	import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				title: '', //弹窗的标题
				sort: null, //排序值
				categoryName: '', //分类名
				code:'',//分类编码
				ischain:''
			};
		},
		props: {
			pObj: null, //传递的数据
			/*
			    pObj:
			        {
			            categoryName:           分类名
			            sort:                   排序值
						title:                  标题
						code:'',//分类编码
			        }
			*/
		},
		mounted() {
			this.initData();
			this.userData = storage.session('userShop');
			this.ischain = this.userData.currentShop.ischain;
		},
		methods: {
			initData() {
				if (typeof this.pObj == 'object') {
					for (let attr in this.pObj) {
						this[attr] = this.pObj[attr];
					}
				}
			},
			//获取排序的结果
			changeSort(res) {
				this.sort = res;
			},
			//合格返回true
			checkForm() {
				this.categoryName = this.categoryName.trim();
				if (!global.checkData({
					categoryName: {
						//"$$.length>0 && $$.length<=20 && ((/^[^'\"&$?\\s!]+$/).test($$))"
						cond: `$$.length>0 && $$.length<=20 && ((/^[^'"&$?\\s!]+$/).test($$))`,
						pro: '请输入分类名,且不能含有特殊字符!'
					},
					sort: {
						reg: /^[1-9]\d{0,2}$/,
						pro: '排序数字在0-256之间!'
					}
				}, this)) return false;
				return true;
			},
			//获取弹窗的点击结果
			closeSelfWin(res) {
				if (res == 'ok') {
					if (!this.checkForm()) return;
					this.$emit('throwWinResult', res, this.categoryName, this.sort,this.code);
				} else {
					this.$emit('throwWinResult', res);
				}
			},
		},
		components: {
			subAdd: () =>
				import ( /*webpackChunkName:'subadd'*/ 'src/components/subadd'),
			win: () =>
				import ( /*webpackChunkName:'win'*/ 'src/components/win')
		},

	};
</script>
<style type="text/css" scoped>
	#tan .tanbox {
		width: 100%;
		height: 40px;
		margin-left: 50px;
	}

	#tan .tanbox .oH3 {
		float: left;
		width: 80px;
		height: 40px;
		line-height: 40px;
		text-align: right;
		font-size: 16px;
		margin-right: 20px;
	}

	#synchronousTan .cList {
		width: 100%;
		border: 1px solid #cdcdcd;
		border-left: 120px solid #F8F8F8;
		position: relative;
		margin-top: 20px;
	}

	#synchronousTan .cList .title {
		width: 120px;
		color: #323232;
		text-align: center;
		position: absolute;
		top: 50%;
		left: -120px;
		line-height: 100%;
		font-size: 18px;
		transform: translateY(-50%);
		-ms-transform: translateY(-50%);
		-moz-transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		-o-transform: translateY(-50%);
		padding: 5px 10px;
		z-index: 5;

	}

	#synchronousTan .cList .oUl {
		width: 100%;
		min-height: 60px;
		padding: 10px 20px;
		overflow: hidden;
		border-left: 1px solid #cdcdcd;
	}

	#synchronousTan .cList .oLi {
		height: 40px;
		min-width: 80px;
		line-height: 40px;
		float: left;
		text-align: center;
		padding: 0 10px;
		color: #555555;
		cursor: pointer;
	}

	#synchronousTan .oLi .addinput {
		width: 165px;
		height: 34px;
		float: left;
		border: 1px solid #cdcdcd;
		margin-top: 15px;
		display: none;
	}

	#synchronousTan .oLi .oDiv {
		width: 34px;
		height: 32px;
		border-left: 1px solid #cdcdcd;
		float: right;
	}

	#synchronousTan .openoperation {
		display: none;
	}

	#synchronousTan .title:hover .openoperation {
		display: block;
	}

	#synchronousTan .oLi:hover .openoperation {
		display: block;
	}

	#synchronousTan .addclassification {
		width: 210px;
		height: 45px;
		background-color: #29A7E1;
		margin-top: 30px;
		cursor: pointer;
	}

	#synchronousTan .addclassification img {
		width: 22px;
		height: 22px;
		margin-top: 9px;
		margin-left: 34px;
		float: left;
	}

	#synchronousTan .addclassification h3 {
		width: 120px;
		height: 45px;
		line-height: 45px;
		color: #fff;
		text-align: center;
		float: left;
	}

	#synchronousTan .borderTop {
		width: 122px;
		height: 100%;
		border-left: 1px solid #cdcdcd;
		position: absolute;
		top: -1px;
		left: -120px;
		border-top: 1px solid #cdcdcd;
	}

	#synchronousTan .borderBottom {
		width: 122px;
		height: 100%;
		border-left: 1px solid #cdcdcd;
		position: absolute;
		bottom: -1px;
		left: -120px;
		border-bottom: 1px solid #cdcdcd;
	}

	.brand span:nth-child(2),
	.brand span:nth-child(4) {
		display: inline-block;
		width: 20px;
		height: 20px;
		text-align: center;
		border-radius: 20px;
		vertical-align: middle;
	}

	.isbrand {
		color: #ffddab;
	}

	.isshop {
		color: #a4e2fc;
	}
</style>