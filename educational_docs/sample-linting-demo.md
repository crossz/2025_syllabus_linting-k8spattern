---
# This is a sample file to demonstrate linting rules

# Correct snake_case fields
document_title: Sample Document
author_name: Test Author
created_date: 2023-01-01
version_number: 1

# Incorrect fields that should trigger lint errors
documentTitle: This violates snake_case rule  # Should error
author-name: This also violates the rule      # Should error
nested_object:
  valid_field: This is fine
  camelCaseField: This should trigger an error  # Should error in nested objects too

# Schema validation will also check for required fields based on document type
---