import { ContentSection } from "../components/ContentSection";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Kubernetes Patterns - Chapter 6: Automated Placement" },
    { name: "description", content: "Automated Placement patterns in Kubernetes applications" },
  ];
};

export default function Chapter6() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          Chapter 6: Automated Placement
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
          探索 Kubernetes 中的自动化放置模式
        </p>
      </header>

      <ContentSection title="什么是自动化放置？" variant="primary">
        <p className="mb-4">
          自动化放置是 Kubernetes 调度器的核心功能，负责将 Pod 分配到集群中的节点上。调度器考虑运行时依赖、资源需求、高可用性策略等因素，
          以优化应用的可用性、性能和容量。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "Automated Placement is the core function of the Kubernetes scheduler that assigns Pods to nodes in a cluster. 
            It does this by considering runtime dependencies, resource requirements, high-availability policies, and other 
            factors to optimize the availability, performance, and capacity of the applications."
          </p>
        </div>
        
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>调度器核心功能：将 Pod 分配到节点</li>
          <li>考虑因素：运行时依赖、资源需求、高可用性策略</li>
          <li>优化目标：应用的可用性、性能和容量</li>
          <li>高度可配置且仍在快速演进中</li>
        </ul>
      </ContentSection>

      <ContentSection title="放置挑战" variant="secondary">
        <p className="mb-4">
          在大型微服务系统中，手动分配和放置每个服务到节点是不可管理的活动。Pod 抽象虽然很好，但不解决节点分配问题。
          依赖关系、资源需求和集群资源都在动态变化，使得调度成为一个移动目标。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "With a large and ever-growing number of microservices, assigning and placing them individually to nodes 
            is not a manageable activity. All of that makes scheduling containers to nodes a moving target that has 
            to be shot on the move."
          </p>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>大型微服务系统手动放置不可扩展</li>
          <li>Pod 抽象不解决节点分配问题</li>
          <li>依赖、资源需求动态变化</li>
          <li>调度是"移动目标"，需动态处理</li>
        </ul>
      </ContentSection>

      <ContentSection title="解决方案概述" variant="accent">
        <p className="mb-4">
          Kubernetes 调度器通过考虑运行时依赖、资源需求、高可用性策略、水平扩展和共置等因素来实现自动化放置。
          调度器有默认的谓词和优先级策略配置，适合大多数用例，但也支持自定义配置。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "The scheduler has a default set of predicate and priority policies configured that are suitable for 
            most use cases, but it can be customized for specific requirements. It considers factors like runtime 
            dependencies, resource requirements, high-availability policies, horizontal scaling, and collocation."
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-3">核心概念</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>可用节点资源</li>
              <li>容器资源需求</li>
              <li>调度器配置</li>
              <li>调度过程</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-3">高级特性</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>亲和性和反亲和性</li>
              <li>拓扑分布约束</li>
              <li>污点和容忍度</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="可用节点资源" variant="muted">
        <p className="mb-4">
          节点容量计算公式：可分配容量 = 节点容量 - Kube-Reserved - System-Reserved - Eviction Thresholds。
          这确保了 kubelet 等守护进程有足够的资源，避免资源竞争。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "Allocatable [capacity for application pods] = Node Capacity - Kube-Reserved - System-Reserved - Eviction Thresholds. 
            This ensures that system components and kubelet daemons have sufficient resources and avoids resource contention."
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg mb-6">
          <p className="mb-2"><strong>资源配置示例：</strong></p>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
            {`apiVersion: v1
kind: Node
metadata:
  name: node-1
status:
  allocatable:
    cpu: "2"
    memory: "8Gi"
    pods: "110"`}
          </pre>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>节点容量 = 可分配 + 预留资源</li>
          <li>预留 kubelet 等守护进程资源</li>
          <li>Eviction 阈值保护节点稳定性</li>
          <li>调度器检查总请求 {"<"} 可分配容量</li>
        </ul>
      </ContentSection>

      <ContentSection title="容器资源需求" variant="primary">
        <p className="mb-4">
          容器需要声明其资源需求（request/limit）和依赖（存储、端口等）。粗粒度的需求可能导致资源碎片，
          而细粒度的资源声明有助于优化资源利用率。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "It boils down to having containers that declare their resource profiles (requests and limits) and 
            dependencies (storage, ports, etc.). Fine-grained resource declarations help optimize resource utilization."
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg mb-6">
          <p className="mb-2"><strong>资源配置示例：</strong></p>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
            {`spec:
  containers:
  - name: app
    image: myapp
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"`}
          </pre>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>声明资源需求和限制</li>
          <li>声明依赖（存储、端口等）</li>
          <li>粗粒度需求可能导致资源碎片</li>
          <li>细粒度优化资源利用率</li>
        </ul>
      </ContentSection>

      <ContentSection title="调度器配置" variant="secondary">
        <p className="mb-4">
          Kubernetes 调度器配置在 v1.23 版本前后有所不同。在 v1.23 之前使用调度策略（谓词/优先级），
          之后使用调度配置文件（Profiles）和插件机制。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "In Kubernetes versions before v1.23, a scheduling policy can be used with predicates and priorities. 
            From v1.23 onwards, scheduling profiles and plugin mechanisms are used for more flexible configuration."
          </p>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>v1.23 前：调度策略（谓词/优先级）</li>
          <li>v1.23 后：调度配置文件和插件</li>
          <li>可覆盖默认插件配置</li>
          <li>示例：覆盖 PodTopologySpread 插件</li>
        </ul>
      </ContentSection>

      <ContentSection title="调度过程" variant="accent">
        <p className="mb-4">
          Kubernetes 调度过程分为三个阶段：过滤（Filter）不合适的节点，评分（Score）剩余节点，绑定（Bind）Pod 到选定节点。
          调度器通过 nodeSelector 等机制实现简单的节点选择。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "The scheduling process has three stages: filtering unsuitable nodes, scoring remaining nodes, and binding 
            the Pod to the selected node. Simple node selection can be achieved through mechanisms like nodeSelector."
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg mb-6">
          <p className="mb-2"><strong>nodeSelector 配置示例：</strong></p>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
            {`spec:
  nodeSelector:
    disktype: ssd`}
          </pre>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>阶段1：过滤不合适的节点</li>
          <li>阶段2：评分剩余节点</li>
          <li>阶段3：绑定 Pod 到选定节点</li>
          <li>简单选择：nodeSelector 标签匹配</li>
        </ul>
      </ContentSection>

      <ContentSection title="节点亲和性" variant="muted">
        <p className="mb-4">
          节点亲和性是比 nodeSelector 更有表达力的方式，允许指定必需或首选的规则。支持多种运算符（In, NotIn, Gt, Lt, Exists, DoesNotExist），
          可以基于节点标签实现复杂的调度策略。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "Node affinity, which is a more expressive way than nodeSelector, allows specifying rules as either 
            required or preferred. It supports operators like In, NotIn, Gt, Lt, Exists, DoesNotExist for complex 
            scheduling policies based on node labels."
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg mb-6">
          <p className="mb-2"><strong>节点亲和性配置示例：</strong></p>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
            {`spec:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: numberCores
            operator: Gt
            values:
            - "3"`}
          </pre>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>比 nodeSelector 更有表达力</li>
          <li>必需规则（required）和首选规则（preferred）</li>
          <li>支持多种运算符</li>
          <li>基于节点标签的复杂调度策略</li>
        </ul>
      </ContentSection>

      <ContentSection title="Pod 亲和性和反亲和性" variant="primary">
        <p className="mb-4">
          Pod 亲和性用于将 Pod 共置在相同拓扑域（如区域、可用区），基于标签选择器和拓扑键实现。
          Pod 反亲和性用于分散 Pod 避免单点故障，提高应用的高可用性。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "Pod affinity is used to colocate Pods in the same topology domain (like zone, region) based on label 
            selectors and topology keys. Pod anti-affinity is used to spread Pods to avoid single points of failure 
            and improve application high availability."
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg mb-6">
          <p className="mb-2"><strong>Pod 反亲和性配置示例：</strong></p>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
            {`spec:
  affinity:
    podAntiAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 100
        podAffinityTerm:
          labelSelector:
            matchLabels:
              app: myapp
          topologyKey: topology.kubernetes.io/zone`}
          </pre>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>Pod 亲和性：共置相同拓扑域</li>
          <li>Pod 反亲和性：分散避免单点故障</li>
          <li>基于标签选择器和拓扑键</li>
          <li>提高应用高可用性</li>
        </ul>
      </ContentSection>

      <ContentSection title="拓扑分布约束" variant="primary">
        <p className="mb-4">
          拓扑分布约束用于在集群中均匀分布 Pod，通过 maxSkew 参数定义允许的最大分布不均匀度。
          支持硬约束（DoNotSchedule）和软约束（ScheduleAnyway）两种策略。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "Topology spread constraints are used to evenly distribute Pods across the cluster, with the maxSkew 
            parameter defining the maximum degree of uneven distribution allowed. It supports both hard constraints 
            (DoNotSchedule) and soft constraints (ScheduleAnyway)."
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg mb-6">
          <p className="mb-2"><strong>拓扑分布约束配置示例：</strong></p>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
            {`spec:
  topologySpreadConstraints:
  - maxSkew: 1
    topologyKey: topology.kubernetes.io/zone
    whenUnsatisfiable: DoNotSchedule
    labelSelector:
      matchLabels:
        app: myapp`}
          </pre>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>均匀分布 Pod</li>
          <li>maxSkew 定义最大不均匀度</li>
          <li>DoNotSchedule（硬约束）vs ScheduleAnyway（软约束）</li>
          <li>支持滚动升级时的不平衡</li>
        </ul>
      </ContentSection>

      <ContentSection title="污点和容忍度" variant="accent">
        <p className="mb-4">
          污点（Taints）用于节点排斥 Pod，而容忍度（Tolerations）用于 Pod 容忍匹配的污点。
          通过这种机制可以实现专用节点，例如将某些节点保留给特定工作负载使用。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "Taints are used by nodes to repel Pods, while tolerations are used by Pods to tolerate matching taints. 
            This mechanism enables dedicated nodes, such as reserving certain nodes for specific workloads."
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg mb-6">
          <p className="mb-2"><strong>污点和容忍度配置示例：</strong></p>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
            {`# 节点污点
spec:
  taints:
  - key: "dedicated"
    value: "special"
    effect: "NoSchedule"

# Pod 容忍度
spec:
  tolerations:
  - key: "dedicated"
    operator: "Equal"
    value: "special"
    effect: "NoSchedule"`}
          </pre>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>污点：节点排斥 Pod</li>
          <li>容忍度：Pod 容忍匹配污点</li>
          <li>实现专用节点</li>
          <li>三种效果：NoSchedule, PreferNoSchedule, NoExecute</li>
        </ul>
      </ContentSection>

      <ContentSection title="最佳实践" variant="secondary">
        <p className="mb-4">
          在使用自动化放置模式时，有一些最佳实践可以提高应用的可靠性和资源利用率。
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="italic">
            "Placement is the art of assigning Pods to nodes with minimal human intervention. Avoid over-constraining 
            workloads. Use the descheduler for defragmentation and rebalancing. Fine-tune resource requests and limits 
            based on actual usage patterns."
          </p>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>最小化人工干预的艺术</li>
          <li>避免过度约束工作负载</li>
          <li>使用 descheduler 进行碎片整理和重新平衡</li>
          <li>根据实际使用模式微调资源请求和限制</li>
        </ul>
      </ContentSection>

      <ContentSection title="总结" variant="primary">
        <p className="mb-4">
          自动化放置模式优化了集群资源利用，通过智能调度算法和丰富的约束机制实现应用的高可用性和性能。
          理解节点资源、容器需求、调度过程和高级特性有助于更好地设计云原生应用。
        </p>
        
        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg mb-6">
          <p className="italic">
            "The Automated Placement pattern optimizes cluster resource utilization through intelligent scheduling 
            algorithms and rich constraint mechanisms to achieve application high availability and performance. 
            Understanding node resources, container demands, scheduling processes, and advanced features helps 
            design better cloud-native applications."
          </p>
        </div>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>优化集群资源利用</li>
          <li>实现应用高可用性和性能</li>
          <li>理解核心概念和高级特性</li>
          <li>参考 k8spatterns.io 获取更多信息</li>
        </ul>
      </ContentSection>
    </div>
  );
}