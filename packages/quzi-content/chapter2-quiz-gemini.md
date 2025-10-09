好的，这是根据您提供的“Kubernetes Patterns”第 2 章内容准备的 20 道测验题和一个 20 页的 PPT 文字稿。

-----

### Kubernetes 可预测的需求 (Predictable Demands) - 测验题

#### 选择题

1.  在 Kubernetes 中，哪种资源类型被认为是“可压缩的 (compressible)”，意味着当节点资源紧张时，它的使用可以被限制（节流）而不是直接终止容器？
    A. 内存 (memory)
    B. CPU
    C. `emptyDir` 卷
    D. `ephemeral-storage`

    **答案：B**

    **原文出处**: "The resources are categorized as compressible (i.e., can be throttled, such as CPU or network bandwidth) and incompressible (i.e., cannot be throttled, such as memory)."

2.  如果一个容器消耗了超过其限制的“不可压缩 (incompressible)”资源（如内存），Kubernetes 会采取什么措施？
    A. 限制其 CPU 使用率
    B. 将其从服务中移除
    C. 杀死 (kill) 该容器
    D. 降低其 Pod 优先级

    **答案：C**

    **原文出处**: "...but if they use too many incompressible resources (such as memory), they are killed..."

3.  Kubernetes 调度器在为 Pod 选择节点时，主要考虑容器的哪个资源声明？
    A. `limits` (限制)
    B. `requests` (请求)
    C. `requests` 和 `limits` 的平均值
    D. `requests` 和 `limits` 的最大值

    **答案：B**

    **原文出处**: "The requests amount (but not limits) is used by the scheduler when placing Pods to nodes."

4.  一个 Pod 的 Quality of Service (QoS) 等级被设定为 `Guaranteed` 的条件是什么？
    A. Pod 中所有容器都只设置了 `requests`
    B. Pod 中所有容器的 `requests` 和 `limits` 值都相等
    C. Pod 中所有容器的 `requests` 小于 `limits`
    D. Pod 中没有任何容器设置 `requests` 或 `limits`

    **答案：B**

    **原文出处**: "A Pod that has an equal amount of request and limit resources belongs to the Guaranteed QoS category."

5.  当节点面临不可压缩资源的压力时，哪种 QoS 等级的 Pod 最有可能首先被驱逐？
    A. `Guaranteed`
    B. `Burstable`
    C. `Best-Effort`
    D. 所有等级的 Pod 被驱逐的几率相同

    **答案：C**

    **原文出处**: "Such a Best-Effort Pod is considered the lowest priority and is most likely killed first when the node where the Pod is placed runs out of incompressible resources."

6.  Pod 优先级 (Pod Priority) 和抢占 (Preemption) 机制的主要作用是什么？
    A. 确保高优先级的 Pod 即使在集群资源不足时，也能通过驱逐低优先级的 Pod 来获得调度机会
    B. 确保所有 Pod 共享 CPU 资源
    C. 决定了当节点内存不足时，哪个 Pod 先被杀死
    D. 限制命名空间中可以创建的 Pod 总数

    **答案：A**

    **原文出处**: "If there are no nodes with enough capacity to place a Pod, the scheduler can preempt (remove) lower-priority Pods from nodes to free up resources and place Pods with higher priority."

7.  `ResourceQuota` 对象的作用范围是什么？
    A. 整个集群 (Cluster)
    B. 单个节点 (Node)
    C. 单个命名空间 (Namespace)
    D. 单个 Pod

    **答案：C**

    **原文出处**: "...ResourceQuota, which provides constraints for limiting the aggregated resource consumption in a namespace."

8.  `LimitRange` 对象可以用来强制执行哪些策略？
    A. 限制一个命名空间中 Pod 的总数
    B. 为命名空间中的容器设置默认的、最小的和最大的资源`requests`/`limits`
    C. 为高优先级的 Pod 预留资源
    D. 自动扩展集群节点

    **答案：B**

    **原文出处**: "...LimitRange, which allows you to set resource usage limits for each type of resource. In addition to specifying the minimum and maximum permitted amounts for different resource types and the default values for these resources..."

