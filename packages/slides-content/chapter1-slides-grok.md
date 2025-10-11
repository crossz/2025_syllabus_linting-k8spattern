---
class: lead
---
# Kubernetes Patterns
## Chapter 1: Introduction
- 本章设置书籍场景，解释 Kubernetes 核心概念用于设计云原生应用
- 回顾分布式原语和原则，帮助构建可自动化系统
- 非前提，可跳过直接进入模式

---
# The Path to Cloud Native: 微服务路径
微服务作为云原生架构风格。

> In this introductory chapter, we set the scene for the rest of the book by explaining a few of the core Kubernetes concepts used for designing and implementing cloud native applications. Understanding these new abstractions, and the related principles and patterns from this book, is key to building distributed applications that can be automatable by Kubernetes.

- 介绍章节解释核心概念和抽象
- 新抽象结合本书原则和模式
- 关键于构建可 Kubernetes 自动化的分布式应用

---
# The Path to Cloud Native: 微服务路径
微服务处理复杂性。

> This chapter is not a prerequisite for understanding the patterns described later. Readers familiar with Kubernetes concepts can skip it and jump straight into the pattern category of interest.

- 非必要章节，熟悉者可跳
- 直接进入感兴趣模式类别
- 灵活阅读结构

---
# The Path to Cloud Native: 微服务路径
微服务模块化业务能力。

> Microservices is among the most popular architectural styles for creating cloud native applications. They tackle software complexity through modularization of business capabilities and trading development complexity for operational complexity. That is why a key prerequisite for becoming successful with microservices is to create applications that can be operated at scale through Kubernetes.

- 微服务流行风格，模块化业务能力
- 交换开发复杂为运营复杂
- 成功前提：Kubernetes 大规模运营应用

---
# The Path to Cloud Native: 微服务路径
微服务理论和工具。

> As part of the microservices movement, there is a tremendous amount of theory, techniques, and supplemental tools for creating microservices from scratch or for splitting monoliths into microservices. Most of these practices are based on Domain-Driven Design by Eric Evans (Addison-Wesley) and the concepts of bounded contexts and aggregates. Bounded contexts deal with large models by dividing them into different components, and aggregates help to further group bounded contexts into modules with defined transaction boundaries.

- 微服务运动提供理论、技术和工具
- 基于领域驱动设计、边界上下文和聚合
- 大模型分组件，聚合定义事务边界

---
# The Path to Cloud Native: 微服务路径
分布式系统技术关注。

> However, in addition to these business domain considerations, for each distributed system—whether it is based on microservices or not—there are also technical concerns around its external structure, and runtime coupling. Containers and container orchestrators such as Kubernetes bring in new primitives and abstractions to address the concerns of distributed applications, and here we discuss the various options to consider when putting a distributed system into Kubernetes.

- 业务域外，技术关注外部结构和运行时耦合
- 容器和 Kubernetes 新原语抽象解决
- 讨论分布式系统置入 Kubernetes 选项

---
# The Path to Cloud Native: 微服务路径
容器黑盒视角。

> Throughout this book, we look at container and platform interactions by treating the containers as black boxes. However, we created this section to emphasize the importance of what goes into containers. Containers and cloud native platforms bring tremendous benefits to your distributed applications, but if all you put into containers is rubbish, you will get distributed rubbish at scale. Figure 1-1 shows the mixture of the skills required for creating good cloud native applications and where Kubernetes patterns fit in.

- 全书视容器为黑盒，但强调内容重要
- 垃圾输入得大规模垃圾
- 图 1-1 技能混合和 Kubernetes 模式位置

---
# The Path to Cloud Native: 微服务路径
云原生技能混合。

> Figure 1-1. The path to cloud native

> At a high level, creating good cloud native applications requires familiarity with multiple design techniques:

- 高层云原生应用需多设计技术熟悉
- 技能路径图示
- 全面能力构建

---
# The Path to Cloud Native: 微服务路径
代码级技能。

> • At the lowest code level, every variable you define, every method you create, and every class you decide to instantiate plays a role in the long-term maintenance of the application. No matter what container technology and orchestration platform you use, the development team and the artifacts they create will have the most impact. It is important to grow developers who strive to write clean code, have the right number of automated tests, constantly refactor to improve code quality, and are guided by Software Craftsmanship principles at heart.

- 最低代码级，每变量、方法、类影响长期维护
- 开发团队和产物最大影响
- 培养写洁代码、测试、持续重构的工匠开发者

