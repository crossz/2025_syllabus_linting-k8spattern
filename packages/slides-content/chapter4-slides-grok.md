### 题目清单

1. 填空题：Kubernetes 定期检查容器进程状态，如果检测到问题会重启它，但检查进程状态不足以确定应用程序的（ ）。

答案: health

原文: However, from practice, we know that checking the process status is not sufficient to determine the health of an application.

2. 单选题：以下哪种情况可能导致应用程序不健康但进程仍在运行？（ ）
A. 正常关闭
B. 抛出 OutOfMemoryError 或无限循环
C. 成功启动
D. 接收流量

答案: B. 抛出 OutOfMemoryError 或无限循环

原文: For example, a Java application may throw an OutOfMemoryError and still have the JVM process running. Alternatively, an application may freeze because it runs into an infinite loop, deadlock, or some thrashing (cache, heap, process).

3. 填空题：Kubernetes 需要一种可靠的方式来检查应用程序是否按预期（ ）并能够服务消费者，而无需了解其内部工作原理。

答案: functioning

原文: To detect these kinds of situations, Kubernetes needs a reliable way to check the health of applications—that is, not to understand how an application works internally, but to check whether the application is functioning as expected and capable of serving consumers.

4. 单选题：Health Probe 模式的主要目的是什么？（ ）
A. 管理 Pod 调度
B. 让应用程序向 Kubernetes 传达其健康状态
C. 配置网络服务
D. 处理存储卷

答案: B. 让应用程序向 Kubernetes 传达其健康状态

原文: The Health Probe pattern indicates how an application can communicate its health state to Kubernetes.

5. 填空题：软件行业承认无 bug 代码不可能，特别是分布式应用，重点是使应用程序（ ）以便 Kubernetes 推断其状态。

答案: observable

原文: To be fully automatable, a cloud native application must be highly observable by allowing its state to be inferred so that Kubernetes can detect whether the application is up and whether it is ready to serve requests.

6. 单选题：Kubernetes 通过哪些机制观察容器健康？（ ）
A. 只使用 process health checks
B. process health checks, liveness probes, readiness probes, startup probes
C. 只使用 liveness probes
D. 只使用 readiness probes

答案: B. process health checks, liveness probes, readiness probes, startup probes

原文: Kubernetes provides health probes to monitor container health, allowing the platform to detect and respond to issues.

7. 填空题：健康探针配置在 Pod 规范的哪个字段下？（ ）

答案: .spec.containers[].livenessProbe, .spec.containers[].readinessProbe, .spec.containers[].startupProbe

原文: Health probes are configured in the Pod specification under the .spec.containers[].livenessProbe, .spec.containers[].readinessProbe, and .spec.containers[].startupProbe fields.

8. 单选题：Kubernetes 默认执行的基本健康检查是什么？（ ）
A. HTTP GET 请求
B. 监控容器进程并在意外终止时重启
C. TCP 套接字检查
D. Exec 命令

答案: B. 监控容器进程并在意外终止时重启

原文: Kubernetes regularly checks the container process status and restarts it if issues are detected.

9. 填空题：过程健康检查确保容器进程正在运行，但不验证容器内应用程序是否（ ）。

答案: functioning correctly

原文: Process health checks involve monitoring the container's process to ensure it is running.

10. 单选题：Liveness probe 失败时，Kubernetes 会做什么？（ ）
A. 移除 Pod 从服务端点
B. 重启容器
C. 忽略它
D. 停止所有流量

答案: B. 重启容器

原文: If a liveness probe fails, Kubernetes restarts the container.

11. 填空题：Liveness probe 可以使用 HTTP 请求、TCP 套接字检查或在容器内执行（ ）来实现。

答案: command

原文: These probes use various mechanisms to check container health, such as HTTP, TCP, or exec commands.

12. 单选题：在 Liveness probe 的 YAML 示例中，initialDelaySeconds 指定什么？（ ）
A. 探测间隔时间
B. 开始探测前等待的时间
C. 失败阈值
D. 成功阈值

答案: B. 开始探测前等待的时间

原文: initialDelaySeconds: 3

13. 填空题：Readiness probe 失败时，会发生什么？（ ）

答案: the container is removed from service endpoints

原文: If a readiness probe fails, the container is removed from service endpoints (e.g., Services) until it is ready again.

