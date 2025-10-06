
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
