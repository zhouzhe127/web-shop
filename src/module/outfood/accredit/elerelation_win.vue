<template>
	<el-dialog title="关联商品" :visible.sync="dialogVisible" width="70%" :before-close="close">
		<div class="content">
			<div class="teb">
				<el-radio-group v-model="tabactive" fill="#e1bb4a" size="medium">
					<el-radio-button v-for="(item,index) in tebData" :key="index" plain :label="index">{{item}}</el-radio-button>
				</el-radio-group>
			</div>
			<div class="sleType" v-if="tabactive==0">
				<el-cascader :options="cataList" :props="{value:'id',label:'name',children:'child'}" expand-trigger="hover"
				 :placeholder="'请选择分类'" v-model="sleCate" @change="getDrop" change-on-select></el-cascader>
			</div>
			<div class="searchBtn">
				<el-input placeholder="请输入名称/简码" @change="keyUp" v-model="search" class="input-with-select">
					<el-button slot="append" icon="el-icon-search" @click="keyUp"></el-button>
				</el-input>
			</div>
		</div>
		<ul class="aUl">
			<template v-if="allGood||tabactive==1">
				<div v-if="tabactive!=1">
					<el-radio v-for="(item,i) in goodsCom" style="margin-top:10px" :class="{'setStyle':i==0}" v-model="selected" :key="i"
					 :label="item.id" border>{{item.goodsName}}</el-radio>
				</div>
				<div v-else>
					<el-radio v-for="(item,i) in packCom" style="margin-top:10px" :class="{'setStyle':i==0}" v-model="selected" :key="i+'a'" :label="item.id"
					 border>{{item.packageName}}</el-radio>
				</div>
				<div class="showText" v-if="(tabactive!=1&&goodsCom.length==0)||(tabactive!=0&&packCom.length==0)">
					<span>------------未搜索到该商品------------</span>
				</div>
			</template>
			<template v-if="!allGood&&tabactive!=1">
				<div class="onecate" v-if="item.list&&item.list.length > 0" v-for="(item,i) in cateListData" :key="i"
				 style="">
					<div class="oneTitle">
						<i :class="{'onebuke':item.cateOne}"></i>
						<span>{{item.catename}}</span>
					</div>
					<div class="oneContent">
						<el-radio v-for="(cates,index) in item.list" :class="{'setStyle':i==0}" style="margin-top:10px" v-model="selected" :key="index+'a'" :label="cates.id"
						 border>{{cates.goodsName}}</el-radio>
					</div>
				</div>
				<div class="showText" v-if="cateListData.length==0">
					<span>------------未搜索到商品------------</span>
				</div>
			</template>
		</ul>
		<div slot="footer" class="dialog-footer">
			<span style="float: left;color: #E1BB4A;">已选择：{{getGoodsName}}</span>
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="winEvent">确 定</el-button>
		</div>
	</el-dialog>
