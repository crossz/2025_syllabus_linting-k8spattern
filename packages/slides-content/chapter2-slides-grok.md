---
class: lead
---
# Kubernetes Patterns
## Chapter 2: Predictable Demands
- 本章强调声明资源需求和运行时依赖的重要性
- 确保 Kubernetes 正确放置 Pod，实现高效共享环境
- 涵盖依赖声明、资源配置文件、优先级和容量规划

---
# Problem: 声明需求基础
概述：成功部署依赖声明资源和依赖。

> The foundation of successful application deployment, management, and coexistence on a shared cloud environment is dependent on identifying and declaring the application resource requirements and runtime dependencies. This Predictable Demands pattern indicates how you should declare application requirements, whether they are hard runtime dependencies or resource requirements. Declaring your requirements is essential for Kubernetes to find the right place for your application within the cluster.

- 共享云环境成功依赖预先识别和声明需求
- 模式指导硬依赖或资源声明方式
- Kubernetes 据此定位合适集群位置

---
# Solution: 运行时依赖概述
概述：常见运行时依赖如存储。

> One of the most common runtime dependencies is file storage for saving application state. Container filesystems are ephemeral and are lost when a container is shutdown. Kubernetes offers volume as a Pod-level storage utility that survives container restarts.

- 容器文件系统短暂，关闭即失状态
- 卷作为 Pod 级持久工具
- 声明依赖确保状态保存

---
# Solution: Runtime Dependencies - emptyDir 类型
概述：emptyDir 卷的生命周期。

> The most straightforward type of volume is emptyDir, which lives as long as the Pod lives. When the Pod is removed, its content is also lost. The volume needs to be backed by another kind of storage mechanism to survive Pod restarts. If your application needs to read or write files to such long-lived storage, you must declare that dependency explicitly in the container definition using volumes, as shown in Example 2-1.

- emptyDir 与 Pod 同寿，移除即清
- 需后备存储机制持久化
- 显式声明卷依赖于容器定义

---
# Solution: Runtime Dependencies - PersistentVolume 示例
概述：PVC 依赖示例代码。


- 示例中卷挂载到 /logs，使用 PVC 绑定
- 声明 PVC 存在和绑定需求
- 调度器据卷类型评估放置

---
# Solution: Runtime Dependencies - 调度影响
概述：卷依赖对调度的影响。

> Dependency of a PersistentVolumeClaim (PVC) to be present and bound.

> The scheduler evaluates the kind of volume a Pod requires, which affects where the Pod gets placed. If the Pod needs a volume that is not provided by any node on the cluster, the Pod is not scheduled at all. Volumes are an example of a runtime dependency that affects what kind of infrastructure a Pod can run and whether the Pod can be scheduled at all.

- 调度器检查卷类型决定放置位置
- 无支持节点则不调度
- 基础设施兼容性关键

---
# Solution: Runtime Dependencies - hostPort 依赖
概述：hostPort 创建节点依赖。

> A similar dependency happens when you ask Kubernetes to expose a container port on a specific port on the host system through hostPort. The usage of a hostPort creates another runtime dependency on the nodes and limits where a Pod can be scheduled. hostPort reserves the port on each node in the cluster and is limited to a maximum of one Pod scheduled per node. Because of port conflicts, you can scale to as many Pods as there are nodes in the Kubernetes cluster.

- hostPort 暴露端口到主机，预留每个节点
- 限制每节点一 Pod，缩放上限节点数
- 端口冲突影响可扩展性

---
# Solution: Runtime Dependencies - 配置依赖
概述：ConfigMap 作为配置依赖。

> Configurations are another type of dependency. Almost every application needs some configuration information, and the recommended solution offered by Kubernetes is through ConfigMaps. Your services need to have a strategy for consuming settings— either through environment variables or the filesystem. In either case, this introduces a runtime dependency of your container to the named ConfigMaps. If not all of the expected ConfigMaps are created, the containers are scheduled on a node, but they do not start up.

- 应用需配置策略：环境变量或文件系统
- 引入命名 ConfigMap 依赖
- 缺失则调度后不启动

---
# Solution: Runtime Dependencies - Secrets 类似
概述：Secrets 提供安全配置。

> Similar to ConfigMaps, Secrets offer a slightly more secure way of distributing environment-specific configurations to a container. The way to consume a Secret is the same as it is for ConfigMaps, and using a Secret introduces the same kind of dependency from a container to a namespace.

- Secrets 更安全分发环境配置
- 消费方式同 ConfigMap
- 命名空间级依赖