---
# The Path to Cloud Native: 微服务路径
领域驱动设计。

> • Domain-driven design is about approaching software design from a business perspective with the intention of keeping the architecture as close to the real world as possible. This approach works best for object-oriented programming languages, but there are also other good ways to model and design software for real-world problems. A model with the right business and transaction boundaries, easy-to-consume interfaces, and rich APIs is the foundation for successful containerization and automation later.

- 从业务视角设计，贴近真实世界
- 最佳对象导向，但其他建模方式好
- 正确边界、易接口、丰富 API 基础容器化和自动化

---
# The Path to Cloud Native: 微服务路径
六边形架构。

> • The hexagonal architecture and its variations, such as Onion and Clean architectures, improve the flexibility and maintainability of applications by decoupling the application components and providing standardized interfaces for interacting with them. By decoupling the core business logic of a system from the surrounding infrastructure, hexagonal architecture makes it easier to port the system to different environments or platforms. These architectures complement domain-driven design and help arrange application code with distinct boundaries and externalized infrastructure dependencies.

- 六边形及其变体解耦组件，提供标准接口
- 核心业务逻辑解耦基础设施，便移植
- 补领域驱动，安排代码边界和外部依赖

---
# The Path to Cloud Native: 微服务路径
微服务和十二因素。

> • The microservices architectural style and the twelve-factor app methodology very quickly evolved to become the norm for creating distributed applications and they provide valuable principles and practices for designing changing distributed applications. Applying these principles lets you create implementations that are optimized for scale, resiliency, and pace of change, which are common requirements for any modern software today.

- 微服务风格和十二因素成规范
- 提供原则实践设计变化分布式应用
- 优化规模、弹性、变更速度，现代软件需求

---
# The Path to Cloud Native: 微服务路径
容器打包。

> • Containers were very quickly adopted as the standard way of packaging and running distributed applications, whether these are microservices or functions. Creating modular, reusable containers that are good cloud native citizens is another fundamental prerequisite. Cloud native is a term used to describe principles, patterns, and tools to automate containerized applications at scale. We use cloud native interchangeably with Kubernetes, which is the most popular open source cloud native platform available today.

- 容器标准打包运行分布式应用
- 模块化复用容器为云原生公民前提
- 云原生原则模式工具自动化规模，Kubernetes 最流行

---
# The Path to Cloud Native: 微服务路径
本书焦点。

> In this book, we are not covering clean code, domain-driven design, hexagonal architecture, or microservices. We are focusing only on the patterns and practices addressing the concerns of the container orchestration. But for these patterns to be effective, your application needs to be designed well from the inside by using clean code practices, domain-driven design, hexagonal architecture-like isolation of external dependencies, microservices principles, and other relevant design techniques.

- 不覆盖洁代码、领域驱动、六边形、微服务
- 焦点容器编排关注模式实践
- 有效需内部好设计：洁代码、领域驱动、隔离依赖、微服务原则

---
# Distributed Primitives: 分布式原语概述
本地 vs 分布式原语对比。

> Distributed Primitives

> To explain what we mean by new abstractions and primitives, here we compare them with the well-known object-oriented programming (OOP), and Java specifically. In the OOP universe, we have concepts such as class, object, package, inheritance, encapsulation, and polymorphism. Then the Java runtime provides specific features and guarantees on how it manages the lifecycle of our objects and the application as a whole.

- 新抽象原语与 OOP/Java 对比
- OOP 概念：类、对象、包、继承等
- Java 运行时管理生命周期保证

---
# Distributed Primitives: 分布式原语概述
Kubernetes 新维度。

> The Java language and the Java Virtual Machine (JVM) provide local, in-process building blocks for creating applications. Kubernetes adds an entirely new dimension to this well-known mindset by offering a new set of distributed primitives and runtime for building distributed systems that spread across multiple nodes and processes. With Kubernetes at hand, we don’t rely only on the local primitives to implement the whole application behavior.

- JVM 提供本地进程内构建块
- Kubernetes 新分布式原语和运行时，多节点进程
- 不只依赖本地实现全行为

---
# Distributed Primitives: 分布式原语概述
本地和分布式对比表。

> We still need to use the object-oriented building blocks to create the components of the distributed application, but we can also use Kubernetes primitives for some of the application behaviors. Table 1-1 shows how various development concepts are realized differently with local and distributed primitives in the JVM and Kubernetes, respectively.

- 仍用 OOP 创建组件，但 Kubernetes 原语部分行为
- 表 1-1 本地分布式 JVM/Kubernetes 实现不同
- 共同但不可直接替换

