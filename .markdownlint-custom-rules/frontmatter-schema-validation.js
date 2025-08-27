// Custom markdownlint rule to validate frontmatter against JSON schemas
// Rule tag: frontmatter-schema-validation
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

// Initialize AJV
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Load schemas
const schemasDir = path.join(__dirname, '..', 'schemas');
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

module.exports = {
  names: ["frontmatter-schema-validation"],
  description: "Frontmatter must conform to the defined JSON schema",
  tags: ["frontmatter", "schema"],
  function: function rule(params, onError) {
    const frontmatter = params.frontMatterLines;
    const fileName = params.name;
    
    if (!frontmatter || frontmatter.length === 0) {
      return;
    }
    
    // Get the document filename
    const docFileName = fileName.split('/').pop().split('\\').pop();
    
    // Check if we have a validator for this file
    const validator = validators[docFileName];
    if (!validator) {
      return;
    }
    
    try {
      // Join frontmatter lines and parse YAML
      const yamlContent = frontmatter.slice(1, -1).join('\n'); // Remove --- delimiters
      const data = yaml.load(yamlContent);
      
      // Validate against schema
      if (!validator(data)) {
        validator.errors.forEach(error => {
          onError({
            lineNumber: 1, // Point to beginning of frontmatter
            detail: `Schema validation error: ${error.instancePath || 'root'} ${error.message}`,
            context: 'Frontmatter validation error'
          });
        });
      }
    } catch (e) {
      // Find the line where the YAML error occurred
      let errorLine = 1;
      const errorMessage = e.message;
      const lineMatch = errorMessage.match(/line (\d+):/);
      if (lineMatch) {
        // The line number in the error is relative to the YAML content
        // We need to convert it to the line number in the whole file
        errorLine = parseInt(lineMatch[1]) + 1; // +1 for the opening ---
      }
            
      onError({
        lineNumber: errorLine,
        detail: `Invalid YAML in frontmatter: ${e.message}`,
        context: 'YAML parsing error'
      });
    }
  }
};