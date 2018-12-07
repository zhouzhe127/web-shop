/*
* @Author: zhouzhe
* @Date: 2018-11-30 14:27:19
*/
<template>
	<div>
		<el-dialog :visible.sync="dialogVisible" width="70%" @close="sendClose('close')">
			<span slot="title" class="winTitle">{{title}}</span>
			<div class="content">
				<div class="chooseAll">
					<el-checkbox-button v-model="chooseAll" @change="changeAll" size="small" border>全部选择</el-checkbox-button>
				</div>
				<div class="plogan" v-for="(item,index) in cateList" :key="index">
					<div class="checkBtn" :class="{'borBotoom':item.children}">
						<el-checkbox v-model="item.selectAll" @change="chooseAllSecond(item)">{{item.name}}</el-checkbox>
					</div>
					<div class="childrenList" v-if="item.children">
						<el-checkbox-group v-model="item.selectChildren" @change="chooseSecond(item)">
							<el-checkbox v-for="(list,i) in item.children" :class="{'setStyle':i==0}" :key="i" :label="list" style="margin-top:10px"
							 border>{{list.name}}</el-checkbox>
						</el-checkbox-group>

					</div>
				</div>
				<!-- <el-tabs type="border-card">
                    <el-tab-pane>
                        <div slot="label"><el-checkbox>lala</el-checkbox></div>
                        我的行程
                    </el-tab-pane>
                </el-tabs> -->
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="sendClose('close')">取 消</el-button>
				<el-button type="primary" @click="sendClose('ok')">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	export default {
		data() {
			return {
				dialogVisible: true,
				chooseAll: false,
				cateList: []
			};
		},
		props: {
			//弹窗标题
			title: {
				type: String,
				default: '选择物料分类（多选）'
			},
			select: Array
		},
		methods: {
			async init() {
				let data = await http.invoiv_getCategoryList();
				// this.cataList = data;
				let arr = [];
				for (let item of data) {
					if (item.pid == 0) {
						let childArr = [];
						item.selectChildren = [];
						item.selectAll = false;
						data.forEach(v => {
							if (item.id == v.pid && item.id != 0) {
								childArr.push(v);
							}
						});
						if (childArr.length > 0) item.children = childArr;
						arr.push(item);
					}
				}
				console.log(arr);
				this.cateList = arr;
				if(this.select.length>0) this.setSelect();
			},
			setSelect(){
				this.select.forEach(v=>{
					for(let item of this.cateList){
						if(item.id == v){
							item.selectAll = true;
							item.selectChildren = item.children;
							break;
						}else{
							for(let child of item.children){
								if(child.id==v){
									item.selectChildren.push(child);
									break;
								}
							}
							if(item.selectChildren.length==item.children.length) item.selectAll = true;
						}
					}
				});
			},
			sendClose(str) {
				if (str != 'ok') {
					this.$emit('positionEvent', false);
				} else {

					this.$emit('positionEvent', this.cateList);
				}
			},
			changeAll(news) {
				this.cateList.forEach(v => {
					v.selectAll = news ? true : false;
					v.selectChildren = news ? v.children : [];
				});
			},
			chooseAllSecond(item) {
				console.log(item);
				item.selectChildren = item.selectAll ? item.children : [];
			},
			chooseSecond(item) {
				item.selectAll = item.selectChildren.length == item.children.length ? true : false;
			}
		},
		mounted() {
			this.init();
		},
		watch: {

		}
	};
</script>
<style lang='less' scoped>
	.winTitle {
		display: block;
		font-size: 20px;
		text-align: center;
		color: #606266;
	}

	.chooseAll {
		margin: 15px 0 10px 0;
	}

	.content {
		height: 400px;
		overflow: auto;
		border-top: 2px #f5f7fa solid;

		.plogan {
			margin-top: 15px;

			.checkBtn {
				border: 1px solid #e4e7ed;
				display: inline-block;
				padding: 10px 15px;
			}

			.borBotoom {
				border-bottom: 1px solid #ffffff;
				position: relative;
				top: 1px;
			}

			.childrenList {
				width: 90%;
				border: 1px solid #e4e7ed;
				padding: 15px;
			}
		}
	}
</style>