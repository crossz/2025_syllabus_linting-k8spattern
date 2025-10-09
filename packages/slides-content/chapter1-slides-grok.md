### 题目清单

1. 填空题：Kubernetes 是一个容器（ ）平台。

答案: orchestration

原文: Kubernetes is a container orchestration platform.

2. 单选题：Kubernetes 的起源是什么？（ ）
A. Microsoft Azure
B. Google 的 Borg
C. Amazon ECS
D. Docker Swarm

答案: B. Google 的 Borg

原文: The origin of Kubernetes lies somewhere in the Google data centers where Google’s internal container orchestration platform, Borg, was born.

3. 填空题：Kubernetes 于 2015 年成为 CNCF 的第一个（ ）项目。

答案: donated

原文: In 2015, it became the first project donated to the newly founded Cloud Native Computing Foundation (CNCF).

4. 单选题：本书假设读者对 Kubernetes 有哪些知识？（ ）
A. 无任何知识
B. 基本概念
C. 高级配置
D. 集群管理

答案: B. 基本概念

原文: This book assumes you have some basic knowledge of Kubernetes.

5. 填空题：设计模式的概念起源于（ ）领域。

答案: architecture

原文: The concept of design patterns dates back to the 1970s and is from the field of architecture.

6. 单选题：Christopher Alexander 的书《A Pattern Language》出版于哪年？（ ）
A. 1960
B. 1977
C. 1990
D. 2000

答案: B. 1977

原文: Christopher Alexander, an architect and system theorist, and his team published the groundbreaking A Pattern Language (Oxford University Press) in 1977.

7. 填空题：Gang of Four 的书是《Design Patterns: Elements of Reusable （ ）Software》。

答案: Object-Oriented

原文: Design Patterns—Elements of Reusable Object-Oriented Software by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides—the Gang of Four (Addison-Wesley).

8. 单选题：本书的模式格式包括哪些部分？（ ）
A. Name, Problem, Solution, Discussion, More Information
B. Abstract, Implementation, Examples
C. Introduction, Body, Conclusion
D. Code, Test, Deploy

答案: A. Name, Problem, Solution, Discussion, More Information

原文: For each pattern, we use the following structure: Name, Problem, Solution, Discussion, More Information.

9. 填空题：Part I 是（ ）Patterns。

答案: Foundational

原文: Part I, “Foundational Patterns”, covers the core concepts of Kubernetes.

10. 单选题：本书适合哪些读者？（ ）
A. Kubernetes 新手
B. 熟悉基本概念的开发者
C. 集群管理员
D. 硬件工程师

答案: B. 熟悉基本概念的开发者

原文: This book is for developers who want to design and develop cloud native applications and use Kubernetes as the platform. It is most suitable for readers who have some basic familiarity with containers and Kubernetes concepts.

11. 填空题：微服务通过业务能力的（ ）来处理软件复杂性。

答案: modularization

原文: They tackle software complexity through modularization of business capabilities.

12. 单选题：创建良好云原生应用需要熟悉哪些设计技术？（ ）
A. 只需容器
B. Clean Code, Domain-Driven Design, Hexagonal Architecture, Microservices
C. 只需 Kubernetes
D. 数据库设计

答案: B. Clean Code, Domain-Driven Design, Hexagonal Architecture, Microservices

原文: At a high level, creating good cloud native applications requires familiarity with multiple design techniques: Clean Code, Domain-Driven Design, Hexagonal Architecture, Microservices.

13. 填空题：分布式原语类似于 OOP 中的（ ），而容器类似于（ ）。

答案: classes, objects

原文: container images are like classes, and containers are like objects.

14. 单选题：Kubernetes 中的 Pod 是什么？（ ）
A. 单个容器
B. 容器组的原子单元
C. 服务端点
D. 标签集合

答案: B. 容器组的原子单元

原文: A Pod is an atomic unit of scheduling, deployment, and runtime isolation for a group of containers.

15. 填空题：Service 是 Kubernetes 的另一个简单但强大的（ ）。

答案: abstraction

