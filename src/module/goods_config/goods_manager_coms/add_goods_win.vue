<template>
	<div id="detail-addgoods">

		<win :height="650" :width="700" @winEvent="closeSelfWin" :align="'right'" :ok="btnOk" :cancel="btnCancel">
			<span slot="title">{{title}}</span>
			<div slot="content" class="win-content">
				<section>
					<!--		三种类型商品的公共部分	-->
					<section class="titleTop" style="width:100%;height:40px;">
						<div class="good-baseInfo">
							<i></i>
							<h3>基本信息</h3>
							<div class="dian"></div>
							<span v-if="good.id">商品ID:{{good.id}}</span>
						</div>
					</section>
					<section style="width:100%;overflow:hidden;">
						<section style="width:430px;float:left;">
							<el-form :model="good" ref="good" label-width="80px">
								<el-form-item required label="类型" prop="type">
									<template v-if="!editGoodsId">
										<el-radio-group v-model="good.type" @change="toggleGoodType">
											<el-radio-button label="0">普通商品</el-radio-button>
											<el-radio-button label="1">称重商品</el-radio-button>
											<el-radio-button label="2">自定义商品</el-radio-button>
										</el-radio-group>
									</template>
									<template v-if="editGoodsId">
										<el-radio-group v-model="good.type">
											<el-radio-button :label="good.type">
												<span v-if="good.type==0">普通商品</span>
												<span v-if="good.type==1">称重商品</span>
												<span v-if="good.type==2">自定义商品</span>
											</el-radio-button>
										</el-radio-group>
									</template>
								</el-form-item>
								<template v-if="good.type==1 || good.type==0">
									<el-form-item required label="名称">
										<el-input v-model="good.goodsName" maxlength="45" placeholder="请输入商品名称" style="width:270px;"></el-input>
									</el-form-item>
									<el-form-item label="简码" prop="BC">
										<el-input v-model="good.BC" maxlength="20" placeholder="请输入商品简码" style="width:270px;"></el-input>
									</el-form-item>
									<el-form-item v-if="good.type==0 && good.isGroup !=='1'" required label="售价">
										<el-input v-model="good.price" maxlength="7" placeholder="请输入售价" style="width:120px;">
											<i slot="suffix">元</i>
										</el-input>
										<el-input v-model="good.unit" maxlength="5" placeholder="单位" style="width:80px;"></el-input>
										<el-input v-model="good.cost" maxlength="10" placeholder="输入成本" style="width:110px;">
											<i slot="suffix">元</i>
										</el-input>
									</el-form-item>
									<el-form-item v-if="good.type==1" required label="售价">
										<el-input v-model="good.price" maxlength="7" placeholder="请输入售价" style="width:120px;">
											<i slot="suffix">元</i>
										</el-input>
										<el-select v-model="good.unit" :disabled="good.isCode==1?true:false" placeholder="选择单位" style="width:80px">
											<el-option v-for="item in unitArr" :key="item.name" :label="item.name" :value="item.name"> </el-option>
										</el-select>
										<el-input v-model="good.cost" maxlength="10" placeholder="输入成本" style="width:110px;">
											<i slot="suffix">元</i>
										</el-input>
									</el-form-item>
								</template>
							</el-form>
						</section>
						<section style="width:220px;float:right;margin-right:25px;">
							<el-form :model="good" ref="good" label-width="80px">
								<el-form-item required label="排序">
									<el-input-number v-model="good.sort" style="width:150px;" :min="1" :max="255"></el-input-number>
								</el-form-item>
							</el-form>
							<div v-if="good.type==1 || good.type==0" class="good-image">
								<div class="good-image-div" id="image">
									<img v-if="!!good.imageName" :src="(good.imageName.indexOf('http')>-1)?good.imageName: imgHost+good.imageName" width="225" height="150">
									<img v-else src="../../../res/images/busis.png" width="225" height="150" alt="商品" />
									<a class="gray good-image-delete" @click="deleteGoodImg">删除图片</a>
									<a class="good-image-edit">编辑图片</a>
									<form enctype="multipart/form-data" id="img_upload">
										<input type="file" @change="uploadGoodsImg" accept="image/jpeg,image/png,image/gif,image/tiff" name="image" class="good-image-file" />
									</form>
								</div>
							</div>
						</section>
					</section>

					<section v-if="good.type!=2" style="width:100%;">
						<el-form :model="good" ref="good" :inline="true" label-width="105px">
							<!--		普通菜		-->
							<template v-if="good.type==0 && good.isInvoicing==1">
								<el-form-item v-if="good.isGroup =='0'" label="品牌" style="width:350px;">
									<el-button @click="openCommonWin('brand')" type="primary" style="width:100px;">选择品牌</el-button>
									<span v-if="selectBrandObj.name" class="sign" style="width:120px;padding:0 10px;">{{selectBrandObj.name}}</span>
								</el-form-item>
								<el-form-item v-if="good.isGroup =='0'" required label="条码" style="width:310px;">
									<el-input v-model="good.barCode" maxlength="13" placeholder="输入条码" style="width:200px;">
										<el-button slot="append" @click="setBarCode('barCode',null,null)" style="width:82px;padding:0;">获取条码</el-button>
									</el-input>
								</el-form-item>
								<el-form-item v-if="good.isGroup =='0'" label="保质期" style="width:350px;">
									<el-input v-model="good.validity" maxlength="3" placeholder="输入保质期" style="width:120px;"></el-input>
									<el-select v-model="good.validityType" style="width:60px">
										<el-option v-for="item in validityTypeArr" :key="item.id" :value="item.id" :label="item.name">{{item.name}} </el-option>
									</el-select>
								</el-form-item>
								<el-form-item v-if="good.isGroup =='0'" label="副条码" style="width:310px;">
									<el-input v-model="good.secBarCode" maxlength="13" placeholder="输入副条码" style="width:200px;">
										<el-button slot="append" @click="setBarCode('secBarCode',null,null)" style="width:82px;padding:0;">获取副条码</el-button>
									</el-input>
								</el-form-item>
								<el-form-item v-if="good.isGroup =='0'" required label="规格">
									<el-input v-model="good.specifications" maxlength="21" placeholder="输入规格" style="width:220px;"></el-input>
								</el-form-item>
							</template>
							<!--		称重菜		-->
							<template v-if="good.type==1 && good.isCode==1">
								<el-form-item label="品牌" style="width:350px;">
									<el-button @click="openCommonWin('brand')" type="primary" style="width:100px;">选择品牌</el-button>
									<span v-if="selectBrandObj.name" class="sign" style="width:120px;padding:0 10px;">{{selectBrandObj.name}}</span>
								</el-form-item>
								<el-form-item required label="类别(识别码)" style="width:310px;">
									<el-select v-model="identifyName" style="width:200px" @change="funSelectList">
										<el-option v-for="(item,i) in barList" :key="i" :value="i" :label="item.name">{{item.name}} </el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="保质期" style="width:350px;">
									<el-input v-model="good.validity" maxlength="3" placeholder="输入保质期" style="width:120px;"></el-input>
									<el-select v-model="good.validityType" style="width:60px">
										<el-option v-for="item in validityTypeArr" :key="item.id" :value="item.id" :label="item.name">{{item.name}} </el-option>
									</el-select>
								</el-form-item>
								<el-form-item required label="商品识别码">
									<el-input v-model="good.identifyCode" maxlength="5" placeholder="输入商品识别码" style="width:213px;">
										<el-button slot="append" @click="setBarCode('identifyCode',null,null)" style="width:82px;padding:0;">生成识别码</el-button>
									</el-input>
								</el-form-item>
							</template>
						</el-form>
					</section>

					<section v-if="good.type!=2" style="width:100%;">
						<el-form :model="good" ref="good" label-width="80px">
							<el-form-item v-if="good.categoryCode!='' && (good.goodsCode !=='' || ischain=='0'||ischain=='3') && good.id*1 < 100000 || good.id*1 >1000000" label="编码">
								<span>{{good.categoryCode}}-</span>
								<el-input v-if="ischain=='0'||ischain=='3'" v-model="good.goodsCode" maxlength="5" placeholder="输入编码" style="width:90px;"></el-input>
								<span v-if="ischain=='1'||ischain=='2'">{{good.goodsCode}}</span>
							</el-form-item>
							<el-form-item required label="分类">
								<span class="sign" v-for="(cat,index) in selectCategory" :key="index" v-on:click="deleteSelectCategory(cat,index)">{{cat.name}}</span>
								<el-button @click="openCommonWin('category')" type="primary" style="width:100px;">添加分类</el-button>
							</el-form-item>
							<el-form-item v-if="good.id" label="来源">
								<span v-if="good.id>100000">门店自建</span>
								<span v-if="good.id>0&&good.id<100000">品牌同步</span>
							</el-form-item>
							<el-form-item v-show="good.isGroup=='0' && good.isCode!=1" label="口味">
								<span v-for="(att,index) in selectAttr" :key="index" v-on:click="deleteSelectAttr(index)" class="sign">{{att.name}}</span>
								<el-button @click="openCommonWin('attr')" type="primary" style="width:100px;">添加口味</el-button>
							</el-form-item>
							<el-form-item v-show="good.type==0" label="多规格">
								<el-switch v-model="good.isGroup" active-value="1" inactive-value="0" @change="toggleIsGroup" active-color="#E1BB4A" inactive-color="#e6e6e6"></el-switch>
								<el-button v-if="good.isGroup==1" @click="addGroup(1)" type="primary" style="width:140px;">添加规格</el-button>
							</el-form-item>
							<template v-if="good.isGroup=='1' && good.type==0" v-for="(group,groupIndex) in groupData">
								<section :key="groupIndex">
									<el-form-item required :label="'规格'+(groupIndex+1)">
										<el-input v-model="group.goodsName" maxlength="6" placeholder="规格名称" style="width:90px;"></el-input>
										<span class="required" style="color:#606266">售价</span>
										<el-input v-model="group.price" maxlength="10" placeholder="售价" style="width:90px;"></el-input>
										<span style="color:#606266">元</span>
										<span style="color:#606266">成本</span>
										<el-input v-model="group.cost" maxlength="10" placeholder="成本" style="width:90px;"></el-input>
										<span style="color:#606266">元</span>
										<span class="required" style="color:#606266">单位</span>
										<el-input v-model="group.unit" maxlength="10" placeholder="单位" style="width:60px;"></el-input>
										<el-button @click="deleteGroup(group,groupIndex)" size="mini" round type="primary" style="width:80px;">解除关联</el-button>
									</el-form-item>
									<el-form-item v-if="good.isInvoicing==1" required label="条码">
										<el-input v-model="group.barCode" maxlength="13" placeholder="输入条码" style="width:200px;">
											<el-button slot="append" @click="setBarCode('groupBarCode',group,groupIndex)" style="width:70px;padding:0;">获取条码</el-button>
										</el-input>
										<span style="margin-left:10px;color:#606266">副条码</span>
										<el-input v-model="group.secBarCode" maxlength="13" placeholder="输入副条码" style="width:200px;">
											<el-button slot="append" @click="setBarCode('groupSecBarCode',group,groupIndex)" style="width:80px;padding:0;">获取副条码</el-button>
										</el-input>
									</el-form-item>
									<el-form-item v-if="good.isInvoicing==1" label="保质期">
										<el-input v-model="group.validity" maxlength="3" placeholder="输入保质期" style="width:105px;"></el-input>
										<el-select v-model="group.validityType" style="width:60px">
											<el-option v-for="item in validityTypeArr" :key="item.id" :value="item.id" :label="item.name">{{item.name}}</el-option>
										</el-select>
										<span v-if="good.isVip =='1'" class="required">会员价格</span>
										<el-input v-if="good.isVip =='1'" v-model="group.vipPrice" maxlength="10" placeholder="输入会员价" style="width:120px;"></el-input>
										<span v-if="isSpecial" class="required" style="margin-left:10px;">特价</span>
										<el-input v-if="isSpecial" v-model="group.specialPrice" maxlength="10" placeholder="输入特价" style="width:120px;"></el-input>
									</el-form-item>
									<el-form-item v-if="good.isVip =='1' && good.isInvoicing==0" required label="会员价格" style="width:300px;">
										<el-input v-model="group.vipPrice" maxlength="10" placeholder="输入会员价" style="width:120px;"></el-input>
									</el-form-item>
									<el-form-item v-if="isSpecial && good.isInvoicing==0" required label="特价" style="width:300px;">
										<el-input v-model="group.specialPrice" maxlength="10" placeholder="输入特价" style="width:120px;"></el-input>
									</el-form-item>
									<el-form-item v-if="!group.id" label="">
										<el-button @click="openMultipleAddRelativeGoodWin(group,groupIndex)" type="primary" style="width:140px;">添加关联商品</el-button>
										<span v-if="group.relativeGood.goodsName" style="width:120px;padding:0 10px;">已关联商品：</span>
										<span v-if="group.relativeGood.goodsName" @click="deleteRelativeGood(group,groupIndex)" class="sign" style="padding:0 10px;">{{group.relativeGood.goodsName}}</span>
									</el-form-item>
									<el-form-item label="">
										<el-button @click="openMultipleAttrWin(group,groupIndex)" type="primary" style="width:140px;">添加口味</el-button>
										<span v-for="(att,attIndex) in group.attr" :key="attIndex" v-on:click="deleteSelectAttrMul(group.attr,attIndex,att)" class="sign">{{att.name}}</span>
									</el-form-item>
								</section>
							</template>

						</el-form>
					</section>
					<section v-if="good.type!=2" class="titleTop" style="width:100%;">
						<div class="relative-info">
							<i></i>
							<h3>关联信息</h3>
							<div class="dian"></div>
						</div>
						<el-form :model="good" ref="good" :inline="true" label-width="100px">
							<el-form-item label="参与优惠" style="width:200px;">
								<el-switch v-model="good.isDiscount" active-value="1" inactive-value="0" active-color="#E1BB4A" inactive-color="#e6e6e6"></el-switch>
							</el-form-item>
							<el-form-item label="服务费" style="width:200px;">
								<el-switch v-model="good.serviceCharge" active-value="1" inactive-value="0" active-color="#E1BB4A" inactive-color="#e6e6e6"></el-switch>
							</el-form-item>
							<el-form-item label="推荐菜" style="width:200px;">
								<el-switch v-model="good.isRecommend" active-value="1" inactive-value="0" active-color="#E1BB4A" inactive-color="#e6e6e6"></el-switch>
							</el-form-item>
							<el-form-item label="开启进销存" style="width:200px;">
								<el-switch v-model="good.isInvoicing" active-value="1" inactive-value="0" @change="toggleIsInvoicing" active-color="#E1BB4A" inactive-color="#e6e6e6"></el-switch>
							</el-form-item>
							<el-form-item label="自取" v-if="good.type==0" style="width:200px;">
								<el-switch v-model="good.isSelf" active-value="1" inactive-value="0" active-color="#E1BB4A" inactive-color="#e6e6e6"></el-switch>
							</el-form-item>
							<el-form-item label="识别码" v-if="good.type==1" style="width:200px;">
								<el-switch v-model="good.isCode" active-value="1" inactive-value="0" @change="toggleIsCode" active-color="#E1BB4A" inactive-color="#e6e6e6"></el-switch>
							</el-form-item>
							<el-form-item v-if="ischain !='3'" label="开启库存" style="width:200px;">
								<el-switch v-model="good.isStock" active-value="1" inactive-value="0" @change="toggleIsStock" active-color="#E1BB4A" inactive-color="#e6e6e6"></el-switch>
							</el-form-item>
							<el-form-item label="时价菜" style="width:200px;">
								<el-switch v-model="good.isSeasonal" @change="changeSeasonal" active-value="1" inactive-value="0" active-color="#E1BB4A" inactive-color="#e6e6e6"></el-switch>
							</el-form-item>
							<el-form-item label="参与会员 " style="min-width:200px;">
								<el-switch v-model="isVipShow" @change="openVipRadio" active-color="#E1BB4A" inactive-color="#e6e6e6"></el-switch>
								<template v-if="isVipShow">
									<el-radio @click="getVipRadio('1')" v-model="good.isVip" label="1" border style="margin-left:10px;">会员价格</el-radio>
									<el-radio @click="getVipRadio('2')" v-model="good.isVip" label="2" border>会员折扣</el-radio>
								</template>
								<template v-if="good.isVip == '1' && good.isGroup==0">
									<span style="color:#606266;margin:0 20px;">会员价格</span>
									<el-input v-model="good.vipPrice" maxlength="10" placeholder="输入会员价" style="width:120px;"></el-input>
								</template>
							</el-form-item>
							<el-form-item label="特价" style="min-width:200px;">
								<el-switch v-model="isSpecial" @change="openSpecialRadio" active-color="#E1BB4A" inactive-color="#e6e6e6"></el-switch>
								<template v-if="isSpecial && good.isGroup==0">
									<span style="color:#606266;margin:0 20px;">特价价格</span>
									<el-input v-model="good.specialPrice" maxlength="10" placeholder="输入特价价格" style="width:120px;"></el-input>
								</template>
							</el-form-item>
							<el-form-item label="描述" prop="description">
								<el-input type="textarea" placeholder="请输入描述" maxlength="100" :autosize="{minRows: 3, maxRows: 6}" v-model="good.description" style="width:500px;"></el-input>
							</el-form-item>
						</el-form>
					</section>
				</section>
				<section v-if="good.type==2">
					<el-form :model="good" ref="good" label-width="100px">
						<el-form-item v-if="good.categoryCode!=''" label="编码">
							<span>{{good.categoryCode}}-</span>
							<el-input v-model="good.goodsCode" maxlength="5" placeholder="输入编码" style="width:90px;"></el-input>
						</el-form-item>
						<el-form-item required label="分类">
							<span class="sign" v-for="(cat,index) in selectCategory" :key="index" v-on:click="deleteSelectCategory(cat,index)">{{cat.name}}</span>
							<el-button @click="openCommonWin('category')" type="primary" style="width:100px;">添加分类</el-button>
						</el-form-item>
					</el-form>
				</section>
			</div>
		</win>
		<component :is="showCom" :pObj="comObj" :pGoodsList="comObj" @throwCommonWin="closeCommonWin" @throwGoodListWin="closeMultipleAddRelativeGoodWin"></component>
	</div>
