<!--
    **用户标签
    *
    * 
    * *miaochuan.sha
    *
-->
<template>
	<Win :width='591' :height='326' @winEvent='getAppliedWin' :align="'center'" :ok="okStyle" :cancel="cancelStyle">
		<span slot="title">{{title}}</span>
		<div id="tan" slot="content" v-cloak>
			<div class="mobilePhone">
				<div class="phoneBox">
					<div class="leftHalf required">
						标签名称
					</div>
					<div class="rightHalf">
						<input type="text" class="txt" placeholder="请输入名称" v-model="name" maxlength="20" />
					</div>
				</div>
				<div class="phoneBox">
					<div class="leftHalf required">
						类型
					</div>
					<div class="rightHalf">
						<div class="pagWay">
							<span v-for="(item,index) in payWays" :key="index" @click="changeRadio(item)" :class="{'sign':payType==item.id}">{{item.name}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Win>
</template>
<script>

	import http from 'src/manager/http';

	export default {
		data() {
			return {
				title: '',
				okStyle: null,
				cancelStyle: null,
				payWays: [{
					id: 0,
					name: '用户'
				}, {
					id: 1,
					name: '工作人员'
				}], //类型
				payType: 0,
				name: '' //标签名称
			};
		},
		props: {
			type: String, //状态
			labeldetail: Object, //详情
		},
		methods: {
			async getAppliedWin(res) {
				if (res == 'ok') {
					let test = this.jtrim(this.name);
					if (test == '') { //库内容为空
						this.$store.commit('setWin', {
							content: '请输入标签名字',
							winType: 'alert',
							title: '操作提示',
						});
						return false;
					}
					if (this.type == 'view') {
						await this.addOrEdits('', this.name, this.payType);
					} else if (this.type == 'edi') {
						await this.addOrEdits(this.labeldetail.id, this.name, this.payType);
					}
				}
				this.$emit('getAppliedWin', res);
			},
			//开关
			changeRadio: function (item) {
				let id = item.id;
				this.payType = id;
			},
			jtrim: function (s) {
				return s.replace(/(^\s*)|(\s*$)/g, ''); //            /(^\s*)|(\s*$)/g    ，其中开头为任意多个空，或者最后为多个空
			},
			async addOrEdits(tagId, tagName, tagType) {
				let data = await http.addOrEdit({
					data: {
						tagId: tagId,
						tagName: tagName,
						tagType: tagType
					}
				});
				return data;
			}
		},
		computed: {

		},
		components: {
			Win: () =>
				import ( /* webpackChunkName:'win' */ 'src/components/win')
		},
		mounted() {
			if (this.type == 'edi') {
				this.name = this.labeldetail.name;
				this.payType = Number(this.labeldetail.type);
				this.title = '编辑用户标签';
				this.okStyle = {
					content: '保存',
					style: {
						backgroundColor: '#FF9800',
						color: '#fff'
					}
				};
				this.cancelStyle = {
					content: '取消',
					style: {
						backgroundColor: '#A0A0A0',
						color: '#fff'
					}
				};
			} else if (this.type == 'view') {
				this.title = '新增用户标签';
				this.okStyle = {
					content: '确定',
					style: {
						backgroundColor: '#FF9800',
						color: '#fff'
					}
				};
				this.cancelStyle = {
					content: '取消',
					style: {
						backgroundColor: '#A0A0A0',
						color: '#fff'
					}
				};
			}
		}
	};
</script>
<style scoped>
	.mobilePhone {
		margin: 63px 0 0 66px;
		box-sizing: border-box;
	}

	.mobilePhone .phoneBox {
		width: 100%;
		height: auto;
		overflow: hidden;
		margin-bottom: 61px;
	}

	.mobilePhone .phoneBox .leftHalf {
		width: 80px;
		height: 40px;
		text-align: right;
		line-height: 40px;
		float: left;
		margin-right: 12px;
	}

	.mobilePhone .phoneBox .rightHalf {
		width: 300px;
		height: auto;
		float: left;
	}

	.mobilePhone .phoneBox .rightHalf .txt {
		width: 209px;
		height: 38px;
		border: 1px solid #D2D2D2;
		text-indent: 17px;
		margin-right: 6px;
		outline: none;
	}

	.mobilePhone .instructions {
		width: 383px;
		height: 40px;
		color: #A5A5A5;
		float: left;
	}

	.mobilePhone .pagWay {
		float: left;
		display: inline-block;
	}

	.mobilePhone .pagWay .sign {
		border-color: #FF9800;
		color: #FF9800;
	}

	.mobilePhone .pagWay span {
		width: 100px;
		height: 40px;
		display: inline-block;
		padding: 0 15px;
		text-align: center;
		line-height: 40px;
		border: 1px solid #D2D2D2;
		cursor: pointer;
		margin-right: 9px;
	}
</style>