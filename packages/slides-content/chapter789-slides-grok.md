### 题目清单

1. 填空题：Kubernetes 中的批处理任务通常有明确的开始和结束时间，并在完成后（ ）。

答案: terminate

原文: Batch processing tasks have a definite beginning and ending, and they terminate after completion.

2. 单选题：Batch Job 模式用于什么类型的任务？（ ）
A. 连续运行的服务
B. 有限时间并完成的任务，如数据转换或备份
C. 定期调度任务
D. 节点级守护进程

答案: B. 有限时间并完成的任务，如数据转换或备份

原文: Batch jobs are finite tasks that run to completion, such as data conversion, video encoding, or backups.

3. 填空题：Job 控制器通过创建 Pod 来执行任务，如果 Pod 失败，它会根据（ ）重试。

答案: backoffLimit

原文: The Job controller creates Pods to perform the task, and if a Pod fails, it retries according to the backoffLimit.

4. 单选题：Job 的 completionMode 可以是哪些？（ ）
A. NonIndexed 和 Indexed
B. Parallel 和 Serial
C. Always 和 OnFailure
D. Rolling 和 Fixed

答案: A. NonIndexed 和 Indexed

原文: The completionMode can be NonIndexed (default) or Indexed for parallel jobs with unique indices.

5. 填空题：在 Batch Job 中，parallelism 指定同时运行的 Pod 数量，而 completions 指定成功的（ ）数量。

答案: completions

原文: parallelism specifies the number of Pods to run simultaneously, and completions specifies the number of successful completions required.

6. 单选题：如果 Job 需要并行处理不同输入，使用什么模式？（ ）
A. NonIndexed
B. Indexed
C. Daemon
D. Cron

答案: B. Indexed

原文: For jobs that need to process different inputs in parallel, use Indexed mode where each Pod gets a unique index.

7. 填空题：Periodic Job 用于定期运行任务，如每日备份，使用（ ）资源来调度。

答案: CronJob

原文: Periodic jobs are batch jobs that run on a schedule, using the CronJob resource.

8. 单选题：CronJob 的 schedule 字段使用什么格式？（ ）
A. YAML
B. Cron 格式，如 "0 1 * * *"
C. ISO 日期
D. Unix 时间戳

答案: B. Cron 格式，如 "0 1 * * *"

原文: The schedule field uses cron format, e.g., "0 1 * * *" for daily at 1 AM.

9. 填空题：concurrencyPolicy 在 CronJob 中控制多个实例的行为，如 Allow、Forbid 或（ ）。

答案: Replace

原文: concurrencyPolicy can be Allow (run concurrently), Forbid (skip if previous running), or Replace (terminate previous and start new).

10. 单选题：successfulJobsHistoryLimit 用于什么？（ ）
A. 限制失败 Job 历史
B. 限制成功 Job 历史记录数量
C. 设置并行度
D. 定义调度

答案: B. 限制成功 Job 历史记录数量

原文: successfulJobsHistoryLimit limits the number of successful Job history retained.

11. 填空题：Daemon Service 用于在集群的每个节点运行一个 Pod 实例，如日志收集或（ ）代理。

答案: network

原文: Daemon services run one Pod instance on every node in the cluster, such as for logging or network proxies.

12. 单选题：DaemonSet 控制器确保 Pod 运行在哪些节点？（ ）
A. 仅主节点
B. 所有或选定节点，使用 nodeSelector
C. 仅工作节点
D. 随机节点

答案: B. 所有或选定节点，使用 nodeSelector

原文: The DaemonSet controller ensures a Pod runs on all or selected nodes, using nodeSelector for filtering.

13. 填空题：DaemonSet 的 updateStrategy 可以是 RollingUpdate 或（ ）。

答案: OnDelete

原文: updateStrategy can be RollingUpdate (default) or OnDelete (manual update).

14. 单选题：DaemonSet 常用于什么场景？（ ）
A. 批处理任务
B. 节点级任务，如监控代理
C. 定期备份
D. 状态服务

答案: B. 节点级任务，如监控代理

原文: Common use cases include node monitoring agents, log collectors, or network plugins.

