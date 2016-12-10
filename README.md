  我的第一个放到heroku上的nodejs
                                            
  总所周知，github是只能部署并且展示静态的页面，想nodejs这些项目就跑不了。一开始我还考虑着买一个阿里云服务器，网上对阿里云服务器的好评很多，
虽然价格便宜，性价比高，但是我肯定能不花钱就不花钱啊，后来发现国内有个叫coding的网站，跟github类似，就是可以可以跑nodejs，但是遗憾地发现它
因为更新升级的原因，已经在今年10月停止展示项目效果的功能了，要到明年一月才从新开放这个功能。所以我找到了美国cloud platform ———heroku。

  在heroku上部署nodejs完整官网教程链接：https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up 虽然是全英文，但是
看着命令行还是很容易看懂的。但是有一点要说的就是。

  heroku有三种部署代码的方式：
    1，通过heroku Git(要安装heroku CL) 
    2，通过把代码放到自己的github上后，connect到自己heroku上的app上（heroku上的nodejs项目都叫app）
    3，通过Dropbox，这个我不懂，也没了解过。
  
  上面的官网教程就是讲怎么通过heroku Git上传本地文件的，你可能会觉得我说怎么上传本地文件到heroku上有点多余，但是你进到heroku上就会发现事实不
是这样的了，在heroku上根本看不到你的文件或者代码。上传要不你就老老实实按照官网教程那样上传，要不就像我那样先按照官网教程那里的prepare app

  通过git clone https://github.com/heroku/node-js-getting-started.git 先克隆一个nodejs整个模板下来，但是要注意，这个模板是按照ejs模板
的，这个模板我没有了解过，但是它只有一个特点就是把html文件分割成head和body两个ejs文件。所以你下载这个nodejs模板之后，就按照这样把你的html文
件分割就行了。我接着把修改好的项目通过uploadfile的方式post到github上。然后，在heroku上创建一个新的app,点开deploy（部署），选择github connect，
然后选择自己已经放到github上的项目。最后点击deploy branch，部署完毕之后可以点击下面的view或者上面的open app都可以看到你app跑起来的效果。
  
  
  上面都是怎么部署的问题，下面讲一个特殊的情况：
    var bodyParser = require('body-parser');

  body-parser是nmp里面一个常用的模块，但是你会发现当你的app里面的server.js里面有这个语句的时候，heroku会显示application error，heroku虽然
支持nodejs，但是貌似并不支持body-parser。我的解决方法就是先在我项目的本地目录上打开命令行，输入npm install --save --save-exact cool-ascii-faces，
这样就会生成整个npm-modules文件夹，但是打开这个文件夹，你回发现并没有body-parser这个东西，接着回到刚刚的主目录，输入npm install body-parser。
安装完之后打开node-modules就会发现里面多了个body-parser的文件夹，把里面除了body-parser的文件夹都删除。然后在uploadfile到github的时候一起把
只包含body-parser的node-modules的文件夹跟你的app一起upload上去。这样connect之后，heroku就不会再报错。

  之前我不会用mongodb，但是现在我学会了，而且在这个项目中我使用了mLab上的mongodb数据库https://mlab.com/这是它的官网，至于怎么获得一个mongodb
数据库，我是看一下教程的，很简单。http://huangbingbing.com/2015/05/13/nodejs%E5%92%8Cmongodb%E9%A1%B9%E7%9B%AE%E5%9C%A8%E7%BA%BF%E9%83%A8%E7%BD%B2/
但是在加上了mongodb之后，你会发现你的heroku伤的app无法访问数据库。这时候，我明白是因为heroku应该没有提供mogodb等模块。像上面解决body-parser
模块的问题一样，在项目的本地目录下打开命令行输入npm install mongodb,接着你就会在node-modules文件夹里面发现增加了两个文件夹mongodb和mongodb-core 跟
上面一样，把这两个文件夹upload到github上相应的目录，然后在heroku上再同上deplo一次，打开就会发现可以使用你的数据库了。打开你的mlab账号，会发现页面上 
的注册信息都会post在上面的。
  最后的最后，附上我这次在heroku上的项目链接：https://signin1997.herokuapp.com/ ，有点可惜的是heroku是美国云平台，美国服务器，可能会点卡，而
且微信会影响服务器响应。最好用浏览器打开，谷歌更佳。
