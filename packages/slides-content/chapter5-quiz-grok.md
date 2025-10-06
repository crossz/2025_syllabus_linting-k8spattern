### 题目清单

1. 填空题：Kubernetes 中的容器有由平台管理的（ ），应用程序需要符合此生命周期以确保平稳操作和优雅处理事件，如启动、关闭和重启。

答案: lifecycle

原文: Containers in Kubernetes have a lifecycle managed by the platform, and applications need to conform to this lifecycle to ensure smooth operation and graceful handling of events such as startup, shutdown, and restarts.

2. 单选题：如果应用程序未设计为处理生命周期事件，可能导致什么？（ ）
A. 自动缩放
B. 数据丢失或服务中断
C. 网络优化
D. 存储扩展

答案: B. 数据丢失或服务中断

原文: However, developers must ensure applications are designed to handle these events, as failure to do so can lead to data loss or service disruptions.

3. 填空题：Managed Lifecycle 模式描述了应用程序如何能够并应该对生命周期事件做出（ ）。

答案: react

原文: The Managed Lifecycle pattern describes how applications can and should react to these lifecycle events.

4. 单选题：Kubernetes 提供哪些机制管理容器生命周期？（ ）
A. 只使用重启策略
B. 处理信号如 SIGTERM 和 SIGKILL，以及生命周期钩子如 PostStart 和 PreStop
C. 只使用探针
D. 只使用调度

答案: B. 处理信号如 SIGTERM 和 SIGKILL，以及生命周期钩子如 PostStart 和 PreStop

原文: Kubernetes provides mechanisms for managing the lifecycle of containers, allowing applications to react to platform events. This includes handling signals like SIGTERM and SIGKILL, as well as using lifecycle hooks such as PostStart and PreStop.

5. 填空题：当容器需要终止时，Kubernetes 首先发送（ ）信号，给应用程序机会执行清理任务。

答案: SIGTERM

原文: Kubernetes sends a SIGTERM signal to a container when it needs to terminate, giving the application a chance to perform cleanup tasks before shutting down.

6. 单选题：SIGTERM 信号允许容器执行什么？（ ）
A. 初始化任务
B. 清理任务，如关闭连接或保存状态
C. 重启进程
D. 加载配置

答案: B. 清理任务，如关闭连接或保存状态

原文: The container should handle this signal to ensure a graceful shutdown, such as closing connections or saving state.

7. 填空题：如果容器在接收 SIGTERM 后未在宽限期内终止，Kubernetes 会发送（ ）信号强制终止。

答案: SIGKILL

原文: If the container does not terminate within a specified grace period after receiving SIGTERM, Kubernetes sends a SIGKILL signal to force termination.

8. 单选题：SIGKILL 信号会导致什么？（ ）
A. 优雅关闭
B. 强制终止，无机会清理
C. 延迟重启
D. 通知其他 Pod

答案: B. 强制终止，无机会清理

原文: SIGKILL is a forceful termination that does not give the application a chance to clean up.

9. 填空题：PostStart 钩子在容器创建后立即执行，用于执行初始化任务，如下载配置文件或设置（ ）。

答案: environment

原文: The PostStart hook is executed immediately after a container is created. It is useful for performing initialization tasks, such as downloading configuration files or setting up the environment.

10. 单选题：PostStart 钩子在 Pod 规范中的路径是？（ ）
A. spec.containers.lifecycle.postStart
B. spec.probes.liveness
C. spec.terminationGracePeriodSeconds
D. spec.restartPolicy

答案: A. spec.containers.lifecycle.postStart

原文: The PostStart hook is defined under spec.containers.lifecycle.postStart in the Pod specification.

11. 填空题：PreStop 钩子在容器终止前被调用，允许执行清理任务，如刷新日志或关闭（ ）连接。

答案: network

原文: The PreStop hook is called before a container is terminated, allowing for cleanup tasks such as flushing logs or closing network connections.

12. 单选题：PreStop 钩子执行的时机是？（ ）
A. 容器启动后
B. 发送 SIGTERM 前
C. 发送 SIGKILL 前
D. Pod 删除后

答案: B. 发送 SIGTERM 前

原文: The PreStop hook is invoked before sending the SIGTERM signal.

13. 填空题：终止宽限期指定发送 SIGTERM 后 Kubernetes 等待的时间（ ）秒，然后发送 SIGKILL。

答案: in

