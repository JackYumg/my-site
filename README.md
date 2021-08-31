# app-exp

## git规范

### git提交规范

    <type>(<scope>): <subject> #header
    // 空一行
    <body>
    // 空一行
    <footer> 

### type

用于说明本次commit的类别，只允许使用下面7个标识

- feat：新功能（feature）
- fix：修补bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动
- adjust：调整，不是bug，做一些文本性调整（不影响代码运行的变动）
- add:补充，功能的补充
### scope

用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

### subject

以动词开头，使用第一人称现在时，比如change，而不是changed或changes
第一个字母小写
结尾不加句号（.）