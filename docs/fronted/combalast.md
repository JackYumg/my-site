---
nav:
  title: '前端'
  path: /front-end
group:
  path: /front-end/Reactive-libs
  title: '响应式库'
---

## Rxjs 联接创建运算符

### combineLatest

说明： 组合多个 Observable 以创建一个 Observable，其值是根据每个输入 Observable 的最新值计算得出的。

### 弹珠图

![弹珠图](http://118.195.182.168:8001/fileapi/getFiles?path=1635908647943_combineLatest.png)

如上弹珠图所示，存在两个输入的可观察对象，每个弹珠为每次的输入事件，而每个弹珠的间隔为每次输入的时间间隔（或称顺序）。那么按照此规则，合并后的新可观察对象第一次获取到的值应该是 [a , 1] ，一个新的弹珠，下一个新值是第一个可观察对象输入新值 b 时获取到，而第二个可观察对象并没有新值，所以为[b , 1]，一颗新弹珠。依次类推最终得到图上最后一条输入事件时间线。

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
