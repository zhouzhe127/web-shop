<template>
	<div>
		<section v-if="!showEdit" style="margin-top: 10px">
			<el-table :data="hotList" stripe :header-cell-style="{'background-color':'#f5f7fa'}" border>
				<el-table-column label="操作" show-overflow-tooltip min-width="250" align="center">
					<template slot-scope="scope">
						<span style="cursor: pointer">
							<span style="color: #28A8E0;" @click="edit(scope.row)">编辑</span>
							<span style="padding:0 10px;color: #D2D2D2;">|</span>
							<span style="color: #fd4c40;" @click="del(scope.row,scope.$index)">删除</span>
						</span>
					</template>
				</el-table-column>
				<el-table-column label="排序" prop="sort" show-overflow-tooltip min-width="120" align="center"></el-table-column>
				<el-table-column label="热区商品名称" prop="name" show-overflow-tooltip min-width="120" align="center"></el-table-column>
				<el-table-column label="所属分类" prop="categoryName" show-overflow-tooltip min-width="120" align="center"></el-table-column>
				<el-table-column label="关联商品数量" show-overflow-tooltip min-width="120" align="center">
					<template slot-scope="scope">
						<span>
							{{scope.row.hotGoods.length}}
						</span>
					</template>
				</el-table-column>
			</el-table>
		</section>
		<section v-if="showEdit">
			<section>
				<span class="redX">热区商品名称</span>
				<el-input v-model="hotGoodsName" maxlength="15" placeholder="请输入区域名称" style="width:200px;"></el-input>
				<span class="redX" style="margin-left:50px">排序</span>
				<el-input-number v-model="sort" style="width:150px;" :min="1" :max="255"></el-input-number>
				<span class="redX" style="margin-left:50px">分类</span>
				<el-button type="primary" @click="addCategoryT">添加分类</el-button>
				<span>{{categoryName}}</span>
			</section>
			<section style="margin-top: 10px;">
				<div style="float: left">
					<section class="boxWrap" :style="{backgroundImage:imageH==''?'url(https://cdn.ishandian.com.cn/web/shop/static/images/busis.bf3c2a77.png)':'url('+ imgHost+imageH +')' }">
						<div v-for="(v,i) in areaList" :key="i" :style="{
							width: v.width+'px',
							height: v.height+'px',
							top: v.top + 'px',
							left: v.left + 'px',
							}" :class="{
							active: tempArea && tempArea.id == v.id,
						}" @mousedown.prevent="mouseDown($event,v,i)" class="area_box">
							<div :style="{lineHeight:v.height+'px'}" style="text-align: center;font-size:16px">{{v.name}}</div>
							<div v-if="tempArea && tempArea.id == v.id">
								<div class="dot_tt"></div>
								<div class="dot_rt"></div>
								<div class="dot_rr"></div>
								<div class="dot_rb"></div>
								<div class="dot_bb"></div>
								<div class="dot_lb"></div>
								<div class="dot_ll"></div>
								<div class="dot_lt"></div>
							</div>
						</div>
					</section>
					<form class="addTo" id="imageUpForm" enctype="multipart/form-data">
						<input type="file" ref="domC" @change='fileNameChange' accept="image/jpeg,image/png,image/jpg,image/bmp" id="file_upload" name="image" onclick="this.value = ''">
						<span>编辑图片</span>
					</form>
				</div>
				<section style="float: left;margin-left:50px">
					<el-table :data="areaList" stripe :header-cell-style="{'background-color':'#f5f7fa'}" border>
						<el-table-column label="操作" show-overflow-tooltip min-width="250" align="center">
							<template slot-scope="scope">
								<span style="cursor: pointer">
									<span style="color: #28A8E0;" @click="editTwo(scope.row,scope.$index)">编辑</span>
									<span style="padding:0 10px;color: #D2D2D2;">|</span>
									<span style="color: #fd4c40;" @click="delTwo(scope.$index)">删除</span>
								</span>
							</template>
						</el-table-column>
						<el-table-column label="热区名称" prop="name" show-overflow-tooltip min-width="200" align="center"></el-table-column>
						<el-table-column label="关联商品" prop="nameC" show-overflow-tooltip min-width="200" align="center"></el-table-column>
					</el-table>
				</section>
			</section>
			<div style="height: 30px;clear: both"></div>
			<section class="saveBack" @click="saveBack">
				保存并返回
			</section>
			<addCategory v-if="isCateGory" :pObj="cObj" @throwCommonWin="throwCommonWin"></addCategory>
			<goodListWin v-if="isGoodsShow" @goodListWin="doThrowWinGoods" :goodsIds="[goodsId]" :packages="[packagesId]" :isGoods="false" :goInName="'hotGoods'" :idAndName="true" :isPackType="'0,1'"></goodListWin>
		</section>
	</div>
