---
class: lead
---
# Kubernetes Patterns
## Chapter 7: Batch Job

- 本章介绍批量作业模式，用于管理隔离的原子工作单元
- 基于 Job 资源运行短暂 Pod，直到完成
- 适用于有限工作负载的可靠执行

---
# Problem
Pod类型及其在不同场景下的局限性。

> The main primitive in Kubernetes for managing and running containers is the Pod. There are different ways of creating Pods with varying characteristics:

- Pod 是管理容器的主要原语，不同创建方式有不同特性
- 理解 Pod 类型有助于选择合适控制器
- 为批量作业奠定基础

---
# Problem
裸Pod的特性及其不适合生产环境的原因。

> Bare Pod It is possible to create a Pod manually to run containers. However, when the node such a Pod is running on fails, the Pod is not restarted. Running Pods this way is discouraged except for development or testing purposes. This mechanism is also known as unmanaged or naked Pods.

- 裸 Pod 手动创建，但节点失败不重启
- 仅限开发测试，不推荐生产
- 突出无管理 Pod 的局限性

---
# Problem
ReplicaSet控制器及其适用于长运行服务的适用性。

> ReplicaSet This controller is used for creating and managing the lifecycle of Pods expected to run continuously (e.g., to run a web server container). It maintains a stable set of replica Pods running at any given time and guarantees the availability of a specified number of identical Pods. ReplicaSets are described in detail in Chapter 11, “Stateless Service”.

- ReplicaSet 用于连续运行 Pod，如 Web 服务器
- 维护稳定副本集，保证可用性
- 适合无状态服务，非批量

---
# Problem
DaemonSet控制器及其平台级应用的用途。

> DaemonSet This controller runs a single Pod on every node and is used for managing platform capabilities such as monitoring, log aggregation, storage containers, and others. See Chapter 9, “Daemon Service”, for a more detailed discussion.

- DaemonSet 在每个节点运行单个 Pod
- 用于监控、日志聚合等平台功能
- 详见第 9 章，针对基础设施

---
# Problem
长运行Pod与批量作业需求的对比。

> A common aspect of these Pods is that they represent long-running processes that are not meant to stop after a certain time. However, in some cases there is a need to perform a predefined finite unit of work reliably and then shut ...

- 这些 Pod 代表长运行进程，但批量需有限工作
- 需要可靠执行预定义有限单元，然后关闭
- 识别长运行 vs 短运行的区别

---
# Solution
批量作业模式的定义和适用场景。

> The Batch Job pattern is suited for managing isolated atomic units of work. It is based on the Job resource, which runs short-lived Pods reliably until completion on a distributed environment.

- 批量作业模式管理隔离原子工作单元
- 基于 Job 资源运行短暂 Pod 直到完成
- 分布式环境可靠执行

---
# Solution
批量作业在其他模式中的应用扩展。

> To implement the patterns described in Chapter 7, “Batch Job”, or Chapter 8, “Peri‐ odic Job”, we often use this technique.

- 实现批量和周期作业常用此技术
- 连接到主动连接外部系统
- 扩展到调度场景

---
# Job
Job资源的核心机制和配置示例。

> A Job creates one or more Pods and will continue to retry execution of the Pods until a specified number of them successfully terminate.

- Job 创建一个或多个 Pod，重试直到指定数成功终止
- 核心重试机制确保可靠性
- 适用于失败恢复

---
# 
```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: pi
spec:
  template:
    spec:
      containers:
      - name: pi
        image: perl
        command: ["perl",  "-Mbignum=bpi", "-wle", "print bpi(2000)"]
      restartPolicy: Never
  backoffLimit: 4
```
- 示例：计算 pi 的 Job，backoffLimit 4 次重试
- restartPolicy Never 防止循环重启


---
# Work Queue
工作队列Job的分发机制。

> Similar to Work queue Jobs, you can distribute work items to individual Jobs without needing an external work queue.

- 工作队列 Job 分发工作项到单个 Job，无需外部队列
- 内部分发机制
- 简化架构

---
# Work Queue
并行处理在工作队列中的实现。

> When you specify .spec.completions to a value greater than 1, the Job will create that many Pods in parallel, each processing one item from the work queue.

- completions >1 时，并行创建 Pod，每个处理队列一项
- 并行处理提升效率
- 队列隐式管理

---
# Indexed Job
索引Job的工作分配方式。

> Indexed Jobs Similar to Work queue Jobs, you can distribute work items to individual Jobs without needing an external work queue. When ...

- 索引 Job 类似工作队列，分发无外部依赖
- 索引机制分配工作
- 精确控制分发

---
# Discussion
批量作业模式的整体益处。

> The Batch Job pattern enables reliable execution of finite tasks in Kubernetes.

- 批量模式确保有限任务可靠执行
- 结合 Job 类型适应不同规模
- 优化分布式批量处理



---

## Chapter 8: Periodic Job
周期作业模式的核心概念和问题背景。

- 本章扩展批量作业，添加时间维度
- 通过时序事件触发工作单元执行
- 适用于维护和业务周期任务

---
# Problem
分布式系统中周期任务的传统与现代对比。

> In the world of distributed systems and microservices, there is a clear tendency toward real-time and event-driven application interactions using HTTP and lightweight messaging. However, regardless of the latest trends in software development, job scheduling has a long history, and it is still relevant.

