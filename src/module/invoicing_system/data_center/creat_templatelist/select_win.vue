/*
* @Author: zhouzhe
* @Date: 2018-11-30 10:52:15
*/
<template>
	<div>
		<el-dialog :visible.sync="dialogVisible" width="40%" @close="sendClose('close')">
			<span slot="title" class="winTitle">{{title}}</span>
			<div class="content">
				<div class="chooseAll" v-if="!isSingle">
					<el-checkbox v-model="chooseAll" @change="changeAll" size="small" border>全部选择</el-checkbox>
				</div>
				<el-radio-group v-model="sleArr" v-if="isSingle">
					<el-radio v-for="(item,i) in unitsArr" :class="{'setStyle':i==0}" :key="i" :label="item" style="margin-top:10px"
					 border>{{item.name}}</el-radio>
				</el-radio-group>
				<el-checkbox-group v-else v-model="sleArr">
					<el-checkbox v-for="(item,i) in unitsArr" :class="{'setStyle':i==0}" :key="i" :label="item" style="margin-top:10px"
					 border>{{item.name}}</el-checkbox>
				</el-checkbox-group>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="sendClose('close')">取 消</el-button>
				<el-button type="primary" @click="sendClose('ok')">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	// import http from 'src/manager/http';
	export default {
		data() {
			return {
				dialogVisible: true,
				chooseAll: false,
				unitsArr: [],
				sleArr: [],
				sleSingle: ''
			};
		},
		props: {
			//弹窗标题
			title: {
				type: String,
				default: '请选择'
			},
			//需要展示的数据
			list: [Array, Object],
			//已选中的数据
			selectArr: [Array, Object, String],
			//是否为单选
			isSingle: {
				type: Boolean,
				default: false
			},
			//需要展示的键值
			showKey: {
				type: String,
				default: 'name'
			}
		},
		methods: {
			sendClose(str) {
				if (str != 'ok') {
					this.$emit('positionEvent', false);
				} else {
					console.log(this.sleArr);
					this.$emit('positionEvent', this.sleArr);
				}
			},
			changeAll(news) {
				news ? this.sleArr = this.unitsArr : this.sleArr = [];
			}
		},
		mounted() {
			this.unitsArr = this.list;
			this.sleArr = this.selectArr;
		},
		watch: {
			sleArr() {
				this.chooseAll = this.sleArr.length != this.unitsArr.length ? false : true;
			}
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
		height: 300px;
		overflow: auto;
		border-top: 2px #f5f7fa solid;
	}

	.setStyle {
		margin-left: 10px;
	}
</style>