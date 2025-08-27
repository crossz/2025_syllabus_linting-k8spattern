#!/bin/bash
# Pre-commit hook to validate educational documents

echo "Running educational documents validation..."

# Run the validation script
npm run validate

# Check the exit code
if [ $? -ne 0 ]; then
  echo "Validation failed. Please fix the issues before committing."
  exit 1
fi

# Run custom linting
npm run lint

# Check the exit code
if [ $? -ne 0 ]; then
  echo "Linting failed. Please fix the issues before committing."
  exit 1
fi

echo "All validations passed. Committing changes."
exit 0