import { ContentSection } from "../components/ContentSection";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Kubernetes Patterns - Chapter 5: Managed Lifecycle" },
    { name: "description", content: "Managed Lifecycle patterns in Kubernetes applications" },
  ];
};

export default function Chapter5() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          Chapter 5: Managed Lifecycle
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
          探索 Kubernetes 中的托管生命周期模式
        </p>
      </header>

      <ContentSection title="什么是托管生命周期？" variant="primary">
        <p className="mb-4">
          在 Kubernetes 中，容器的生命周期由平台管理，包括启动、运行和终止阶段。应用程序需要符合这种生命周期管理，
          以确保平稳的操作。托管生命周期模式描述了应用程序应该如何以及应该对这些平台事件做出反应。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "Containers in Kubernetes have a lifecycle managed by the platform: they get created, run, and terminated. 
            Applications need to conform to this lifecycle to ensure smooth operation. The Managed Lifecycle pattern 
            describes how applications can and should react to these platform events."
          </p>
        </div>
        
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>容器生命周期由平台管理：启动、运行、终止</li>
          <li>应用程序需要符合生命周期以确保平稳操作</li>
          <li>描述应用程序如何以及应该对平台事件做出反应</li>
          <li>避免数据丢失和服务中断</li>
        </ul>
      </ContentSection>

      <ContentSection title="生命周期挑战" variant="secondary">
        <p className="mb-4">
          如果应用程序不遵循 Kubernetes 的生命周期管理，可能会导致数据丢失或服务中断。开发者有责任设计应用程序来处理这些事件，
          特别是在分布式应用环境中，这变得更加复杂。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "Failure to do so can lead to data loss or service disruptions. It is the responsibility of developers 
            to design applications that handle these events. This becomes even more complex in a distributed application environment."
          </p>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>不符合生命周期管理导致数据丢失或服务中断</li>
          <li>开发者需要设计处理生命周期事件的应用程序</li>
          <li>在分布式应用环境中更加复杂</li>
        </ul>
      </ContentSection>

      <ContentSection title="解决方案概述" variant="accent">
        <p className="mb-4">
          Kubernetes 提供了多种机制来管理容器的生命周期，包括信号（SIGTERM/SIGKILL）和钩子（PostStart/PreStop）。
          这些机制允许应用程序对平台事件做出响应。此外，还有其他控制机制如终止宽限期、重启策略和探针影响，确保容器可以被可预测地管理。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "Kubernetes provides mechanisms for managing the lifecycle of containers: signals (SIGTERM/SIGKILL) 
            and hooks (PostStart/PreStop). These allow applications to respond to platform events. Additional 
            controls like termination grace period, restart policies, and probe influence ensure that containers 
            can be managed predictably."
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-3">信号机制</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>SIGTERM：优雅终止信号</li>
              <li>SIGKILL：强制终止信号</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-3">钩子机制</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>PostStart：容器创建后执行</li>
              <li>PreStop：容器终止前执行</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="SIGTERM 信号" variant="muted">
        <p className="mb-4">
          当需要终止容器时，Kubernetes 首先发送 SIGTERM 信号，给应用程序一个清理资源的机会。应用程序应该处理这个信号来关闭连接、
          保存状态或完成其他清理任务，实现优雅关闭。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "Kubernetes sends a SIGTERM signal to the main process in a container when it needs to terminate it, 
            giving the application a chance to clean up resources. Applications should handle this signal to close 
            connections, save state, or perform other cleanup tasks."
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg mb-6">
          <p className="mb-2"><strong>配置示例：</strong></p>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
            {`spec:
  terminationGracePeriodSeconds: 30
  containers:
  - name: app
    image: myapp`}
          </pre>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>终止时首先发送，给清理机会</li>
          <li>应用程序应处理：关闭连接、保存状态</li>
          <li>实现优雅关闭（Graceful shutdown）</li>
          <li>默认等待30秒（terminationGracePeriodSeconds）</li>
        </ul>
      </ContentSection>

      <ContentSection title="SIGKILL 信号" variant="primary">
        <p className="mb-4">
          如果容器在终止宽限期内没有终止，Kubernetes 会发送 SIGKILL 信号强制终止容器。SIGKILL 是一种强制性终止，
          不会给应用程序任何清理机会，可能导致未完成的操作丢失。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "If the container does not terminate within the grace period, Kubernetes sends a SIGKILL signal 
            to force termination. SIGKILL is a forceful termination that does not give the application a chance 
            to clean up. This can lead to loss of in-flight operations."
          </p>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>SIGTERM 后宽限期超时发送</li>
          <li>强制终止，无清理机会</li>
          <li>非优雅关闭（Non-graceful shutdown）</li>
          <li>风险：未完成操作丢失</li>
          <li>建议：宽限期内完成关键任务</li>
        </ul>
      </ContentSection>

      <ContentSection title="PostStart 钩子" variant="secondary">
        <p className="mb-4">
          PostStart 钩子在容器创建后立即执行，但它不保证在容器的入口点之前执行。PostStart 钩子常用于下载配置、
          设置环境或执行其他初始化任务。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "The PostStart hook is executed immediately after a container is created. However, it does not 
            guarantee that it will execute before the container's entrypoint. The PostStart hook is commonly 
            used to download configuration, set up the environment, or perform other initialization tasks."
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg mb-6">
          <p className="mb-2"><strong>配置示例 (Example 5-1)：</strong></p>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
            {`spec:
  containers:
  - name: app
    image: myapp
    lifecycle:
      postStart:
        exec:
          command: ["/bin/sh", "-c", "echo Hello from PostStart"]`}
          </pre>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>容器创建后立即执行</li>
          <li>用于：下载配置、设置环境</li>
          <li>同步/异步执行</li>
          <li>不保证在入口点之前执行</li>
        </ul>
      </ContentSection>

      <ContentSection title="PreStop 钩子" variant="accent">
        <p className="mb-4">
          PreStop 钩子在容器终止之前调用，它在 SIGTERM 信号发送之前执行。PreStop 钩子用于刷新日志、关闭连接或其他清理任务。
          钩子是阻塞的，容器的终止会被延迟直到钩子完成。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "The PreStop hook is called before a container is terminated, before the SIGTERM signal is sent. 
            The PreStop hook is used to flush logs, close connections, or perform other cleanup tasks. 
            The hook is blocking, and the container termination is delayed until the hook completes."
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg mb-6">
          <p className="mb-2"><strong>配置示例 (Example 5-2)：</strong></p>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
            {`spec:
  containers:
  - name: app
    image: myapp
    lifecycle:
      preStop:
        exec:
          command: ["/bin/sh", "-c", "echo Goodbye from PreStop"]`}
          </pre>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>终止前调用，SIGTERM 前执行</li>
          <li>用于：刷新日志、关闭连接</li>
          <li>阻塞终止直到完成</li>
          <li>确保清理任务完成</li>
        </ul>
      </ContentSection>

      <ContentSection title="其他生命周期控制" variant="muted">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-3">终止宽限期</h3>
            <p className="mb-3">
              .spec.terminationGracePeriodSeconds 指定以秒为单位的时间，在此期间容器在收到 SIGTERM 信号后有时间进行清理。
              默认值是30秒，但可以根据应用需求进行自定义。
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>默认30秒</li>
              <li>控制 SIGTERM 到 SIGKILL 等待时间</li>
              <li>自定义以匹配应用需求</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <h3 className="text-xl font-bold text-yellow-600 dark:text-yellow-400 mb-3">重启策略</h3>
            <p className="mb-3">
              .spec.restartPolicy 定义了 Pod 失败时应该如何重启。选项包括 Always（默认）、OnFailure 和 Never。
              Job 通常使用 Never 策略。
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Always (默认)</li>
              <li>OnFailure</li>
              <li>Never</li>
              <li>Job 使用 Never</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
            <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">探针影响</h3>
            <p className="mb-3">
              Liveness 和 Readiness 探针间接影响生命周期管理（如第4章所述）。Startup 探针会延迟其他探针的执行，
              直到应用完全启动。
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Liveness/Readiness: 间接影响</li>
              <li>Startup: 延迟其他探针</li>
              <li>全面生命周期管理</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="最佳实践" variant="primary">
        <p className="mb-4">
          在使用生命周期钩子和信号时，有一些最佳实践可以提高应用的可靠性和可扩展性。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "The use of hooks like PostStart and PreStop is particularly important for stateful applications. 
            Minimizing the grace period helps avoid unnecessary delays. Testing graceful shutdown is crucial 
            for ensuring applications can handle platform events gracefully."
          </p>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>钩子特别适合有状态应用</li>
          <li>最小化宽限期以避免延迟</li>
          <li>测试优雅关闭确保应用能处理平台事件</li>
          <li>提升可靠性和可扩展性</li>
        </ul>
      </ContentSection>

      <ContentSection title="总结" variant="secondary">
        <p className="mb-4">
          管理容器的生命周期对于确保应用程序能够优雅地处理平台事件至关重要。通过使用信号、钩子和其他控制机制，
          我们可以构建更可靠、更健壮的云原生应用。
        </p>
        
        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg mb-6">
          <p className="italic">
            "Managing the lifecycle of containers is crucial for ensuring applications can handle platform events gracefully. 
            By using signals, hooks, and other controls, we can build more reliable and robust cloud-native applications."
          </p>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>关键于云原生设计</li>
          <li>覆盖信号、钩子、策略</li>
          <li>参考 k8spatterns.io 获取更多信息</li>
        </ul>
      </ContentSection>
    </div>
  );
}