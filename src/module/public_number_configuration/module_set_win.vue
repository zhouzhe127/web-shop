<!--
    **模板设置弹窗
    *
    * 胡江
    * *
    *
-->
<template>
	<win @winEvent="clickResult" :align="'right'" :width="600" :height="650" :cancel="cancelStyle">
		<!--标题-->
		<span slot="title">模板编辑</span>
		<!--内容-->
		<div slot="content">
			<div id="msnmodel-window">
				<div class="win-title" style="margin-bottom: 20px;">
					<div class="w100" style="text-align: right;">
						标题
					</div>
					<div class="w350 ">
						<div class="fl width290" @click="openOpensList()" v-if="showInfo!= null">
							{{showInfo.title}}
						</div>
						<div class="fl width290" @click="openOpensList()" v-else>
						</div>
						<div class="fr win-options" @click="openOpensList()">
						</div>
						<div class="win-select" v-if="openOptios">
							<div v-for=" (item,i) in optionsList" :key="i">
								<span :class="{'selected':i == opindex}" @click="clickOptios(i)">{{item.title}}</span>
							</div>
						</div>
					</div>
				</div>
				<div v-html="showHtml">
				</div>
				<div class="width100">
				</div>
				<div class="win-title" style="text-align: left;">
					<div class="w100 fl" style="text-align: right;position: relative;height: 140px;">
						温馨提示：
					</div>
					{{alert}}
				</div>
				<div class="width100">
				</div>
				<div class="win-title" style="height: auto;">
					<div class="w100 fl" style="text-align: right;position: relative;height: 40px;">
						内容实例：
					</div>
					<div class="width350">
						<xmp style="margin: 0;float: left;" v-if="showInfo != null">{{showInfo.example}}</xmp>
						<!--<div style="margin: 0;float: left;" v-if="showInfo != null">{{showInfo.example}}</div>-->
					</div>
				</div>
			</div>
		</div>
	</win>