</template>

<script>
const Warp = {
	width: 300,
	height: 400
};
//	var _areaId = 1;
function generate_area() {
	return {
		//			id: areaId || _areaId++,
		width: 100,
		height: 100,
		top: 0,
		left: 0,
		isMove: false, // 是否属于移动状态
		isScale: false, // 是否处于缩放状态

		nameC: '' //商品名称
	};
}
/**
 * 是否重叠
 */
function isOverlap(rc1, rc2) {
	if (
		rc1.left + rc1.width > rc2.left &&
		rc2.left + rc2.width > rc1.left &&
		rc1.top + rc1.height > rc2.top &&
		rc2.top + rc2.height > rc1.top
	)
		return true;
	else return false;
}
const mousePosition = {
	x: 0,
	y: 0
};
const minSize = {
	width: 20,
	height: 20
};
// 用于记录 点击放大缩小的 所点的那个按钮的类名
let className = '';
// 用于document的事件绑定
let moveHandle = null;
let mouseupHandle = null;
//let keyupHandle = null;

import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			userData: null,
			arr: [],
			imgHost: '',

			areaList: [], // 区域列表
			tempArea: null,
			selectIndex: -1,

			showEdit: false, //是否展热区图片配置
			hotGoodsName: '', //热区商品名称
			sort: 1, //排序
			imageH: '', //图片地址

			isCateGory: false, //打开添加分类弹窗
			cObj: {}, //传给分类弹窗的数据
			categoryList: [], //所有分类的列表
			categoryName: '', //分类名称
			categoryId: '', //分类id
			cateArr: [], //包括二级的所有分类

			isGoodsShow: false, //是否展示商品弹窗
			goodsId: '', //商品id
			packagesId: '', //套餐id
			editGoodIndex: '', //编辑商品的索引

			hotList: [], //热区商品列表

			isEdit: false, //是否编辑
			editId: '' //编辑列表的id
		};
	},
	props: ['copyGoods', 'copyPacks'],
	created() {
		this.userData = storage.session('userShop');
		this.imgHost = this.userData.uploadUrl;
		this.getCate();
		this.arr = [
			{
				name: '返回',
				className: 'huiC',
				fn: () => {
					this.$emit('hotGoodsBack');
				}
			},
			{
				name: '添加热区商品',
				className: ['addStaff', 'export-btn'],
				fn: this.addHotG,
				type: 2
			}
		];
		this.$store.commit('setPageTools', this.arr);

		moveHandle = this.moveHandle.bind(this);
		mouseupHandle = this.mouseupHandle.bind(this);
		//		keyupHandle = this.keyupHandle.bind(this);
		//		document.addEventListener('keyup', keyupHandle);
	},
	methods: {
		//获取热区商品列表
		async getHotList(cateArr) {
			let data = await http.HotgoodsGetList({
				data: {}
			});
			this.hotList = utils.deepCopy(
				data.map(v => {
					for (let i = 0; i < v.hotGoods.length; i++) {
						v.hotGoods[i].oneLeft = v.hotGoods[
							i
						].startPosition.split(',')[0];
						v.hotGoods[i].oneTop = v.hotGoods[
							i
						].startPosition.split(',')[1];
						v.hotGoods[i].twoLeft = v.hotGoods[i].endPosition.split(
							','
						)[0];
						v.hotGoods[i].twoTop = v.hotGoods[i].endPosition.split(
							','
						)[1];
					}
					for (let j = 0; j < cateArr.length; j++) {
						if (cateArr[j].id == v.categoryId) {
							v.categoryName = cateArr[j].name;
							break;
						}
					}
					return v;
				})
			);
			this.hotList = utils.sortByAll(this.hotList, ['sort', 'id'], true);
			console.log(this.hotList);
		},
		//获取分类
		async getCate() {
			let arr = await http.getCategoryList({
				data: { shopId: this.userData.currentShop.id }
			});
			if (arr) {
				this.categoryList = arr;
			}
			this.cateArr = utils.deepCopy(this.categoryList);
			for (let i = 0; i < this.categoryList.length; i++) {
				if (
					this.categoryList[i].child &&
					this.categoryList[i].child.length > 0
				) {
					this.cateArr = this.cateArr.concat(
						this.categoryList[i].child
					);
				}
			}
			this.getHotList(this.cateArr);
		},
		allCommit() {
			this.$store.commit('setPageTools', [
				{
					name: '返回',
					className: 'huiC',
					fn: () => {
						this.showEdit = false;
						this.$store.commit('setPageTools', this.arr);
					}
				},
				{
					name: '添加选菜热区',
					className: ['addStaff', 'export-btn'],
					fn: () => {
						this.areaList.push(generate_area());
						for (let i = 0; i < this.areaList.length; i++) {
							this.areaList[i].name = `${i + 1}`;
							this.areaList[i].id = i;
						}
					},
					type: 2
				}
			]);
		},
		//添加热区商品
		addHotG() {
			this.isEdit = false;
			this.areaList = [];
			this.hotGoodsName = '';
			this.sort = 1;
			this.imageH = '';
			this.categoryName = '';
			this.categoryId = '';

			this.showEdit = true;
			this.allCommit();
		},
		//列表编辑
		edit(item) {
			this.isEdit = true;
			//赋值
			let arr = utils.deepCopy(item.hotGoods);
			for (let i = 0; i < arr.length; i++) {
				arr[i].name = `${i + 1}`;
				arr[i].isMove = false;
				arr[i].isScale = false;
				arr[i].backId = arr[i].id; //传递给后台的id
				arr[i].id = i; //前端使用的id
				arr[i].top = Number(arr[i].oneTop) * 400;
				arr[i].left = Number(arr[i].oneLeft) * 300;
				arr[i].width =
					(Number(arr[i].twoLeft) - Number(arr[i].oneLeft)) * 300;
				arr[i].height =
					(Number(arr[i].twoTop) - Number(arr[i].oneTop)) * 400;
				if (arr[i].type == 0) {
					for (let j = 0; j < this.copyGoods.length; j++) {
						if (this.copyGoods[j].id == arr[i].typeId) {
							arr[i].nameC = this.copyGoods[j].goodsName;
							break;
						}
					}
				} else {
					for (let j = 0; j < this.copyPacks.length; j++) {
						if (this.copyPacks[j].id == arr[i].typeId) {
							arr[i].nameC = this.copyPacks[j].packageName;
							break;
						}
					}
				}
			}
			this.areaList = arr;
			this.hotGoodsName = item.name;
			this.sort = item.sort;
			this.imageH = item.image;
			this.categoryId = item.categoryId;
			this.categoryName = item.categoryName;
			this.editId = item.id;

			this.showEdit = true;
			this.allCommit();
		},
		//删除
		del(item, i) {
			this.$store.commit('setWin', {
				title: '操作提示',
				winType: 'confirm',
				content: '确认是否删除该热区商品',
				callback: delRes => {
					if (delRes == 'ok') {
						this.queDel(item, i);
					}
				}
			});
		},
		async queDel(item, i) {
			let res = await http.HotgoodsDelete({
				data: { id: item.id }
			});
			if (res) {
				this.hotList.splice(i, 1);
			}
		},
		//菜品编辑
		editTwo(item, i) {
			this.goodsId = '';
			this.packagesId = '';
			if (item.type) {
				item.type == 0
					? (this.goodsId = item.typeId)
					: (this.packagesId = item.typeId);
			}
			this.editGoodIndex = i;
			this.isGoodsShow = true;
		},
		//编辑商品返回
		doThrowWinGoods(res, item) {
			if (res == 'ok') {
				if (item.goodArr.length > 0) {
					this.areaList[this.editGoodIndex].nameC =
						item.goodArr[0].goodsName;
					this.areaList[this.editGoodIndex].typeId =
						item.goodArr[0].id;
					this.areaList[this.editGoodIndex].type = 0;
				} else if (item.packArr.length > 0) {
					this.areaList[this.editGoodIndex].nameC =
						item.packArr[0].packageName;
					this.areaList[this.editGoodIndex].typeId =
						item.packArr[0].id;
					this.areaList[this.editGoodIndex].type = 1;
				}
			}
			this.isGoodsShow = false;
		},
		//菜品删除
		delTwo(i) {
			this.$store.commit('setWin', {
				title: '操作提示',
				winType: 'confirm',
				content: '确认是否删除该选菜区',
				callback: delRes => {
					if (delRes == 'ok') {
						this.delHotGoods(i);
					}
				}
			});
		},
		async delHotGoods(i) {
			this.areaList.splice(i, 1);
			for (let i = 0; i < this.areaList.length; i++) {
				this.areaList[i].name = `${i + 1}`;
				this.areaList[i].id = i;
			}
		},
		//上传图片
		async fileNameChange() {
			//            	console.log(this.$refs.domC.files);
			//            	console.log(this.$refs.domC.files[0].size/1024);
			let res = await http.uploadImg({
				formId: 'imageUpForm',
				data: {
					type: 8,
					shopId: this.userData.currentShop.id
				}
			});
			if (res) {
				this.imageH = res;
			}
		},
		//添加分类
		addCategoryT() {
			this.isCateGory = true;
			this.cObj = {
				category: this.categoryList, //所有分类列表
				selectCategory: [{ id: this.categoryId }], //已选择的分类id列表
				radio: false //单选
			};
		},
		//添加分类返回
		throwCommonWin(arr, res) {
			if (res == 'ok') {
				this.categoryName = arr[0].name;
				this.categoryId = arr[0].id;
			}
			this.isCateGory = false;
		},
		//保存并返回
		saveBack() {
			if (this.imageH == '') {
				this.$store.commit('setWin', {
					title: '错误提示',
					winType: 'alter',
					content: '请上传热区图片'
				});
				return;
			}
			if (
				this.$refs.domC.files > 0 &&
				this.$refs.domC.files[0].size / 1024 > 1024
			) {
				this.$store.commit('setWin', {
					title: '错误提示',
					winType: 'alter',
					content: '图片大小不能超过1M'
				});
				return;
			}
			if (this.categoryId == '') {
				this.$store.commit('setWin', {
					title: '错误提示',
					winType: 'alter',
					content: '请选择分类'
				});
				return;
			}
			if (this.hotGoodsName.trim() == '') {
				this.$store.commit('setWin', {
					title: '错误提示',
					winType: 'alter',
					content: '热区商品名称不能为空'
				});
				return;
			}
			if (this.areaList.length == 0) {
				this.$store.commit('setWin', {
					title: '错误提示',
					winType: 'alter',
					content: '请至少配置一个热区'
				});
				return;
			}
			for (let i = 0; i < this.areaList.length; i++) {
				if (this.areaList[i].nameC.trim() == '') {
					this.$store.commit('setWin', {
						title: '错误提示',
						winType: 'alter',
						content: `请为热区${i + 1}配置商品`
					});
					return;
				}
			}

			let arrOne = [];
			let arrTwo = [];
			for (let i = 0; i < this.areaList.length; i++) {
				if (this.areaList[i].top == 0 && this.areaList[i].left == 0) {
					arrOne.push(this.areaList[i]);
				} else {
					arrTwo.push(this.areaList[i]);
				}
			}
			if (arrOne.length == 1) {
				for (let j = 0; j < arrTwo.length; j++) {
					if (arrTwo[j].top <= 100 && arrTwo[j].left <= 100) {
						this.$store.commit('setWin', {
							title: '错误提示',
							winType: 'alter',
							content: '热区不能重叠'
						});
						return;
					}
				}
			} else if (arrOne.length > 1) {
				this.$store.commit('setWin', {
					title: '错误提示',
					winType: 'alter',
					content: '热区不能重叠'
				});
				return;
			}

			let backArr = [];
			//转换为上下点
			for (let v = 0; v < this.areaList.length; v++) {
				this.areaList[v].oneTop = (
					Number(this.areaList[v].top) / 400
				).toFixed(4);
				this.areaList[v].oneLeft = (
					Number(this.areaList[v].left) / 300
				).toFixed(4);
				this.areaList[v].twoTop = (
					Number(this.areaList[v].height) / 400 +
					Number(this.areaList[v].oneTop)
				).toFixed(4);
				this.areaList[v].twoLeft = (
					Number(this.areaList[v].width) / 300 +
					Number(this.areaList[v].oneLeft)
				).toFixed(4);
				backArr[v] = {};
				backArr[v].type = this.areaList[v].type;
				backArr[v].typeId = Number(this.areaList[v].typeId);
				backArr[v].startPosition = [
					this.areaList[v].oneLeft,
					this.areaList[v].oneTop
				].join(',');
				backArr[v].endPosition = [
					this.areaList[v].twoLeft,
					this.areaList[v].twoTop
				].join(',');
				if (this.isEdit && this.areaList[v].backId) {
					backArr[v].id = this.areaList[v].backId;
				}
			}
			let backObj = {};
			backObj.categoryId = this.categoryId;
			backObj.name = this.hotGoodsName;
			backObj.sort = this.sort;
			backObj.image = this.imageH;
			backObj.hotGoods = backArr;

			console.log(backObj);
			if (this.isEdit) {
				//编辑
				backObj.id = Number(this.editId);
				this.HotgoodsUpdate(backObj);
			} else {
				//添加
				this.HotgoodsAdd(backObj);
			}
		},
		async HotgoodsAdd(item) {
			let res = await http.HotgoodsAdd({
				data: item
			});
			if (res) {
				this.getHotList(this.cateArr);
				this.showEdit = false;
				this.$store.commit('setPageTools', this.arr);
			}
		},
		async HotgoodsUpdate(item) {
			let res = await http.HotgoodsUpdate({
				data: item
			});
			if (res) {
				this.getHotList(this.cateArr);
				this.showEdit = false;
				this.$store.commit('setPageTools', this.arr);
			}
		},

		// 盒子的移动
		mouseDown(e, box, i) {
			this.tempArea = JSON.parse(JSON.stringify(box));
			let target = e.target;
			let targetClassName = target.className;
			if (targetClassName.indexOf('dot_') >= 0) {
				box.isScale = true;
				box.isMove = false;
				className = targetClassName;
			} else {
				box.isMove = true;
				box.isScale = false;
			}
			this.selectIndex = i;
			mousePosition.x = e.screenX;
			mousePosition.y = e.screenY;
			clearTimeout(this.timer);
			document.addEventListener('mousemove', moveHandle);
			document.addEventListener('mouseup', mouseupHandle);
		},
		moveHandle(e) {
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				let box = this.areaList[this.selectIndex];
				if (!box) return;
				let moveX = e.screenX - mousePosition.x;
				let moveY = e.screenY - mousePosition.y;
				mousePosition.x = e.screenX;
				mousePosition.y = e.screenY;
				// 移动
				if (box.isMove) {
					this.moveBox(box, {
						x: box.left + moveX,
						y: box.top + moveY
					});
					// 缩放
				} else if (box.isScale) {
					// 左边 x+ w-
					if (/dot_l(t|l|b)/g.test(className)) {
						this.moveBox(box, { x: box.left + moveX })
							? this.moveBox(box, { w: box.width - moveX })
							: '';
					}
					// 上边 y+ h+
					if (/dot_(l|t|r)t/g.test(className)) {
						this.moveBox(box, { y: box.top + moveY })
							? this.moveBox(box, { h: box.height - moveY })
							: '';
					}
					// w+ 右边
					if (/dot_r(t|r|b)/g.test(className)) {
						// box.width += moveX;
						this.moveBox(box, {
							w: box.width + moveX
						});
					}
					// h+ 下边
					if (/dot_(l|b|r)b/g.test(className)) {
						// box.height += moveY;
						this.moveBox(box, {
							h: box.height + moveY
						});
					}
				}
			}, 12);
		},
		mouseupHandle() {
			document.removeEventListener('mousemove', moveHandle);
			document.removeEventListener('mouseup', mouseupHandle);
			let box = this.areaList[this.selectIndex];
			// 边界判定成功
			if (box) {
				box.isScale = false;
				box.isMove = false;
			}
			mousePosition.x = 0;
			mousePosition.y = 0;
			let isOverlap = this.areaOverlap(this.selectIndex);
			if (isOverlap) {
				this.areaList.splice(this.selectIndex, 1, this.tempArea);
			}
		},
		areaOverlap(index) {
			let box = this.areaList[this.selectIndex];
			return this.areaList.some((v, i) => {
				return i == index ? false : isOverlap(box, v);
			});
			//			for (let i = 0; i < this.areaList.length; i++) {
			//				if (i == index) continue;
			//				const areaBox = this.areaList[i];
			//				if (isOverlap(areaBox, box)) {
			//					return true;
			//				}
			//			}
			//			return false;
		},
		// 告诉我你要去哪，我自己判定边界
		moveBox(box, { w, h, x, y }) {
			let isBoundary = false;
			// 要移动
			if (x != undefined) {
				box.left =
					x < 0
						? 0
						: x + box.width > Warp.width
							? Warp.width - box.width
							: x;
				isBoundary = box.left != x ? true : isBoundary;
			}
			if (y != undefined) {
				box.top =
					y < 0
						? 0
						: y + box.height > Warp.height
							? Warp.height - box.height
							: y;
				isBoundary = box.top != y ? true : isBoundary;
			}
			if (w != undefined) {
				box.width =
					w < minSize.width
						? minSize.width
						: box.left + w > Warp.width ? Warp.width - box.left : w;
				isBoundary = box.width != w ? true : isBoundary;
			}
			if (h != undefined) {
				box.height =
					h < minSize.width
						? minSize.width
						: box.top + h > Warp.height ? Warp.height - box.top : h;
				isBoundary = box.height != h ? true : isBoundary;
			}
			return !isBoundary; // 只要碰到边界就会返回false
		}
		//		keyupHandle(e) {
		//			if (e.code == 'Backspace' || e.code == 'Delete') {
		//				if (this.selectIndex >= 0) {
		//					let box = this.areaList[this.selectIndex];
		//					if (!box.isScale && !box.isMove) {
		//						this.areaList.splice(this.selectIndex, 1);
		//						this.selectIndex = -1;
		//					}
		//				}
		//			}
		//		}
	},
	destroyed() {
		// 确保 document 事件一定删除了
		document.removeEventListener('mousemove', moveHandle);
		document.removeEventListener('mouseup', mouseupHandle);
		//		document.removeEventListener('keyup', keyupHandle);

		this.$store.commit('setPageTools', []);
	},
	components: {
		addCategory: () =>
			import(/*webpackChunkName:'add_category_win'*/ '../goods_manager_coms/add_category_win'),
		goodListWin: () =>
			import(/* webpackChunkName:"good_list_win" */ 'src/components/good_list_win')
	}
};
</script>

