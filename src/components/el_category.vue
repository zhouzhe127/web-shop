/**
 * @Author: 孔伟研 
 * @Date: 2018-09-05 10:54:43 
 * @Last Modified by: 孔伟研
 * @Last Modified time: 2018-10-10 17:47:32
 * @Module:分类选择框
**/
<template>
	<div id="elCategory" style="display:inline-block;">
		<el-popover placement="bottom" width="400" v-model="showArea" @show="changeIndex" trigger="click">
			<section style="max-height:260px;overflow:auto;min-height:100px;">
				<el-radio-group v-model="newOneIndex" size="small" @change="changeArea">
					<el-radio border v-for="(item,index) in categoryArr" :key="index" :label="index" style="margin-bottom: 5px;">{{item.name}}</el-radio>
				</el-radio-group>
			</section>
			<el-button slot="reference" plain style="width:200px;overflow: hidden;position: relative;text-overflow: ellipsis;white-space: nowrap;padding-right:30px;">
				<span>{{itemArea.name}}</span>
				<i class="el-icon-arrow-down" style="position: absolute;right: 0px;width: 37px;"></i>
			</el-button>
		</el-popover>
	</div>
</template>
<script>
// import storage from 'src/verdor/storage';
// import utils from 'src/verdor/utils';
// import http from 'src/manager/http';
export default {
	data() {
		return {
			showArea: false,
			newOneIndex: -1 //选中的下标
		};
	},
	props: {
		categoryArr: Array, //分类数组
		itemIndex: Number, //选中分类的下标
		itemArea: Object
	},
	methods: {
		changeIndex() {
			this.newOneIndex = this.itemIndex;
			if (this.categoryArr.length == 0) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					content: '没有分类或该分类下没有子分类!'
				});
				this.showArea = false;
			}
		},
		changeArea() {
			this.showArea = false;
			this.$emit('selectCategory', this.newOneIndex);
		}
	}
};
</script>
