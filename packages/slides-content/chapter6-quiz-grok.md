### 题目清单

1. 填空题：Kubernetes 调度器是将新 Pod 分配给符合容器资源请求并遵守调度策略的（ ）的核心功能。

答案: nodes

原文: Automated Placement is the core function of the Kubernetes scheduler for assigning new Pods to nodes that match container resource requests and honor scheduling policies.

2. 单选题：Kubernetes 调度器在分配 Pod 时，会考虑哪些因素？（ ）
A. 仅考虑资源需求
B. 运行时依赖、资源需求和高可用性策略
C. 仅考虑节点标签
D. 仅考虑 Pod 亲和性

答案: B. 运行时依赖、资源需求和高可用性策略

原文: It does this by considering runtime dependencies, resource requirements, and guiding policies for high availability; by spreading Pods horizontally; and also by colocating Pods nearby for performance and low-latency interactions.

3. 填空题：每个节点的容量通过公式计算：可分配容量 = 节点容量 - Kubernetes 保留 - 系统保留 - （ ）阈值。

答案: Eviction

原文: Allocatable [capacity for application pods] = Node Capacity [available capacity on a node] - Kube-Reserved [Kubernetes daemons like kubelet, container runtime] - System-Reserved [Operating System daemons like sshd, udev] - Eviction Thresholds [Reserved memory to prevent system OOMs]

4. 单选题：如果节点上运行不受 Kubernetes 管理的容器，如何处理其资源消耗？（ ）
A. 忽略它
B. 使用占位 Pod 来代表并预留资源
C. 自动调整节点容量
D. 删除这些容器

答案: B. 使用占位 Pod 来代表并预留资源

原文: A workaround is to run a placeholder Pod that doesn’t do anything but has only resource requests for CPU and memory corresponding to the untracked containers’ resource use amount.

5. 填空题：容器资源需求包括声明资源配置文件（带有请求和限制）和环境依赖，如存储或（ ）。

答案: ports

原文: It boils down to having containers that declare their resource profiles (with request and limit) and environment dependencies such as storage or ports.

6. 单选题：Kubernetes 调度器的配置在 v1.23 版本之前使用什么？（ ）
A. 调度配置文件
B. 调度策略
C. 插件扩展
D. 节点亲和性

答案: B. 调度策略

原文: In Kubernetes versions before v1.23, a scheduling policy can be used to configure the predicates and priorities of a scheduler.

7. 填空题：调度过程包括过滤节点、为剩余节点评分并按权重排序，然后通知 API 服务器关于（ ）决策。

答案: assignment

原文: In the last stage, the scheduler notifies the API server about the assignment decision, which is the primary outcome of the scheduling process.

8. 单选题：节点选择器（nodeSelector）用于什么？（ ）
A. 强制 Pod 到特定节点
B. 定义 Pod 亲和性
C. 设置污点
D. 配置拓扑扩展

答案: A. 强制 Pod 到特定节点

原文: The .spec.nodeSelector Pod field specifies a map of key-value pairs that must be present as labels on the node for the node to be eligible to run the Pod.

9. 填空题：节点亲和性是一种更具表达力的方式，允许指定规则为必需或（ ）。

答案: preferred

原文: Node affinity, which is a more expressive way of the node selector approach described previously that allows specifying rules as either required or preferred.

10. 单选题：Pod 亲和性和反亲和性基于什么来表达规则？（ ）
A. 仅节点标签
B. 拓扑级别，如节点、机架、云区域
C. 仅资源需求
D. 仅污点

答案: B. 拓扑级别，如节点、机架、云区域

原文: Using the topologyKey field, and the matching labels, it is possible to enforce more fine-grained rules, which combine rules on domains like node, rack, cloud provider zone, and region.

11. 填空题：拓扑扩展约束允许 Pod 在拓扑中不均匀分布的最大程度由（ ）定义。

答案: maxSkew

原文: maxSkew defines the maximum degree to which Pods can be unevenly distributed in the topology.

12. 单选题：whenUnsatisfiable 字段在 maxSkew 无法满足时定义什么？（ ）
A. 立即删除 Pod
B. 采取的行动，如 DoNotSchedule 或 ScheduleAnyway
C. 调整节点容量
D. 添加新节点

答案: B. 采取的行动，如 DoNotSchedule 或 ScheduleAnyway

原文: The whenUnsatisfiable field defines what action should be taken when maxSkew can’t be satisfied. DoNotSchedule is a hard constraint preventing the scheduling of Pods, whereas ScheduleAnyway is a soft constraint that gives scheduling priority to nodes that reduce cluster imbalance.

