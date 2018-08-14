
<!doctype html>
<html lang="zh-cmn-Hans" translate="no">
    <head>
        <meta charset="UTF-8" />
        <title>闪店云-餐饮管理</title>
        <script>
            var httpDomain = {
                host:<?php echo $api ?>,
                cdn:"<?php echo $cdn ?>"
            }
        </script>
    </head>
    <body >
        <div id="app">
            <router-view></router-view>
        </div>
    </body>

</html>