14. 单选题：在 Readiness probe 的 YAML 示例中，使用什么检查端口 8080 是否开放？（ ）
A. httpGet
B. exec
C. tcpSocket
D. grpc

答案: A. httpGet

原文: readinessProbe: httpGet: path: /ready port: 8080


16. 单选题：Startup probe 的作用是什么？（ ）
A. 检查是否活着
B. 确保容器完全启动后才激活 liveness 和 readiness probes
C. 检查流量就绪
D. 重启进程

答案: B. 确保容器完全启动后才激活 liveness 和 readiness probes

原文: Startup probes are used for containers with long initialization times, ensuring the container is fully started before liveness and readiness probes are applied.

17. 填空题：在 Startup probe 的 YAML 示例中，failureThreshold 指定允许失败的次数（ ）。

答案: 30

原文: failureThreshold: 30

18. 单选题：Health probes 影响 Pod 的什么？（ ）
A. 调度
B. 生命周期管理和流量路由
C. 存储分配
D. 网络配置

答案: B. 生命周期管理和流量路由

原文: These observations influence the lifecycle management of Pods and the way traffic is routed to the application.


20. 单选题：Liveness probes 确保失败容器被重启，而 readiness probes 防止流量发送到（ ）容器。

答案: unready

原文: Liveness probes ensure failed containers are restarted, while readiness probes prevent traffic from being sent to unready containers, improving service availability.

### PPT Slides 文字稿

**Slide 1: 标题页**  
标题: Kubernetes Patterns - Chapter 4: Health Probe (扩展版)  
副标题: Reusable Elements for Designing Cloud Native Applications (Second Edition)  
作者: Bilgin Ibryam & Roland Huß  
内容概述: 本PPT详细覆盖 Health Probe 模式，帮助 Kubernetes 监控和管理容器健康。扩展为20页，深入每个子节。  
(包括书籍封面图片)

**Slide 2: 章节概述**  
主要内容:  
- Chapter 4: Health Probe (页41-49)。  
- 关键子节: Problem, Solution, Process Health Checks, Liveness Probes, Readiness Probes, Startup Probes, Discussion。  
关键点:  
- 焦点: 使应用可观察，提升自动化。  
(引用原文: The Health Probe pattern indicates how an application can communicate its health state to Kubernetes.)

**Slide 3: Problem - 容器健康挑战 (1/2)**  
主要内容:  
- 容器预期始终可用，但可能挂起或冻结。  
- 进程检查不足: e.g., Java OutOfMemoryError 但 JVM 仍在运行。  
关键点:  
- 无限循环、死锁、thrashing 导致问题。  
(引用原文: However, from practice, we know that checking the process status is not sufficient...)

**Slide 4: Problem - 容器健康挑战 (2/2)**  
主要内容:  
- Kubernetes 需要外部方式检查应用是否 functioning as expected。  
- 无需了解内部，只验证服务能力。  
关键点:  
- 分布式应用失败率高。  
(引用原文: Kubernetes needs a reliable way to check the health of applications...)

**Slide 5: Solution - 概述**  
主要内容:  
- Health probes: livenessProbe, readinessProbe, startupProbe 在 Pod spec 中配置。  
- 机制: HTTP, TCP, exec commands。  
关键点:  
- 自动化生命周期和流量路由。  
(引用原文: Health probes are configured in the Pod specification under the .spec.containers[].livenessProbe...)

**Slide 6: Solution - 探针类型介绍**  
主要内容:  
- Process Health Checks: 基础进程监控。  
- Liveness: 检查是否 alive，重启失败。  
- Readiness: 检查是否 ready，移除端点。  
- Startup: 处理慢启动。  
关键点:  
- 每个探针特定目的。  
(引用原文: Kubernetes provides health probes to monitor container health...)

