<!--
    **物料加工-详情
    *
    * 黄一帆
    * *
    *
-->
<template>
	<div class="process-detail">
		<template v-if='!printShow'>
			<div class="line-title">
				加工记录详情<p></p>
			</div>
			<div class="detail">
				<div class="item">
					<em>产出物料:</em>{{allList.length}}种
				</div>
				<div class="item">
					<em>加工时间:</em>{{createTime}}
				</div>
				<div class="item narrow">
					<em>操作人:</em>{{createUName}}
				</div>
			</div>
			<div class="main">
				<div class="filter">
					<div class="inline-box">
						<el-input v-model="proMaterial" placeholder="请输入成品物料"></el-input>
					</div>
					<div class="inline-box">
						<el-input v-model="matMaterial" placeholder="请输入原料物料"></el-input>
					</div>
					<div class="inline-box">
						<el-button type="primary" @click="filter">筛选</el-button>
						<el-button type="info" @click="reset">重置</el-button>
					</div>
				</div>
				<div class="list-box">
					<div class="title">
						<span class="handle select-ban" @click="openAll">{{isOpenAll?'全部收起':'全部展开'}}</span>
						<span>产出物料</span>
						<span>入库仓库/区域</span>
						<span>生产数量</span>
						<span>消耗原料</span>
						<span>单个成本</span>
						<span>总成本</span>
					</div>
					<div class="list">
						<div class="one" v-for="(item,index) in list" :key="index">
							<!--单个展开-->
							<span><i class="fi" :class="{'fi-double-angle-up':item.twoShow,'fi-double-angle-down':!item.twoShow}" @click="openSingle(index)"></i></span>
							<!--产出物料-->
							<span>{{item.target.mName}}</span>
							<!--入库仓库/区域-->
							<span>{{item.target.wareAreaShow}}</span>
							<template v-if="item.status!=0">
								<!--失败原因-->
								<span class="fail"><em></em>失败原因：{{item.reason}}</span>
							</template>
							<template v-if="item.status==0">
								<!--生产数量-->
								<span>{{item.target.proNumShow}}</span>
								<!--消耗原料-->
								<span>{{item.target.proKind}}</span>
								<!--单个成本-->
								<span>{{item.target.proSingle}}</span>
								<!--总成本-->
								<span>{{item.target.proAll}}</span>
							</template>
							<div class="two" v-show="item.twoShow">
								<div class="title-two">
									<span>原料物料</span>
									<span>消耗量</span>
									<span>消耗金额</span>
									<span>成品比例</span>
									<span>成品比例(金额)</span>
								</div>
								<div class="list-two" v-for="(mat,matIndex) in item.materials" :key="matIndex">
									<!--原料物料-->
									<span>{{mat.mName}}</span>
									<!--消耗量-->
									<span>{{mat.proNumShow}}</span>
									<!--消耗金额-->
									<span>{{mat.proCost}}</span>
									<!--成品比例-->
									<span>{{mat.proScale}}</span>
									<!--成品比例(金额)-->
									<span>{{mat.proScaleCost}}</span>
								</div>
							</div>
						</div>
						<div class="empty" v-if="!list.length">-暂无数据-</div>
					</div>
				</div>
			</div>
		</template>
		<detail-print v-if="printShow" :detail="printDetail" :goods="printList" :isOpen="printOpen" @emit="printEmit"></detail-print>
	</div>
</template>