9.  为什么推荐为 CPU 设置 `requests` 但不设置 `limits`？
    A. 为了让容器可以在节点有空闲 CPU 资源时使用超过其请求量的资源，从而提高利用率
    B. 因为 CPU `limits` 会导致容器不稳定
    C. 因为调度器只关心 CPU `limits`
    D. 这是一个过时的建议，现在推荐两者都设置

    **答案：A**

    **原文出处**: "Therefore, it is highly recommended that you set requests for the CPU resource but no limits so that they can benefit from all excess CPU resources that otherwise would be wasted."

10. 当一个高优先级的 Pod 无法被调度时，抢占机制会如何选择被驱逐的 Pod？
    A. 它会优先选择 QoS 等级为 `Guaranteed` 的 Pod
    B. 它会完全忽略 QoS 等级，并尝试选择一组优先级最低的 Pod 来满足需求
    C. 它会优先选择占用内存最多的 Pod
    D. 它会随机选择一个低优先级的 Pod

    **答案：B**

    **原文出处**: "On the other hand, the scheduler eviction logic ignores the QoS of Pods entirely when choosing preemption targets. The scheduler attempts to pick a set of Pods with the lowest priority possible that satisfies the needs of higher-priority Pods waiting to be placed."

11. 在 Pod 定义中声明对 `PersistentVolume` 的依赖是通过哪种对象实现的？
    A. `ConfigMap`
    B. `Secret`
    C. `PersistentVolumeClaim` (PVC)
    D. `VolumeMount`

    **答案：C**

    **原文出处**: "Dependency of a PersistentVolumeClaim (PVC) to be present and bound."

12. Pod QoS 和 Pod 优先级是如何相互影响的？
    A. 它们是同一功能的两种不同名称
    B. Kubelet 在因资源不足而驱逐 Pod 时会同时考虑 QoS 和优先级，而调度器在抢占时只考虑优先级
    C. 调度器在抢占时只考虑 QoS
    D. 它们是完全独立且互不影响的两个特性

    **答案：B**

    **原文出处**: "Pod QoS (discussed previously) and Pod priority are two orthogonal features... QoS is used primarily by the Kubelet to preserve node stability... The Kubelet first considers QoS and then the PriorityClass of Pods before eviction. On the other hand, the scheduler eviction logic ignores the QoS of Pods entirely when choosing preemption targets."

13. `PriorityClass` 中的 `globalDefault` 字段设置为 `true` 有什么效果？
    A. 集群中所有的 Pod 都会使用这个优先级
    B. 所有**没有**明确指定 `priorityClassName` 的 Pod 都会使用这个优先级
    C. 只有系统 Pod 会使用这个优先级
    D. 这个设置会禁止所有其他优先级的创建

    **答案：B**

    **原文出处**: "...globalDefault set to true is used for Pods that do not specify a priorityClassName."

14. `LimitRange` 中的 `maxLimitRequestRatio` 参数控制什么？
    A. 一个容器的 `limits` 与其 `requests` 之间的最大允许比率，用于控制超卖程度
    B. 一个 Pod 可以请求的最大内存量
    C. 一个 Pod 可以使用的最大 CPU 核心数
    D. 命名空间中 `limits` 总和与 `requests` 总和的比率

    **答案：A**

    **原文出处**: "Maximum ratio limit/request, used to specify the allowed overcommit level."

15. 为什么说在 Pod 中声明资源需求对于成功的集群管理至关重要？
    A. 因为这是 Kubernetes 计费的唯一依据
    B. 因为这能让调度器做出智能的放置决策以实现高效的硬件利用，并且是容量规划的基础
    C. 因为不声明资源需求的 Pod 无法启动
    D. 因为这可以自动为应用选择合适的编程语言

    **答案：B**

    **原文出处**: "First, with all the runtime dependencies defined and resource demands envisaged, Kubernetes can make intelligent decisions about where to place a container on the cluster for the most efficient hardware utilization... Container resource profiles are also essential for capacity planning."

#### 填空题

16. 如果一个 Pod 的容器没有设置任何 `requests` 或 `limits`，它的 QoS 等级是 \_\_\_\_\_\_\_\_\_\_。

    **答案：`Best-Effort`**

    **原文出处**: "Pods that do not have any requests and limits set for its containers have a QoS of Best-Effort."

