1. 先把sendmsg.js 修改3个地方 为对应频道拼音（名称如下）：

人才:rc
建材:jc
论坛:bbs
主站:zz
房产:fc
惠刷:hs
团购:tg
汽车:qc
黄页:hy


2.把js目录拷贝到网站根目录下，并引用（如果已经引用过jquery就不需要在引用了）
*注意相对路径
<script src="js/socket.io.js"></script>
<script src="js/jquery-1.10.2.js"></script>
<script src="js/adalert.js"></script>
<script src="js/sendmsg.js"></script>