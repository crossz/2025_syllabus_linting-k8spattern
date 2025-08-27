# Educational Documentation Template

This template provides a structured approach to creating educational documentation including:
- Talent Development Plan (人才培养方案)
- Course Syllabi (课程教学大纲)
- Teaching Schedule (教学进度表)

## Document Dependencies

Based on educational best practices and the "14th Five-Year Plan" and "AI+" educational guidelines, the following dependencies exist:

1. **Talent Development Plan (人才培养方案)** - Foundation document
   - Defines overall program objectives and graduate requirements
   - Informs all subsequent course development

2. **Course Syllabi (课程教学大纲)** - Dependent on #1
   - Developed based on graduate requirements from talent plan
   - Defines specific course objectives and content

3. **Teaching Schedule (教学进度表)** - Dependent on #2
   - Derived from course syllabi
   - Provides detailed timeline for content delivery

## File Structure

```
educational_docs/
├── 01-talent-development-plan.md    # 人才培养方案 - 毕业要求
├── 02-course-syllabi.md             # 课程教学大纲 - 教学目标、内容
└── 03-teaching-schedule.md          # 教学进度表 - 详细时间安排
```

Each file uses frontmatter to standardize content and follows strict formatting rules.

## Setup

1. Click "Use this template" to create a new repository
2. Clone the repository to your local environment
3. Install dependencies: `npm install`

## Editor Linting Setup

This template includes comprehensive linting support for various editors:

### Visual Studio Code (Recommended)

1. Install the recommended extensions:
   - `davidanson.vscode-markdownlint` - Markdown linting
   - `redhat.vscode-yaml` - YAML validation and autocompletion
   - `streetsidesoftware.code-spell-checker` - Spell checking

2. The `.vscode/settings.json` file already configures:
   - Markdown linting with our custom rules
   - YAML schema validation for frontmatter
   - Auto-formatting on save
   - Snake_case naming validation for frontmatter fields

3. To install the pre-commit hook for automatic validation:
   ```bash
   npm run setup-hooks
   ```

4. Real-time validation features:
   - Field names in frontmatter are validated for snake_case compliance
   - Schema validation is performed based on document type
   - Errors appear directly in the editor as you type

For detailed setup instructions for other editors, see [EDITOR_SETUP.md](EDITOR_SETUP.md)

## Centralized Formatting Rules

All linting functions in this template follow the rules defined exclusively in [FORMATTING_RULES.md](FORMATTING_RULES.md). This file contains all formatting requirements for:

1. General document structure
2. YAML frontmatter rules
3. Document naming conventions
4. Markdown content rules
5. Bilingual format requirements
6. Field-specific formatting rules
7. Consistency rules across documents
8. AI+ integration rules
9. 14th Five-Year Plan alignment rules

## Usage

1. Follow the writing order as specified above
2. Fill in the frontmatter fields in each document
3. Run `npm run lint` to check document formatting (follows FORMATTING_RULES.md exclusively)
4. Run `npm run lint:markdown` to check with standard markdownlint rules (only on actual educational documents)
5. Run `npm run lint:fix` to automatically fix some issues (only on actual educational documents)
6. Run `npm run validate` to check document dependencies

For detailed usage instructions, see [USAGE_GUIDE.md](USAGE_GUIDE.md)

## Features

- Standardized document structure using YAML frontmatter
- Centralized formatting rules in FORMATTING_RULES.md
- Custom linting that follows these rules exclusively
- Schema validation for real-time error checking
- Issue templates for creating new documents
- Integration with 14th Five-Year Plan and AI+ educational guidelines
- Guidance for aligning documents with each other
- Real-time linting in editors
- Pre-commit validation hooks