---
class: lead
---
# Kubernetes Patterns
## Chapter 5: Managed Lifecycle
- 本章聚焦容器如何响应平台生命周期事件
- 强调应用需适应自动化管理以成为优秀云原生公民
- 涵盖启动、关闭信号及钩子机制

---
# Problem
容器生命周期由平台驱动，需要应用响应事件以实现自动化管理。
> Containerized applications managed by cloud native platforms like Kubernetes have no control over their lifecycle and must listen to events emitted by the platform to adapt accordingly.

- 容器生命周期由平台驱动，无法自行掌控
- 应用需监听事件如信号或钩子来调整行为
- 这确保了与平台的协作，提升整体可管理性

---
# Problem
Managed Lifecycle模式指导应用响应事件以符合云原生规范。
> The Managed Lifecycle pattern describes how applications react to these lifecycle events, ensuring they behave as good cloud native citizens.

- 模式指导应用响应事件以符合云原生规范
- 好公民意味着快速响应、优雅处理变化
- 忽略事件可能导致不一致或资源浪费

---
# Problem
关键机制处理启动、关闭及其他生命周期阶段。
> This chapter covers key mechanisms for handling startup, shutdown, and other lifecycle phases at the container and Pod levels, including signals, hooks, init containers, and advanced techniques like entrypoint rewriting.

- 章节详述容器和 Pod 级别的处理机制
- 信号用于关闭，钩子辅助启动/停止，init 容器序贯初始化
- 入口点重写提供高级自定义控制

---
# Problem
云原生平台根据策略控制应用生命周期，应用需即时响应。
> Cloud native platforms drive application lifecycles based on policies and external factors, issuing commands to start or stop applications at any time.

- 平台根据策略和外部因素控制生命周期
- 随时发出启动或停止命令，应用需即时响应
- 这体现了云原生平台的自动化本质

---
# Problem
健康检查与生命周期管理区分，需双向互动以处理命令。
> While health checks (as discussed in Chapter 4) are read-only APIs for the platform to monitor state, lifecycle management requires the application to react to commands.

- 健康检查是单向监控，而生命周期需双向互动
- 应用必须执行命令如关闭资源或清理状态
- 区分监控与行动是设计关键

---
# Problem
容器视事件为平台API，选择性响应以确保一致性。
> Containers must determine which events to respond to and how, treating these as an API for platform communication.

- 容器视事件为平台 API，需选择性响应
- 如何响应影响资源释放和状态一致性
- 增强通信提升平台的预测性和可靠性

---
# Problem
应用可利用管理获益，或忽略非必需事件以避免复杂性。
> Applications can benefit from this management or ignore it if unnecessary.

- 应用可利用管理获益，或忽略非必需事件
- 益处包括优雅关闭和自动恢复
- 选择性响应避免不必要复杂性

---
# Problem
仅依赖进程状态不足以满足实际生命周期需求。
> Simply relying on process status for health or lifecycle control is insufficient for real-world needs, such as warm-up, graceful shutdowns, or fine-grained interactions.

- 仅依赖进程状态无法满足实际需求
- 热身、优雅关闭需专用机制
- 细粒度互动确保精确控制

---
# Problem
Pod作为部署单元，事件作用于容器级但支持Pod级控制。
> The deployment unit is a Pod (one or more containers), with events applied at the container level, though Pod-level constructs like init containers provide additional control.

- Pod 是部署单元，事件作用于容器级
- init 容器提供 Pod 级额外控制
- 层次化设计支持复杂场景

---
# Solution
实际应用需超出基本信号以实现全面生命周期管理。
> Real-world applications need more than basic process signals for lifecycle management.

- 实际应用超出基本信号需求
- 需要钩子和容器机制处理复杂阶段
- 提升从简单到全面的管理能力

---
# Solution
Kubernetes通过信号和钩子发出事件覆盖全生命周期。
> Kubernetes emits events like SIGTERM, SIGKILL, postStart, and preStop hooks (see Figure 5-1 for the managed container lifecycle).

- Kubernetes 通过信号和钩子发出事件
- 图 5-1 展示容器生命周期流程
- 这些事件覆盖启动到关闭全过程

---
# Solution
事件支持容器处理热身、干净关闭等任务以优化资源。
> These allow containers to handle startup warm-up, clean shutdowns, and other tasks.

- 事件支持热身、干净关闭等任务
- 容器可自定义响应逻辑
- 优化资源利用和用户体验

