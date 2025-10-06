# Kubernetes Patterns - Chapter 4: Health Probe

## Slide 1
**Kubernetes Patterns - Chapter 4: Health Probe (扩展版)**
Reusable Elements for Designing Cloud Native Applications (Second Edition)

作者: Bilgin Ibryam & Roland Huß

本PPT详细覆盖 Health Probe 模式，帮助 Kubernetes 监控和管理容器健康。扩展为20页，深入每个子节。

书籍封面图片

## Slide 2
**Chapter 4: Health Probe**
### 章节概述

- Chapter 4: Health Probe (页41-49)
- 关键子节: Problem, Solution, Process Health Checks, Liveness Probes, Readiness Probes, Startup Probes, Discussion

> The Health Probe pattern indicates how an application can communicate its health state to Kubernetes.

关键点:
- 焦点: 使应用可观察，提升自动化

## Slide 3
**Chapter 4: Health Probe**
### Problem - 容器健康挑战 (1/2)

- 容器内进程可能遇到多种健康问题
- 传统的进程检查不足以确保应用真正健康
- Kubernetes 需要更精细的健康状态信息

> The process health check is not sufficient to indicate the liveness of the application.

关键点:
- 问题: 进程存在但应用无响应（无限循环、死锁等）

## Slide 4
**Problem - 容器健康挑战 (2/2)**

- Kubernetes 需要外部方式检查应用是否 functioning as expected
- 无需了解内部，只验证服务能力

> Kubernetes needs a reliable way to check the health of applications...

关键点:
- 分布式应用失败率高

## Slide 5
**Solution - 概述**

- Health probes: livenessProbe, readinessProbe, startupProbe 在 Pod spec 中配置
- 机制: HTTP, TCP, exec commands

> Health probes are configured in the Pod specification under the .spec.containers[].livenessProbe...

关键点:
- 自动化生命周期和流量路由

## Slide 6
**Solution - 三种探针类型**

- Liveness Probe: 检查应用是否运行正常，失败时重启容器
- Readiness Probe: 检查应用是否准备好接收流量，失败时从服务端点移除
- Startup Probe: 检查应用是否已启动，失败时重启容器

> The liveness probe checks if the application is running properly...

关键点:
- 不同探针服务于不同目的

## Slide 7
**Process Health Checks - 概念**

- 传统方式: 检查进程是否存在
- 现代方式: 检查应用实际功能
- 通过信号机制 (SIGTERM) 优雅关闭

> The process health check is the most basic form of health checking...

关键点:
- 进程存在 ≠ 应用健康

## Slide 8
**Process Health Checks - 实现**

- Docker: 使用 HEALTHCHECK 指令
- Kubernetes: 默认检查容器主进程(PID 1)
- 可通过 lifecycle hooks 增强

```yaml
lifecycle:
  preStop:
    exec:
      command: ["/bin/sh", "-c", "sleep 10"]
```

关键点:
- 基础但不充分

## Slide 9
**Liveness Probes - 概念**

- 目的: 检测应用是否仍在运行
- 失败后果: 重启容器
- 适用场景: 检测死锁、无限循环等

> The liveness probe is used to determine if the application is running...

关键点:
- 防止故障应用持续运行

## Slide 10
**Liveness Probes - 配置示例**

HTTP 探针:
```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
```

Exec 探针:
```yaml
livenessProbe:
  exec:
    command: ["/bin/grpc_health_probe", "-addr=:8080"]
  initialDelaySeconds: 5
  periodSeconds: 10
```

关键点:
- 合理设置延迟和周期

## Slide 11
**Readiness Probes - 概念**

- 目的: 检测应用是否准备好接收流量
- 失败后果: 从服务端点移除
- 适用场景: 应用启动加载、临时过载等

> The readiness probe is used to determine if the application is ready...

关键点:
- 不重启容器，只控制流量

## Slide 12
**Readiness Probes - 配置示例**

HTTP 探针:
```yaml
readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 10
```

TCP 探针:
```yaml
readinessProbe:
  tcpSocket:
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 10
```

关键点:
- 确保流量只发送到健康实例

## Slide 13
**Startup Probes - 概念**

- 目的: 检测应用是否已启动
- 失败后果: 重启容器
- 适用场景: 启动缓慢的应用

> The startup probe is used to determine if the application has started...

关键点:
- 为慢启动应用提供保护

## Slide 14
**Startup Probes - 配置示例**

```yaml
startupProbe:
  httpGet:
    path: /health
    port: 8080
  failureThreshold: 30
  periodSeconds: 10
```

组合使用:
```yaml
startupProbe:
  httpGet:
    path: /health
    port: 8080
  failureThreshold: 30
  periodSeconds: 10
livenessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 300  # 高于 startupProbe 总时间
```

关键点:
- 避免与 livenessProbe 冲突

## Slide 15
**探针配置参数详解**

- initialDelaySeconds: 容器启动后等待时间
- periodSeconds: 检查间隔
- timeoutSeconds: 超时时间
- successThreshold: 连续成功次数
- failureThreshold: 连续失败次数

> Properly configuring probe parameters is crucial...

关键点:
- 参数设置影响应用稳定性

## Slide 16
**探针最佳实践**

- 使用不同的探针路径
- 合理设置超时和延迟
- 避免在探针中实现复杂逻辑
- 监控探针失败率

```yaml
# 好的做法
livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
```

关键点:
- 简单、快速、可靠

## Slide 17
**探针反模式**

避免在探针中:
- 执行复杂业务逻辑
- 访问数据库或外部服务
- 执行长时间运行的操作

```yaml
# 不好的做法
livenessProbe:
  exec:
    command: ["python", "check_everything.py"]
```

关键点:
- 探针应轻量且快速

## Slide 18
**探针故障排除**

常见问题:
- 探针路径错误
- 端口未监听
- 超时设置过短
- 探针影响应用性能

调试方法:
- 检查 Pod 事件: `kubectl describe pod`
- 查看探针日志
- 使用 `kubectl exec` 手动测试

关键点:
- 监控和日志是关键

## Slide 19
**Discussion - 应用生命周期管理**

Health Probe 模式的价值:
- 提升应用可靠性
- 实现自动化运维
- 支持优雅升级

与其它模式的关系:
- 与 Predictable Demands 模式配合
- 为 Automated Placement 提供依据

关键点:
- 是云原生应用的基础

## Slide 20
**总结**

Health Probe 模式要点:
1. 三种探针类型各有用途
2. 合理配置参数至关重要
3. 遵循最佳实践避免反模式
4. 监控探针状态确保有效性

> Health probes are essential for building robust, self-healing applications...

关键点:
- 健康检查是云原生应用的核心能力