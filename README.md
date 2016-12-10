                                                    我的第一个放到heroku上的nodejs
                                            
  总所周知，github是只能部署并且展示静态的页面，想nodejs这些项目就跑不了。一开始我还考虑着买一个阿里云服务器，网上对阿里云服务器的好评很多，
虽然价格便宜，性价比高，但是我肯定能不花钱就不花钱啊，后来发现国内有个叫coding的网站，跟github类似，就是可以可以跑nodejs，但是遗憾地发现它
以为更新升级的原因，已经在今年10月停止展示项目效果的功能了，所以我找到了美国cloud platform ———heroku。
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
  最后，我这次也是把我一个web作业弄到github和heroku上来的，作业要求用MongoDB，然而我现在都还是无法连接到MongoDB服务器，无奈之下只能用data.txt
文件进行读写操作。
