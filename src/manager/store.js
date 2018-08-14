import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);
//创建Store实例
let globalStore = {
  // 存储状态值
  state: {
    currentPage: true, //判断是否显示返回店铺选项
    headerTil: [], //面包屑
    win: {
      show: false,
      title: "提示信息",
      content: "",
      winType: "",
      timerPowerOff: false, //  添加弹框延迟自动关闭   eg: timerPowerOff: 400  400ms 自动关闭
      callback: function() {}
    },
    //页面右上角按钮公用状态
    pageTools: {},
    runHeard: "",
    logoName: "",
    usableWidth:'',//内容区域可用宽
    asideWidth:'',//侧边栏宽度
    asideDel:[],//侧边栏需要隐藏的模块
    contentDislpay:"",//控制内容区域刷新
    dubgDisplay:false,//dubg的框是否显示
    dubgCont:"",//dubg的框的内容
  },
  // 状态值的改变方法,操作状态值
  // 提交mutations是更改Vuex状态的唯一方法
  mutations: {
    setCurrentPage(state, n) {
      state.currentPage = n;
    },
    setHeaderTil(state, obj) {
      state.headerTil[obj.type].call(state.headerTil, ...obj.params);
    },
    setWin(state, obj) {
      state.win = obj;
      if (state.win.content) state.win.show = true;
    },
    setWinContent(state, str) {
      state.win.content = str;
    },
    setPageTools(state, obj) {
      state.pageTools = obj;
    },
    setRunheard(state, data) {
      state.runHeard = data;
    },
    setlogoName(state, data) {
      state.logoName = data;
    },
    setusableWidth(state, str) {
        state.usableWidth = str;
    },
    setasideWidth(state, str) {
        state.asideWidth = str;
    },
    setContentDisplay(state, str){
        state.contentDislpay = str;
    },
    setDebugDis(state, str){
       state.dubgDisplay = str;
    },
    setDebugCont(state, str){
       state.dubgCont = str;
    },
    setasideDel(state, str){
      state.asideDel = str;
    }

  },
  // 在store中定义getters（可以认为是store的计算属性）。Getters接收state作为其第一个函数
  getters: {},
  actions: {
    debugCont(context,str) {
        // context 是一个对象
        setTimeout(()=>{
          context.commit('setDebugCont', str);
        },100)
        
    }
  }
};

export default globalStore;

export let store = new Vuex.Store(globalStore);