---
# Distributed Primitives: 分布式原语概述
抽象水平差异。

> Table 1-1. Local and distributed primitives

> The in-process primitives and the distributed primitives have commonalities, but they are not directly comparable and replaceable. They operate at different abstraction levels and have different preconditions and guarantees. Some primitives are supposed to be used together. For example, we still have to use classes to create objects and put them into container images. However, some other primitives such as CronJob in Kubernetes can completely replace the ExecutorService behavior in Java.

- 共同但不同抽象水平、前置和保证
- 不同水平操作，一起使用如类到容器镜像
- CronJob 完全替换 Java ExecutorService

---
# Distributed Primitives: Containers - 容器介绍
容器作为 Kubernetes 构建块。

> Containers

> Containers are the building blocks for Kubernetes-based cloud native applications. If we make a comparison with OOP and Java, container images are like classes, and containers are like objects. The same way we can extend classes to reuse and alter behavior, we can have container images that extend other container images to reuse and alter behavior. The same way we can do object composition and use functionality, we can do container compositions by putting containers into a Pod and using collaborating containers.

- 容器 Kubernetes 云原生构建块
- 镜像如类，容器如对象，可扩展复用
- 组成如对象，Pod 内协作容器

---
# Distributed Primitives: Containers - 容器与 JVM 对比
Kubernetes 如跨主机 JVM。

> If we continue the comparison, Kubernetes would be like the JVM but spread over multiple hosts, and it would be responsible for running and managing the containers. Init containers would be something like object constructors; DaemonSets would be similar to daemon threads that run in the background (like the Java Garbage Collector, for example). A Pod would be something similar to an Inversion of Control (IoC) context (Spring Framework, for example), where multiple running objects share a managed lifecycle and can access one another directly.

- Kubernetes 如多主机 JVM，管理容器
- Init 如构造函数，DaemonSet 如守护线程
- Pod 如 IoC 上下文，共享生命周期直接访问

---
# Distributed Primitives: Containers - 对比局限
类比有限。

> The parallel doesn’t go much further, but the point is that containers play a fundamental role in Kubernetes, and creating modularized, reusable, single-purpose container images is fundamental to the long-term success of any project and even the containers’ ecosystem as a whole. Apart from the technical characteristics of a container image that provide packaging and isolation, what does a container represent, and what is its purpose in the context of a distributed application? Here are a few suggestions on how to look at containers:

- 类比不远，但容器基础作用
- 模块化复用单目的镜像长期成功
- 打包隔离外，分布式应用中代表和目的

---
# Distributed Primitives: Containers - 容器特性建议

> • A container image is the unit of functionality that addresses a single concern.
> • A container image is owned by one team and has its own release cycle.
> • A container image is self-contained and defines and carries its runtime dependencies.
> • A container image is immutable, and once it is built, it does not change; it is configured.
> • A container image defines its resource requirements and external dependencies.
> • A container image has well-defined APIs to expose its functionality.
> • A container typically runs as a single Unix process.
> • A container is disposable and safe to scale up or down at any moment.

- 单一关注单元; 自包含携带运行依赖，不可变构建后配置
- 定义资源外部依赖，暴露 API


---
# Distributed Primitives: Containers - 模块化益处
模块化容器长期稳定。

> In addition to all these characteristics, a proper container image is modular. It is parameterized and created for reuse in the different environments in which it is going to run. Having small, modular, and reusable container images leads to the creation of more specialized and stable container images in the long term, similar to a great reusable library in the programming language world.

- 适当镜像模块化，参数化复用环境
- 小模块复用导致专业稳定镜像
- 如编程语言伟大复用库

---
# Distributed Primitives: Pods - Pod 介绍
Pod 管理容器组生命周期。

> Pods

> Looking at the characteristics of containers, we can see that they are a perfect match for implementing the microservices principles. A container image provides a single unit of functionality, belongs to a single team, has an independent release cycle, and provides deployment and runtime isolation. Most of the time, one microservice corresponds to one container image.

- 容器特性完美匹配微服务原则
- 单功能、团队、发布、隔离
- 通常一微服务一镜像

---
# Distributed Primitives: Pods - Pod 作为运行时单元
Pod 运行时代表微服务。

> A Pod is an atomic unit of scheduling, deployment, and runtime isolation for a group of containers. All containers in a Pod are always scheduled to the same host, are deployed and scaled together, and can also share filesystem, networking, and process namespaces. This joint lifecycle allows the containers in a Pod to interact with one another over the filesystem or through networking via localhost or host interprocess communication mechanisms if desired (for performance reasons, for example). 