<style scoped lang="less">
.addTo {
	display: block;
	position: relative;
	width: 300px;
	height: 40px;
	text-align: center;
	background-color: #24a9e0;
	color: white;
	line-height: 40px;
	input {
		position: absolute;
		left: 0;
		top: 0;
		height: 40px;
		opacity: 0;
		width: 100%;
		cursor: pointer;
	}
}
.boxWrap {
	width: 300px;
	height: 400px;
	background-repeat: no-repeat;
	background-size: 100% 100%;
	/*border: 1px solid orange;*/
	position: relative;
	.active {
		border: 1px dotted rgb(76, 255, 136);
	}
	.area_box {
		border: 1px dotted transparent;
		position: absolute;
		background-color: rgba(238, 33, 37, 0.45);
		cursor: pointer;
		div[class^='dot_'] {
			position: absolute;
			width: 8px;
			height: 8px;
			border: 1px solid #000;
			background-color: #fff;
			cursor: move;
		}
	}
	.dot_lt {
		left: -4px;
		top: -4px;
	}
	.dot_ll {
		left: -4px;
		top: 50%;
		transform: translate(0, -4px);
	}
	.dot_lb {
		left: -4px;
		bottom: -4px;
	}
	.dot_rt {
		right: -4px;
		top: -4px;
	}
	.dot_rr {
		right: -4px;
		top: 50%;
		transform: translate(0, -4px);
	}
	.dot_rb {
		right: -4px;
		bottom: -4px;
	}
	.dot_tt {
		top: -4px;
		left: 50%;
		transform: translate(-4px, 0);
	}
	.dot_bb {
		bottom: -4px;
		left: 50%;
		transform: translate(-4px, 0);
	}
}
.saveBack {
	width: 150px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	background-color: #e1bb4a;
	cursor: pointer;
	color: white;
}
.redX:after {
	content: '*';
	color: red;
	margin: 0 2px;
}
</style>

