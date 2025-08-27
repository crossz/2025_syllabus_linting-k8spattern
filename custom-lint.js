#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const Ajv = require('ajv');
const addFormats = require("ajv-formats");

// Initialize AJV for schema validation
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Custom linting script that follows FORMATTING_RULES.md exclusively
console.log('Running custom educational document linting...');

const docsDir = path.join(__dirname, 'educational_docs');
const schemasDir = path.join(__dirname, 'schemas');
const docFiles = [
  '01-talent-development-plan.md',
  '02-course-syllabi.md',
  '03-teaching-schedule.md'
];

// Load and parse formatting rules from FORMATTING_RULES.md
const formattingRulesContent = fs.readFileSync(path.join(__dirname, 'FORMATTING_RULES.md'), 'utf8');
console.log('Loaded and parsed formatting rules from FORMATTING_RULES.md');

// Parse the rules into structured data
function parseRules(content) {
  const rules = {};
  const lines = content.split('\n');
  let currentSection = '';

  for (const line of lines) {
    // Detect section headers (## format)
    const sectionMatch = line.match(/^##\s+(.+)$/);
    if (sectionMatch) {
      currentSection = sectionMatch[1].trim();
      rules[currentSection] = [];
      continue;
    }

    // Collect rule items (numbered lists)
    const ruleMatch = line.match(/^\d+\.\s+(.+)$/);
    if (ruleMatch && currentSection) {
      rules[currentSection].push(ruleMatch[1].trim());
    }
  }

  return rules;
}

const formattingRules = parseRules(formattingRulesContent);

// Load schemas
const schemas = {
  '01-talent-development-plan.md': JSON.parse(fs.readFileSync(path.join(schemasDir, 'talent-development-plan.schema.json'), 'utf8')),
  '02-course-syllabi.md': JSON.parse(fs.readFileSync(path.join(schemasDir, 'course-syllabi.schema.json'), 'utf8')),
  '03-teaching-schedule.md': JSON.parse(fs.readFileSync(path.join(schemasDir, 'teaching-schedule.schema.json'), 'utf8'))
};

// Compile schemas
const validators = {
  '01-talent-development-plan.md': ajv.compile(schemas['01-talent-development-plan.md']),
  '02-course-syllabi.md': ajv.compile(schemas['02-course-syllabi.md']),
  '03-teaching-schedule.md': ajv.compile(schemas['03-teaching-schedule.md'])
};

// Function to extract frontmatter
function extractFrontmatter(content) {
  // Match content between --- markers, but exclude comment lines
  const lines = content.split('\n');
  let inFrontmatter = false;
  let frontmatterLines = [];

  for (const line of lines) {
    if (line.trim() === '---') {
      if (!inFrontmatter) {
        inFrontmatter = true;
        continue;
      } else {
        break;
      }
    }

    if (inFrontmatter && !line.trim().startsWith('#')) {
      frontmatterLines.push(line);
    }
  }

  return frontmatterLines.join('\n');
}

// Extract data from all documents for cross-document consistency checks
function extractDocumentData() {
  const documentData = {};

  for (const file of docFiles) {
    const filePath = path.join(docsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatter = extractFrontmatter(content);

    try {
      const data = yaml.load(frontmatter);
      documentData[file] = data;
    } catch (e) {
      documentData[file] = null;
    }
  }

  return documentData;
}

// Check general document structure rules from FORMATTING_RULES.md
function checkDocumentStructure(filePath, content) {
  const errors = [];
  const generalRules = formattingRules['General Document Structure'] || [];

  // Check line endings
  if (content.includes('\r\n') && generalRules.includes('Line endings must be LF (Unix-style)')) {
    errors.push('Line endings must be LF (Unix-style), not CRLF');
  }

  // Check for trailing newline
  if (!content.endsWith('\n') && generalRules.includes('Files must end with a single newline character')) {
    errors.push('File must end with a single newline character');
  }

  // Check for trailing whitespace
  const lines = content.split('\n');
  if (generalRules.includes('No trailing whitespace at the end of lines')) {
    lines.forEach((line, index) => {
      if (line !== line.trimEnd()) {
        errors.push(`Line ${index + 1} has trailing whitespace`);
      }
    });
  }

  // Check line length
  if (generalRules.includes('Maximum line length: 100 characters')) {
    lines.forEach((line, index) => {
      if (line.length > 100) {
        errors.push(`Line ${index + 1} exceeds 100 characters`);
      }
    });
  }

  // Check indentation
  if (generalRules.includes('Indentation must be 2 spaces (no tabs)')) {
    lines.forEach((line, index) => {
      const leadingWhitespace = line.match(/^\s*/)[0];
      if (leadingWhitespace.includes('\t')) {
        errors.push(`Line ${index + 1} contains tabs instead of spaces for indentation`);
      }
      if (leadingWhitespace.length % 2 !== 0 && leadingWhitespace.length > 0) {
        errors.push(`Line ${index + 1} has inconsistent indentation (must be multiple of 2 spaces)`);
      }
    });
  }

  return errors;
}

// Check YAML frontmatter rules from FORMATTING_RULES.md
function checkYamlFrontmatter(filePath, frontmatter) {
  const errors = [];
  const yamlRules = formattingRules['YAML Frontmatter Rules'] || [];

  try {
    const data = yaml.load(frontmatter);

    // Check field names use snake_case
    if (yamlRules.includes('Field names must use snake_case')) {
      function checkSnakeCase(obj, path = '') {
        for (const [key, value] of Object.entries(obj)) {
          const currentPath = path ? `${path}.${key}` : key;
          if (!/^[a-z][a-z0-9_]*$/.test(key)) {
            errors.push(`Field name '${currentPath}' must use snake_case`);
          }

          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            checkSnakeCase(value, currentPath);
          } else if (Array.isArray(value)) {
            value.forEach((item, index) => {
              if (typeof item === 'object' && item !== null) {
                checkSnakeCase(item, `${currentPath}[${index}]`);
              }
            });
          }
        }
      }

      if (data) checkSnakeCase(data);
    }

  } catch (e) {
    errors.push(`Invalid YAML in frontmatter: ${e.message}`);
  }

  return errors;
}

// Check document naming convention from FORMATTING_RULES.md
function checkDocumentNaming(filePath) {
  const errors = [];
  const fileName = path.basename(filePath);
  const namingRules = formattingRules['Document Naming Convention'] || [];

  // Check file extension
  if (!fileName.endsWith('.md') && namingRules.includes('File extension must be .md')) {
    errors.push('File extension must be .md');
  }

  // Check naming pattern
  if (namingRules.includes('Files must be named with a two-digit number prefix followed by a hyphen and descriptive name')) {
    if (!/^\d{2}-[\w-]+\.md$/.test(fileName)) {
      errors.push('File name must follow pattern: ##-description.md');
    }
  }

  return errors;
}

// Check bilingual format rules from FORMATTING_RULES.md
function checkBilingualFormat(content) {
  const errors = [];
  const bilingualRules = formattingRules['Chinese-English Bilingual Format'] || [];

  // Check headers are bilingual
  if (bilingualRules.includes('All headers must be bilingual (Chinese first, then English in parentheses)')) {
    const headerMatches = content.match(/^##\s+(.+)$/gm);
    if (headerMatches) {
      for (const match of headerMatches) {
        const headerText = match.replace(/^##\s+/, '');
        if (!headerText.includes('(') || !headerText.includes(')')) {
          errors.push(`Header '${headerText}' must be bilingual (Chinese first, English in parentheses)`);
        }
      }
    }
  }

  return errors;
}

// Check schema validation
function checkSchemaValidation(filePath, frontmatter, fileName) {
  const errors = [];

  try {
    const data = yaml.load(frontmatter);
    const validator = validators[fileName];

    if (validator && !validator(data)) {
      validator.errors.forEach(error => {
        errors.push(`Schema validation error: ${error.instancePath} ${error.message}`);
      });
    }
  } catch (e) {
    errors.push(`Error during schema validation: ${e.message}`);
  }

  return errors;
}

// Check consistency rules from FORMATTING_RULES.md
function checkConsistency(documentData) {
  const errors = [];
  const consistencyRules = formattingRules['Consistency Rules'] || [];

  // Check course name consistency
  if (consistencyRules.includes('Course names must be consistent across all documents')) {
    const courseNames = [];

    // Extract course names from documents that have them
    if (documentData['02-course-syllabi.md'] && documentData['02-course-syllabi.md'].course_name) {
      courseNames.push(documentData['02-course-syllabi.md'].course_name);
    }

    if (documentData['03-teaching-schedule.md'] && documentData['03-teaching-schedule.md'].course_name) {
      courseNames.push(documentData['03-teaching-schedule.md'].course_name);
    }

    // Check if all course names are the same
    if (courseNames.length > 1) {
      const firstName = courseNames[0];
      for (let i = 1; i < courseNames.length; i++) {
        if (courseNames[i] !== firstName) {
          errors.push(`Inconsistent course names found: "${firstName}" vs "${courseNames[i]}"`);
        }
      }
    }
  }

  // Check course code consistency
  if (consistencyRules.includes('Course codes must be consistent across all documents')) {
    const courseCodes = [];

    // Extract course codes from documents that have them
    if (documentData['02-course-syllabi.md'] && documentData['02-course-syllabi.md'].course_code) {
      courseCodes.push(documentData['02-course-syllabi.md'].course_code);
    }

    if (documentData['03-teaching-schedule.md'] && documentData['03-teaching-schedule.md'].course_code) {
      courseCodes.push(documentData['03-teaching-schedule.md'].course_code);
    }

    // Check if all course codes are the same
    if (courseCodes.length > 1) {
      const firstCode = courseCodes[0];
      for (let i = 1; i < courseCodes.length; i++) {
        if (courseCodes[i] !== firstCode) {
          errors.push(`Inconsistent course codes found: "${firstCode}" vs "${courseCodes[i]}"`);
        }
      }
    }
  }

  return errors;
}

// Main linting function
async function lintDocuments() {
  const allErrors = [];

  // Check if all files exist
  for (const file of docFiles) {
    const filePath = path.join(docsDir, file);
    if (!fs.existsSync(filePath)) {
      allErrors.push(`Missing required file: ${file}`);
    }
  }

  if (allErrors.length > 0) {
    console.error('Linting failed with the following errors:');
    allErrors.forEach(error => console.error(`- ${error}`));
    process.exit(1);
  }

  // Extract data from all documents for cross-document checks
  const documentData = extractDocumentData();

  // Process each document
  for (const file of docFiles) {
    const filePath = path.join(docsDir, file);
    console.log(`\nLinting ${file}...`);

    const content = fs.readFileSync(filePath, 'utf8');

    // Run all checks
    const structureErrors = checkDocumentStructure(filePath, content);
    const namingErrors = checkDocumentNaming(filePath);
    const bilingualErrors = checkBilingualFormat(content);

    const frontmatter = extractFrontmatter(content);
    const yamlErrors = frontmatter ? checkYamlFrontmatter(filePath, frontmatter) : ['No frontmatter found'];
    const schemaErrors = frontmatter ? checkSchemaValidation(filePath, frontmatter, file) : [];

    // Collect all errors for this file
    const fileErrors = [
      ...structureErrors,
      ...namingErrors,
      ...bilingualErrors,
      ...yamlErrors,
      ...schemaErrors
    ];

    if (fileErrors.length > 0) {
      console.log(`Found ${fileErrors.length} issues in ${file}:`);
      fileErrors.forEach(error => console.log(`  - ${error}`));
      allErrors.push(...fileErrors);
    } else {
      console.log(`✓ ${file} passed all checks`);
    }
  }

  // Run consistency checks across all documents
  const consistencyErrors = checkConsistency(documentData);
  if (consistencyErrors.length > 0) {
    console.log('\nFound consistency issues across documents:');
    consistencyErrors.forEach(error => console.log(`  - ${error}`));
    allErrors.push(...consistencyErrors);
  }

  // Report results
  if (allErrors.length > 0) {
    console.error('\nLinting failed with the above issues.');
    console.error('Please fix these issues according to FORMATTING_RULES.md');
    process.exit(1);
  } else {
    console.log('\n✓ All documents passed linting!');
    process.exit(0);
  }
}

// Run the linting
lintDocuments().catch(error => {
  console.error('Linting failed with an error:', error);
  process.exit(1);
});