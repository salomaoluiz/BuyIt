# How to contribute

To contribute to this project create a fork of the project. First check issue section, if there is an issue already present about what you want to implement, or if it does not exist, create one, create a branch on that fork and make your desired changes, when you have made changes and code is working properly, perform a squash of commits and open a PR to dive into the main project.

Read this in other languages: [English](CONTRIBUTING.en.md), [Português](CONTRIBUTING.md)

# Minimum requirements for PR to be approved
If any of these requirements are not met, the PR will be immediately disapproved until corrections are made:
- Do not have any offensive or disrespectful content at any point, either in the commit text or in the project
- Automated tests for implementation
- CI successfully passing automated tests, lint and tsc
- Sonarqube successfully passing the quality gates
- Only 1 commit per PR
- Commit following the pattern "[#ISSUE_ID] Description of the commit", for example: "[# 49] Edited Readme"
- Everything, except the texts, must be written in English
- Imports must be organized in groups and each group in alphabetical order, following the project pattern