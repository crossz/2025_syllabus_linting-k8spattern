### 题目清单

1. 填空题：声明式部署模式允许开发者定义期望状态，Kubernetes 通过（ ）来实现目标状态。

答案: reconciliation

原文: The Declarative Deployment pattern allows developers to define the desired state, and Kubernetes reconciles the actual state to the target state.

2. 单选题：Declarative Deployment 的主要问题是？（ ）
A. 手动管理 Pod
B. 命令式部署不可扩展且易出错
C. 网络配置
D. 存储分配

答案: B. 命令式部署不可扩展且易出错

原文: The problem with imperative deployments is that they are not scalable and prone to errors.

3. 填空题：Deployment 资源管理 ReplicaSet，并通过（ ）更新来最小化中断。

答案: rolling

原文: Deployments manage ReplicaSets and perform rolling updates to minimize disruptions.

4. 单选题：Rolling Deployment 的 strategy.type 默认值是？（ ）
A. Recreate
B. RollingUpdate
C. BlueGreen
D. Canary

答案: B. RollingUpdate

原文: The default strategy.type for Deployments is RollingUpdate.

5. 填空题：maxUnavailable 在 RollingUpdate 中指定更新期间不可用的 Pod 最大（ ）。

答案: number

原文: maxUnavailable specifies the maximum number of Pods that can be unavailable during the update.

6. 单选题：Fixed Deployment 使用什么 strategy.type？（ ）
A. RollingUpdate
B. Recreate
C. Partition
D. Traffic

答案: B. Recreate

原文: Fixed deployments use the Recreate strategy.type, which shuts down all Pods before creating new ones.

7. 填空题：Blue-Green Release 涉及两个环境：蓝色（当前）和（ ）（新）。

答案: green

原文: Blue-Green Release involves two environments: blue (current) and green (new).

8. 单选题：Blue-Green Release 的优势是什么？（ ）
A. 快速回滚
B. 零停机
C. 简单配置
D. 低成本

答案: A. 快速回滚

原文: The advantage of Blue-Green is quick rollback by switching traffic back to the blue environment.

9. 填空题：Canary Release 通过向小部分用户部署新版本来测试，通常使用（ ）来控制流量。

答案: selectors

原文: Canary Release deploys new versions to a small subset of users, often using selectors to control traffic.

10. 单选题：Canary Release 中，partition 字段用于什么？（ ）
A. 分割流量
B. 控制更新 Pod 数量
C. 设置超时
D. 定义标签

答案: B. 控制更新 Pod 数量

原文: In Canary Releases, the partition field controls how many Pods are updated.

11. 填空题：Deployment 的 spec.replicas 指定期望的 Pod（ ）。

答案: instances

原文: spec.replicas specifies the desired number of Pod instances.

12. 单选题：Rolling Deployment 的 maxSurge 允许超过期望副本的 Pod 最大（ ）。

答案: number

原文: maxSurge allows the maximum number of Pods that can be created over the desired number during an update.

13. 填空题：声明式方法使用 YAML 或 JSON 文件来声明（ ）状态。

答案: desired

原文: The declarative approach uses YAML or JSON files to declare the desired state.

14. 单选题：Recreate 策略适合什么场景？（ ）
A. 无状态应用
B. 需要数据库迁移的应用
C. 高流量服务
D. 实时聊天

答案: B. 需要数据库迁移的应用

原文: The Recreate strategy is suitable for applications that require database migrations or similar one-time tasks.

15. 填空题：Blue-Green Release 需要两个 Deployment 和一个（ ）来切换流量。

答案: Service

原文: Blue-Green Release requires two Deployments and a Service to switch traffic between them.

16. 单选题：Canary Release 的风险是什么？（ ）
A. 完全停机
B. 部分用户暴露于 bug
C. 高资源消耗
D. 复杂回滚

答案: B. 部分用户暴露于 bug

原文: The risk of Canary is that a subset of users is exposed to potential bugs in the new version.

17. 填空题：kubectl apply 命令用于应用声明式（ ）。

答案: configurations

原文: kubectl apply is used to apply declarative configurations.

18. 单选题：Deployment 的 revisionHistoryLimit 保留多少旧 ReplicaSet？（ ）
A. 1
B. 10 (默认)
C. 无限
D. 0

答案: B. 10 (默认)

原文: revisionHistoryLimit defaults to 10, retaining that many old ReplicaSets for rollbacks.

19. 填空题：讨论中，声明式部署促进（ ）和版本控制。

答案: reproducibility

原文: Declarative deployments promote reproducibility and version control.

20. 单选题：More Information 部分引用了什么？（ ）
A. Kubernetes Deployment 文档
B. Helm 文档
C. Istio 文档
D. ArgoCD 文档

答案: A. Kubernetes Deployment 文档

原文: More Information includes links to Kubernetes Deployment documentation.

### PPT Slides 文字稿

**Slide 1: 标题页**  
标题: Kubernetes Patterns - Chapter 3: Declarative Deployment (扩展版)  
副标题: Reusable Elements for Designing Cloud Native Applications (Second Edition)  
作者: Bilgin Ibryam & Roland Huß  
内容概述: 本PPT详细覆盖 Declarative Deployment 模式，扩展为20页，深入更新策略和发布技术。  
(包括书籍封面图片)

