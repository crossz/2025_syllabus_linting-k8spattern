### 题目清单

1. 填空题：云原生应用必须声明其资源需求，以避免过度或不足（ ）。

答案: provisioning

原文: Cloud native applications must declare their resource requirements to avoid over- or under-provisioning.

2. 单选题：Predictable Demands 模式的主要问题是？（ ）
A. 网络延迟
B. 不可预测的资源使用导致资源浪费或中断
C. 服务发现失败
D. 存储不足

答案: B. 不可预测的资源使用导致资源浪费或中断

原文: The problem with unpredictable resource demands is that it leads to either overprovisioning (wasted resources) or underprovisioning (application disruptions).

3. 填空题：运行时依赖如日志或监控代理可以通过（ ）模式注入。

答案: sidecar

原文: Runtime dependencies like logging or monitoring agents can be injected via the sidecar pattern.

4. 单选题：Resource Profiles 用于声明什么？（ ）
A. 网络端口
B. CPU 和内存的请求和限制
C. 存储卷
D. 服务标签

答案: B. CPU 和内存的请求和限制

原文: Resource profiles allow containers to declare their CPU and memory requests and limits.

5. 填空题：Pod 优先级通过（ ）类定义，以在资源争用时优先调度。

答案: PriorityClass

原文: Pod priority is defined through PriorityClass objects to prioritize scheduling during resource contention.

6. 单选题：Project Resources 包括哪些 Kubernetes 资源？（ ）
A. Deployment 和 Service
B. ResourceQuota 和 LimitRange
C. ConfigMap 和 Secret
D. Ingress 和 NetworkPolicy

答案: B. ResourceQuota 和 LimitRange

原文: Project resources include ResourceQuota and LimitRange to constrain usage within namespaces.

7. 填空题：容量规划涉及节点大小选择和（ ）策略，以优化资源利用。

答案: bin-packing

原文: Capacity planning involves node sizing and bin-packing strategies to optimize resource utilization.

8. 单选题：如果不声明资源请求，调度器会做什么？（ ）
A. 自动分配最大资源
B. 假设 0 请求，导致调度失败
C. 忽略 Pod
D. 使用默认限制

答案: B. 假设 0 请求，导致调度失败

原文: If no resource requests are declared, the scheduler assumes 0 requests, which can lead to scheduling failures.

9. 填空题：LimitRange 确保容器内存限制不超过节点（ ）的百分比。

答案: allocatable

原文: LimitRange ensures that container memory limits do not exceed a percentage of the node's allocatable memory.

10. 单选题：Runtime Dependencies 问题源于什么？（ ）
A. 核心应用与辅助组件的耦合
B. 数据库连接
C. API 版本
D. 标签匹配

答案: A. 核心应用与辅助组件的耦合

原文: The issue with runtime dependencies is the tight coupling between the core application and auxiliary components.

11. 填空题：ResourceQuota 限制命名空间的总 CPU 使用为（ ）核。

答案: 2

原文: A ResourceQuota can limit the total CPU usage in a namespace to 2 cores.

12. 单选题：Pod Priority 的值范围是？（ ）
A. 0 到 100
B. -1 到 10000
C. 1 到 1000
D. 0 到 65535

答案: B. -1 到 10000

原文: Priority values range from -1 to 10000, with higher values indicating higher priority.

13. 填空题：Bin-packing 调度策略旨在最大化节点（ ）。

答案: utilization

原文: The bin-packing scheduling strategy aims to maximize node utilization by packing Pods tightly.

14. 单选题：对于不可预测的依赖，使用什么模式？（ ）
A. Ambassador
B. Adapter
C. Sidecar
D. Init Container

答案: B. Adapter

原文: For unpredictable dependencies, the adapter pattern normalizes interfaces.

15. 填空题：默认的 QoS 类包括 Guaranteed、Burstable 和（ ）。

答案: BestEffort

