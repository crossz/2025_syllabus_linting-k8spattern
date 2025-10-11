---
class: lead
---
# Kubernetes Patterns
## Chapter 3: Declarative Deployment
- 本章聚焦声明式部署模式，利用 Deployment 资源自动化升级和回滚
- 解决微服务更新负担，通过不同策略实现零停机或控制风险
- 强调从命令式到声明式的转变，提升可重复性和自动化

---
# Problem
概述：声明式部署的核心抽象。

> The heart of the Declarative Deployment pattern is the Kubernetes Deployment resource. This abstraction encapsulates the upgrade and rollback processes of a group of containers and makes its execution a repeatable and automated activity.

- Deployment 资源封装容器组的升级和回滚过程
- 将执行转化为可重复自动化活动
- 简化复杂部署操作

---
# Problem
概述：微服务增长带来的更新挑战。

> We can provision isolated environments as namespaces in a self-service manner and place the applications in these environments with minimal human intervention through the scheduler. But with a growing number of microservices, continually updating and replacing them with newer versions becomes an increasing burden too.

- 命名空间自服务和调度器最小干预放置应用
- 微服务数量增长使持续更新成为负担
- 手动处理不可规模化

---
# Problem
概述：升级活动的复杂性。

> Upgrading a service to a next version involves activities such as starting the new version of the Pod, stopping the old version of a Pod gracefully, waiting and verifying that it has launched successfully, and sometimes rolling it all back to the previous version in the case of failure.

- 升级涉及启动新 Pod、优雅停止旧 Pod、验证启动和故障回滚
- 每个步骤需精确协调
- 失败时快速恢复需求

---
# Problem
概述：停机与资源权衡。

> These activities are performed either by allowing some downtime but not running concurrent service versions, or with no downtime but increased resource usage due to both versions of the service running during the update process.

- 选择停机无并发或零停机双版本运行
- 资源使用增加是零停机代价
- 平衡可用性和效率

---
# Problem
概述：手动和脚本的局限。

> Performing these steps manually can lead to human errors, and scripting properly can require a significant amount of effort, both of which quickly turn the release process into a bottleneck.

- 手动易出错，脚本开发耗时
- 发布过程成瓶颈
- 需要自动化解决方案

---
# Solution
概述：Kubernetes 自动化升级。

> Luckily, Kubernetes has automated application upgrades as well. Using the concept of Deployment, we can describe how our application should be updated, using different strategies and tuning parameters, and let Kubernetes take care of the rest.

- Deployment 概念描述更新策略和参数
- Kubernetes 处理其余细节
- 声明式定义期望状态

---
# Solution
概述：Deployment 资源概述。

> The Deployment resource is responsible for creating and managing ReplicaSets, which in turn manage the Pods.

- Deployment 创建和管理 ReplicaSet，后者管理 Pod
- 层级抽象简化控制
- 确保期望副本数

---
# Rolling Deployment
概述：滚动部署策略介绍。

> The Rolling Deployment strategy, also known as RollingUpdate, is the default strategy for Deployments. It gradually replaces the old Pods with new ones.

- 渐进替换旧 Pod 为新 Pod
- 默认策略，确保最小中断
- 控制替换速率

---
# 
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: rolling-update-demo
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
```
- 示例配置 maxUnavailable 和 maxSurge
- 限制不可用和额外 Pod 数
- 调优以平衡速度和稳定性

---
# Rolling Deployment
概述：滚动更新机制。

> During a rolling update, the Deployment creates a new ReplicaSet with the updated Pod template and gradually scales it up while scaling down the old ReplicaSet.

- 新 ReplicaSet 基于更新 Pod 模板
- 渐进缩放新旧 ReplicaSet
- 替换速率控制

---
# Rolling Deployment
概述：暂停和恢复更新。

> You can pause and resume a rolling update to inspect the state of the Pods before continuing.

- 暂停更新检查 Pod 状态
- 然后恢复
- 调试和验证便利

---
# Fixed Deployment
概述：固定部署策略（Recreate）。

> The Fixed Deployment strategy, also known as Recreate, stops all Pods of the previous ReplicaSet and then starts all Pods of the new ReplicaSet.

- 先停止所有旧 Pod，然后启动新
- 导致短暂停机
- 适合无状态或测试场景

---
# Fixed Deployment
概述：适用场景。

> This strategy is useful when you cannot have old and new versions running concurrently, such as when the application is not backward compatible.

- 旧新版本不可并发，如无向后兼容
- 简单但有停机
- 资源利用低
---
# 
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: recreate-demo
spec:
  strategy:
    type: Recreate
```
- 示例 type: Recreate
- 直接配置
- 快速但中断性

---
# Blue-Green Release
概述：蓝绿部署介绍。

> The Blue-Green Release strategy involves running two identical environments, one active (blue) and one idle (green). You deploy the new version to the green environment and switch traffic to it once verified.

- 两个相同环境，蓝活跃绿闲置
- 新版本部署绿环境，验证后切换流量
- 零停机回滚易

---
# Blue-Green Release
概述：Kubernetes 实现。

> In Kubernetes, this can be implemented using two Deployments and a Service that points to the active one, switching the selector to route traffic.

- 两个 Deployment，Service 选择活跃
- 切换 selector 路由流量
- 验证后无中断

---
# Blue-Green Release
概述：回滚优势。

> If issues arise, you can switch back to the blue environment instantly.

- 问题时即时切换回蓝
- 最小风险
- 资源双倍消耗

---
# Canary Release
概述：金丝雀部署介绍。

> The Canary Release strategy deploys the new version to a small subset of users or instances and gradually increases exposure.

- 新版本小部分用户或实例
- 渐增暴露监控影响
- 风险控制

---
# Canary Release
概述：Kubernetes 实现方式。

> In Kubernetes, this can be achieved by creating a second Deployment with fewer replicas for the new version and adjusting the Service weights or using an Ingress controller for traffic splitting.

- 第二个 Deployment 少副本新版本
- Service 权重或 Ingress 分流
- 渐进流量转移
---
# 
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: canary-demo-v2
spec:
  replicas: 1  # Small subset
```
- 示例少副本 Deployment
- 与主 Deployment 并行
- 监控后缩放

---
# Canary Release
概述：监控和扩展。

> Monitor metrics from the canary Pods and scale it up or roll back based on performance.

- 监控金丝雀 Pod 指标
- 基于性能缩放或回滚
- 精细风险管理

---
# Discussion
概述：声明式部署益处。

> Declarative Deployment makes updates repeatable, automated, and less error-prone compared to imperative commands.

- 与命令式对比，更可重复自动化
- 减少人为错误
- 提升发布效率

---
# Discussion
概述：策略选择。

> Choose the strategy based on downtime tolerance, resource availability, and compatibility requirements.

- 根据停机容忍、资源和兼容选择策略
- 滚动适合零停机，Recreate 简单
- 蓝绿/金丝雀高级风险控制
