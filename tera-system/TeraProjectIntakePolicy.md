# Project Intake Policy

## 1. Purpose

This policy defines the required intake gate before Tera starts formal project preparation for any new project.

## 2. Required Intake Files

The minimum intake package is:

- `project-inputs/01_APPLICATION_IDEA.md`
- `project-inputs/02_TECHNICAL_CONTEXT.md`

## 3. Application Idea File

`project-inputs/01_APPLICATION_IDEA.md` should capture at minimum:

- application description
- problem being solved
- expected users
- main workflows
- expected modules or screens
- required outputs
- MVP scope
- out-of-scope items
- user notes and open questions

## 4. Technical Context File

`project-inputs/02_TECHNICAL_CONTEXT.md` should capture at minimum:

- programming language
- framework
- application type
- database
- ORM / data access approach
- package manager / CLI
- UI framework or design system if known
- required external libraries
- forbidden libraries or technologies
- runtime environment
- deployment or hosting notes if known
- technical or security constraints
- technology profile candidate

## 5. Intake Readiness Status

Use these statuses:

- `Missing`
- `Partial`
- `Complete`

## 6. Intake Collection Mode

If one or both intake files are missing or materially incomplete, Tera must enter:

```text
Intake Collection Mode
```

Rules in this mode:

- Do not start formal `project-preparation/` output.
- Do not create `TERA_PROJECT_DECISION.md`.
- Do not choose a final active Technology Profile.
- Do not generate sub-agents for implementation work.
- Do not create implementation `TASK-ID`s.
- Ask short, direct questions only to close missing intake gaps.
- Document the answers inside the intake files.

## 7. Minimum Questions

When intake is incomplete, Tera should ask only the shortest useful questions, such as:

- What is the application idea?
- Who will use it?
- What are the three most important workflows?
- Is the technology already decided?
- If not, should Tera propose it later?
- What database is required, if any?
- Is there any preferred or forbidden UI/design direction?

## 8. When Tera Can Proceed

Tera may proceed to formal preparation only when:

- `01_APPLICATION_IDEA.md` exists and is acceptable at minimum level.
- `02_TECHNICAL_CONTEXT.md` exists and is acceptable at minimum level, or clearly documents that the stack is still undecided.
- Tera has determined whether an existing Technology Profile can be used, or whether a new profile draft will be needed later.

## 9. Relationship with 00_PROJECT_INPUTS.md

`project-preparation/00_PROJECT_INPUTS.md` is not a replacement for the intake files.

It is Tera's normalized preparation summary derived from:

- `project-inputs/01_APPLICATION_IDEA.md`
- `project-inputs/02_TECHNICAL_CONTEXT.md`

## 10. Final Rule

```text
No Intake = No Project Preparation
No Technical Context = No Active Technology Profile
No Active Technology Profile = No Implementation
```