</template>
<script>
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
import Vue from 'vue';
export default {
	data() {
		return {
			openOptios: false, //是否打开选项列表
			opindex: -2, //选项列表中被选中的选项
			showInfo: null, //展示的数据
			needInfo: null, //对应要拿到值的列表
			showHtml: null, //展示的html代码
			obj: {},
			editContener: null,
			template_id: null,
			alert: null, //温馨提示
			cancelStyle: null,
		};
	},
	props: {
		userData: Object,
		index: '', //索引
		item: Object, //点击项的详细的信息
		optionsList: Array, //选项列表 弹框下拉
		list: Array, //所有模版的数据
		infoList: Object, //输入框获取数据
	},
	mounted() {
		this.cancelStyle = {
			content: '删除',
			style: {
				backgroundColor: 'red',
				color: '#fff '
			}
		};
		let ia = utils.deepCopy(this.infoList);
		// for (let i = 0; i < ia.length; i++) {
		// 	if (ia[i].type == this.item.type) {
		// 		this.item.key = ia[i].key;
		// 	}
		// }
		for (let key in ia) {
			if (ia[key].type == this.item.type) {
				this.item.key = ia[key].key;
			}
		}
		this.getNeedData();
		this.setNeedInfoToData();
		this.getShowHtml();
		this.getAlert();
	},
	methods: {
		getNeedData: function() {
			let la = utils.deepCopy(this.list); //所有模版的数据
			let oa = utils.deepCopy(this.optionsList); //弹框下拉的数据
			let ia = utils.deepCopy(this.infoList); //输入框的数据 对象
			let tp = la[this.index].type; //对应的type值
			let ky = null;
			// for (let i = 0; i < ia.length; i++) {
			// 	if (ia[i].type == tp) {
			// 		ky = ia[i].key;
			// 		this.needInfo = ia[i].data;
			// 	}
			// }
			for (let key in ia) {
				if (ia[key].type == tp) {
					ky = ia[key].key;
					this.needInfo = ia[key].data; //获取的展示数据
				}
			}
			if (ky == null || ky == '' || ky == undefined) {
				this.showInfo = null;
			} else {
				for (let i = 0; i < oa.length; i++) {
					if (oa[i].template_id && oa[i].template_id == ky) {
						this.opindex = i;
						this.showInfo = oa[i]; //获取的内容实厉
					}
				}
			}
		},
		getShowHtml: function() {
			if (this.showInfo == null) {
				return false;
			}
			let content = this.showInfo.content;
			let regn = /[\n|\r|\r\n|\n\r]/g;
			let regd = /^\{\{[^}{]*\}\}$/g;
			let splitCon = content.split(regn);
			splitCon = this.arrunique(splitCon);
			let cos =
				`<div  style='width: 550px;margin-left: 10px;line-height: 40px;height: 40px;text-align: center;margin-bottom: 10px;float: left;'>`;
			let coe = '</div>';
			let divs =
				`<div class='required' style='width: 80px;height: 40px;float: left;padding-right: 8px;text-align: right;'>`;
			let dive = '</div>';
			let divl = `<div style='width:470px;text-align: left;text-indent: 80px;'>`;
			let inputs =
				`<input type='text' class='input' style='width:160px;float: left;margin-right: 10px;' placeholder='请输入' v-model='`;
			let inputl =
				`<input type='text' class='input' style='width: 340px;float: left;margin-right: 10px;' placeholder='请输入'  v-model='`;
			let inpute = `'>`;
			let showCon = '';
			let keyArr = []; //模板消息
			for (let i = 0; i < splitCon.length; i++) {
				showCon += cos;
				if (regd.test(splitCon[i])) { //直接是{{}}
					splitCon[i] = splitCon[i].match(regd)[0];
					splitCon[i] = splitCon[i].substring(2, splitCon[i].length - 2);
					showCon += divs;
					//                        console.log(splitCon[i])
					if (splitCon[i] == 'first.DATA') {
						showCon += '首行文字';
					} else if (splitCon[i] == 'remark.DATA') {
						showCon += '末行文字';
					}
					showCon += dive;
					showCon += (inputl + 'obj.' + splitCon[i].split('.')[0] + inpute);
					keyArr.push(splitCon[i].split('.')[0]);
				} else if (splitCon[i].split('：').length > 1) { //存在多段样式
					let arr = splitCon[i].split('：');
					if (regd.test(arr[0])) { //若第一个是{{}}样式
						showCon += (divs + dive);
						arr[0] = arr[0].match(regd)[0];
						arr[0] = arr[0].substring(2, arr[0].length - 2);
						showCon += (inputs + 'obj.' + arr[0].split('.')[0] + inpute);
						keyArr.push(arr[0].split('.')[0]);
						arr[1] = arr[1].match(regd)[0];
						arr[1] = arr[1].substring(2, arr[1].length - 2);
						showCon += (inputs + 'obj.' + arr[1].split('.')[0] + inpute);
						keyArr.push(arr[1].split('.')[0]);
					} else {
						showCon += (divs + arr[0] + dive);
						arr[1] = arr[1].match(regd)[0];
						arr[1] = arr[1].substring(2, arr[1].length - 2);
						showCon += (inputl + 'obj.' + arr[1].split('.')[0] + inpute);
						keyArr.push(arr[1].split('.')[0]);
					}
				} else { //纯文本
					showCon += (divl + splitCon[i] + dive);
				}
				showCon += coe;
			}
			if (this.editContener) {
				//                    console.log('$destroy');
				this.editContener.$destroy(true);
				//                    console.log(this.editContener);
			}
			let idstr = 'editContener' + this.opindex;
			this.showHtml = '<div id=' + idstr + '>' + showCon + '</div>';
			//                let that = this;
			//                setTimeout(function() {
			//                    that.editContener = new Vue({
			//                        el: '#' + idstr,
			//                        data: {
			//                            obj: utils.deepCopy(that.obj),
			//                        }
			//                    });
			//                }, 300);
			setTimeout(() => {
				this.editContener = new Vue({
					el: '#' + idstr,
					data: {
						obj: utils.deepCopy(this.obj),
					}
				});
				//                    console.log('setTime');
				//                    console.log(this.editContener);
				//                    console.log(this.obj);
			}, 300);
		},
		setNeedInfoToData: function() {
			//                console.log(this.needInfo);
			let nrr = this.needInfo;
			if ((nrr + '').length < 3) {
				return false;
			} else {
				let reg = /\\'value/;
				//                    console.log(nrr);
				if (reg.test(nrr)) {
					nrr = JSON.parse(JSON.parse(nrr));
					//                        console.log(nrr);
				} else {
					nrr = JSON.parse(nrr);
					//                        console.log(nrr);
				}
				let obj = {};
				//                    console.log(nrr);
				if (nrr != null && nrr != '{}') {
					for (let key in nrr) {
						//                            console.log(nrr[key].value);
						obj[key] = nrr[key].value;
					}
				}
				if (this.optionsList[this.opindex] && this.optionsList[this.opindex].template_id == this.item.key) {
					this.obj = obj;
				} else {
					this.obj = {};
				}
			}

		},
		getAlert: function() { //获取温馨提示
			let info = '';
			for (let i = 0; i < this.item.remind.length; i++) {
				info += this.item.remind[i].name;
				info += this.item.remind[i].remark;
				info += '; ';
			}
			this.alert = info;
		},
		//数组去空
		arrunique(arr) {
			let res = [];
			for (let i = 0; i < arr.length; i++) {
				if (arr[i] != '') {
					res.push(arr[i]);
				}
			}
			return res;
		},
		openOpensList: function() {
			if (this.openOptios) {
				this.openOptios = false;
			} else {
				this.openOptios = true;
			}
		},
		clickOptios: function(i) {
			let sindex = utils.deepCopy(this.opindex);
			if (sindex != i) {
				this.opindex = i;
				this.showInfo = this.optionsList[i];
				this.openOptios = false;
				this.setNeedInfoToData();
				this.getShowHtml();
			}
		},
		//编辑
		async editmeTe(sendData, backRes) {
			let res = await http.saveTemplate({
				data: {
					type: this.list[this.index].type,
					key: this.showInfo.template_id,
					data: sendData,
					shopId: this.userData.currentShop.id
				}
			});
			if (res) {
				res.data = JSON.parse(res.data);
				//this.infoList.splice(this.index, 1, res);
				this.infoList[this.item.type] = res;
				this.$store.commit('setWin', {
					title: '操作提示',
					winType: 'alter',
					content: '保存成功！',
				});
				this.$emit('throwWinResult', backRes);
			}
		},
		//删除
		async delectMete(backRes) {
			let res = await http.delTemplate({
				data: {
					type: this.item.type,
					shopId: this.userData.currentShop.id
				}
			});
			if (res) {
				this.infoList[this.item.type].key = '';
				this.$emit('throwWinResult', backRes);
			}
		},
		clickResult(res) {
			if (res == 'ok') {
				if (this.editContener && this.editContener.obj) {
					let obj = utils.deepCopy(this.editContener.obj);
					let sendData = {};
					for (let i in obj) {
						obj[i] = obj[i].replace(/(^\s*)|(\s*$)/g, '');
						if (obj[i] == '') {
							this.$store.commit('setWin', {
								title: '提示信息',
								winType: 'alter',
								content: '输入框不能为空',
							});
							return false;
						}
						let ob = {};
						ob.value = obj[i];
						ob.color = '#173177';
						sendData[i] = ob;
					}
					this.editmeTe(sendData, res);
				} else {
					this.$emit('throwWinResult', res);
				}
			} else if (res == 'cancel') {
				this.delectMete(res);
			} else {
				this.$emit('throwWinResult', res); //抛出一个事件给父组件
			}
		}
	},
	components: {
		win: () =>
			import ( /*webpackChunkName: 'win'*/ 'src/components/win'),
	}
};
</script>
<style type="text/css" scoped>
#msnmodel-window .width290 {
	width: 290px;
	height: 40px;
	float: left;
}