17. 当一个 Pod 请求的 `requests` 和 `limits` 值不相等（且 `limits` 大于 `requests`）时，它的 QoS 等级被标记为 \_\_\_\_\_\_\_\_\_\_。

    **答案：`Burstable`**

    **原文出处**: "A Pod that defines an unequal amount for requests and limits values... are tagged as Burstable."

18. `PriorityClass` 是一个非命名空间作用域的对象，用于定义一个基于\_\_\_\_\_\_\_\_\_\_的优先级。

    **答案：整数 (integer)**

    **原文出处**: "We created a PriorityClass, a non-namespaced object for defining an integer-based priority."

19. 声明容器的运行时依赖（如 `ConfigMap` 和 `Secret`）是强制性的；如果预期的 `ConfigMap` 不存在，容器虽然会被调度，但将无法\_\_\_\_\_\_\_\_\_\_。

    **答案：启动 (start up)**

    **原文出处**: "If not all of the expected ConfigMaps are created, the containers are scheduled on a node, but they do not start up."

20. 成功的容量规划依赖于对每个服务的\_\_\_\_\_\_\_\_\_\_的了解，以便为不同环境计算出总资源需求。

    **答案：资源画像 (resource profiles)**

    **原文出处**: "Service resource profiles and capacity planning go hand in hand for successful cluster management in the long term."

-----

### Kubernetes 可预测的需求 (Predictable Demands) - PPT 文字稿

#### **Slide 1: 标题页**

  * **标题**: Kubernetes 模式：可预测的需求 (Predictable Demands)
  * **副标题**: 高效、稳定运行应用的基石
  * **主讲人**: [您的名字]
  * **日期**: [日期]

#### **Slide 2: 议程**

  * **标题**: 本次分享内容
  * **要点**:
      * **问题**: 为什么“随遇而安”的应用在 K8s 中是危险的？
      * **解决方案**: 明确声明你的需求！
      * **第一部分**: 声明运行时依赖
      * **第二部分**: 定义资源画像 (`requests` vs `limits`)
      * **第三部分**: 理解服务质量 (QoS) 与优先级
      * **第四部分**: 管理项目资源 (`ResourceQuota` & `LimitRange`)
      * **第五部分**: 实践：容量规划
      * **总结与最佳实践**

#### **Slide 3: 问题：为什么应用需要“自我介绍”？**

  * **标题**: 在共享环境中，未知=混乱
  * **思考**:
      * 如果 Kubernetes 不知道你的应用需要多少 CPU/内存，它如何为你找到一个合适的“家”（节点）？
      * 如果你的应用突然需要大量内存，会发生什么？它可能会“饿死”邻居，或者被系统无情地“杀死”。
      * 如果你的应用依赖一个特定的配置或存储卷，但在启动时找不到它，会怎样？
  * **结论**: 在一个由调度器管理的动态环境中，应用必须清晰地声明其需求，才能被可靠、高效地管理。

#### **Slide 4: 解决方案：声明所有需求**

  * **标题**: 成功的两大支柱
  * **两大类需求**:
    1.  **运行时依赖 (Runtime Dependencies)**:
          * 应用运行所必需的外部资源。
          * 例如：存储卷 (Volumes)、配置 (`ConfigMaps`)、密钥 (`Secrets`)。
    2.  **资源需求 (Resource Requirements)**:
          * 应用运行所需的计算资源。
          * 例如：CPU、内存。
  * **好处**:
      * **智能调度**: 调度器可以做出最优的放置决策。
      * **容量规划**: 集群管理员可以准确地规划硬件资源。
      * **运行稳定**: 避免资源争抢和意外终止。

#### **Slide 5: 第一部分：声明运行时依赖**

  * **标题**: 告诉 K8s 你需要什么
  * **常见依赖**:
      * **存储 (Storage)**:
          * 通过 `PersistentVolumeClaim` (PVC) 声明对持久化存储的需求。
          * 调度器会考虑存储类型，将 Pod 调度到可以满足其存储需求的节点上。
      * **配置 (Configuration)**:
          * 通过 `ConfigMap` 或 `Secret` 注入配置信息。
          * 这是**强制性**依赖：如果依赖的 `ConfigMap` 不存在，容器将无法启动。

