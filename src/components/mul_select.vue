<template>
	<div class="selectbtns">
		<span v-for="(item,i) in ownList" :class="{sign_1:isSelected(i,item)}" :style="styles" :key="i" v-on:click="clickHandle(i,item)" :title="item.name"> <i v-bind:class="{sign:isSelected(i,item),nsign:''}"></i>{{getValue(item)}}</span>
		<span v-for="(int,ind) in unlist" class="unsign" :key="ind - 1" :title="int.name"><i></i>{{getValue(int)}}</span>
	</div>
</template>
<script type="text/javascript">
	/**
	 * 多选按钮组组件
	 * list {Array} 需要展示的按钮列表数据
	 * unlist {Array} 需要展示的按钮列表数据,但是不能选择
	 * selects {Array} 被选中的列表
	 * name {String} 如果list数据是Object集合，则name则是Object的键名，该键值就是按钮的名称；如果list就是按钮名称集合，则name不要设置。
	 * keys {String} 如果list数据是Object集合，则key则是Object的键名，该键值就是需要记录的选中列表selects中的元素值；key值为其他不存在的键名时会返回索引值；如果list就是按钮名称集合，则key不要设置，selects中的元素会是选中的索引值。
	 * isradio {Boolean} 如果是单选，则设置为true,如果是多选则设置false或不设置
	 * styles {Object} 设置选择框的样式
	 */

	export default {
		props: ['list', 'selects', 'name', 'keys', 'isradio', 'unlist', 'styles'],
		data() {
			return {
				onSelects: [],
				ownList: []
			};
		},
		watch: {
			onSelects: function() {
				if (this.onSelects && this.onSelects.length > 0) this.$emit('selOn', this.onSelects);
			},
			selects() {
				this.onSelects = this.selects;
				this.ownList = this.list;
			}
		},
		methods: {
			getValue: function(item) {
				if (this.name) {
					return item[this.name];
				} else {
					return item;
				}
			},
			clickHandle: function(i, item) {
				if (this.onSelects) {
					//et id = i;
					let id = item.id;

					if (this.keys) {
						[id = i] = [item[this.keys]];
					}
					let find = false;
					for (let i = 0; i < this.onSelects.length; i++) {
						if (this.onSelects[i] + '' == id + '') {
							find = true;
							break;
						}
					}
					if (find) {
						this.onSelects.splice(this.onSelects.indexOf(id), 1);
					} else {

						if (this.isradio) {
							this.onSelects.splice(0, 1, id);
						} else {
							this.onSelects.push(id);
						}
					}
					this.$emit('selOn', this.onSelects);
				}
			},
			isSelected: function(i, item) {
				if (this.onSelects) {
					let id = item.id;
					//let id = i;
					if (this.keys) {


						id = item[this.keys] || i;

					}
					for (let i = 0; i < this.onSelects.length; i++) {
						if (this.onSelects[i] + '' == id + '') {
							return true;
						}
					}
				}
				return false;
			}
		},
		mounted: function() {
			this.onSelects = this.selects;
			this.ownList = this.list;
			//生命周期问题 导致onSelects不会每次都初始化，导致记住了先前选中的值
		},
		beforeUpdate: function() {
			//每一次数据的更新都会执行该方法
			this.onSelects = this.selects;
			this.ownList = this.list;

			//this.onSelects = this.selects所指向的内存是一致的
		}
	};
</script>
<style lang="less" scoped>
	.selectbtns {
		width: auto;
		height: auto;
		overflow: hidden;
	}

	.selectbtns span {
		display: inline-block;
		height: 40px;
		line-height: 38px;
		padding-left: 18px;
		padding-right: 18px;
		background-color: #FFFFFF;
		text-align: center;
		cursor: pointer;
		margin: 1px;
		max-width: 350px;
		word-wrap: break-word;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		vertical-align: middle;
		border: 1px solid #ccc;
	}

	.selectbtns span:hover {
		background-color: #eeeeee;
	}

	.selectbtns i.sign {
		background: url(../res/images/c-2.png) left center no-repeat;
		display: inline-block;
		width: 14px;
		height: 14px;
		background-size: 100%;
	}

	.selectbtns .unsign {
		background-color: #918686;
	}

	.selectbtns .sign_1 {
		border-color: #e9c048 !important;
		color: #e9c048 !important;

	}

	.selectbtns i {
		background: url(../res/images/c-1.png) left center no-repeat;
		border-color: #e9c048 !important;
		color: #e9c048 !important;
		display: inline-block;
		width: 14px;
		height: 14px;
		background-size: 100%;
		float: left;
		margin-top: 12px;
		margin-right: 10px;
	}
</style>