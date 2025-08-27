# Editor Linting Setup

This document explains how to set up linting for the educational documentation template in various editors.

## Visual Studio Code (Recommended)

VS Code has built-in support for our linting setup:

1. Install the recommended extensions:
   - `davidanson.vscode-markdownlint` - Markdown linting
   - `redhat.vscode-yaml` - YAML validation and autocompletion

2. The `.vscode/settings.json` file already configures:
   - Markdown linting with our custom rules
   - YAML schema validation for frontmatter
   - Auto-formatting on save

3. Real-time frontmatter linting:
   - Field naming conventions (snake_case) are validated as you type
   - Schema validation happens in real-time
   - Errors appear as you type with underlines in the editor

4. To install the pre-commit hook for automatic validation:

   ```bash
   npm run setup-hooks
   ```

## Other Editors

### Vim/Neovim

1. Install the following plugins:
   - `dense-analysis/ale` - Asynchronous linting engine
   - `plasticboy/vim-markdown` - Markdown support
   - `stephpy/vim-yaml` - YAML support

2. Add to your `.vimrc`:

   ```vim
   " Enable ALE for markdown and yaml files
   let g:ale_linters = {
   \   'markdown': ['markdownlint'],
   \   'yaml': ['yamllint'],
   \}
   
   " Configure markdownlint
   let g:ale_markdown_markdownlint_options = '--config .markdownlint.json'
   ```

### Sublime Text

1. Install the following packages via Package Control:
   - `SublimeLinter`
   - `SublimeLinter-contrib-markdownlint`
   - `YAMLLint`

2. Configure SublimeLinter in `Preferences > Package Settings > SublimeLinter > Settings`:

   ```json
   {
     "linters": {
       "markdownlint": {
         "args": ["--config", ".markdownlint.json"]
       }
     }
   }
   ```

### Atom

1. Install the following packages:
   - `linter`
   - `linter-markdownlint`
   - `linter-yaml`

2. Configure linter-markdownlint in its settings to use `.markdownlint.json`

## Command Line Validation

Regardless of your editor, you can always validate your documents from the command line:

```bash
# Run linting checks
npm run lint

# Automatically fix some issues
npm run lint:fix

# Validate document dependencies
npm run validate
```

## Pre-commit Hook

To ensure all documents are valid before committing:

```bash
# Install the pre-commit hook
npm run setup-hooks
```

This will run validation and linting before each commit and prevent committing invalid documents.