- Pod 组容器生命周期原子单元
- 同主机调度、部署缩放，共享文件系统、网络、进程
- 联合生命周期交互，安全边界

---
# Distributed Primitives: Pods - 开发与运行时区别
开发镜像 vs 运行时 Pod。

> As you can see in Figure 1-2, at development and build time, a microservice corresponds to a container image that one team develops and releases. But at runtime, a microservice is represented by a Pod, which is the unit of deployment, placement, and scaling. The only way to run a container—whether for scale or migration—is through the Pod abstraction. Sometimes a Pod contains more than one container. In one such example, a containerized microservice uses a helper container at runtime, as Chapter 16, “Sidecar”, demonstrates.

- 开发构建时镜像，运行时 Pod 代表
- 部署放置缩放单元，唯一运行方式
- 有时多容器，如侧车助手（第 16 章）

---
# Distributed Primitives: Pods - Pod 特性
Pod 调度和共置特性。

> Figure 1-2. A Pod as the deployment and management unit

> Containers, Pods, and their unique characteristics offer a new set of patterns and principles for designing microservices-based applications. We saw some of the characteristics of well-designed containers; now let’s look at some characteristics of a Pod:

- Pod 特性提供新模式原则设计微服务
- 良好容器特性后，Pod 特性
- 图 1-2 部署管理单元

---
# Distributed Primitives: Pods - Pod 调度原子
Pod 作为调度原子。

> • A Pod is the atomic unit of scheduling. That means the scheduler tries to find a host that satisfies the requirements of all containers that belong to the Pod (we cover some specifics around init containers in Chapter 15, “Init Container”). If you create a Pod with many containers, the scheduler needs to find a host that has enough resources to satisfy all container demands combined. This scheduling process is described in Chapter 6, “Automated Placement”.

- 调度原子，调度器找满足所有容器主机
- 多容器需结合资源（第 15 章 init，第 6 章放置）

---
# Distributed Primitives: Pods - Pod 共置
Pod 确保容器共置。

> • A Pod ensures colocation of containers. Thanks to the colocation, containers in the same Pod have additional means to interact with one another. The most common ways of communicating include using a shared local filesystem for exchanging data, using the localhost network interface, or using some host inter‐ process communication (IPC) mechanism for high-performance interactions.

- 确保共置，额外交互手段
- 共享文件系统、localhost 网络、IPC 高性能

---
# Distributed Primitives: Pods - Pod 网络共享
Pod IP 和端口共享。

> • A Pod has an IP address, name, and port range that are shared by all containers belonging to it. That means containers in the same Pod have to be carefully configured to avoid port clashes, in the same way that parallel, running Unix processes have to take care when sharing the networking space on a host.

- 共享 IP、名、端口范围
- 需小心配置避端口冲突，如 Unix 进程

---
# Distributed Primitives: Pods - Pod 应用居所
Pod 是应用原子。

> A Pod is the atom of Kubernetes where your application lives, but you don’t access Pods directly—that is where Services enter the scene.

- Kubernetes 原子，应用居所
- 不直接访问，Service 介入

---
# Distributed Primitives: Services - 服务介绍
Pod 短暂性问题。

> Services

> Pods are ephemeral. They come and go at any time for all sorts of reasons (e.g., scaling up and down, failing container health checks, node migrations). A Pod IP address is known only after it is scheduled and started on a node. A Pod can be rescheduled to a different node if the existing node it is running on is no longer healthy. This means the Pod’s network address may change over the life of an application, and there is a need for another primitive for discovery and load balancing.

- Pod 短暂，来去原因多
- IP 调度后知，可重调度变地址
- 需发现负载均衡原语

---
# Distributed Primitives: Services - 服务抽象
Service 稳定入口。

> That’s where the Kubernetes Services come into play. The Service is another simple but powerful Kubernetes abstraction that binds the Service name to an IP address and port number permanently. So a Service represents a named entry point for accessing an application. In the most common scenario, the Services serves as the entry point for a set of Pods, but that might not always be the case. The Service is a generic primitive, and it may also point to functionality provided outside of the Kubernetes cluster. As such, the Service primitive can be used for Service discovery and load balancing, and it allows altering implementations and scaling without affecting Service consumers.

- Service 永久绑定名到 IP 端口
- 命名入口访问应用，通常 Pod 集
- 通用，可外集群，改变实现缩放不影响消费者

