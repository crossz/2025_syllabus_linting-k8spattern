---
class: lead
---
# Kubernetes Patterns
## Chapter 6: Automated Placement
本章介绍Kubernetes调度器的核心功能，焦点是自动将Pod分配到满足资源请求和调度策略的节点，并探讨影响放置决策的外部机制。

- 本章介绍 Kubernetes 调度器的核心功能
- 焦点是自动将 Pod 分配到满足资源请求和调度策略的节点
- 探讨影响放置决策的外部机制

---
# Problem
微服务系统规模庞大，手动管理Pod放置不可行，需要自动化调度来处理动态变化。

> A reasonably sized microservices-based system consists of tens or even hundreds of isolated processes.

- 微服务系统规模大，包含众多独立进程
- 手动管理放置不可行，需要自动化
- 强调调度在分布式系统中的关键作用

---
# Problem
容器和Pod擅长打包部署，但无法解决将进程放置到合适节点的难题。

> Containers and Pods do provide nice abstractions for packaging and deployment but do not solve the problem of placing these processes on suitable nodes.

- 容器和 Pod 擅长打包，但忽略节点放置
- 放置问题涉及资源和依赖匹配
- 自动化调度成为必要解决方案

---
# Problem
随着微服务数量增长，手动分配Pod到节点变得不可持续。

> With a large and ever-growing number of microservices, assigning and placing them individually to nodes is not a manageable activity.

- 微服务数量增长，手动分配不可持续
- 需要可扩展的放置策略
- 引入调度器处理动态增长

---
# Problem
容器依赖关系和资源需求随时间变化，调度需实时适应。

> Containers have dependencies among themselves, dependencies to nodes, and resource demands, and all of that changes over time too.

- 容器间、节点依赖及资源需求动态变化
- 时间因素增加复杂性
- 调度需实时适应这些变动

---
# Problem
集群资源可用性随扩展或消耗而变，影响放置决策。

> The resources available on a cluster also vary over time, through shrinking or extending the cluster, or by having it consumed by already placed containers.

- 集群资源随扩展、收缩或消耗而变
- 已放置容器影响可用性
- 动态环境要求智能分配

---
# Problem
Pod放置方式直接影响分布式系统的可用性、性能和容量。

> The way we place containers impacts the availability, performance, and capacity of the distributed systems as well.

- 放置决策直接影响系统可用性、性能和容量
- 优化放置提升整体效率
- 强调策略在高可用设计中的重要性

---
# Problem
调度如射击移动目标，需要持续调整以应对动态环境。

> All of that makes scheduling containers to nodes a moving target that has to be shot on the move.

- 调度如射击移动目标，需持续调整
- 捕捉动态本质的比喻
- 突出自动化工具的必要性

---
# Problem
Kubernetes集群由节点组成，Pod是基本部署单元。

> Kubernetes cluster comprises of collection of nodes. Pod is the most basic element that we deploy in Kubernetes.

- 集群由节点组成，Pod 是基本部署单元
- 理解基础架构
- 为调度过程奠定基础

---
# Problem
Kubernetes调度器负责将Pod分配到特定节点。

> Kubernetes scheduler plays a fundamental role, as it assigns the pods to a particular node.

- 调度器核心作用：Pod 到节点的分配
- 自动化基础
- 确保资源利用和策略遵守

---
# Problem
新Pod定义在API服务器中，调度器从中获取并分配节点。

> Each new Pod which is to be created is defined in API server. Kubernetes scheduler takes the definition from API server for the Pod and assigns it to a node.

- 新 Pod 定义在 API 服务器，调度器从中获取并分配
- 流程概述
- 集成 API 服务器的协作

---
# Problem
Pod放置考虑可用资源、策略和依赖等因素。

> The placement of a Pod to a specific node factors in available resource, policies, dependencies etc.

- 放置考虑可用资源、策略和依赖
- 多因素决策
- 平衡复杂约束

