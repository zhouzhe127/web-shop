/**
 * @file
 * 实体卡的 websocket 操作
 * @author chu.zilong
 * @class entityCard.WS
 */

/**
 * web 端读卡器
 * 需要启动websocket服务器程序
 */
/* eslint-disable */
import http from 'src/manager/http';
let subShopId = '';
class WS {
    constructor(type, subShopId, callback, failback) {
        // 开卡
        subShopId = subShopId; //eslint-disable-line
        if (type == 'openCard') {
            this.openCard = true;
            this.nextStep = function() {
                callback && callback(this.oid, this.token);
                //cardMachine.disconnect();
            };
            // 读卡
        } else if (type == 'readcard') {
            this.openCard = false;
            this.nextStep = function() {
                callback && callback(this.oid, this.token);
            };
        }
        this.url = 'ws://localhost:9002';
        this.ws = null;
        //卡操作完成后下一步方法回调
        this.errorHandle = failback;
        this.openable = false;
    }
    start() { //读卡进来第一步
        // 启动websocket
        if (!this.ws || this.ws.readyState == 3) {
            this.connect();
        } else {
            this.init();
        }
    }
    init() {
        this.nfc = 0;
        this.errorCard = false;
        this.send('deskey:SDMEMBER'); //SDMEMBER     12345678
        if (this.openCard) {
            this.send('opencard');
        } else {
            this.send('readcard');
        }
    }
    //向后台获取oid和token，需要修改成ajax请求
    async getOidAndToken() {
        let _this = this;
        // 获取卡编号
        let res = await http.entitycardOpenCard({
            data: {
                memberCardId: '',
                cardKey: '',
                subShopId: subShopId
            }
        });
        if (/^\d{1,10}$/.test(res.memberCardId) && /^[A-Za-z0-9]{13}$/.test(res.cardKey)) {
            _this.send('data:' + res.memberCardId + ':' + res.cardKey);
        }
    }
    //通知后台开卡验证oid和token
    async checkOidAndToken(oid, token) {
        let _this = this;
        if (this.openable === true) { // 新卡
            this.openable = false;
            this.cardInfoInput(oid, token);
        } else { // 老卡
            let res = await http.entitycardOpenCard({
                data: {
                    memberCardId: oid,
                    cardKey: token,
                    subShopId: subShopId
                }
            });
            if (res + '' == 'true') {
                _this.cardInfoInput(oid, token);
            }
        }

    }
    // 验证通过后，通知后台 录入此卡信息 
    async cardInfoInput(oid, token) {
        let _this = this;
        let res = await http.openCardInfoInput({
            data: {
                memberCardId: oid,
                cardKey: token,
            }
        });
        if (res + '' == 'true') {
            //后台验证成功初始化卡片修改密码
            _this.send('initcard');
            _this.oid = oid;
            _this.token = token;
            // if (_this.nextStep) _this.nextStep();
        }
        //后台验证成功初始化卡片
    }
    // 读卡验证该卡是否可以使用
    getCardAccountMsg(oid, token) {
        this.oid = oid;
        this.token = token;
        // 验证该卡是否可用，由于读卡的目的不同，要验证请直接在callback成功回调中自行验证
        // sdServer.openCard(this.oid, this.token,'', function (json) {
        //     if (json){
        //         if (this.nextStep) this.nextStep();
        //     }else{
        //         failback && failback('dataError');
        //     }
        // }, function (err) {
        //     failback && failback(err);
        // })
        if (this.nextStep) this.nextStep();
    }
    // 首先通过卡编码 从后台获取秘钥
    async getCardKey() { 
        let that = this;
        let res = await http.getCardPassword({
            data: {
                nfcNumber: this.nfc
            }
        });
        if (res) {
            that.send('key:' + res);
        }
    }
    messageHandle(str) { //第三步
        let data = str.split(':');
        switch (data[0]) {
            case 'openable':
                this.openable = true;
                this.getOidAndToken();//然后验证信息 判断改卡是否已经制过卡
                break;
            case 'data':
                if (this.openCard) {
                    this.checkOidAndToken(data[1], data[2]);
                } else {
                    this.getCardAccountMsg(data[1], data[2]);
                }
                break;
            case 'opended':
                if (this.nextStep) this.nextStep();
                break;
            case 'card':
                this.nfc = data[1];
                this.getCardKey(); //首先获取秘钥
                break;
            case 'error':
                if (this.errorHandle) {
                    let msg = '读取卡片信息失败,请确定该卡可用';
                    if (!this.openCard) {
                        msg = '读取卡片信息失败,请确定该卡可使用并已激活';
                    }
                    this.errorHandle({
                        message: msg
                    });
                }
                break;
        }
    }
    // websocket链接
    connect() { //第二步
        if ('WebSocket' in window) {
            this.ws = new WebSocket(this.url);
        } else if ('MozWebSocket' in window) {//eslint-disable-line
            this.ws = new MozWebSocket(this.url);//eslint-disable-line
        } else {
            return;
        }
        let self = this;
        this.ws.onopen = function(e) {
            self.init();
            console.log('开启');
        };
        this.ws.onerror = function(e) {
            console.log(e);
            console.log('报错');
        };
        this.ws.onclose = function(e) { //eslint-disable-line
            // console.log(e);
            console.log('读卡连接已经关闭');
        };
        this.ws.onmessage = function(e) {
            // console.log(e.data);
            self.messageHandle(e.data);
            console.log('已连接');
        };
    }
    send(str) {
        if (this.ws) {
            this.ws.send(str);
        }
    }
    disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
            this.oid = 0;
            this.token = 0;
        }
    }

}
export default WS;
/* eslint-enable*/