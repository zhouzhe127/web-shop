<template>
	<win :align="'center'" @winEvent="closeSelfWin" :ok="btnOk" :cancel="btnCancel" :height="height" :width="width">
		<span slot="title">{{title}}</span>
		<div slot="content" id="unit-create-edit">
			<div class="input-content">
				<span class="required">{{tagName}}</span>
				<input type="text" v-model="name" class="input" :placeholder="tips" :maxlength="len">
			</div>
		</div>
	</win>
</template>
<script>
	export default {
		data() {
			return {
				btnOk: {},
				btnCancel: {},
				tagName: '单位名称',
				name: '',
				len: 6,
				height: 200,
				width: 545,
				title: '',
				tips: '',
				attrs: ['height', 'width', 'title', 'tips', 'len', 'btnOk', 'btnCancel', 'tagName', 'name'],
			};
		},
		props: {
			pObj: null,
			/*
			    {
			        title:''                //弹窗的标题
			        height:200,             //弹窗的高
			        width:545,              //弹窗的宽
			        tagName:'单位名称',      //标签名
			        name:''                 //需要展示的名字
			        len:'6',                //长度限制
			        tips:'',                //文本框中的提示
			        btnOk:{},               //确认按钮
			        btnCancel:cancel:{}     //取消按钮
			    }
			*/
		},
		methods: {
			closeSelfWin(res) {
				let obj = {
					name: '',
				};
				if(res == 'ok') {
					obj.name = this.name;
				}
				this.$emit('throwCommonWin', obj, res);
			},
			initData() {
				if(typeof this.pObj == 'object') {
					for(let key of this.attrs) {
						if(this.pObj[key]){
							this[key] = this.pObj[key];	
						}
					}
				}
			},
		},
		mounted() {
			this.initData();
		},
		components: {
			win: () =>
				import( /*webpackChunkName:'win'*/ 'src/components/win'),
		}
	};
</script>
<style lang='less' scoped>
	#unit-create-edit {
		padding-top: 80px;
		padding-left: 120px;
		.input-content {
			display: inline-block;
			width: 300px;
			span {
				font-size: 14px;
				color: #333;
				vertical-align: middle;
				line-height: 40px;
			}
			.input {
				display: inline-block;
				vertical-align: middle;
				line-height: 40px;
				width: 210px;
				color: #333;
				font-size: 14px;
				border: 1px solid #ccc;
				margin-top: -3px;
				margin-left: 7px;
			}
		}
	}
</style>