---
# Solution
init容器在Pod级序贯执行以保证初始化顺序。
> Init containers (detailed in Chapter 15) operate at the Pod level for sequential initialization.

- init 容器在 Pod 级序贯执行初始化
- 详见第 15 章
- 确保依赖顺序，避免并发问题

---
# SIGTERM Signal
SIGTERM作为温和关闭请求，用于Pod终止或重启场景。
> Kubernetes sends a SIGTERM signal to gently request a container shutdown, e.g., during Pod termination or liveness probe failure restarts.

- SIGTERM 是温和关闭请求信号
- 用于 Pod 终止或健康探针失败重启
- 给予应用机会有序退出

---
# SIGTERM Signal
收到SIGTERM后应用快速关闭以完成请求和清理资源。
> Applications should shut down quickly upon receipt, completing in-flight requests, releasing connections, and cleaning up resources (e.g., temp files).

- 收到后快速关闭，完成进行中请求
- 释放连接、清理临时文件
- 防止资源泄漏和不一致状态

---
# SIGTERM Signal
SIGTERM实现干净终止以避免后续强制SIGKILL。
> This enables a clean termination before a potential SIGKILL.

- 实现干净终止，避免强制 SIGKILL
- 提升关闭可靠性和可预测性
- 符合 POSIX 标准行为

---
# SIGKILL Signal
SIGTERM超时后Kubernetes发送SIGKILL强制终止。
> If the container doesn't shut down after SIGTERM, Kubernetes sends SIGKILL after a 30-second grace period (configurable via `.spec.terminationGracePeriodSeconds` in the Pod spec, though overridable).

- SIGTERM 后未关闭，30 秒宽限期后发 SIGKILL
- 可通过 Pod spec 配置宽限期
- 强制终止确保平台控制

---
# SIGKILL Signal
设计应用为短暂型以避免强制杀死风险。
> Design applications to be ephemeral with fast startup/shutdown to avoid forceful kills.

- 设计应用为短暂型，快速启动/关闭
- 避免强制杀死带来的风险
- 强调云原生应用的 disposable 特性

---
# PostStart Hook
postStart钩子在容器创建后异步执行，与主进程并行。
> Executed asynchronously after container creation, in parallel with the main process.

- 容器创建后异步执行，与主进程并行
- 不阻塞主启动，但影响 Pod 就绪
- 适合非关键热身任务

---
# PostStart Hook
postStart为阻塞调用，完成前延迟Pod就绪状态。
> It's a blocking call: the container status remains "Waiting" until completion, delaying Pod readiness.

- 阻塞调用，完成前容器状态为 Waiting
- 延迟 Pod 就绪直到钩子结束
- 确保预条件满足再接受流量

---
# PostStart Hook
postStart用于热身逻辑或预条件检查以防止无效启动。
> Use for warm-up logic, delaying startup, or preventing start if preconditions fail (e.g., nonzero exit code kills the main process).

- 用于热身逻辑、延迟启动或预条件检查
- 失败时非零退出码杀死主进程
- 防止无效实例运行

---
# PostStart Hook
postStart支持exec或httpGet处理程序，类似健康探针。
> Supports `exec` (run command in container) or `httpGet` (HTTP request to a port) handlers, similar to health probes.

- 支持 exec 或 httpGet 处理程序，类似健康探针
- 灵活选择执行方式
- 标准化接口便于集成

---
# PostStart Hook
postStart无执行保证，具有至少一次语义和无重试。
> No execution guarantees: at-least-once semantics, possible pre-start invocation, no retries on failed HTTP requests.

- 无执行保证：至少一次语义，可能预启动调用
- HTTP 失败无重试
- 需设计容错机制

---
# PostStart Hook
展示postStart钩子睡眠并写文件以同步状态。
> Example 5-1 shows a Pod with a postStart hook that sleeps 30 seconds and writes to a file for sync.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: post-start-hook
spec:
  containers:
  - image: k8spatterns/random-generator:1.0
    name: random-generator
    lifecycle:
      postStart:
        exec:
          command:
          - sh
          - -c
          - sleep 30 && echo "Wake up!" > /tmp/postStart_done