13. 填空题：污点（taints）允许节点控制哪些 Pod （ ）或不应调度到它们上。

答案: should

原文: Taints and tolerations are the opposite. They allow the nodes to control which Pods should or should not be scheduled on them.

14. 单选题：污点的影响包括哪些？（ ）
A. NoSchedule, PreferNoSchedule, NoExecute
B. Required, Preferred, Ignored
C. Filter, Score, Bind
D. Affinity, Anti-Affinity, Topology

答案: A. NoSchedule, PreferNoSchedule, NoExecute

原文: There are hard taints that prevent scheduling on a node (effect=NoSchedule), soft taints that try to avoid scheduling on a node (effect=PreferNoSchedule), and taints that can evict already-running Pods from a node (effect=NoExecute).

15. 填空题：如果容器资源需求太粗粒度，或节点太小，可能会导致资源（ ）。

答案: stranded

原文: You may end up with stranded resources in nodes that are not utilized.

16. 单选题：Kubernetes 去调度器（descheduler）用于什么？（ ）
A. 初始 Pod 放置
B. 碎片整理节点并改进利用率
C. 定义污点
D. 配置亲和性

答案: B. 碎片整理节点并改进利用率

原文: The Kubernetes descheduler, which helps defragment nodes and improve their utilization.

17. 填空题：在讨论中，放置是分配 Pod 到节点的（ ），你想要最小干预。

答案: art

原文: Placement is the art of assigning Pods to nodes. You want to have as minimal intervention as possible.

18. 单选题：nodeName 字段用于什么？（ ）
A. 硬编码 Pod 到节点
B. 定义软要求
C. 设置拓扑键
D. 添加污点

答案: A. 硬编码 Pod 到节点

原文: This field provides the simplest form of hard wiring a Pod to a node.

19. 填空题：自定义调度器可以运行在标准调度器（ ）或旁边。

答案: instead of

原文: A custom scheduler can run instead of, or alongside, the standard Kubernetes scheduler.

20. 单选题：拓扑扩展约束在写作时是一个（ ）的功能。

答案: evolving

原文: Topology spread constraints is a feature that is still evolving at the time of this writing.

### PPT Slides 文字稿

**Slide 1: 标题页**  
标题: Kubernetes Patterns - Chapter 6: Automated Placement (扩展版)  
副标题: Reusable Elements for Designing Cloud Native Applications (Second Edition)  
作者: Bilgin Ibryam & Roland Huß  
内容概述: 本PPT详细覆盖 Automated Placement 模式，扩展为20页，深入调度过程和控制机制。  
(包括书籍封面图片)

**Slide 2: 章节概述 (1/2)**  
主要内容:  
- Chapter 6: Automated Placement (页61-75)。  
- 结构: Problem, Solution (Available Node Resources 等子节), Discussion, More Information。  
关键点:  
- 焦点: Pod 到节点的自动分配。  
(引用原文: Automated Placement is the core function of the Kubernetes scheduler...)

**Slide 3: 章节概述 (2/2)**  
主要内容:  
- 与 Foundational Patterns 相关 (Part I)。  
- 目标: 优化可用性、性能和容量。  
关键点:  
- 调度器高度可配置且演进中。  
(引用原文: It is an area that is highly configurable, still evolving, and changing rapidly...)

**Slide 4: Problem - 放置挑战 (1/2)**  
主要内容:  
- 微服务系统有大量进程，手动放置不可扩展。  
- Pod 抽象好，但不解决节点分配。  
关键点:  
- 示例: 数十或数百微服务。  
(引用原文: With a large and ever-growing number of microservices, assigning and placing them individually to nodes is not a manageable activity.)

**Slide 5: Problem - 放置挑战 (2/2)**  
主要内容:  
- 依赖、资源需求动态变化；集群资源变异。  
- 放置影响可用性、性能、容量。  
关键点:  
- "Moving target that has to be shot on the move."  
(引用原文: All of that makes scheduling containers to nodes a moving target that has to be shot on the move.)

**Slide 6: Solution - 概述 (1/2)**  
主要内容:  
- Kubernetes 调度器负责 Pod 分配。  
- 考虑依赖、资源、HA 策略；水平扩展和共置。  
关键点:  
- 主要控制机制覆盖。  
(引用原文: It does this by considering runtime dependencies, resource requirements...)

**Slide 7: Solution - 概述 (2/2)**  
主要内容:  
- 子节: Available Node Resources, Container Demands, Scheduler Configs, Process, Affinity 等。  
- 确保 Pod 匹配节点容量。  
关键点:  
- 调度器默认策略适合多数用例。  
(引用原文: The scheduler has a default set of predicate and priority policies configured...)

