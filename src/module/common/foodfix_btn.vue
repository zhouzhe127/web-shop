<template>
    <div class="buttonBox">
        <template v-for='(v,i) in btns'>
            <template v-if="v.type == 1">
                <el-button @click="v.fn" :type="v.className" :key="i+keyRan">{{v.name}}</el-button>
            </template>
            <template v-if="v.type == 2">
                <el-button @click="v.fn" :type="v.className" :key="i+keyRan" plain>{{v.name}}</el-button>
            </template>
        </template>
    </div>
</template>
<script>
class Btn {
	/**
	 * @param {String} name //按钮显示的文字
	 * @param {String|Array} className // 按钮的类名 你的类名请不要叫 0 false
	 * @param {Function} fn // 回调函数
	 * @param {Number} type // 用于特殊dom,需要自己加结构
	 * @param {Number} style // 样式
	 */
	constructor(...args) {
		/* eslint-disable */
		if (args.length === 1 && typeof args[0] == 'object') {
			var { name, className, fn, type, style, inputName } = Object.assign({ style: {}, name: '', className: ['blue', 'btn'], fn: () => {}, type: 0 }, args[0])
		} else {
			var [name = "", className = "blue", fn = () => {}, type = 0, style = {}, inputName] = [...args];
		}
		this.name = name;
		this.className = className;
		this.fn = fn;
		this.type = type;
		this.styles = style;
		this.inputName = inputName || "file";
		/* eslint-enable */
	}
}
export default {
	computed: {
		keyRan() {
			return Math.random();
		},
		btns() {
			let btns = [];
			let source = this.$store.state.fixButton;
			if (source instanceof Array) {
				btns = source.map((item) => {
					return new Btn(item);
				});
			}
			return btns;
		}
	},
};
</script>
<style lang='less' scoped>
.buttonBox{
    width: 100%;
    height: 60px;
    padding: 10px 0;
    box-shadow: -26px 0px 30px rgba(0, 0, 0, 0.1);
}
</style>