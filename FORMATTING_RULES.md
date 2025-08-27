# Educational Documentation Formatting Rules

This file defines all formatting rules for the educational documentation template. All linting functions must follow these rules exclusively.

## General Document Structure

1. All documents must use UTF-8 encoding
2. Line endings must be LF (Unix-style)
3. Files must end with a single newline character
4. No trailing whitespace at the end of lines
5. Indentation must be 2 spaces (no tabs)
6. Maximum line length: 100 characters

## YAML Frontmatter Rules

1. Frontmatter must be enclosed in `---` markers
2. Frontmatter must be at the beginning of the file
3. All required fields must be present and non-empty
4. Field names must use snake_case
5. Field values must match specified types and formats
6. Arrays must be formatted with each item on a new line when containing objects
7. Comments in frontmatter must be in Chinese and English (Chinese first)

## Document Naming Convention

1. Files must be named with a two-digit number prefix followed by a hyphen and descriptive name
2. File names must use kebab-case
3. File extension must be `.md`
4. Order of files:
   - 01-talent-development-plan.md
   - 02-course-syllabi.md
   - 03-teaching-schedule.md

## Markdown Content Rules

1. Headers must use `#` notation (ATX headers)
2. Only H1 and H2 headers are allowed in content (H1 for main title, H2 for sections)
3. No inline HTML except for comments
4. Lists must be indented consistently
5. Code blocks must specify language when applicable
6. Links must have descriptive anchor text
7. Images must include descriptive alt text

## Chinese-English Bilingual Format

1. All headers must be bilingual (Chinese first, then English in parentheses)
2. Field names in frontmatter must be bilingual (Chinese comment first, then English)
3. All user-facing text must be bilingual when appropriate

## Field-Specific Formatting Rules

### Talent Development Plan (01-talent-development-plan.md)

1. Program code format: 4 alphanumeric characters
2. Degree level must be one of: 本科, 硕士, 博士
3. Academic year format: XXXX-XXXX (e.g., 2024-2025)
4. Requirement IDs must follow format: GRXX (e.g., GR01)
5. Assessment methods must be descriptive strings

### Course Syllabi (02-course-syllabi.md)

1. Course code format: 4 alphanumeric characters
2. Course type must be one of: 必修, 选修
3. Objective IDs must follow format: COXX (e.g., CO01)
4. Chapter numbers must be positive integers
5. Hours must be non-negative numbers

### Teaching Schedule (03-teaching-schedule.md)

1. Semester format: XXXX年X季学期 (e.g., 2024年秋季学期)
2. Date format: YYYY-MM-DD
3. Week numbers must be positive integers
4. Teaching methods must be descriptive strings

## Consistency Rules

1. Course names must be consistent across all documents
2. Course codes must be consistent across all documents
3. Program names must be consistent across all documents
4. Program codes must be consistent across all documents
5. Graduate requirement IDs must be consistent between talent plan and course syllabi

## AI+ Integration Rules

1. All documents must include AI integration fields
2. AI tools/platforms must be specifically named
3. AI application scenarios must be described in detail
4. AI ethics considerations must be addressed

## 14th Five-Year Plan Alignment Rules

1. All documents must include alignment fields
2. Alignment must be specific and actionable
3. Connection to national education goals must be explicit
