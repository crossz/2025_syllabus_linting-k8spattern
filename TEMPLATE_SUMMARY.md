# Educational Documentation Template - Summary

This project provides a GitHub template for creating standardized educational documentation with the following components:

## Template Structure

```
├── educational_docs/
│   ├── 01-talent-development-plan.md    # 人才培养方案 - 毕业要求
│   ├── 02-course-syllabi.md             # 课程教学大纲 - 教学目标、内容
│   └── 03-teaching-schedule.md          # 教学进度表 - 详细时间安排
├── schemas/
│   ├── talent-development-plan.schema.json
│   ├── course-syllabi.schema.json
│   └── teaching-schedule.schema.json
├── .github/
│   └── ISSUE_TEMPLATE/
│       ├── talent-development-plan.md
│       ├── course-syllabus.md
│       └── teaching-schedule.md
├── .vscode/
│   ├── settings.json
│   └── extensions.json
├── scripts/
│   ├── pre-commit.sh
│   └── setup-hooks.sh
├── .gitignore                         # Git ignore file
├── .markdownlint.json                 # Markdown linting configuration
├── FORMATTING_RULES.md                # Centralized formatting rules
├── custom-lint.js                     # Custom linting script that parses and uses FORMATTING_RULES.md and schema validation
├── package.json                       # Project dependencies and scripts
├── README.md                          # Project documentation
├── USAGE_GUIDE.md                     # Usage guide
└── validate-docs.js                   # Document dependency validation script
```

## Key Features

1. **Structured Documentation**: Each document uses YAML frontmatter for standardized content
2. **Dependency Management**: Documents are ordered based on their dependencies (talent plan → syllabi → schedule)
3. **Centralized Formatting Rules**: All linting functions follow the rules in `FORMATTING_RULES.md` exclusively
4. **Custom Linting**: Node.js script (`custom-lint.js`) that parses and implements all formatting rules from FORMATTING_RULES.md
5. **Schema Validation**: JSON schemas for comprehensive validation in editors and via npm script
6. **Editor Integration**: Pre-configured settings for VS Code with recommended extensions
7. **Pre-commit Validation**: Scripts to validate documents before committing
8. **AI+ Integration**: All documents include fields for AI+ education integration
9. **14th Five-Year Plan Alignment**: Explicit fields for aligning with national education policies

## Writing Order

1. **Talent Development Plan (01)**: Establishes program objectives and graduate requirements
2. **Course Syllabi (02)**: Developed based on graduate requirements
3. **Teaching Schedule (03)**: Derived from course syllabi

## Scripts

- `npm run lint`: Run custom linting that parses and follows rules from FORMATTING_RULES.md exclusively and validates schemas
- `npm run lint:markdown`: Run markdownlint with standard rules (only on actual educational documents)
- `npm run lint:fix`: Automatically fix some formatting issues with markdownlint (only on actual educational documents)
- `npm run validate`: Validate document dependencies
- `npm run setup-hooks`: Install pre-commit validation hook

This template helps ensure consistency across educational documentation while providing flexibility for different programs and courses.