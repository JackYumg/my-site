---
nav:
  title: '前端'
  path: /front-end
group:
  path: /front-end/Reactive-libs
  title: '响应式库'
---

# Rxjs 之创建型连接操作符

## 阅读前准备

```
ObservableInput : Observable<T> | InteropObservable<T> | AsyncIterable<T> | PromiseLike<T> | ArrayLike<T> | Iterable<T> | ReadableStreamLike<T>
```

## Concat

创建一个输出 Observable，它顺序地发出第一个给定 Observable 的所有值，然后移动到下一个。

特点：有比较严格的响应顺序，顺序按照输入 obserable 的数组顺序，从左到右依次响应，每一个 obserable 响应完之后移动到下一个。

### 官方示例

```typescript
import { concat, interval, range } from 'rxjs';
import { take } from 'rxjs/operators';

const timer = interval(1000).pipe(take(4));
const sequence = range(1, 10);
const result = concat(timer, sequence);
result.subscribe(x => console.log(x));

// results in:
// 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3 -immediate-> 1 ... 10
```

### 弹珠图

![concat弹珠图](http://118.195.182.168:8001/fileapi/getFiles?path=1636599028287_QQ图片20211111104843.png)

#### 说明

合并后的 obserable 循序按照合并的数组顺序
[a , b ] + [x , y ] = [a , b , x , y];

    a ------完成---->;b ------完成---->;x ------完成---->;y ------完成---->

### 特点：

- 可多次响应，响应总次数 （n = Y<sub>n</sub>（Y 推流次数) + Y<sub>n-1</sub>）
- 有响应顺序，按照 Obserable 的输入顺序响应，响应完成后才到下一个 Obserable。
- 响应结果为每个输入 Obserable 的响应结果

## fockJoin

接受 ObservableInput 数组或 ObservableInput 字典对象，并返回一个 Observable，它以与传递的数组完全相同的顺序发出值数组，或者发出与传递的字典形状相同的值字典。

    与 `Promise.All` 有相似之处，有异常时整个结果将会已异常的情况处理，后面的也会停止响应。但是从功能上来说更强大

### 官方示例

```typescript
import { forkJoin, of, timer } from 'rxjs';

const observable = forkJoin({
  foo: of(1, 2, 3, 4),
  bar: Promise.resolve(8),
  baz: timer(4000),
});
observable.subscribe({
  next: value => console.log(value),
  complete: () => console.log('This is how it ends!'),
});

// 日志:
// { foo: 4, bar: 8, baz: 0 }  4 秒 后的打印结果
// 然会
// "This is how it ends!" 在4秒后结果打印后立即打印完成信息
```

### 弹珠图

![forkJoin弹珠图](http://118.195.182.168:8001/fileapi/getFiles?path=1636613952996_forkJoin.png)

#### 说明

如图所示，有三个 Obserable 事件线（每条线可以表示 ObservableInput），每个事件线分别有几个事件弹珠，通过`forkjoin`之后，返回了一个结果（ObservableInput），结果的成员数量与事件线数量对应，每一个成员都是各自线上最后的响应结果。

    [a , b , c , d]

    [e , f , g]

    forkJoin ---------------> [d , g]

### 特点

- 只响应一次。
- 响应结果只与每个输入 Obserable 的最后一次响应结果为主。
- 当异常时整个结果都处理为异常。

## combineLatest

说明： 组合多个 Observable 以创建一个 Observable，其值是根据每个输入 Observable 的最新值计算得出的。

### 运用示例

#### 组合两个时间可观察对象

```typescript
import { combineLatest, timer } from 'rxjs';

const firstTimer = timer(0, 1000); // emit 0, 1, 2... after every second, starting from now
const secondTimer = timer(500, 1000); // emit 0, 1, 2... after every second, starting 0,5s from now
const combinedTimers = combineLatest([firstTimer, secondTimer]);
combinedTimers.subscribe(value => console.log(value));
// 日志
// [0, 0]  0.5s后打印
// [1, 0]  1s后打印
// [1, 1]  1.5s后打印
// [2, 1]  2s后打印
```

#### 组合一个可观察对象字典

```typescript
import { combineLatest, of } from 'rxjs';
import { delay, startWith } from 'rxjs/operators';

const observables = {
  a: of(1).pipe(delay(1000), startWith(0)),
  b: of(5).pipe(delay(5000), startWith(0)),
  c: of(10).pipe(delay(10000), startWith(0)),
};
const combined = combineLatest(observables);
combined.subscribe(value => console.log(value));
// Logs
// {a: 0, b: 0, c: 0} 立即打印
// {a: 1, b: 0, c: 0} 延迟 1s
// {a: 1, b: 5, c: 0} 延迟 5s
// {a: 1, b: 5, c: 10} 延迟 10s
```

### 弹珠图

![弹珠图](http://118.195.182.168:8001/fileapi/getFiles?path=1635908647943_combineLatest.png)

如上弹珠图所示，存在两个输入的可观察对象，每个弹珠为每次的输入事件，而每个弹珠的间隔为每次输入的时间间隔（或称顺序）。那么按照此规则，合并后的新可观察对象第一次获取到的值应该是 [a , 1] ，一个新的弹珠，下一个新值是第一个可观察对象输入新值 b 时获取到，而第二个可观察对象并没有新值，所以为[b , 1]，一颗新弹珠。依次类推最终得到图上最后一条输入事件时间线。

    [ a , , b ,  ,  , c , d , e]
    [ , 1 , , 2 , 3 , 4]

    combineLatest  ->  组合为

    [a , 1 ] ，第一次输出
    [b , 1] ，第二次输出
    [b , 2] ，第三次输出
    [b , 3] , 第四次输出
    [b , 4] , 第五次输出
    [ c , 4], 第六次输出
    [ d , 4], 第七次输出
    [ e , 4], 第八次输出，最后的一次

#### 特点

- 多次响应，响应次数 (n = Y<sub>n</sub> + Y<sub>n-1</sub>)。
- 响应结果在没得到最终结果时会一直变化并响应。响应结果 res = RESULT{ Yx(n)&Yx(n-1)&...&Yx(1) ,...}, 所有的结果应该是一个集合，最终结果一个是每个输入最后响应结果的组合（最终结果和 forkjoin 的结果一致）。

## merge

创建一个输出 Observable，它同时发出来自每个给定输入 Observable 的所有值。