#msnmodel-window .width100 {
	width: 100%;
	height: 1px;
	background-color: #FFFFFF;
	float: left;
	/*margin-top: 60px;*/
	margin-bottom: 14px;
}

#msnmodel-window .width350 {
	width: 350px;
	text-align: left;
	height: auto;
	line-height: 25px;
	float: left;
	margin-top: 10px;
	font-size: 14px;
}

#msnmodel-window .typeRed {
	background-color: red;
}

#msnmodel-window {
	width: 600px;
	height: auto;
	min-height: 700px;
	background-color: #EEEEEE;
	color: #666666;
	padding-top: 8px;
	overflow: auto;
}

#msnmodel-window .win-title {
	width: 550px;
	margin-left: 10px;
	line-height: 40px;
	/*height: 40px;*/
	text-align: center;
	margin-top: 10px;
	float: left;
}

#msnmodel-window .win-title input {
	width: 340px;
	height: 38px;
	border: none;
	padding-left: 10px;
	float: left;
	margin-right: 10px;
}

#msnmodel-window .w100 {
	width: 80px;
	height: 40px;
	float: left;
	padding-right: 8px;
	text-align: right;
}

#msnmodel-window .w350 {
	width: 350px;
	height: 40px;
	background-color: #fff;
	float: left;
	text-align: left;
	text-indent: 14px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

#msnmodel-window .win-options {
	cursor: pointer;
	width: 59px;
	height: 40px;
	border-left: 1px solid #EEEEEE;
	float: right;
	background: url(../../res/icon/q2x.png) center center no-repeat;
}

#msnmodel-window .win-select {
	position: absolute;
	top: 109px;
	left: 90px;
	width: 350px;
	max-height: 400px;
	background-color: #fff;
	z-index: 666;
	overflow-y: scroll;
	overflow-x: hidden;
}

#msnmodel-window .win-select::-webkit-scrollbar {
	display: none;
}

#msnmodel-window .win-select span {
	display: block;
	width: 100%;
	height: 40px;
	float: left;
	border-bottom: 1px solid #EEEEEE;
	background-color: #fff;
}

#msnmodel-window .selected {
	background: url("../../res/images/sign.png") right bottom no-repeat;
}
</style>