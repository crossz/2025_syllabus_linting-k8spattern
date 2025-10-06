import { ContentSection } from "../components/ContentSection";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Kubernetes Patterns - Chapter 4: Health Probe" },
    { name: "description", content: "Health Probe patterns in Kubernetes applications" },
  ];
};

export default function Chapter4() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          Chapter 4: Health Probe
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
          探索 Kubernetes 中的健康探针模式
        </p>
      </header>

      <ContentSection title="什么是健康探针？" variant="primary">
        <p className="mb-4">
          在 Kubernetes 中，探针是由 kubelet 对容器执行的定期诊断。为了使诊断尽可能准确，
          kubelet 调用由容器实现的 Handler（处理程序）。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "A probe is a diagnostic performed periodically by the kubelet on a Container. 
            To perform a diagnostic, the kubelet calls a Handler implemented by the Container."
          </p>
        </div>
        
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>探针是一种由 kubelet 定期执行的诊断机制</li>
          <li>kubelet 通过调用容器实现的 Handler 来执行诊断</li>
          <li>这种机制确保了对容器健康状况的准确评估</li>
        </ul>
      </ContentSection>

      <ContentSection title="三种类型的探针" variant="secondary">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-3">存活探针 (Liveness Probe)</h3>
            <p>指示容器是否正在运行。如果存活探针失败，kubelet 会杀死容器，容器将受到其重启策略的影响。</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <h3 className="text-xl font-bold text-yellow-600 dark:text-yellow-400 mb-3">就绪探针 (Readiness Probe)</h3>
            <p>指示容器是否已准备好服务请求。如果就绪探针失败，端点控制器会从与 Pod 匹配的所有 Service 的端点中删除该 Pod 的 IP 地址。</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-3">启动探针 (Startup Probe)</h3>
            <p>指示容器中的应用是否已启动。如果提供了启动探针，则所有其他探针都会被禁用，直到它成功为止。</p>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg mb-6">
          <p className="italic">
            "There are three types of probes in Kubernetes: liveness, readiness, and startup probes. 
            All three are used to control the lifecycle of a Pod and determine its readiness to receive traffic."
          </p>
        </div>
      </ContentSection>

      <ContentSection title="存活探针 (Liveness Probe) - 概念" variant="accent">
        <p className="mb-4">
          存活探针旨在让 Kubernetes 知道何时需要重新启动容器。例如，当应用程序处于死锁状态时，
          重新启动容器可以帮助恢复应用。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "Liveness probes are used to know when to restart a Container. 
            For example, liveness probes could catch a deadlock, where an application is running, 
            but unable to make progress. Restarting a Container in such a state can help to make 
            the application more available despite bugs."
          </p>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>用于检测容器何时需要重启</li>
          <li>可以检测到应用死锁等无法自行恢复的问题</li>
          <li>通过重启容器来恢复应用可用性</li>
          <li>即使存在 bug 也能提高应用的可用性</li>
        </ul>
      </ContentSection>

      <ContentSection title="存活探针 - 配置示例" variant="muted">
        <p className="mb-4">
          下面是一个存活探针的配置示例：
        </p>
        
        <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
          {`apiVersion: v1
kind: Pod
metadata:
  labels:
    test: liveness
  name: liveness-exec
spec:
  containers:
  - name: liveness
    image: registry.k8s.io/busybox
    args:
    - /bin/sh
    - -c
    - touch /tmp/healthy; sleep 30; rm -rf /tmp/healthy; sleep 600
    livenessProbe:
      exec:
        command:
        - cat
        - /tmp/healthy
      initialDelaySeconds: 5
      periodSeconds: 5`}
        </pre>
        
        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg mb-6">
          <p className="italic">
            "The liveness probe example uses an exec action to run a command inside the container. 
            The probe checks for the existence of a file, and if it doesn't exist, the container 
            will be restarted."
          </p>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>使用 exec 方式执行命令检查文件是否存在</li>
          <li>initialDelaySeconds: 5 表示容器启动后延迟5秒开始检查</li>
          <li>periodSeconds: 5 表示每隔5秒检查一次</li>
          <li>如果 /tmp/healthy 文件不存在，容器将被重启</li>
        </ul>
      </ContentSection>

      <ContentSection title="就绪探针 (Readiness Probe) - 概念" variant="primary">
        <p className="mb-4">
          就绪探针旨在让 Kubernetes 知道容器何时准备好接收流量。当 Pod 的就绪探针失败时，
          端点控制器会从与 Pod 关联的所有 Service 的端点中删除该 Pod 的 IP 地址。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "Readiness probes are used to know when a Container is ready to start accepting traffic. 
            When a Pod's readiness probe fails, the endpoint controller removes the Pod's IP address 
            from the endpoints of all Services that match the Pod."
          </p>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>用于检测容器何时准备好接收流量</li>
          <li>失败时会从 Service 端点中移除 Pod IP</li>
          <li>确保流量不会发送到未准备好的容器</li>
          <li>适用于应用启动时间较长或需要预热的场景</li>
        </ul>
      </ContentSection>

      <ContentSection title="就绪探针 - 配置示例" variant="secondary">
        <p className="mb-4">
          下面是一个就绪探针的配置示例：
        </p>
        
        <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
          {`apiVersion: v1
kind: Pod
metadata:
  name: readiness-exec
  labels:
    test: readiness
spec:
  containers:
  - name: readiness
    image: registry.k8s.io/busybox
    args:
    - /bin/sh
    - -c
    - sleep 30; touch /tmp/healthy; sleep 600
    readinessProbe:
      exec:
        command:
        - cat
        - /tmp/healthy
      initialDelaySeconds: 5
      periodSeconds: 5`}
        </pre>
        
        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg mb-6">
          <p className="italic">
            "The readiness probe example also uses an exec action. In this case, the probe waits 
            for 30 seconds before creating the healthy file, simulating an application startup time. 
            During this time, the Pod will not receive traffic."
          </p>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>同样使用 exec 方式检查文件</li>
          <li>容器启动后先等待30秒再创建健康文件</li>
          <li>模拟应用启动时间，在此期间不会接收流量</li>
          <li>initialDelaySeconds 和 periodSeconds 参数含义与存活探针相同</li>
        </ul>
      </ContentSection>

      <ContentSection title="启动探针 (Startup Probe) - 概念" variant="accent">
        <p className="mb-4">
          启动探针用于具有长时间初始化的容器。当配置了启动探针时，在启动探针成功之前会禁用所有其他探针。
          这可以防止在容器真正启动完成前就被误判为失败。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "Startup probes are used for containers with long initialization times. 
            When a startup probe is configured, all other probes are disabled until it succeeds. 
            This prevents other probes from interfering with the application startup process."
          </p>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>专为初始化时间较长的容器设计</li>
          <li>启动探针成功前禁用其他所有探针</li>
          <li>避免在应用启动过程中被其他探针误判</li>
          <li>确保应用有足够时间完成初始化</li>
        </ul>
      </ContentSection>

      <ContentSection title="启动探针 - 配置示例" variant="muted">
        <p className="mb-4">
          下面是一个启动探针的配置示例：
        </p>
        
        <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
          {`apiVersion: v1
kind: Pod
metadata:
  name: startup-http
  labels:
    test: startup
spec:
  containers:
  - name: startup
    image: myapp
    startupProbe:
      httpGet:
        path: /startup
        port: 8080
      failureThreshold: 30
      periodSeconds: 10`}
        </pre>
        
        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg mb-6">
          <p className="italic">
            "The startup probe example uses an HTTP GET request to check if the application is ready. 
            With a failure threshold of 30 and a period of 10 seconds, the application has up to 5 
            minutes (30 * 10) to finish its startup process."
          </p>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>使用 HTTP GET 请求检查应用是否就绪</li>
          <li>failureThreshold: 30 允许最多30次失败</li>
          <li>periodSeconds: 10 每10秒检查一次</li>
          <li>总共给予应用5分钟(30*10秒)完成启动过程</li>
        </ul>
      </ContentSection>

      <ContentSection title="讨论 - 对可靠性的影响 (1/2)" variant="primary">
        <p className="mb-4">
          健康探针对应用可靠性的积极影响：
        </p>
        
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>存活探针提供自动恢复能力，当应用进入无效状态时能自动重启</li>
          <li>就绪探针提供智能流量路由，确保流量只发送到准备好的实例</li>
        </ul>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "Health probes have a positive impact on application reliability. Liveness probes provide 
            automatic recovery when an application enters an invalid state, while readiness probes 
            provide intelligent traffic routing to ensure traffic is only sent to ready instances."
          </p>
        </div>
      </ContentSection>

      <ContentSection title="讨论 - 对可靠性的影响 (2/2)" variant="secondary">
        <p className="mb-4">
          启动探针处理慢启动容器：
        </p>
        
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>启动探针特别适合处理启动缓慢的应用</li>
          <li>正确配置参数对于平衡响应性和资源消耗至关重要</li>
        </ul>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "Startup probes handle slow-starting containers gracefully. Proper configuration of 
            parameters is crucial for balancing responsiveness with resource consumption."
          </p>
        </div>
      </ContentSection>

      <ContentSection title="讨论 - 最佳实践" variant="accent">
        <p className="mb-4">
          使用健康探针的最佳实践：
        </p>
        
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>为每个应用选择合适的探针机制</li>
          <li>监控探针失败并记录日志以进行故障排除</li>
        </ul>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "Best practices for using health probes include selecting the appropriate probe mechanism 
            for each application and monitoring probe failures with logging for troubleshooting purposes. 
            The failureThreshold parameter is particularly important to configure correctly."
          </p>
        </div>
      </ContentSection>

      <ContentSection title="更多信息" variant="muted">
        <p className="mb-4">
          更多关于健康探针的信息，请参考以下资源：
        </p>
        
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Kubernetes 官方文档：<a href="https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/" className="text-blue-600 dark:text-blue-400 hover:underline">Configure Liveness, Readiness and Startup Probes</a></li>
          <li>示例镜像仓库：<a href="https://github.com/k8spatterns/examples" className="text-blue-600 dark:text-blue-400 hover:underline">k8spatterns/examples</a></li>
        </ul>
        
        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg mb-6">
          <p className="italic">
            "More information about health probes can be found in the official Kubernetes documentation 
            and example repositories. Visit k8spatterns.io for additional resources."
          </p>
        </div>
      </ContentSection>
    </div>
  );
}