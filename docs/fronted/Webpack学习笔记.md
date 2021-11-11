---
nav:
  title: '前端'
  path: /front-end
group:
  path: /back-end/webpack
  title: 'Webpack'
---

# Webpack 学习笔记一

# 构建性能

## loader

将 loader 应用于最少数量的必要模块

### 错误示例

```javascript
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
};
```

### 正确示例

```javascript
const path = require('path');

module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
      },
    ],
  },
};
```

## 解析

以下步骤可以提高解析速度：

- 减少 resolve.modules, resolve.extensions, resolve.mainFiles, resolve.descriptionFiles 中条目数量，因为他们会增加文件系统调用的次数。
- 如果你不使用 symlinks（例如 npm link 或者 yarn link），可以设置 resolve.symlinks: false。
- 如果你使用自定义 resolve plugin 规则，并且没有指定 context 上下文，可以设置 resolve.cacheWithContext: false。

## dll

使用 DllPlugin 为更改不频繁的代码生成单独的编译结果。这可以提高应用程序的编译速度，尽管它增加了构建过程的复杂度。

## 小即是快(smaller = faster)

减少编译结果的整体大小，以提高构建性能。尽量保持 chunk 体积小。

- 使用数量更少/体积更小的 library。
- 在多页面应用程序中使用 SplitChunksPlugin。
- 在多页面应用程序中使用 SplitChunksPlugin ，并开启 async 模式。
- 移除未引用代码。
- 只编译你当前正在开发的那些代码。

## 开发环境

### 增量编译

### 内存中编译

### stats.toJson()加速

### Devtool