**Slide 2: 章节概述 (1/2)**  
主要内容:  
- Chapter 3: Declarative Deployment (页29-38)。  
- 结构: Problem, Solution, Rolling Deployment, Fixed Deployment, Blue-Green Release, Canary Release, Discussion。  
关键点:  
- 焦点: 声明式 vs. 命令式部署。  
(引用原文: The Declarative Deployment pattern allows developers to define the desired state...)

**Slide 3: 章节概述 (2/2)**  
主要内容:  
- Part I: Foundational Patterns。  
- 目标: 最小中断更新。  
关键点:  
- 与 Chapter 2 资源相关。  
(引用原文: This pattern addresses how to deploy applications declaratively.)

**Slide 4: Problem - 命令式部署挑战 (1/2)**  
主要内容:  
- 问题: 命令式脚本不可扩展、易出错、无审计。  
- 示例: kubectl run, create 等顺序执行。  
关键点:  
- 手动跟踪状态。  
(引用原文: The problem with imperative deployments is that they are not scalable...)

**Slide 5: Problem - 命令式部署挑战 (2/2)**  
主要内容:  
- 影响: 回滚难、版本控制缺。  
- 云原生需求: 声明式自动化。  
关键点:  
- 状态不一致风险。  
(引用原文: Imperative approaches lack built-in reconciliation.)

**Slide 6: Solution - 概述 (1/2)**  
主要内容:  
- 解决方案: Deployment 资源声明期望状态。  
- Kubernetes 控制器 reconciliation 循环。  
关键点:  
- YAML/JSON 文件。  
(引用原文: Deployments manage ReplicaSets and perform rolling updates...)

**Slide 7: Solution - 概述 (2/2)**  
主要内容:  
- 子节: Rolling, Fixed, Blue-Green, Canary。  
- 益处: 版本化、可审计。  
关键点:  
- kubectl apply/diff。  
(引用原文: The declarative approach uses YAML or JSON files...)

**Slide 8: Rolling Deployment - 概念 (1/2)**  
主要内容:  
- 默认策略: RollingUpdate。  
- 渐进替换 Pod，最小中断。  
关键点:  
- 适合无状态应用。  
(引用原文: The default strategy.type for Deployments is RollingUpdate.)

**Slide 9: Rolling Deployment - 概念 (2/2)**  
主要内容:  
- 参数: maxUnavailable (默认25%), maxSurge (默认25%)。  
- 示例: 更新镜像时逐步替换。  
关键点:  
- 控制可用性。  
(引用原文: maxUnavailable specifies the maximum number of Pods...)

**Slide 10: Rolling Deployment - 示例**  
主要内容:  
- YAML 示例:  
```yaml
spec:  
  strategy:  
    type: RollingUpdate  
    rollingUpdate:  
      maxUnavailable: 1  
      maxSurge: 1  
```  
关键点:  
- 逐步更新。  
(插入 Example 3-1 YAML)

**Slide 11: Fixed Deployment - 概念**  
主要内容:  
- strategy.type: Recreate。  
- 先删除所有 Pod，再创建新。  
关键点:  
- 适合需要清理的应用。  
(引用原文: Fixed deployments use the Recreate strategy.type...)

**Slide 12: Fixed Deployment - 示例**  
主要内容:  
- YAML: strategy.type: Recreate。  
- 缺点: 停机时间。  
关键点:  
- DB 迁移用例。  
(插入 Example 3-2 YAML; 引用原文: The Recreate strategy is suitable...)

**Slide 13: Blue-Green Release - 概念 (1/2)**  
主要内容:  
- 两个环境: Blue (live), Green (staging)。  
- 切换 Service 选择器。  
关键点:  
- 零停机测试。  
(引用原文: Blue-Green Release involves two environments: blue and green.)

**Slide 14: Blue-Green Release - 概念 (2/2)**  
主要内容:  
- 回滚: 切换回 Blue。  
- 需要双倍资源。  
关键点:  
- 快速验证。  
(引用原文: The advantage of Blue-Green is quick rollback...)

**Slide 15: Blue-Green Release - 示例**  
主要内容:  
- YAML: 两个 Deployment, Service selector 切换。  
关键点:  
- 手动/自动化切换。  
(插入 Example 3-3 YAML)

**Slide 16: Canary Release - 概念 (1/2)**  
主要内容:  
- 渐进流量: 小组用户新版本。  
- 使用 partition 控制 Pod 更新。  
关键点:  
- 风险隔离。  
(引用原文: Canary Release deploys new versions to a small subset...)

**Slide 17: Canary Release - 概念 (2/2)**  
主要内容:  
- partition=0: 全 Canary；=replicas: 全旧。  
- 监控指标回滚。  
关键点:  
- 部分暴露风险。  
(引用原文: In Canary Releases, the partition field controls...)

**Slide 18: Canary Release - 示例**  
主要内容:  
- YAML: strategy.rollingUpdate.partition: 5。  
关键点:  
- 与 Service 结合。  
(插入 Example 3-4 YAML)

**Slide 19: Discussion - 最佳实践 (1/2)**  
主要内容:  
- 讨论: 选择策略基于应用类型。  
- 实践: 版本控制 YAML，回滚计划。  
关键点:  
- 与 CI/CD 整合。  
(引用原文: Declarative deployments promote reproducibility...)

**Slide 20: More Information & 总结 (2/2)**  
主要内容:  
- 参考: Kubernetes Deployment 文档。  
总结:  
- Declarative Deployment 核心于可靠更新。  
- 与题目: 覆盖策略和配置。  
关键点:  
- k8spatterns.io 示例。  
(引用原文: More Information includes links to Kubernetes Deployment documentation.)