```

- 示例演示 30 秒睡眠并写文件同步
- 验证钩子执行并影响状态
- 实际中用于缓存预热或配置加载

---
# PreStop Hook
preStop钩子在终止前阻塞调用，支持优雅关闭。
> A blocking call sent before termination, with SIGTERM-like semantics for graceful shutdown when SIGTERM handling isn't feasible.

- 终止前阻塞调用，类似 SIGTERM 的优雅关闭
- 当信号处理不可行时使用
- 确保有序资源释放

---
# PreStop Hook
preStop必须在SIGTERM触发前完成以确保顺序。
> Must complete before the delete call triggers SIGTERM.

- 必须在删除调用触发 SIGTERM 前完成
- 顺序确保关闭一致性
- 避免并发终止问题

---
# PreStop Hook
preStop支持exec和httpGet，与postStart相同。
> Supports same handlers as postStart (`exec`, `httpGet`).

- 支持与 postStart 相同的 exec 和 httpGet
- 统一接口简化开发
- 便于 HTTP 端点集成

---
# PreStop Hook
preStop失败不阻止终止，平台优先关闭。
> Failure or delay doesn't prevent termination.

- 失败或延迟不阻止终止
- 平台优先确保关闭
- 设计时需考虑超时影响

---
# 
使用HTTP-based preStop钩子触发关闭端点。
> Example 5-2 shows an HTTP-based preStop hook.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pre-stop-hook
spec:
  containers:
  - image: k8spatterns/random-generator:1.0
    name: random-generator
    lifecycle:
      preStop:
        httpGet:
          path: /shutdown
          port: 8080
```

- 示例使用 HTTP GET 到 /shutdown 端点
- 触发应用内部关闭逻辑
- 适用于 Web 服务优雅排水

---
# Other Lifecycle Controls
Pod级init容器序贯运行以保证应用前初始化。
> Beyond container-level hooks, Pod-level init containers run sequentially to completion before application containers start, enabling guaranteed initialization (e.g., data setup, config).

- 超出容器钩子，init 容器序贯运行至完成
- 应用容器启动前保证初始化
- 如数据准备或配置设置

---
# Other Lifecycle Controls
init容器与钩子在粒度和保证上不同，通过表格对比。
> They differ from hooks in granularity and guarantees (see Table 5-1).

- 与钩子在粒度和保证上不同
- 表 5-1 对比详述
- 选择取决于序贯需求

---
# Other Lifecycle Controls
概述表格对比生命周期钩子与init容器的关键方面。
**Table 5-1: Lifecycle Hooks vs. Init Containers**

| Aspect                  | Lifecycle Hooks                                                                 | Init Containers                                                                 |
|-------------------------|---------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| Activates on            | Container lifecycle phases.                                                     | Pod lifecycle phases.                                                           |
| Startup phase action    | A postStart command.                                                            | A list of initContainers to execute.                                            |
| Shutdown phase action   | A preStop command.                                                              | No equivalent feature.                                                          |
| Timing guarantees       | A postStart command is executed at the same time as the container's ENTRYPOINT. | All init containers must be completed successfully before any application container can start. |
| Use cases               | Perform noncritical startup/shutdown cleanups specific to a container.          | Perform workflow-like sequential operations using containers; reuse containers for task executions. |

- 表格对比钩子和 init 容器的差异
- 钩子并行、非关键；init 序贯、保证性强
- 指导选择合适机制

---
# Other Lifecycle Controls
入口点重写用于高级控制，包装主命令以处理信号。
> For advanced control, use entrypoint rewriting (Commandlet pattern) to wrap the main command with a supervisor for signal handling and sequencing, useful in pipelines like Tekton or Argo CD.

- 高级控制用入口点重写，包装主命令
- 监督进程处理信号和序贯
- 适用于 Tekton 或 Argo CD 管道

---
# Other Lifecycle Controls
init容器复制监督二进制到共享卷以实现动态注入。
> This involves an init container copying a supervisor binary to a shared volume, then overriding the main container's command.

- init 容器复制监督二进制到共享卷
- 重写主容器命令
- 实现动态注入控制

---
# Other Lifecycle Controls
对比简单Pod与包装Pod以展示灵活性。
> Examples 5-3 and 5-4 illustrate simple vs. wrapped Pods.

- 示例 5-3 简单 Pod，5-4 包装 Pod
- 对比直接命令与监督包装
- 展示灵活性提升

---
# Other Lifecycle Controls
简单Pod示例，直接运行命令无额外包装。
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: simple-random-generator
spec:
  restartPolicy: OnFailure
  containers:
  - image: k8spatterns/random-generator:1.0
    name: random-generator
    command:
    - "random-generator-runner"
    args:
    - "--seed"
    - "42"
```

- 示例 5-3：简单命令/参数配置
- 直接运行无额外包装
- 基础场景适用

---
# Other Lifecycle Controls
包装Pod示例，通过监督入口点重写增强能力。
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: wrapped-random-generator
spec:
  restartPolicy: OnFailure



```