---
# Distributed Primitives: Services - 服务详解
Service 详见第 13 章。

> We explain Services in detail in Chapter 13, “Service Discovery”.

- 服务详解第 13 章发现
- 发现和负载关键

---
# Distributed Primitives: Labels - 标签介绍
应用多微服务概念。

> Labels

> We have seen that a microservice is a container image at build time but is represented by a Pod at runtime. So what is an application that consists of multiple microservices? Here, Kubernetes offers two more primitives that can help you define the concept of an application: labels and namespaces.

- 构建时镜像，运行时 Pod
- 多微服务应用概念，标签和命名空间帮助定义

---
# Distributed Primitives: Labels - 应用概念演变
单部署到独立服务。

> Before microservices, an application corresponded to a single deployment unit with a single versioning scheme and release cycle. There was a single file for an application in a .war, .ear, or some other packaging format. But then, applications were split into microservices, which are independently developed, released, run, restarted, or scaled. With microservices, the notion of an application diminishes, and there are no key artifacts or activities that we have to perform at the application level.

- 前微服务单部署单元、版本、发布
- 单文件打包如 .war
- 微服务独立开发发布运行，应用概念减弱，无应用级关键

---
# Distributed Primitives: Labels - 标签分组
标签表示应用归属。

> Let’s imagine that we have split one monolithic application into three microservices and another one into two microservices.
> 
> We now have five Pod definitions (and maybe many more Pod instances) that are independent of the development and runtime point of view. However, we may still need to indicate that the first three Pods represent an application and the other two Pods represent another application. 
> 
> Even the Pods may be independent, to provide a business value, but they may depend on one another. 
> 
- 表示独立服务归属应用，用标签
- 标签选择器查询管理逻辑单元

---
# Distributed Primitives: Labels - 标签用例
标签实际应用示例。

> Figure 1-3. Labels used as an application identity for Pods

> Here are a few examples where labels can be useful:

> • Labels are used by ReplicaSets to keep some instances of a specific Pod running. That means every Pod definition needs to have a unique combination of labels used for scheduling.

- 图 1-3 标签作为 Pod 应用身份
- ReplicaSet 用标签保持实例运行，唯一组合调度

---
# Distributed Primitives: Labels - 标签用例
调度器使用标签。

> • Labels are also heavily used by the scheduler. The scheduler uses labels for colocating or spreading Pods to the nodes that satisfy the Pods’ requirements.

- 调度器重用标签，共置或扩散 Pod 到满足节点

---
# Distributed Primitives: Labels - 标签用例
逻辑分组和元数据。

> • A label can indicate a logical grouping of a set of Pods and give an application identity to them.

> • In addition to the preceding typical use cases, labels can be used to store meta‐ data. It may be difficult to predict what a label could be used for, but it is best to have enough labels to describe all important aspects of the Pods. For example, having labels to indicate the logical group of an application, the business characteristics and criticality, the specific runtime platform dependencies such as hardware architecture, or location preferences are all useful.

- 标签表示逻辑组和应用身份
- 存储元数据，描述重要方面：组、业务关键、平台依赖、位置偏好

---
# Distributed Primitives: Labels - 标签管理
标签添加与移除。

> Later, these labels can be used by the scheduler for more fine-grained scheduling, or the same labels can be used from the command line for managing the matching Pods at scale. However, you should not go overboard and add too many labels in advance. You can always add them later if needed. Removing labels is much riskier as there is no straightforward way of finding out what a label is used for and what unintended effect such an action may cause.

- 后期细粒调度或命令行管理
- 勿过量预加，可后加
- 移除风险高，无易查用途和副作用

---
# Distributed Primitives: Namespaces - 命名空间介绍
命名空间与标签区别。

> Namespaces

> Another primitive that can also help manage a group of resources is the Kubernetes namespace. As we have described, a namespace may seem similar to a label, but in reality, it is a very different primitive with different characteristics and purposes.

- 命名空间管理资源组
- 似标签但不同特性目的

---
# Distributed Primitives: Namespaces - 命名空间作用
逻辑资源池。

> Kubernetes namespaces allow you to divide a Kubernetes cluster (which is usually spread across multiple hosts) into a logical pool of resources. Namespaces provide scopes for Kubernetes resources and a mechanism to apply authorizations and other policies to a subsection of the cluster. The most common use case of namespaces is representing different software environments such as development, testing, integration testing, or production. 
> 
> Namespaces can also be used to achieve multitenancy and provide isolation for team workspaces, projects, and even specific applications. 

