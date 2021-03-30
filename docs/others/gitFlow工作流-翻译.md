---
nav:
    title: '其他'
    path: /others
group:
    path: /others/base
    title: '其他'
---

# Gitflow 工作流

*图片如果未正常加载，请使用翻墙工具或跳转至原文*

Gitflow Workflow 是一种 Git 工作流程设计，由 nvie 的 Vincent Driessen 首次发布并广受欢迎。这个 Gitflow workflow 围绕着项目的发布定义了严格的分支模型，为管理大型项目提供了强大的框架。

Gitflow 非常适合具有发布周期计划的项目。这个工作流程没有新增任何超出功能分支工作流程的新概念或者命令。相反，它给与不同的分值赋予了不同的角色，定义了怎样以及什么时候进行互动。除了功能分支。除了功能分支外，它还使用各个分支来准备，维护和记录版本。当然，您还可以利用Feature Branch Workflow 的所有好处：拉取请求，孤立的实验和更有效的协作。

## 开始

Gitflow 实际上只是 Git 工作流程的抽象概念。 这意味着它决定了要建立哪种分支以及如何将它们合并在一起。 我们将触及以下分支的目的。 git-flow 工具集是具有安装过程的实际命令行工具。 git-flow 的安装过程很简单。 git-flow 的软件包可在多个操作系统上使用。 在 OSX 系统上，您可以执行 brew install git-flow。 在Windows上，您需要下载并安装 git-flow 。 安装git-flow后，您可以通过执行 git flow init 在项目中使用它。 Git-flow 是围绕 Git 的包装。 git flow init 命令是默认 git init 命令的扩展，除了为您创建分支外，不会更改存储库中的任何内容。

## 工作机制

