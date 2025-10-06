import { ContentSection } from "../components/ContentSection";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Kubernetes Patterns - Chapters 7,8,9: Behavioral Patterns" },
    { name: "description", content: "Behavioral Patterns: Batch Job, Periodic Job, and Daemon Service in Kubernetes applications" },
  ];
};

export default function Chapter7() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          Chapters 7,8,9: Behavioral Patterns
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
          探索 Kubernetes 中的行为模式：批处理任务、定期任务和守护服务
        </p>
      </header>

      {/* Chapter 7: Batch Job */}
      <ContentSection title="Chapter 7: Batch Job" variant="primary">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">什么是批处理任务？</h2>
        <p className="mb-4">
          批处理任务是运行有限时间的计算任务，如数据处理、备份或计算任务。与连续运行的服务不同，批处理任务有明确的开始和结束。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "Batch processing tasks have a definite beginning and ending. They perform a finite computation and then stop."
          </p>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>有限时间任务：有明确开始和结束</li>
          <li>与连续服务不同：不需要持续运行</li>
          <li>常见示例：数据转换、视频编码、备份</li>
          <li>平台管理：完成和重试由平台处理</li>
        </ul>
      </ContentSection>

      <ContentSection title="Chapter 7: 问题场景" variant="secondary">
        <p className="mb-4">
          在分布式系统中，需要运行各种有限时间的任务。这些任务可能需要特定的资源、依赖关系或执行环境。
          手动管理这些任务的生命周期、失败处理和重试会非常复杂。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "Need to run finite-time tasks like batch processing, computation, or backup jobs that have a clear ending. 
            Unlike continuous services, these require platform management of completion and retries."
          </p>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>有限时间任务：批处理、计算或备份</li>
          <li>平台管理：完成和重试处理</li>
          <li>复杂性：生命周期和失败处理</li>
          <li>示例：数据转换、视频编码</li>
        </ul>
      </ContentSection>

      <ContentSection title="Chapter 7: 解决方案概述" variant="accent">
        <p className="mb-4">
          Kubernetes 使用 Job 资源来管理批处理任务。Job 控制器创建 Pod 来执行任务，并确保任务完成。
          Job 提供了重试机制、时间限制和并行处理能力。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "The Job controller creates Pods to perform the task and ensures that the specified number of them successfully terminate. 
            As pods fail, the Job controller spawns new ones to replace them."
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-3">核心特性</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>backoffLimit：重试次数限制</li>
              <li>activeDeadlineSeconds：任务时间限制</li>
              <li>并行处理能力</li>
              <li>完成状态跟踪</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-3">使用场景</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>数据处理和转换</li>
              <li>定期备份任务</li>
              <li>机器学习训练</li>
              <li>报表生成</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Chapter 7: 并行性和完成数" variant="muted">
        <p className="mb-4">
          Job 支持并行处理任务，通过 parallelism 和 completions 参数控制并发执行的 Pod 数量和所需完成的数量。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "parallelism specifies the number of Pods to run simultaneously, while completions specifies how many 
            successful completions are needed for the Job to be considered complete."
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg mb-6">
          <p className="mb-2"><strong>Job 并行配置示例：</strong></p>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
            {`apiVersion: batch/v1
kind: Job
metadata:
  name: parallel-job
spec:
  parallelism: 3
  completions: 6
  template:
    spec:
      containers:
      - name: worker
        image: busybox
        command: ["sh", "-c", "echo Processing item && sleep 10"]
      restartPolicy: Never`}
          </pre>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>parallelism：同时运行的 Pod 数量</li>
          <li>completions：所需成功完成的数量</li>
          <li>用于并行处理任务</li>
          <li>自动管理 Pod 生命周期</li>
        </ul>
      </ContentSection>

      <ContentSection title="Chapter 7: 完成模式" variant="primary">
        <p className="mb-4">
          Job 支持两种完成模式：NonIndexed（默认）和 Indexed。Indexed 模式为每个 Pod 分配唯一索引，适用于处理分片数据。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "The completionMode can be NonIndexed or Indexed. In Indexed mode, each Pod gets a unique index in the range 0 to .spec.completions-1, 
            which is useful for processing sharded data."
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg mb-6">
          <p className="mb-2"><strong>Indexed Job 配置示例：</strong></p>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
            {`apiVersion: batch/v1
kind: Job
metadata:
  name: indexed-job
spec:
  completions: 4
  parallelism: 2
  completionMode: Indexed
  template:
    spec:
      containers:
      - name: processor
        image: busybox
        command: ["sh", "-c", "echo 'Processing item $JOB_COMPLETION_INDEX' && sleep 10"]
      restartPolicy: Never`}
          </pre>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>NonIndexed：默认模式，简单完成计数</li>
          <li>Indexed：每个 Pod 有唯一索引</li>
          <li>处理分片数据的理想选择</li>
          <li>通过环境变量访问索引</li>
        </ul>
      </ContentSection>

      <ContentSection title="Chapter 7: 讨论与更多信息" variant="secondary">
        <p className="mb-4">
          Job 是在 Kubernetes 中运行有限任务的标准方式。它支持可扩展性，并提供了丰富的配置选项来满足不同的需求。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "Jobs are the idiomatic way in Kubernetes to run finite tasks. They support scalability and provide rich 
            configuration options to meet different requirements."
          </p>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>运行有限任务的标准方式</li>
          <li>支持可扩展性</li>
          <li>丰富的配置选项</li>
          <li>强调重试和模式</li>
        </ul>
      </ContentSection>

      {/* Chapter 8: Periodic Job */}
      <ContentSection title="Chapter 8: Periodic Job" variant="accent">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">什么是定期任务？</h2>
        <p className="mb-4">
          定期任务是按计划运行的批处理任务，如每日报告或清理任务。与标准批处理任务不同，定期任务需要调度机制来按计划执行。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "Periodic jobs are batch jobs that run on a schedule. Unlike standard batch jobs, periodic jobs require 
            a scheduling mechanism to execute according to a defined schedule."
          </p>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>按计划运行的批处理任务</li>
          <li>常见示例：每日报告、清理任务</li>
          <li>需要调度机制</li>
          <li>基于 Cron 格式定义调度</li>
        </ul>
      </ContentSection>

      <ContentSection title="Chapter 8: 问题场景" variant="muted">
        <p className="mb-4">
          在分布式系统中，需要定期执行各种任务，如备份、数据同步或报告生成。手动调度这些任务会非常复杂且容易出错。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "Need to run batch jobs periodically, such as daily reports or cleanup tasks. Manual scheduling of these 
            tasks would be complex and error-prone."
          </p>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>定期执行任务：报告、备份、同步</li>
          <li>调度复杂性</li>
          <li>示例：备份、数据同步</li>
          <li>手动调度容易出错</li>
        </ul>
      </ContentSection>

      <ContentSection title="Chapter 8: 解决方案概述" variant="primary">
        <p className="mb-4">
          Kubernetes 使用 CronJob 资源来管理定期任务。CronJob 创建定时的 Job 实例，并提供了并发控制和历史记录管理功能。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "The CronJob resource manages periodic jobs. CronJobs create timed Job instances and provide concurrency 
            control and history management features."
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-3">核心特性</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>schedule：Cron 格式调度 (e.g., "*/5 * * * *")</li>
              <li>concurrencyPolicy：并发控制</li>
              <li>历史记录管理</li>
              <li>调度窗口控制</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-3">使用场景</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>定期备份任务</li>
              <li>数据同步</li>
              <li>报表生成</li>
              <li>系统清理</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Chapter 8: 并发策略" variant="secondary">
        <p className="mb-4">
          CronJob 提供三种并发策略来控制任务的并发执行：Allow（允许并发）、Forbid（禁止并发）和 Replace（替换上一实例）。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "CronJob provides three concurrency policies to control concurrent execution: Allow (allow concurrent), 
            Forbid (forbid concurrent), and Replace (replace the previous instance)."
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg mb-6">
          <p className="mb-2"><strong>CronJob 并发策略配置示例：</strong></p>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
            {`apiVersion: batch/v1
kind: CronJob
metadata:
  name: concurrent-cronjob
spec:
  schedule: "*/5 * * * *"
  concurrencyPolicy: Forbid
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: reporter
            image: busybox
            command: ["sh", "-c", "echo Generating report && sleep 30"]
          restartPolicy: OnFailure`}
          </pre>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>Allow：允许并发执行</li>
          <li>Forbid：跳过如果上一任务仍在运行</li>
          <li>Replace：替换上一实例</li>
          <li>控制重叠执行</li>
        </ul>
      </ContentSection>

      <ContentSection title="Chapter 8: 历史记录限制" variant="accent">
        <p className="mb-4">
          CronJob 提供历史记录限制功能来管理成功和失败任务的历史记录数量，避免资源过度使用。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "CronJob provides history limit features to manage the number of successful and failed job history records, 
            preventing excessive resource usage."
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg mb-6">
          <p className="mb-2"><strong>CronJob 历史记录限制配置示例：</strong></p>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
            {`apiVersion: batch/v1
kind: CronJob
metadata:
  name: history-limited-cronjob
spec:
  schedule: "0 1 * * *"
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 1
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: cleaner
            image: busybox
            command: ["sh", "-c", "echo Cleaning up && sleep 10"]
          restartPolicy: OnFailure`}
          </pre>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>successfulJobsHistoryLimit：保留成功历史</li>
          <li>failedJobsHistoryLimit：保留失败历史</li>
          <li>管理资源使用</li>
          <li>避免历史记录无限增长</li>
        </ul>
      </ContentSection>

      <ContentSection title="Chapter 8: 其他特性" variant="muted">
        <p className="mb-4">
          CronJob 还提供了其他高级特性，如调度窗口控制和暂停调度功能。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "CronJob also provides additional advanced features, such as scheduling window control and suspend scheduling functionality."
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg mb-6">
          <p className="mb-2"><strong>CronJob 其他特性配置示例：</strong></p>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
            {`apiVersion: batch/v1
kind: CronJob
metadata:
  name: advanced-cronjob
spec:
  schedule: "0 2 * * *"
  startingDeadlineSeconds: 300
  suspend: false
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: syncer
            image: busybox
            command: ["sh", "-c", "echo Syncing data && sleep 20"]
          restartPolicy: OnFailure`}
          </pre>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>startingDeadlineSeconds：错过调度的启动窗口</li>
          <li>suspend：暂停调度</li>
          <li>灵活的调度控制</li>
          <li>错误处理机制</li>
        </ul>
      </ContentSection>

      <ContentSection title="Chapter 8: 讨论与更多信息" variant="primary">
        <p className="mb-4">
          CronJob 扩展了 Job 的功能，为定期任务提供了调度能力。它提供了丰富的策略和限制来控制任务执行。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "CronJob extends Job functionality to provide scheduling capabilities for periodic tasks. It offers rich 
            policies and limits to control task execution."
          </p>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>扩展 Job 为定期任务</li>
          <li>丰富的策略和限制</li>
          <li>强调政策和限制</li>
          <li>适合调度任务</li>
        </ul>
      </ContentSection>

      {/* Chapter 9: Daemon Service */}
      <ContentSection title="Chapter 9: Daemon Service" variant="accent">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">什么是守护服务？</h2>
        <p className="mb-4">
          守护服务是在每个节点上运行的服务，如监控代理或日志收集器。与标准 Deployment 不同，守护服务确保每个节点上都有一个 Pod 实例。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "Daemon services are services that run on every node, such as monitoring agents or log collectors. Unlike 
            standard Deployments, daemon services ensure that a Pod instance exists on each node."
          </p>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>在每个节点上运行的服务</li>
          <li>常见示例：监控代理、日志收集器</li>
          <li>确保每个节点一个 Pod 实例</li>
          <li>节点级基础设施服务</li>
        </ul>
      </ContentSection>

      <ContentSection title="Chapter 9: 问题场景" variant="muted">
        <p className="mb-4">
          在分布式系统中，需要在每个节点上运行基础设施服务，如网络代理、存储守护进程或监控代理。标准 Deployment 无法保证节点覆盖。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "Need to run infrastructure services on every node, such as network proxies, storage daemons, or monitoring 
            agents. Standard Deployments cannot guarantee node coverage."
          </p>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>节点级基础设施服务</li>
          <li>标准 Deployment 的局限性</li>
          <li>示例：网络代理、存储守护</li>
          <li>保证节点覆盖的需求</li>
        </ul>
      </ContentSection>

      <ContentSection title="Chapter 9: 解决方案概述" variant="primary">
        <p className="mb-4">
          Kubernetes 使用 DaemonSet 资源来管理守护服务。DaemonSet 确保每个节点（或选定节点）上都运行一个 Pod 实例，并自动调度到新节点。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "Kubernetes uses the DaemonSet resource to manage daemon services. DaemonSet ensures that a Pod instance 
            runs on each node (or selected nodes) and automatically schedules to new nodes."
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-3">核心特性</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>确保每个节点一个 Pod</li>
              <li>自动调度到新节点</li>
              <li>支持节点选择器过滤</li>
              <li>更新策略控制</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-3">使用场景</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>日志收集 (e.g., Fluentd)</li>
              <li>监控 (e.g., node-exporter)</li>
              <li>网络 (e.g., Calico)</li>
              <li>存储守护进程</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Chapter 9: 更新策略" variant="muted">
        <p className="mb-4">
          DaemonSet 提供两种更新策略：RollingUpdate（滚动更新）和 OnDelete（删除时更新）。滚动更新支持最小中断的渐进更新。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "DaemonSet provides two update strategies: RollingUpdate (rolling update) and OnDelete (update on delete). 
            Rolling updates support progressive updates with minimal disruption."
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg mb-6">
          <p className="mb-2"><strong>DaemonSet 更新策略配置示例：</strong></p>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
            {`apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluentd-elasticsearch
spec:
  selector:
    matchLabels:
      name: fluentd-elasticsearch
  updateStrategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
  template:
    metadata:
      labels:
        name: fluentd-elasticsearch
    spec:
      containers:
      - name: fluentd-elasticsearch
        image: quay.io/fluentd_elasticsearch/fluentd:v2.5.2`}
          </pre>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>RollingUpdate：渐进更新，maxUnavailable 控制</li>
          <li>OnDelete：手动触发更新</li>
          <li>最小中断</li>
          <li>渐进式更新</li>
        </ul>
      </ContentSection>

      <ContentSection title="Chapter 9: 使用场景" variant="secondary">
        <p className="mb-4">
          DaemonSet 适用于多种节点级基础设施任务，如日志收集、监控代理和网络插件。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "DaemonSet is suitable for various node-level infrastructure tasks, such as log collection, monitoring agents, 
            and network plugins."
          </p>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>日志收集 (e.g., Fluentd)</li>
          <li>监控 (e.g., node-exporter)</li>
          <li>网络 (e.g., Calico)</li>
          <li>节点级基础设施</li>
        </ul>
      </ContentSection>

      <ContentSection title="Chapter 9: 讨论" variant="accent">
        <p className="mb-4">
          DaemonSet 适用于基础设施任务，但不适合应用逻辑。它与节点生命周期绑定，需要考虑高可用性。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "DaemonSet is suitable for infrastructure tasks but not for application logic. It is bound to node lifecycle 
            and requires consideration of high availability."
          </p>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>适合基础设施任务</li>
          <li>不适合应用逻辑</li>
          <li>与节点生命周期绑定</li>
          <li>高可用性考虑</li>
        </ul>
      </ContentSection>

      <ContentSection title="Chapter 9: 更多信息" variant="muted">
        <p className="mb-4">
          DaemonSet 提供了丰富的文档和示例来帮助用户更好地使用这一资源。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "DaemonSet provides rich documentation and examples to help users better utilize this resource."
          </p>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>DaemonSet 文档</li>
          <li>示例 YAML 配置</li>
          <li>Kubernetes 社区资源</li>
          <li>进一步阅读材料</li>
        </ul>
      </ContentSection>

      {/* Summary */}
      <ContentSection title="总结" variant="primary">
        <p className="mb-4">
          行为模式管理容器和平台交互，焦点于任务执行、调度和节点分布。这些模式提升了 Kubernetes 的行为管理能力。
        </p>
        
        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg mb-6">
          <p className="italic">
            "Behavioral patterns manage container and platform interactions, focusing on task execution, scheduling, 
            and node distribution. These patterns enhance Kubernetes behavioral management capabilities."
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-3">Chapter 7: Batch Job</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>有限时间任务</li>
              <li>Job 资源管理</li>
              <li>并行处理</li>
              <li>完成模式</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-3">Chapter 8: Periodic Job</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>调度任务</li>
              <li>CronJob 资源</li>
              <li>并发策略</li>
              <li>历史记录限制</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">Chapter 9: Daemon Service</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>节点任务</li>
              <li>DaemonSet 资源</li>
              <li>更新策略</li>
              <li>基础设施服务</li>
            </ul>
          </div>
        </div>
        
        <ul className="list-disc pl-6 space-y-2 mt-6">
          <li>覆盖核心概念如 policy、strategy</li>
          <li>提升 Kubernetes 行为管理</li>
          <li>参考 k8spatterns.io 获取更多信息</li>
        </ul>
      </ContentSection>
    </div>
  );
}
