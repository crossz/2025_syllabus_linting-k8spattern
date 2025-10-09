好的，这是根据您提供的“Kubernetes Patterns”第 3 章内容准备的 20 道测验题和一个 20 页的 PPT 文字稿。

***

### Kubernetes 声明式部署 (Declarative Deployment) - 测验题

#### 选择题

1.  Kubernetes 的 `Deployment` 资源与旧的 `kubectl rolling-update` 命令相比，其核心优势在于？
    A. 客户端命令更简单
    B. 它是一种声明式的方法，在服务器端执行更新，而不是客户端命令式的步骤
    C. 它只支持 `Recreate` 策略
    D. 更新速度总是更快
    \
    **答案：B**
    **原文出处**: "The difference is that kubectl rollout manages an application update on the server side by updating the Deployment declaration and leaving it to Kubernetes to perform the update. The kubectl rolling-update command, in contrast, was imperative: the client kubectl told the server what to do for each update step."

2.  在 `RollingUpdate` (滚动更新) 策略中，`maxSurge` 参数的作用是什么？
    A. 定义在更新过程中最多可以有多少个 Pod 处于不可用状态
    B. 定义在更新过程中，Pod 总数可以比期望副本数多出多少个
    C. 定义一个新的 Pod 在被认为是可用之前需要成功运行的最短时间
    D. 定义回滚到上一个版本的速度
    \
    **答案：B**
    **原文出处**: "Number of Pods that can be run temporarily in addition to the replicas specified during an update."

3.  `Recreate` (重建) 部署策略的主要缺点是什么？
    A. 会暂时占用双倍的资源
    B. 在新旧版本切换期间会导致服务停机
    C. 无法回滚到旧版本
    D. 新旧两个版本的 Pod 会同时运行
    \
    **答案：B**
    **原文出处**: "The result of this sequence is that downtime occurs while all containers with old versions are stopped, and no new containers are ready to handle incoming requests."

4.  哪种部署策略最适合于发布包含向后不兼容 API 更改的服务，以确保客户端不会同时连接到新旧两个版本的服务？
    A. `RollingUpdate`
    B. `Recreate`
    C. `Blue-Green` (蓝绿部署)
    D. `Canary` (金丝雀发布)
    \
    **答案：B**
    **原文出处**: "That may cause issues for the service consumers, especially when the update process has introduced backward incompatible changes in the service APIs and the client is not capable of dealing with them. For this kind of scenario, you can use the Recreate strategy..."

5.  蓝绿部署 (Blue-Green Deployment) 的核心操作原理是什么？
    A. 逐步用新版本的 Pod 替换旧版本的 Pod
    B. 同时部署一个完整的、独立的“绿色”环境，然后通过修改 Service 的 selector 将实时流量一次性切换过去
    C. 先将一小部分流量引导到新版本，验证后再全量切换
    D. 停止所有旧版本 Pod，然后启动所有新版本 Pod
    \
    **答案：B**
    **原文出处**: "Technically, it works by creating a second Deployment, with the latest version of the containers (let’s call it green)... Once we are confident that the new version of the Pods is healthy and ready to handle live requests, we switch the traffic from old Pod replicas to the new replicas. You can do this in Kubernetes by updating the Service selector to match the new containers (labeled with green)."

6.  金丝雀发布 (Canary Release) 的主要目的是什么？
    A. 实现零停机部署
    B. 在生产环境中通过将一小部分用户流量引导至新版本，来降低引入新版本的风险
    C. 节省部署过程中所需的资源
    D. 确保一次只有一个版本的应用在运行
    \
    **答案：B**
    **原文出处**: "This technique reduces the risk of introducing a new version into production by letting only some of the consumers reach the updated version."

7.  为什么说一个成功的声明式部署依赖于容器本身是“良好的云原生公民”？
    A. 因为容器必须使用特定的基础镜像
    B. 因为平台需要通过健康探针 (`Health Probe`) 和生命周期事件 (`Managed Lifecycle`) 来可靠地启停 Pod
    C. 因为容器必须暴露一个 metrics 端点
    D. 因为容器必须是无状态的
    \
    **答案：B**
    **原文出处**: "For this to work as expected, the containers themselves usually listen and honor lifecycle events (such as SIGTERM; see Chapter 5, “Managed Lifecycle”) and also provide health-check endpoints as described in Chapter 4, “Health Probe”, which indicate whether they started successfully."

