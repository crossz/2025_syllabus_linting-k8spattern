// Custom markdownlint rule to check frontmatter field naming convention (snake_case)
// Rule tag: frontmatter-field-naming
module.exports = {
  names: ["frontmatter-field-naming"],
  description: "Frontmatter field names must use snake_case",
  tags: ["frontmatter", "naming"],
  function: function rule(params, onError) {
    const frontmatter = params.frontMatterLines;
    
    if (!frontmatter || frontmatter.length === 0) {
      return;
    }
    
    // Process each line of the frontmatter (including the --- delimiters)
    frontmatter.forEach((line, index) => {
      // Skip the delimiter lines
      if (line.trim() === '---') {
        return;
      }
      
      // Skip empty lines and comments
      if (line.trim() === '' || line.trim().startsWith('#')) {
        return;
      }
      
      // Match field names (text before the colon)
      const fieldMatch = line.match(/^(\s*)([a-zA-Z0-9_-]+):/);
      if (fieldMatch) {
        const fieldName = fieldMatch[2];
        // Check if field name follows snake_case convention
        if (!/^[a-z][a-z0-9_]*$/.test(fieldName)) {
          onError({
            lineNumber: index + 1, // 1-based indexing
            detail: `Field name '${fieldName}' must use snake_case`,
            context: line.trim()
          });
        }
      }
    });
  }
};