- 分集群为逻辑资源池，提供作用域和策略
- 常见用：不同环境 dev/test/prod
- 多租户隔离团队项目应用，但大隔离需别集群

---
# Distributed Primitives: Namespaces - 命名空间特性
命名空间管理特性。

> Let’s look at some of the characteristics of namespaces and how they can help us in different scenarios:

> • A namespace is managed as a Kubernetes resource.

> • A namespace provides scope for resources such as containers, Pods, Services, or ReplicaSets. The names of resources need to be unique within a namespace but not across them.

- 如资源管理，提供作用域：容器 Pod Service ReplicaSet
- 命名空间内唯一名，非跨

---
# Distributed Primitives: Namespaces - 命名空间特性
默认无隔离。

> • By default, namespaces provide scope for resources, but nothing isolates those resources and prevents access from one resource to another. For example, a Pod from a development namespace can access another Pod from a production namespace as long as the Pod IP address is known. “Network isolation across namespaces for creating a lightweight multitenancy solution is described in Chapter 24, “Network Segmentation”.

- 默认作用域无隔离，dev Pod 可访问 prod 如知 IP
- 网络隔离轻量多租见第 24 章

---
# Distributed Primitives: Namespaces - 命名空间特性
非作用域资源。

> • Some other resources, such as namespaces, nodes, and PersistentVolumes, do not belong to namespaces and should have unique cluster-wide names.

- 命名空间、节点、PV 非作用域，集群唯一名

---
# Distributed Primitives: Namespaces - 命名空间特性
Service DNS。

> Each Kubernetes Service belongs to a namespace and gets a corresponding Domain Name Service (DNS) record that has the namespace in the form of "service-name"."namespace-name".svc.cluster.local. So the namespace name is in the URL of every Service belonging to the given namespace. That’s one reason it is vital to name namespaces wisely.

- Service 所属命名空间，DNS "service"."ns".svc.cluster.local
- 命名空间名在 URL，命名明智重要

---
# Distributed Primitives: Namespaces - 命名空间特性
ResourceQuotas 约束。

> • ResourceQuotas provide constraints that limit the aggregated resource consumption per namespace. With ResourceQuotas, a cluster administrator can control the number of objects per type that are allowed in a namespace. For example, a developer namespace may allow only five ConfigMaps, five Secrets, five Services, five ReplicaSets, five PersistentVolumeClaims, and ten Pods.

- 限聚合消耗，控制对象类型数
- 示例 dev 限 5 ConfigMap/Secret 等，10 Pod

---
# Distributed Primitives: Namespaces - 命名空间特性
计算资源限额。

> • ResourceQuotas can also limit the total sum of computing resources we can request in a given namespace. For example, in a cluster with a capacity of 32GB RAM and 16 cores, it is possible to allocate 16GB RAM and 8 cores for the production namespace, 8GB RAM and 4 cores for the staging environment, 4GB RAM and 2 cores for development, and the same amount for testing namespaces. The ability to impose resource constraints decoupled from the shape and the limits of the underlying infrastructure is invaluable.

- 限总计算资源请求
- 示例 32GB/16 核分配 prod/staging/dev/test
- 解耦基础设施形状限额，无价

---
# Discussion: 主要概念回顾
Kubernetes 主要概念覆盖。

> Discussion

> We’ve only briefly covered a few of the main Kubernetes concepts we use in this book. However, there are more primitives used by developers on a day-by-day basis. For example, if you create a containerized service, there are plenty of Kubernetes abstractions you can use to reap all the benefits of Kubernetes. Keep in mind, these are only a few of the objects used by application developers to integrate a containerized service into Kubernetes. There are plenty of other concepts used primarily by cluster administrators for managing Kubernetes.

- 仅简盖本书用主要概念
- 更多日常开发原语
- 容器服务集成抽象多，管理员概念另

---
# Discussion: 开发者 Kubernetes 概念
开发者有用资源图。

> Figure 1-4 gives an overview of the main Kubernetes resources that are useful for developers.

- 图 1-4 开发者有用主要资源概览

---
# Discussion: 新原语生模式
新原语产生新问题解决方式。

> With time, these new primitives give birth to new ways of solving problems, and some of these repetitive solutions become patterns. Throughout this book, rather than describing each Kubernetes resource in detail, we will focus on concepts that are proven as patterns.

- 新原语生新解决问题方式，重复成模式
- 全书焦点证明模式概念，非资源详述
