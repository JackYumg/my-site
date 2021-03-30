---
nav:
    title: '前端'
    path: /front-end
group:
    path: /back-end/task-invoke
    title: '任务调度'
---

# Zone

## 概要

### 什么是Zone

#### 约定

为了能更容易阅读本文，将约定Zone成为【作用区间】。

#### 说明

Zone是一种拦截和跟踪异步工作的机制。
Zone是一个全局对象，它配置了关于如何拦截和跟踪异步回调的规则。
Zone有以下工作:

1. 截获异步任务调度。
2. 包装跨异步操作的错误处理和区域跟踪的回调。
3. 提供一种将数据附加到区域的方法。
4. 提供一个上下文特定的最后一帧错误处理。
5. (拦截屏蔽方法)。

在最简单的形式下，Zone允许拦截异步操作的调度和调用，并在异步任务之前和之后执行额外的代码。截取规则使用[ZoneConfig]配置。在一个系统中可以有许多不同的zone实例，但是在任何给定的时间只有一个zone是活动的，可以使用[zone.current]进行检索。

## Zone中的Task

## 任务类型

	type TaskType = 'microTask'|'macroTask'|'eventTask';
	// 分别是：微任务、宏任务与事件任务

## 任务状态

	type TaskState = 'notScheduled'|'scheduling'|'scheduled'|'running'|'canceling'|'unknown';
	// 分别是：未调度、调度中、已调度、运行中、移除中、未知的

## TaskData任务数据源
	
	/**
	 */
	interface TaskData {
	  /**
	   * A 一个周期的[MacroTask]是这样的，它在执行后会自动重新调度。
	   */
	  isPeriodic?: boolean;
	
	  // 任务运行延迟，单位毫秒
	  delay?: number;
		
	  // 原生的setTimeout标识
	  handleId?: number;
	}

## Task 任务

	interface Task {
	  type: TaskType;
	  state: TaskState;
	  source: string;
	  invoke: Function;
	  callback: Function;
	  data?: TaskData;
	  scheduleFn?: (task: Task) => void;
	  cancelFn?: (task: Task) => void;
	  readonly zone: Zone;
	  runCount: number;
	  cancelScheduleRequest(): void;
	}

### 成员变量说明

#### 属性

##### source

字符串，标示了当前在调度中的任务

##### invoke

这个函数在VM执行任务的时候被使用，它将被委托到callback 的回调里面

##### callback

在【Zone.currentTask】被设置时，这个函数将被执行。

##### data

关联当前任务的具体选项。会被传送到scheduleFn中。

##### scheduleFn

代表VM调度任务需要完成的默认工作。一个【工作区间】将会选择拦截这个方法并且实现自己的功能。

##### cancelFn

##### zone

##### runCount

##### cancelScheduleRequest


## ZoneSpec

提供了一种配置区域事件拦截的方法。只有' name '属性是必需的(其他的都是可选的)。


    interface ZoneSpec {
      name: string;
      properties?: {[key: string]: any};
      onFork?:(parentZoneDelegate: ZoneDelegate, currentZone: Zone, targetZone: Zone,zoneSpec: ZoneSpec) => Zone;
      onIntercept?:(parentZoneDelegate: ZoneDelegate, currentZone: Zone, targetZone: Zone, delegate: Function,source: string) => Function;
      onInvoke?:(parentZoneDelegate: ZoneDelegate, currentZone: Zone, targetZone: Zone, delegate: Function,applyThis: any, applyArgs?: any[], source?: string) => any;
      onHandleError?:(parentZoneDelegate: ZoneDelegate, currentZone: Zone, targetZone: Zone,error: any) => boolean;
      onScheduleTask?:(parentZoneDelegate: ZoneDelegate, currentZone: Zone, targetZone: Zone, task: Task) => Task;
      onInvokeTask?:(parentZoneDelegate: ZoneDelegate, currentZone: Zone, targetZone: Zone, task: Task,applyThis: any, applyArgs?: any[]) => any;
      onCancelTask?:(parentZoneDelegate: ZoneDelegate, currentZone: Zone, targetZone: Zone, task: Task) => any;
      onHasTask?:(parentZoneDelegate: ZoneDelegate, currentZone: Zone, targetZone: Zone,
           hasTaskState: HasTaskState) => void;
    }

### 成员变量说明

#### 属性

##### name

作用区间名称，为了方便调试时检查当前作用区间。根作用区间默认为<root>。

##### properties 

要与Zone关联的一组属性，键值对形式。使用[Zone.get]。去取回它们。


#### 方法

##### onFork

允许【作用区间】分叉的拦截。

##### onIntercept

允许截取回调的包装。

##### onInvoke

允许截取回调调用。

#### onHandleError

允许拦截错误处理。

#### onScheduleTask

允许截取任务调度。

#### onInvokeTask

#### onCancelTask

允许截取任务取消。

#### onHasTask

任务队列空状态的更改通知。


## Zone 数据结构

    interface Zone {
        parent: Zone|null;
        name: string;
        get(key: string): any;
        getZoneWith(key: string):Zone;
        fork(zoneSpec:ZoneSpec): Zone;
        wrap<F extends Function>(callback: F, source: string): F;
        run<T>(callback: Function, applyThis?: any, applyArgs?: any[], source?: string): T;
        runGuarded<T>(callback: Function, applyThis?: any, applyArgs?: any[], source?: string): T;
        runTask(task: Task, applyThis?: any, applyArgs?: any): any;
        scheduleMicroTask(source: string, callback: Function, data?: TaskData,customSchedule?: (task: Task) => void): MicroTask;
        scheduleMacroTask(source: string, callback: Function, data?: TaskData, customSchedule?: (task: Task) => void,customCancel?: (task: Task) => void): MacroTask;
        scheduleEventTask(source: string, callback: Function, data?: TaskData, customSchedule?: (task: Task) => void,customCancel?: (task: Task) => void): EventTask;
        scheduleTask<T extends Task>(task: T): T;
        cancelTask(task: Task): any;
    }
### 成员变量说明
#### 属性
##### parent 

作用区间，非根作用区间都有一个parent，根作用区间 parent 为`null`。

##### name 属性

作用区间名称，为了方便调试时检查当前作用区间。根作用区间默认为<root>。

#### 方法

##### get 

##### getZoneWith

##### fork