**Slide 8: Available Node Resources - 概念 (1/2)**  
主要内容:  
- 节点容量公式: Allocatable = Node - Kube-Reserved - System-Reserved - Eviction。  
- 预留 kubelet 等守护进程资源。  
关键点:  
- 避免资源竞争。  
(引用原文: Allocatable [capacity for application pods] = Node Capacity... - Eviction Thresholds...)

**Slide 9: Available Node Resources - 概念 (2/2)**  
主要内容:  
- 未跟踪容器: 使用占位 Pod 预留。  
- 示例: Mirror Pod 或静态 Pod。  
关键点:  
- 调度器检查总请求 < 可分配。  
(引用原文: A workaround is to run a placeholder Pod that doesn’t do anything but has only resource requests...)

**Slide 10: Container Resource Demands - 概念**  
主要内容:  
- 声明 request/limit 和依赖 (存储、端口)。  
- 粗粒度需求可能导致 stranded resources。  
关键点:  
- 细粒度优化利用率。  
(引用原文: It boils down to having containers that declare their resource profiles...)

**Slide 11: Scheduler Configurations - 概念**  
主要内容:  
- v1.23 前: Scheduling Policy (predicates/priorities)。  
- 后: Scheduling Profiles。  
关键点:  
- 示例: 覆盖 PodTopologySpread 插件。  
(引用原文: In Kubernetes versions before v1.23, a scheduling policy can be used...)

**Slide 12: Scheduling Process - 步骤 (1/2)**  
主要内容:  
- 步骤1: Filter 节点 (资源匹配、亲和性)。  
- 步骤2: Score 剩余节点 (权重排序)。  
关键点:  
- 通知 API 关于 assignment。  
(引用原文: In the last stage, the scheduler notifies the API server about the assignment decision...)

**Slide 13: Scheduling Process - 步骤 (2/2)**  
主要内容:  
- 示例: nodeSelector 强制标签匹配。  
- YAML: spec.nodeSelector: {disktype: ssd}。  
关键点:  
- 简单硬编码。  
(插入 Example YAML 代码块)

**Slide 14: Node Affinity - 概念**  
主要内容:  
- 更表达力: requiredDuringSchedulingIgnoredDuringExecution / preferred。  
- 运算符: In, NotIn, Gt 等。  
关键点:  
- 示例: numberCores > 3。  
(引用原文: Node affinity, which is a more expressive way... allows specifying rules as either required or preferred.)

**Slide 15: Pod Affinity and Anti-Affinity - 概念**  
主要内容:  
- Pod 亲和: 共置基于标签/拓扑键 (zone/region)。  
- 反亲和: 扩展避免单点故障。  
关键点:  
- 细粒度规则。  
(引用原文: Using the topologyKey field... enforce more fine-grained rules...)

**Slide 16: Topology Spread Constraints - 概念 (1/2)**  
主要内容:  
- 均匀分布 Pod，使用 maxSkew, whenUnsatisfiable。  
- 拓扑键: topology.kubernetes.io/zone。  
关键点:  
- 支持滚动升级允许不平衡。  
(引用原文: maxSkew defines the maximum degree to which Pods can be unevenly distributed...)

**Slide 17: Topology Spread Constraints - 概念 (2/2)**  
主要内容:  
- DoNotSchedule: 硬约束；ScheduleAnyway: 软优先。  
- 示例 YAML: topologySpreadConstraints。  
关键点:  
- 演进功能。  
(插入 Example YAML 代码块)

**Slide 18: Taints and Tolerations - 概念 (1/2)**  
主要内容:  
- Taints: 节点排斥 Pod (NoSchedule 等)。  
- Tolerations: Pod 容忍匹配 taints。  
关键点:  
- 专用节点。  
(引用原文: Taints and tolerations are the opposite. They allow the nodes to control which Pods...)

**Slide 19: Taints and Tolerations - 概念 (2/2) & Discussion**  
主要内容:  
- 效果: NoSchedule, PreferNoSchedule, NoExecute。  
- 讨论: 放置是 art，最小干预；避免过度限制。  
关键点:  
- 使用 descheduler 碎片整理。  
(引用原文: There are hard taints... effect=NoSchedule... Placement is the art of assigning Pods...)

**Slide 20: More Information & 总结**  
主要内容:  
- 参考: Assigning Pods to Nodes, Scheduler Config 等 Kubernetes 文档。  
总结:  
- Automated Placement 优化集群利用。  
- 与题目: 覆盖公式、过程、约束。  
关键点:  
- 进一步: k8spatterns.io。  
(引用原文: Additional information related to this pattern can be found...)