原文: The termination grace period specifies the time in seconds that Kubernetes waits after sending SIGTERM before sending SIGKILL.

14. 单选题：重启策略的选项包括 Always、OnFailure 和（ ）。

答案: Never

原文: Restart Policy: Defines how Pods should be restarted if they fail, with options like Always, OnFailure, and Never.

15. 填空题：活性和就绪探针虽然主要用于健康检查，但它们间接影响生命周期管理，通过确定容器何时被视为（ ）或准备接收流量。

答案: alive

原文: Liveness and Readiness Probes: While primarily for health checking (covered in Chapter 4, "Health Probe"), they indirectly influence lifecycle management by determining when a container is considered alive or ready to receive traffic.

16. 单选题：PostStart 和 PreStop 钩子特别重要于什么类型的应用程序？（ ）
A. 无状态
B. 有状态，需要初始化或清理
C. 批处理
D. 守护进程

答案: B. 有状态，需要初始化或清理

原文: The use of hooks like PostStart and PreStop is particularly important for stateful applications that need to perform initialization or cleanup.

17. 填空题：这些生命周期控制确保容器可以被（ ）管理，并与平台对可扩展性和可靠性的期望一致。

答案: predictably

原文: These controls ensure that containers can be managed predictably and align with platform expectations for scalability and reliability.

18. 单选题：terminationGracePeriodSeconds 的默认值是多少？（ ）
A. 0
B. 30
C. 60
D. 120

答案: B. 30

原文: The default terminationGracePeriodSeconds is 30.

19. 填空题：管理生命周期对于确保应用程序优雅处理平台事件至关重要，如果失败可能导致（ ）或服务中断。

答案: data loss

原文: Failure to manage lifecycle properly can lead to data loss or service disruptions.

20. 单选题：本章示例中使用的镜像是？（ ）
A. nginx:1.0
B. k8spatterns/random-generator:1.0
C. busybox:latest
D. alpine:3.0

答案: B. k8spatterns/random-generator:1.0

原文: image: k8spatterns/random-generator:1.0

### PPT Slides 文字稿

**Slide 1: 标题页**  
标题: Kubernetes Patterns - Chapter 5: Managed Lifecycle (扩展版)  
副标题: Reusable Elements for Designing Cloud Native Applications (Second Edition)  
作者: Bilgin Ibryam & Roland Huß  
内容概述: 本PPT详细覆盖 Managed Lifecycle 模式，扩展为20页，深入信号、钩子和控制。  
(包括书籍封面图片)

**Slide 2: 章节概述 (1/2)**  
主要内容:  
- Chapter 5: Managed Lifecycle (页51-59)。  
- 结构: Problem, Solution, SIGTERM, SIGKILL, PostStart, PreStop, Other Controls, Discussion。  
关键点:  
- 焦点: 容器生命周期管理。  
(引用原文: Containers in Kubernetes have a lifecycle managed by the platform...)

**Slide 3: 章节概述 (2/2)**  
主要内容:  
- 与 Foundational Patterns 相关 (Part I)。  
- 目标: 优雅处理启动/关闭事件。  
关键点:  
- 避免数据丢失。  
(引用原文: The Managed Lifecycle pattern describes how applications can and should react...)

**Slide 4: Problem - 生命周期挑战 (1/2)**  
主要内容:  
- 容器生命周期由平台管理: 启动、运行、终止。  
- 应用需符合以确保平稳操作。  
关键点:  
- 事件: startup, shutdown, restarts。  
(引用原文: Applications need to conform to this lifecycle to ensure smooth operation...)

**Slide 5: Problem - 生命周期挑战 (2/2)**  
主要内容:  
- 不符合导致: 数据丢失、服务中断。  
- 开发者责任: 设计处理事件。  
关键点:  
- 分布式应用复杂性。  
(引用原文: Failure to do so can lead to data loss or service disruptions.)

**Slide 6: Solution - 概述 (1/2)**  
主要内容:  
- 机制: 信号 (SIGTERM/SIGKILL), 钩子 (PostStart/PreStop)。  
- 允许应用响应平台事件。  
关键点:  
- 自动化管理。  
(引用原文: Kubernetes provides mechanisms for managing the lifecycle of containers...)

**Slide 7: Solution - 概述 (2/2)**  
主要内容:  
- 其他: 终止宽限期、重启策略、探针影响。  
- 确保 predictable 管理。  
关键点:  
- 与可扩展性对齐。  
(引用原文: These controls ensure that containers can be managed predictably...)