原文: The Service is another simple but powerful Kubernetes abstraction.

16. 单选题：Labels 用于什么？（ ）
A. 存储元数据
B. 查询和匹配 Pods
C. 隔离网络
D. 管理存储

答案: B. 查询和匹配 Pods

原文: Using label selectors gives us the ability to query and identify a set of Pods and manage it as one logical unit.

17. 填空题：Annotations 类似于 labels，但用于（ ）而非人类查询。

答案: machine usage

原文: annotations are intended for specifying nonsearchable metadata and for machine usage rather than human.

18. 单选题：Namespaces 提供什么？（ ）
A. 资源范围和授权
B. 容器镜像
C. Pod 调度
D. 服务发现

答案: A. 资源范围和授权

原文: Namespaces provide scopes for Kubernetes resources and a mechanism to apply authorizations and other policies to a subsection of the cluster.

19. 填空题：ResourceQuotas 限制每个 namespace 的（ ）消费。

答案: resource

原文: ResourceQuotas provide constraints that limit the aggregated resource consumption per namespace.

20. 单选题：本书讨论的 Kubernetes 概念主要用于？（ ）
A. 集群管理
B. 应用开发者
C. 硬件配置
D. 数据库优化

答案: B. 应用开发者

原文: Figure 1-4 gives an overview of the main Kubernetes resources that are useful for developers.

### PPT Slides 文字稿

**Slide 1: 标题页**  
标题: Kubernetes Patterns - Chapter 1: Introduction (扩展版)  
副标题: Reusable Elements for Designing Cloud Native Applications (Second Edition)  
作者: Bilgin Ibryam & Roland Huß  
内容概述: 本PPT详细覆盖 Chapter 1，介绍云原生路径和 Kubernetes 核心概念，扩展为20页。  
(包括书籍封面图片)

**Slide 2: 章节概述 (1/2)**  
主要内容:  
- Chapter 1: Introduction (页1-12)。  
- 结构: The Path to Cloud Native, Distributed Primitives, Containers, Pods, Services, Labels, Namespaces, Discussion。  
关键点:  
- 焦点: Kubernetes 抽象和原语。  
(引用原文: In this introductory chapter, we set the scene for the rest of the book...)

**Slide 3: 章节概述 (2/2)**  
主要内容:  
- 非前提章节，可跳读。  
- 与本书模式相关: 基础构建块。  
关键点:  
- 目标: 理解分布式原语。  
(引用原文: This chapter is not a prerequisite for understanding the patterns described later.)

**Slide 4: The Path to Cloud Native - 问题 (1/2)**  
主要内容:  
- 微服务: 模块化业务能力，交易开发复杂性为运维复杂性。  
- 成功前提: 通过 Kubernetes 规模化运维。  
关键点:  
- 示例: Domain-Driven Design, Bounded Contexts, Aggregates。  
(引用原文: Microservices is among the most popular architectural styles...)

**Slide 5: The Path to Cloud Native - 问题 (2/2)**  
主要内容:  
- 技术关注: 外部结构、运行时耦合。  
- 容器和 Kubernetes 引入新原语。  
关键点:  
- 黑盒容器: 内部重要性。  
(引用原文: for each distributed system... there are also technical concerns around its external structure, and runtime coupling.)

**Slide 6: The Path to Cloud Native - 解决方案 (Figure 1-1)**  
主要内容:  
- 高层设计: Clean Code, Domain-Driven Design, Hexagonal Architecture, Microservices, Kubernetes Patterns。  
- 图1-1: 云原生路径。  
关键点:  
- 容器内垃圾导致分布式垃圾。  
(插入 Figure 1-1)

**Slide 7: The Path to Cloud Native - Clean Code**  
主要内容:  
- 最低层: 变量、方法、类影响长期维护。  
- 原则: 干净代码、自动化测试、重构、Software Craftsmanship。  
关键点:  
- 开发团队影响最大。  
(引用原文: At the lowest code level, every variable you define...)