#### **Slide 6: 第二部分：定义资源画像**

  * **标题**: `requests` vs `limits` - 承诺与上限
  * **`requests` (请求)**:
      * **含义**: 这是你**保证**应用需要的最小资源量。
      * **作用**: **调度器**用它来决定将 Pod 放在哪个节点。节点必须有足够的空闲资源来满足 `requests`。
  * **`limits` (限制)**:
      * **含义**: 这是应用被允许使用的**最大**资源量。
      * **作用**: **Kubelet** 用它来在运行时强制执行资源约束。

#### **Slide 7: 可压缩 vs 不可压缩资源**

  * **标题**: 两种资源，两种命运
  * **可压缩资源 (Compressible) - 例如 CPU**:
      * **特点**: 可以被“节流”或限制。
      * **超限后果**: 应用的性能会下降（被限制了 CPU 时间），但**不会被杀死**。
  * **不可压缩资源 (Incompressible) - 例如 Memory**:
      * **特点**: 无法被“压缩”。内存要么被分配，要么没有。
      * **超限后果**: 应用会被系统**杀死** (OOMKilled)，因为无法回收已分配的内存。

#### **Slide 8: 第三部分：服务质量 (QoS) 等级**

  * **标题**: 你的 Pod 在集群中的“社会地位”
  * **QoS 是由 `requests` 和 `limits` 的设置方式隐式决定的**。
  * **三个等级**:
    1.  **Guaranteed (有保障的)**: `requests` == `limits`。最高优先级，最后被驱逐。
    2.  **Burstable (可突发的)**: `requests` \< `limits`。中等优先级。
    3.  **Best-Effort (尽力而为的)**: 没有设置 `requests` 和 `limits`。最低优先级，最先被驱逐。

#### **Slide 9: QoS 等级如何影响决策**

  * **标题**: 谁走，谁留？
  * **场景**: 节点资源（尤其是内存）耗尽。
  * **Kubelet 的驱逐顺序**:
    1.  首先驱逐 `Best-Effort` 的 Pods。
    2.  然后驱逐 `Burstable` 的 Pods。
    3.  最后才轮到 `Guaranteed` 的 Pods。
  * **结论**: 为关键应用设置 `Guaranteed` QoS 可以最大程度地保证其稳定性。

#### **Slide 10: Pod 优先级与抢占**

  * **标题**: 当“VIP” Pod 需要空间时
  * **`PodPriority`**:
      * 一个明确的、基于整数的优先级声明 (`PriorityClass`)。
  * **`Preemption` (抢占)**:
      * **核心机制**: 当一个高优先级的 Pod 因为资源不足而无法调度时，**调度器**可以**驱逐**一个或多个低优先级的 Pod，为高优先级的 Pod 腾出空间。
      * 这确保了关键任务总能优先运行。

#### **Slide 11: QoS vs 优先级**

  * **标题**: 两个独立但相关的概念
  * **`QoS`**:
      * **决策者**: **Kubelet** (在节点上)。
      * **场景**: 当**节点**资源不足时，决定驱逐谁。
      * **决策依据**: `requests`/`limits` 的设置。
  * **`Pod Priority`**:
      * **决策者**: **Scheduler** (在控制平面)。
      * **场景**: 当**集群**资源不足时，决定谁可以抢占资源被调度。
      * **决策依据**: `PriorityClass` 的值 (完全忽略 QoS)。

#### **Slide 12: 第四部分：管理项目资源**

  * **标题**: 为多租户环境设置“护栏”
  * **工具**:
      * **`ResourceQuota`**:
          * 作用于**命名空间**级别。
          * 限制一个命名空间可以使用的**资源总量**（如总 CPU、总内存）和可以创建的**对象数量**（如 Pods, Services 的数量）。
      * **`LimitRange`**:
          * 也作用于**命名空间**级别。
          * 为该空间内的**单个容器**设置资源使用的默认值、最小值和最大值。

