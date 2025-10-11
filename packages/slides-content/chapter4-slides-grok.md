---
class: lead
section: Chapter 4 Health Probe
---
# Kubernetes Patterns
## Chapter 4: Health Probe
- 本章探讨容器如何向 Kubernetes 报告健康状态
- 强调自动化恢复的重要性
- 核心机制：探针（Probes）帮助平台监控和维护应用

---
# Problem
介绍健康探针模式的核心问题定义。
> The Health Probe pattern dictates that every container should implement specific APIs to help the platform observe and maintain the application healthily.

- 容器可能以多种方式失败，如死锁或内存泄漏
- 没有健康检查，Kubernetes 无法检测问题并重启 Pod
- 这会导致应用不可用，影响整体系统稳定性

---
# Problem
扩展容器失败场景及自动化检测必要性。
> Containers can fail in various ways, and without proper health checks, Kubernetes cannot detect these failures and take corrective actions.

- 传统监控依赖人工或外部工具，效率低下
- 云原生环境需要自动化检测和恢复
- 探针提供标准化方式，让平台主动干预

---
# Solution
云原生应用的可观测性要求。
> To be fully automatable, a cloud native application must be highly observable and communicate its health state to the platform.

- Kubernetes 通过三种探针实现健康检查：存活（Liveness）、就绪（Readiness）和启动（Startup）
- 这些探针是 HTTP、TCP 或命令执行形式
- 允许开发者定义应用特定健康标准

---
# Solution
Kubernetes三种探针类型及通用特性。
> Kubernetes provides three types of probes: liveness probe, readiness probe, and startup probe.

- 探针定期执行，失败时触发相应动作
- 设计时考虑探针开销，避免额外负载
- 结合使用可实现细粒度控制

---
# Liveness Probe
存活探针的作用及触发机制。
> The liveness probe is used to detect situations where a container is in a broken state and needs to be restarted.

- 如果探针失败，Kubernetes 会重启容器
- 适用于检测死锁或崩溃场景
- 配置参数：initialDelaySeconds、periodSeconds 等

---
# Liveness Probe
存活探针的HTTP实现示例。
> For example, a liveness probe can be an HTTP GET request to a health endpoint that returns a 200 status if the application is healthy.

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
```
- 示例中，延迟 30 秒开始检查，每 10 秒一次
- 失败阈值（failureThreshold）决定重启时机
- 防止频繁重启导致不稳定

---
# Readiness Probe
就绪探针的功能及流量控制。
> The readiness probe determines whether a container is ready to accept traffic.

- 失败时，从 Service 端点移除，停止流量路由
- 确保只向健康实例发送请求
- 与 liveness 不同，不触发重启

---
# Readiness Probe
就绪探针的典型HTTP配置示例。
> A common implementation is an HTTP probe that checks if the application has loaded its configuration and is able to serve requests.

```yaml
readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5
```
- 启动后快速检查，就绪后加入负载均衡
- 适用于多阶段启动的应用
- 提升流量处理的可靠性

---
# Startup Probe
启动探针对慢启动容器的设计目的。
> The startup probe is designed for containers that take a long time to initialize.

- 防止 liveness 在启动期误杀慢启动容器
- 成功后，切换到 liveness 和 readiness
- 参数类似，但 failureThreshold 更高

---
# Startup Probe
启动探针的配置及应用场景。
> For slow-starting applications, like those performing database migrations, a startup probe can delay the liveness checks.

```yaml
startupProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 0
  periodSeconds: 10
  failureThreshold: 30  # Allows 5 minutes
```
- 阈值 30 次失败才视为失败，给予足够时间
- 适用于复杂初始化过程
- 优化启动体验，避免不必要重启

---
# Discussion
健康探针的实施注意事项。
> Health probes are essential for self-healing in Kubernetes, but they must be implemented carefully to avoid false positives or negatives.

- 探针应轻量，避免影响性能
- 测试不同失败场景，确保正确行为
- 监控探针失败率，作为应用健康指标

---
# Discussion
三种探针的综合应用益处。
> Combining all three probes provides comprehensive health management for containers.

- liveness 确保长期稳定性
- readiness 优化流量分布
- startup 处理初始化变异性
- 整体提升应用的弹性和可用性

---
# More Information
提供进一步学习资源的概述。
> Kubernetes Documentation: Configure Liveness, Readiness and Startup Probes

- 官方文档提供详细配置指南
- 示例代码和最佳实践
- 社区资源如 Katacoda 实验室用于实践

