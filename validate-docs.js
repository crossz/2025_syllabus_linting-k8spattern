#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Validation script for educational documents
console.log('Validating educational documents...');

const docsDir = path.join(__dirname, 'educational_docs');
const docFiles = [
  '01-talent-development-plan.md',
  '02-course-syllabi.md',
  '03-teaching-schedule.md'
];

// Check if all files exist
for (const file of docFiles) {
  const filePath = path.join(docsDir, file);
  if (!fs.existsSync(filePath)) {
    console.error(`Missing required file: ${file}`);
    process.exit(1);
  }
}

console.log('All required files are present.');

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

// Load and parse documents
const documents = {};
for (const file of docFiles) {
  const filePath = path.join(docsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const frontmatter = extractFrontmatter(content);
  
  if (frontmatter) {
    try {
      documents[file] = yaml.load(frontmatter);
    } catch (e) {
      console.error(`Error parsing YAML in ${file}: ${e.message}`);
      process.exit(1);
    }
  } else {
    console.error(`No frontmatter found in ${file}`);
    process.exit(1);
  }
}

// Validate dependencies
console.log('Checking document dependencies...');

// Check that 02-course-syllabi.md references requirements from 01-talent-development-plan.md
const talentPlan = documents['01-talent-development-plan.md'];
const courseSyllabi = documents['02-course-syllabi.md'];

if (talentPlan && talentPlan.graduation_requirements && courseSyllabi && courseSyllabi.course_objectives) {
  const requirementIds = talentPlan.graduation_requirements.map(req => req.requirement_id);
  const referencedRequirements = new Set();
  
  for (const objective of courseSyllabi.course_objectives) {
    if (objective.aligned_graduation_requirements) {
      objective.aligned_graduation_requirements.forEach(id => referencedRequirements.add(id));
    }
  }
  
  for (const referencedId of referencedRequirements) {
    if (!requirementIds.includes(referencedId)) {
      console.error(`Course syllabus references unknown graduation requirement: ${referencedId}`);
      process.exit(1);
    }
  }
  
  console.log('✓ Course syllabus correctly references graduation requirements');
}

// Check that 03-teaching-schedule.md references course from 02-course-syllabi.md
const teachingSchedule = documents['03-teaching-schedule.md'];

if (courseSyllabi && courseSyllabi.course_name && teachingSchedule && teachingSchedule.course_name) {
  if (courseSyllabi.course_name !== teachingSchedule.course_name) {
    console.error('Teaching schedule course name does not match course syllabus');
    process.exit(1);
  }
  
  console.log('✓ Teaching schedule course name matches course syllabus');
}

console.log('All dependency checks passed!');