---
# Solution: Runtime Dependencies - ConfigMap 示例
概述：ConfigMap 依赖代码示例。

> ConfigMaps and Secrets are explained in more detail in Chapter 20, “Configuration Resource”, and Example 2-2 shows how these resources are used as runtime dependencies.


- 示例中环境变量从 ConfigMap 键引用
- 强制依赖 random-generator-config
- 第 20 章详解

---
# Solution: Runtime Dependencies - 设计考虑
概述：依赖对运行时的约束。

> Mandatory dependency on the ConfigMap random-generator-config.

> While the creation of ConfigMap and Secret objects are simple deployment tasks we have to perform, cluster nodes provide storage and port numbers. Some of these dependencies limit where a Pod gets scheduled (if anywhere at all), and other dependencies may prevent the Pod from starting up. When designing your containerized applications with such dependencies, always consider the runtime constraints they will create later.

- ConfigMap/Secret 创建简单，但节点提供存储端口
- 部分限调度位置，其他防启动
- 设计时预见后期约束

---
# Solution: Resource Profiles - 资源分类
概述：Kubernetes 资源定义和分类。

> Specifying container dependencies such as ConfigMap, Secret, and volumes is straightforward. We need some more thinking and experimentation for figuring out the resource requirements of a container. Computer resources in the context of Kubernetes are defined as something that can be requested by, allocated to, and consumed from a container. The resources are categorized as compressible (i.e., can be throttled, such as CPU or network bandwidth) and incompressible (i.e., cannot be throttled, such as memory).

- 依赖声明直观，资源需实验确定
- 资源可请求、分配、消耗
- 可压缩（如 CPU 节流）和不可压缩（如内存杀死）

---
# Solution: Resource Profiles - 分类重要性
概述：压缩与不可压缩资源的区别。

> Making the distinction between compressible and incompressible resources is important. If your containers consume too many compressible resources such as CPU, they are throttled, but if they use too many incompressible resources (such as memory), they are killed (as there is no other way to ask an application to release allocated memory).

- 区分关键：CPU 超则节流，内存超则杀死
- 应用释放内存无机制
- 影响 Pod 生存策略

---
# Solution: Resource Profiles - 请求与限制
概述：最小和最大资源指定。

> Based on the nature and the implementation details of your application, you have to specify the minimum amount of resources that are needed (called requests) and the maximum amount it can grow up to (the limits). Every container definition can specify the amount of CPU and memory it needs in the form of a request and limit. At a high level, the concept of requests/limits is similar to soft/hard limits. For example, similarly, we define heap size for a Java application by using the -Xms and -Xmx command-line options.

- 基于应用性质指定 requests（最小）和 limits（最大）
- 类似软/硬限，如 Java -Xms/-Xmx
- 容器定义中 CPU/内存形式

---
# Solution: Resource Profiles - 调度使用
概述：requests 在调度中的作用。

> The requests amount (but not limits) is used by the scheduler when placing Pods to nodes. For a given Pod, the scheduler considers only nodes that still have enough capacity to accommodate the Pod and all of its containers by summing up the requested resource amounts. In that sense, the requests field of each container affects where a Pod can be scheduled or not. Example 2-3 shows how such limits are specified for a Pod.

- 仅 requests 用于调度，limits 不影响
- 求和容纳 Pod 所有容器
- 每个容器 requests 决定位置

---
# Solution: Resource Profiles - 资源限制示例
概述：Pod 资源限制代码。


- 示例请求 CPU 100m、内存 200Mi
- 内存限 200Mi，无 CPU 限
- 初始请求和上限配置

---
# Solution: Resource Profiles - 资源类型：memory
概述：memory 资源细节。


> memory

> This type is for the heap memory demands of your application, including volumes of type emptyDir with the configuration medium: Memory. Memory resources are incompressible, so containers that exceed their configured memory limit will trigger the Pod to be evicted; i.e., it gets deleted and recreated potentially on a different node.

- memory 包括堆和 emptyDir:Memory
- 不可压缩，超限驱逐 Pod
- 可能不同节点重创

---
# Solution: Resource Profiles - 资源类型：cpu
概述：CPU 资源特性。

> cpu

> The cpu type is used to specify the range of needed CPU cycles for your application. However, it is a compressible resource, which means that in an overcommit situation for a node, all assigned CPU slots of all running containers are throttled relative to their specified requests. Therefore, it is highly recommended that you set requests for the CPU resource but no limits so that they can benefit from all excess CPU resources that otherwise would be wasted.