**Slide 8: SIGTERM Signal - 概念**  
主要内容:  
- 终止时首先发送，给清理机会。  
- 应用处理: 关闭连接、保存状态。  
关键点:  
- Graceful shutdown。  
(引用原文: Kubernetes sends a SIGTERM signal... giving the application a chance...)

**Slide 9: SIGTERM Signal - 示例**  
主要内容:  
- 示例: 应用捕获 SIGTERM 执行 cleanup。  
- YAML: terminationGracePeriodSeconds: 30。  
关键点:  
- 默认等待30秒。  
(插入相关 YAML 代码块)

**Slide 10: SIGKILL Signal - 概念**  
主要内容:  
- SIGTERM 后宽限期超时发送。  
- 强制终止，无清理。  
关键点:  
- Non-graceful shutdown。  
(引用原文: If the container does not terminate within... Kubernetes sends a SIGKILL signal...)

**Slide 11: SIGKILL Signal - 影响**  
主要内容:  
- 风险: 未完成操作丢失。  
- 建议: 宽限期内完成关键任务。  
关键点:  
- 配置 .spec.terminationGracePeriodSeconds。  
(引用原文: SIGKILL is a forceful termination that does not give the application a chance...)

**Slide 12: PostStart Hook - 概念**  
主要内容:  
- 容器创建后立即执行。  
- 用于: 下载配置、设置环境。  
关键点:  
- 同步/异步执行。  
(引用原文: The PostStart hook is executed immediately after a container is created...)

**Slide 13: PostStart Hook - 配置示例**  
主要内容:  
- YAML 示例:  
```yaml
spec:  
  containers:  
  - name: app  
    lifecycle:  
      postStart:  
        exec:  
          command: ["/bin/sh", "-c", "echo Hello from PostStart"]  
```  
关键点:  
- 在 spec.containers.lifecycle.postStart。  
(插入 Example 5-1 YAML)

**Slide 14: PreStop Hook - 概念**  
主要内容:  
- 终止前调用，SIGTERM 前。  
- 用于: 刷新日志、关闭连接。  
关键点:  
- 阻塞终止直到完成。  
(引用原文: The PreStop hook is called before a container is terminated...)

**Slide 15: PreStop Hook - 配置示例**  
主要内容:  
- YAML 示例:  
```yaml
spec:  
  containers:  
  - name: app  
    lifecycle:  
      preStop:  
        exec:  
          command: ["/bin/sh", "-c", "echo Goodbye from PreStop"]  
```  
关键点:  
- 确保清理。  
(插入 Example 5-2 YAML)

**Slide 16: Other Lifecycle Controls - 终止宽限期**  
主要内容:  
- .spec.terminationGracePeriodSeconds: 默认30秒。  
- 控制 SIGTERM 到 SIGKILL 等待。  
关键点:  
- 自定义以匹配应用需求。  
(引用原文: The termination grace period specifies the time in seconds...)

**Slide 17: Other Lifecycle Controls - 重启策略**  
主要内容:  
- .spec.restartPolicy: Always (默认), OnFailure, Never。  
- 影响失败 Pod 行为。  
关键点:  
- Job 使用 Never。  
(引用原文: Restart Policy: Defines how Pods should be restarted if they fail...)

**Slide 18: Other Lifecycle Controls - 探针影响**  
主要内容:  
- Liveness/Readiness: 间接影响 (Chapter 4)。  
- Startup: 延迟其他探针。  
关键点:  
- 全面生命周期。  
(引用原文: Liveness and Readiness Probes... indirectly influence lifecycle management...)

**Slide 19: Discussion - 最佳实践 (1/2)**  
主要内容:  
- 钩子适合 stateful 应用。  
- 最小化宽限期以避免延迟。  
关键点:  
- 测试 graceful shutdown。  
(引用原文: The use of hooks like PostStart and PreStop is particularly important for stateful applications...)

**Slide 20: Discussion - 最佳实践 (2/2) & 总结**  
主要内容:  
- 讨论: 提升可靠性和可扩展性。  
- 总结: 关键于云原生设计。  
- 与题目: 覆盖信号、钩子、策略。  
关键点:  
- 参考 k8spatterns.io。  
(引用原文: Managing the lifecycle of containers is crucial for ensuring applications can handle platform events gracefully...)