8.  在滚动更新期间，`maxUnavailable` 参数设置为 `1`，副本数为 `3`，这意味着什么？
    A. 在任何时候，最多只能有1个新版本的 Pod 在运行
    B. 在任何时候，最少必须有2个 Pod 在提供服务
    C. 更新完成后，最多可以有1个 Pod 处于失败状态
    D. 整个更新过程中，总共只能有1个 Pod 被更新
    \
    **答案：B**
    **原文出处**: "Number of Pods that may be unavailable during the update. Here it could be that only two Pods are available at a time during the update."

9.  与 Kubernetes 内置的 `Deployment` 相比，像 Flagger 或 Argo Rollouts 这样的高级工具提供了什么核心能力？
    A. 它们允许使用 YAML 文件来定义部署
    B. 它们为蓝绿部署和金丝雀发布等高级策略提供了原生的、自动化的支持，包括基于指标的自动回滚
    C. 它们可以管理有状态应用
    D. 它们是唯一可以执行滚动更新的方式
    \
    **答案：B**
    **原文出处**: "It supports canary and Blue-Green deployments... It can also monitor the status of the rollout process based on a custom metric and detect if the rollout fails so that it can trigger an automatic rollback."

10. 蓝绿部署相对于滚动更新的一个主要缺点是什么？
    A. 会导致服务中断
    B. 在新旧版本并存期间，需要大约两倍的应用容量资源
    C. 无法处理数据库状态的变更
    D. 切换流量的过程非常缓慢
    \
    **答案：B**
    **原文出处**: "The downside is that it requires twice the application capacity while both blue and green containers are up and running."

11. 在 `RollingUpdate` 策略中，`minReadySeconds` 参数的用途是？
    A. 设置 Pod 启动的超时时间
    B. 一个新 Pod 在启动后，其就绪探针需要持续成功多长时间才被认为本次发布是成功的，然后继续下一步更新
    C. 整个部署过程必须完成的最短时间
    D. 两个 Pod 更新之间的最小间隔时间
    \
    **答案：B**
    **原文出处**: "This field specifies the duration in seconds that the readiness probes of a Pod need to be successful until the Pod itself is considered to be available in a rollout."