- 分布式系统趋向实时事件驱动，但调度历史悠久仍相关
- HTTP 和消息主导，但周期任务持久
- 平衡现代与传统需求

---
# Problem
周期作业的典型应用场景。

> Periodic jobs are commonly used for automating system maintenance or administrative tasks. They are also relevant to business applications requiring specific tasks to be performed periodically. Typical examples here are business-to-business integration through file transfer, application integration through database polling, sending newsletter emails, and cleaning up and archiving old files.

- 周期作业自动化维护和业务任务
- 示例：文件传输、数据库轮询、邮件发送、文件清理
- 展示实际应用场景

---
# Problem
传统调度工具的局限性。

> The traditional way of handling periodic jobs for system maintenance purposes has been to use specialized scheduling software or cron. However, specialized software can be expensive for simple use cases, and cron jobs running on a single server are difficult to maintain and represent a single point of failure.

- 传统用专用软件或 cron，但昂贵且单点故障
- 维护困难
- 突出云原生替代需求

---
# Problem
开发者自定义调度实现的常见做法。

> That is why, very often, developers tend to implement solutions that can handle both the scheduling aspect and the business logic that needs to be performed. For example, in the Java world, libraries such as Quartz, Spring Batch, and custom implementations with the `ScheduledThreadPoolExecutor ...

- 开发者常集成调度和业务逻辑，如 Quartz、Spring Batch
- ScheduledThreadPoolExecutor 自定义实现
- 避免外部依赖复杂性

---
# Solution
周期作业模式对批量模式的扩展。

> The Periodic Job pattern extends the Batch Job pattern by adding a time dimension and allowing the execution of a unit of work to be triggered by a temporal event.

- 周期作业扩展批量，添加时间触发
- 时序事件驱动执行
- 结合批量可靠性

---
# Solution
周期作业在执行单元上的益处。

> Chapter 8, “Periodic Job”, allows the execution of a unit of work to be ...

- 允许工作单元按时执行
- 模式核心益处
- 自动化周期操作

---
# CronJob
CronJob的配置和示例。

> Employ the Batch Job example to run periodic jobs according to a predefined schedule.

- 使用批量示例按预定义调度运行周期作业
- CronJob 实现
- 标准 Kubernetes 原语

---
# 
```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: hello
spec:
  schedule: "*/1 * * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: hello
            image: busybox
            imagePullPolicy: IfNotPresent
            command:
            - /bin/sh
            - -c
            - date; echo Hello from the Kubernetes cluster
          restartPolicy: OnFailure
```
- 示例：每分钟运行 hello Job
- schedule 使用 cron 语法


---
# Discussion
周期作业模式的整体优势。

> Periodic Job pattern automates recurring tasks reliably in Kubernetes.

- 可靠自动化重复任务
- 避免单点故障，提升可维护性
- 集成业务逻辑简化开发

---
# More Information
周期作业的参考资源。

> - Periodic Job Example
> - Kubernetes CronJob

- 示例和文档
- 调度配置细节
- 最佳实践

---

## Chapter 9: Singleton Service
单例服务模式的核心概念和问题背景。

- 本章确保应用只有一个活跃实例，同时高可用
- 模式实现单一实例管理
- 适用于控制器或独占资源服务

---
# Problem
单例服务模式的定义和实现挑战。

> The Singleton Service pattern ensures only one instance of an application is active at a time and yet is highly available. This pattern can be implemented from ...

- 确保单一活跃实例，同时高可用
- 实现挑战：平衡唯一性和可靠性
- 常见于独占场景

---
# Problem
单例服务模式的确保机制。

> The Singleton service pattern ensures that only one instance of an application is active at a time, yet highly available.

- 单一实例活跃，高可用保证
- 模式目标
- 防止多实例冲突

---
# Problem
单例模式在控制器中的应用。

> controllers use the Singleton Service pattern explained in Chapter 10.

- 控制器常用此模式
- 详见相关章节
- 扩展到高级用例

---
# Solution
单例服务模式的用途和范围。

> Purpose: Ensure that only one instance of a particular application or service is active at any time within the ...

- 确保特定应用单一活跃实例
- 核心目的
- 集群内唯一性

---
# Solution
Kubernetes中单例服务的实现方法。

> The Singleton Service pattern in Kubernetes is a method that ensures only one instance of an application is active at any ...

- Kubernetes 方法实现单一实例
- 活跃管理
- 资源协调

---
# 

> Use Deployment with replicas=1 for basic singleton.

- Deployment replicas=1 基本实现
- 简单配置
- 自动重启, 基础高可用

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: singleton
spec:
  replicas: 1
  selector:
    matchLabels:
      app: singleton
  template:
    metadata:
      labels:
        app: singleton
    spec:
      containers:
      - name: app
        image: singleton-image
```



---
# Pod Disruption Budget
PodDisruptionBudget在单例中的作用。

> Use PodDisruptionBudget to control voluntary disruptions.

- PDB 控制自愿中断
- 最小可用 Pod
- 提升稳定性

---
# Leader Election
领导者选举在高级单例中的应用。

> For advanced, use leader election to coordinate active instance.

- 领导者选举协调活跃实例
- 动态选择领导
- 处理故障切换

---
# Discussion
单例模式在分布式系统中的平衡作用。

> Singleton pattern balances uniqueness and availability in distributed systems.

- 平衡唯一性和可用性
- 结合 Deployment 和 PDB
- 适用于关键单一服务

