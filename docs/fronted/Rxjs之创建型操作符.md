---
nav:
    title: '前端'
    path: /front-end
group:
    path: /front-end/Reactive-libs
    title: '响应式库'
---

# Rxjs之创建型操作符

## 操作符目录

### 创建型操作符

- ajax
- bindCallback
- bindNodeCallback
- defer
- empty
- from
- fromEvent
- fromEventPattern
- generate
- interval
- of
- range
- throwError
- timer
- iif

#### AJAX

是RX里面的一个操作符

##### 描述

它为 Ajax 请求创建一个 observable，它可以是一个带有 url、标题等的请求对象，也可以是一个 URL 字符串。

使用 ajax() 获取从 API 返回的响应对象。

    import { ajax } from 'rxjs/ajax';
    import { map, catchError } from 'rxjs/operators';
    import { of } from 'rxjs';

    const obs$ = ajax(`https://api.github.com/users?per_page=5`).pipe(
        map(userResponse => console.log('users: ', userResponse)),
        catchError(error => {
            console.log('error: ', error);
            return of(error);
        })
    );

使用 ajax.getJSON() 从 API 获取数据。

    import { ajax } from 'rxjs/ajax';
    import { map, catchError } from 'rxjs/operators';
    import { of } from 'rxjs';

    const obs$ = ajax.getJSON(`https://api.github.com/users?per_page=5`).pipe(
        map(userResponse => console.log('users: ', userResponse)),
        catchError(error => {
            console.log('error: ', error);
            return of(error);
        })
    );

使用 ajax() 与对象作为参数和方法 POST 延迟两秒。

    import { ajax } from 'rxjs/ajax';
    import { map, catchError } from 'rxjs/operators';
    import { of } from 'rxjs';
    
    const users = ajax({
        url: 'https://httpbin.org/delay/2',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'rxjs-custom-header': 'Rxjs'
        },
        body: {
            rxjs: 'Hello World!'
        }
    }).pipe(
        map(response => console.log('response: ', response)),
        catchError(error => {
            console.log('error: ', error);
            return of(error);
        })
    );

使用 ajax() 来获取。 从请求返回的错误对象。

    import { ajax } from 'rxjs/ajax';
    import { map, catchError } from 'rxjs/operators';
    import { of } from 'rxjs';

    const obs$ = ajax(`https://api.github.com/404`).pipe(
        map(userResponse => console.log('users: ', userResponse)),
        catchError(error => {
            console.log('error: ', error);
            return of(error);
        })
    );

#### bindCallback

转换一个回调函数然后返回一个可观察对象

参数

返回值

描述