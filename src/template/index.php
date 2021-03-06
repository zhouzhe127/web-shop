<!DOCTYPE html>
<html lang="zh">

<head>
  <meta charset="utf-8">
  <meta n="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,minimal-ui">
  <!-- viewport 后面加上 minimal-ui 在safri 体现效果 -->
  <meta n="apple-mobile-web-app-capable" content="yes">
  <!-- 隐藏状态栏/设置状态栏颜色 -->
  <meta n="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <!-- uc强制竖屏 -->
  <meta n="screen-orientation" content="portrait">
  <!-- QQ强制竖屏 -->
  <meta n="x5-orientation" content="portrait">
  <title>
    <%= htmlWebpackPlugin.options.title %>
  </title>
</head>

<body>



  <!-- loading end -->
  <div id="app">
    <router-view></router-view>
  </div>

  <!-- <script>
      var httpDomain = {host:""};

      
      var n = (load[0].split("/").slice(-1) + "").split(".");
      var version  = n[1] + "";
      var key =  n[0] + "";
      var script = document.createElement("script");
      var i = 0;
      var fristPath = load[i++];

       if (window.localStorage) {
         var content = null;
         if (window.localStorage.getItem(key + "_version") == version && window.localStorage.getItem(key)) {
           //命中缓存
           content = window.localStorage.getItem(key);
           script.innerText = content;
           document.head.appendChild(script);
           createScript();
         } else {
           //获取js代码
           var xhr = new XMLHttpRequest();
           xhr.onreadystatechange = function(){
             if (xhr.readyState == 4&& xhr.status === 200 || xhr.status === 304) {

              script.innerText = xhr.responseText;
               document.head.appendChild(script);
               createScript();
               //以当前vendor的src链接作为key用于版本控制
               window.localStorage.setItem(key+"_version", version);
               //存储实际代码
               window.localStorage.setItem(key, xhr.responseText);
             }
             //should handle 500
           }
           xhr.open('GET', fristPath, true);
           xhr.send(null);
         }
       } else {
         //不支持localstorage时的回退方案，直接将script标签添加到head
         script.src = fristPath;
         document.head.appendChild(script);
         createScript();
       }
       
       function createScript(){
          var script = document.createElement("script");
          while(i<load.length){
            script.src = load[i++];
            document.body.appendChild(script);
          }
       }
   </script> -->

</body>

</html>