---
# Solution
Kubernetes中，调度器负责将Pod分配到节点。

> In Kubernetes, assigning Pods to nodes is done by the scheduler.

- 调度器负责 Pod 到节点的分配
- 核心组件介绍
- 自动化放置的基础

---
# Solution
调度领域高度可配置，正在快速演进。

> It is an area that is highly configurable, still evolving, and changing rapidly as of this writing.

- 调度高度可配置，正在快速演进
- 适应性强
- 鼓励探索最新功能

---
# Solution
本章覆盖主要调度控制机制和驱动力。

> In this chapter, we cover the main scheduling control mechanisms, driving forces ...

- 章节覆盖主要控制机制和驱动力
- 焦点于实用指导
- 构建全面理解

---
# Placement Policies
除了默认调度器策略，还可运行多个调度器，Pod可指定使用哪个。

> Consider that in addition to configuring the policies of the default scheduler, it is also possible to run multiple schedulers and allow Pods to specify which scheduler to place them.

- 支持多调度器配置，Pod 可指定使用哪个
- 增强灵活性
- 适用于不同工作负载隔离

---
# Placement Policies
通过唯一名称启动自定义调度器实例，实现差异化配置。

> You can start another scheduler instance that is configured differently by giving it a unique name.

- 通过唯一名称启动自定义调度器实例
- 差异化配置
- 实现专用调度逻辑

---
# Placement Policies
在Pod定义中添加schedulerName字段指定自定义调度器。

> Then when defining a Pod, just add the field .spec.schedulerName with the name of your custom scheduler to the Pod specification and the Pod will be picked up by the custom scheduler only.

```yaml
spec:
  schedulerName: my-custom-scheduler
```
- Pod spec 中添加 schedulerName 字段
- 仅由指定调度器处理
- 精确控制放置流程

---
# Scheduling Process
Pod到节点分配过程概述。

> A Pod-to-node assignment process

- Pod 到节点分配过程概述
- 核心调度工作流
- 确保高效匹配

---
# Scheduling Process
未分配Pod创建后，调度器立即挑选并应用过滤和优先级策略。

> As soon as a Pod is created that is not assigned to a node yet, it gets picked by the scheduler together with all the available nodes and the set of filtering and priority policies.

- 未分配 Pod 创建后立即被调度器挑选
- 涉及所有可用节点和过滤/优先级策略
- 实时响应机制

---
# Scheduling Process
第一阶段应用过滤策略，排除不合格节点。

> In the first stage, the scheduler applies the filtering policies and removes all nodes that do not qualify based on the Pod’s criteria.

- 第一阶段：应用过滤策略，排除不合格节点
- 基于 Pod 标准筛选
- 快速缩小候选集

---
# Scheduling Process
第二阶段对剩余节点按权重排序。

> In the second stage, the remaining nodes get ordered by weight.

- 第二阶段：剩余节点按权重排序
- 优先级计算
- 优化选择

---
# Scheduling Process
第三阶段将Pod分配到选定节点。

> In the last stage the Pod gets a node assigned, which is the primary outcome of the scheduling process.

- 第三阶段：分配节点给 Pod
- 调度主要结果
- 完成放置

---
# Scheduling Process
调度器选择未放置Pod、所有节点、过滤器和优先级。

> Scheduler picks up an available Pod which is not yet placed to a particular node. Also the scheduler picks up all the available node, filters, priorities.

- 调度器选择未放置 Pod 和所有节点、过滤器、优先级
- 全面评估
- 动态决策基础

---
# Scheduling Process
先应用过滤，排除不符节点。

> First scheduler applies all the filtering policies and filters out the node which does not qualify based on Pod’s criteria.

- 先应用过滤，排除不符节点
- Pod 标准驱动
- 高效预筛选

---
# Scheduling Process
排序剩余节点，最后分配Pod到特定节点。

