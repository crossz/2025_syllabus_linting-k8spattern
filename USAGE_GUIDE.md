# 使用指南 - Educational Documentation Template

这个模板为教育文档的创建提供了一个标准化的框架，确保所有文档的一致性和质量。

## 初始化项目

1. 点击 "Use this template" 按钮创建新项目
2. 克隆项目到本地环境
3. 安装依赖: `npm install`

## 文件结构

```
educational_docs/
├── 01-talent-development-plan.md    # 人才培养方案
├── 02-course-syllabi.md             # 课程教学大纲
└── 03-teaching-schedule.md          # 教学进度表
```

## 编写顺序

按照以下顺序编写文档以确保一致性：

1. **01-talent-development-plan.md** - 首先完成人才培养方案，定义毕业要求
2. **02-course-syllabi.md** - 基于毕业要求制定课程教学大纲
3. **03-teaching-schedule.md** - 根据教学大纲制定详细的教学进度表

## Frontmatter 使用指南

每个文档都包含 YAML 格式的 frontmatter，用于标准化内容结构：

### 01-talent-development-plan.md

- `program_name`: 专业名称
- `program_code`: 专业代码
- `department`: 所属院系
- `degree_level`: 学位层次 (本科/硕士/博士)
- `academic_year`: 适用学年
- `graduation_requirements`: 毕业要求列表
- `alignment_with_14th_five_year_plan`: 与十四五规划的对接
- `ai_plus_integration`: 与人工智能+的结合
- `formulation_basis`: 制定依据
- `evaluation_mechanism`: 评估机制

### 02-course-syllabi.md

- `course_code`: 课程代码
- `course_name`: 课程名称
- `credits`: 学分
- `total_hours`: 总学时
- `lecture_hours`: 理论学时
- `lab_hours`: 实验/实践学时
- `prerequisites`: 先修课程
- `course_type`: 课程性质 (必修/选修)
- `target_program`: 面向专业
- `course_objectives`: 课程教学目标
- `course_content`: 课程教学内容
- `teaching_methods`: 教学方法
- `assessment_methods`: 考核方式
- `textbooks`: 教材及参考书目
- `ai_integration`: 与人工智能+的结合

### 03-teaching-schedule.md

- `course_name`: 课程名称
- `course_code`: 课程代码
- `instructor`: 任课教师
- `semester`: 学期
- `total_weeks`: 总周数
- `teaching_schedule`: 教学进度安排
- `course_projects`: 课程项目安排
- `exams`: 考试安排
- `ai_integration_schedule`: 与人工智能+的结合进度

## Linting 规则

项目包含自动化检查规则，确保文档质量和一致性：

- 运行 `npm run lint` 检查文档格式
- 运行 `npm run lint:fix` 自动修复部分问题

详细的 linting 规则请参考 [LINTING_RULES.md](LINTING_RULES.md)

## 与十四五规划和人工智能+的结合

所有文档都必须明确体现：

1. 与国家十四五教育规划的对接
2. 人工智能技术在教育中的应用
3. 创新教学方法的实施