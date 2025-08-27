---
# 基本信息表格

course_name: "大模型应用开发"
course_code: "H010600430"
lab_session_type: "课内实践"
course_teacher: "郑欣"
course_owner: "郑欣"

## 一、学时

course_total_hours: 32
lab_session_hours: 16


graduation_requirements:
- requirement_id: "GR01"
    description: "掌握云计算的基础理论和关键技术，包括虚拟化、容器化、分布式系统等"
    related_courses:
  - "CS001"
  - "CS002"
  - "CS003"
    assessment_methods:
  - "考试"
  - "作业"
  - "实验报告"
- requirement_id: "GR02"
    description: "能够基于Kubernetes等容器编排平台，实现应用的部署、管理和监控"
    related_courses:
  - "CS001"
  - "CS004"  # 修复：将CS007改为CS004，确保在允许的课程代码范围内
    assessment_methods:
  - "编程项目"
  - "考试"
- requirement_id: "GR03"
    description: "能够基于Docker等容器技术，实现应用的打包、部署和运行"
    related_courses:
  - "CS001"
  - "CS002"
    assessment_methods:
  - "项目展示"
  - "论文"

---
# 《云计算》实验教学大纲

## 一、课程基本信息

- **课程名称**：云计算容器编排与应用部署  
- **实验学时**：8学时  
- **开课学期**：2025年秋季学期  


## 二、实验教学目的与基本要求

1. 掌握Kubernetes核心模式在真实项目中的应用  
2. 培养容器化改造、声明式部署和自动化运维能力  
3. 实践云原生应用的开发-部署-监控全流程  
4. 培养团队协作和GitHub工作流实践能力  

## 三、实验教学主要内容及学时分配

| 序号 | 实验项目名称 | 学时分配 | 实验内容及目的 | 实验方式 | 实验类型 |
| ---- | ------------ | -------- | -------------- | -------- | -------- |
| 1 | 基础模式实现 | 2 | 学习将选定系统容器化（Dockerfile编写）、实现资源需求声明（CPU/Memory requests/limits）、建立基础Deployment和Service（不含探针配置），掌握Kubernetes基础部署模式 | 实践操作 | 基础验证 |
| 2 | 生命周期与调度 | 2 | 学习配置健康检查探针（Liveness/Readiness）、实现PreStop钩子优雅终止、添加Init Container初始化逻辑（可选）、应用至少两种调度策略并进行比对分析，掌握Kubernetes资源生命周期管理与调度机制 | 实践操作 | 综合设计 |
| 3 | 高级服务模式 | 2 | 学习搭建kubernetes容器集群（k3d等方案）、配置节点亲和性/反亲和性规则、实现无状态服务水平扩展、部署有状态服务（StatefulSet）、实现服务发现机制与DNS配置、管理配置与密钥（ConfigMap/Secret）（可选），掌握Kubernetes高级服务部署模式 | 实践操作 | 综合设计 |
| 4 | 公有云上kubernetes集群实战（华为云CCE） | 2 | 在华为云平台中通过云容器引擎CCE创建kubernetes集群、完成华为云"轻松玩转Kubernetes"手册中制定的任务、部署教程既定的（Nginx）之外的本组项目，掌握公有云环境下Kubernetes集群的创建与应用部署 | 实践操作 | 综合实践 |


## 四、考核方式

| 项目          | 占比 | 评分标准                          |
|---------------|------|-----------------------------------|
| 实验PR质量    | 40%  | 模式实现完整性、YAML规范性        |
| GitHub协作    | 20%  | PR流程、Commit规范、文档质量      |
| 技术文档规范      | 30%  | 专业规范性、系统完整性、创新性、演示呈现效果      |
| 压力测试表现      | 10%  | 项目交付能力        |


## 五、实验教科书、参考书
- 主教材：《Kubernetes Patterns, 2nd Edition》  
- 辅助资源：  
  - Kubernetes官方文档  
  - GitHub Classroom模板仓库  
  - 参考项目：`k8s-patterns/sample-apps`


---

# 云计算容器编排与应用部署实验内容
