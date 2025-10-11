---
class: lead
# Kubernetes Patterns Chapter 10: Singleton Service - Problem: Scaling Capabilities
概述：Kubernetes 缩放能力是核心，但与单一实例冲突。
- 本章探讨单一服务模式，确保应用只有一个活跃实例同时保持高可用
- Kubernetes 缩放能力是核心，但与单一实例冲突
- 通过机制实现平衡

---
# Chapter 10: Singleton Service - Problem: Imperative and Declarative Scaling
概述：介绍命令式和声明式缩放方法。
> One of the main capabilities provided by Kubernetes is the ability to easily and transparently scale applications.

- Kubernetes 通过简单命令或声明式控制器实现透明缩放
- 提升吞吐和可用性，Service 分发流量
- 自动故障转移机制

---
# Chapter 10: Singleton Service - Problem: Pods Scaling Methods
概述：Pod 缩放的多种方式。
> Pods can scale imperatively with a single command such as `kubectl scale`, or declaratively through a controller definition such as ReplicaSet, or even dynamically based on the application load, as we describe in Chapter 29, “Elastic Scale”.

- 命令式如 kubectl scale，声明式如 ReplicaSet
- 动态基于负载，详见第 29 章弹性扩展
- 多种方式适应不同场景

---
# Chapter 10: Singleton Service - Problem: Multiple Instances Benefits
概述：多实例带来的系统益处。
> By running multiple instances of the same service (not a Kubernetes Service but a component of a distributed application represented by a Pod), the system usually increases throughput and availability.

- 多实例提升系统吞吐和可用性
- Pod 代表分布式组件
- 负载均衡分发请求

---
# Chapter 10: Singleton Service - Problem: Availability Increase
概述：可用性提升的机制。
> The availability increases because if one instance of a service becomes unhealthy, the request dispatcher forwards future requests to other healthy instances.

- 不健康实例时，调度器转发到健康副本
- 确保服务连续性
- 分发器如 Kubernetes Service

---
# Chapter 10: Singleton Service - Problem: Replicas and Service Role
概述：Pod 副本与 Service 的角色。
> In Kubernetes, multiple instances are the replicas of a Pod, and the Service resource is responsible for the request distribution and load balancing.

- Pod 副本和 Service 负载均衡标准
- 但某些应用不允许多实例
- 引入单一模式需求

---
# Chapter 10: Singleton Service - Problem: Single Instance Allowance
概述：单一实例允许的场景示例。
> However, in some cases, only one instance of a service is allowed to run at a time. For example, if there is a periodically executed task in a service and multiple instances of the same service, every instance will trigger the task at the scheduled intervals, leading to duplicates rather than having only one task fired as expected.

- 周期任务多实例导致重复触发
- 预期单一执行但实际多重
- 业务一致性问题

---
# Chapter 10: Singleton Service - Solution: Pattern Definition and Implementation
概述：单一服务模式定义与实现选项。
> The Singleton Service pattern ensures that only one instance o an application is active at a time and yet is highly available. This pattern can be implemented from within the application or delegated fully to Kubernetes.

- 单一活跃实例高可用保证
- 应用内或 Kubernetes 委托实现
- 根据复杂度灵活选择

---
# Chapter 10: Singleton Service - Solution: Deployment with Replicas=1
概述：使用 Deployment replicas=1 的基本实现。
> Use Deployment with replicas=1 for basic singleton.

- Deployment replicas=1 基础单一实现
- 自动单一 Pod 生命周期管理
- 通过重启实现高可用

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
- YAML 示例单一副本定义
- 标签匹配确保
- 简单场景适用

---
# Chapter 10: Singleton Service - Solution: Pod Disruption Budget
概述：Pod Disruption Budget 用于控制中断。
> Use PodDisruptionBudget to control voluntary disruptions.

- PDB 控制自愿中断最小可用
- 维护时防止可用性降
- 与 replicas=1 组合稳定

---
# Chapter 10: Singleton Service - Solution: Leader Election
概述：领导者选举用于高级协调。
> For advanced, use leader election to coordinate active instance.

- 领导者选举动态活跃协调
- 故障自动切换
- 复杂分布式适用

---
# Chapter 10: Singleton Service - Discussion: Balance in Distributed Systems
概述：分布式系统中唯一性和可用性的平衡。
> Singleton pattern balances uniqueness and availability in distributed systems.

- 唯一性和可用性权衡
- Deployment PDB 组合
- 关键单一服务如控制器

---
# Chapter 10: Singleton Service - More Information: Resources and Examples
概述：资源链接和示例信息。
> - Singleton Service Example
> - Kubernetes Deployment
> - Pod Disruption Budget

