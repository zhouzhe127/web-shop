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
			<div class="loding-container" v-loading="loading">
				<div class="inp-block">
					<span class="inp-name">名称</span>
					<div class="right">
						<el-input placeholder="输入名称" class="inp-class" v-model="name" max-length="20" ref="nameDom"></el-input>
					</div>
					<div class="right">
						<el-popover
							placement="bottom"
							width="550"
							trigger="click"
							v-model="visible">
							<div class="column-container">
								<el-tabs v-model="columnTabIndex" type="card">
									<el-tab-pane label="基础项" name="0">
										<div class="radio-container">
											<div class="radio-box" v-for="item in baseList" :key="item.id">
												<el-button border @click="addItem(item.name)">{{item.name}}</el-button>
											</div>
										</div>
									</el-tab-pane>
									<el-tab-pane label="公式项" name="1">
										<el-table :data="formulaList" @row-click="insertFormula"
											border height="249" style="width: 100%" ref="singleTable">
											<el-table-column property="name" label="名称" width="150">
											</el-table-column>
											<el-table-column property="formulaStr" label="计算公式" width="250">
											</el-table-column>
											<el-table-column property="formatStr" label="格式" width="200">
											</el-table-column>
										</el-table>
									</el-tab-pane>
								</el-tabs>
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
				<div class="edit-container" contenteditable="true" ref="itemEdit">{{editHtml}}</div>
				<!-- 规则选项 -->
				<div class="other">
					<div class="other-item">
						<el-select v-model="isPercent" placeholder="计算结果" class="btn-class">
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
						<el-select v-model="reserveRule" placeholder="请选择" style="width:100px;">
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
						<el-select v-model="carryRule" placeholder="舍入规则" class="btn-class">
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
			columnTabIndex:'0',
			columnItem:'',//选择项
			visible:false,//选择列表项是否显示
			loading:false,//加载显示

			showCom:false,//显示选择仓库弹窗
			comObj:{//仓库弹窗传入数据
				isMultiple:true,
			},
			wareList:[],//选中的仓库列表
			storeList:[],//已选中的店铺列表
			wareName:'',
			storeName:'',
			formulaPercent:[//是否半分比
				{label:'数字',value:0},
				{label:'百分百',value:1},
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
			baseList:[],
			formulaList:[],
			formulaObj:{},

			id:0,//公式id
			name:'',//公式名称
			isPercent:0,//是否百分百 0百分百 1数字
			carryRule:0,//舍入规则
			reserveRule:0,//保留几位小数
			baseParam:'',//基础字段id
			formula:'',//计算公式

			editHtml:'',//如果第一次加载取不到dom 则使用v-model渲染
			saveParam:{ //编辑公式时，先保存原数据 用于判断是否修改过
				name:'',
				formula:'',
				isPercent:0,
				reserveRule:0,
				carryRule:0,
			}
		};
	},
	props: {
		list: Object,
		/*	list 新建公式，修改公式所需要的列表数据
			{
				base:[],		//基础项列表
				formula:[],		//公式项列表
			}
		*/
		pObj: Object,
		/*
			pObj 修改公式所需要的数据
			{
				id:'',				//公式id
				name:'',			//公式名称
				formula:'',			//计算公式
				isPercent:'',		//是否百分百 true百分百 false数字
				reserveRule:'',		//保留几位小数
				carryRule:'',		//舍入规则
				baseParam:'',		//基础项
			}
		*/
		//抛出方法 @emit
	},
	created(){
		if(this.list.base) this.baseList = this.list.base;
		if(this.list.formula) this.formulaList = this.list.formula;
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
			if(this.pObj && this.pObj.id){
				this.editFormula();
			}
		},
		//修改公式项
		editFormula(){
			for(let key in this.pObj){
				this[key] = this.pObj[key];
			}
			for(let key in this.saveParam){
				this.saveParam[key] = this.pObj[key];
			}
			let str = this.replaceId(this.formula);
			this.$nextTick(()=>{
				if(this.$refs.itemEdit){
					this.addItem(str,true);
				}else{
					this.editHtml = str;
				}
			});
		},
		//新建公式项
		async addFormula(send){
			if(this.loading) {
				this.$message({message: `请勿重复提交`,type: 'error'});
				return;
			}
			this.loading = true;
			let obj={
				id:this.id,
				name:this.name,
			};
			obj = Object.assign(obj,send);
			if(!this.veriChanged(obj)){//验证 编辑时是否改变了公式
				this.$emit('emit',false);
			}else{
				//try catch防止重复提交
				let data;
				try{
					data = await http.materialreportSetStatisticItemFormula({
						data:obj
					},true);
				}catch(e){
					this.$message({message: e.error.message,type: 'error'});
					this.loading = false;//接口报错，还能继续点击
				}
				if(data){
					obj.id = data;
					this.$emit('emit',obj);
				}
			}
		},
		//验证 编辑公式时是否改变
		veriChanged(obj){
			let changeNum = 0;
			for(let key in this.saveParam){
				if(this.saveParam[key]!=obj[key]){
					changeNum++;
				}
			}
			return changeNum>0;
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
			//字段名称替换为id_xx
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
			//验证替换后的字符串是否还存在【xx】 存在则说明有字段没匹配到
			if(/【(.*?)】/.test(formulaStr)){
				let noMarch = formulaStr.match(/【(.*?)】/g).join(',');
				this.$message({message: `公式中基础项名称不匹配: ${noMarch}`,type: 'error'});
				return false;
			}
			//讲替换完的字符串 拆分成数组 并剔除多余的空数组
			let formulaArray = formulaStr.split(/([-+*/()])/);
			for(let i=0;i<formulaArray.length;i++){
				if(!formulaArray[i]){
					formulaArray.splice(i,1);
					i--;
				}
			}
			this.formulaObj={
				formula:formulaStr,//计算公式
				formulaArray:formulaArray,//公式项拆分数组
				isPercent:this.isPercent,//是否百分百 true百分百 false数字
				reserveRule:this.reserveRule,//保留几位小数
				carryRule:this.carryRule,//舍入规则
				baseParam:baseArr.join(','),//基础项
			};
			this.addFormula(this.formulaObj);
		},
		//验证公式的正确性
		veriFormula(formulaStr){
			//检测公式是否为空
			if(!formulaStr){
				this.$message({message: '计算公式不能为空',type: 'error'});
				return false;
			}
			//检查是否存在基础项
			if(!/【(.*?)】/.test(formulaStr)){
				this.$message({message: `公式中必须包含一个基础项`,type: 'error'});
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
			let regAloneNum = /[-+*/(](?=\d+)|(?<=\d+)[-+*/)]/;
			if(/\d+/.test(alone) && !regAloneNum.test(alone)){
				this.$message({message: '计算公式不能出现单独的数字，需要配合运算符',type: 'error'});
				return false;
			}
			//检测是否出现连续基础项
			let regBaseLink = /ALONEALONE/;
			if(regBaseLink.test(alone)){
				this.$message({message: '计算公式不能出现连续的基础项，需要配合运算符',type: 'error'});
				return false;
			}
			//检测是否出现非法字符
			let mock = formulaStr.replace(regItem,1);
			let regNoNum = /[^0-9-+*/.()]/;
			if(regNoNum.test(mock)){
				this.$message({message: '计算公式不合法，请检查公式',type: 'error'});
				return false;
			}
			//最终检测-带入程序计算 看程序是否报错
			try {
				eval(mock);
			} catch (error) {
				this.$message({message: '计算公式不合法，请检查公式',type: 'error'});
				return false;
			}
			//检测公式名称
			if(!this.name){
				this.$message({message: '请填写计算公式名称',type: 'error'});
				return false;
			}
			return true;
		},
		//插入标准项
		addItem(res,isFormula){
			this.visible = false;
			
			let sel = window.getSelection();
			let range = sel.rangeCount>0?sel.getRangeAt(0):'';
			let sCon = range?range.startContainer:'';
			let field = isFormula ? res : `【${res}】`;
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
		//替换公式id为名称
		replaceId(formula){
			let str = formula.replace(/id_(\d+)/g,(match,p1)=>{
				for(let base of this.baseList){
					if(p1==base.id){
						return `【${base.name}】`;
					}
				}
			});
			return str;
		},
		//插入公式项
		insertFormula(res){
			let str = this.replaceId(res.formula);
			str = `(${str})`;
			this.addItem(str,true);
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