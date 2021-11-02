---
nav:
  title: '基础'
  path: /base
group:
  path: /base/net
  title: 'http'
---

# HTTP 概述

## 代理

在浏览器和服务器之间，有许多计算机和其他设备转发了 HTTP 消息。由于 Web 栈层次结构的原因，它们大多都出现在传输层、网络层和物理层上，对于 HTTP 应用层而言就是透明的，虽然它们可能会对应用层性能有重要影响。还有一部分是表现在应用层上的，被称为代理（Proxies）。

代理主要有如下几种作用：

- 缓存（可以是公开的也可以是私有的，像浏览器的缓存）
- 过滤（像反病毒扫描，家长控制...）
- 负载均衡（让多个服务器服务不同的请求）
- 认证（对不同资源进行权限管理）
- 日志记录（允许存储历史信息）

## http 特点

简单的、可扩展的、无状态，有会话的

### 简单

### 可扩展

### 无状态

### 有会话

        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Credentials' 'true';
        expires 30d;
        add_header Cache-Control max-age=3600;
        root html/lib;
        index index.html index.htm;
        proxy_cache temp-test;
        proxy_cache_valid 200 206 304 301 302 10d;
        proxy_cache_key $uri;
        proxy_set_header Host $host:$server_port;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