![图片](https://i.imgur.com/6T1l1mG.png)

## Develop and Master (开发与主分支)

Gitflow 工作流程使用两个分支代替了单个主分支去记录项目的历史。 master 分支存储正式的发布历史记录，develop 分支充当功能的集成分支。使用版本号标记 master 分支中的所有提交也很方便。

第一步是用一个 develop 分支来补充默认的 master 。 一种简单的方法是让一个开发人员在本地创建一个空的 develop 分支并将其推送到服务器：

    git branch develop
	git push -u origin develop

该分支将包含项目的完整历史记录，而 master 将包含简化版本。 现在，其他开发人员应该克隆中央存储库，并为开发创建跟踪分支。

使用 git-flow 扩展库时，在现有存储库上执行 git flow init 将创建开发分支：

    $ git flow init
    Initialized empty Git repository in ~/project/.git/
    No branches exist yet. Base branches must be created now.
    Branch name for production releases: [master]
    Branch name for "next release" development: [develop]
    
    How to name your supporting branch prefixes?
    Feature branches? [feature/]
    Release branches? [release/]
    Hotfix branches? [hotfix/]
    Support branches? [support/]
    Version tag prefix? []
    
    $ git branch
    * develop
     master

## Feature Branches(功能分支)

每个新功能都应驻留在其自己的分支中，可以将其推送到中央存储库以进行备份/协作。 但是，功能分支不是将其合并到主分支，而是将 develop 分支用作其父分支。 功能完成后，它会重新合并到开发中。 Feature 分支绝不能直接与 master 进行交互。


![](https://i.imgur.com/uMDvv5K.png)


注意，将功能分支与开发分支结合使用达到了完成功能分支工作流程的所有的目的与意图。但是，Gitflow 工作流并不止于此。

通常创建功能分支到最新的开发分支。

### 创建一个功能分支

没有 git-flow 的情景

    git checkout develop
    git checkout -b feature_branch

使用 gti-flow 的情景

    git flow feature start feature_branch

像平常一样继续工作并使用 Git。

### 完成一个功能分支

当你完成了一个功能的开发，下一步就是将功能分支合并到 develop 分支

没有 git-flow 的情景

    git checkout develop
    git merge feature_branch

使用 gti-flow 的情景

    git flow feature finish feature_branch

## Release分支(发布分支)

![](https://i.imgur.com/ZJzDJul.png)

一旦 develop 分支获得了足够的功能以进行发布（或临近预定的发布日期），就可以从 develop 分支分支发布。 创建此分支将开始下一个发行周期，因此此刻之后此发布分支无法添加任何新功能-该分支中仅应包含错误修复，文档生成以及其他面向发行版的任务。 一旦准备好发布，发行分支将合并到 master 并用版本号标记。 此外，应该将其重新合并到开发中，而自发布以来，该过程可能已经进行了。

使用专门的分支来准备发布，使一个团队可以完善当前版本，而另一个团队可以继续开发下一个版本的功能。 它还创建了明确定义的开发阶段（例如，很容易地说：“本周我们正在为版本 4.0 作准备，并在存储库的结构中实际看到它）。

    说明:专门的分支是指的Release分支，并非Master分支

进行发布分支是另一种直接的分支操作。 像功能分支一样，发布分支也基于开发分支。 可以使用以下方法创建新的发行分支。

没有 git-flow 的情景

    git checkout develop
	git checkout -b release/0.1.0

使用 gti-flow 的情景

    git flow release start 0.1.0
	Switched to a new branch 'release/0.1.0'

一旦这个版本准备好发布，它将被合并到master中并进行开发，然后发布分支将被删除。 重要的是将其重新合并到 develop 分支中，因为关键更新可能已添加到 release 分支，并且新功能需要访问这些更新。 如果您的团队强调代码审查，那么这将是请求请求的理想场所。

要完成发行分支，请使用以下方法：

没有 git-flow 的情景

    git checkout master
	git merge release/0.1.0

使用 gti-flow 的情景

    git flow release finish '0.1.0'

## Hotfix Branches / 修补程序分支/热修复分支

![](https://i.imgur.com/2NAoLDJ.png)

维护或“修补程序”分支用于快速修补生产版本。 修补程序分支与发行分支和功能分支很像，只是它们基于主版本而不是开发版本。 这是唯一应直接从master分支的分支。 修复程序完成后，应将其合并到master分支和develop分支（或当前发行版分支）中，并应使用更新的版本号标记master。

拥有专门的错误修复开发线，您的团队可以在不中断其余工作流程或不等待下一个发布周期的情况下解决问题。 您可以将维护分支视为直接与master一起使用的临时发行分支。 可以使用以下方法创建修补程序分支：

没有 git-flow 的情景

   	git checkout master
	git checkout -b hotfix_branch

使用 gti-flow 的情景

    git flow hotfix start hotfix_branch

与完成发行分支相似，修补程序分支也合并到master和development中。

	git checkout master
	git merge hotfix_branch
	git checkout develop
	git merge hotfix_branch
	git branch -D hotfix_branch


[原文链接](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow "git flow 教程")

## 自我理解

以下内容纯粹个人杜撰

（master）主分支的作用：记录项目的发布历史版本，每次向生产环境部署一次，算是一个版本。
	
（develop）开发分支的作用：用于开发工作，相当于单分支开发时的 master 分支，在 master 分支上拉取、修改、推送。

（Feature）功能分支的作用：用于开发新功能，开发完成后合并到 develop 分支。修复develop的功能，修复完后同样合并到 develop 分支。

（release）发布分支的作用：在达到一个阶段后，项目需要发布准备（测试、文档生成等）。如果在 release 分支中发生改变，那么也需要合并到 master 分支与 develop 分支。

（Hotfix）热修复分支的作用：当正式环境中发现错误需要即时修复时，从 master 分支拉下来，新建 Hotfix 分支，对程序里的错误进行修复、发布，修复、发布后合并到 master 与 develop ，给master打上新标签。

### 问题1

从开发效率上来讲，基本的单分支模型与此 git flow 模型相比，那种效率更高？

### 问题2

开发这么多分支那些是在本地，那些可以上传到 git 服务器上？

### 问题3

这么多分支，维护起来是否很麻烦？

### 问题4

这种 git 模型适合那些类型的项目？不适合那些项目？

## 项目类型

![](https://i.imgur.com/nOyBsrl.png)

### 单一型产品

#### 特点：通用、不分区域，再无强制更新的情况下老版本基本上仍然能够正常使用。也可能由于更新的不及时可能导致无法正常工作或缺少一些功能支持，例如 “浏览器”。

### 框架型产品

#### 特点：因某些原因导致不通用(数据不统一)，例子：一个交通管理类的系统，各个省份之间数据设计不同，导致每个省份都需要一个类似的系统，业务相同、操作相同又各有特点，每个版本必须强制更新。

### 框架

#### 特点：通用，发布过的所有历史版本需要一直维护，需要考虑向下、向上兼容，不维护后劝升级、提供升级途径。例如： Angular 或其他。

## 总结

在实际开发中，如果参与人员多、项目规模大，在效率上理论上是比单分支模型高，规范的 git 流程能够大大减少开发冲突，除此外规范的流程在线上出现紧急问题时具有更好的风险抗压能力与风险处理能力。

在git服务器上的分支可以是master 、 develop、 release。release 是发布版本一般情况下在发布后会合并到 master 与 develop，然后删除该分支，但是如果是框架（jQuery）这种，也有可能发布一个1.2.0等，那这个版本是可以上传到远程 git 服务器的。其他的Feature、Hostfix是在本地处理的，处理完成后可以合并到 master 与 develop分支。

分支这么多肯定会变得麻烦，不过这种方式是在开发人员多、项目规模大的情景下使用，一般小团队可以采用“集中模型”进行开发。

在列出的项目类型中，通过他们的特点，看出单一型、框架型比较适合，框架型产品不是太适合，在采用那种 git 模型时，还应根据项目实际规模来决定采用那种方式。
[其他分支模型](https://www.atlassian.com/git/tutorials/comparing-workflows)