<script>
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
import global from 'src/manager/global';
export default {
	data() {
		return {
			logId:'',//日志id
			proMaterial:'',//成品物料
			matMaterial:'',//原料物料
			allList:[],//筛选前的原列表
			list:[],
			isOpenAll:false,//是否全部展开
			openNum:0,//展开的数量
			printDetail:{},//打印详情
			printShow:false,
			printList:[],//需要打印的列表
			printOpen:false,
			createUName:'',
			createTime:'',
		};
	},
	mounted(){
		this.initBtn();
		this.logId = this.$route.query.id;
		this.getDetail();
	},
	components:{
		detailPrint: () =>
			import( /*webpackChunkName: 'process_material_detail_print'*/ './process_material_detail_print'),
	},
	methods:{
		initBtn() {
			let arr = [
				{name: '打印简洁',className: 'primary',type:4,
					fn: () => {
						this.printOpen = false;
						this.printShow = true;
					}
				},
				{name: '打印详细',className: 'primary',type:4,
					fn: () => {
						this.printOpen = true;
						this.printShow = true;
					}
				},
				{name: '返回',className:'',type:4,
					fn: () => {
						window.history.go(-1);
					}
				},
			];
			this.$store.commit('setPageTools', arr);
		},
		printEmit(){
			this.printShow = false;
			this.initBtn();
		},
		filter(){//筛选
			let newList = utils.deepCopy(this.allList);
			if(this.proMaterial){
				newList = newList.filter((res)=>{
					return res.target.mName.includes(this.proMaterial);
				});
			}
			if(this.matMaterial){
				let twoList = [];
				if(this.proMaterial){
					twoList = newList;
				}else{
					twoList = utils.deepCopy(this.allList);
				}
				let arr = [];
				for(let item of twoList){
					let isFind = item.materials.some((res)=>{
						return res.mName.includes(this.matMaterial);
					});
					if(isFind){
						arr.push(item);
					}
				}
				newList = arr;
			}
			this.list = newList;
		},
		reset(){//重置
			this.list = this.allList;
			this.proMaterial = '';
			this.matMaterial = '';
		},
		timeConversion(time) {
			return utils.format(new Date(time * 1000), 'yyyy-MM-dd hh:mm:ss');
		},
		async getDetail(){//获取详情数据
			let data = await http.ProcessbomGetProcessBomLogDetail({data:{
				logId:this.logId,
			}});
			this.allList = data.list;
			this.createUName = data.createUName;
			this.createTime = this.timeConversion(data.createTime);
			this.setMatList();
			this.filter();
		},
		setMatList(){//设置列表数据-方便打印
			for(let item of this.allList){
				item.target.wareAreaShow = item.target.wName+' / '+item.target.aName;
				item.twoShow = false;
				if(item.status==0){
					let unit = item.target.unit.filter((res)=>{
						return item.target.unitId == res.muId;
					})[0];
					let minName = this.getMinUnit(item.target.unit);
					item.target.proNum =  this.setNumfloat(item.target.num/unit.value);
					item.target.proNumShow = this.comUnit(item.target.num,unit.value,item.target.uName,minName);
					item.target.proKind = item.materials.length+'种';
					item.target.proSingle = this.setNumfloat(item.target.cost/item.target.proNum)+'元';
					item.target.proAll = item.target.cost+'元';
				}else{
					let arr = ['proNumShow','proKind','proSingle','proAll'];
					for(let prop of arr){
						item.target[prop] = '--';
					}
				}
				for(let mat of item.materials){
					if(item.status==0){
						let matUnit = mat.unit.filter((res)=>{
							return mat.unitId == res.muId;
						})[0];
						let matMinName = this.getMinUnit(mat.unit);
						mat.proNum = this.setNumfloat(mat.num/matUnit.value);
						mat.proNumShow = this.comUnit(mat.num,matUnit.value,mat.uName,matMinName);
						mat.proCost = mat.cost+'元';
						mat.proScale = `1${item.target.uName}=${this.setNumfloat(mat.proNum/item.target.proNum)}${mat.uName}`;
						mat.proScaleCost = `1${item.target.uName}=${this.setNumfloat(mat.cost/item.target.proNum)}元`;
					}else{
						let matArr = ['proNumShow','proCost','proScale','proScaleCost'];
						for(let prop of matArr){
							mat[prop] = '--';
						}
					}
				}
				let printItem = item.target;
				printItem.batchInfo = item.materials;
				this.printList.push(printItem);
			}
			this.printDetail = {
				createTime:this.createTime,
				createUName:this.createUName,	
			};
		},
		comUnit(...args) { //number领取量（以最小单位计算），value换算关系，showName展示的单位名称,minName最小单位名称
			let [number, value, showName, minName, type] = args;
			return global.comUnit(number, value, showName, minName, type);
		},
		getMinUnit(unit){
			let minName = '';
			for(let u of unit){
				if(u.isMin==1){
					minName = u.name;
				}
			}
			return minName;
		},
		setNumfloat(num){//设置三位浮点型数字
			let str = num+'';
			let reg = /\.\d{4,}/;
			if(reg.test(str)){//小数点后四位以上
				let repNum = str.substr(str.indexOf('.')+3,1);
				if(repNum>0){//大于0则切掉
					str = str.replace(/(\d+\.\d{2})(\d*)/,'$1'+repNum);
				}else{//等于0则+1
					str = str.replace(/(\d+\.\d{2})(\d*)/,'$1'+'1');
				}
			}
			return str;
		},
		openAll(){//全部展开
			if(this.isOpenAll){
				this.isOpenAll = false;
				for(let item of this.list){item.twoShow = false;}
			}else{
				this.isOpenAll = true;
				for(let item of this.list){item.twoShow = true;}
			}
		},
		openSingle(index){//单个展开/收起
			this.list[index].twoShow = !this.list[index].twoShow;
			this.openNum = 0;
			for(let item of this.list){
				if(item.twoShow){
					this.openNum++;
				}
			}
			if(this.openNum>=this.list.length){
				this.isOpenAll = true;
			}else{
				this.isOpenAll = false;
			}
		},
	},
}
</script>