15. 填空题：在 Batch Job 讨论中，Job 是 Kubernetes 中运行有限任务的（ ）方式。

答案: idiomatic

原文: Jobs are the idiomatic way in Kubernetes to run finite tasks.

16. 单选题：对于 Periodic Job，如果 previous Job 仍在运行，Forbid 策略会做什么？（ ）
A. 允许并发
B. 跳过新实例
C. 替换旧实例
D. 终止集群

答案: B. 跳过新实例

原文: Forbid skips the new instance if the previous is still running.

17. 填空题：DaemonSet Pod 自动调度到新节点，当节点（ ）时。

答案: added

原文: Pods are automatically scheduled to new nodes when added to the cluster.

18. 单选题：Batch Job 的 activeDeadlineSeconds 用于什么？（ ）
A. 设置重试次数
B. 限制 Job 总运行时间
C. 定义并行度
D. 调度时间

答案: B. 限制 Job 总运行时间

原文: activeDeadlineSeconds limits the total runtime of the Job.

19. 填空题：在 Periodic Job 中，startingDeadlineSeconds 指定错过调度后启动的（ ）窗口。

答案: time

原文: startingDeadlineSeconds specifies the time window to start after a missed schedule.

20. 单选题：Daemon Service 的 More Information 可能包括什么？（ ）
A. DaemonSet 文档
B. Job 文档
C. Deployment 文档
D. Service 文档

答案: A. DaemonSet 文档

原文: More Information includes links to DaemonSet documentation.

### PPT Slides 文字稿

**Slide 1: 标题页**  
标题: Kubernetes Patterns - Chapters 7,8,9: Behavioral Patterns  
副标题: Batch Job, Periodic Job, Daemon Service  
作者: Bilgin Ibryam & Roland Huß (Second Edition)  
内容概述: 本PPT覆盖行为模式，包括有限任务、定期任务和节点级服务。  
(包括书籍封面图片)

**Slide 2: Part II Overview - Behavioral Patterns**  
主要内容:  
- 行为模式管理容器和平台交互。  
- 章节7: Batch Job  
- 章节8: Periodic Job  
- 章节9: Daemon Service  
关键点:  
- 焦点于任务执行、调度和节点分布。  
(引用目录: Part II. Behavioral Patterns)

**Slide 3: Chapter 7 - Batch Job: Problem**  
主要内容:  
- 问题: 需要运行有限时间任务，如批处理、计算或备份，这些任务有明确结束。  
- 与连续服务不同，需要平台管理完成和重试。  
关键点:  
- 示例: 数据转换、视频编码。  
(原文: Batch processing tasks have a definite beginning and ending...)

**Slide 4: Chapter 7 - Batch Job: Solution (Job Resource)**  
主要内容:  
- 解决方案: 使用 Job 资源创建 Pod 运行到完成。  
- 特性: backoffLimit 用于重试，activeDeadlineSeconds 限制时间。  
关键点:  
- Job 控制器处理失败和重启。  
(原文: The Job controller creates Pods to perform the task...)

**Slide 5: Chapter 7 - Batch Job: Parallelism and Completions**  
主要内容:  
- parallelism: 同时运行 Pod 数量。  
- completions: 所需成功完成数量。  
关键点:  
- 用于并行处理任务。  
(原文: parallelism specifies the number of Pods to run simultaneously...)

**Slide 6: Chapter 7 - Batch Job: Completion Modes**  
主要内容:  
- NonIndexed: 默认，简单完成计数。  
- Indexed: 每个 Pod 有唯一索引，用于不同输入。  
关键点:  
- 示例: 处理分片数据。  
(原文: The completionMode can be NonIndexed or Indexed...)

**Slide 7: Chapter 7 - Batch Job: Discussion & More Information**  
主要内容:  
- 讨论: Job 是运行批任务的标准方式，支持可扩展性。  
- 更多信息: Kubernetes Job 文档、示例。  
关键点:  
- 与题目相关: 强调重试和模式。  
(原文: Jobs are the idiomatic way in Kubernetes to run finite tasks.)

