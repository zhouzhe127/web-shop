<template>
	<win :align="'center'" :width="width" :height="height" @winEvent="closeSelfWin" :ok="btnOk">
		<span slot="title">{{title}}</span>
		<div slot="content" id="unit-brand-win">
			<template v-if="radio">
				<span class="radio-box" v-for="item in list" :key="item.id">
					<el-radio v-model="idList" :label="item.id" border>{{item.name}}</el-radio>
				</span>
			</template>
			<template v-if="!radio">
				<span class="radio-box" v-for="item in list" :key="item.id">
					<el-checkbox v-model="idList" :label="item.id" border>{{item.name}}</el-checkbox>
				</span>
			</template>
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
				btnOk: {
					content: '确定',
				},
				width: 570,
				height: 220,
				title: '添加单位',
				eleWidth: 'auto', //元素的宽
				list: [], //所有的元素
				radio: false, //多选
				selectlist: [], //选中的元素id
				idList:[],//选中的id列表
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
				if(this.radio){
					arr = this.list.filter((ele) => {
						return ele.id==this.idList;
					});
				}else{
					for(let item of this.idList){
						for(let res of this.list){
							if(item==res.id){
								arr.push(res);
								break;
							}
						}
					}
				}
				arr = utils.deepCopy(arr);
				this.$emit('throwCommonWin', arr, res);
			},
			initData() {
				if(typeof this.pObj == 'object') {
					for(let attr in this.pObj) {
						if(this.pObj[attr]) {
							this[attr] = this.pObj[attr];
						}
					}
				}
				if(this.radio){
					this.idList = this.selectlist.id;
				}else{
					this.idList = this.selectlist.map((res)=>{
						return res.id;
					});
				}
			},
		},
		mounted() {
			this.initData();
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
				import( /*webpackChunkName:'win'*/ 'src/components/win_element'),
		}
	};
</script>
<style lang='less' scoped>
	#unit-brand-win {
		padding: 20px;
		.none-tips {
			color: #f7ab53;
			font-size: 20px;
			text-align: center;
			margin-top: 50px;
		}
		span {
			margin-right: 10px;
			margin-bottom: 10px;
			display: inline-block;
		}
	}
</style>