</template>
<script>
	import utils from 'src/verdor/utils';
	import http from 'src/manager/http';
	export default {
		data() {
			return {
				dialogVisible: false,
				tebData: ['商品', '套餐'],
				tabactive: 0,
				cataList: [],
				sleCate: [], //选择的分类
				search: '',
				allGood: true, //是否显示所有商品，默认显示
				goodsCom: [], //需要显示的商品
				packCom: [], //需要显示的套餐
				selected: '',
				oneGoodList: {},
				cateListData: [],
				keepCateList:''
			};
		},
		props: ['showWin','goodList', 'packlist','selgoods'],
		methods: {
			//获取分类列表名称
			async getOneAreaList() {
				let data = await http.getCategoryList();
				console.log(data);
				data.map(v=>{
					if(v.child&&v.child.length>0){
						v.child.map(s=>{
							if(s.child){
								delete s.child;
							}
						});
					}
				});
				this.cataList = [{
					id: -1,
					name: '全部'
				}, ...data];
			},
			getDrop(e) {
				if (e[0] == -1) {
					this.allGood = true;
				} else {
					this.allGood = false;
					let sleCate = '';
					for (let item of this.cataList) {
						if (item.id == e[0]) {
							sleCate = item;
							break;
						}
					}
					this.oneGoodList.list = [];
					this.cateListData = [];
					if (e.length <= 1) { //只选一级分类
						this.oneGoodList.list = this.getgoodsBycid(sleCate.id);
						this.oneGoodList.catename = sleCate.name;
						this.oneGoodList.cateOne = true;
						if (sleCate.child && sleCate.child.length > 0) {
							sleCate.child.forEach(v => {
								let obj = {};
								obj.catename = v.name;
								obj.list = this.getgoodsBycid(v.id);
								if(obj.list.length>0){
									this.cateListData.push(obj);
								}
							});
						}
						if(this.oneGoodList.list.length>0){
							this.cateListData.unshift(this.oneGoodList);
						}

					}else{//选二级分类
						sleCate.child.forEach(v => {
							let obj = {};
							if(e[1]==v.id){
								obj.catename = v.name;
								obj.list = this.getgoodsBycid(v.id);
								if(obj.list.length>0){
									this.cateListData.push(obj);
								}
							}
						});
					}
					this.keepCateList = utils.deepCopy(this.cateListData);
				}
			},
			getgoodsBycid(cid) {
				let arr = [];
				for (let list of this.goodList) {
					if (cid == list.cids[list.cids.length-1]) {
						arr.push(list);
					}
				}
				return arr;
			},
			keyUp() {
				this.search = this.search.toUpperCase();
				let arr = [];
				if (this.allGood) {
					let list = this.tabactive == 0 ? this.goodList : this.packlist;
					arr = this.getgoodsArrbyName(list);
					this.tabactive == 1 ? this.packCom = arr : this.goodsCom = arr;
					if (this.search == '') {
						this.tabactive == 1 ? this.packCom = this.packlist : this.goodsCom = this.goodList;
					}
				}else{
					this.cateListData = utils.deepCopy(this.keepCateList);

					for(let item of this.cateListData){
						if(item.list&&item.list.length>0){
							item.list = this.getgoodsArrbyName(item.list);
							if(item.list.length>0){
								arr.push(item);
							}
						}
					}
					this.cateListData = arr;
					if (this.search == '') {
						this.cateListData = this.keepCateList;
					}
				}
			},
			getgoodsArrbyName(list){
				let arr = [];
				for (let i = 0; i < list.length; i++) {
					let name = this.tabactive == 1 ?
						list[i].packageName :
						list[i].goodsName;
					if (
						name.toUpperCase().indexOf(this.search) != -1 ||
						list[i].BC.indexOf(this.search) != -1
					) {
						arr.push(list[i]);
					}
				}
				return arr;	
			},
			winEvent() {
				// this.dialogVisible = false;
				this.$emit('relationEvent', {selected:this.selected,isPackage:this.tabactive});
			},
			close(){
				this.$emit('relationEvent', false);
			}
		},
		created() {
			setTimeout(()=>{
				this.goodsCom = utils.deepCopy(this.goodList);
			});
		},
		mounted() {
			this.selected = this.selgoods;
			this.dialogVisible = this.showWin;
			this.packCom = utils.deepCopy(this.packlist);
			this.getOneAreaList();
		},
		components: {},
		computed: {
			getGoodsName() {
				return this.$parent.getGoodsName(this.selected, this.tabactive);
			}
		}
	};
</script>
<style lang='less' scoped>
	.content {
		.teb {
			display: inline-block;
			margin-right: 20px;
		}

		.sleType {
			width: 170px;
			display: inline-block;
		}

		.searchBtn {
			width: 200px;
			float: right;
		}
	}

	.aUl {
		height: 4.5rem;
		overflow: auto;
		width: 100%;
	}

	.showText {
		text-align: center;
		color: #ff8c01;
		margin-top: 10px;
	}

	.onecate {
		width: 100%;
		border-bottom: 1px solid #e3e3e3;
		overflow: hidden;
		.oneTitle {
			float: left;
			width: 20%;

			i {
				display: inline-block;
				width: 10px;
				height: 10px;
				background-color: #9f9f9f;
				margin: 20px 10px;
			}
			.onebuke{
				background-color: #ff8c01;
			}
			span {
				display: inline-block;
				width: 60%;
				margin-top: 20px;
				vertical-align: top;
				word-break: break-all;
			}
		}
		.oneContent {
			float: left;
			width: 80%;
			margin-bottom: 20px;
		}
		
	}
	.setStyle{
			margin-left: 10px;
		}
</style>