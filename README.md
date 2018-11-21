# web-shop 闪店商家后台管理系统
=======================================================

闪店商家后台管理系统是闪电联科技配合pos前端的后台配置系统。

### Resources

* [闪店商家内网](http://v5.ishandian.com.cn/#/)
* [闪店商家QA](http://v5.ishandian.com.cn/#/)
* [闪店商家预生产](https://v5pre.ishandian.net/#/)
* [闪店商家线上](https://b.shandian.net/#/)
* [api文档](http://api.shandian.tech/dashboard/#!/)

## 技术栈

* vue 2+
* vuex
* vue-router
* webpack 4+
* es6
* less
* [sd-element](http://gitlab.shandian.tech/zhouzhe/sd-element)

## 部署

### 环境要求
* Node.js 8+
* npm 5+

### 开发模式

#### 安装Node和git以及svn

1. 请自行查找安装方法
2. 在自己的电脑中生成ssh密钥，在gitlab设置中将公钥添加进去
3. 克隆库
```sh
	git clone git@gitlab.shandian.tech:tom/web-shop.git project_dir
```



#### 拉取所需要的npm包

注意，由于项目的一些个性化功能，本项目所使用的npm包经过一些二次调整，所以不能使用 npm install 直接拉取，而是需要使用公司内部的npm库

> svn 地址: svn://192.168.31.221/WEB/share/node_modules

使用SVN从服务器拉取 npm 库后，可以直接拷贝到你的 project_dir，或者创建一个链接
```cmd
mklink /j D:xxx/xxx/project_dir/node_modules D:yyy/svn_node_modules
```

#### 启动

一起准备都已经做好，现在你可以启动你的开发环境了
```bash
npm start
```
你可能需要稍微等待一段时间后，就能在 localhost:5000 查看你启动的应用

### 构建

和大多数 npm 应用一样，我们都构建命令也与主流应用一致

```bash
npm build
```
需要注意的是，这条命令是为了在服务端运行打包，他会把你src里面的源代码删除掉，如果你没有commit可能导致不理想的结果,如果你不希望如此，你可以使用我们提供的开发环境构建命令用以测试你的code能否成功打包:

```bash
npm buildDev
```

## 代码规范

> 代码使用eslint推荐规范，并且单独定制了一些我们自己风格

+ indent 缩进必须使用制表符Tab
+ quotes js字符串必须使用单引号
+ semi	行尾必须加分号
+ no-var 不能使用var定义变量
+ no-empty-function 不能有空函数
+ max-params 函数最多 4 个参数，如果需要更多，请使用对象的形式传参数

## 接口 mock

> @周哲

## 路由管理（开发环境按需打包）

这是一个大项目，我们拥有非常多的模块，而我们开发时往往只需要关注几个模块而已，为此在开发环境我们提供了按需打包，也就是项目启动后，webpack 只打包你配置的几个路由对应的模块

### 配置自己需要的路由

1. 在 src/config/routes/route_id_config.js 中找到你需要打包模块的对应的 id
2. 在当前文件中 找到如下代码
```js
let config = {
	useId: ["0419"], //需要用到的路由id
	configs: {} //需要插入的路由模块
};
```
3. 在useId 中将你需要打包模块的路由对应的id添加进去

## Author

* 版权: 闪店联信息科技有限公司
* 作者: 闪店研发部

