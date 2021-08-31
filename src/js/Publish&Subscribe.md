---
nav:
  title: js手写
  path: /jsWrite
group:
    path: /jsWrite/index
    title: 'js手写'
---

## 发布与订阅

```javascript
function EventEmitter{
    this.events = {};
}

EventEmitter.prototype.on = function (eventName , callback) {
  if(this.events[eventName]){
    this.events[eventName].push(callback);
  } else {
    this.events[eventName] = [];
    this.events[eventName].push(callback);
  }
}

EventEmitter.prototype.emit = function (eventName , params) {
  const calls = this.events[eventName];
  if(calls) {
    calls.forEach( (callback) => {
      callback(params);
    });
  }
}

EventEmitter.prototype.close = function (eventName) {
  const calls = this.events[eventName];
  if(calls) {
    this.events[eventName] = null;
  }
}

```

## 观察者

```javascript
function Subscribtion() {
    this.subscribes = [];
    this.value = null;
    this.next = (value) => {
        this.value = value;
        setTimeout(() => {
            this.subscribes.forEach((item) => {
                item(value);
            });
        }, 0);
    }

    this.subscribe = (fn) => {
        this.subscribes.push(fn);
    }
}
function Obserable(fn) {
    this.subscribes = [];
    const subscription = new Subscribtion();
    fn(subscription);
    subscription.subscribe((value) => {
        this.excute(value);
    });
    this.unsubscrbe = () => {
        this.subscribes = [];
    }
    this.subscribe = (fn) => {
        this.subscribes.push(fn);
    }

    this.excute = (value) => {
        this.subscribes.forEach((item) => {
            item(value);
        });
    }

}


// 测试

var obserable = new Obserable((subscriber) => {
    setTimeout(() => {
        subscriber.next(1);
    }, 3000);
});

obserable.subscribe((e) => {
    console.log(e);
});


```