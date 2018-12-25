/*
* @Author: zhouzhe
* @Date: 2018-10-31 16:43:27
*/
<template>
	<div>
		<el-dialog :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
			<span slot="title" class="winTitle">{{title}}</span>
			<div class="content">
				<el-checkbox-group v-model="sleArr">
					<el-checkbox v-for="(item,i) in roleList" :class="{'setStyle':i==0}" :key="i" :label="item" style="margin-top:10px"
					 border>{{item.name}}</el-checkbox>
				</el-checkbox-group>

			</div>
			<span slot="footer" class="dialog-footer">
				<div class="footText">(已选择：{{sleText}})(共：{{sleArr.length}}/{{roleList.length}}人)</div>
				<el-button @click="handleClose">取 消</el-button>
				<el-button type="primary" @click="sendClose">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				dialogVisible: true,
				sleArr: []
			};
		},
		props: ['roleList', 'sleRoleArr','title'],
		methods: {
			sendClose() {
				console.log(this.sleArr);
				this.$emit('positionEvent', this.sleArr);
			},
			handleClose() {
				this.$emit('positionEvent', false);
			}
		},
		mounted() {
			// this.dialogVisible = this.showWin;
			this.sleArr = this.sleRoleArr;
		},
		computed: {
			sleText(){
				return Array.from(this.sleArr, x => x.name).join(',')
			}
		},
	};
</script>
<style lang='less' scoped>
	.content {
		height: 300px;
		overflow: auto;
		border-top: 2px #f5f7fa solid;
	}
	.winTitle {
		display: block;
		font-size: 20px;
		text-align: center;
		color: #606266;
	}
	.footText{
		margin-bottom: 15px;
		color: #E1BB4A;
	}
	.setStyle {
		margin-left: 10px;
	}
</style>