#### **Slide 13: `ResourceQuota` 示例**

  * **标题**: 防止资源滥用
  * **场景**: 为 `dev` 命名空间设置配额。
  * **代码示例 (概念)**:
    ```yaml
    kind: ResourceQuota
    spec:
      hard:
        pods: "4"
        limits.memory: 5Gi
    ```
  * **效果**: `dev` 命名空间最多只能创建 4 个 Pod，并且所有 Pod 的内存 `limits` 总和不能超过 5 GiB。

#### **Slide 14: `LimitRange` 示例**

  * **标题**: 规范容器行为
  * **场景**: 确保 `dev` 命名空间中的容器不会请求过多或过少的资源。
  * **代码示例 (概念)**:
    ```yaml
    kind: LimitRange
    spec:
      limits:
      - type: Container
        max:
          memory: 2Gi
        min:
          memory: 250Mi
        default:
          memory: 500Mi
    ```
  * **效果**: 在此空间创建的容器，如果没有指定内存，默认 limit 为 500Mi；其 limit 不能超过 2Gi，也不能低于 250Mi。

#### **Slide 15: 第五部分：实践 - 容量规划**

  * **标题**: 我们需要多大的集群？
  * **流程**:
    1.  **评估服务**: 估算或测试出每个服务的资源画像（CPU/Memory `requests`）。
    2.  **汇总需求**: 将所有服务在特定环境（如生产环境）的资源需求相加。
    3.  **考虑冗余**: 为系统开销、突发流量、自动扩缩容等留出额外的 buffer。
    4.  **选择实例**: 根据计算出的总需求，选择最经济高效的云服务器实例类型和数量。
  * **这是一个持续迭代的过程**。

#### **Slide 16: 容量规划表示例**

  * **标题**: 一个简化的例子
  * **表格**:

| Pod | CPU Request | Memory Request | Instances | Total CPU | Total Memory |
| :-- | :--- | :--- | :--- | :--- | :--- |
| A | 500m | 500Mi | 4 | 2000m | 2000Mi |
| B | 250m | 250Mi | 2 | 500m | 500Mi |
| C | 500m | 1000Mi | 2 | 1000m | 2000Mi |
| **Total**| | | **8** | **3500m** | **4500Mi** |

  * **结论**: 至少需要 3.5 核 CPU 和 4.5 GiB 内存的可分配资源，再加上冗余。

#### **Slide 17: 总结与关键要点**

  * **标题**: 本章回顾
  * **核心思想**: 为了在 Kubernetes 中实现稳定和高效，应用**必须**声明其需求。
  * **关键点**:
      * **明确依赖**: 声明所有运行时依赖，如 `ConfigMap` 和 `PVC`。
      * **定义资源**: `requests` 用于调度，`limits` 用于运行时强制约束。
      * **理解 QoS**: `Guaranteed` \> `Burstable` \> `Best-Effort`。
      * **善用优先级**: 使用 `PodPriority` 确保关键任务的调度。
      * **设置配额**: 使用 `ResourceQuota` 和 `LimitRange` 管理共享环境。

#### **Slide 18: 最佳实践**

  * **标题**: 如何正确设置资源？
  * **建议**:
      * **内存 (Memory)**: **始终**设置 `requests` 等于 `limits`。这会给你 `Guaranteed` 的 QoS，避免因内存超用而被意外杀死，让行为最可预测。
      * **CPU**: **始终**设置 `requests`，但**不要**设置 `limits`。这允许你的应用在节点 CPU 空闲时，使用超出其请求的计算能力，从而最大化资源利用率，而不会有被杀死的风险。
      * **持续观察**: 使用工具（如 Vertical Pod Autoscaler）来监控应用的实际资源使用情况，并调整你的声明。

#### **Slide 19: 延伸阅读**

  * **标题**: 更多信息
  * **链接**:
      * Kubernetes 官方文档: Resource Management for Pods and Containers
      * Kubernetes 官方文档: Configure Quality of Service for Pods
      * Kubernetes 官方文档: Pod Priority and Preemption
      * 本书 GitHub 示例: [链接到 `predictable-demands` 示例]

#### **Slide 20: 问答环节**

  * **标题**: Q & A
  * **内容**: (留空，用于现场互动)