- CPU 指定周期范围，可压缩
- 过载节点相对 requests 节流
- 推荐设 requests 无 limits，利用闲置

---
# Solution: Resource Profiles - 资源类型：ephemeral-storage
概述：临时存储资源。

> ephemeral-storage

> Every node has some filesystem space dedicated for ephemeral storage that holds logs and writable container layers. emptyDir volumes that are not stored in a memory filesystem also use ephemeral storage. With this request and limit type, you can specify the application’s minimal and maximal needs. ephemeral-storage resources are not compressible and will cause a Pod to be evicted from the node if it uses more storage than specified in its limit.

- 节点专用空间持日志和层
- 非内存 emptyDir 使用
- 不可压缩，超限驱逐

---
# Solution: Resource Profiles - 资源类型：hugepage
概述：大页内存资源。

> hugepage-size 

> Huge pages are large, contiguous pre-allocated pages of memory that can be mounted as volumes. Depending on your Kubernetes node configuration, several sizes of huge pages are available, like 2MB and 1GB pages. You can specify a request and limit for how many of a certain type of huge pages you want to consume (e.g., hugepages-1Gi: 2Gi for requesting two 1GB huge pages). Huge pages can’t be overcommitted, so the request and limit must be the same.

- 大页连续预分配内存卷
- 配置决定大小如 2MB/1GB
- 请求限相同，不可过载

---
# Solution: Resource Profiles - QoS 类型：Best-Effort
概述：QoS 分类基于请求限。

> Depending on whether you specify the requests, the limits, or both, the platform offers three types of Quality of Service (QoS):

> Best-Effort

> Pods that do not have any requests and limits set for its containers have a QoS of Best-Effort. Such a Best-Effort Pod is considered the lowest priority and is most likely killed first when the node where the Pod is placed runs out of incompressible resources.

- 无请求限为 Best-Effort
- 最低优先，资源饥饿先杀
- 适用于非关键任务

---
# Solution: Resource Profiles - QoS 类型：Burstable
概述：Burstable QoS 特性。

> Burstable

> A Pod that defines an unequal amount for requests and limits values (and limits is larger than requests, as expected) are tagged as Burstable. Such a Pod has minimal resource guarantees but is also willing to consume more resources up to its limit when available. When the node is under incompressible resource pressure, these Pods are likely to be killed if no Best-Effort Pods remain.

- requests < limits 为 Burstable
- 最小保证，可扩展到限
- 压力下次杀于 Guaranteed

---
# Solution: Resource Profiles - QoS 类型：Guaranteed
概述：Guaranteed QoS 优势。

> Guaranteed

> A Pod that has an equal amount of request and limit resources belongs to the Guaranteed QoS category. These are the highest-priority Pods and are guaranteed not to be killed before Best-Effort and Burstable Pods. This QoS mode is the best option for your application’s memory resources, as it entails the least surprise and avoids out-of-memory triggered evictions.

- requests = limits 为 Guaranteed
- 最高优先，不先于其他杀
- 内存最佳，少惊喜避 OOM

---
# Solution: Resource Profiles - QoS 影响
概述：资源定义对 QoS 的影响。

> So the resource characteristics you define or omit for the containers have a direct impact on its QoS and define the relative importance of the Pod in the event of resource starvation. Define your Pod resource requirements with this consequence in mind.

- 定义或省略直接影响 QoS 和饥饿优先
- 考虑后果定义需求
- 相对重要性决定生存

---
# Solution: Pod Priority - 概念介绍
概述：Pod 优先级与 QoS 相关。

> We explained how container resource declarations also define Pods’ QoS and affect the order in which the Kubelet kills the container in a Pod in case of resource starvation. Two other related concepts are Pod priority and preemption. Pod priority allows you to indicate the importance of a Pod relative to other Pods, which affects the order in which Pods are scheduled.

- 资源声明定义 QoS 和杀顺序
- 优先级和抢占相关概念
- 相对重要影响调度顺序

---
# Solution: Pod Priority - 示例代码
概述：PriorityClass 和 Pod 示例。


- PriorityClass 定义高优先 1000
- Pod 引用 priorityClassName
- 非命名空间对象

---
# Solution: Pod Priority - 优先级机制
概述：PriorityClass 细节。

> globalDefault set to true is used for Pods that do not specify a priorityClassName. Only one PriorityClass can have globalDefault set to true.

> The priority class to use with this Pod, as defined in PriorityClass resource.