<style lang="less" scoped>
.process-detail{
	.line-title{
		height: 28px;line-height: 28px;border-left: 3px solid #E1BB4A;position: relative;overflow: hidden;
		padding-left: 10px;font-size: 16px;
		p{position: absolute;height: 16px;border-bottom: 2px dashed #ddd;left: 120px;top: 0;width: 100%;}
	}
	.detail{
		overflow: hidden;padding: 20px;
		.item{float: left;width: 33.33%;position: relative;padding-left: 75px;min-height: 20px;font-size: 16px;
			em{position: absolute;left: 0;top: 0;font-size: 16px;}
		}
		.narrow{padding-left: 60px;}
	}
	.main{
		.filter{
			.inline-box{display: inline-block;vertical-align: middle;margin-right: 10px;}
		}
		.list-box{margin-top: 20px;overflow: auto;
			border: 1px solid #ccc;
			.title{overflow: hidden;background: #f2f2f2;min-width: 1200px;
				span{float: left;height: 40px;line-height: 40px;text-align: center;width: 15%;
					&:first-child{width: 10%;}
				}
				.handle{color: #E1BB4A;cursor: pointer;
					&:hover{text-decoration: underline;}
				}
			}
			.list{min-width: 1200px;
				.one{overflow: hidden;border-bottom: 1px solid #ccc;
					&>span{float: left;height: 70px;text-align: center;line-height: 70px;width: 15%;
						&:first-child{width: 10%;}
						i.fi{font-size: 30px;color: #666;height: 50px;width: 50px;line-height: 50px;text-align: center;
							cursor: pointer;vertical-align: middle;}
						em{height: 18px;width: 18px;}
						&.fail{width: 60%;text-align: left;padding-left: 4%;}
					}
					span{
						em{display: inline-block;vertical-align: middle;margin-right: 5px;
							background: url(../../../res/images/tip.png);background-size: cover;}
					}
					.two{padding-left: 10%;float: left;width: 100%;padding-bottom: 10px;
						span{float: left;width: 20%;text-align: center;color: #777;
							em{width: 14px;height: 14px;}
						}
						.title-two{overflow: hidden;padding: 10px 0;}
						.list-two{overflow: hidden;padding: 5px 0;}
					}
				}
				&:last-child{border-bottom: 0;}
				.empty{height: 70px;line-height: 70px;text-align: center;font-size: 16px;color: #999;}
			}
		}
	}
}
</style>