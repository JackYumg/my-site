---
nav:
  title: '前端'
  path: /front-end
group:
  path: /back-end/frameworks/sourceCode
  title: '源码'
---

# 基础源码实现

## Call 的实现

### 描述

参数：第一个参数通常是 ， 第二个参数是参数

### 代码

    Function.prototype.myCall(context){
        let _self  = this;
        let params = Array.from(arguments).slice(1, arguments.length);
        context.fn = _self;
        context.fn(...params);
        delete context.fn;
    }

## Apply 的实现

### 代码

    Function.prototype.myApply(context){
        let _self = this;
        let params = Array.from(arguments).slice(1, 2);
        context.fn = _self;
        context.fn(...params);
        delete context.fn;
    }

### Bind 的实现

### 代码

    Function.prototype.myBind = function (context) {
        let _self = this; // this 指向 需要改变this指向的函数
        if(typeof this !==  function) {
            throw this + 'is not a function';
        }
        let params = Array.from(arguments).slice(1, arguments.length);
        return function F (args) {
            return _self.myApply(context , [...args , ...params]);
        }
    }

### 实现 sleep 效果

#### 实现预期

    console.log('start');
    sleep(5000);
    console.log('end');

### 代码

    async function sleap(timer){
        await wating(timer);
    }

    function wating(timer){
        return new Promise( (resolve , reject) => {
            setTimeout( () =>{
                resolve(true);
            },timer);
        });
    }
