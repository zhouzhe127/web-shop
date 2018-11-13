<template>
	<div class="select-store-body">
		<div @click="showSort" class="select-body-btn" ref="selectBtn">
			<input type="text" :placeholder="tips" :value="sortName" readonly="readonly" class="select-ban" :style="spanWidth"/>
			<em>
				<i class="el-icon-arrow-down" :class="{active:sortShow}"></i>
			</em>
		</div>
		<div class="list select-ban" v-show="sortShow" ref="listBox" :style="listPosition">
			<em :style="emPosition"></em>
			<ul>
				<li data-type="all" class="all" :class="{active:allSelected}" v-if="!single" @click="storeList">全部选择</li>
				<li data-type="single" v-for="(item,index) in sort" :data-id="item.id" :key="index" :class="{active:item.selected}" @click="storeList">
					<i class="el-icon-check" :class="{'active':item.selected}"></i>
					{{item.name}}
				</li>
			</ul>
			<div class="handle" v-if="confirm">
				<span class="gray" @click="cancel">取消</span>
				<span class="yellow" @click="ok">确认</span>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import utils from 'src/verdor/utils';
	export default {
		props: [
			'sorts',//接收一个数组,id(必填)跟 name(必填),selected(可选) //派发出去的数组与传入数组长度一致,只是改变了selected的true/false
			'width',//宽度设置 不需要单位px
			'tipName',//没选择时默认显示内容
			'isSingle',//是否单选   默认多选
			'isConfirm',//是否带有 确认-取消按钮  默认无确认按钮
		],
		data: function() {
			return {
				sort: [], //保存列表数据
				emitList:[],//发送列表数据
				sortName: '', //分类选中
				sortNameStr: '',//分类选中拼接
				sortSel: false, //分类下拉框显示
				tips:'',//默认提示
				selected:-1,
				spanWidth:'width:169px;',//盒子宽度
				sortShow:false,
				allSelected:false,
				single:true,//默认多选
				confirm:false,//默认无确认按钮
				saveList:[],//保存打开菜单时的数据状态
				saveAll:true,//保存打开菜单时的全选状态
				selectNum:0,//选中按钮个数
				listPosition:'',//根据页面宽度判断弹框的左右对其
				emPosition:'',//根据页面宽度判断箭头的左右对其
			};
		},
		watch:{
			'sorts':'init',
		},
		mounted() {
			if(this.sorts || this.sorts == []) this.init();
		},
		methods: {
			//分类选择模拟框
			init(){
				if(!this.validate()) return;
				this.sort = this.sorts ? this.sorts : [];
				this.tips = this.tipName ? this.tipName : '请选择...';
				this.single = this.isSingle ? true : false;
				this.confirm = this.isConfirm ? true : false;
				this.spanWidth = this.width ? 'width:'+ (this.width-32)+'px;' : 'width:168px;';
				this.setSelected(this.sort);
				this.setSelectAll();
			},
			showSort() {
				if(!this.sortShow){
					this.setPosition();
					this.sortShow = true;
					this.saveList = utils.deepCopy(this.sort);
					this.saveAll = utils.deepCopy(this.allSelected);
					document.addEventListener('click',this.close);
				}else{
					this.hideDrop();
				}
			},
			setPosition(){//根据页面便宜距离
				this.$nextTick(()=>{
					let Boxleft = this.$refs.selectBtn.getBoundingClientRect().left+500;
					let conRight = document.querySelector('.details_con').getBoundingClientRect().right;
					if(Boxleft>=conRight){
						this.listPosition = 'right:0px;left:auto;';
						this.emPosition = 'right:15px;left:auto;';
					}
				});
			},
			cancel(){//取消
				this.setSelected(this.saveList);
				this.sort = this.saveList;
				this.setSelectAll();
				this.hideDrop();
			},
			ok(){//确认
				this.setSelected(this.sort);
				this.setSelectAll();
				this.$emit('emit',this.sort);
				this.hideDrop();
			},
			validate(){//验证单选
				let selectNum=0;
				for(let item of this.sorts){
					if(item.selected == true){
						selectNum++;
					}
				}
				if(selectNum>1 && this.isSingle){
					console.log('select_store 组件：单选模式，不允许选中多个选项');
					return false;
				}else{
					return true;
				}
			},
			setSelected(list){//设置已选中样式
				this.clearEach();
				for(let item of list){
					if(item.selected == true){
						this.eachEmitList(item);
					}
				}
				this.sortName = this.selectNum >=1 ? this.sortNameStr : '';
			},
			storeList(event){
				event.stopPropagation();
				let target = event.currentTarget;
				let btnType = target.getAttribute('data-type'); //按钮类型
				if(btnType == 'all'){//点击全部
					let list = utils.deepCopy(this.sort);
					this.clearEach();
					if(this.allSelected){//全不选
						list.forEach((item)=>{
							item.selected = false;
						});
						this.allSelected = false;
						this.selectNum = 0;
					}else{//全选
						list.forEach((item)=>{
							item.selected = true;
							this.eachEmitList(item);
						});
						this.allSelected = true;
					}
					this.sort = list;
					this.setSelectAll();
					this.emitMethod();
				}else if(btnType == 'single'){//点击单个店铺
					let list = utils.deepCopy(this.sort),
						id = target.getAttribute('data-id'),
						thisClass = target.className;
					this.clearEach();
					//单选状态 清空之前的选择
					if(this.single) list.forEach((item)=>{item.selected = false});
					list.forEach((item)=>{
						if(item.id == id){
							if(thisClass.includes('active')){//多选状态 也可以清除已选中
								item.selected = false;
							}else{
								item.selected = true;
							}
						}
						if(item.selected == true){
							this.eachEmitList(item);
						}
					});
					this.sort = list;
					if(this.single && !this.confirm){//单选状态
						this.hideDrop();
					}
					this.setSelectAll();
					this.emitMethod();
				}
			},
			eachEmitList(item){
				this.selectNum++;
				this.sortNameStr += (item.name+' ');
			},
			clearEach(){//清空派发列表 显示 选中数量
				this.sortNameStr = '';
				this.emitList = [];
				this.selectNum = 0;
			},
			setSelectAll(){//设置店铺全选
				if(this.selectNum == this.sort.length){
					this.allSelected = true;
				}else{
					this.allSelected = false;
				}
			},
			emitMethod(){//派发事件
				if(!this.confirm){//在没有确认按钮时 自动派发
					this.sortName = this.selectNum >=1 ? this.sortNameStr : '';
					//派发出去的数组与传入数组长度一致,只是改变了selected的true/false
					this.$emit('emit',this.sort);
				}
			},
			hideDrop(){
				this.sortShow = false;
				document.removeEventListener('click',this.close);
			},
			close(event){
				let banDom = this.$refs.selectBtn.getElementsByTagName('*'),
					isBan = true;
				for(let i=0;i<banDom.length;i++){
					if(event.target == banDom[i]) isBan = false;
				}
				if(isBan){
					if(!this.confirm){
						this.hideDrop();
					}
				}
			}
		}
	};