- 示例 5-4：通过监督入口点重写
- init 复制监督，共享卷注入
- 增强信号处理能力

---
# Other Lifecycle Controls
避免脚本紧耦合容器，优先钩子/init以促进模块化。
> Avoid tightly coupling scripts to containers for maintenance reasons; prefer hooks/init containers for reuse and guarantees.

- 避免脚本紧耦合容器，便于维护
- 优先钩子/init 容器以复用和保证
- 促进模块化和可移植性

---
# Other Lifecycle Controls
init容器分离关注点，提升资源效率并影响调度。
> Related Init Container Details (from Chapter 15 Excerpts): Init containers enable separation of concerns (e.g., app logic vs. init tasks) and resource efficiency, though they impact Pod scheduling based on their requests/limits (see Figure 15-2 for effective calculation).

- init 容器分离关注点，提升资源效率
- 影响 Pod 调度基于其请求/限制
- 图 15-2 显示有效计算

---
# Other Lifecycle Controls
init容器示例，克隆Git到共享卷以准备数据。
> Example 15-1 shows an init container cloning a Git repo into a shared `emptyDir` volume for an HTTP server app container.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: www
  labels:
    app: www
spec:
  initContainers:


```

- 示例 15-1：init 克隆 Git 到共享卷
- HTTP 服务器使用预置数据
- 展示数据准备分离

---
# Other Lifecycle Controls
调试技巧，临时替换命令为sleep以允许交互。
> For debugging, temporarily replace the app command with `sleep 3600`.

- 调试时临时替换命令为 sleep 3600
- 允许 kubectl exec 交互
- 快速故障排除技巧

---
# Other Lifecycle Controls
备选机制如sidecar或组合使用以适应不同需求。
> Alternatives include sidecars (for parallel runtime) or combining both.

- 备选：sidecar 并行运行，或组合使用
- 适应不同并行/序贯需求
- 扩展生命周期选项

---
# Other Lifecycle Controls
其他init技术如准入控制器和工具集成。
> Other init techniques: admission controllers/webhooks (mutate/validate at creation), deprecated Initializers/PodPresets, or tools like Metacontroller/Kyverno.

- 其他技术：准入控制器/webhook 变异/验证
- 已弃用 Initializers/PodPresets
- 工具如 Metacontroller/Kyverno

---
# Other Lifecycle Controls
Istio使用webhook注入代理，init设置iptables。
> Istio uses webhooks for proxy injection, with init containers setting up iptables.

- Istio 用 webhook 注入代理，init 设置 iptables
- 集成服务网格示例
- 展示高级网络初始化

---
# Discussion
云原生平台通过约束确保可靠扩展于不可靠基础设施。
> Cloud native platforms ensure reliable, predictable scaling on unreliable infrastructure via constraints and contracts.

- 云原生平台通过约束和契约确保可靠扩展
- 处理不可靠基础设施
- 预测性是核心优势

---
# Discussion
应用遵守信号行为以获益优雅生命周期管理。
> Applications must honor these (e.g., POSIX-like behavior for signals) to gain benefits like graceful startups/shutdowns with minimal impact.

- 应用须遵守如 POSIX 信号行为
- 获益优雅启动/关闭，低影响
- 互惠关系驱动生态

---
# Discussion
未来事件可能增强自适应，如扩展提示。
> Future events may include scaling hints or resource release signals.

- 未来事件可能含扩展提示或资源释放信号
- 增强自适应能力
- 演进中平台通信

---
# Discussion
生命周期全自动化，减少人为干预以规模化运营。
> Lifecycle is fully automated, not manual.

- 生命周期全自动化，非手动
- 减少人为错误
- 规模化运营基础

---
# Discussion
init容器序贯保证，促进团队协作和任务复用。
> Init containers provide sequential guarantees vs. parallel app containers, enabling focused, reusable tasks by different authors (e.g., devs for apps, engineers for init).

- init 提供序贯保证，对比并行应用容器
- 专注、可复用任务，不同作者协作
- 促进团队分工

---
# Discussion
集群内构建关联生命周期，简化规划并自动化更新。
> Building in-cluster (related to lifecycle via image management) reduces costs, simplifies planning, and enables automation like base image vulnerability redeploys.

- 集群内构建降低成本，简化规划
- 自动化如基础镜像漏洞重部署
- 与生命周期关联的图像管理