12. 哪种场景最适合使用 `RollingUpdate` 策略？
    A. 需要快速回滚的应用
    B. 对停机时间非常敏感且新旧版本 API 兼容的无状态服务
    C. 单体应用的大版本升级
    D. 数据库模式（schema）的重大变更
    \
    **答案：B**
    **原文出处**: "RollingUpdate strategy behavior ensures there is no downtime during the update process." (This implies it's good for downtime-sensitive applications, and the text contrasts it with `Recreate` which is used for backward-incompatible changes).

13. 在 Kubernetes 中，蓝绿部署和金丝雀发布是如何基于 `Deployment` 资源实现的？
    A. 它们是 `Deployment` 策略中的内置选项
    B. 它们通常通过操作多个 `Deployment` 资源和修改 `Service` 资源的流量路由规则来手动或通过高级工具实现
    C. 它们需要使用 `StatefulSet` 而不是 `Deployment`
    D. 它们只能通过 `kubectl patch` 命令实现
    \
    **答案：B**
    **原文出处**: "A Blue-Green deployment needs to be done manually... Technically, it works by creating a second Deployment... In Kubernetes, this technique [Canary] can be implemented by creating a new Deployment with a small replica count..."

14. `Deployment` 资源通过创建和管理哪个更底层的资源来保证 Pod 的副本数量？
    A. `Pod`
    B. `Service`
    C. `ReplicaSet`
    D. `Job`
    \
    **答案：C**
    **原文出处**: "Behind the scenes, the Deployment creates a ReplicaSet that supports set-based label selectors."

15. 为什么说 `Deployment` 的定义本身是“可执行的对象，而不仅仅是文档”？
    A. 因为它可以用 `kubectl apply` 命令直接在集群上执行和测试
    B. 因为它包含了二进制代码
    C. 因为它会自动生成测试用例
    D. 因为它需要被编译
    \
    **答案：A**
    **原文出处**: "The Deployment definition is an executable object and more than just documentation. It can be tried and tested on multiple environments before reaching production."

#### 填空题

16. `RollingUpdate` (滚动更新) 策略的副作用是在更新过程中，新旧两个版本的容器会\_\_\_\_\_\_\_\_\_\_。
    \
    **答案：同时运行 (running at the same time)**
    **原文出处**: "However, the side effect of this approach is that during the update process, two versions of the container are running at the same time."

17. Kubernetes 的 `Deployment` 抽象将应用的升级和回滚过程封装起来，使其成为一个可重复的\_\_\_\_\_\_\_\_\_\_活动。
    \
    **答案：自动化 (automated)**
    **原文出处**: "This abstraction encapsulates the upgrade and rollback processes of a group of containers and makes its execution a repeatable and automated activity."

18. 蓝绿部署和金丝雀发布这两种发布策略，通常依赖于\_\_\_\_\_\_\_\_\_\_的决策来触发流量切换。
    \
    **答案：人工 (human)**
    **原文出处**: "The latter two release strategies are based on a human decision for the transition trigger and as a consequence are not fully automated by Kubernetes but require human interaction."

19. `Deployment` 的声明式特性在于它描述了部署的\_\_\_\_\_\_\_\_\_\_应该是什么样子，而不是达到该状态所需的具体步骤。
    \
    **答案：最终状态 (deployed state)**
    **原文出处**: "The declarative nature of Deployment specifies how the deployed state should look rather than the steps necessary to get there."

20. 像 Flagger, Argo Rollouts 和 Knative 这样的高级部署平台，都利用了在第28章中描述的\_\_\_\_\_\_\_\_\_\_模式。
    \
    **答案：Operator (Operator pattern)**
    **原文出处**: "Those extensions all leverage the Operator pattern described in Chapter 28 and introduce their own custom resources for describing the desired rollout behavior."

***

### Kubernetes 声明式部署 (Declarative Deployment) - PPT 文字稿

#### **Slide 1: 标题页**

* **标题**: Kubernetes 模式：声明式部署 (Declarative Deployment)
* **副标题**: 告别手动发布，拥抱自动化与可靠性
* **主讲人**: [您的名字]
* **日期**: [日期]

#### **Slide 2: 议程**

* **标题**: 本次分享内容
* **要点**:
    * **问题**: 为什么手动更新应用是痛苦的？
    * **核心理念**: 声明式 vs 命令式
    * **解决方案**: Kubernetes `Deployment` 资源
    * **内置策略详解**:
        * 滚动更新 (`RollingUpdate`)
        * 重建 (`Recreate`)
    * **高级发布策略**:
        * 蓝绿部署 (`Blue-Green`)
        * 金丝雀发布 (`Canary`)
    * **超越内置**: 更高级的部署工具
    * **总结与对比**

#### **Slide 3: 问题：发布的困境**

* **标题**: 手动更新的噩梦
* **痛点**:
    * **操作繁琐**: 启动新版 -> 验证健康 -> 停止旧版 -> ...
    * **易于出错**: 人为操作总有风险，一个错误命令就可能导致服务中断。
    * **难以重复**: 不同环境的发布流程难以保持一致。
    * **回滚复杂**: 出现问题时，手动回滚到上一个稳定版本既耗时又紧张。
    * **发布过程成为瓶颈**，拖慢了整个开发迭代速度。

#### **Slide 4: 核心理念：声明式 vs 命令式**

* **标题**: 两种不同的思维方式
* **命令式 (Imperative)**:
    * **你告诉系统“如何做”**。
    * 例如: `kubectl rolling-update`: "先启动一个新 Pod，再停止一个旧 Pod，重复此过程..."
    * **缺点**: 客户端需要维护状态，如果客户端中断，更新过程就会中断。
* **声明式 (Declarative)**:
    * **你告诉系统“你想要什么”**。
    * 例如: `Deployment` YAML: "我想要3个副本，镜像版本是 `v1.1`"。
    * **优点**: Kubernetes 控制器会在**服务端**持续工作，直到集群状态与你的声明一致。这是更健壮、更可靠的方式。

#### **Slide 5: 解决方案：`Deployment` 资源**

* **标题**: Kubernetes 应用发布的基石
* **核心功能**:
    * 一个 `Deployment` 资源描述了一个应用的期望状态（副本数、容器镜像、更新策略等）。
    * 它通过管理底层的 `ReplicaSet` 来实现这一目标。
    * 将应用的**更新**和**回滚**变成了一个可重复、可版本控制的自动化活动。

#### **Slide 6: 部署成功的前提**

* **标题**: 应用需要是“良好的云原生公民”
* `Deployment` 能够自动化地管理你的应用，前提是它能理解你的应用状态。
* **两大前提**:
    1.  **健康探针 (Health Probes)**:
        * 应用必须提供 `readinessProbe`，告诉 Kubernetes 它什么时候**准备好**接收流量。这是零停机更新的关键。
    2.  **生命周期管理 (Managed Lifecycle)**:
        * 应用必须能响应 `SIGTERM` 信号，实现**优雅关闭**。

#### **Slide 7: 内置策略 1: 滚动更新 (`RollingUpdate`)**

* **标题**: 平滑过渡，零停机
* **工作方式**:
    * 逐步地、一个接一个地用新版本的 Pod 替换旧版本的 Pod。
    * 在整个更新过程中，服务始终可用，流量在新旧版本的 Pod 之间平滑过渡。
    * 这是 `Deployment` 的**默认**策略。

#### **Slide 8: `RollingUpdate` 的关键参数**

* **标题**: 精确控制更新节奏
* **`.spec.strategy.rollingUpdate`**:
    * `maxSurge`:
        * 定义更新时 Pod 总数可以**超出**期望副本数的最大数量。
        * 例如：`replicas: 3`, `maxSurge: 1` -> 更新时最多可以有 4 个 Pod。
    * `maxUnavailable`:
        * 定义更新时**不可用**的 Pod 的最大数量。
        * 例如：`replicas: 3`, `maxUnavailable: 1` -> 更新时必须保证至少有 2 个 Pod 可用。

#### **Slide 9: `RollingUpdate` 动画演示**

* **图示 (动画)**:
    1.  初始状态: 3 个 v1.0 的 Pod 正在运行。
    2.  `maxSurge: 1`, `maxUnavailable: 1`
    3.  步骤 1: 启动 1 个 v1.1 的 Pod (总数 4)。
    4.  步骤 2: 等待 v1.1 Pod 就绪 (Ready)。
    5.  步骤 3: 停止 1 个 v1.0 的 Pod (总数 3)。
    6.  重复此过程，直到所有 Pod 都更新为 v1.1。

#### **Slide 10: 内置策略 2: 重建 (`Recreate`)**

* **标题**: 先破后立，简单粗暴
* **工作方式**:
    1.  立即停止**所有**旧版本的 Pod。
    2.  然后一次性启动**所有**新版本的 Pod。
* **优点**:
    * 实现简单。
    * 确保新旧版本**绝不**会同时运行，适用于 API 不兼容的更新。
* **缺点**:
    * 会导致明确的**服务停机时间**。

#### **Slide 11: 何时选择 `Recreate`？**

* **标题**: `Recreate` 的适用场景
* **主要场景**:
    * 应用不支持同时运行多个版本（例如，由于数据库锁或单例服务的限制）。
    * 发布了包含**向后不兼容**的 API 或数据结构变更，不希望客户端同时与新旧版本交互。
    * 开发或测试环境中，对停机时间不敏感。

#### **Slide 12: 超越内置：高级发布策略**

* **标题**: 更精细的风险控制
* Kubernetes 的 `Deployment` 提供了基础构建块，我们可以基于它实现更复杂的发布策略。
* **两种经典策略**:
    * 蓝绿部署 (`Blue-Green Deployment`)
    * 金丝雀发布 (`Canary Release`)
* **注意**: 这些策略**不是** `Deployment` 的内置选项，需要手动操作或借助高级工具。

#### **Slide 13: 高级策略 1: 蓝绿部署 (`Blue-Green`)**

* **标题**: 双环境切换，快速回滚
* **工作方式**:
    1.  当前生产环境是“蓝色” (v1.0)。
    2.  在旁边完整地部署一个全新的、一模一样的“绿色”环境 (v1.1)，但不接入实时流量。
    3.  在“绿色”环境上进行充分的测试。
    4.  测试通过后，通过修改 `Service` 的 `selector`，将**所有**实时流量**一次性**地从“蓝色”切换到“绿色”。
    5.  保留“蓝色”环境一段时间，以便在出现问题时可以快速切回。

#### **Slide 14: 蓝绿部署的优缺点**

* **标题**: 权衡利弊
* **优点**:
    * 流量切换瞬间完成，几乎零停机。
    * 回滚极其快速和安全（只需把流量切回“蓝色”环境）。
    * 新版本在上线前经过了完整的生产环境测试。
* **缺点**:
    * 在切换期间需要**双倍的硬件资源**，成本较高。
    * 需要处理好数据库等有状态服务的兼容性问题。

#### **Slide 15: 高级策略 2: 金丝雀发布 (`Canary`)**

* **标题**: 小步快跑，逐步验证
* **工作方式**:
    1.  大部分用户流量仍然访问稳定版本 (v1.0)。
    2.  部署少量新版本的实例 (v1.1)，并引导一小部分流量（例如 1% 或 5%）到新版本上。
    3.  密切监控新版本的性能指标（错误率、延迟等）。
    4.  如果新版本表现良好，逐步增加引流比例，并扩大新版本的部署规模。
    5.  如果出现问题，立即将所有流量切回稳定版本。

#### **Slide 16: 金丝雀发布的优缺点**

* **标题**: 权衡利弊
* **优点**:
    * **风险最低**: 在真实生产流量下验证新版本，但影响范围极小。
    * **真实反馈**: 获得真实用户的性能和业务数据。
    * 无需双倍资源。
* **缺点**:
    * 实现和自动化相对复杂，通常需要 Ingress Controller 或服务网格 (Service Mesh) 的支持。
    * 需要强大的监控和分析能力。

#### **Slide 17: 策略对比总结**

* **标题**: 如何选择合适的部署策略？
* **图表 (对比图)**:

| 策略 | 停机时间 | 资源成本 | 风险控制 | 实现复杂度 |
| :--- | :--- | :--- | :--- | :--- |
| **Recreate** | 有 | 低 | 低 | 非常低 |
| **RollingUpdate** | 无 | 低 | 中 | 低 (内置) |
| **Blue-Green** | 无 | 高 | 高 (快速回滚) | 中 |
| **Canary** | 无 | 低 | 非常高 (逐步) | 高 |

#### **Slide 18: 超越内置：更高级的工具**

* **标题**: 让复杂发布自动化
* 手动实现蓝绿和金丝雀发布很繁琐，社区提供了更强大的工具。
* **工具示例**:
    * **Flagger / Argo Rollouts**:
        * Kubernetes 的原生 Operator。
        * 提供了 `Canary`, `Blue-Green` 等高级发布策略的声明式 CRD。
        * 能够集成 Prometheus 等监控系统，实现**基于指标的自动推进和回滚**。
    * **Knative**:
        * 一个 Serverless 平台，其 `Serving` 组件提供了强大的流量切分能力。

#### **Slide 19: 延伸阅读**

* **标题**: 更多信息
* **链接**:
    * Kubernetes 官方文档: Deployments
    * Martin Fowler: BlueGreenDeployment
    * Martin Fowler: CanaryRelease
    * 本书 GitHub 示例: [链接到 `declarative-deployment` 示例]

#### **Slide 20: 问答环节**

* **标题**: Q & A
* **内容**: (留空，用于现场互动)