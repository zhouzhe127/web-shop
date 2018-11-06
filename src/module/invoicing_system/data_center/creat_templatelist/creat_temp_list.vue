/*
* @Author: zhouzhe
* @Date: 2018-10-30 16:32:20
* @file:新建模板
*/
<template>
    <div id="tempList">
        <div class="inpStyle">
            <span class="required label">模板名称</span>
            <div class="inpbox">
                <el-input clearable v-model="listName" maxlength="20" class="el-in" placeholder="输入表名称"></el-input>
            </div>
        </div>
        <div class="inpStyle">
            <span class="required label">查看权限</span>
            <div class="btnbox">
                <el-tag v-for="(tag,i) in sleRoleArr" style="margin:0 0 15px 15px;" :key="tag.name" @close='handleClose(i)'
                    closable>
                    {{tag.name}}
                </el-tag>
                <div class="addBtn">
                    <el-button type="text" @click="addPosition" icon="el-icon-circle-plus-outline">添加权限职位</el-button>
                </div>
            </div>
        </div>
        <div>
            <el-button icon="el-icon-plus" plain>添加行</el-button>
            <el-button icon="el-icon-plus" @click="addColumnlist" plain>添加列</el-button>
        </div>
        <div class="tableBox">
            <el-table :data="tableData">
                <el-table-column prop="date" label="序号" width="50">
                    <el-table-column type="index" label="#" width="50">
                    </el-table-column>
                </el-table-column>
                <el-table-column prop="date" label="#">
                    <el-table-column prop="name" label="名称" width="200">
                        <template slot-scope="scope">
                            <div class="detailsBtn">
                                <span>{{scope.row.name}}</span>
                                <div class="editbtn">
                                    <el-button type="text" icon="el-icon-edit"></el-button>
                                    <el-button type="text" icon="el-icon-delete"></el-button>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column prop="date" v-if="reset" :label="`${index+1}`" v-for="(item,index) in columnData" :key="index">
                    <el-table-column width="240">
                        <template slot="header" slot-scope="scope">
                            <div class="detailsBtn">
                                <el-popover trigger="hover" width="300">
                                    <div class="popover">
                                        <p>
                                            <span>统计</span>:<span>{{item.item.name}}</span>
                                        </p>
                                        <p>
                                            <span>关联店铺</span>:<span>{{item.allShopName}}</span>
                                        </p>
                                        <p>
                                            <span>关联仓库</span>:<span>{{item.allWareName}}</span>
                                        </p>
                                    </div>
                                    <el-button type="text" slot="reference">{{item.name}}</el-button>
                                </el-popover>

                                <div class="editbtn">
                                    <el-button type="text" @click="editColumn(item)" icon="el-icon-edit"></el-button>
                                    <el-button type="text" @click="delColumn(index)" icon="el-icon-delete"></el-button>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
        </div>
        <add-position v-if="positionWin" :roleList="roleList" :sleRoleArr="sleRoleArr" :showWin="positionWin"
            @positionEvent="positionEvent"></add-position>
        <add-column v-if="columnShow" :pObj="columnListData" @emit="columnEmit"></add-column>    
    </div>
</template>
<script>
    import http from 'src/manager/http';
    import utils from 'src/verdor/utils';
    export default {
        data() {
            return {
                listName: '',
                tableData: [{
                    name: '王小虎'
                }, {
                    name: '王小虎'
                }, {
                    name: '王小虎'
                }, {
                    name: '王小虎'
                }, {
                    name: '王小虎'
                }, {
                    name: '王小虎'
                }, {
                    name: '王小虎'
                }],
                columnData:[],//列数据
                positionWin: false,
                roleList: [], //门店职位列表
                sleRoleArr: [], //选中的职位
                columnShow:false,//选择列
                reset:true,
                columnListData:{}//需要编辑列
            }
        },
        methods: {
            handleClose(index) {
                this.sleRoleArr.splice(index, 1);
            },
            addPosition() {
                this.positionWin = true;
            },
            positionEvent(sle) {
                if (sle) {
                    this.sleRoleArr = sle;
                }
                this.positionWin = false;
            },
            crageBtn() {
                this.$store.commit('setFixButton', [{
                    name: '取消',
                    className: 'info',
                    type: 1,
                    fn: () => {

                    }
                }, {
                    name: '确定',
                    className: 'primary',
                    type: 1,
                    fn: () => {

                    }
                }]);
            },
            async getRoleList() {
                let data = await http.getUserRoleList();
                this.roleList = data;
                console.log(data);
            },
            delColumn(index){
                this.$confirm(`是否删除第${index+1}列`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
                    this.columnData.splice(index,1);
                    this.resetColumn();
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
                
            },
            addColumnlist(){
                this.columnShow = true;
            },
            columnEmit(data){
                this.columnShow = false;
                if(data){
                    data.allWareName = this.getStr(data.warehouse,'name');
                    data.allShopName = this.getStr(data.store,'name');
                    this.sortList(this.columnData,data,'sort');
                    // this.columnData = utils.deepCopy(this.sortList(this.columnData,data,'sort'));
                    console.log(this.columnData);
                }
            },
            editColumn(item){
                this.columnShow=true;
                Object.assign(this.columnListData,item,{itemList:this.columnData});
            },
            getStr(arr,key){
                let strArr = [];
                arr.forEach(element => {
                    strArr.push(element[key]);
                });
                return strArr.join(',');
            },
            sortList(list,obj,key){
                if(obj[key]){
                    list.splice(obj[key]-1,0,obj);
                }else{
                    list.push(obj);
                }
                for(let i=0;i<list.length;i++){
                    list[i][key] = i+1;
                }
                this.resetColumn();
                return list;
            },
            resetColumn(){
                this.reset = false;
                this.$nextTick(()=>{
                    this.reset = true;
                });
            }
        },
        activated() {
            this.crageBtn();
            this.getRoleList();
        },
        deactivated() {
            this.$store.commit('setFixButton', []);
        },
        components: {
            addPosition: () =>
                import( /*webpackChunkName: 'addPosition'*/ './add_position'), //添加职位
            addColumn: () =>
                import( /*webpackChunkName: 'addColumn'*/ 'src/module/invoicing_system/data_center/add_column.vue'), //添加列    
        }
    };
</script>
<style lang='less' scoped>
    #tempList {
        .inpStyle {
            margin-bottom: 20px;

            .inpbox {
                display: inline-block;
                width: 200px;
                margin-left: 15px;
            }

            .btnbox {
                display: inline-block;
                vertical-align: top;
                width: 400px;
            }

            .addBtn {
                padding-left: 15px;
                height: 13px;
                display: flex;
                align-items: center;
            }
        }

        .tableBox {
            display: inline-block;
            margin-top: 20px;

            span {
                display: inline-block;
                width: 125px;
                height: 100%;
                vertical-align: middle;
                word-break: break-all;
            }

            .editbtn {
                display: inline-block;
                vertical-align: middle;
            }

        }

    }

    .popover {
        p {
            display: flex;
            align-items: center;
            margin-bottom: 5px;
            span {
                display: inline-block;
                word-break: break-all;

                &:nth-child(1) {
                    text-align: right;
                    width: 25%;
                }

                &:nth-child(2) {
                    width: 75%;
                    margin-left: 5px;
                }
            }

        }
    }
</style>