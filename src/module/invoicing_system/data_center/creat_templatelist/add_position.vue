/*
* @Author: zhouzhe
* @Date: 2018-10-31 16:43:27
*/
<template>
    <div>
        <el-dialog title="查看权限职位选择" :visible.sync="dialogVisible" center width="40%" :before-close="handleClose">
            <div class="content">
                <el-checkbox-group v-model="sleArr">
                    <el-checkbox v-for="(item,i) in roleList" :class="{'setStyle':i==0}" :key="i" :label="item" style="margin-top:10px" border>{{item.name}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="sendClose">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
	import http from 'src/manager/http';
    export default {
        data() {
            return {
                dialogVisible: false,
                sleArr: []
            };
        },
        props: ['showWin','roleList','sleRoleArr'],
        methods: {
            sendClose() {
                console.log(this.sleArr);
                this.$emit('positionEvent', this.sleArr);
            },
            handleClose(){
                this.$emit('positionEvent', false);
            }
        },
        mounted() {
            this.dialogVisible = this.showWin;
            this.sleArr = this.sleRoleArr;
        },
        components: {},
        computed: {},
    }
</script>
<style lang='less' scoped>
    .content {
        height: 300px;
        overflow: auto;
        border-top: 2px #f5f7fa solid;
    }

    .setStyle {
        margin-left: 10px;
    }
</style>