<template>
    <div class="selectbtns">
        <div v-for="(item,i) in pList" :key="i" class="fl" style="width:20%;height:100px">
            <span :class="{sign:isSelected(i,item) }" v-on:click="clickHandle(i,item)" :title="item.name">{{getValue(item)}}</span>
            <div class="addAndSubtract" v-if="isSelected(i,item) && isShowaddAndSubtract">
                <div class="couponSub" v-on:click="addAndSubtract(i,item)"></div>
                <div class="couponNum" style="width:50%">{{item.num}}</div>
                <div class="couponAdd" v-on:click="addAndSubtract(i,item,true)"></div>
            </div>
        </div>
    </div>
</template>
<script>
import utils from 'src/verdor/utils';
export default {
    props: {
        'list': Array,
        'selects': [Array, Object],
        'name': String,
        'keyName': String,
        'isradio': Boolean,
        'maxNum': [String, Number],
        'isShowaddAndSubtract': {//是否显示加减的状态
            type: Boolean,
            default: true
        }
    },
    data: function() {
        return {
            pList: [],
            selectList: []
        };
    },
    watch: {
        'selects': function() {
            this.up();
        },
        'list': function() {
            this.up();
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
            console.log(item)
            if (this.selectList) {
                var id = i;
                if (this.keyName) {
                    id = item[this.keyName];

                }
                var find = false;
                for (var i = 0; i < this.selectList.length; i++) {
                    if (this.selectList[i].id + '' == id + '') {
                        find = true;
                        break;
                    }
                }
                if (find) {
                    for (var i = 0; i < this.selectList.length; i++) {
                        if (this.selectList[i].id == item.id) {
                            console.log('111')
                            this.selectList.splice(i, 1);
                            break;
                        }
                    }
                } else {
                    this.selectList.push({
                        id: id,
                        name: item.name,
                        num: item.num,
                        type: item.type
                    });
                }
            }
            this.$emit('select', { list: this.pList, selectList: this.selectList });

        },
        isSelected: function(i, item) {

            if (this.selectList) {
                var id = i;

                if (this.keyName) {
                    id = item[this.keyName];
                }
                for (var i = 0; i < this.selectList.length; i++) {
                    if (this.selectList[i].id + '' == id + '') {
                        return true;
                    }
                }
            }
            return false;
        },
        addAndSubtract: function(i, item, type) {
            // 加减
            if (type) {
                if (item.num < this.maxNum) {
                    item.num++;
                }
            } else {
                if (item.num != 1) {
                    item.num--;
                }
            }

            for (var j = 0; j < this.selectList.length; j++) {
                if (item.id == this.selectList[j].id) {
                    this.selectList[j].num = item.num;
                    this.selectList.splice(j, 1, this.selectList[j]);
                    break;
                }
            }
            this.pList.splice(i, 1, utils.deepCopy(item));

            this.$emit('select', { list: this.pList, selectList: this.selectList });
        },
        up() {

            this.pList = utils.deepCopy(this.list);
            this.selectList = utils.deepCopy(this.selects);

            for (var i = 0; i < this.pList.length; i++) {
                for (var j = 0; j < this.selectList.length; j++) {
                    if (this.pList[i].id == this.selectList[j].id) {
                        this.pList[i].num = this.selectList[j].num;
                    }
                }
            }

        },
    },
    mounted: function() {

        this.up();

    }
}
</script>
<style scoped>
.addAndSubtract {
    width: 85%;
    height: 40px;
    margin-top: 5px
}

.addAndSubtract .couponSub,
.addAndSubtract .couponAdd,
.addAndSubtract .couponNum {
    height: 40px;
    line-height: 40px;
    width: 25%;
    text-align: center;
    cursor: pointer;
    float: left
}

