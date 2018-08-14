<template>
<div id="detail-addgoods">

	<win :height="650" :width="700" @winEvent="closeSelfWin"  :align="'right'" :ok="btnOk" :cancel="btnCancel">
		<span slot="title">{{title}}</span>
		<div slot="content" class="win-content">
			<section class="commodity-form" v-cloak>
				<!--		三种类型商品的公共部分	-->
				<section class="titleTop" style="width:100%;height:40px;">
					<div class="good-baseInfo">
					<i></i>
					<h3>基本信息</h3>
					<div class="dian"></div>
					<span v-if="good.id">商品ID:{{good.id}}</span>
					</div>
				</section>

				<section class="good-type">
					<label class="commodity-name required fl">类型</label>
					<label class="fl commodity-type">
					<template v-for="(goodType,index) in goodsType">
						<span  :key="index" :class="{'signa':goodType.type==good.type}" v-on:click="toggleGoodType(goodType.type)"   style="margin-right: 15px;border: 1px solid #BDBDBD;cursor: default;">{{goodType.name}}</span>
					</template>
					</label>
				</section>

				<section class="good-sort">
					<label class="commodity-name required fl">排序</label>
				</section>
				<div>
					<sub-add  :minnum="1" :bindnum="good.sort" :sign="false" @toClick ="(res)=>{switchFn(res,'sort')}"></sub-add>
				</div>


				<!--		自定义菜品选择分类		-->
				<section v-if="good.type==2">
					<label class="commodity-name required fl">分类</label>
					<label class="commodity-type fl"  style="width: 600px;">
					<span class="signa"  v-for="(cat,index) in selectCategory" :key="index" v-on:click="deleteSelectCategory(cat,index)">{{cat.name}}</span>
					<a href="javascript:void(0);"  v-on:click="openCommonWin('category')" class="addclassify fl" >添加分类</a>
					</label>
				</section>


				<section style="width:100%;" v-if="good.type==1 || good.type==0">
					<!--		普通菜,称重菜的名称,简码,售价,成本,单位		-->
					<section class="fl" style="width: 65%;margin-top: 0;">
					<section style="margin-top: 0;margin-bottom: 15px;">
						<label class="commodity-name required fl">名称</label>
						<label><input type="text" v-model="good.goodsName" placeholder="输入名称"  maxlength="45"  /></label>
					</section>
					<section style="margin-top: 0;margin-bottom: 15px;">
						<label class="commodity-name fl">简码</label>
						<label><input type="text" placeholder="输入简码" v-model="good.BC"  maxlength="20" /></label>
					</section>

					<!--		普通菜的售价,成本,单位	-->
					<section  style="margin: 0;" v-if="good.isGroup!=1 && good.type==0">
						<label class="commodity-name required fl">售价</label>
						<input type="text" placeholder="输入售价"  v-model="good.price" style="width:106px;" maxlength="7"/>
						<div class="good-price">元</div>
						<label >
							<input type="text" placeholder="输入单位" v-model="good.unit"  style="width: 75px;margin-right: 1px;" maxlength="5" />
						</label>
						<label >
							<input type="text" placeholder="输入成本" v-model="good.cost"  style="width: 63px" maxlength="10"  />
							<div class="good-cost">元</div>
						</label>
					</section>

					<!-- 	称重菜的售价,单位,成本 	-->
					<section  style="margin: 0;" v-if="good.type==1">
						<label class="commodity-name required fl">售价</label>
						<input type="text" placeholder="输入售价"  v-model="good.price" style="width:70px;" maxlength="7"/>
						<div class="good-price">元</div>
						<label >
							<div class="weight" @click.stop>
								<div class="sList fl" style="border:1px solid #ccc;margin-left:10px;position: relative;">
									<div class="tableListInp" v-on:click="funToggleUnit">
										<span>{{good.unit}}</span>
										<div class="fl" style="background-color: #fff;">
											<i></i>
										</div>
									</div>
									<ul v-show="showUnit"  class="tableListUl" v-on:click="funGetUnit($event)">
										<li v-for="(unit,i) in unitArr" :key="i">{{unit.name}}</li>
									</ul>
								</div>
									<input type="text" placeholder="输入成本"  v-model="good.cost"   style="width: 63px;margin-left: 10px;" maxlength="10"  />
								<div class="good-cost">元</div>
							</div>
						</label>
					</section>
					</section>

					<!-- 	图片	 -->
					<div class="good-image">
						<div class="good-image-div"  id="image">
							<img v-if="!!good.imageName"  :src="(good.imageName.indexOf('http')>-1)?good.imageName: imgHost+good.imageName"  width="225" height="150">
							<img v-else src="../../../res/images/busis.png" width="225" height="150"  alt="商品" />
							<a  class="gray good-image-delete" @click="deleteGoodImg">删除图片</a>
							<a class="yellow good-image-edit">编辑图片</a>
							<form enctype="multipart/form-data" id="img_upload">
								<input type="file" @change="uploadGoodsImg"  accept="image/jpeg,image/png,image/gif,image/tiff" name="image"  class="good-image-file" />
							</form>
						</div>
					</div>


					<!--    普通菜,称重菜品牌的选择    -->
					<section>
									<!--		普通菜		-->
						<template v-if="good.type==0 && good.isInvoicing==1">
							<section  style="margin-top: 0;margin-bottom: 15px;width: 350px;">
								<label class="commodity-name fl">品牌</label>
								<label class="commodity-type fl">
									<a href="javascript:void(0);"  class="addclassify fl"  v-on:click="openCommonWin('brand')">选择品牌</a>
									<span v-if="selectBrandObj.name"  class="sign" style="width:120px;padding:0 10px;">{{selectBrandObj.name}}</span>
								</label>
							</section>
							<section v-show="good.isGroup!=1" style="margin-top: 0;margin-bottom: 15px;float: left;width: 320px;">
								<label class="commodity-name required fl">条码</label>
								<label>
									<input type="text" placeholder="输入条码" v-model="good.barCode" maxlength="13" style="width:140px;" />
									<a href="javascript:void(0);" v-on:click="setBarCode('barCode',null,null)" class="yellow" style="width: 80px;height:40px;line-height: 40px;">获取条码</a>
								</label>
							</section>
							<section  v-show="good.isGroup!=1" class="good-invalidity">
								<label class="commodity-name fl">保质期</label>
								<label style="width:250px;">
									<div class="weight" @click.stop>
										<input type="text" placeholder="输入保质期" v-model="good.validity" maxlength="3" class="good-invalidity-input"/>
										<div class="sList fl" style="margin-left:10px;">
											<div class="tableListInp" v-on:click="showValidity=!showValidity">
												<span style="border:1px solid #ccc;" >{{good.validityType}}</span>
												<div class="fl" style="background-color: #fff;border:1px solid #ccc;border-left:none;">
													<i></i>
												</div>
											</div>
												<ul class="tableListUl" v-if="showValidity" v-on:click="funGetGoodValidityType($event)">
												<li v-for="(date,i) in validityTypeArr" :key="i">{{date.name}}</li>
											</ul> 
										</div>
									</div>
								</label>
							</section>
							<section v-show="good.isGroup!=1" style="margin-top: 0;margin-bottom: 15px;float: left;width: 320px;">
								<label class="commodity-name fl">副条码</label>
								<label>
									<input type="text" placeholder="输入副条码" v-model="good.secBarCode" maxlength="13" style="width:140px;" />
									<a href="javascript:void(0);" v-on:click="setBarCode('secBarCode',null,null)" class="yellow" style="width: 80px;height:40px;line-height: 40px;">获取条码</a>
								</label>
							</section>
							<section  v-show="good.isGroup!=1" class="good-speci">
								<label class="commodity-name required fl">规格</label>
								<label><input type="text" placeholder="输入规格"  v-model="good.specifications" maxlength="21" style="width:228px;" /></label>
							</section>
						</template>

									<!--		称重菜		-->
						<template v-if="good.type==1 && good.isCode==1">
							<section  class="good-brand">
								<label class="commodity-name fl">品牌</label>
								<label class="commodity-type fl">
									<a href="javascript:void(0);"  class="addclassify fl" v-on:click="openCommonWin('brand')">选择品牌</a>
									<span class="sign" v-if="selectBrandObj.name" style="width:120px;padding:0 10px;">{{selectBrandObj.name}}</span>
								</label>
							</section>
							<section  class="good-code">
								<label class="commodity-name required fl" style="width:90px;">类别(识别码)</label>
								<div class="weight">
									<div class="sList fl">
										<div class="tableListInp" @click.stop="funShowList">
										<span style="width: 180px;border:1px solid #ccc;" >{{identifyName}}</span>
										<div class="fl" style="background-color: #fff;border:1px solid #ccc;border-left:none;">
											<i></i>
										</div>
										</div>
										<ul v-show="showBarList" class="tableListUl" style="max-height: 300px;overflow: auto;">
											<li v-for="(oneList,i) in barList" :key="i" @click="funSelectList(oneList,i)">{{oneList.name}}</li>
										</ul>
									</div>
								</div>
							</section>
							<section  class="good-invalidity">
								<label class="commodity-name fl">保质期</label>
								<label style="width:250px;">
									<div class="weight" @click.stop>
										<input type="text" placeholder="输入保质期" v-model="good.validity" maxlength="3" style="width: 120px;margin-left: 1px;float: left;"/>
										<div class="sList fl" style="margin-left:10px;">
											<div class="tableListInp" v-on:click="showValidity=!showValidity">
												<span style="border:1px solid #ccc;" >{{good.validityType}}</span>
												<div class="fl" style="background-color: #fff;border:1px solid #ccc;border-left:none;">
													<i></i>
												</div>
											</div>
												<ul class="tableListUl" v-if="showValidity" v-on:click="funGetGoodValidityType($event)">
												<li v-for="(date,i) in validityTypeArr" :key="i">{{date.name}}</li>
											</ul> 
										</div>
									</div>
								</label>
							</section>
							<section  style="margin-top: 0;margin-bottom: 15px;float: left;width: 320px;">
								<label class="commodity-name required fl" style="width:90px;">商品识别码</label>
								<label>
									<input type="text" placeholder="输入商品识别码" v-model="good.identifyCode"  maxlength="5" style="width:135px;" />
									<a  href="javascript:void(0);" class="yellow" @click="setBarCode('identifyCode',null,null)" style="width: 80px;height:40px;line-height: 40px;">生成识别码</a>
								</label>
							</section>
						</template>
					
					</section>

					<section>
						<label class="commodity-name required fl">分类</label>
						<label class="commodity-type fl"  style="width: 600px;">
							<span class="sign"  v-for="(cat,index) in selectCategory" :key="index" v-on:click="deleteSelectCategory(cat,index)">{{cat.name}}</span>
							<a href="javascript:void(0);"  v-on:click="openCommonWin('category')" class="addclassify fl" >添加分类</a>
						</label>
					</section>
	
					<section v-if="ischain == 1 || ischain == 2">
					<label v-if="good.id" class="commodity-name fl">来源</label>
					<label v-if="good.id" id="cids" style="width: 600px;">
						<span v-if="good.id>100000">门店自建</span>
						<span v-if="good.id>1&&good.id<100000">品牌同步</span>
					</label>
					</section>

					<section v-if="good.isGroup!=1 && good.isCode!=1">
						<label class="commodity-name  fl">口味</label>
						<label class="commodity-type fl" id="attrs" style="width: 600px;">
							<template >
								<span v-for="(att,index) in selectAttr" :key="index" v-on:click="deleteSelectAttr(att,index)" class="sign" >{{att.name}}</span>
							</template>
						<a href="javascript:void(0);" class="addclassify fl" v-on:click="openCommonWin('attr')">添加口味</a>
						</label>
					</section>

					<!--		多规格开关		-->
					<section v-if="good.type==0">
						<label class="commodity-name  fl">多规格</label>
						<span class="on check-span fl" style="display:inline-block">
							<on-off @statusChange="toggleIsGroup" :status="good.isGroup==1"></on-off>
						</span>
						<a v-show="good.isGroup==1"  href="javascript:void(0);" v-on:click="addGroup(1)"  class="addclassify fl" style="margin-left: 20px;display:inline-block;" >添加规格</a>
					</section>

					<!--		添加多规格		-->
					<section  v-if="good.isGroup==1 && good.type==0">
					<div v-for="(group,groupIndex) in groupData" :key="groupIndex">
						<div class="good-group" >
							<label v-if="groupIndex==0" class="commodity-name required fl">规格
								一
							</label>
							<label v-if="groupIndex==1" class="commodity-name required fl">规格
								二
							</label>
							<label v-if="groupIndex==2" class="commodity-name required fl">规格
								三
							</label>
							<input type="text" v-model="group.goodsName" placeholder="规格名称"  style="width:76px;" maxlength="6"/>
							<label class="commodity-name required fl" style="width:60px;">售价</label>
							<label >
								<input type="text" placeholder="售价" v-model="group.price"  style="width: 40px" maxlength="10"  />
								<div class="price">元</div>
							</label>
							<label class="commodity-name fl" style="width:60px;">成本</label>
							<label >
								<input type="text" placeholder="成本" v-model="group.cost"  style="width: 40px" maxlength="10"  />
								<div class="cost">元</div>
							</label>
							<label class="commodity-name required fl" style="width:80px;">单位</label>
							<label>
								<input type="text" placeholder="单位"  v-model="group.unit"  style="width: 40px" maxlength="10"  />
							</label>
							<div v-if="false" class="delete-div" >
								<img  src="../../../res/icon/delete.png"/>
							</div>
							<div  class="relative-div" v-on:click = "deleteGroup(group,groupIndex)">
								<div class="blue release-relative">解除关联</div>
							</div>
						</div>

						<section v-if="good.isInvoicing==1"  class="good-group-invoicing" style="width:475px;">
							<label class="commodity-name required fl">条码</label>
							<label style="margin-right:15px;float:left;">
								<input type="text" placeholder="输入条码" v-model="group.barCode"  maxlength="13" style="width:80px;" />
								<a  href="javascript:void(0);" class="yellow getBarCode" v-on:click="setBarCode('groupBarCode',group,groupIndex)" >获取条码</a>
							</label>
							<label class="fl" style="margin-right:15px">副条码</label>
							<label>
								<input type="text" placeholder="输入副条码" v-model="group.secBarCode"  maxlength="13" style="width:80px;" />
								<a  href="javascript:void(0);" class="yellow getBarCode" v-on:click="setBarCode('groupSecBarCode',group,groupIndex,true)" >获取副条码</a>
							</label>
						</section>

						<section  v-if="good.isInvoicing==1"  class="good-group-validity">
							<label class="commodity-name fl" style="width: 60px;">保质期</label>
							<label style="width:250px;">
								<div class="weight" @click.stop>
									<input type="text" v-model="group.validity" style="width:40px;"  maxlength="3" class="input"/>
									<div  class="sList fl" style="margin-left:10px;" >
										<div  class="tableListInp"  v-on:click="toggleGroupShowValidityTyep(group,groupIndex,$event)">
											<span style="width: 30px;border:1px solid #ccc;" >{{group.validityType}}</span>
											<div class="fl" style="background-color: #fff;width: 15px;border:1px solid #ccc;border-left:none;">
												<i></i>
											</div>
										</div>
										<ul v-show="group.showValidity"  v-on:click="funSelectValidityType($event,group,groupIndex)" class="tableListUl">
											<li v-for="(date,valIndex) in validityTypeArr" :key="valIndex">{{date.name}}</li>
										</ul>
									</div>
								</div>
							</label>
						</section>

						<div  class="good-group-vipPrice" v-if="good.isVip==1">
							<label class="commodity-name required fl" style="width:80px;">会员价格</label>
							<label >
								<input type="text" placeholder="会员价格"  v-model="group.vipPrice"   style="width: 70px" maxlength="10"  />
								<div class="vip-div">元</div>
							</label>
						</div>


						<div class="good-add-relative">
							<label v-if="!group.id" class="commodity-type fl" style="width: 600px;margin-bottom: 10px;">
								<a href="javascript:void(0);" class="addclassify fl" v-on:click="openMultipleAddRelativeGoodWin(group,groupIndex)">添加关联商品</a>
								<h3 v-show="!!group.relativeGood.goodsName" class="relative-good">已关联商品：</h3>
								<span v-show="!!group.relativeGood.goodsName" class="sign" @click="deleteRelativeGood(group,groupIndex)" >{{group.relativeGood.goodsName}}</span>
							</label>

							<label class="commodity-type fl" style="width: 600px;" >
								口味
								<a href="javascript:void(0);" v-on:click="openMultipleAttrWin(group,groupIndex)" class="addclassify fl" >添加口味</a>
								<span  v-for="(att,attIndex) in group.attr" :key="attIndex" class="sign" @click="deleteSelectAttrMul(group.attr,attIndex,att)">{{att.name}}</span>
							</label>
						</div>
						
					</div>
					</section>



					<!--关联信息-->
					<section class="titleTop" style="width:100%;height:40px;">
						<div class="relative-info">
							<i></i>
							<h3>关联信息</h3>
							<div class="dian"></div>
						</div>
						</section>

						<section>
							<section class="fl" style="width: 33%;">
								<label class="commodity-name  fl">参与优惠</label>
								<on-off :status="good.isDiscount==1" @statusChange="(res)=>{switchFn(res,'isDiscount')}"></on-off>
							</section>
							<section class="fl" style="width: 33%;">
								<label class="commodity-name  fl">服务费</label>
							<on-off :status="good.serviceCharge==1" @statusChange="(res)=>{switchFn(res,'serviceCharge')}"></on-off>
							</section>
							<section class="fl" style="width: 33%;">
								<label class="commodity-name  fl">推荐菜</label>
								<on-off :status="good.isRecommend==1" @statusChange="(res)=>{switchFn(res,'isRecommend')}"></on-off>
							</section>
						</section>

						<section>
							<section class="fl" style="width: 33%;" >
								<label class="commodity-name  fl">开启进销存</label>
								<on-off :status="good.isInvoicing==1" @statusChange="toggleIsInvoicing"></on-off>
							</section>
							<section  class="fl" style="width: 33%;" v-if="good.type==0">
								<label class="commodity-name  fl">自取</label>
								<on-off :status="good.isSelf==1" @statusChange="(res)=>{switchFn(res,'isSelf')}"></on-off>
							</section>
							<section  class="fl" style="width: 33%;" v-if="good.type==1">
								<label class="commodity-name  fl">识别码</label>
								<on-off :status="good.isCode==1" @statusChange="toggleIsCode"></on-off>
							</section>
							<section v-if="ischain !='3'" class="fl" style="width: 33%;">
								<label class="commodity-name  fl">开启库存</label>
								<on-off :status="good.isStock==1"  @statusChange="toggleIsStock"></on-off>
							</section>
						</section>

						<section class="fl" style="width: 33%;">
							<label class="commodity-name  fl">时价菜</label>
							<on-off :status="good.isSeasonal==1"  @statusChange="(res)=>{switchFn(res,'isSeasonal')}"></on-off>
						</section>
						<section class="fl" style="width: auto;">
							<label class="commodity-name  fl">参与会员</label>
							<span class="on check-span" style="display:inline-block">
								<on-off :status="good.isVip!=0"  @statusChange="(res)=>{switchFn(res,'isVip')}"></on-off>
							</span>
						</section>

						<section v-if="good.isVip!=0" class="fl relative-vip" >
							<section  style="width: 50%;margin: 0;">
								<span  @click="good.isVip=1" :class="{'fl':true,'sign':good.isVip==1 ,'vip':true}">会员价格</span>
								<span  @click="good.isVip=2" :class="{'fl':true,'sign':good.isVip==2,'vip':true}">会员折扣</span>
							</section>
							<section  class="vipPrice" style="width: 50%;float: right;margin: 0;" v-show="good.isVip==1 && good.isGroup!=1">
								<label class="commodity-name  fl">会员价格</label>
								<input type="text" placeholder="输入会员价格" v-model="good.vipPrice" style="width: 120px;"/>
							</section>
							</section>
						<section>

						<section>
							<label class="commodity-name fl">描述</label>
							<textarea class="describe fl" v-model="good.description"  placeholder="请输入描述" maxlength="100"></textarea>
						</section>   
					
					</section>
				</section>
			</section>
		</div>
	</win>
    <component
        :is="showCom"
        :pObj="comObj"
	   :pGoodsList="comObj"
        @throwCommonWin="closeCommonWin"
	   @throwGoodListWin="closeMultipleAddRelativeGoodWin"
    ></component>
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
			],                    //商品类型
			validityTypeArr: [
				{ id: 0, name: '月' },
				{ id: 1, name: '日' },
				{ id: 2, name: '年' }
			],                    //保质期的类型
			unitArr: [
				{ id: 0, name: '斤' },
				{ id: 1, name: '两' },
				{ id: 2, name: 'g' },
				{ id: 3, name: 'Kg' },
				{ id: 4, name: '币' }
			],                  //商品的单位
			btnOk: {},          //右边按钮
			btnCancel: {},      //左边按钮
			
			//传递的数据
			shopId:null,        
			brandId:null,
			title:'',					//弹窗标题
			editGoodsId:null,   		//正在编辑的商品的id
			ischain:null,       		//店铺类型
			imgHost:null,       		//图片地址前缀
			goodsList: [], 				//所有商品
			category:[],    			//所有的分类
			status:null,				//商品的上下架状态

			good: {
				id: '',                   //商品id
				attr:[],                  //口味
				type: 0,                  //商品的类型
				sort: 1,                  //获取商品的排序值
				goodsName: '',            //商品名
				brandId: '',              //添加的品牌id
				BC: '',                   //简码
				price: '',                //售价
				unit: '',                 //单位
				cost: '',                 //成本
				barCode: '',              //普通菜条码 || 称重菜识别码
				secBarCode:'',			  //第二个条码
				description: '',          //描述
				validity: '',             //保质期时间
				validityType: '月',        //保质期的类型 0:月 1:日 2:年
				isGroup: 0,               //是否是多规格
				isDiscount: 0,            //是否开启折扣
				serviceCharge: 0,         //是否开启服务费
				isRecommend: 0,           //是否开启推荐菜
				isInvoicing: 0,           //是否开启进销存
				isSelf: 0,                //是否开启自取
				isStock: 0,               //是否开启库存
				isSeasonal: 0,            //是否开启时价菜
				isVip: 0,                 //是否开启会员		0:未开启 1:开启会员价格 2:开启折扣
				isBom:0,				  //是否关联bom单
				isCode: 0,                //是否开启识别码	(称重商品)
				imageName: '',            //图片的名字
				specifications: '',       //输入的规格
				vipPrice: '',             //会员价格
				vipDiscount: '',          //会员折扣

				identifyCode: '',       	//(实际不存在的字段)生成的称重商品的识别码(5位)
				code: ''                  	//(实际不存在的字段)称重商品类别识别码 称重商品的barCode=good.code+good.identifyCode
			},
			identifyCodeMax: null,         	//比较所有商品识别之后生成的最大商品识别码
			identifyName: '选择类别识别码',   //称重商品类别识别码展示的文字


			attr: [], 						//所有的口味列表
			brandList: [], 					//品牌列表
			barList: [], 					//类别识别码

			showCom:null,   				//需要展示的组件
			comObj:{},      				//传递给组件的数据

			showBarList: false, 			//称重商品识别码下拉框的展示
			showValidity: false, 			//非多规格普通菜,称重菜保质期下拉框的展示
			showUnit: false, 				//是否展示单位(称重商品)

			selectAttr: [],           		//非多规格选择的口味
			selectBrandObj: {},     		//选择的品牌对象
			selectCategory: [],       		//选择的商品分类[{gid: 100047, name: "饿了么", id: "100005"}]

			groupData: [],              	//存储多规格商品:attr,barCode,cost,goodsName,id,price,unit(多规格需要提交的数据)
			nowGroupIndex: {},            	//groupDate中的一个元素
			flag:'',						//当前编辑的是哪个窗口

			test:{},						//校验表单的临时对象
			mapHttp:{
				uploadImg:'uploadImg',					//上传图片
				downChildGoods:'downChildGoods',		//删除规格
				getAttr:'getAttr',						//获取口味
				getGoodsDetail:'getGoodsDetail',		//获取商品详情							
				goodEdit:'goodEdit',					//编辑商品
				createGood:'createGood',				//添加商品
				brandList:'brandList',					//获取品牌列表
				GoodWeighgoodsGetList:'GoodWeighgoodsGetList',						//获取识别码
				goodUpOrDownShelf:'goodUpOrDownShelf',	//商品的上下架
			},
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
		//切换商品的类型
		toggleGoodType(id) {
			if(this.editGoodsId) return;

			this.good.isInvoicing=0;
			this.good.isStock=0;
			this.good.isCode=0;
			this.good.isGroup=0;

			this.good.type=id;
			switch ('' + this.good.type) {
				case '0':
					this.good.unit = '';
					this.good.validityType = '月';
					break;
				case '1':
					this.good.unit = '斤';
					this.good.validityType = '月';
					break;
				case '2':
					this.selectCategory = [];
					break;
			}
		},
		//编辑图片
		async uploadGoodsImg(){
			this.good.imageName = await this.getHttp(this.mapHttp.uploadImg,{
				data:{
					type:5,
					shopId:this.shopId
				},
				formId:'img_upload'
			});
		},
		//删除图片
		deleteGoodImg(){
			if(!this.good.imageName){
				this.alertWin('此商品无图片!');
				return;
			}
			this.$store.commit('setWin',{title:'温馨提示',winType:'confirm',content:'确认删除图片?',callback:(res)=>{
				if(res=='ok'){
					this.good.imageName='';
				}
			}});
		},
		//-----------			普通菜		-----------
		//生成普通菜的条码
		generatorBarCode() {
			let barCode = '90' + ((Math.random() * 90000000) | 10000000) + '';
			return barCode;
		},
		//设置副条码,条码,识别码
		writeBarCode(obj,attr,fn){
			obj[attr] = String(obj[attr]);
			if(obj[attr] && obj[attr].trim().length>0){
				this.$store.commit('setWin', {title: '温馨提示',content: obj.tips, winType: 'confirm',
					callback: (res) => {
						if (res == 'ok') obj[attr] = fn();
					}
				});				
			}else{
				obj[attr] = fn();
			}
		},
		//写入条码,副条码,商品识别码
		setBarCode(flag,group,index) {
			let attr = null;
			switch(flag){
				case 'barCode':			//主条码
				case 'secBarCode':		//副条码
					this.good.tips = `确认重新设置${flag=='barCode' ? '主' :'副'}条码?`;
					this.writeBarCode(this.good,flag,this.generatorBarCode);
					break;
				case 'groupBarCode':	//多规格的主条码
				case 'groupSecBarCode'://多规格的副条码
					attr = flag == 'groupBarCode' ? 'barCode' :'secBarCode'; 
					group.tips = `确认重新设置${flag=='groupBarCode' ? '主' :'副'}条码?`;
					this.writeBarCode(group,attr,this.generatorBarCode);
					this.groupData.splice(index,1,group);
					break;
				case 'identifyCode':
					this.good.tips = `确认重新设置识条码?`;
					this.writeBarCode(this.good,flag,this.generatorCode);
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
			if(this.good.type==2 && this.editGoodsId) return;
			this.selectCategory.splice(index, 1);
		},
		//保质期的的选择 (普通菜与称重菜)
		funGetGoodValidityType(event) {
			this.good.validityType = event.target.innerHTML;
			this.showValidity = false;
		},
		//保质期下拉框的显示(多规格)
		toggleGroupShowValidityTyep(group,index){
			this.groupData.forEach((ele,eleIndex)=>{
				if(index==eleIndex){
					group.showValidity=!group.showValidity;
				}else{
					ele.showValidity=false;
				}
			});
			this.groupData.splice(index,1,group);
		},
		//保质期的选择(多规格)
		funSelectValidityType(event, group,index) {
			let res = event.target.innerHTML;
			group.validityType = res;
			group.showValidity = false;
			this.groupData.splice(index,1,group);
		},
		//添加规格
		addGroup(len=1) {
			for(let i=0;i<len;i++){
				if (this.groupData.length < 3) {
					let obj = {
						showValidity:false,   	//是否显示保质期下拉框
						relativeGood:{},        //关联的商品(对象)
						attr:[],                //口味
					};
					this.assignObj(obj);
					obj.validityType='月';      //保质期类别,月日年  
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
			if(this.editGoodsId && group.id){
				this.$store.commit('setWin', {winType:'confirm',title: '温馨提示',content: '确认解除此种规格的关联？，若取消则此规格商品重新变为单独的普通商品！',
					callback:(res)=>{
						if(res=='ok'){
							let downChildObj={
								shopId:this.shopId,
								brandId:this.brandId,
								goodsId:group.id,
							};
							this.getHttp(this.mapHttp.downChildGoods,{data:downChildObj}).then((res)=>{
								if(res){
									this.groupData.splice(index, 1);
									this.$emit('throwAddGoodsWin', 'releaserelation');
								}
							});
						}
					}
				});
			}else{
				this.groupData.splice(index, 1);
			}
		},


		//--------		称重菜		-----------
		//单位下拉框的显示
		funToggleUnit() {
			if(this.good.type==1 && this.good.isCode==1){
				this.showUnit=false;
				this.alertWin('请先选择类别识别码!');
			}else{
				this.showUnit = !this.showUnit;
			}
		},
		//获取单位(称重)
		funGetUnit(event) {
			if (this.editGoodsId && this.good.isCode==1)  return ;
			this.good.unit = event.target.innerHTML;
			this.showUnit = false;
		},
		//称重商品识别码下拉框的展示
		funShowList() {
			this.barList || (this.barList = []);
			if (this.barList.length == 0) {
				this.showBarList = false;
				this.alertWin('类别识别码列表为空，请在进销存管理中称重商品配置中添加');
				return;
			}
			this.showBarList = !this.showBarList;
		},
		//选择称重商品的识别码
		funSelectList(oneList) {
			this.identifyName = oneList.name;
			this.good.unit = oneList.weightCompany;
			this.good.code = oneList.code;
			this.showBarList = false;
		},
		//称重商品识别码的生成
		generatorCode() {
			if(this.identifyCodeMax){
				this.identifyCodeMax++;
			}else{
				let min = 10000;
				for(let ele of this.goodsList){
					if (ele.barCode && ele.barCode.length == 7) {
						ele.barCode = ele.barCode.trim();
						let str = ele.barCode.slice(2);
						str = parseInt(str);
						min = min > str ? min : str;
					}
				}
				this.identifyCodeMax = min+1;
			}

			if(this.identifyCodeMax>99999){
				this.identifyCodeMax=10000;
			}
			return this.identifyCodeMax;
		},

		//--------	win	---------
		//添加分类,口味(非多规格),品牌窗口
		async openCommonWin(flag) {
			this.flag=flag;			
			switch(flag){
				case 'attr':
					if(this.attr.length==0){
						this.attr=await this.getHttp(this.mapHttp.getAttr);
					}
					this.showCom='addAttr';
					this.comObj={
						radio:true,             	
						selectAttr:this.selectAttr,    
						attr:this.attr,
						title:'选择口味',
						height:650,
						width:765,
					};
					break;
				case 'category':
					if(this.good.type==2 && this.editGoodsId) return;
					this.showCom='addCategory';
					this.comObj={
						category:this.category,
						selectCategory:this.selectCategory,
						radio:this.good.type == 2 ? false : true,
					};               
					break;
				case 'brand':
					this.showCom='addAttr';
					this.comObj={
						radio:false,             	
						selectAttr:[this.selectBrandObj.id],    
						attr:this.brandList,
						title:'选择品牌',
						height:650,
						width:765,
					};
			}
		},
		//关闭添加分类,口味(非多规格,多规格),品牌窗口
		closeCommonWin(data,flag){
			this.showCom='';
			if(flag!='ok') return;
			switch(this.flag){
				case 'attr':
					this.selectAttr=data;
					break;
				case 'category':
					this.selectCategory=data;
					break;
				case 'brand':
					if(data[0]){
						this.selectBrandObj=data[0];
					}else{
						this.selectBrandObj={};
					}
					break;
				case 'multipleAttr':
					this.groupData[this.nowGroupIndex].attr=data;
			}
		},
		//添加多规格的口味
		async openMultipleAttrWin(group,groupIndex){
			if(this.attr.length==0){
				this.attr=await this.getHttp(this.mapHttp.getAttr);
			}
			this.showCom='addAttr';
			this.flag='multipleAttr';
			this.nowGroupIndex=groupIndex;
			this.comObj={
				radio:true,             	
				selectAttr:group.attr,    
				attr:this.attr,
				title:'选择口味',
				height:650,
				width:765,
			};
		},
		//添加多规格的关联商品
		openMultipleAddRelativeGoodWin(group,groupIndex){
			this.showCom='addRelative';
			// 只显示上架的普通商品,多规格主菜和子菜都不显示
			let goods=this.goodsList.filter((ele)=>{
				if(ele.status==0 || ele.status==1){
					if(ele.type==0 && !Number(ele.groupId) && !Number(ele.isGroup) && this.editGoodsId!=ele.id){
						if(this.good.isInvoicing==ele.isInvoicing){
							return true;
						}
					}
				}
			});
			//当开启了进销存,则不能添加已经关联了BOM单的商品
			if(this.good.isInvoicing==1){
				goods=goods.filter((ele)=>{
					return ele.isBom!=1;
				});
			}
			let tempArr=[];
			if(group.id){
				tempArr.push(group.id);
			}else{
				tempArr.push(group.relativeGood.id);
			}
			this.nowGroupIndex=groupIndex;
			this.comObj={
				title:'关联商品',
				type:1,    
				goodsList:goods,
				selGoods:tempArr,
				goodRadio: true,
				showSelectAll:2
			};
		},
		//关闭添加多规格的关联商品
		closeMultipleAddRelativeGoodWin(flag,obj){
			this.showCom='';
			if(flag!='ok') return ;
			let temp=obj.goodArr[0];
			if(typeof temp!='object') return;
			temp.name=temp.goodsName;
			this.groupData[this.nowGroupIndex].relativeGood=temp;
			this.groupData[this.nowGroupIndex].price=temp.price;
			this.groupData[this.nowGroupIndex].cost=temp.cost;
			this.groupData[this.nowGroupIndex].unit=temp.unit;
			let attrs=temp.attr;
			attrs.forEach((ele)=>{
				let attr={
					id:ele.attrId,
					name:ele.name,
					options:ele.options
				};	
				this.groupData[this.nowGroupIndex].attr.push(attr);
			});
		},
		//删除选中的关联商品(多规格)
		deleteRelativeGood(group) {
			this.$store.commit('setWin', {title: '温馨提示',winType: 'confirm',content: '是否删除该关联商品?',
				callback: (res) => {
					if (res == 'ok') {
						group.relativeGood = {};
						group.price='';
						group.cost='';
						group.unit='';
						group.attr=[];
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
					if(!this.checkForm()) return;
					let data = this.formatData(); //返回格式化的数据
					this.getHttp(this.mapHttp.goodEdit,{data}).then((result)=>{
						this.alertWin( '保存商品成功!');
						this.$emit('throwAddGoodsWin', 'edit', result);
					});
				}
				if (res == 'cancel') {
					let str = `确定${this.status == 2?'上':'下'}架该商品?`;

					this.$store.commit('setWin', {winType: 'confirm',title: '温馨提示',content: str,
						callback: (callbackRes) => {
							if (callbackRes == 'ok') {
								str=this.editGoodsId+',';
								
								if(this.groupData.length>0){
									let arrStr=[];
									this.groupData.forEach((ele)=>{
										arrStr.push(ele.id);
									});
									str=str+arrStr.join(',');
								}
								this.getHttp(this.mapHttp.goodUpOrDownShelf,{
									data:{
										goodsId: str,
										shopId: this.shopId,
										status: this.status == 2 ? 0 : 2										
									}
								}).then(()=>{
									str = this.status == 2 ? '上架成功!' : '下架成功!';
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
					if (!this.checkForm())return;
					let data = this.formatData(); 
					this.getHttp(this.mapHttp.createGood,{data}).then((result)=>{
						if(!data) return;
						this.alertWin('添加商品成功!');
						this.$emit('throwAddGoodsWin', 'add',result);
					});
					
				} else {
					this.$emit('throwAddGoodsWin', 'cancel');
				}
			}
		},
		//-------		store win		---------
		alertWin(info){
			this.$store.commit('setWin',{title:'温馨提示',content:info});
		},
		//----------		表单		----------
		//格式化数据
		formatData() {
			let obj = {}; 					//需要提交的所有数据
			let submitValidityType; 			//需要提交的保质期类型id,
			let cids = []; 				//分类id  最终提交的为字符串
			let attrId = []; 				//口味的id 最终提交的为字符串
			let groupData = []; 			//多规格数据

			//保质期的类型
			this.validityTypeArr.some(ele => {
				if (ele.name == this.good.validityType) {
					submitValidityType = ele.id;return true;
				}
			});

			//分类的id
			for(let ele of this.selectCategory){
				cids.push(ele.id);
			}

			//口味的id
			for(let ele of this.selectAttr){
				attrId.push(ele.id);
			}

			//品牌id
			if (
				(this.good.isInvoicing == 1 && this.good.type==0 && this.selectBrandObj.id)
				||(this.good.isCode == 1 && this.good.type==1 && this.selectBrandObj.id)
			){
				obj.brandId = this.selectBrandObj.id;
			}

			//多规格
			if (this.good.type == 0 && this.good.isGroup == 1) {
				this.groupData.forEach(ele => {
					let group = {
						goodsName:ele.goodsName,
						price:ele.price,
						cost:ele.cost,
						unit:ele.unit,
						groupAttrs:'',		//口味
						id:'',			//关联商品的id
					};

					if (this.good.isVip == 1) {
						group.vipPrice = ele.vipPrice;
					}
					if (this.good.isVip == 2) {
						group.vipDiscount = ele.vipDiscount;
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

					if(this.good.isInvoicing==1){
						//条码,保质期,保质期类型
						group.barCode = ele.barCode;
						group.secBarCode = ele.secBarCode;
						group.validity = parseInt(ele.validity);
						this.validityTypeArr.some((val) => {
							if (val.name == ele.validityType) {
								group.validityType = val.id;
								return true;
							}
						});
					}
					groupData.push(group);
				});
			}

			//称重菜品的识别码
			if (this.good.type == 1 && this.good.isCode == 1) {
				this.good.barCode = this.good.code + this.good.identifyCode;
			}
			if(this.good.type==1 && this.good.isCode==0){
				this.good.barCode = '';
			}

			if (this.editGoodsId) obj.goodsId = this.editGoodsId;
			
			obj.shopId = this.shopId;
			let keys = [
				'sort','type','goodsName','BC','price','unit','cost','imageName',
				'validity','isInvoicing','isStock','isDiscount','serviceCharge','isRecommend',
				'isSelf','isCode','isVip','isSeasonal','isGroup','vipPrice','vipDiscount','description',
				'specifications','barCode','secBarCode'
			];
			for(let key of keys){
				obj[key]=this.good[key];
			}
			obj.cids = cids.join(',');
			obj.validityType = submitValidityType;
			obj.attrs = attrId.join(',');

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
				if (!global.checkData({
					goodsName: {
						cond: '$$.length>0 && $$.length<45 && ((/^[^!@#$%&*]+$/).test($$))',
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
				},this.good))return false;
			}

			//----------		称重菜,普通菜:售价,单位(普通菜),成本,会员	-----------
			if ((this.good.type == 0 && !Number(this.good.isGroup)) ||this.good.type == 1) {
				if (
					!global.checkData({
						price: {
							reg: /((^[1-9]\d{0,9})|^0)(\.\d{1,2})?$/,
							pro: '请输入正确的售价!'
						},
						cost:{
							reg:/(((^[1-9]\d{0,9})|^0)(\.\d{1,2})?$)|(^((\s)*(\t)*)?$)/,
							pro:'请输入正确的成本格式!'
						}

					},this.good)
				)return false;

				if(Number(this.good.price)>100000){
					this.alertWin('售价超过10万!');return false;
				}

				let unitTips = '';
				if(this.good.type == 1){
					unitTips = '请输入单位且不能超过5个字符!';
				}
				if(this.good.type == 0 && !Number(this.good.isCode)){
					unitTips = '请选择单位!';
				}
				if(!global.checkData({
					unit: {
						cond: '$$.length>0 && $$.length<6',
						pro: unitTips
					},
				},this.good))return false;
				
				if(Number(this.good.cost)>100000){
					this.alertWin('成本超过10万!');return false;					
				}

				if (this.good.isVip == 1) {
					if (
						!global.checkData({
							vipPrice: {
								reg: /((^[1-9]\d{0,9})|^0)(\.\d{1,2})?$/,
								pro: '请输入正确的会员价格!'
							}
						},this.good)
					)return false;

					if (Number(this.good.vipPrice) > Number(this.good.price)) {
						this.alertWin('会员价格不能大于售价!');
						return false;
					}
					if(Number(this.good.vipPrice)>100000){
						this.alertWin('会员价格超过10万!');
						return false;
					}
				}
			}

			//----------		普通菜:条码,副条码,规格,保质期,-----------------
			if (this.good.type == 0 && this.good.isGroup != 1 && this.good.isInvoicing == 1) {
				if (
					!global.checkData({
						barCode: {
							cond: '$$.length>0 && (/^\\d{10,13}$/).test($$)',
							pro: '请输入条码,条码由10-13位数字组成!'
						},
						specifications: {
							cond: '$$.length>0 && ((/^[^!@#$%&*/\\s]+$/).test($$))',
							pro: '请输入规格且不含特殊字符!'
						},
						validity:{
							reg:/(^\d{0,3}$)|(^((\s)*(\t)*)?$)/,
							pro:'保质期由1-3位数字组成!'
						},
						secBarCode: {
							reg: /(^\d{10,13}$)|(^((\s)*(\t)*)?$)/,
							pro: '副条码由10-13位数字组成!'
						},
					},
					this.good)
				)return false;
			}

			//-----------		称重菜:识别码,保质期,单位	------------------------------
			if(this.good.type==1){
				if(this.good.isCode == 1){
					this.good.identifyCode+='';
					if(!global.checkData({
						code:{
							cond:'$$.length>0',
							pro:'请选择类别识别码!'
						},
						unit:{
							cond:'$$.length>0',
							pro:'请选择类别识别码!'
						},
						identifyCode:{
							reg:/^\d{5}$/,
							pro:'请输入商品识别码,识别码由5位数字组成!'
						},
						validity:{
							reg:/(^\d{0,3}$)|(^((\s)*(\t)*)?$)/,
							pro:'保质期由1-3位数字组成!'
						},
					},this.good))return false;
				}

				if(!Number(this.good.isCode) && this.good.unit.trim().length==0){
					this.alertWin('请选择单位!');return false;
				}
			}
			//----------------普通菜多规格BOM单校验-----------------------

			if(this.good.type==0 && this.good.isGroup==1 && this.good.isInvoicing==1){
				let flagGroup= this.groupData.some((group)=>{
					if(group.relativeGood.isBom==1){
						let str='所关联的'+group.relativeGood.name+' 商品已关联BOM单,请选择其它商品!';
						this.alertWin(str);
						return true;
					}
				});
				if(flagGroup) return false;
			}


			//------------------普通菜多规格---------------------------
			if (this.good.type == 0 && this.good.isGroup == 1) {
				let flag = this.groupData.some(ele => {
					this.test=ele;
					if(!global.checkData({
						goodsName:{
							reg:/^[^<>\s]+$/,
							pro:'请输入不含特殊字符的规格名!'
						},
						price:{
							reg:/((^[1-9]\d{0,9})|^0)(\.\d{1,2})?$/,
							pro:'请输入正确的售价格式!'
						},
						unit:{
							cond:'$$.length>0 && $$.length<6',
							pro:'请输入1-5个字符组成的单位!'
						},
						cost:{
							reg:/(((^[1-9]\d{0,9})|^0)(\.\d{1,2})?$)|(^((\s)*(\t)*)?$)/,
							pro:'请输入正确的成本格式!'
						}
					},this.test))return true;

					if(Number(ele.price)>100000){
						this.alertWin('售价超过10万!');return true;						
					}

					if(Number(ele.cost)>100000){
						this.alertWin('成本超过10万!');return true;
					}

					if(this.good.isInvoicing == 1){
						if(!global.checkData({
							barCode:{
								reg:/^\d{10,13}$/,
								pro:'主条码由10-13位数字组成!'
							},
							secBarCode: {
								reg: /(^\d{10,13}$)|(^((\s)*(\t)*)?$)/,
								pro: '副条码由10-13位数字组成!'
							},
							validity:{
								reg:/(^\d{0,3}$)|(^((\s)*(\t)*)?$)/,
								pro:'保质期由1-3位数字组成!'
							},
						},this.test))return true;		
					}

					if (this.good.isVip == 1) {
						if(!global.checkData({
							vipPrice: {
								reg: /((^[1-9]\d{0,9})|^0)(\.\d{1,2})?$/,
								pro: '请输入正确的会员价格!'
							}
						},this.test))return true;	

						if(Number(ele.vipPrice)>100000){
							this.$store.commit('setWin', {title: '温馨提示',content: '会员价格超过10万!'});
							return true;
						}
						if (this.good.isVip == 1) {
							let price = ele.price;
							let vipPrice = ele.vipPrice;
							if (Number(vipPrice) > Number(price)) {
								this.alertWin('会员价格不能大于售价!');return true;
							}
						}
					}
				});
				if (flag) return false;
				//--------		规格名相同	-----------
				flag = this.groupData.some((ele, index) => {
					let goodsName = ele.goodsName;
					for (let i = index + 1, len = this.groupData.length; i < len; i++) {
						let temp = this.groupData[i].goodsName;
						if (goodsName == temp) {
							this.alertWin('规格名称不能相同!');return true;
						}
					}
				});
				if (flag) return false;
			}

			//---------		商品重名		----------
			if(this.checkGoodsName(this.goodsList,this.good.name,this.editGoodsId)) return false;

			return true;
		},
		//校验时是否有相同的商品名 false:表示没有一样的
		checkGoodsName(goods,name,id){
			if(this.good.type==2) return false;
			if(id) goods=goods.filter((ele)=>{return ele.id!=id});
			let flag=goods.some((ele)=>{
				if (ele.goodsName == name) {
					this.alertWin('商品名重名!');
					return true;
				}				
			});
			return flag;
		},


		//----------		开关		---------
		//多个开关的切换
		switchFn(res,flag) {
			switch(flag){
				case 'sort':				//获取排序值
					this.good[flag] = parseInt(res);
					break;				
				case 'isDiscount':			//是否优惠
				case 'isRecommend':
				case 'serviceCharge':
				case 'isSelf':
				case 'isSeasonal':
				case 'isVip':
					this.good[flag] = res ? 1 : 0;
					break;
			}
		},
		//是否是多规格
		toggleIsGroup(res) {
			if (!res && this.editGoodsId && this.good.isInvoicing == 1 && this.good.isGroup==1) {
				this.alertWin('商品已参与进销存核销,多规格不能取消!');
				this.good.isGroup=1;
				return;
			}
			if (res && this.editGoodsId && this.good.isInvoicing == 1) {
				this.$set(this.good,'isGroup',0);
				this.alertWin('商品已参与进销存核销,不能开启多规格!');
				return;
			}
			this.good.isGroup = res ? 1 : 0;
			if(this.good.isGroup==1 && this.groupData.length<2){
				this.addGroup(2);
			}
		},
		//开启进销存
		toggleIsInvoicing(res) {
			if (res && this.good.isStock == 1) {
				this.alertWin('进销存和库存只能开启一个!');
				return;
			}

			//校验BOM单
			if(this.good.type==0 && this.editGoodsId && this.good.isBom==1 && res){
				this.alertWin('该商品已经关联BOM单,不能开启进销存!');
				return;
			}
			//子菜关联了BOM单,不能开启进销存.
			if(this.good.type==0 && this.good.isGroup==1 && res){
				let [goodsName,tipsWord]=['',''];
				let bomFlag=this.groupData.some((group)=>{
					if(group.relativeGood.isBom==1){
						goodsName=group.relativeGood.name;
						return true;
					}
				});
				if(bomFlag){
					tipsWord='所关联的 '+goodsName+' 商品已关联BOM单,不可开启进销存!';
					this.alertWin(tipsWord);return;
				}
			}

			this.good.isInvoicing = res ? 1 : 0;

			//请求识别码
			if(this.good.type==1 && this.good.isCode==0 && this.good.isInvoicing==1){
				this.good.isCode=1;
				if(this.good.type==1 && this.good.isCode==1 && this.barList.length==0){
					this.getHttp(this.mapHttp.GoodWeighgoodsGetList,{data:{shopId:this.shopId,brandId:this.brandId}}).then((barList)=>{
						this.barList=barList;
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
			this.good.isStock = res ? 1 : 0;
		},
		//识别码
		async toggleIsCode(res) {
			this.good.isCode = res ? 1 : 0;
			//同步关闭识别码与进销存
			if (this.good.type == 1 && this.good.isCode == 0 && this.good.isInvoicing == 1) {
				this.good.isInvoicing = 0;
			}
			//称重商品开启识别码,不能选择口味
			if(this.good.isCode==1){
				this.selectAttr=[];
			}
			//请求识别码
			if(this.good.type==1 && this.good.isCode==1 && this.barList.length==0){
				this.barList = await this.getHttp(this.mapHttp.GoodWeighgoodsGetList,{data:{shopId:this.shopId,brandId:this.brandId}});
			}
		},

		//-------		初始化		-----

		//初始化数据
		initData(){
			for(let attr in this.pObj){
				this[attr]=this.pObj[attr];
			}
		},
		//初始化弹窗按钮
		initWinBtn(){
			this.btnOk={content: '确定',style: null};
			this.btnCancel={content: '取消',style: null};

			if(!this.editGoodsId) return;

			if(this.status == 2){
				this.btnCancel = {content: '上架',style: 'background-color:#22aae0' };
			}else{
				this.btnCancel = {content: '下架',style: 'background-color:#22aae0'};
			}
			this.btnOk = {content: '保存',style: 'background-color:#f8941f'};
		},
		//组合公共属性
		assignObj(obj={}){
			let temp={};
			let keys = ['barCode','secBarCode','cost','goodsName','price','unit','validity','validityType','vipPrice'];
			for(let key of keys){
				temp[key]='';
			}
			Object.assign(obj,temp);
			return keys;
		},
		//初始化商品
		async initGoods(res) {

			//为good添加字段
			this.$set(this.good,'code','');				//称重商品的类别识别码
			this.$set(this.good,'identifyCode','');		//称重商品的商品识别码
			if(!this.good.secBarCode) this.$set(this.good,'secBarCode','');

			//将保质期类型(数字)映射为文字
			if (res.type == 0 || res.type == 1) {
				for(let ele of this.validityTypeArr){
					if(ele.id == res.validityType){
						this.good.validityType = ele.name;
						break;					
					} 
				}
			}

			//初始化称重商品识别码code(类别识别码),identifyCode(商品识别码),identifyName(类名识别码的文字名称)
			if(this.good.type == 1 && this.good.isCode==1) {
				this.barList = await this.getHttp(this.mapHttp.GoodWeighgoodsGetList,{data:{shopId:this.shopId,brandId:this.brandId}});
				this.good.barCode += '';
				this.good.code = this.good.barCode.substr(0, 2);
				this.good.identifyCode = this.good.barCode.slice(2);
				this.barList.some(ele => {
					if (ele.code == this.good.code){
						this.identifyName = ele.name;
						return true;
					} 
				});
			}
			
			//1.groupData添加showValidity字段控制日期的显示与隐藏,2.将保质期的类型映射为文字,3.映射关联商品
			if (this.good.type==0 && this.good.isGroup == 1) {
				this.groupData = res.groupData; 
				for(let group of this.groupData){
					group.showValidity = false;
					group.relativeGood={};
					if(!group.barCode) group.barCode='';
					if(!group.secBarCode) group.secBarCode='';
					if(!group.validity) group.validity='';
					if(!group.validityType) group.validityType='0';

					this.goodsList.some((ele)=>{
						if(group.id==ele.id){
							group.relativeGood={
								id:ele.id,
								name:ele.goodsName,
								goodsName:ele.goodsName,
								isBom:ele.isBom
							};
							return true;
						}
					});	

					let flag=this.validityTypeArr.some((ele) => {
						if(ele.id == group.validityType){
							group.validityType = ele.name;
							return true;
						}
					});
					if(!flag) group.validityType='月';
				}
			}

			//获取选中的品牌
			if(this.good.type!=2){
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
			this.selectCategory = res.cate; //       Array
		},
		//同步请求商品识别码,品牌列表,商品详情
		async asyncRequest() {
			if(this.editGoodsId && this.good.type==1 && this.good.isCode==1){
				this.barList = await this.getHttp(this.mapHttp.GoodWeighgoodsGetList,{data:{shopId:this.shopId,brandId:this.brandId}});
			}
			this.brandList=await this.getHttp(this.mapHttp.brandList);
			let res=null;
			if (this.editGoodsId){
				res = await this.getHttp(this.mapHttp.getGoodsDetail,{
					data:{
						goodsId: this.editGoodsId,
						shopId: this.shopId				
					}});
			}
			if(res){
				this.good = res;
				this.initGoods(res);
			}
		},
		//请求数据
		async getHttp(url,obj={}){
			let res = await http[url](obj);
			return res;
		},	
		//捕捉弹窗的事件冒泡
		winCancelBubble(){
			if(this.good.type==0){
				if(this.good.isGroup==1 && this.good.isInvoicing==1){
					this.groupData=this.groupData.map((ele)=>{
						ele.showValidity=false;
						return ele;
					});
				}
				if(this.good.isGroup!=1 && this.good.isInvoicing==1){
					this.showValidity=false;
				}
			}
			if(this.good.type==1){
				if(this.good.isCode==1) this.showValidity=false;
				this.showUnit=false;
			}
			if(this.good.type==1 && this.good.isCode==1){
				this.showBarList=false;
			}
		},	
	},
	mounted() {
		this.initData();
		this.initWinBtn();
		this.asyncRequest();
		document.addEventListener('click',this.winCancelBubble,false);
	},
	beforeDestroy(){
		document.removeEventListener('click',this.winCancelBubble);
	},
	components: {
		win: () => import(/*webpackChunkName:'win'*/ 'src/components/win'),
		subAdd: () => import(/*webpackChunkName:'subadd'*/ 'src/components/subadd'),
		onOff: () => import(/*webpackChunkName:'on_off'*/ 'src/components/on_off'),
		addAttr: () => import(/*webpackChunkName:'add_attr_win'*/ '../goods_manager_coms/add_attr_win'),
		addCategory: () => import(/*webpackChunkName:'add_category_win'*/ '../goods_manager_coms/add_category_win'),
		addRelative: () => import(/*webpackChunkName:'good_package_win'*/ '../common/good_package_win')
	},
};
</script>
<style lang="less" scoped>

	.win-content {
		width: 700px;
		height: 100%;
		background-color: #f2f2f2;
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
	.good-type {
		position: relative;
		display: inline-block;
		width: 440px;
	}
	.good-sort {
		display: inline-block;
		width: auto;
		label {
			width: auto;
			padding-right: 5px;
		}
	}
	.good-price {
		background-color: #fff;
		width: 30px;
		text-align: center;
		float: left;
		margin-right: 1px;
	}
	.good-cost {
		background-color: #fff;
		width: 30px;
		text-align: center;
		float: left;
	}
	.good-isInvoicing {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		z-index: 10;
	}
	.good-image {
		float: left;
		width: 225px;
		height: 150px;
		.good-image-div {
			position: relative;
			width: 225px;
			height: 150px;
			background: url(../../../res/images/upload.png) center 40px
			no-repeat #ddd;
		}
		.good-image-delete {
			background: url(../../../res/images/a50.png) repeat;
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
		.good-barCode {
			margin-top: 0;
			margin-bottom: 15px;
			float: left;
			width: 320px;
		}
		.good-getBarCode {
			width: 80px;
			height: 40px;
			line-height: 40px;
		}
	}
	.good-code {
		margin-top: 0;
		margin-bottom: 15px;
		float: left;
		width: 315px;
	}
	.good-invalidity {
		margin-top: 0;
		margin-bottom: 15px;
		float: left;
		width: 350px;
		.good-invalidity-input {
			width: 120px;
			margin-left: 1px;
			float: left;
		}
	}
	.good-speci {
		margin-top: 0;
		margin-bottom: 15px;
		width: 320px;
	}
	.good-brand {
		margin-top: 0;
		margin-bottom: 15px;
		width: 350px;
	}
	.good-group {
		width: 100%;
		width: 100%;
		overflow: hidden;
		margin-bottom: 10px;
		.price {
			background-color: #fff;
			width: 30px;
			text-align: center;
			float: left;
		}
		.cost {
			background-color: #fff;
			width: 30px;
			text-align: center;
			float: left;
		}
		.delete-div {
			width: 25px;
			height: 25px;
			display: inline-block;
			margin: 6px 15px;
			cursor: pointer;
		}
		.release-relative {
			width: 70px;
			height: 30px;
			line-height: 30px;
			text-align: center;
			color: #fff;
			border-radius: 6px;
		}
		.relative-div {
			width: 25px;
			height: 25px;
			float: left;
			margin: 6px 15px;
		}
	}
	.good-group-invoicing {
		margin-top: 0;
		margin-bottom: 15px;
		float: left;
		width: 280px;
		.getBarCode {
			width: 80px;
			height: 40px;
			line-height: 40px;
		}
	}
	.good-group-validity {
		margin-top: 0;
		margin-bottom: 15px;
		float: left;
		width: 170px;
		.input {
			width: 30px;
			margin-left: 1px;
			float: left;
		}
	}
	.good-group-vipPrice {
		width: 180px;
		margin: 10px 0;
		overflow: hidden;
		.vip-div {
			background-color: #fff;
			width: 30px;
			text-align: center;
			float: left;
		}
	}
	.good-add-relative {
		width: 100%;
		padding-left: 80px;
		margin-top: 10px;
		margin-bottom: 5px;
		overflow: hidden;
		.relative-good {
			float: left;
			line-height: 40px;
			font-size: 16px;
			width: 120px;
			text-align: center;
		}
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
	.relative-vip {
		width: 100%;
		text-align: center;
		padding-left: 80px;
		.vip {
			width: 90px;
			height: 40px;
			line-height: 40px;
			background-color: #fff;
			margin-right: 1px;
			cursor: pointer;
		}
	}
	.sList {
		display: inline-block;
		position: relative;
		height: 40px;
		line-height: 40px;
		ul {
			width: 100%;
			margin: 0;
			position: absolute;
			top: 40px;
			left: 0;
			z-index: 10;
			background: #fff;
			li {
				text-align: center;
				height: 41px;
				border: 1px #b3b3b3 solid;
				border-top: 0;
				background: #fff;
				cursor: pointer;
			}
		}
		input {
			text-align: center;
			display: block;
			float: left;
			height: 41px;
			width: 158px;
			outline: none;
			border: 0;
			border-right: 1px #b3b3b3 solid;
		}
	}
	.weight .tableListInp {
		span {
			height: 38px;
			width: 60px;
			display: block;
			float: left;
			text-align: center;
			border-right: 1px #b3b3b3 solid;
			color: #636162;
		}
		div {
			width: 40px;
			height: 38px;
			position: relative;
			z-index: 5;
			i {
				height: 10px;
				width: 10px;
				position: absolute;
				top: 50%;
				left: 50%;
				margin-top: -5px;
				margin-left: -5px;
				border-top: 10px solid #b3b3b3;
				border-left: 5px solid transparent;
				border-right: 5px solid transparent;
				box-sizing: border-box;
			}
		}
	}
	.signa {
		background: #fff3e5 !important;
		border: 1px solid #f8931f !important;
		color: #f9911e !important;
	}

</style>


