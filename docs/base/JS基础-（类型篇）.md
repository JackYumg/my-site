---
nav:
    title: '基础'
    path: /base
group:
    path: /基础/index
    title: '基础'
---


* 变量类型
    * JS的类型分类和判断
    * 值得类型和引用
* 原型与原型链（继承）
    * 原型和原型链的定义
    * 继承写法
* 作用域和闭包
    * 执行上下文
    * this
    * 闭包是什么
* 异步
    * 同步VS异步
    * 异步和单线程
    * 前端异步的场景
* ES6/7新标准的考察
    * 箭头函数
    * Module
    * Class
    * Set和Map/WeakSet和WeakMapuuu
    * Promise

### 变量类型

#### 变量分类

JavaScript 是一种弱类型脚本语言，所谓弱类型指的是定义变量时，不需要什么类型，在程序运行过程中会自动判断类型。

最新的 ECMAScript 标准定义了8种数据类型：
*   七种基本数据类型:
    *   **Boolean**，有2个值分别是：`true` 和 `false`.
    *   **null** ， 一个表明 null 值的特殊关键字。 JavaScript 是大小写敏感的，因此`null`与`Null`、`NULL`或变体完全不同。
    *   **undefined** ，和 null 一样是一个特殊的关键字，undefined 表示变量未定义时的属性。
    *   **Number**（数字），整数或浮点数，例如： `42` 或者 `3.14159`。
    *   **BigInt** (任意精度的整数) ，可以安全地存储和操作大整数，甚至可以超过数字的安全整数限制。
    *   **String**（字符串），字符串是一串表示文本值的字符序列，例如："Howdy" 。
    *   **Symbol**（代表） ( 在 ECMAScript 6 中新添加的类型).。一种实例是唯一且不可改变的数据类型。
    *   **Object**（对象）

**注意：原始类型不包含 Object，所以原始类型有七种。**

#### 变量判断

### `typeof`类型判断

`typeof xxx` 得到的值有以下几种类型：`undefined`、`boolean`、`number`、`string`、`object`、`function`、`symbol`，比较简单，不再一一演示了。这里需要注意的有三点：

*   `typeof null` 结果是 `object`，实际这是 `typeof` 的一个bug，null 是原始值，非引用类型。
*   `typeof [1, 2]` 结果是 `object`，结果中没有 `array` 这一项，引用类型除了 `function` 其他的全部都是 `object`。
*   `typeof Symbol()` 用 `typeof` 获取 `symbol` 类型的值得到的是 `symbol`，一种实例是唯一且不可改变的数据类型,这是 ES6 新增的知识点。

### `instanceof`继承判断
用于实例和构造函数的对应。例如判断一个变量是否是数组，使用`typeof`无法判断，但可以使用`[1, 2] instanceof Array`来判断。因为，`[1, 2]`是数组，它的构造函数就是`Array`。同理：

    function Dog(name) { 
        this.name = name
    }
    var hashiqi = new Dog('哈士奇') 
    console.log(hashiqi instanceof Dog) `
    
#### 值类型与引用类型
除了原始类型，ES 还有引用类型，上文提到的 `typeof` 识别出来的类型中，只有 `object` 和 `function` 是引用类型，其他都是值类型。**注意：`Symbol` 也是值类型，实例的唯一标识**。

##### 值类型的赋值
    var a = 1;
    var b = 2;
    b = a;
    a++;
    b++;
    console.log('a',a);
    console.log('b',b);
    // 打印结果：
    a 2
    b 2

上述示例中，a , b 为值类型，在a赋值给b的时候，b的值修改为了1，a++,与b++之后，a、b成为了2。
##### 引用类型的赋值
    var a = {name:'张三',age:4};
    var b = {name:''王五,age: 12};
    a = b;
    a.age++;
    console.log('a', a); 
    console.log('b', b);
    // 打印结果
    a {name:'王五',age: 13}
    b {name:'王五',age: 13}
   
上述示例中，a , b为引用类型，在b赋值给a的时候，a的地址指向了b，所以a： {name:'王五',age: 12},a的年龄加上后就变为了12而非5。

这就是因为`Number`类型的`a`是按值传递的，而`Object`类型的`b`是按引用传递的。

如图所示：
![i&o进销存管理系统架构图.png](https://image-static.segmentfault.com/427/313/4273137309-5e8972ac22c7c_articlex)

num1 与 str1 是值类型，obj 是引用类型，从图来看应该就知道值类型与引用类型赋值时的区别了，而引用类型采用这种方式也大大节约了内存，毕竟一大大的对象过多会导致这样的问题。