> After that the remaining node get sorted on its priority. Lastly Pod gets assigned to a particular node.

- 排序剩余节点，最后分配
- 优先级主导
- 最终绑定

---
# Node Affinity
节点亲和性允许添加自定义约束，过滤可用节点。

> Node Affinity allows to add more constraint as per our requirement. These constraints filters out node from the available nodes.

- 节点亲和性添加自定义约束，过滤节点
- 增强选择控制
- 满足特定需求

---
# Node Affinity
节点亲和性在节点粒度工作。

> Node Affinity works at node granularity.

- 节点级粒度操作
- 与 Pod 亲和性对比
- 针对硬件或标签

---
# Node Affinity
示例要求节点核心数大于3。

**Example:**
```yaml
spec:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: numberCores
            operator: Gt
            values: [ "3" ]
```

- 示例：要求节点核心数 >3
- requiredDuringSchedulingIgnoredDuringExecution 强制过滤
- 确保资源充足

---
# Pod Affinity
Pod亲和性和反亲和性创建Pod间放置依赖。

> Pod affinity, anti-affinity allows us to create dependencies between pods in terms of there placement.

- Pod 亲和性和反亲和性创建 Pod 间放置依赖
- 影响邻近性
- 优化通信或隔离

---
# Pod Affinity
Pod亲和性在Pod粒度工作，与节点亲和性不同。

> Node affinity works at node granularity, whereas Pod affinity works at pod granularity.

- Pod 级粒度，与节点亲和性不同
- 细粒度控制
- 适用于集群拓扑

---
# Pod Affinity
示例亲和高机密Pod，在安全区拓扑。

**Example:**
```yaml
spec:
  affinity:
    podAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
      - labelSelector:
          matchLabels:
            confidential: high
        topologyKey: security-zone
```

- 示例：亲和高机密 Pod，在安全区拓扑
- 标签选择器匹配
- 强制调度要求

---
# Taints and Tolerations
污点和容忍从节点侧控制，约束Pod调度，与亲和性互补。

> Until now we have seen Node, Pod Affinity which works from the side of Pod. Taints and Tolerations give control to the Node where with Taints and Tolerations Nodes can put constraint — for which pods can be scheduled or not scheduled.

- 污点和容忍从节点侧控制，约束 Pod 调度
- 与亲和性互补
- 节点主动拒绝

---
# Taints and Tolerations
污点是节点特性，仅容忍Pod可调度到污点节点。

> Taint is the characteristic of a node, which prevents Pods from getting scheduled on the node. Only Pod with toleration associated with taint can be scheduled on the tainted node.

- 污点是节点特性，阻止调度；仅容忍 Pod 可调度
- 匹配机制
- 实现专用节点

---

**Example (Taint on Node):**
```yaml
apiVersion: v1
kind: Node
metadata:
  name: master
spec:
  taints:
  - effect: NoSchedule
    key: node-role.kubernetes.io/master
```

- 示例：主节点添加 NoSchedule 污点
- 防止一般 Pod 调度
- 保留专属使用

---

**Example (Toleration on Pod):**
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: test
spec:
  containers:
  - image: test-image:v1.0
    name: test
  tolerations:
  - key: node-role.kubernetes.io/master
    operator: Exists
    effect: NoSchedule
