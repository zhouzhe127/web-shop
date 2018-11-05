<!--
    **添加公式
    *
    * 黄一帆
    * *
    *
-->
<template>
	<win :align="'center'" :width="600" :height="360" :ok="btnOk" @winEvent="closeSelfWin">
		<span slot="title">{{title}}</span>
		<div class="add-column" slot="content">
			<div class="inp-block">
				<span class="inp-name">名称</span>
				<div class="right">
					<el-input placeholder="输入名称" class="inp-class"></el-input>
				</div>
				<div class="right">
					<el-popover
						placement="bottom"
						width="550"
						trigger="click"
						v-model="visible">
						<div class="column-container">
							<el-radio-group v-model="columnTabIndex">
								<el-radio-button label="0">标准项</el-radio-button>
								<el-radio-button label="1">公式项</el-radio-button>
								<el-radio-button label="2">表列项</el-radio-button>
							</el-radio-group>
							<div class="radio-container" v-show="columnTabIndex==0">
								<div class="radio-box" v-for="item in baseList" :key="item.id">
									<el-button border @click="addItem(item.name)">{{item.name}}</el-button>
								</div>
							</div>
							<div class="radio-container" v-show="columnTabIndex==1">
								<div class="radio-box" v-for="i in 20" :key="i">
									<el-button border @click="addItem('标准项'+i)">标准项</el-button>
								</div>
							</div>
						</div>
						<el-button slot="reference" class="btn-class">
							选择统计项<i class="el-icon-arrow-down el-icon--right"></i>
						</el-button>
					</el-popover>
				</div>
			</div>
			<div class="tips">
				<i class="el-icon-warning"></i>
				计算公式中可对字段和数字，使用 + - * / ( ) 进行计算
			</div>
			<!-- 编辑框 -->
			<div class="edit-container" contenteditable="true" ref="itemEdit"></div>
			<!-- 规则选项 -->
			<div class="other">
				<div class="other-item">
					<el-select v-model="percent" placeholder="计算结果" class="btn-class">
					    <el-option
							v-for="item in formulaPercent"
							:key="item.value"
							:label="item.label"
							:value="item.value">
					    </el-option>
					</el-select>
				</div>
				<div class="other-item">
					保留
					<el-select v-model="reserve" placeholder="请选择" style="width:100px;">
					    <el-option
							v-for="item in formulaReserve"
							:key="item.value"
							:label="item.label"
							:value="item.value">
					    </el-option>
					</el-select>
					位小数
				</div>
				<div class="other-item">
					<el-select v-model="rounding" placeholder="舍入规则" class="btn-class">
					    <el-option
							v-for="item in formulaRounding"
							:key="item.value"
							:label="item.label"
							:value="item.value">
					    </el-option>
					</el-select>
				</div>
			</div>
		</div>
	</win>
</template>
<script>
//该组件直接在组件内容调用接口，请求仓库数据

import http from 'src/manager/http';