**Slide 7: Process Health Checks (1/2)**  
主要内容:  
- kubelet 监控进程，意外终止时重启。  
- 确保进程运行，但不验证应用逻辑。  
关键点:  
- 基础层级检查。  
(引用原文: Process health checks involve monitoring the container's process to ensure it is running.)

**Slide 8: Process Health Checks (2/2)**  
主要内容:  
- 局限: 无法检测应用级问题，如冻结。  
- 需结合高级探针。  
关键点:  
- 默认 Kubernetes 行为。  
(引用原文: Kubernetes regularly checks the container process status and restarts it if issues are detected.)

**Slide 9: Liveness Probes - 概念**  
主要内容:  
- 确定容器是否 alive，继续运行。  
- 失败: Kubernetes 重启容器。  
关键点:  
- 防止永久不健康状态。  
(引用原文: If a liveness probe fails, Kubernetes restarts the container.)

**Slide 10: Liveness Probes - 配置示例 (1/2)**  
主要内容:  
- YAML 示例:  
```yaml
apiVersion: v1  
kind: Pod  
metadata:  
  name: liveness-probe  
spec:  
  containers:  
  - name: liveness  
    image: k8spatterns/liveness:1.0  
    livenessProbe:  
      httpGet:  
        path: /health  
        port: 8080  
      initialDelaySeconds: 3  
      periodSeconds: 3  
```  
关键点:  
- HTTP GET /health，每3秒检查。  
(插入 YAML 代码块)

**Slide 11: Liveness Probes - 配置示例 (2/2)**  
主要内容:  
- 参数: initialDelaySeconds (延迟), periodSeconds (间隔)。  
- 成功: HTTP 200-399。  
关键点:  
- 自定义阈值避免过度重启。  
(引用原文: This example uses an HTTP GET request to check the /health endpoint every 3 seconds...)

**Slide 12: Readiness Probes - 概念**  
主要内容:  
- 确定是否 ready 服务流量。  
- 失败: 移除从服务端点，无重启。  
关键点:  
- 提升可用性，避免发送到不健康实例。  
(引用原文: If a readiness probe fails, the container is removed from service endpoints...)

**Slide 13: Readiness Probes - 配置示例**  
主要内容:  
- YAML 示例:  
```yaml
apiVersion: v1  
kind: Pod  
metadata:  
  name: readiness-probe  
spec:  
  containers:  
  - name: readiness  
    image: k8spatterns/readiness:1.0  
    readinessProbe:  
      httpGet:  
        path: /ready  
        port: 8080  
      initialDelaySeconds: 5  
      periodSeconds: 5  
```  
关键点:  
- 检查 /ready 端点。  
(插入 YAML 代码块)

**Slide 14: Startup Probes - 概念**  
主要内容:  
- 用于长初始化容器 (e.g., DB 迁移、加载 datasets)。  
- 确保启动完成后激活其他探针。  
关键点:  
- 防止早重启。  
(引用原文: Startup probes are used for containers with long initialization times...)

**Slide 15: Startup Probes - 配置示例**  
主要内容:  
- YAML 示例:  
```yaml
apiVersion: v1  
kind: Pod  
metadata:  
  name: startup-probe  
spec:  
  containers:  
  - name: startup  
    image: k8spatterns/startup:1.0  
    startupProbe:  
      httpGet:  
        path: /startup  
        port: 8080  
      failureThreshold: 30  
      periodSeconds: 10  
```  
关键点:  
- 允许30次失败，每10秒检查。  
(插入 YAML 代码块)

**Slide 16: Discussion - 可靠性影响 (1/2)**  
主要内容:  
- Liveness: 自动恢复失败。  
- Readiness: 智能流量路由。  
关键点:  
- 改善服务可用性。  
(引用原文: Liveness probes ensure failed containers are restarted, while readiness probes prevent traffic...)

**Slide 17: Discussion - 可靠性影响 (2/2)**  
主要内容:  
- Startup: 处理慢启动，避免 premature checks。  
- 参数平衡: responsiveness vs. 资源。  
关键点:  
- 正确配置关键。  
(引用原文: Proper configuration of probe parameters... is crucial to balance between responsiveness and resource usage.)

**Slide 18: Discussion - 最佳实践**  
主要内容:  
- 选择合适机制 (HTTP/TCP/exec)。  
- 监控探针失败日志。  
关键点:  
- 与题目相关: 强调 failureThreshold 等。  
(引用原文: Health probes are essential for maintaining application reliability in Kubernetes.)

**Slide 19: More Information**  
主要内容:  
- 参考: Kubernetes 文档 (Probes)。  
- 示例镜像: k8spatterns/liveness:1.0 等。  
关键点:  
- 进一步: k8spatterns.io。  
(引用原文: No additional information sources are provided... [但基于书])

**Slide 20: 总结 & Q&A**  
主要内容:  
- Health Probe: 核心于云原生 observability。  
- 关键 takeaway: 配置探针自动化管理。  
- 与题目整合: 覆盖概念、示例、行为。  
关键点:  
- 应用到实际部署。  