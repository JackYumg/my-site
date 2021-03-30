---
nav:
    title: '后端'
    path: /back-end
group:
    path: /back-end/index
    title: '后端'
---

# Sails

![这里写图片描述](http://sailsjs.com/images/hero_squid.png)
## 项目构建
安装Node就不多说了.
## 1.sails安装与项目新建运行

```
npm install sails -g//全局安装

sails new project-name//新建项目

cd project-name //进入刚才新建项目的目录

sails lift //运行项目，运行原理也是直接在项目目录路径下使用node app.js
npm install sails-mysql --save //--save 把安装的模块写进package.json
```
到了这一步，环境算是搭建完成。
## 2.目录结构介绍


![这里写图片描述](http://img.blog.csdn.net/20170827195403601?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcGVyc29uRmVhdA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

#### 2.1api
在api目录下，有着controller、hooks、models、policies、responses和services几个目录

 1. controller目录下存放的就是页面与后台服务器通讯的接口，如果对应的java，那么就是java里面的Action层或者使用Spring
    MVC ，那么也是对应的Controller，里面存放的就是接口。
 2. models,数据模型层，也就是实体层，对应java里面的entity。
 3. policies(策略),在controller之前执行，主要工作是session认证，如果session是认证通过了，那么就可以进入下一个策略或者如果是最后一个策略，那么就可以进入controller了，个人感觉像是java里的过滤器或者分发器。
 4. responses,自定义的响应。举个例子，一般从前台发出一个请求后，如果经过了服务器，那么都会给客户端返回一个结果，除了本身自带的响应方式，也可以采用自定义的响应，比如返回一个404页面，返回500页面或者返回字符串等等。
 5. services,业务逻辑处理层，采用es6的Module的语法编写。
#### 2.2assets静态资源层
在这层目录里面有，js，image，styles,templates，这个目录里面主要放的就是静态资源，没什么说的。
#### 2.3config配置层
这层里面有env和locales两层，然后和一些js。

env中有一个development.js里面的注释是如下：

```
开发环境配置，这个文件夹里面包含了开发团队共享的一些配置，比如api的名称，数据库的密码，如果你在你的Sails应用中使用了版本控制器，这个文件也会提交到你的资源仓库里面，除非你在gitignore中添加了一个信息，表明这个文件是私有的或不公开的。
```

env中的production.js里的注释如下：
项目环境配置，与development类似，但是从注释中看到要多一些东西，比如配置端口的和日志的

#### 2.4task任务层
这层里面主要放置的是grunt的任务，
#### 2.5views层
这一层主要放置的是作为展示的前台页面，一种情况是使用node做单纯的后台服务器，不处理前台业务，而另外一种情况是采用模块化的思想，对结构进行分层，达到MVC的合理实现，本来Sails就是一个MVC框架所以第一种情况还是不太会出现。
###3开始搭建项目
整体流程：新建数据库 -> 新建表 -> 建实体 -> 在sails中搭建环境 -> 编码 -> 得到结果

## 3. orm

#### 3.1新建数据库和表
建好mysql数据库，然后新建表，新建表有两种新建方式，一种是自动建表，另外一种是手动建表。手动建表我就不多说了。
#### 3.2链接数据库
设计的主要文件是config里面的connections.js，里面存放的是链接数据库的配置，这里的配置不光只能配置这么一个链接，可以多个不同或相同数据库，代码如下:
```	
mySqlServer: {
      adapter: 'sails-mysql',
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'root',
      database: 'myproject',
      charset:'utf8'
    }
```
然后下一个重要文件就是models.js里面的文件，里面存放的是数据库使用的那个链接，以上面的名字作为键值，代码如下：

```
connection: 'mySqlServer',
  migrate: 'alter'
```
connection ：表示我是用的就是mySqlServer这个链接
migrate：alter修改，这意味这对这个数据在运行项目时时会根据你实体的设计修改数据中的表结构的。而safe就是要手动建表，那么这个时候你得把实体与数据库对应起来之不过有点麻烦，对于初学者来说还是把实体与数据库手动对应起来吗，因为之后还会有复杂的表间关系，比如说一对一、一对多、多对多等。
#### 3.3建立数据模型
回到api层理的models里面，在里面新建好js文件,值得注意的是文件名称，这个名称直接关系到你之后的查询，删除等操作，我新建的operator的代码如下：
```
module.exports = {
  attributes:{
    username:{
      type:'string',
      required:true
    },
    password:{
      type:'string',
      required:true
    }
  }
}
```
除了这两个字段，sails会自动给你在表里面新建三个字段，id,createdAt,updatedAt,新建好数据的表结构如下图所示：
![这里写图片描述](http://i.imgur.com/7D14XIQ.png)
#### 3.4测试数据链接
执行代码在项目路径下进入CMD命令窗口
node app.js或者sails lift，执行完之后如果没有报错且新建好数据库那么就没什么问题了。
那么在这个阶段容易碰到的问题有那些呢：

```
     Consistency violation: A model (`operator`) references a datastore which cannot be found (`otherSql`). 
```

这句话的意思是，operator这个数据模型在otherSql这个链接中找不到。所以遇到这个情况就检查是不是链接配的有问题或者Mysql的服务已关闭。
##### 3.5controller的配置
controller配置里面的是交互的接口,代码如下：

```
module.exports = {
  findOne:function (req,res) {
    var id = req.param('id');
    if(id){
      console.log(id);
      operator.find(id, function operatorFound(err, entity) {
        res.send(entity,200);
      });
    }else{
      console.log("是啊比");
      res.send("失败",500);
    }
  }
};
```

一个简单的查询就这么完成了，写完成之后就是验证编写的正确性了。在浏览器输入url:

```
http://localhost:1337/user/findOne?id=1
```

查出来的结果如图所示：
![](http://i.imgur.com/1h92KQK.png)
这条数据手动添加的，这样一个很简单的demo算完成了。

## 4补充

如果想要修改项目访问端口，可在local.js里面添加：port:端口号，项目访问默认路径是user，想要修改的话，可以在route里面修改进行访问。
代码如下：

```
'/findOne':{
    controller:'UserController',
    action:'findOne'
  }
```
起哄controller对应的就是controller的文件名（不添加后缀）,action:对应的就是里面的方法名。

[sails官网](http://sailsjs.com/)

[grunt官网](https://gruntjs.com/)

[es6-阮一峰-模块](http://es6.ruanyifeng.com/#docs/module)