.addAndSubtract .couponSub {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0EyM0NFRjNBQkVFMTFFNzgwMEE4ODJDMEQwMjEzNjAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0EyM0NFRjRBQkVFMTFFNzgwMEE4ODJDMEQwMjEzNjAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDQTIzQ0VGMUFCRUUxMUU3ODAwQTg4MkMwRDAyMTM2MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDQTIzQ0VGMkFCRUUxMUU3ODAwQTg4MkMwRDAyMTM2MCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvPLGSwAAAHKSURBVHjazJi/TsJQFMZLZUUHDavCqoODowRHhb6Aujiy6GQYjNEIcWF14gHkBajoKPUBXHBEcVJGhVGM3zFfkxqxtLX09kt+SZPee86Xe3P/nJtoNpuaD6VBAeTBClgCs/z3DnqgA9rgBrx6DZz02C4HymDTpc8CWQN7YASuQQ3cTUqgT/ifBSawgOHDuGiGfSzGyAY1sg3uQVH7v4qMtePXyAloOOY/DEmsS8b2ZOQInGnTk8Q+nmREpuNcm76qzDXWSAbUtehUZ85fRi5AKkIjKeb8YWQ9pNURZDXlnEbKmjod2kZk295SaESOjLTOj6RCI5K7oPMAU60Nnaeoai3rPMpVK5N02zsMwwgtk2marnuKjEgiBiPyvXwHMfAxkKl5AvMBhjNM9WREHmIwIh0xchsDI22dF9wPhSYkd0uM9Hn1VyXJ3bdP35pCIzXnNUDqjisFJlp2zeO8oR1EvKdIrv1xV8VHUIrQSIk5x97iG3/VHSHrlLlc65oqG07TRMVrpScNd8EwRANDxqz4rX1l6FZDWk0txmoEfQ3osqLPs6If+Uj+yT55lg3dMN5HLJJmUPuhZhHMsc0beOZDjcWj48Wr6y8BBgAnxlXYuW2CbgAAAABJRU5ErkJggg==) center center no-repeat;
    background-size: 28px 28px
}

.addAndSubtract .couponAdd {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0EyM0NFRUZBQkVFMTFFNzgwMEE4ODJDMEQwMjEzNjAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0EyM0NFRjBBQkVFMTFFNzgwMEE4ODJDMEQwMjEzNjAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDQTIzQ0VFREFCRUUxMUU3ODAwQTg4MkMwRDAyMTM2MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDQTIzQ0VFRUFCRUUxMUU3ODAwQTg4MkMwRDAyMTM2MCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnjSORsAAAHcSURBVHjazJi/TsJQFMZLZUUHDaviqoODowRHhb6Aujiy6GQYjNEIcWF14gHkBajoKPUBXHBEcVJGhVGM3zFfTRMr/UPh9kt+SZPenvPlNvfce26i0WhoAZQGeZADq2AJzPLdB+iCNmiBW/DmN3DS57gsKIGtEd8skHWwD4bgBlTBvVcC3eP9MjCBBYwAxkUz/MZijOWwRnbAAyho46vAWLtBjZyCuuP/RyGJdcXYvowcg3NtcpLYJ15G5HdcaJNXhblcjWRATZueasz5Z/leglSQSIZh/D6bphnUSIo5DeeMbES0OsKspqzTSElTpyPbiJTtbYVGZMtI63xIKjQiufM6NzDV2tS5i6rWis6tXLUyyVG1w1kngtQUN3nUmZTMSCIGM/KzfPsx8NGXX/MM5kNM57gl3qmuzMhjDGakLUbuYmCkpfOA+6nQhORuipEej/6qJLl79u5bVWik6jwGSN9xrcBE0+55nEfFwynXFMl14HZUfAJFHvl9aczaUWRO11N8/b++I2KdMdfIvqbCgZM0Ufbb6cnAPTCI0MCAMctBe1+ZurWIVlOTsephbwM67Dty7OiHAZJ/8Zsc24ZOFPcjFkkzqH1RswjmOOYdvPCixuLW8erX9bcAAwCKfV/NzQBCEAAAAABJRU5ErkJggg==) center center no-repeat;
    background-size: 28px 28px
}

.selectbtns span {
    width: 90%;
    height: 45px;
    margin-right: 30px;
    margin-top: 10px;
    line-height: 45px;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.selectbtns span:before {
    content: "";
    width: 0;
    height: 0;
    border: 8px solid #fff;
    border-radius: 8px;
    position: absolute;
    bottom: 15px;
    left: -10px;
}

.selectbtns span:after {
    content: "";
    width: 0;
    height: 0;
    border: 8px solid #fff;
    border-radius: 8px;
    position: absolute;
    bottom: 15px;
    right: -10px;
}

.countList span {
    width: 90%;
    height: 45px;
    margin-right: 30px;
    margin-top: 10px;
    line-height: 45px;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.selectbtns span {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    padding-left: 18px;
    padding-right: 18px;
    background-color: #F1F1F1;
    cursor: pointer;
    margin: 1px;
}
</style>