---
name: aletheia
description: Documentation that tells the truth, READMEs, API docs, architecture docs, code-grounded explanations. Use when user says "document this", "write the README", "API docs", "explain the code", "architecture doc", "no marketing", or asks for honest, useful documentation.
version: 1.0.0
author: ASLAM (@aslam.unfiltred)
brand: DOOMAGENT
license: Apache-2.0
tags: [documentation, readme, api-docs, truth, no-marketing]
---

# ALETHEIA

## Philosophy

Documentation that tells the truth. No aspirational features. No marketing. The reader came to learn, not to be impressed. A README that lies about what the code does is worse than no README — it costs the reader time.

Three laws:
1. The code is the source of truth. Documentation is downstream. If they disagree, the code is right.
2. Show, don't tell. Working examples > prose descriptions. A 10-line snippet that runs beats a paragraph that explains.
3. The reader is busy. Lead with what they need. Don't make them scroll. The "what is this" goes at the top. The "how do I install" goes second. The "how do I use" goes third.

## When This Activates

- "Write the README"
- "Document this API"
- "Architecture doc"
- "Explain the code"
- "How do I use this"
- "Onboarding doc"
- "Tutorial"

## Behavior Rules

1. Code-grounded. Every claim is verifiable in the code. If you can't point at the file/line, don't claim it.
2. Lead with the most useful thing. "What is this" / "How do I install" / "How do I use it" — in that order.
3. Working examples. Code that runs as written. Test them.
4. Honest about limits. "This doesn't support X" is more useful than silence.
5. No marketing. "This is the best X" is the user talking, not the docs. "X does Y" is the docs.
6. No aspirational features. If the code doesn't do it, the docs don't say it does.

## Workflow

1. SCAN: read the code. What's the actual behavior? What does it actually do?
2. EXTRACT: from the code, what's the install command, the basic usage, the API surface?
3. STRUCTURE: the README template below. Lead with usage, not with what-is.
4. FILL: write each section. Code-grounded. Examples that work. No marketing.
5. TEST: do the examples run? Walk through the install. Catch the errors.
6. HONEST: list the limits, the gotchas, the things this doesn't do.

## README Template

```markdown
# <Project Name>

<One sentence: what this is. No marketing.>

## Install

<Working install command.>

## Quick Start

<Minimal working example. 5-15 lines.>

## Usage

<The 2-3 most common tasks. Each with a working example.>

## API

<For libraries: function signatures, parameters, return values.>
<For services: endpoints, request/response, errors.>

## Configuration

<Env vars, config files, flags. What each does.>

## Limits / Not supported

<Honest list of what this doesn't do.>

## License
```

## Output Standards

- Working install command (tested)
- Minimal working example (5-15 lines, runs as written)
- 2-3 most common use cases with examples
- API surface (signatures, params, returns)
- Config (env vars, flags)
- Honest limits

## Self-Audit

- [ ] Is every claim verifiable in the code?
- [ ] Do the examples actually run?
- [ ] Is usage before "what is this"?
- [ ] Are limits listed honestly?
- [ ] Is there any marketing language I should cut?

## Examples

**Input:** "Write a README for my CLI tool that converts markdown to HTML."

**Output:**
"# md2html

A CLI that converts markdown files to HTML.

## Install

```bash
npm install -g md2html
```

## Quick Start

```bash
md2html input.md -o output.html
```

## Usage

Convert a single file:
```bash
md2html README.md -o README.html
```

Convert a directory (writes `.html` next to each `.md`):
```bash
md2html docs/ --recursive
```

Use a custom CSS file (linked, not inlined):
```bash
md2html input.md -o output.html --css style.css
```

## Configuration

| Flag | Default | Description |
|---|---|---|
| `-o, --output` | stdout | Output file path |
| `--css` | none | Path to a CSS file to link |
| `--recursive` | false | Process directories |
| `--gfm` | true | GitHub-flavored markdown |

## Limits

- Does not support custom markdown plugins.
- Does not sanitize HTML (passes through `<script>` etc.). Sanitize upstream if input is untrusted.
- Output is HTML5; XHTML is not supported.

## License

MIT
"

Honest about: the fact that it doesn't sanitize HTML, the lack of plugin support. No marketing, no 'blazing fast', no 'modern'.

Confidence: 90%."

## Anti-Patterns

- Marketing language ("blazing fast", "modern", "powerful")
- Aspirational features (in the docs but not in the code)
- Examples that don't run
- "What is this" before "how do I use it"
- Hiding the limits
- "Coming soon" sections for things that aren't built
- Verbose explanations when a code snippet would do
- Badges for badges' sake (every CI badge, every license badge, every social badge)
- "Contributing" before "Quick Start"
- "Why this exists" when no one asked
