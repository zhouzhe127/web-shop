<template>
	<win :align="'center'" :width="width" :height="height" @winEvent="closeSelfWin" :ok="btnOk">
		<span slot="title">{{title}}</span>
		<div slot="content" id="unit-brand-win">
			<span :style="{'width':eleWidth}" :class="{'single':item.isSelect && radio,'mul-radio':item.isSelect && (!radio)}" @click="funSelectItem(item,index)" v-for="(item,index) in list" :key="index">{{item.name}}</span>
			<div class="none-tips" v-if="list.length==0">
				{{tips}}
			</div>
		</div>
	</win>
</template>
<script>
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				btnOk: {},
				btnCancel: {},
				width: 570,
				height: 220,
				title: '添加单位',
				eleWidth: 'auto', //元素的宽
				list: [], //所有的元素
				radio: false, //多选
				selectlist: [1], //选中的元素id
				tips: '没有该数据信息!',
			};
		},
		props: {
			pObj: null,
			/*
			    {
			        width:                  //Number    弹窗的宽
			        height:                 //Number    弹窗的高
			        title:'添加单位',        //弹窗的标题  
			        eleWidth:''             //Number    元素的宽      
			        list:                   //Array     所有的元素     [{id:元素的id,name:'元素的名字'}]   
			        selectlist:             //Array     选中的元素 元素可以是含有id,name属性的对象,也可以是id
			        radio:                  //Boolean   默认多选   true:单选     
			        tips:                   //当该数据不存在时的提示信息
			    }
			*/
		},
		methods: {
			closeSelfWin(res) {
				let arr = [];
				arr = this.list.filter((ele) => {
					return ele.isSelect;
				});
				arr = utils.deepCopy(arr);
				this.$emit('throwCommonWin', arr, res);
			},
			//选择元素
			funSelectItem(item, index) {
				if(this.radio) {
					let arr = [];
					if(!item.isSelect) {
						arr.push(item.id);
					}
					this.list = this.initSelectList(this.list, arr);
				} else {
					//多选
					item.isSelect = !item.isSelect;
					this.list.splice(index, 1, item);
				}
			},
			//获取选中的元素id
			getSelectList(arr) {
				let ids = [];
				if(typeof arr[0] == 'object') {
					ids = arr.map((ele) => {
						return ele.id;
					});
				} else {
					if(arr) ids = arr;
				}
				return ids;
			},
			//初始化list选中的元素
			initSelectList(list, selectlist) {
				let arr = list.map((ele) => {
					let flag = selectlist.some((id) => {
						if(ele.id == id) {
							ele.isSelect = true;
							return true;
						}
					});
					if(!flag) ele.isSelect = false;
					return ele;
				});
				return arr;
			},
			initData() {
				if(typeof this.pObj == 'object') {
					for(let attr in this.pObj) {
						if(this.pObj[attr]) {
							this[attr] = this.pObj[attr];
						}
					}
				} else {
					throw new Error('参数错误');
				}
				this.selectlist = this.getSelectList(this.selectlist);
				this.list = this.initSelectList(this.list, this.selectlist);
			},
			initBtn() {
				this.btnOk = {
					style: 'background-color:#f8941f',
					content: '确定'
				};
			},
		},
		mounted() {
			this.initData();
			this.initBtn();
		},
		watch: {
			pObj: {
				handler: function() {
					this.initData;
				},
				deep: true
			}
		},
		components: {
			win: () =>
				import( /*webpackChunkName:'win'*/ 'src/components/win'),
		}
	};
</script>
<style lang='less' scoped>
	#unit-brand-win {
		padding: 20px 55px;
		.none-tips {
			color: #f7ab53;
			font-size: 20px;
			text-align: center;
			margin-top: 50px;
		}
		span {
			margin-right: 10px;
			margin-bottom: 10px;
			height: 40px;
			min-width: 100px;
			padding: 0 15px;
			float: left;
			text-align: center;
			line-height: 40px;
			vertical-align: middle;
			border: 1px solid #d2d2d2;
			color: #333;
			font-size: 14px;
			cursor: pointer;
		}
		.single {
			border: 1px solid transparent;
			border: 1px solid #f8931f;
			color: #f8931f;
		}
		.mul-radio {
			border: 1px solid transparent;
			border: 1px solid #f8931f;
			color: #f8931f;
			background: url('../../../res/images/sign.png') right bottom no-repeat
		}
	}
</style>