export default {
	data() {
		return {
			title: '添加公式项',
			btnOk: {
				content: '确定'
			},
			btnCancel: {},
			sort:0,//排序
			columnTabIndex:0,
			columnItem:'',//选择项
			visible:false,//选择列表项是否显示

			showCom:false,//显示选择仓库弹窗
			comObj:{//仓库弹窗传入数据
				isMultiple:true,
			},
			wareList:[],//选中的仓库列表
			storeList:[],//已选中的店铺列表
			wareName:'',
			storeName:'',
			formulaPercent:[//是否半分比
				{label:'数字',value:false},
				{label:'百分百',value:true},
			],
			formulaReserve:[//保留几位小数
				{label:'0',value:0},
				{label:'1',value:1},
				{label:'2',value:2},
				{label:'3',value:3},
			],
			formulaRounding:[//舍入规则
				{label:'四舍五入',value:0},
				{label:'向上取值',value:1},
				{label:'向下取值',value:2},
			],
			percent:'',//是否百分百 true百分百 false数字
			reserve:'',//保留几位小数
			rounding:'',//舍入规则
			baseList:[
				{id:1,name:'入库量'},
				{id:2,name:'总量'},
				{id:3,name:'消耗量'},
			],
			formulaList:[],
			formulaObj:{},

			id:0,//公式id
			name:'',//公式名称
			isPercent:'',//是否百分百
			carryRule:'',//舍入规则
			reserveRule:'',//保留几位小数
			baseParam:'',//基础字段id
			formula:'',//计算公式
		};
	},
	props: {
		pObj: null,
		//base:[],			//基础项列表
		//formula:[],		//公式项列表
	},
	watch:{

	},
	mounted() {
		this.initData();
	},
	components: {
		win: () =>
			import( /*webpackChunkName:'win_element'*/ 'src/components/win_element'),
		selWarehouse: () => 
			import( /*webpackChunkName:'warehouse_select'*/ 'src/module/invoicing_system/warehouse_manage/warehouse_select'),
	},
	methods: {
		closeSelfWin(res) {
			if(res == 'ok') {
				this.computeFormula();
			} else {
				this.$emit('emit', false);
			}
		},
		//初始化数据
		initData(){
			//this.baseList = this.pObj.base?this.pObj.base:[];
			//this.formulaList = this.pObj.formula?this.pObj.formula:[];
		},
		//新建公式项
		async addFormula(send){
			let obj={
				id:this.id,
				name:this.name,
			};
			obj = Object.assign(obj,send);
			console.log(obj);
			let data = await http.getShopList();
			if(data){
				//
			}
		},
		computeFormula(){
			//替换中文括号
			let formulaStr = this.$refs.itemEdit.innerHTML;
			formulaStr = formulaStr.replace(/(（|）)/g,function(match,p1){
				if(p1=='（') return '(';
				if(p1=='）') return ')';
			});
			//去除复制文本代入的html标签 去除空格
			formulaStr = formulaStr.replace(/<.+?>|\s/g,'');
			if(!this.veriFormula(formulaStr)) return;

			let baseArr = [];
			formulaStr = formulaStr.replace( /【(.*?)】/g,(match,p1)=>{
				let baseItem = this.baseList.filter((item)=>{
					return item.name==p1;
				});
				if(baseItem.length){
					baseArr.push(baseItem[0].id);
					return `id_${baseItem[0].id}`;
				}else{
					return `【${p1}】`;
				}
			});
			if(/【(.*?)】/.test(formulaStr)){
				let noMarch = formulaStr.match(/【(.*?)】/g).join(',');
				this.$message({message: `公式中基础项名称不匹配: ${noMarch}`,type: 'error'});
				return false;
			}
			this.formulaObj={
				formula:formulaStr,//计算公式
				isPercent:this.percent,//是否百分百 true百分百 false数字
				reserveRule:this.reserve,//保留几位小数
				carryRule:this.rounding,//舍入规则
				baseParam:baseArr.join(','),//基础项
			};
			this.addFormula(this.formulaObj).then(()=>{
				this.$emit('emit',this.formulaObj);
			});
		},
		//验证公式的正确性
		veriFormula(formulaStr){
			//检测公式是否为空
			if(!formulaStr){
				this.$message({message: '计算公式不能为空',type: 'error'});
				return false;
			}
			//检测是否出现连续的运算符
			let regComp = /[-+*/][-+*/]/;
			if(regComp.test(formulaStr)){
				this.$message({message: '计算公式不能出现连续的运算符',type: 'error'});
				return false;
			}
			//检测括号是否闭合
			let regBrackets = /[()]/g;
			let bracketsArr = formulaStr.match(regBrackets);
			if(bracketsArr){
				let leftBrackets=0,rightBrackets=0;
				for(let item of bracketsArr){
					if(item=='(') leftBrackets++;
					if(item==')') rightBrackets++;
				}
				if(leftBrackets!=rightBrackets){
					this.$message({message: '计算公式括号未闭合，请检查公式',type: 'error'});
					return false;
				}
			}
			//替换检测
			let regItem = /【.*?】/g;
			//检测是否出现单独的数字 如：【入库量】123
			let alone = formulaStr.replace(regItem,'ALONE');
			let regAloneNum = /[-+*/](?=\d+)|(?<=\d+)[-+*/]|\(\d+\)|ALONE[-+*/]ALONE/;
			if(!regAloneNum.test(alone)){
				this.$message({message: '计算公式不能出现单独的数字或计算公式，需要配合运算符',type: 'error'});
				return false;
			}
			//检测是否出现非法字符
			let mock = formulaStr.replace(regItem,1);
			let regNoNum = /[^0-9-+*/.()]/;
			if(regNoNum.test(mock)){
				this.$message({message: '计算公式不合法，请检查公式',type: 'error'});
				return false;
			}
			//检测公式名称
			if(!this.name){
				this.$message({message: '请填写计算公式名称',type: 'error'});
				return false;
			}
			//最终检测-带入程序计算 看程序是否报错
			try {
				eval(mock);
			} catch (error) {
				this.$message({message: '计算公式存在不合法，请检查公式',type: 'error'});
				return false;
			}
			return true;
		},
		//添加标准项
		addItem(res){
			this.visible = false;
			
			let sel = window.getSelection();
			let range = sel.rangeCount>0?sel.getRangeAt(0):'';
			let sCon = range?range.startContainer:'';
			let field = `【${res}】`;
			if(sCon && sCon.parentElement.className=='edit-container'){//焦点必须在编辑框内
				sel.removeAllRanges();
				//获得Range中的第一个html结点 
				let container = range.startContainer; 
				//获得Range起点的位移 
				let pos = range.startOffset; 
				//建一个空Range 
				range = document.createRange(); 
				//插入内容 
				let cons = document.createTextNode(field);
				if(container.nodeType == 3){// 如是一个TextNode 
					container.insertData(pos, cons.nodeValue);
					range.setEnd(container, pos + cons.nodeValue.length); 
					range.setStart(container, pos + cons.nodeValue.length); 
				}else{//如果是一个HTML Node 
					let afternode = container.childNodes[pos]; 
					container.insertBefore(cons, afternode); 
					range.setEnd(cons, cons.nodeValue.length); 
					range.setStart(cons, cons.nodeValue.length);
				} 
				sel.addRange(range);
			}else{
				this.$refs.itemEdit.appendChild(document.createTextNode(field));
				this.$refs.itemEdit.focus();
				let appendRange = window.getSelection();
				appendRange.selectAllChildren(this.$refs.itemEdit);
				appendRange.collapseToEnd();
			}
		},
	},
};
</script>
<style lang='less' scoped>
	.add-column{
		.inp-class{width: 340px;}
		.btn-class{width: 150px;
			input{cursor: pointer;}
		}
		padding: 20px;padding-bottom:0;
		.inp-block{overflow: hidden;
			.inp-name{float: left;width: 50px;height: 40px;line-height:40px;
				padding-right: 15px;position: relative;
				&:after{
					content: '*';
					position: absolute;
					right: 5px;top: -1px;
					color: red;
				}
			}
			.right{float: left;padding-left: 10px;}
			.btn-box{float: left;padding-right: 20px;}
		}
		.tips{
			padding: 15px 0;padding-left: 60px;color: #FF0000;
			i{color: #FF0000;font-size: 14px;}
		}
		.edit-container{
			width: 100%;height: 200px;
			border: 1px solid #dcdfe6;
			padding: 15px;
			border-radius:5px; 
			line-height: 1.5;
			font-size: 14px;
			&:focus{
				outline: none;
				border: 1px solid #E1BB4A;
				transition: 0.5s all;
			}
		}
		.other{overflow: hidden;
			padding-top: 15px;
			.other-item{float: left;margin-right: 30px;
				&:last-child{margin-right: 0;}
			}
		}
	}
	.el-popper{
		.column-container{
			padding: 0 20px;
			
		}
		.radio-container{
			height: 250px;
			overflow: auto;
			border-bottom: 1px solid #dcdfe6;
			margin: 10px 0;
			.radio-box{
				display: inline-block;
				margin-right: 10px;
				margin-bottom: 10px;
			}
		}
		.handle{text-align: right;}
	}
</style>