> We created a PriorityClass, a non-namespaced object for defining an integer-based priority. Our PriorityClass is named high-priority and has a priority of 1,000.

> Now we can assign this priority to Pods by its name as priorityClassName: high-priority. PriorityClass is a mechanism for indicating the importance of Pods relative to one another, where the higher value indicates more important Pods.

- globalDefault 为无指定 Pod，仅1个可用（即设置为 true）
- 整数优先，高值更重要
- 通过名称分配给 Pod

---
# Solution: Pod Priority - 调度影响
概述：优先级对调度的作用。

> Pod priority affects the order in which the scheduler places Pods on nodes. First, the priority admission controller uses the priorityClassName field to populate the priority value for new Pods. When multiple Pods are waiting to be placed, the scheduler sorts the queue of pending Pods by highest priority first. Any pending Pod is picked before any other pending Pod with lower priority in the scheduling queue, and if there are no constraints preventing it from scheduling, the Pod gets scheduled.

- 影响放置顺序，高优先先
- 准入控制器填充值
- 队列排序最高先选

---
# Solution: Pod Priority - 抢占机制
概述：无容量时的抢占。

> Here comes the critical part. If there are no nodes with enough capacity to place a Pod, the scheduler can preempt (remove) lower-priority Pods from nodes to free up resources and place Pods with higher priority. As a result, the higher-priority Pod might be scheduled sooner than Pods with a lower priority if all other scheduling requirements are met. This algorithm effectively enables cluster administrators to control which Pods are more critical workloads and place them first by allowing the scheduler to evict Pods with lower priority to make room on a worker node for higher-priority Pods. If a Pod cannot be scheduled, the scheduler continues with the placement of other lower-priority Pods.

- 无容量抢占低优先释放资源
- 管理员控制关键工作负载先置
- 无法调度继续低优先

---
# Solution: Pod Priority - Never 策略
概述：无抢占优先级。

> Suppose you want your Pod to be scheduled with a particular priority but don’t want to evict any existing Pods. In that case, you can mark a PriorityClass with the field preemptionPolicy: Never. Pods assigned to this priority class will not trigger any eviction of running Pods but will still get scheduled according to their priority value.

- preemptionPolicy: Never 按优先调度无驱逐
- 避免现有 Pod 影响
- 平衡优先无破坏

---
# Solution: Pod Priority - 与 QoS 关系
概述：QoS 和优先级的正交性。

> Pod QoS (discussed previously) and Pod priority are two orthogonal features that are not connected and have only a little overlap. QoS is used primarily by the Kubelet to preserve node stability when available compute resources are low. The Kubelet first considers QoS and then the PriorityClass of Pods before eviction. On the other hand, the scheduler eviction logic ignores the QoS of Pods entirely when choosing preemption targets. The scheduler attempts to pick a set of Pods with the lowest priority possible that satisfies the needs of higher-priority Pods waiting to be placed.

- 正交特征，小重叠
- Kubelet 先 QoS 后优先驱逐
- 调度忽略 QoS 选低优先目标

---
# Solution: Pod Priority - 驱逐影响
概述：优先级对其他 Pod 的影响。

> When Pods have a priority specified, it can have an undesired effect on other Pods that are evicted. For example, while a Pod’s graceful termination policies are respected, the PodDisruptionBudget as discussed in Chapter 10, “Singleton Service”, is not guaranteed, which could break a lower-priority clustered application that relies on a quorum of Pods.

- 指定优先可能 undesired 驱逐
- 优雅终止尊重，但 PDB 不保证
- 低优先集群 quorum 破损

---
# Solution: Pod Priority - 防止滥用
概述：防止恶意高优先。

> Another concern is a malicious or uninformed user who creates Pods with the highest possible priority and evicts all other Pods. To prevent that, ResourceQuota has been extended to support PriorityClass, and higher-priority numbers are reserved for critical system-Pods that should not usually be preempted or evicted.

- 恶意高优先驱逐所有
- ResourceQuota 支持 PriorityClass
- 高数保留系统关键 Pod

---
# Solution: Pod Priority - 使用谨慎
概述：优先级使用警告。

> In conclusion, Pod priorities should be used with caution because user-specified numerical priorities that guide the scheduler and Kubelet about which Pods to place or to kill are subject to gaming by users. Any change could affect many Pods and could prevent the platform from delivering predictable service-level agreements.

- 谨慎使用，用户数值易游戏
- 变更影响多 Pod，防 SLA 预测
- 平衡风险

---
# Solution: Project Resources - Kubernetes 自服务
概述：自服务平台需边界控制。

