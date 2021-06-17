---
nav:
    title: '前端'
    path: /front-end
group:
    path: /front-end/Reactive-libs
    title: '响应式库'
---

# Rxjs

## 操作符

### 什么是操作符？

操作符都是函数，这里有两种类型的操作符，分别是管道式操作符与创建型操作符，两种操作符都会返回一个Obserable。

管道式操作符是一种可以使用 observableInstance.pipe(operator()) 语法通过管道传输到 Observables 的操作符。其中包括 filter(...) 和 mergeMap(...)。调用时，它们不会更改现有的 Observable 实例。相反，它们返回一个新的 Observable，其订阅逻辑基于第一个 Observable。

管道式操作符是一个将 Observable 作为其输入并返回另一个 Observable 的函数。这是一个纯粹的操作：之前的 Observable 保持不变。

管道式操作符本质上是一个纯函数，它将一个 Observable 作为输入并生成另一个 Observable 作为输出。订阅输出 Observable 也会订阅输入 Observable。

创建型操作符是另一种运算符，可以作为独立函数调用以创建新的 Observable。例如： of(1, 2, 3) 创建一个 observable，它将一个接一个地发出 1、2 和 3。创建运算符将在后面的部分中更详细地讨论。

例如，名为 map 的运算符类似于同名的 Array 方法。就像 [1, 2, 3].map(x => x * x) 会产生 [1, 4, 9] 一样，Observable 是这样创建的：

    import { of } from 'rxjs';
    import { map } from 'rxjs/operators';

    of(1, 2, 3)
    .pipe(map((x) => x * x))
    .subscribe((v) => console.log(`value: ${v}`));

    // Logs:
    // value: 1
    // value: 4
    // value: 9

将发出 1、4、9。另一个有用的运算符是 first：

    import { of } from 'rxjs';
    import { first } from 'rxjs/operators';

    of(1, 2, 3)
    .pipe(first())
    .subscribe((v) => console.log(`value: ${v}`));

    // Logs:
    // value: 1

请注意，map 必须在逻辑上动态构建，因为它必须被赋予映射函数。 相比之下， first 可能是一个常量，但仍然是动态构建的。 作为一般做法，所有运算符都被构造，无论它们是否需要参数。

### 管道式管道

可`pipe`操作符是函数，所以它们可以像普通函数一样使用：`op()(obs)`——但在实践中，往往有许多它们被卷积在一起，很快变得不可读：`op4()(op3()(op2() )(op1()(obs))))`。 出于这个原因，`Observables` 有一个名为 `.pipe()` 的方法可以完成同样的事情，同时更容易阅读：

    obs.pipe(op1(), op2(), op3(), op4());

就风格而言，即使只有一个操作符，也不会使用 `op()(obs)` ； `obs.pipe(op())` 是普遍首选的。

### 创建型操作符

什么是创建型操作符？ 与管道式操作符不同，创建型操作符是可用于创建具有一些常见预定义行为的 Observable 或通过加入其他 Observable 的函数。

创建运算符的典型示例是区间函数。 它接受一个数字（不是 Observable）作为输入参数，并产生一个 Observable 作为输出：

    import { interval } from 'rxjs';

    const observable = interval(1000 /* number of milliseconds */);

### 高阶 Observable

`Observables` 最常发出普通值，如字符串和数字，但令人惊讶的是，它经常需要处理 `Observables` 的 `Observables`，即所谓的高阶 `Observables`。 例如，假设您有一个 `Observable` 发出字符串，这些字符串是您想要查看的文件的`URL`。 代码可能如下所示：

    const fileObservable = urlObservable.pipe(map((url) => http.get(url)));