- 示例代码官方文档
- Deployment 配置深入
- PDB 实践

---

class: lead
# Kubernetes Patterns Chapter 11: Stateless Service - Problem: Microservices Dominance
概述：微服务架构在云原生中的主导地位。
- 本章描述无状态服务，构建相同短暂副本
- 微服务架构主导云原生
- 动态环境快速缩放高可用

---
# Chapter 11: Stateless Service - Problem: Architecture Principles
概述：微服务架构的核心原则。
> The microservices architecture style is the dominant choice for implementing new greenfield cloud native applications.

- 微服务单一关注数据所有部署边界
- 十二因素原则 Kubernetes 操作易
- 绿地首选

---
# Chapter 11: Stateless Service - Problem: Driving Principles
概述：驱动微服务架构的原则。
> Among the driving principles of this architecture are things such as how it addresses a single concern, how it owns its data, how it has a well-encapsulated deployment boundary, and others.

- 单一关注数据所有封装边界
- 使服务短暂无副作用
- 动态云友好

---
# Chapter 11: Stateless Service - Problem: Domain Understanding
概述：理解业务领域的重要性。
> Typically, such applications also follow the [twelve-factor app principles](https://12factor.net), which makes them easy to operate with Kubernetes on dynamic cloud environments.

- 十二因素简化操作
- 动态环境优化
- 业务领域服务边界理解

---
# Chapter 11: Stateless Service - Problem: Applying Principles
概述：应用原则的领域驱动方法。
> Applying some of these principles requires understanding the business domain, identifying the service boundary, or applying domain-driven design or a similar methodology during the service implementation.

- 领域驱动设计识别边界
- 实施方法论
- 业务洞察应用原则

---
# Chapter 11: Stateless Service - Problem: Ephemeral Services
概述：实现短暂服务的原则。
> Implementing some of the other principles may involve making the services ephemeral, which means the service can be created, scaled, and destroyed with no side effects. These latter concerns are easier to address when a service is stateless rather than stateful.

- 短暂服务无副作用缩放
- 无状态易于有状态
- 关注分离简化

---
# Chapter 11: Stateless Service - Problem: Stateless Definition
概述：无状态服务的定义。
> A stateless service does not maintain any state internally within the instance across service interactions. In our context, it means a container is stateless if it does not hold any information from requests in its internal storage (memory or temporary filesystem) that is critical ...

- 不跨交互内部状态
- 容器不持关键请求内存临时文件
- 确保替换性

---
# Chapter 11: Stateless Service - Solution: Pattern Description
概述：无状态服务模式的描述。
> The Stateless Service pattern describes how to create and operate applications that are composed of identical ephemeral replicas. These applications are best suited for dynamic cloud environments where they can be rapidly scaled and made highly available.

- 相同短暂副本组成应用
- 动态环境快速缩放高可用
- 创建操作指导

---
# Chapter 11: Stateless Service - Solution: Job for Finite Tasks
概述：Job 用于有限任务执行。
> A Job creates one or more Pods and will continue to retry execution of the Pods until a specified number of them successfully terminate.

- Job Pod 创建重试成功终止
- 可靠有限工作
- 批量扩展

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
- pi 计算示例 4 次重试
- Never 防循环
- Job 基础配置

---
# Chapter 11: Stateless Service - Solution: Work Queue Distribution
概述：工作队列的分发机制。
> Similar to Work queue Jobs, you can distribute work items to individual Jobs without needing an external work queue.

- 无外部队列工作项分发
- 单个 Job 处理
- 架构简化

---
# Chapter 11: Stateless Service - Solution: Completions for Parallel Pods
概述：completions 参数支持并行 Pod。
> When you specify .spec.completions to a value greater than 1, the Job will create that many Pods in parallel, each processing one item from the work queue.

- completions >1 并行 Pod 队列项
- 效率提升
- 隐式管理

---
# Chapter 11: Stateless Service - Solution: Indexed Jobs Similarity
概述：索引 Job 与工作队列的相似性。
> Indexed Jobs Similar to Work queue Jobs, you can distribute work items to individual Jobs without needing an external work queue. When ...

- 索引无外部依赖
- 精确分配
- 高级并行

---
# Chapter 11: Stateless Service - Discussion: Reliable Execution Benefits
概述：无状态模式下的可靠执行益处。
> The Stateless Service pattern enables reliable execution of finite tasks in Kubernetes.

- 有限任务可靠执行
- Job 类型规模适应
- 分布式优化

---
# Chapter 11: Stateless Service - More Information: Examples and Resources
概述：示例和资源链接。
> - Stateless Service Example
> - ReplicaSet
> - Persistent Volumes
> - Storage Classes
> - Access Modes

- 示例文档
- ReplicaSet 详述
- 存储配置

---

class: lead
# Kubernetes Patterns Chapter 12: Stateful Service - Problem: Kubernetes Primitives for Distributed Apps
概述：Kubernetes 原语用于分布式应用创建。
- 本章有状态服务 StatefulSet 管理唯一实例
- 原语针对无状态，有状态需特殊保证
- 持久身份网络存储序数

---
# Chapter 12: Stateful Service - Problem: Common Characteristics of Primitives
概述：原语的共同特性：无状态处理。
> We have seen many Kubernetes primitives for creating distributed applications: containers with health checks and resource limits, Pods with multiple containers, dynamic cluster-wide placements, batch jobs, scheduled jobs, singletons, and more.

- 原语创建分布式：健康资源多容器动态放置作业单例
- 全面覆盖
- 基础回顾

---
# Chapter 12: Stateful Service - Problem: Stateless Application Treatment
概述：原语对待无状态应用的特性。
> The common characteristic of these primitives is that they treat the managed application as a stateless application composed of identical, swappable, and replaceable containers and comply with the [twelve-factor app principles](https://12factor.net).

- 管理为无状态相同可换容器
- 十二因素遵守
- 平台放置弹性缩放

---
# Chapter 12: Stateful Service - Problem: Boost for Stateless but Gap for Stateful
概述：无状态益处与有状态差距。
> It is a significant boost to have a platform taking care of the placement, resiliency, and scaling of stateless applications, but there is still a large part of the workload to consider: stateful applications in which every instance is unique and has long-lived characteristics.

- 无状态放置恢复缩放益处
- 有状态实例唯一长寿工作负载大
- 早期缺乏支持

---
# Chapter 12: Stateful Service - Problem: Early Days Solution
概述：Kubernetes 早期有状态解决方案。
> In the real world, behind every highly scalable stateless service is a stateful service, typically in the shape of a data store. In the early days of Kubernetes, when it lacked support for stateful workloads, the solution was placing stateless applications on Kubernetes to get the benefits of the cloud native model and keeping stateful components outside the cluster, either on a public cloud or on-premises hardware, managed ...

- 无状态后有状态数据存储
- 早期无状态置 K8s 有状态外
- 云或本地传统管理

---
# Chapter 12: Stateful Service - Problem: Single Instance Limitations
概述：单实例 ReplicaSet 的局限。
> Whilethatismostlytrueforasingle-instancestatefulapplication,itisnotentirely true,asaReplicaSetdoesnotguaranteeAt-Most-Onesemantics,andthenumber ofreplicas  canvarytemporarily.  Such  a  situation  can  be  disastrous  and  lead  todatalossfordistributedstatefulapplications.

- 单实例近似但无 At-Most-One
- 副本临时变异数据丢失灾难
- 分布式风险

---
# Chapter 12: Stateful Service - Problem: Distributed Challenges
概述：分布式有状态服务的挑战。
> Also,themainchallengesarisewhenitisadistributedstatefulservicethatiscomposedof multipleinstances.Astateful applicationcomposedof multipleclusteredservicesrequires multifaceted guarantees fromtheunderlyinginfrastructure.Let’sseesomeof themostcommonlong-lived persistentprerequisitesfordistributedstatefulapplications.

- 分布式多实例多方面保证
- 长寿持久前提
- 集群复杂

---
# Chapter 12: Stateful Service - Problem: Storage Requirements
概述：存储需求的定义问题。
> Storage WecouldeasilyincreasethenumberofreplicasinaReplicaSetandendupwitha distributed stateful application. However, how dowedefinethestoragerequirementsinsuchacase?

- ReplicaSet 增副本易存储定义难
- 每个实例专用持久
- 共享单点

---
# Chapter 12: Stateful Service - Problem: Dedicated Persistent Storage
概述：每个实例专用持久存储需求。
> Typically,adistributedstatefulapplicationsuchasthosementionedpreviously wouldrequirededicated,persistentstorageforevery instance.AReplica‐Set withreplicas=3andaPVCdefinition wouldresultinallthreePodsattachedto thesamePV.

- 专用每个实例
- ReplicaSet PVC 共享
- 数据分区冲突

---
# Chapter 12: Stateful Service - Problem: Shared Storage Issues
概述：共享存储的问题。
> While theReplicaSetand thePVCensuretheinstancesareupandthe storageisattachedtowhichevernodetheinstancesarescheduledon,thestorageis notdedicatedbutsharedamongallPodinstances.

- 确保上附加共享非专用
- 应用内分割错误易
- 缩放损坏

---
# Chapter 12: Stateful Service - Problem: Workaround Limitations
概述：共享存储的 workaround 局限。
> Aworkaroundisfortheapplicationinstancestosharestorageandhaveanin-app mechanismtosplitthestorageintosubfoldersanduseitwithoutconflicts.

- 共享应用内分割 workaround
- 单点手动密集
- 无单一抽象

---
# Chapter 12: Stateful Service - Problem: Networking Requirements
概述：网络需求的稳定身份。
> Networking Similar to the storage requirements, a distributed stateful application requiresastable networkidentity.

- 稳定网络如存储
- 主机连接存储
- 动态 IP 不适

---
# Chapter 12: Stateful Service - Problem: Stable Network Identity
概述：稳定网络身份的配置存储。
> Inadditiontostoringapplication-specificdataintothestoragespace,statefulapplicationsalsostoreconfigurationdetailssuchashostnameand connectiondetailsof theirpeers.

- 存储数据配置对等
- 预测地址不变
- 手动 Service 繁

---
# Chapter 12: Stateful Service - Problem: Predictable Addressing
概述：可预测地址的要求。
> Thatmeanseveryinstanceshouldbereachableinapredictableaddressthatshouldnotchangedynamically,asisthecase withPodIPaddressesinaReplicaSet.

- 预测不动态
- ReplicaSet 名随机不持久
- 应用不知 Service

---
# Chapter 12: Stateful Service - Problem: Identity Dependencies
概述：身份对存储和网络的依赖。
> Identity Asyou  can  see  from  the  preceding  requirements,  clustered  statefulapplications dependheavilyoneveryinstancehavingaholdofitslong-livedstorageandnetwork identity.

- 身份元存储网络
- Pod 名唯一持久
- 集群依赖

---
# Chapter 12: Stateful Service - Problem: Ordinality Impact
概述：序数性对缩放的影响。
> That is because inastatefulapplication,every instanceisuniqueandknows itsownidentity,andthemainingredientsof thatidentityarethelong-livedstorage andthenetworkingcoordinates.Tothislist,wecouldalsoaddtheidentity/name oftheinstance(somestatefulapplicationsrequireuniquepersistentnames),whichinKuberneteswouldbethePodname.

- 唯一知身份
- 序数缩放数据分布
- 行为定位

---
# Chapter 12: Stateful Service - Problem: Fixed Position
概述：实例在集合中的固定位置。
> Ordinality Inadditiontoauniqueandlong-livedidentity,theinstancesofclusteredstateful applicationshaveafixedpositioninthecollectionof instances.Thisorderingtypi‐ cally impacts thesequencein which theinstancesarescaledupanddown.

- 固定位置
- 缩放顺序同步
- 访问行为

---
# Chapter 12: Stateful Service - Problem: Variable Requirements
概述：有状态应用的变异要求。
> OtherRequirements Stableandlong-livedstorage,networking,identity,andordinalityareamongthecollective needsof clusteredstatefulapplications.

- 集体存储网络身份序数
- 变异 quorum 最小
- CRDs Operators

---
# Chapter 12: Stateful Service - Problem: Case-by-Case Specifics
概述：案例特定的管理要求。
> Managingstatefulapplicationsalsocarriesmanyotherspecificrequirementsthatvarycasebycase.Forexample,someapplications have the notion ofa quorum andrequireaminimumnumberofinstan‐cestoalwaysbeavailable;somearesensitivetoordinality,andsomearefinewithparallelDeployments;andsometolerateduplicateinstances,andsomedon’t.

- 案例变异
- quorum 序并行重复容忍
- 通用难

---
# Chapter 12: Stateful Service - Solution: Generic Mechanisms Impossibility
概述：通用机制规划的不可能性。
> Planningforalltheseone-off casesandprovidinggenericmechanismsisanimpossibletask, and that’s why Kubernetes also allows youtocreateCustomResourceDefinitions(CRDs)andOperatorsformanagingapplicationswithbespokerequirements.TheOperatorpattern is explained inChapter 28.

- 不可能规划 CRDs Operators
- 自定义需求
- 第 28 章 Operator

---
# Chapter 12: Stateful Service - Solution: StatefulSet vs ReplicaSet Comparison
概述：StatefulSet 与 ReplicaSet 的比较。
> To explain what StatefulSet provides formanagingstatefulapplications,weoccasion‐ ally compare its behavior to the already-familiarReplicaSet primitive thatKubernetesuses forrunningstateless workloads.In many ways,StatefulSetisformanaging pets,and  ReplicaSet  is  for  managing  cattle.

- StatefulSet 宠物 ReplicaSet 牛
- 类比启发 PetSet
- 非替换 Pod

---
# Chapter 12: Stateful Service - Solution: StatefulSet Exploration
概述：StatefulSet 的工作原理探索。
> Let’s  explore  how  StatefulSets  work  and  how  they  address  theneedsof  stateful applications.Example12-1is our random-generator service as a StatefulSet.

- 工作需求地址
- random-generator 示例
- 构建保证

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name:rgo
spec:
  serviceName: random-generator
  replicas: 2
  selector:
    matchLabels:
      app:random-generator
  template:
    metadata:
      labels:
        app:random-generator
    spec:
      containers:
      -image: k8spatterns/random-generator:1.0
       name:random-generator
       ports:
       -containerPort: 8080
        name:http
       volumeMounts:
       -name:logs
        mountPath: /logs
      volumeClaimTemplates:
      -metadata:
        name:logs
       spec:
        accessModes:["ReadWriteOnce"]
        resources:
          requests:
            storage: 10Mi
```
- 2 副本日志模板
- 专用 PVC
- 缩放新

---
# Chapter 12: Stateful Service - Storage: Node Name Prefix
概述：StatefulSet 名称作为节点名前缀。
> Name ofthe StatefulSet is used as prefix for the generated node names.

- 前缀节点名
- 引用 headless
- rg-0 rg-1

---
# Chapter 12: Stateful Service - Storage: Service Reference
概述：对 Service 的引用。
> References the mandatory Service defined inExample12-2.

- 强制 Service
- 缩放创建 PVC 下不删
- 数据保护

---
# Chapter 12: Stateful Service - Storage: Pod Members
概述：StatefulSet 中的 Pod 成员。
> Two Pod members in the StatefulSet namedrg-0andrg-1.

- Pod 删 PVC 保留
- 手动回收
- 关键保护

---
# Chapter 12: Stateful Service - Storage: PVC Template
概述：每个 Pod 的 PVC 模板。
> Template for creating a PVC for each Pod (similar to the Pod’s template).

- 每个 Pod PVC 模板
- ReplicaSet 区别
- 动态

---
# Chapter 12: Stateful Service - Storage: On-the-Fly PVC Creation
概述：飞地 PVC 创建机制。
> Rather thanreferring toa predefinedPVC,StatefulSetscreatePVCs by usingvolumeClaimTemplatesontheflyduringPodcreation.ThismechanismallowseveryPodtogetitsowndedicatedPVCduringinitialcreationaswellasduringscalingupbychanging thereplicascount ofthe StatefulSets.

- 飞地创建专用
- 初始缩放
- 存储类动态

---
# Chapter 12: Stateful Service - Storage: PV Management
概述：PV 的管理责任。
> As youprobably realize, wesaidPVCsarecreatedandassociated withthePods,butwedidn’tsay anythingaboutPVs. That is becauseStatefulSetsdo notmanagePVsinanyway.ThestorageforthePodsmustbeprovisionedinadvancebyanadminor provisionedondemandbyaPVprovisionerbasedontherequestedstorageclassand ready for consumption by the stateful Pods.

- 不管 PV 预置动态
- 管理员 provisioner
- 就绪消费

---
# Chapter 12: Stateful Service - Storage: Asymmetric Scaling
概述：缩放的不对称行为。
> Note the asymmetric behavior here: scalingupaStatefulSet(increasingthereplicascount)createsnewPodsandassociatedPVCs.ScalingdowndeletesthePods,butitdoesnotdeleteanyPVCs  (orPVs),whichmeansthePVscannotberecycled ordeleted,andKubernetescannotfreethestorage.

- 不对称上创建下保留
- 防丢失
- 确认复制手动

---
# Chapter 12: Stateful Service - Networking: Headless Service
概述：headless Service 的作用。
> ThismechanismallowseveryPodtogetitsowndedicatedPVCduringinitialcreationaswellasduringscalingupbychanging thereplicascount ofthe StatefulSets.

- 卷模板非强制 serviceName 强制
- 治理网络
- 其他负载

---
# Chapter 12: Stateful Service - Networking: Headless Declaration
概述：headless Service 的声明。
> HavingdedicatedstoragedefinedthroughvolumeClaimTemplatesisnotmandatory,butlinkingtoaServicethroughserviceNamefieldis.ThegoverningServicemust exist before the StatefulSet is created and is responsible for the network identity oftheset.

- clusterIP None
- 选择器匹配
- DNS A 直接

---
# Chapter 12: Stateful Service - Networking: Stateless vs Stateful Pods
概述：无状态与有状态 Pod 的区别。
> Youcanalwayscreateothertypesof Servicesthatalsoloadbalanceacrossyourstateful Pods ifthat is what you want.

- 无状态相同负载无关
- 有状态不同特定
- headless 直接

---
# Chapter 12: Stateful Service - Networking: Headless with Selectors
概述：带选择器的 headless Service。
> AsFigure  12-1shows,  StatefulSets  offer  a  set  ofbuilding  blocks  and  guaranteed behaviorneededformanagingstatefulapplicationsinadistributedenvironment.Yourjob is to choose and use them in a meaningful way for your statefuluse case.

- 选择器端点 DNS A
- 默认 FQDN
- Pod 前缀

---
# Chapter 12: Stateful Service - Networking: DNS Entry Predictability
概述：DNS 条目的可预测性。
> IdentityisthemetabuildingblockallotherStatefulSetguaranteesarebuiltupon.ApredictablePod nameand identity is generatedbasedonStatefulSet’sname.

- 客户端预测
- FQDN Pod Service
- 动态发现

---
# Chapter 12: Stateful Service - Networking: SRV Records
概述：SRV 记录的发现功能。
> Wethen use that identity to name PVCs,reachout tospecificPodsthroughheadlessServices,andmore.Youcanpredicttheidentityof everyPodbeforecreatingitandusethat knowledge in the application itselfifneeded.

- SRV dig 所有 Pod
- 基于选择器 serviceName
- 治理身份

---
# Chapter 12: Stateful Service - Networking: FQDN Access
概述：FQDN 用于 Pod 访问。
> Thismappingallowsothermembersof theclusteredapplicationorother clients to reach specific Pods ifthey wish to.

- 链接回 Service 名
- 创建前存在
- 网络责任

---
# Chapter 12: Stateful Service - Networking: SRV Member Discovery
概述：SRV 用于成员发现。
> WecanalsoperformDNSlookupforService(SRV)records(e.g.,throughdig SRVrandom-generator.default.svc.cluster.local)anddiscoverallrunningPodsregisteredwiththeStatefulSet’sgoverningService.

- 动态如果需要
- 选择器 serviceName
- 发现成员

---
# Chapter 12: Stateful Service - Networking: Service Association
概述：Service 与 StatefulSet 的关联。
> Thismechanismallowsdynamicclustermemberdiscoveryifanyclientapplicationneedstodoso.TheassociationbetweentheheadlessServiceandtheStatefulSetisnotonlybasedontheselectors,buttheStatefulSetshouldalsolink back totheServicebyitsnameasserviceName:"random-generator".

- 卷非强制链接强制
- 治理必须先
- 其他类型负载

---
# Chapter 12: Stateful Service - Networking: Building Blocks
概述：网络构建块的集合。
> HavingdedicatedstoragedefinedthroughvolumeClaimTemplatesisnotmandatory,butlinkingtoaServicethroughserviceNamefieldis.ThegoverningServicemust exist before the StatefulSet is created and is responsible for the network identity oftheset.

- 构建块保证
- 分布式管理
- 有意义选择

---
# Chapter 12: Stateful Service - Identity: Meta Building Block
概述：身份作为元构建块。
> AsFigure  12-1shows,  StatefulSets  offer  a  set  ofbuilding  blocks  and  guaranteed behaviorneededformanagingstatefulapplicationsinadistributedenvironment.Yourjob is to choose and use them in a meaningful way for your statefuluse case.

- 身份元其他基于
- StatefulSet 名预测 Pod
- 创建前预测

---
# Chapter 12: Stateful Service - Identity: Predictable Pod Names
概述：可预测的 Pod 名称生成。
> IdentityisthemetabuildingblockallotherStatefulSetguaranteesarebuiltupon.ApredictablePod nameand identity is generatedbasedonStatefulSet’sname.

- 用于 PVC headless 特定
- 应用知识需
- 自知增强

---
# Chapter 12: Stateful Service - Identity: Application Knowledge Use
概述：应用内使用身份知识。
> Wethen use that identity to name PVCs,reachout tospecificPodsthroughheadlessServices,andmore.Youcanpredicttheidentityof everyPodbeforecreatingitandusethat knowledge in the application itselfifneeded.

- 定义多唯一非换
- 实例化顺序位置
- 要求来源

---
# Chapter 12: Stateful Service - Ordinality: Scaling Role
概述：序数在缩放中的作用。
> Ordinality By definition,adistributedstatefulapplicationconsistsof multiple instances thatare uniqueandnonswappable.Inadditiontotheiruniqueness,instancesmayalsoberelatedtooneanother basedontheirinstantiationorder/position,andthisis wheretheordinalityrequirement comesin.

- 缩放序数
- 名序数字符创建顺序
- 反向 n-1 0

---
# Chapter 12: Stateful Service - Ordinality: Sequential Guarantees
概述：序贯启动和关闭的保证。
> FromaStatefulSetpointof view,theonlyplacewhereordinalitycomesintoplayisduringscaling.Podshavenamesthathaveanordinalsuffix(startingfrom0),and thatPodcreationorderalsodefinestheorderinwhichPodsarescaledupanddown(in reverse order,fromn–1 to 0).

- ReplicaSet 并行无等
- 启动就绪无保
- 更快不适

---
# Chapter 12: Stateful Service - Ordinality: ReplicaSet Contrast
概述：与 ReplicaSet 的对比。
> Ifwe  create  a  ReplicaSet  with  multiple  replicas,  Pods  are  scheduled  and  started togetherwithoutwaitingforthefirstonetostartsuccessfully(runningandreadystatus,asdescribedinChapter4,“HealthProbe”).

- 缩放同时无序
- 无依赖
- 数据同步需序

---
# Chapter 12: Stateful Service - Ordinality: Startup Order
概述：启动顺序的非保证性。
> TheorderinwhichPodsare starting and are ready isnot guaranteed. It is the same when we scaledownaReplica‐Set(eitherbychangingthereplicascountordeletingit).

- 同时关闭更快不优
- 数据分区需同步
- 默认序贯

---
# Chapter 12: Stateful Service - Ordinality: Shutdown Order
概述：关闭顺序的非保证性。
> AllPodsbelongingtoa ReplicaSetstartshuttingdownsimultaneouslywithoutanyorderinganddependency amongthem.Thisbehaviormaybefastertocompletebutisnotpreferredforstatefulapplications,especiallyifdatapartitioninganddistributionareinvolvedamongthe instances.

- 默认从 0 成功下一
- 关闭最高先成功下
- 适当同步

---
# Chapter 12: Stateful Service - Ordinality: Data Synchronization
概述：数据同步的序贯处理。
> To  allowproper  data  synchronization  during  scale-up  and  -down,  StatefulSet  bydefaultperformssequentialstartupandshutdown.ThatmeansPodsstartfromthefirstone(withindex0),andonly whenthatPodhassuccessfullystartedisthenext onescheduled(withindex1),and thesequencecontinues.

- 顺序反转确保
- 直到 0
- 一致

---
# Chapter 12: Stateful Service - Other Features: Customizable Aspects
概述：有状态应用的自定义方面。
> Duringscalingdown, the orderreverses—firstshuttingdownthePodwiththehighestindex,andonlywhenithasshutdownsuccessfullyisthePodwiththenextlowerindexstopped.This sequence continues until the Pod with index 0 is terminated.

- 其他自定义适应
- 应用唯一考虑
- 拟合模型

---
# Chapter 12: Stateful Service - Partitioned Updates: Phased Rollout
概述：分区更新的阶段 rollout。
> StatefulSetshaveotheraspectsthatarecustomizabletosuittheneedsofstateful applications.EachstatefulapplicationisuniqueandrequirescarefulconsiderationwhiletryingtofititintotheStatefulSetmodel.

- 序贯外更新阶段
- 金丝雀保证不变
- .spec.template 改

---
# Chapter 12: Stateful Service - Partitioned Updates: Rolling Strategy
概述：默认滚动更新策略。
> Let’sseeafewmoreKubernetes features that may turn out to be useful while taming stateful applications:

- 默认滚动 partition 数
- 默认 0 全
- 指定序分区

---
# Chapter 12: Stateful Service - Partitioned Updates: Partition Parameter
概述：分区参数的指定。
> Partitionedupdates WedescribedearlierthesequentialorderingguaranteeswhenscalingaStateful‐Set.Asforupdatinganalready-runningstatefulapplication  (e.g.,byalteringthe.spec.templateelement), StatefulSets allow phased rollout(such asacanary release),whichguaranteesacertainnumberofinstancestoremainintactwhile applyingupdatestotherestoftheinstances.

- >= 更新 < 不
- 删除重旧版
- 保留 quorum

---
# Chapter 12: Stateful Service - Partitioned Updates: Update Behavior
概述：更新行为的描述。
> By using the default rolling updatestrategy, youcanpartitioninstancesbyspeci‐fyinga.spec.updateStrategy.rollingUpdate.partitionnumber.The param‐eter  (withadefaultvalueof0)indicatestheordinalatwhichtheStatefulSet shouldbepartitionedforupdates.

- 部分更新
- 设 0 剩余
- 安全集群

---
# Chapter 12: Stateful Service - Partitioned Updates: Stepwise Rollout
概述：逐步 rollout 的功能。
> Iftheparameterisspecified,allPodswithanordinalindexgreaterthanorequaltothepartitionareupdated,whileall Podswithanordinallessthanthatarenotupdated.

- 并行启动终止
- 无等待就绪完成
- 加速无序

---
# Chapter 12: Stateful Service - Parallel Deployments: Policy Setting
概述：并行部署的政策设置。
> ThatistrueevenifthePods aredeleted;Kubernetesrecreatesthematthepreviousversion.Thisfeaturecan enablepartialupdatestoclusteredstatefulapplications(ensuringthequorumis preserved,forexample)andthenrolloutthechangestotherestoftheclusterbysetting thepartitionback to 0.

- Parallel 政策
- 序非要求加速
- 速度一致平衡

---
# Chapter 12: Stateful Service - Parallel Deployments: Use Cases
概述：并行部署的适用场景。
> Paralleldeployments When weset.spec.podManagementPolicytoParallel,theStatefulSetlaunches orterminatesallPodsinparallelanddoesnotwaitforPodstorunandbecome readyorcompletelyterminatedbeforemovingtothenextone.

- 无序要求加速操作
- 自定义选择
- 平衡

---
# Chapter 12: Stateful Service - At-Most-One Guarantee: Uniqueness Attribute
概述：At-Most-One 保证的唯一性属性。
> Ifsequential processingisnotarequirementforyourstatefulapplication,thisoptioncan speedupoperationalprocedures.

- 唯一基础
- 无两同身份 PV
- ReplicaSet 对比

---
# Chapter 12: Stateful Service - At-Most-One Guarantee: Contrast with At-Least-X
概述：与 At-Least-X 的对比。
> At-Most-OneGuarantee Uniquenessisamongthefundamentalattributesofstatefulapplicationinstances, andKubernetesguaranteesthatuniquenessbymakingsurenotwoPodsofaStatefulSethavethesameidentityorareboundtothesamePV.

- At-Least-X 至少
- 临时多接受
- 替换节点问题

---
# Chapter 12: Stateful Service - At-Most-One Guarantee: Strict Checks
概述：严格检查机制。
> Incontrast,ReplicaSetofferstheAt-Least-X-Guaranteeforitsinstances.Forexample,aRep‐ licaSetwithtworeplicastriestokeepatleasttwoinstancesupandrunningatalltimes.

- 优先不低于
- StatefulSet 每检查无重复
- 确认关闭新

---
# Chapter 12: Stateful Service - At-Most-One Guarantee: Semantics Rules
概述：语义规则的定义。
> Evenif thereisoccasionallyachanceforthatnumbertogohigher, thecontroller’spriorityisnottoletthenumberof Podsgobelowthespecified number.

- 语义规则
- 节点失败确认
- 不可达不立即

---
# Chapter 12: Stateful Service - At-Most-One Guarantee: Breaking Guarantees
概述：打破保证的方式。
> Itispossibletohavemorethanthespecifiednumberofreplicasrunning when a Pod is being replaced by a new one and the old Pod is still notfully termi‐nated.Or,itcangohigherif aKubernetesnodeisunreachablewithNotReadystate but still has running Pods.

- 人类干预破
- 如 API 删物理跑
- 仅死机执行

---
# Chapter 12: Stateful Service - At-Most-One Guarantee: Human Intervention
概述：人类干预的风险。
> In this scenario, theReplicaSet’scontroller wouldstartnewPodsonhealthynodes,whichcouldleadtomorerunningPodsthandesired. That is all acceptable within the semantics ofAt-Least-X.

- 强制 --force --grace=0
- 不等确认立即清启动重复
- 详单实例

---
# Chapter 12: Stateful Service - At-Most-One Guarantee: Force Delete Example
概述：强制删除的示例。
> A StatefulSet controller, on the otherhand,makesevery possiblecheck toensuretherearenoduplicatePods—hence theAt-Most-OneGuarantee.ItdoesnotstartaPodagainunlesstheoldinstanceisconfirmedtobeshutdowncompletely.

- 其他单实例第 10
- 深度讨论
- 扩展

---
# Chapter 12: Stateful Service - Discussion: Standard Requirements and Challenges
概述：标准要求与挑战的回顾。
> Whenanodefails,itdoesnotschedulenewPodsonadifferentnodeunless KubernetescanconfirmthatthePods  (andmaybethewholenode)areshutdown.

- 标准要求挑战回顾
- 多维状态
- 存储外方面

---
# Chapter 12: Stateful Service - Discussion: StatefulSet as Starting Point
概述：StatefulSet 作为起点。
> The At-Most-One semantics ofStatefulSets dictates these rules.

- 单易分布式多维
- 状态不止存储
- 不同保证

---
# Chapter 12: Stateful Service - Discussion: Stateful World Complexity
概述：有状态世界的复杂性。
> Itisstillpossibleto break theseguaranteesandendup withduplicatePodsina StatefulSet, but this requires active human intervention. For example,deletingan unreachablenoderesourceobjectfromtheAPIServerwhile