原文: The default QoS classes are Guaranteed, Burstable, and BestEffort.

16. 单选题：Capacity Planning 的目标是什么？（ ）
A. 最小化节点数量
B. 平衡成本和性能
C. 忽略资源
D. 最大化延迟

答案: B. 平衡成本和性能

原文: Capacity planning seeks to balance cost and performance by right-sizing nodes.

17. 填空题：如果 Pod 声明 CPU 限制为 500m，它可以突发到（ ）核。

答案: 1

原文: A Pod with a CPU limit of 500m can burst up to 1 core if resources allow.

18. 单选题：ResourceQuota 的作用是？（ ）
A. 设置单个 Pod 限制
B. 限制整个项目的聚合资源
C. 配置网络
D. 管理标签

答案: B. 限制整个项目的聚合资源

原文: ResourceQuota limits the aggregate resource consumption across all Pods in a project.

19. 填空题：讨论中提到，预测需求有助于（ ）和容量规划。

答案: scheduling

原文: Predictable demands facilitate better scheduling and capacity planning.

20. 单选题：本书 Chapter 2 的示例镜像是什么？（ ）
A. nginx:1.0
B. k8spatterns/sidecar:1.0
C. busybox:latest
D. alpine:3.0

答案: B. k8spatterns/sidecar:1.0

原文: image: k8spatterns/sidecar:1.0

### PPT Slides 文字稿

**Slide 1: 标题页**  
标题: Kubernetes Patterns - Chapter 2: Predictable Demands (扩展版)  
副标题: Reusable Elements for Designing Cloud Native Applications (Second Edition)  
作者: Bilgin Ibryam & Roland Huß  
内容概述: 本PPT详细覆盖 Predictable Demands 模式，扩展为20页，深入资源管理和规划。  
(包括书籍封面图片)

**Slide 2: 章节概述 (1/2)**  
主要内容:  
- Chapter 2: Predictable Demands (页15-26)。  
- 结构: Problem, Solution, Runtime Dependencies, Resource Profiles, Pod Priority, Project Resources, Capacity Planning, Discussion。  
关键点:  
- 焦点: 声明资源以优化调度和利用。  
(引用原文: The Predictable Demands pattern addresses how to make resource usage predictable.)

**Slide 3: 章节概述 (2/2)**  
主要内容:  
- Part I: Foundational Patterns。  
- 目标: 避免 over/under-provisioning。  
关键点:  
- 与 Chapter 1 分布式原语相关。  
(引用原文: Cloud native applications must declare their resource requirements...)

**Slide 4: Problem - 不可预测需求 (1/2)**  
主要内容:  
- 问题: 资源使用不可预测，导致浪费或中断。  
- 示例: 突发流量或依赖变化。  
关键点:  
- 调度器无法优化。  
(引用原文: The problem with unpredictable resource demands is that it leads to either overprovisioning...)

**Slide 5: Problem - 不可预测需求 (2/2)**  
主要内容:  
- 影响: 成本高、性能差、SLA 违反。  
- 云原生需求: 可预测以自动化。  
关键点:  
- 焦点于运行时行为。  
(引用原文: Unpredictable demands make it hard for the scheduler to optimize placement.)

**Slide 6: Solution - 概述 (1/2)**  
主要内容:  
- 解决方案: 声明请求/限制，注入依赖。  
- 核心: 资源配置文件和 QoS 类。  
关键点:  
- 确保调度成功。  
(引用原文: The solution is to declare predictable resource demands through requests and limits.)

**Slide 7: Solution - 概述 (2/2)**  
主要内容:  
- 子节覆盖: 依赖注入、优先级、配额、规划。  
- 益处: 更好利用和稳定性。  
关键点:  
- 与后续模式整合。  
(引用原文: This pattern enables efficient scheduling and resource management.)

