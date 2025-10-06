export function Slide13() {
  return (
    <div className="slide-container">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">Readiness Probes - 配置示例</h1>
      <div className="mb-8">
        <p className="text-gray-700 dark:text-gray-300 mb-4">YAML 示例:</p>
        <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4 overflow-x-auto">
{`apiVersion: v1
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
      periodSeconds: 5`}
        </pre>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">关键点:</h2>
        <ul className="list-disc pl-8 text-gray-700 dark:text-gray-300">
          <li>检查 /ready 端点</li>
        </ul>
      </div>
    </div>
  );
}