</template>
<script>
/*
	1)多规格商品最少两个规格
	2)已创建的商品不可修改商品的类型 (type)
	3)创建商品,并开启多规格时,可以选择关联商品,不显示关联商品,多规格添加关联商品是单选,即只能关联一个商品
	4)称重商品开启了识别码的时候,商品的单位不可以修改 (unit)  但是通过切换识别码却可以间接的改变单位;
	5)称重商品的barcode字段由称重商品的类别识别码(code)与生成的5位数字商品识别码组成(identifyCode),显示商品识别码时,只显示barcode的后5位.(商品识别码一定要是5位)
	6)(添加关联商品):只显示上架的普通商品,多规格主菜和子菜都不显示
	7)普通的菜的为条码,称重菜的为识别码
	8)普通菜,称重菜:进销存和库存只能开启一个,不能同时开启
	9)编辑商品的时候若开启了进销存,则不能开启多规格,若开启了多规格和进销存,则不能取消多规格
	10)每种类型的商品最少要有一个分类(品牌同步商品不可以修改分类)
	11)多规格关联商品不能修改关联
	12)品牌能够修改
	13)0:上架,2:下架:1估清
	14)称重菜开启识别码时,去除口味,即不能添加口味
	15)保质期和成本不是必须填写的
	16)图片上传之后在点击保存才有效
	17)编辑自定义菜品时,自定义菜品的分类不能删除也不能修改
	18)下架多规格商品时,需要把子菜的id也提交上去
	19)普通菜关联商品的时候,当该商品开启进销存,则可以关联的商品也是要已经开启进校存
	20)称重菜开启识别码只能否选择g,Kg,称重菜开启进销存默认开启了商品识别码.
	21)编辑商品的时候,当该商品已经关联了BOM单,不能开启进销存
	22)多规格菜:开启了进销存的多规格菜,添加关联商品的时候不能选择已经关联了BOM单的商品.
	23)商品的售价,成本,会员价格可以为0

	问题:
	1)普通菜关联了BOM单,然后开启多规格,能否开启进销存.
	2)多规格关联商品的时候是否需要把条码,副条码,保质期,会员价格自动添上去.

	逻辑:

*/
import http from 'src/manager/http';
import global from 'src/manager/global';
export default {
	data() {
		return {
			// testImg:'this.src="' + require('../../../res/images/busis.png') + '"',//加载图片失败默认显示的图片
			// testImg:`this.src=${require('../../../res/images/busis.png')}`,//加载图片失败默认显示的图片
			goodsType: [
				{ type: 0, name: '普通菜品' },
				{ type: 1, name: '称重菜品' },
				{ type: 2, name: '自定义菜品' }
			], //商品类型
			validityTypeArr: [
				{ id: 0, name: '月' },
				{ id: 1, name: '日' },
				{ id: 2, name: '年' }
			], //保质期的类型
			unitArr: [
				{ id: 0, name: '斤' },
				{ id: 1, name: '两' },
				{ id: 2, name: 'g' },
				{ id: 3, name: 'Kg' },
				{ id: 4, name: '币' }
			], //商品的单位
			btnOk: {}, //右边按钮
			btnCancel: {}, //左边按钮

			//传递的数据
			shopId: null,
			brandId: null,
			title: '', //弹窗标题
			editGoodsId: null, //正在编辑的商品的id
			ischain: null, //店铺类型
			imgHost: null, //图片地址前缀
			goodsList: [], //所有商品
			category: [], //所有的分类
			status: null, //商品的上下架状态

			good: {
				id: '', //商品id
				attr: [], //口味
				type: 0, //商品的类型
				sort: 1, //获取商品的排序值
				goodsName: '', //商品名
				brandId: '', //添加的品牌id
				BC: '', //简码
				price: '', //售价
				unit: '', //单位
				cost: '', //成本
				barCode: '', //普通菜条码 || 称重菜识别码
				secBarCode: '', //第二个条码
				description: '', //描述
				validity: '', //保质期时间
				validityType: 0, //保质期的类型 0:月 1:日 2:年
				isGroup: 0, //是否是多规格
				isDiscount: false, //是否开启折扣
				serviceCharge: false, //是否开启服务费
				isRecommend: false, //是否开启推荐菜
				isInvoicing: false, //是否开启进销存
				isSelf: false, //是否开启自取
				isStock: false, //是否开启库存
				isSeasonal: false, //是否开启时价菜
				isVip: false, //是否开启会员		0:未开启 1:开启会员价格 2:开启折扣
				isBom: 0, //是否关联bom单
				isCode: false, //是否开启识别码	(称重商品)
				imageName: '', //图片的名字
				specifications: '', //输入的规格
				vipPrice: '', //会员价格
				vipDiscount: '', //会员折扣

				identifyCode: '', //(实际不存在的字段)生成的称重商品的识别码(5位)
				code: '', //(实际不存在的字段)称重商品类别识别码 称重商品的barCode=good.code+good.identifyCode
				categoryCode: '', //编码前段部分
				goodsCode: '' //编码后段部分
			},
			identifyCodeMax: null, //比较所有商品识别之后生成的最大商品识别码
			identifyName: '选择类别识别码', //称重商品类别识别码展示的文字

			attr: [], //所有的口味列表
			brandList: [], //品牌列表
			barList: [], //类别识别码

			showCom: null, //需要展示的组件
			comObj: {}, //传递给组件的数据

			showBarList: false, //称重商品识别码下拉框的展示
			showValidity: false, //非多规格普通菜,称重菜保质期下拉框的展示
			showUnit: false, //是否展示单位(称重商品)

			selectAttr: [], //非多规格选择的口味
			selectBrandObj: {}, //选择的品牌对象
			selectCategory: [], //选择的商品分类[{gid: 100047, name: "饿了么", id: "100005"}]

			groupData: [], //存储多规格商品:attr,barCode,cost,goodsName,id,price,unit(多规格需要提交的数据)
			nowGroupIndex: {}, //groupDate中的一个元素
			flag: '', //当前编辑的是哪个窗口

			test: {}, //校验表单的临时对象
			mapHttp: {
				uploadImg: 'uploadImg', //上传图片
				downChildGoods: 'downChildGoods', //删除规格
				getAttr: 'getAttr', //获取口味
				getGoodsDetail: 'getGoodsDetail', //获取商品详情
				goodEdit: 'goodEdit', //编辑商品
				createGood: 'createGood', //添加商品
				brandList: 'brandList', //获取品牌列表
				GoodWeighgoodsGetList: 'GoodWeighgoodsGetList', //获取识别码
				goodUpOrDownShelf: 'goodUpOrDownShelf' //商品的上下架
			},
			isVipShow: false, //是否VIP
			isSpecial:false //是否特价
		};
	},
	props: {
		pObj: null
		/*
			{
				editGoodsId:			//当前编辑的商品id
				status:				//商品的上下架状态
				ischain:				//店铺类型
				shopId:				//店铺id
				category:				//所有的分类
				imgHost:				//图片地址的前缀
				goodsList:			//所有的商品
				title:				//弹窗的标题
			}
		*/
	},
	methods: {
		// 切换开通会员后，折扣和会员价格
		getVipRadio(res) {
			this.good.isVip = res;
		},
		//会员开通关闭
		openVipRadio(res) {
			this.isVipShow = res;
			if (this.isVipShow) {
				this.good.isVip = '1';
			} else {
				this.good.isVip = '0';
			}
		},
		//时价菜开启关闭 不能和特价兼容
		changeSeasonal(res){
			if(this.isSpecial && res == '1'){
				this.alertWin('特价开启，不能开启时价菜!');
				this.good.isSeasonal = '0';
				return false;
			}
			this.good.isSeasonal = res;
		},
		//特价开通关闭 不能和时价菜兼容
		openSpecialRadio(res) {
			if(this.good.isSeasonal == '1' && res){
				this.alertWin('时价菜开启，不能开启特价!');
				this.isSpecial = false;
				return false;
			}
			this.isSpecial = res;
		},
		//切换商品的类型
		toggleGoodType(id) {
			if (this.editGoodsId) return;
			this.good.isInvoicing = 0;
			this.good.isStock = 0;
			this.good.isCode = 0;
			this.good.isGroup = 0;

			this.good.type = id;
			switch ('' + this.good.type) {
				case '0':
					this.good.unit = '';
					// this.good.validityType = '月';
					break;
				case '1':
					this.good.unit = '斤';
					// this.good.validityType = '月';
					break;
				case '2':
					this.selectCategory = [];
					break;
			}
		},
		//编辑图片
		async uploadGoodsImg() {
			this.good.imageName = await this.getHttp(this.mapHttp.uploadImg, {
				data: {
					type: 5,
					shopId: this.shopId
				},
				formId: 'img_upload'
			});
		},
		//删除图片
		deleteGoodImg() {
			if (!this.good.imageName) {
				this.alertWin('此商品无图片!');
				return;
			}
			this.$store.commit('setWin', {
				title: '温馨提示',
				winType: 'confirm',
				content: '确认删除图片?',
				callback: res => {
					if (res == 'ok') {
						this.good.imageName = '';
					}
				}
			});
		},
		//-----------			普通菜		-----------
		//生成普通菜的条码
		generatorBarCode() {
			let barCode = '90' + ((Math.random() * 90000000) | 10000000) + '';
			return barCode;
		},
		//设置副条码,条码,识别码
		writeBarCode(obj, attr, fn) {
			obj[attr] = String(obj[attr]);
			if (obj[attr] && obj[attr].trim().length > 0) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					content: obj.tips,
					winType: 'confirm',
					callback: res => {
						if (res == 'ok') obj[attr] = fn();
					}
				});
			} else {
				obj[attr] = fn();
			}
		},
		//写入条码,副条码,商品识别码
		setBarCode(flag, group, index) {
			let attr = null;
			switch (flag) {
				case 'barCode': //主条码
				case 'secBarCode': //副条码
					this.good.tips = `确认重新设置${
						flag == 'barCode' ? '主' : '副'
					}条码?`;
					this.writeBarCode(this.good, flag, this.generatorBarCode);
					break;
				case 'groupBarCode': //多规格的主条码
				case 'groupSecBarCode': //多规格的副条码
					attr = flag == 'groupBarCode' ? 'barCode' : 'secBarCode';
					group.tips = `确认重新设置${
						flag == 'groupBarCode' ? '主' : '副'
					}条码?`;
					this.writeBarCode(group, attr, this.generatorBarCode);
					this.groupData.splice(index, 1, group);
					break;
				case 'identifyCode':
					this.good.tips = `确认重新设置识条码?`;
					this.writeBarCode(this.good, flag, this.generatorCode);
					break;
			}
		},
		//删除口味
		deleteSelectAttr(index) {
			this.selectAttr.splice(index, 1);
		},
		//删除口味(多规格)---attr(该组中所有选中的口味), index(当前操作口味相应的索引), att(当前操作的口味)
		deleteSelectAttrMul(attr, index) {
			attr.splice(index, 1);
		},
		//点击删除选中的分类
		deleteSelectCategory(cat, index) {
			if (this.good.type == 2 && this.editGoodsId) return;
			this.selectCategory.splice(index, 1);
		},
		//保质期的的选择 (普通菜与称重菜)
		// funGetGoodValidityType(e) {
		// 	console.log(e);
		// 	this.good.validityType = e;
		// },
		//保质期下拉框的显示(多规格)
		// toggleGroupShowValidityTyep(group,index){
		// 	this.groupData.forEach((ele,eleIndex)=>{
		// 		if(index==eleIndex){
		// 			group.showValidity=!group.showValidity;
		// 		}else{
		// 			ele.showValidity=false;
		// 		}
		// 	});
		// 	this.groupData.splice(index,1,group);
		// },
		//保质期的选择(多规格)
		// funSelectValidityType(event, group,index) {
		// 	let res = event.target.innerHTML;
		// 	group.validityType = res;
		// 	group.showValidity = false;
		// 	this.groupData.splice(index,1,group);
		// },
		//添加规格
		addGroup(len = 1) {
			for (let i = 0; i < len; i++) {
				console.log(this.groupData);
				if (this.groupData.length < 3) {
					let obj = {
						showValidity: false, //是否显示保质期下拉框
						relativeGood: {}, //关联的商品(对象)
						attr: [] //口味
					};
					this.assignObj(obj);
					obj.validityType = 0; //保质期类别,月日年
					this.groupData.push(obj);
				} else {
					this.alertWin('商品规格不能超过三个!');
					break;
				}
			}
		},
		//删除规格
		deleteGroup(group, index) {
			if (this.groupData.length == 2) {
				this.alertWin('多规格商品最少添加两种规格!');
				return;
			}
			//说明是解除已经存在的规格
			if (this.editGoodsId && group.id) {
				this.$store.commit('setWin', {
					winType: 'confirm',
					title: '温馨提示',
					content:
						'确认解除此种规格的关联？，若取消则此规格商品重新变为单独的普通商品！',
					callback: res => {
						if (res == 'ok') {
							let downChildObj = {
								shopId: this.shopId,
								brandId: this.brandId,
								goodsId: group.id
							};
							this.getHttp(this.mapHttp.downChildGoods, {
								data: downChildObj
							}).then(res => {
								if (res) {
									this.groupData.splice(index, 1);
									this.$emit(
										'throwAddGoodsWin',
										'releaserelation'
									);
								}
							});
						}
					}
				});
			} else {
				this.groupData.splice(index, 1);
			}
		},

		//--------		称重菜		-----------
		//单位下拉框的显示
		// funToggleUnit() {
		// 	if(this.good.type==1 && this.good.isCode==1){
		// 		this.showUnit=false;
		// 		this.alertWin('请先选择类别识别码!');
		// 	}else{
		// 		this.showUnit = !this.showUnit;
		// 	}
		// },
		//获取单位(称重)
		// funGetUnit(event) {
		// 	if (this.editGoodsId && this.good.isCode==1)  return ;
		// 	this.good.unit = event.target.innerHTML;
		// 	this.showUnit = false;
		// },
		//称重商品识别码下拉框的展示
		// funShowList() {
		// 	this.barList || (this.barList = []);
		// 	if (this.barList.length == 0) {
		// 		this.showBarList = false;
		// 		this.alertWin('类别识别码列表为空，请在进销存管理中称重商品配置中添加');
		// 		return;
		// 	}
		// 	this.showBarList = !this.showBarList;
		// },
		//选择称重商品的识别码
		funSelectList(oneList) {
			this.identifyName = this.barList[oneList].name;
			this.good.unit = this.barList[oneList].weightCompany;
			this.good.code = this.barList[oneList].code;
			this.showBarList = false;
		},
		//称重商品识别码的生成
		generatorCode() {
			if (this.identifyCodeMax) {
				this.identifyCodeMax++;
			} else {
				let min = 10000;
				for (let ele of this.goodsList) {
					if (ele.barCode && ele.barCode.length == 7) {
						ele.barCode = ele.barCode.trim();
						let str = ele.barCode.slice(2);
						str = parseInt(str);
						min = min > str ? min : str;
					}
				}
				this.identifyCodeMax = min + 1;
			}

			if (this.identifyCodeMax > 99999) {
				this.identifyCodeMax = 10000;
			}
			return this.identifyCodeMax;
		},

		//--------	win	---------
		//添加分类,口味(非多规格),品牌窗口
		async openCommonWin(flag) {
			this.flag = flag;
			switch (flag) {
				case 'attr':
					if (this.attr.length == 0) {
						this.attr = await this.getHttp(this.mapHttp.getAttr);
					}
					this.showCom = 'addAttr';
					this.comObj = {
						radio: true,
						selectAttr: this.selectAttr,
						attr: this.attr,
						title: '选择口味',
						height: 650,
						width: 765
					};
					break;
				case 'category':
					if (this.good.type == 2 && this.editGoodsId) return;
					this.showCom = 'addCategory';
					this.comObj = {
						category: this.category,
						selectCategory: this.selectCategory,
						// radio: this.good.type == 2 ? false : true
						radio: false
					};
					break;
				case 'brand':
					this.showCom = 'addAttr';
					this.comObj = {
						radio: false,
						selectAttr: [this.selectBrandObj.id],
						attr: this.brandList,
						title: '选择品牌',
						height: 650,
						width: 765
					};
			}
		},
		//关闭添加分类,口味(非多规格,多规格),品牌窗口
		closeCommonWin(data, flag) {
			this.showCom = '';
			if (flag != 'ok') return;
			switch (this.flag) {
				case 'attr':
					this.selectAttr = data;
					break;
				case 'category':
					this.selectCategory = data;
					console.log(data[0]);
					this.good.categoryCode = data[0].code;
					break;
				case 'brand':
					if (data[0]) {
						this.selectBrandObj = data[0];
					} else {
						this.selectBrandObj = {};
					}
					break;
				case 'multipleAttr':
					this.groupData[this.nowGroupIndex].attr = data;
			}
		},
		//添加多规格的口味
		async openMultipleAttrWin(group, groupIndex) {
			if (this.attr.length == 0) {
				this.attr = await this.getHttp(this.mapHttp.getAttr);
			}
			this.showCom = 'addAttr';
			this.flag = 'multipleAttr';
			this.nowGroupIndex = groupIndex;
			this.comObj = {
				radio: true,
				selectAttr: group.attr,
				attr: this.attr,
				title: '选择口味',
				height: 650,
				width: 765
			};
		},
		//添加多规格的关联商品
		openMultipleAddRelativeGoodWin(group, groupIndex) {
			this.showCom = 'addRelative';
			// 只显示上架的普通商品,多规格主菜和子菜都不显示
			let goods = this.goodsList.filter(ele => {
				if (ele.status == 0 || ele.status == 1) {
					if (
						ele.type == 0 &&
						!Number(ele.groupId) &&
						!Number(ele.isGroup) &&
						this.editGoodsId != ele.id
					) {
						if (this.good.isInvoicing == ele.isInvoicing) {
							return true;
						}
					}
				}
			});
			//当开启了进销存,则不能添加已经关联了BOM单的商品
			if (this.good.isInvoicing == 1) {
				goods = goods.filter(ele => {
					return ele.isBom != 1;
				});
			}
			let tempArr = [];
			if (group.id) {
				tempArr.push(group.id);
			} else {
				tempArr.push(group.relativeGood.id);
			}
			this.nowGroupIndex = groupIndex;
			this.comObj = {
				title: '关联商品',
				type: 1,
				goodsList: goods,
				selGoods: tempArr,
				goodRadio: true,
				showSelectAll: 2
			};
		},
		//关闭添加多规格的关联商品
		closeMultipleAddRelativeGoodWin(flag, obj) {
			this.showCom = '';
			if (flag != 'ok') return;
			let temp = obj.goodArr[0];
			if (typeof temp != 'object') return;
			temp.name = temp.goodsName;
			this.groupData[this.nowGroupIndex].relativeGood = temp;
			this.groupData[this.nowGroupIndex].price = temp.price;
			this.groupData[this.nowGroupIndex].cost = temp.cost;
			this.groupData[this.nowGroupIndex].unit = temp.unit;
			let attrs = temp.attr;
			attrs.forEach(ele => {
				let attr = {
					id: ele.attrId,
					name: ele.name,
					options: ele.options
				};
				this.groupData[this.nowGroupIndex].attr.push(attr);
			});
		},
		//删除选中的关联商品(多规格)
		deleteRelativeGood(group) {
			this.$store.commit('setWin', {
				title: '温馨提示',
				winType: 'confirm',
				content: '是否删除该关联商品?',
				callback: res => {
					if (res == 'ok') {
						group.relativeGood = {};
						group.price = '';
						group.cost = '';
						group.unit = '';
						group.attr = [];
						let temp = this.groupData.pop();
						this.groupData.push(temp);
					}
				}
			});
		},
		//获取本组件的点击结果
		closeSelfWin(res) {
			// console.log(res);
			if (res == 'close') {
				this.$emit('throwAddGoodsWin', 'close');
				return;
			}
			//编辑商品
			if (this.editGoodsId) {
				if (res == 'ok') {
					if (!this.checkForm()) return;
					let data = this.formatData(); //返回格式化的数据
					this.getHttp(this.mapHttp.goodEdit, { data }).then(
						result => {
							this.alertWin('保存商品成功!');
							this.$emit('throwAddGoodsWin', 'edit', result);
						}
					);
				}
				if (res == 'cancel') {
					let str = `确定${this.status == 2 ? '上' : '下'}架该商品?`;

					this.$store.commit('setWin', {
						winType: 'confirm',
						title: '温馨提示',
						content: str,
						callback: callbackRes => {
							if (callbackRes == 'ok') {
								str = this.editGoodsId + ',';

								if (this.groupData.length > 0) {
									let arrStr = [];
									this.groupData.forEach(ele => {
										arrStr.push(ele.id);
									});
									str = str + arrStr.join(',');
								}
								this.getHttp(this.mapHttp.goodUpOrDownShelf, {
									data: {
										goodsId: str,
										shopId: this.shopId,
										status: this.status == 2 ? 0 : 2
									}
								}).then(() => {
									str =
										this.status == 2
											? '上架成功!'
											: '下架成功!';
									this.alertWin(str);
									this.$emit('throwAddGoodsWin', 'updown');
								});
							}
						}
					});
				}
			} else {
				//添加商品
				if (res == 'ok') {
					if (!this.checkForm()) return;
					let data = this.formatData();
					this.getHttp(this.mapHttp.createGood, { data }).then(
						result => {
							if (!data) return;
							this.alertWin('添加商品成功!');
							this.$emit('throwAddGoodsWin', 'add', result);
						}
					);
				} else {
					this.$emit('throwAddGoodsWin', 'cancel');
				}
			}
		},
		//-------		store win		---------
		alertWin(info) {
			this.$store.commit('setWin', { title: '温馨提示', content: info });
		},
		//----------		表单		----------
		//格式化数据
		formatData() {
			let obj = {}; //需要提交的所有数据
			// let submitValidityType; 			//需要提交的保质期类型id,
			let cids = []; //分类id  最终提交的为字符串
			let attrId = []; //口味的id 最终提交的为字符串
			let groupData = []; //多规格数据

			//保质期的类型
			console.log(this.good.validityType);
			// this.validityTypeArr.some(ele => {
			// 	if (ele.id == this.good.validityType) {
			// 		submitValidityType = ele.id;return true;
			// 	}
			// });

			//分类的id
			for (let ele of this.selectCategory) {
				cids.push(ele.id);
			}

			//口味的id
			for (let ele of this.selectAttr) {
				attrId.push(ele.id);
			}

			//品牌id
			if (
				(this.good.isInvoicing == 1 &&
					this.good.type == 0 &&
					this.selectBrandObj.id) ||
				(this.good.isCode == 1 &&
					this.good.type == 1 &&
					this.selectBrandObj.id)
			) {
				obj.brandId = this.selectBrandObj.id;
			}

			//多规格
			// console.log(this.groupData);
			if (this.good.type == 0 && this.good.isGroup == 1) {
				this.groupData.forEach(ele => {
					let group = {
						goodsName: ele.goodsName,
						price: ele.price,
						cost: ele.cost,
						unit: ele.unit,
						specialPrice: ele.specialPrice,
						groupAttrs: '', //口味
						id: '' //关联商品的id
					};

					if (this.good.isVip == 1) {
						group.vipPrice = ele.vipPrice;
					}
					if (this.good.isVip == 2) {
						group.vipDiscount = ele.vipDiscount;
					}
					if (this.good.isSpecial == 1) {
						group.specialPrice = ele.specialPrice;
					}

					//关联的商品id
					let relativeGood = ele.relativeGood;
					if (relativeGood) group.id = relativeGood.id; //关联商品的id

					//口味id
					group.groupAttrs = '';
					let tempAttr = [];
					ele.attr || (ele.attr = []);
					ele.attr.forEach(e => {
						tempAttr.push(e.id);
					});
					group.groupAttrs = tempAttr.join(',');

					if (this.good.isInvoicing == 1) {
						//条码,保质期,保质期类型
						group.barCode = ele.barCode;
						group.secBarCode = ele.secBarCode;
						group.validity = parseInt(ele.validity);
						group.validityType = ele.validityType * 1;
						// console.log(group.validityType);
						// console.log(ele.validityType);
						// this.validityTypeArr.some((val) => {
						// 	if (val.id == ele.validityType) {
						// 		group.validityType = val.id;
						// 		return true;
						// 	}
						// });
					}
					groupData.push(group);
				});
			}

			//称重菜品的识别码
			if (this.good.type == 1 && this.good.isCode == 1) {
				this.good.barCode = this.good.code + this.good.identifyCode;
			}
			if (this.good.type == 1 && this.good.isCode == 0) {
				this.good.barCode = '';
			}

			if (this.editGoodsId) obj.goodsId = this.editGoodsId;

			obj.shopId = this.shopId;
			let keys = [
				'sort',
				'type',
				'goodsName',
				'BC',
				'price',
				'unit',
				'cost',
				'imageName',
				'validity',
				'isInvoicing',
				'isStock',
				'isDiscount',
				'serviceCharge',
				'isRecommend',
				'isSelf',
				'isCode',
				'isVip',
				'isSeasonal',
				'isGroup',
				'vipPrice',
				'vipDiscount',
				'description',
				'specifications',
				'barCode',
				'secBarCode',
				'goodsCode',
				'categoryCode',
				'specialPrice'
			];
			for (let key of keys) {
				obj[key] = this.good[key];
			}
			// obj.goodsCode = this.good.categoryCode+'-'+this.good.goodsCode;
			obj.categoryCode = this.good.categoryCode;
			obj.goodsCode = this.good.categoryCode==''?'':this.good.goodsCode;
			obj.cids = cids.join(',');
			obj.validityType = this.good.validityType;
			obj.attrs = attrId.join(',');
			obj.isSpecial = Number(this.isSpecial);

			if (this.good.type == 0 && this.good.isGroup == 1) {
				obj.groupData = groupData;
			}
			return obj;
		},
		//校验表单 不合格返回false
		checkForm() {
			//---------- 		分类		-------------
			if (this.selectCategory.length == 0) {
				this.alertWin('请选择分类!');
				return false;
			}
			//----------		商品名,简码,描述		---------------
			if (this.good.type == 0 || this.good.type == 1) {
				if (
					!global.checkData(
						{
							goodsName: {
								cond:
									'$$.length>0 && $$.length<45 && ((/^[^!@#$%&*]+$/).test($$))',
								pro: '请输入45字以内的名称且不能含有特殊字符!'
							},
							BC: {
								reg: /^[0-9A-Za-z]{0,20}$/,
								pro: '简码由英文,数字组成!'
							},
							description: {
								cond: '$$.length<=100',
								pro: '描述内容不能超过100字哦!'
							}
						},
						this.good
					)
				)
					return false;
			}
			if (this.good.goodsCode.trim().length > 0) {
				if (
					!global.checkData(
						{
							goodsCode: {
								reg: /^[0-9]{3,5}$/,
								pro: '编码只能为数字，且3-5个字!'
							}
						},
						this.good
					)
				)
					return false;
			}
			//----------		称重菜,普通菜:售价,单位(普通菜),成本,会员	-----------
			if (
				(this.good.type == 0 && !Number(this.good.isGroup)) ||
				this.good.type == 1
			) {
				if (
					!global.checkData(
						{
							price: {
								reg: /((^[1-9]\d{0,9})|^0)(\.\d{1,2})?$/,
								pro: '请输入正确的售价!'
							},
							cost: {
								reg: /(((^[1-9]\d{0,9})|^0)(\.\d{1,2})?$)|(^((\s)*(\t)*)?$)/,
								pro: '请输入正确的成本格式!'
							}
						},
						this.good
					)
				)
					return false;

				if (Number(this.good.price) > 100000) {
					this.alertWin('售价超过10万!');
					return false;
				}

				let unitTips = '';
				if (this.good.type == 1) {
					unitTips = '请输入单位且不能超过5个字符!';
				}
				if (this.good.type == 0 && !Number(this.good.isCode)) {
					unitTips = '请选择单位!';
				}
				if (
					!global.checkData(
						{
							unit: {
								cond: '$$.length>0 && $$.length<6',
								pro: unitTips
							}
						},
						this.good
					)
				)
					return false;

				if (Number(this.good.cost) > 100000) {
					this.alertWin('成本超过10万!');
					return false;
				}

				if (this.good.isVip == 1) {
					if (
						!global.checkData(
							{
								vipPrice: {
									reg: /((^[1-9]\d{0,9})|^0)(\.\d{1,2})?$/,
									pro: '请输入正确的会员价格!'
								}
							},
							this.good
						)
					)
						return false;

					if (Number(this.good.vipPrice) > Number(this.good.price)) {
						this.alertWin('会员价格不能大于售价!');
						return false;
					}
					if (Number(this.good.vipPrice) > 100000) {
						this.alertWin('会员价格超过10万!');
						return false;
					}
				}
				if (this.isSpecial) {
					if (
						!global.checkData(
							{
								specialPrice: {
									reg: /((^[1-9]\d{0,9})|^0)(\.\d{1,2})?$/,
									pro: '请输入正确的会员价格!'
								}
							},
							this.good
						)
					)
						return false;

					if (Number(this.good.specialPrice) > Number(this.good.price)) {
						this.alertWin('特价商品价格不能大于售价!');
						return false;
					}
					if (Number(this.good.specialPrice) > 100000) {
						this.alertWin('特价商品价格超过10万!');
						return false;
					}
				}
			}

			//----------		普通菜:条码,副条码,规格,保质期,-----------------
			if (
				this.good.type == 0 &&
				this.good.isGroup != 1 &&
				this.good.isInvoicing == 1
			) {
				if (
					!global.checkData(
						{
							barCode: {
								cond:
									'$$.length>0 && (/^\\d{10,13}$/).test($$)',
								pro: '请输入条码,条码由10-13位数字组成!'
							},
							specifications: {
								cond:
									'$$.length>0 && ((/^[^!@#$%&*/\\s]+$/).test($$))',
								pro: '请输入规格且不含特殊字符!'
							},
							validity: {
								reg: /(^\d{0,3}$)|(^((\s)*(\t)*)?$)/,
								pro: '保质期由1-3位数字组成!'
							},
							secBarCode: {
								reg: /(^\d{10,13}$)|(^((\s)*(\t)*)?$)/,
								pro: '副条码由10-13位数字组成!'
							}
						},
						this.good
					)
				)
					return false;
			}

			//-----------		称重菜:识别码,保质期,单位	------------------------------
			if (this.good.type == 1) {
				if (this.good.isCode == 1) {
					this.good.identifyCode += '';
					if (
						!global.checkData(
							{
								code: {
									cond: '$$.length>0',
									pro: '请选择类别识别码!'
								},
								unit: {
									cond: '$$.length>0',
									pro: '请选择类别识别码!'
								},
								identifyCode: {
									reg: /^\d{5}$/,
									pro: '请输入商品识别码,识别码由5位数字组成!'
								},
								validity: {
									reg: /(^\d{0,3}$)|(^((\s)*(\t)*)?$)/,
									pro: '保质期由1-3位数字组成!'
								}
							},
							this.good
						)
					)
						return false;
				}

				if (
					!Number(this.good.isCode) &&
					this.good.unit.trim().length == 0
				) {
					this.alertWin('请选择单位!');
					return false;
				}
			}
			//----------------普通菜多规格BOM单校验-----------------------

			if (
				this.good.type == 0 &&
				this.good.isGroup == 1 &&
				this.good.isInvoicing == 1
			) {
				let flagGroup = this.groupData.some(group => {
					if (group.relativeGood.isBom == 1) {
						let str =
							'所关联的' +
							group.relativeGood.name +
							' 商品已关联BOM单,请选择其它商品!';
						this.alertWin(str);
						return true;
					}
				});
				if (flagGroup) return false;
			}

			//------------------普通菜多规格---------------------------
			if (this.good.type == 0 && this.good.isGroup == 1) {
				let flag = this.groupData.some(ele => {
					this.test = ele;
					if (
						!global.checkData(
							{
								goodsName: {
									reg: /^[^<>\s]+$/,
									pro: '请输入不含特殊字符的规格名!'
								},
								price: {
									reg: /((^[1-9]\d{0,9})|^0)(\.\d{1,2})?$/,
									pro: '请输入正确的售价格式!'
								},
								unit: {
									cond: '$$.length>0 && $$.length<6',
									pro: '请输入1-5个字符组成的单位!'
								},
								cost: {
									reg: /(((^[1-9]\d{0,9})|^0)(\.\d{1,2})?$)|(^((\s)*(\t)*)?$)/,
									pro: '请输入正确的成本格式!'
								}
							},
							this.test
						)
					)
						return true;

					if (Number(ele.price) > 100000) {
						this.alertWin('售价超过10万!');
						return true;
					}

					if (Number(ele.cost) > 100000) {
						this.alertWin('成本超过10万!');
						return true;
					}

					if (this.good.isInvoicing == 1) {
						if (
							!global.checkData(
								{
									barCode: {
										reg: /^\d{10,13}$/,
										pro: '主条码由10-13位数字组成!'
									},
									secBarCode: {
										reg: /(^\d{10,13}$)|(^((\s)*(\t)*)?$)/,
										pro: '副条码由10-13位数字组成!'
									},
									validity: {
										reg: /(^\d{0,3}$)|(^((\s)*(\t)*)?$)/,
										pro: '保质期由1-3位数字组成!'
									}
								},
								this.test
							)
						)
							return true;
					}

					if (this.good.isVip == 1) {
						if (
							!global.checkData(
								{
									vipPrice: {
										reg: /((^[1-9]\d{0,9})|^0)(\.\d{1,2})?$/,
										pro: '请输入正确的会员价格!'
									}
								},
								this.test
							)
						)
							return true;

						if (Number(ele.vipPrice) > 100000) {
							this.$store.commit('setWin', {
								title: '温馨提示',
								content: '会员价格超过10万!'
							});
							return true;
						}
						if (this.good.isVip == 1) {
							let price = ele.price;
							let vipPrice = ele.vipPrice;
							if (Number(vipPrice) > Number(price)) {
								this.alertWin('会员价格不能大于售价!');
								return true;
							}
						}
					}
					if (this.isSpecial) {
						if (Number(ele.specialPrice) > 100000) {
							this.$store.commit('setWin', {
								title: '温馨提示',
								content: '特价商品价格超过10万!'
							});
							return true;
						}
						let price = ele.price;
						let specialPrice = ele.specialPrice;
						if (Number(specialPrice) > Number(price)) {
							this.alertWin('特价商品价格不能大于售价!');
							return true;
						}
					}
				});
				if (flag) return false;
				//--------		规格名相同	-----------
				flag = this.groupData.some((ele, index) => {
					let goodsName = ele.goodsName;
					for (
						let i = index + 1, len = this.groupData.length;
						i < len;
						i++
					) {
						let temp = this.groupData[i].goodsName;
						if (goodsName == temp) {
							this.alertWin('规格名称不能相同!');
							return true;
						}
					}
				});
				if (flag) return false;
			}

			//---------		商品重名		----------
			if (
				this.checkGoodsName(
					this.goodsList,
					this.good.name,
					this.editGoodsId
				)
			)
				return false;

			return true;
		},
		//校验时是否有相同的商品名 false:表示没有一样的
		checkGoodsName(goods, name, id) {
			if (this.good.type == 2) return false;
			if (id)
				goods = goods.filter(ele => {
					return ele.id != id;
				});
			let flag = goods.some(ele => {
				if (ele.goodsName == name) {
					this.alertWin('商品名重名!');
					return true;
				}
			});
			return flag;
		},

		//----------		开关		---------
		//多个开关的切换
		// switchFn(res,flag) {
		// 	switch(flag){
		// 		case 'sort':				//获取排序值
		// 			this.good[flag] = parseInt(res);
		// 			break;
		// 		case 'isDiscount':			//是否优惠
		// 		case 'isRecommend':
		// 		case 'serviceCharge':
		// 		case 'isSelf':
		// 		case 'isSeasonal':
		// 		case 'isVip':
		// 			this.good[flag] = res ? 1 : 0;
		// 			break;
		// 	}
		// },
		//是否是多规格
		toggleIsGroup(res) {
			console.log(res);
			if (
				res == 0 &&
				this.editGoodsId &&
				this.good.isInvoicing == 1 &&
				this.good.isGroup == 1
			) {
				this.alertWin('商品已参与进销存核销,多规格不能取消!');
				this.good.isGroup = 1;
				return;
			}
			if (res == 1 && this.editGoodsId && this.good.isInvoicing == 1) {
				this.$set(this.good, 'isGroup', 0);
				this.alertWin('商品已参与进销存核销,不能开启多规格!');
				return;
			}
			this.good.isGroup = res;
			if (this.good.isGroup == 1 && this.groupData.length < 2) {
				this.addGroup(2);
			}
		},
		//开启进销存
		toggleIsInvoicing(res) {
			console.log(res);
			if (res == 1 && this.good.isStock == 1) {
				this.alertWin('进销存和库存只能开启一个!');
				return;
			}

			//校验BOM单
			if (
				this.good.type == 0 &&
				this.editGoodsId &&
				this.good.isBom == 1 &&
				res == 1
			) {
				this.alertWin('该商品已经关联BOM单,不能开启进销存!');
				return;
			}
			//子菜关联了BOM单,不能开启进销存.
			if (this.good.type == 0 && this.good.isGroup == 1 && res == 1) {
				let [goodsName, tipsWord] = ['', ''];
				let bomFlag = this.groupData.some(group => {
					if (group.relativeGood.isBom == 1) {
						goodsName = group.relativeGood.name;
						return true;
					}
				});
				if (bomFlag) {
					tipsWord =
						'所关联的 ' +
						goodsName +
						' 商品已关联BOM单,不可开启进销存!';
					this.alertWin(tipsWord);
					return;
				}
			}

			this.good.isInvoicing = res;

			//请求识别码
			if (
				this.good.type == 1 &&
				this.good.isCod == 0 &&
				this.good.isInvoicing == 1
			) {
				this.good.isCode = 1;
				if (
					this.good.type == 1 &&
					this.good.isCode == 1 &&
					this.barList.length == 0
				) {
					this.getHttp(this.mapHttp.GoodWeighgoodsGetList, {
						data: { shopId: this.shopId, brandId: this.brandId }
					}).then(barList => {
						this.barList = barList;
					});
				}
			}
		},
		//开启库存
		toggleIsStock(res) {
			if (res && this.good.isInvoicing == 1) {
				this.alertWin('进销存和库存只能开启一个!');
				return;
			}
			this.good.isStock = res;
		},
		//识别码
		async toggleIsCode(res) {
			this.good.isCode = res;
			//同步关闭识别码与进销存
			if (
				this.good.type == 1 &&
				this.good.isCode == 0 &&
				this.good.isInvoicing == 1
			) {
				this.good.isInvoicing = 0;
			}
			//称重商品开启识别码,不能选择口味
			if (this.good.isCode == 1) {
				this.selectAttr = [];
			}
			//请求识别码
			if (
				this.good.type == 1 &&
				this.good.isCode == 1 &&
				this.barList.length == 0
			) {
				this.barList = await this.getHttp(
					this.mapHttp.GoodWeighgoodsGetList,
					{ data: { shopId: this.shopId, brandId: this.brandId } }
				);
			}
		},

		//-------		初始化		-----

		//初始化数据
		initData() {
			for (let attr in this.pObj) {
				this[attr] = this.pObj[attr];
			}
		},
		//初始化弹窗按钮
		initWinBtn() {
			this.btnOk = { content: '确定', style: null };
			this.btnCancel = { content: '取消', style: null };

			if (!this.editGoodsId) return;

			if (this.status == 2) {
				this.btnCancel = {
					content: '上架',
					style: 'background-color:#22aae0'
				};
			} else {
				this.btnCancel = {
					content: '下架',
					style: 'background-color:#22aae0'
				};
			}
			this.btnOk = { content: '保存', style: 'background-color:#f8941f' };
		},
		//组合公共属性
		assignObj(obj = {}) {
			let temp = {};
			let keys = [
				'barCode',
				'secBarCode',
				'cost',
				'goodsName',
				'price',
				'unit',
				'validity',
				'validityType',
				'vipPrice'
			];
			for (let key of keys) {
				temp[key] = '';
			}
			Object.assign(obj, temp);
			return keys;
		},
		//初始化商品
		async initGoods(res) {
			if (this.good.isVip * 1 > 0) {
				this.isVipShow = true;
			}
			if (this.good.isSpecial && this.good.isSpecial * 1 > 0) {
				this.isSpecial = true;
			}
			//为good添加字段
			this.$set(this.good, 'code', ''); //称重商品的类别识别码
			this.$set(this.good, 'identifyCode', ''); //称重商品的商品识别码
			if (!this.good.secBarCode) this.$set(this.good, 'secBarCode', '');
			this.good.validityType = +this.good.validityType; //将年月日的id转化为数字
			//将保质期类型(数字)映射为文字
			// if (res.type == 0 || res.type == 1) {
			// 	for(let ele of this.validityTypeArr){
			// 		if(ele.id == res.validityType){
			// 			this.good.validityType = ele.name;
			// 			break;
			// 		}
			// 	}
			// }

			//初始化称重商品识别码code(类别识别码),identifyCode(商品识别码),identifyName(类名识别码的文字名称)
			if (this.good.type == 1 && this.good.isCode == 1) {
				this.barList = await this.getHttp(
					this.mapHttp.GoodWeighgoodsGetList,
					{ data: { shopId: this.shopId, brandId: this.brandId } }
				);
				this.good.barCode += '';
				this.good.code = this.good.barCode.substr(0, 2);
				this.good.identifyCode = this.good.barCode.slice(2);
				this.barList.some(ele => {
					if (ele.code == this.good.code) {
						this.identifyName = ele.name;
						return true;
					}
				});
			}
			if(this.good.isInvoicing == '1'){
				this.brandList = await this.getHttp(this.mapHttp.brandList);
			}

			//1.groupData添加showValidity字段控制日期的显示与隐藏,2.将保质期的类型映射为文字,3.映射关联商品
			if (this.good.type == 0 && this.good.isGroup == 1) {
				this.groupData = res.groupData;
				for (let group of this.groupData) {
					group.showValidity = false;
					group.relativeGood = {};
					if (!group.barCode) group.barCode = '';
					if (!group.secBarCode) group.secBarCode = '';
					if (!group.validity) group.validity = '';
					if (!group.validityType) group.validityType = 0;
					group.validityType = +group.validityType;
					this.goodsList.some(ele => {
						if (group.id == ele.id) {
							group.relativeGood = {
								id: ele.id,
								name: ele.goodsName,
								goodsName: ele.goodsName,
								isBom: ele.isBom
							};
							return true;
						}
					});

					// let flag=this.validityTypeArr.some((ele) => {
					// 	if(ele.id == group.validityType){
					// 		group.validityType = ele.id;
					// 		return true;
					// 	}
					// });
					// if(!flag) group.validityType='1';
				}
			}

			//获取选中的品牌
			if (this.good.type != 2) {
				this.brandList.some(ele => {
					if (ele.id == this.good.brandId) {
						this.selectBrandObj = ele;
						return true;
					}
				});
			}

			res.attr || (res.attr = []);
			this.selectAttr = res.attr; //       Array
			res.cate || (res.cate = []);
			//通过选择号的分类，获取对应的编码
			// for(let i=0;i<this.category.length;i++){
			// 	if(res.cate[0].id == this.category[i].id){
			// 		this.good.categoryCode = this.category[i].code;
			// 		break;
			// 	}
			// 	if(this.category[i].child){
			// 		for(let j=0;j<this.category[i].child.length;j++){
			// 			if(res.cate[0].id == this.category[i].child[j].id){
			// 				this.good.categoryCode = this.category[i].child[j].code;
			// 				break;
			// 			}
			// 		}
			// 	}
			// }
			this.selectCategory = res.cate; //       Array
		},
		//同步请求商品识别码,品牌列表,商品详情
		async asyncRequest() {
			if (
				this.editGoodsId &&
				this.good.type == 1 &&
				this.good.isCode == 1
			) {
				this.barList = await this.getHttp(
					this.mapHttp.GoodWeighgoodsGetList,
					{ data: { shopId: this.shopId, brandId: this.brandId } }
				);
			}
			let res = null;
			if (this.editGoodsId) {
				res = await this.getHttp(this.mapHttp.getGoodsDetail, {
					data: {
						goodsId: this.editGoodsId,
						shopId: this.shopId
					}
				});
			}
			if (res) {
				this.good = res;
				this.good.categoryCode = res.categoryCode
					? res.categoryCode
					: '';
				this.good.goodsCode = res.goodsCode ? res.goodsCode : '';
				this.initGoods(res);
			}
		},
		//请求数据
		async getHttp(url, obj = {}) {
			let res = await http[url](obj);
			return res;
		},
		//捕捉弹窗的事件冒泡
		winCancelBubble() {
			if (this.good.type == 0) {
				if (this.good.isGroup == 1 && this.good.isInvoicing == 1) {
					this.groupData = this.groupData.map(ele => {
						ele.showValidity = false;
						return ele;
					});
				}
				if (this.good.isGroup != 1 && this.good.isInvoicing == 1) {
					this.showValidity = false;
				}
			}
			if (this.good.type == 1) {
				if (this.good.isCode == 1) this.showValidity = false;
				this.showUnit = false;
			}
			if (this.good.type == 1 && this.good.isCode == 1) {
				this.showBarList = false;
			}
		}
	},
	mounted() {
		this.initData();
		this.initWinBtn();
		this.asyncRequest();
		document.addEventListener('click', this.winCancelBubble, false);
	},
	beforeDestroy() {
		document.removeEventListener('click', this.winCancelBubble);
	},
	components: {
		win: () => import(/*webpackChunkName:'win'*/ 'src/components/win'),
		// subAdd: () => import(/*webpackChunkName:'subadd'*/ 'src/components/subadd'),
		// onOff: () => import(/*webpackChunkName:'on_off'*/ 'src/components/on_off'),
		addAttr: () =>
			import(/*webpackChunkName:'add_attr_win'*/ '../goods_manager_coms/add_attr_win'),
		addCategory: () =>
			import(/*webpackChunkName:'add_category_win'*/ '../goods_manager_coms/add_category_win'),
		addRelative: () =>
			import(/*webpackChunkName:'good_package_win'*/ '../common/good_package_win')
	}
};
</script>
<style lang="less" scoped>
.win-content {
	.sign {
		font-size: 14px;
		display: inline-block;
		width: auto;
		height: 40px;
		margin-bottom: 2px;
		margin-left: 2px;
		padding: 0 20px;
		cursor: pointer;
		text-align: center;
		border-right: 1px solid #f1f1f1;
		background-color: #f2f2f2;
	}
}
.good-baseInfo {
	width: 100%;
	height: 40px;
	margin: 10px;
	line-height: 40px;
	position: relative;
	i {
		width: 4px;
		height: 28px;
		position: absolute;
		top: 6px;
		left: 0;
		background-color: #f8931f;
	}
	h3 {
		width: 73px;
		height: 40px;
		margin-left: 20px;
		float: left;
	}
	div {
		width: 400px;
		margin: 20px 5px;
		float: left;
		border-bottom: 1px dashed #ccc;
	}
}
.good-image {
	float: left;
	width: 225px;
	height: 150px;
	.good-image-div {
		position: relative;
		width: 225px;
		height: 150px;
		background: url(../../../res/images/upload.png) center 40px no-repeat
			#ddd;
	}
	.good-image-delete {
		background-color: rgba(27, 21, 21, 0.6);
		// background: url(../../../res/images/a50.png) repeat;
		height: 40px;
		line-height: 40px;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 50%;
		color: #fff;
		text-align: center;
		font-size: 16px;
	}
	.good-image-edit {
		background-color: #e1bb4a;
		height: 40px;
		line-height: 40px;
		position: absolute;
		bottom: 0;
		left: 50%;
		width: 50%;
		color: #fff;
		text-align: center;
		font-size: 16px;
	}
	.good-image-file {
		position: absolute;
		bottom: 0;
		height: 40px;
		left: 50%;
		width: 50%;
		opacity: 0;
		cursor: pointer;
	}
	// .good-barCode {
	// 	margin-top: 0;
	// 	margin-bottom: 15px;
	// 	float: left;
	// 	width: 320px;
	// }
	// .good-getBarCode {
	// 	width: 80px;
	// 	height: 40px;
	// 	line-height: 40px;
	// }
}
.relative-info {
	width: 100%;
	height: 40px;
	margin: 10px;
	line-height: 40px;
	position: relative;
	i {
		width: 4px;
		height: 28px;
		position: absolute;
		top: 6px;
		left: 0;
		background-color: #f8931f;
	}
	h3 {
		width: 73px;
		height: 40px;
		margin-left: 20px;
		float: left;
	}
	div {
		width: 540px;
		margin: 20px 5px;
		float: left;
		border-bottom: 1px dashed #ccc;
	}
}
</style>


