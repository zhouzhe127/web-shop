/*
 * @Author: weifu.zeng 
 * @Date: 2018-11-02 16:33:33 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-02 16:59:39
 * @file:选择集合下拉框
 */
<template>
    <el-popover placement="bottom" width="570" trigger="click">

        <el-table 
            :data="temp"  
            stripe 
            border 
            :header-cell-style="{'background-color':'#F5F7FA'}"
            width="518px"
        >
            <el-table-column  min-width="200px"  label="集合名称" prop="name">
            </el-table-column>

            <el-table-column  min-width="100px"  label="物料数量" prop="createUser">
            </el-table-column>

            <el-table-column  min-width="100px"  label="单位" prop="createTime">
            </el-table-column>

        </el-table>

        <div class="add-matrial" slot="reference">
            <span>选择集合</span>
            <i class="el-icon-caret-bottom plus"></i>
        </div>
    </el-popover>
</template>
<style lang='less' scoped>
    @bc:#EAEEF5;
    .wh(@w:140px,@h:40px){
        width:@w;
        height:@h;
    }
    .add-matrial{
        .wh;
        border:1px solid @bc;
        border-radius: 5px;

        display: inline-flex;
        justify-content: space-between;
        align-items: center;
        padding:10px;
        cursor: pointer;
        .plus{
            font-size:20px;
            color:#909399;
        }
    }
</style>
<script>
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
import global from 'src/manager/global';
import http from 'src/manager/http';
import Timer from 'src/verdor/timer';
export default {
    data () {
        return {
            temp:[
                {},
                {},
                {},
                {},
            ],
        };
    },
    methods: {
       
    },
    mounted(){},
};
</script>