**Slide 8: Runtime Dependencies - 概念 (1/2)**  
主要内容:  
- 问题: 核心与辅助耦合 (日志、监控)。  
- 解决方案: Sidecar、Adapter、Ambassador 模式。  
关键点:  
- 解耦注入。  
(引用原文: Runtime dependencies like logging or monitoring agents can be injected via the sidecar pattern.)

**Slide 9: Runtime Dependencies - 概念 (2/2)**  
主要内容:  
- 示例: Sidecar Pod 共享网络/存储。  
- YAML: 多容器 Pod。  
关键点:  
- 标准化接口。  
(插入 Example YAML for sidecar)

**Slide 10: Resource Profiles - 概念**  
主要内容:  
- 声明 CPU/memory requests/limits。  
- QoS: Guaranteed (request=limit), Burstable, BestEffort。  
关键点:  
- 请求用于调度，限制用于节流。  
(引用原文: Resource profiles allow containers to declare their CPU and memory requests and limits.)

**Slide 11: Resource Profiles - 示例 (1/2)**  
主要内容:  
- YAML 示例: resources: requests: cpu: 100m, memory: 128Mi; limits: cpu: 200m。  
关键点:  
- 突发行为。  
(插入 Example 2-1 YAML)

**Slide 12: Resource Profiles - 示例 (2/2)**  
主要内容:  
- 无声明: 0 请求，调度失败风险。  
- 益处: 避免 OOM 和 CPU 饥饿。  
关键点:  
- BestEffort QoS 风险高。  
(引用原文: If no resource requests are declared, the scheduler assumes 0 requests...)

**Slide 13: Pod Priority - 概念**  
主要内容:  
- PriorityClass: 值 -1 到 10000，高优先调度。  
- Preemption: 高优先驱逐低优先 Pod。  
关键点:  
- 资源争用时使用。  
(引用原文: Pod priority is defined through PriorityClass objects...)

**Slide 14: Pod Priority - 示例**  
主要内容:  
- YAML: priorityClassName: high-priority。  
- 系统保留: kube-system 优先。  
关键点:  
- 避免过度使用。  
(插入 Example 2-2 YAML)

**Slide 15: Project Resources - 概念 (1/2)**  
主要内容:  
- ResourceQuota: 聚合限制 (e.g., 总 CPU 2 核)。  
- LimitRange: 默认/最小/最大值。  
关键点:  
- 多租户隔离。  
(引用原文: Project resources include ResourceQuota and LimitRange...)

**Slide 16: Project Resources - 概念 (2/2)**  
主要内容:  
- 示例: LimitRange 内存不超过 50% allocatable。  
- 防止滥用。  
关键点:  
- Namespace 级别。  
(引用原文: LimitRange ensures that container memory limits do not exceed...)

**Slide 17: Capacity Planning - 概念 (1/2)**  
主要内容:  
- 节点大小: 匹配工作负载。  
- 策略: Spread (高可用), Bin-packing (高利用)。  
关键点:  
- 平衡成本/性能。  
(引用原文: Capacity planning involves node sizing and bin-packing strategies...)

**Slide 18: Capacity Planning - 概念 (2/2)**  
主要内容:  
- 工具: kube-capacity, cluster-proportional-autoscaler。  
- 监控利用率。  
关键点:  
- 动态调整。  
(引用原文: The bin-packing scheduling strategy aims to maximize node utilization...)

**Slide 19: Discussion - 最佳实践 & 总结 (1/2)**  
主要内容:  
- 讨论: 预测需求提升调度和规划。  
- 实践: 从小开始，监控调整。  
关键点:  
- 与 autoscaling 整合。  
(引用原文: Predictable demands facilitate better scheduling and capacity planning.)

**Slide 20: More Information & 总结 (2/2)**  
主要内容:  
- 参考: Kubernetes 文档 (Resource Management)。  
总结:  
- Predictable Demands 是基础模式。  
- 与题目: 覆盖声明、优先级、配额。  
关键点:  
- k8spatterns.io 示例。  
(引用原文: Additional information related to this pattern...)
