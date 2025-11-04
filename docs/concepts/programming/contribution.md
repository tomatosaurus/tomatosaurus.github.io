---
id: contribute
sidebar_position: 1
---

# Contributing

logicbaron is seeking collaborators who can assist with adding documents related to machine learning and mathematics, as well as coding and translation.

logicbaron is built based on [Docusaurus](https://docusaurus.io/)

## Commit Message

See how a minor change to your commit message style can make you a better programmer.

Format: `<type>(<scope>): <subject>`

`<scope>` is optional. If your change is specific to one/two packages, consider adding the scope. Scopes should be brief but recognizable, e.g. `content-docs`, `theme-classic`, `core`

The various types of commits:

- `feat`: a new API or behavior for the end user.<br/>
- `fix`: a bug fix for the end user.<br/>
- `docs`: a change to the website or other Markdown documents in our repo.<br/>
- `refactor`: a change to production code that leads to no behavior difference, e.g. splitting files, renaming internal variables, improving code style...<br/>
- `test`: adding missing tests, refactoring tests; no production code change.<br/>
- `chore`: upgrading dependencies, releasing new versions... Chores that are regularly done for maintenance purposes.<br/>
- `misc`: anything else that doesn't change production code, yet is not test or chore. e.g. updating GitHub actions workflow.

Do not get too stressed about PR titles, however. Your PR will be squash-merged and your commit to the main branch will get the title of your PR, so commits within a branch don't need to be semantically named. The maintainers will help you get the PR title right, and we also have a PR label system that doesn't equate with the commit message types. Your code is more important than conventions!

Example:
```
feat(core): allow overriding of webpack config
^--^^----^  ^------------^
|   |       |
|   |       +-> Summary in present tense. Use lower case not title case!
|   |
|   +-> The package(s) that this change affected.
|
+-------> Type: see above for the list we use.
```