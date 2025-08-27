#!/bin/bash
# Setup script to install pre-commit hook

echo "Setting up pre-commit hook for educational documents validation..."

# Create the hooks directory if it doesn't exist
if [ ! -d ".git/hooks" ]; then
  mkdir -p .git/hooks
fi

# Copy the pre-commit script to the hooks directory
cp scripts/pre-commit.sh .git/hooks/pre-commit

# Make it executable
chmod +x .git/hooks/pre-commit

echo "Pre-commit hook installed successfully!"
echo "Documents will now be validated before each commit."