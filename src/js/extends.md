---
nav:
  title: js手写
  path: /jsWrite
group:
  path: /jsWrite/index
  title: 'js手写'
---

## 继承实现

### 构造函数实现

```javascript
function Parent(name) {
  this.name = params;
}

Parent.prototype.getName = function() {
  return this.name;
};

function Son(name, age) {
  Person.call(this, ...arguments);
  this.name = name;
  this.age = 12;
}
```

#### 优点

#### 缺点

这样写的时候子类虽然能够拿到父类的属性值，但是问题是父类中一旦存在方法那么子类无法继承。

### 原型链继承

```javascript
function Parent(name) {
  this.name = name;
  this.play = [];
}

Parent.prototype.getName = function() {
  console.log(this.name);
};

function Son(name) {}

Son.prototype = new Parent();
```

#### 优点

#### 缺点

使用同一个原型，那么通过子实例改变引用型属性时，其他的字实例属性也会改变

例子
var son1 = new Son();
var son2 = new Son();
son1.play.push(1);
son2.play; // [1]
son1.play; // [1]

### 组合原型链继承和够造函数

```javascript
function Parent(name) {
  this.name = name;
  this.play = [];
}

Parent.prototype.getName = function() {
  return this.name;
};

function Son() {
  Parent.call(this, ...arguments);
}

Son.prototype = new Parent();
```

#### 优点

#### 缺点

多执行了一次 Parent 函数。

### 寄生式组合继承

```javascript
function Parent(name) {
  this.name = name;
  this.play = [];
}
Parent.prototype.getName = function() {
  return this.name;
};

function Son() {
  Parent.call(this, ...arguments);
}

Son.prototype = Object.create(Parent.prototype);
Son.prototype.constructor = Son;
```

### class 类继承

```javascript
class Parent {
  constructor() {}
}

class Son extends Parent {
  constructor() {
    super();
  }
}
```

#### 内部实现