**Slide 8: The Path to Cloud Native - Domain-Driven Design**  
主要内容:  
- 从业务视角设计，保持架构接近真实世界。  
- 模型: 业务/事务边界、易消费接口、丰富 API。  
关键点:  
- 基础容器化和自动化。  
(引用原文: Domain-driven design is about approaching software design from a business perspective...)

**Slide 9: The Path to Cloud Native - Hexagonal Architecture**  
主要内容:  
- 解耦组件，提供标准化接口。  
- 变体: Onion, Clean Architectures。  
关键点:  
- 易移植系统，外部化依赖。  
(引用原文: The hexagonal architecture and its variations... improve the flexibility...)

**Slide 10: The Path to Cloud Native - Microservices**  
主要内容:  
- 12因子应用: 优化规模、弹性、变更速度。  
- 原则: 分布式应用规范。  
关键点:  
- 现代软件需求。  
(引用原文: The microservices architectural style and the twelve-factor app methodology...)

**Slide 11: The Path to Cloud Native - Containers**  
主要内容:  
- 打包/运行标准，模块化、可重用。  
- 云原生公民: 原则、模式、工具自动化。  
关键点:  
- 与 Kubernetes 互换。  
(引用原文: Containers were very quickly adopted as the standard way...)

**Slide 12: Distributed Primitives - 概述**  
主要内容:  
- 与 OOP/Java 比较: 类/对象 vs. 容器镜像/容器。  
- Kubernetes 如 JVM，但跨主机。  
关键点:  
- 新维度: 分布式系统。  
(引用原文: Kubernetes adds an entirely new dimension to this well-known mindset...)

**Slide 13: Distributed Primitives - Table 1-1 (1/2)**  
主要内容:  
- 表1-1: 本地 vs. 分布式原语 (前半)。  
- 示例: Class/Container image, Object/Container。  
关键点:  
- 共同点但不可直接替换。  
(插入 Table 1-1 上半)

**Slide 14: Distributed Primitives - Table 1-1 (2/2)**  
主要内容:  
- 表1-1: 本地 vs. 分布式原语 (后半)。  
- 示例: Constructor/Init container, Job/ThreadPoolExecutor。  
关键点:  
- 不同抽象层。  
(插入 Table 1-1 下半)

**Slide 15: Containers - 概念**  
主要内容:  
- 构建块: 单一关注、团队拥有、独立发布。  
- 特性: 自包含、不变、资源定义、API 暴露。  
关键点:  
- 单 Unix 进程、可丢弃。  
(引用原文: Containers are the building blocks for Kubernetes-based cloud native applications.)

**Slide 16: Containers - 模块化**  
主要内容:  
- 参数化、重用: 不同环境。  
- 小型模块化导致稳定生态。  
关键点:  
- 如编程语言库。  
(引用原文: Having small, modular, and reusable container images leads to the creation of more specialized...)

**Slide 17: Pods - 概念 (Figure 1-2)**  
主要内容:  
- 原子单元: 调度、部署、隔离。  
- 共置: 共享文件系统、网络。  
关键点:  
- 图1-2: Pod 作为部署单元。  
(插入 Figure 1-2)

**Slide 18: Services - 概念**  
主要内容:  
- 永久 IP/端口绑定: 发现、负载均衡。  
- 入口点: Pod 或外部。  
关键点:  
- Pod 瞬态问题解决。  
(引用原文: The Service is another simple but powerful Kubernetes abstraction...)

**Slide 19: Labels & Annotations - 概念**  
主要内容:  
- Labels: 查询/匹配 (e.g., ReplicaSet, Scheduler)。  
- Annotations: 元数据 (e.g., Build ID, Git branch)。  
关键点:  
- 图1-3: Labels 作为应用身份。  
(插入 Figure 1-3)

**Slide 20: Namespaces & Discussion - 总结**  
主要内容:  
- Namespaces: 范围、授权、ResourceQuotas。  
- 讨论: 新原语生模式 (图1-4)。  
关键点:  
- 更多信息: Twelve-Factor App 等。  
(插入 Figure 1-4; 引用原文: With time, these new primitives give birth to new ways...)

