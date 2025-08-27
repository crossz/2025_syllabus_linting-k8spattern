---
title: Test Document
author_name: Test Author
created_date: 2023-01-01
# This is a valid field following snake_case

invalidField: This should trigger a lint error  # Invalid casing
another-invalid-field: This should also trigger an error  # Invalid characters
camelCaseField: This is also wrong  # Camel case instead of snake case

nested_object:
  valid_field: This is fine
  invalidField: This should trigger an error in nested objects too
---