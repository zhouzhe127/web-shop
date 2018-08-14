/**
 * 单选按钮组组件
 * list {Array} 需要展示的按钮列表数据
 * index {Array} 被选中的索引
 * name {String} 如果list数据是Object集合，则name则是Object的键名，该键值就是按钮的名称；如果list就是按钮名称集合，则name不要设置。
 */
 <template>
	<div class="selectbtns activ">
    	<span v-for="(item,i) in list" :key="i"  v-bind:class="{sign:isSelected(i) }" :style = 'styleObj' v-on:click="clickHandle(i)">{{getValue(item)}}</span>
    </div>
</template>
<script type="text/javascript">
	export default{
		props: {
            'list': Array,
            'index': [Number,String],
			'name': String,
			styleObj:Object
        },
        watch:{
			index:function(){
				// console.log(this.index)
				// this.$emit('selOn',this.onIndex);
			},
			index(){
				this.onIndex = this.index;
			}
		},
        data(){
        	return{
        		onIndex:-2	//选中的按钮索引
        	}
        },
        methods: {
            getValue: function(item) {
                if(this.name) {
                    return item[this.name];
                } else {
                    return item;
                }
            },
            clickHandle: function(i) {
                this.onIndex = i;
				this.$emit('selOn',this.onIndex);
            },
            isSelected: function(i) {
                if(i == this.onIndex) return true;
                return false;
			},
			upateIndex(i){
				this.onIndex = i;
			}
        },
		beforeUpdate(){
			this.onIndex = this.index;
		},
        mounted(){
			this.onIndex = this.index;
        }
	}
</script>

<style lang="less" scoped >
	.selectbtns {
		width: 100%;
		height: auto;
		overflow: hidden;
	}
	
	.activ {
		display: inline;
	}


	.selectbtns span {
		display: inline-block;
		height: 40px;
		line-height: 40px;
		padding-left: 18px;
		padding-right: 18px;
		background-color: #FFFFFF;
		text-align: center;
		cursor: pointer;
		margin: 1px;
		border-radius: 2px;
		max-width: 350px;
		word-wrap:break-word;
		white-space:nowrap;
		overflow:hidden; 
		text-overflow:ellipsis;
        border: 1px solid #D2D2D2;
	}
	
	.selectbtns span:hover {
		background-color: #eeeeee;
	}
	
	.selectbtns .sign {
		// background: url("../res/images/sign.png") right bottom no-repeat; 
		background: #FFEDD3;
        border-color: #FF9200;
        color: #FF9200;
  	}
</style>