**Slide 8: Chapter 8 - Periodic Job: Problem**  
主要内容:  
- 问题: 需要定期运行批任务，如每日报告或清理。  
- 标准批处理不支持调度。  
关键点:  
- 示例: 备份、数据同步。  
(原文: Periodic jobs are batch jobs that run on a schedule...)

**Slide 9: Chapter 8 - Periodic Job: Solution (CronJob Resource)**  
主要内容:  
- 解决方案: 使用 CronJob 创建定时 Job。  
- schedule: Cron 格式 (e.g., "*/5 * * * *")。  
关键点:  
- 创建底层 Job 实例。  
(原文: The schedule field uses cron format...)

**Slide 10: Chapter 8 - Periodic Job: Concurrency Policy**  
主要内容:  
- Allow: 允许并发。  
- Forbid: 跳过如果上一运行中。  
- Replace: 替换上一实例。  
关键点:  
- 控制重叠执行。  
(原文: concurrencyPolicy can be Allow, Forbid, or Replace.)

**Slide 11: Chapter 8 - Periodic Job: History Limits**  
主要内容:  
- successfulJobsHistoryLimit: 保留成功历史。  
- failedJobsHistoryLimit: 保留失败历史。  
关键点:  
- 管理资源使用。  
(原文: successfulJobsHistoryLimit limits the number of successful Job history...)

**Slide 12: Chapter 8 - Periodic Job: Additional Features**  
主要内容:  
- startingDeadlineSeconds: 错过后启动窗口。  
- suspend: 暂停调度。  
关键点:  
- 灵活调度控制。  
(原文: startingDeadlineSeconds specifies the time window...)

**Slide 13: Chapter 8 - Periodic Job: Discussion & More Information**  
主要内容:  
- 讨论: CronJob 扩展 Job 为定期任务。  
- 更多信息: CronJob 文档。  
关键点:  
- 与题目相关: 政策和限制。  
(原文: Discussion on using CronJobs for scheduled tasks.)

**Slide 14: Chapter 9 - Daemon Service: Problem**  
主要内容:  
- 问题: 需要在每个节点运行服务，如监控或日志。  
- 标准 Deployment 不保证节点覆盖。  
关键点:  
- 示例: 网络代理、存储守护。  
(原文: Daemon services run one Pod instance on every node...)

**Slide 15: Chapter 9 - Daemon Service: Solution (DaemonSet Resource)**  
主要内容:  
- 解决方案: DaemonSet 确保每个节点一个 Pod。  
- 自动调度到新节点。  
关键点:  
- 使用 nodeSelector 过滤节点。  
(原文: The DaemonSet controller ensures a Pod runs on all or selected nodes...)

**Slide 16: Chapter 9 - Daemon Service: Update Strategy**  
主要内容:  
- RollingUpdate: 渐进更新，maxUnavailable 控制。  
- OnDelete: 手动触发更新。  
关键点:  
- 最小中断。  
(原文: updateStrategy can be RollingUpdate or OnDelete.)

**Slide 17: Chapter 9 - Daemon Service: Use Cases**  
主要内容:  
- 日志收集 (e.g., Fluentd)。  
- 监控 (e.g., node-exporter)。  
- 网络 (e.g., Calico)。  
关键点:  
- 节点级基础设施。  
(原文: Common use cases include node monitoring agents...)

**Slide 18: Chapter 9 - Daemon Service: Discussion**  
主要内容:  
- 讨论: DaemonSet 适合基础设施任务，不适合应用逻辑。  
- 与节点生命周期绑定。  
关键点:  
- 高可用性考虑。  
(原文: Discussion on when to use DaemonSets.)

**Slide 19: Chapter 9 - Daemon Service: More Information**  
主要内容:  
- 参考: DaemonSet 文档、示例 YAML。  
- 相关资源: Kubernetes 社区。  
关键点:  
- 进一步阅读。  
(原文: More Information includes links to DaemonSet documentation.)

**Slide 20: Summary - Chapters 7,8,9**  
主要内容:  
- Batch Job: 有限任务。  
- Periodic Job: 调度任务。  
- Daemon Service: 节点任务。  
- 与题目整合: 覆盖核心概念如 policy、strategy。  
关键点:  
- 这些模式提升 Kubernetes 行为管理。  