</script>
<style lang="less" scoped>
	.select-store-body{
		position: relative;display: inline-block;
		.select-body-btn {
			height: 40px;width: 100%;padding-right: 30px;position: relative;cursor: pointer;border-radius: 4px;
			vertical-align: middle;display: inline-block;border: #dcdfe6 solid 1px;
			em{
				width: 30px;height: 38px;position: absolute;right: 0;top: 0;
				i {
					position: absolute;top: 50%;left: 50%;margin-top: -7px;margin-left: -10px;
					font-size: 14px;color: #ccc;
					transition: 0.3s all;
					&.active{transform: rotate(180deg);}
				}
			}
			input{
				height: 38px;line-height: 38px;display: block;border-radius: 4px;border-radius: 4px;
				overflow: hidden;text-overflow: ellipsis;white-space: nowrap;
				border: 0;color: #666666;padding: 0 10px;cursor: pointer;
			}
		}
		.list{
			position: absolute;left: 0;top: 50px;width: 500px;background: #fff;border-radius: 4px;
			box-shadow: 0 2px 12px #eee;z-index: 20;border: 1px solid #ebeef5;
			em{
				position: absolute;left: 175px;top: -8px;height: 0;width: 0;
				border-bottom:8px solid #ebeef5;border-left:7px solid transparent;border-right:7px solid transparent;
				&:after{
					content: ' ';display: block;
					position: absolute;left: -7px;top: 1px;height: 0;width: 0;
					border-bottom:8px solid #fff;border-left:7px solid transparent;border-right:7px solid transparent;
				}
			}
			ul{
				float: left;overflow: auto;max-height: 300px;width: 100%;padding: 0 8px;margin: 8px 0;
				li{
					height: 40px;line-height: 40px;padding: 0 10px;float: left;color: #666;
					border: 1px solid #dcdfe6;margin: 5px;cursor: pointer;border-radius: 4px;
					transition: 0.2s all;
					i{
						display: inline-block;height: 14px;width: 14px;font-size: 12px;margin-right: 5px;
						text-align: center;line-height: 14px;color: #fff;transition: 0.2s all;
						border: 1px solid #dcdfe6;border-radius: 2px;
						&.active{
							background: #E1BB4A;border: 1px solid #E1BB4A;
						}
					}
					&.active{border-color: #E1BB4A;color:#E1BB4A;}
					&.all{text-align: center;background: none;}
				}
			}
			.handle{
				overflow: hidden;float: left;width: 100%;
				span{
					float: left;color: #fff;width: 50%;height: 40px;line-height: 40px;text-align: center;
				}
			}
		}
	}
</style>