> Kubernetes is a self-service platform that enables developers to run applications as they see suitable on the designated isolated environments. However, working in a shared multitenanted platform also requires the presence of specific boundaries and control units to prevent some users from consuming all the platform’s resources. One such tool is ResourceQuota, which provides constraints for limiting the aggregated resource consumption in a namespace. With ResourceQuotas, the cluster administrators can limit the total sum of computing resources (CPU, memory) and storage consumed. It can also limit the total number of objects (such as ConfigMaps, Secrets, Pods, or Services) created in a namespace.

- 自服务命名空间隔离，但共享需边界
- ResourceQuota 限聚合消耗
- 管理员控制 CPU/内存/存储和对象数

---
# Solution: Project Resources - 资源约束示例
概述：ResourceQuota 示例代码。

> Example 2-5 shows an instance that limits the usage of certain resources. See the official Kubernetes documentation on ResourceQuotas for the full list of supported resources for which you can restrict usage with ResourceQuotas.


- 示例限 4 Pod 和 5Gi 内存限和
- 应用到 default 命名空间
- 支持资源详见文档

---
# Solution: Project Resources - LimitRange 工具
概述：LimitRange 配置选项。

> Namespace to which resource constraints are applied.

> The sum of all memory limits of all Pods in this namespace must not be more than 5GB.

> Another helpful tool in this area is LimitRange, which allows you to set resource usage limits for each type of resource. In addition to specifying the minimum and maximum permitted amounts for different resource types and the default values for these resources, it also allows you to control the ratio between the requests and limits, also known as the overcommit level. Example 2-6 shows a LimitRange and the possible configuration options.

- LimitRange 设每类型限和默认
- 控制 requests/limits 比率（过载级）
- 示例展示配置

---
# Solution: Project Resources - LimitRange 示例
概述：LimitRange 代码细节。


- min/max 值，default requests/limits
- 比率：内存限不超过请求 2 倍，CPU 4 倍
- 类型 Container 或 Pod/PVC

---
# Solution: Project Resources - LimitRange 益处
概述：控制容器配置文件。

> LimitRanges help control the container resource profiles so that no containers require more resources than a cluster node can provide. LimitRanges can also prevent cluster users from creating containers that consume many resources, making the nodes not allocatable for other containers. 

- 控制配置文件防超节点资源
- 防用户创建高耗容器
- 比率控 requests/limits 差，减小过载风险

---
# Solution: Project Resources - 其他节点资源
概述：PID 等共享资源。

> Keep in mind that other shared node-level resources such as process IDs (PIDs) can be exhausted before hitting any resource limits. Kubernetes allows you to reserve a number of node PIDs for system use and ensure that they are never exhausted by user workloads. Similarly, Pod PID limits allow a cluster administrator to limit the number of processes running in a Pod. We are not reviewing these in details here as they are set as Kubelet configuration options by cluster administrators and are not used by application developers.

- PID 等节点资源可能先耗尽
- 保留系统 PID，限 Pod 进程数
- 管理员 Kubelet 配置，非开发使用

---
# Solution: Capacity Planning - 规划挑战
概述：多环境容量规划复杂。

> For example, for best hardware utilization, on a nonproduction cluster, you may have mainly Best-Effort and Burstable containers. 
> 
> In such a dynamic environment, many containers are starting up and shutting down at the same time, and even if a container gets killed by the platform during resource starvation, it is not fatal. 
> 
> On the production cluster, where we want things to be more stable and predictable, the containers may be mainly of the Guaranteed type, and some may be Burstable. If a container gets killed, that is most likely a sign that the capacity of the cluster should be increased.

- 不同环境配置文件和实例数变异
- 非生产 Best-Effort/Burstable 动态，杀非致命
- 生产 Guaranteed/Burstable 稳定，杀示增容

---
# Solution: Capacity Planning - 示例表
概述：服务需求容量规划表。

> Table 2-1 presents a few services with CPU and memory demands.

> Table 2-1. Capacity planning example

- 表展示服务 CPU/内存需求
- 实际多服务、管理、开发阶段
- 持续演进规划

---
# Solution: Capacity Planning - 真实场景
概述：Kubernetes 使用原因。

> Of course, in a real-life scenario, the more likely reason you are using a platform such as Kubernetes is that there are many more services to manage, some of which are about to retire, and some of which are still in the design and development phase. Even if it is a continually m...(truncated)

- 多服务管理、退役、设计阶段
- Kubernetes 处理复杂性
- 持续监控调整