```

- 示例：Pod 添加容忍主节点污点
- Exists 操作符匹配
- 允许调度到污点节点

---
# Taints and Tolerations
硬污点阻止调度，软污点避免调度，NoExecute可驱逐运行Pod。

> There are hard taints that prevent scheduling on a node (effect=NoSchedule), soft taints that try to avoid scheduling on a node (effect=PreferNoSchedule), and taints that can evict already running Pods from a node (effect=NoExecute).

- 硬污点 NoSchedule 阻止调度，软 PreferNoSchedule 避免，NoExecute 可驱逐运行 Pod
- 效果级别区分
- 渐进控制强度

---
# Descheduler
调度后不调整放置，除非Pod删除重创，导致静态局限。

> Once a Pod is assigned to a node, the job of the scheduler is done, and it does not change the placement of the Pod unless the Pod is deleted and recreated without a node assignment.

- 调度后不调整放置，除非 Pod 删除重创
- 静态分配局限
- 导致碎片化

---
# Descheduler
时间积累资源碎片，导致低利用率。

> As you have seen, with time, this can lead to resource fragmentation and poor utilization of cluster resources.

- 时间积累资源碎片，低利用率
- 动态集群问题
- 需要重新平衡

---
# Descheduler
调度决策基于当时视图，动态变化不修正旧放置。

> Another potential issue is that the scheduler decisions are based on its cluster view at the point in time when a new Pod is scheduled. If a cluster is dynamic and the resource profile of the nodes changes or new nodes are added, the scheduler will not rectify its previous Pod placements.

- 决策基于调度时视图，动态变化不修正旧放置
- 节点变化影响
- 历史决策过时

---
# Descheduler
节点标签变化也不修正旧放置，强调重新调度需求。

> Apart from changing the node capacity, you may also alter the labels on the nodes that affect placement, but past placements are not rectified either.

- 节点标签变化也不修正旧放置
- 全面动态挑战
- 强调重新调度需求

---
# Descheduler
反调度器解决动态场景，通过重调度Pod优化集群。

> All these are scenarios that can be addressed by the descheduler.

- 反调度器解决这些场景
- 集群清理工具
- 定期优化

---
# Descheduler
反调度器作为Job运行，管理员触发清理和去碎片。

> The Kubernetes descheduler is an optional feature that typically is run as a Job whenever a cluster administrator decides it is a good time to tidy up and defragment a cluster by rescheduling the Pods.

- 可选功能，作为 Job 运行，管理员触发
- 清理和去碎片
- 通过重调度 Pod

---
# Descheduler
预定义策略可启用/调优，通过文件传递配置。

> The descheduler comes with some predefined policies that can be enabled and tuned or disabled. The policies are passed as a file to the descheduler Pod, and currently, they are the following:

- 预定义策略，可启用/调优/禁用，通过文件传递
- 当前策略列表
- 灵活配置

---
# Descheduler
策略包括移除重复、低节点利用、违反反亲和等。

> 0. RemoveDuplicates 1. LowNodeUtilization 2. RemovePodsViolatingInterPodAntiAffinity 3. RemovePodsViolatingNodeAffinity

- 策略：移除重复、低节点利用、违反 Pod 反亲和、违反节点亲和
- 针对常见问题
- 自动化修复

---
# Descheduler
避免驱逐关键Pod、无控制器Pod、DaemonSet等保护机制。

> Regardless of the policy used, the descheduler avoids evicting the following: 0. Critical Pods that are marked with scheduler.alpha.kubernetes.io/criticalpod annotation. 1. Pods not managed by a ReplicaSet, Deployment, or Job. 2. Pods managed by a DaemonSet. 3. Pods that have local storage. 4. Pods with PodDisruptionBudget where eviction would violate its rules. 5. Deschedule Pod itself (achieved by marking itself as a critical Pod).

- 避免驱逐关键 Pod、无控制器 Pod、DaemonSet、本地存储、违反 PDB、自身
- 保护机制
- 安全重调度

---
# Discussion
自动化放置优化资源利用并遵守策略，处理动态集群。

> Automated Placement ensures efficient resource use and compliance with policies in dynamic clusters.

- 自动化放置优化资源，遵守策略
- 处理动态环境
- 提升集群效率

---
# Discussion
亲和性、污点和反调度器组合提供Pod分布全面控制。

> Combining affinities, taints, and descheduler provides comprehensive control over Pod distribution.

- 亲和性、污点和反调度器组合全面控制
- 平衡约束和优化
- 适应复杂工作负载


