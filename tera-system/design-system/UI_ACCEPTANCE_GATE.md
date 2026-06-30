# UI Acceptance Gate

## Purpose

This gate is required for every `TASK-COD-*` that creates or modifies UI, frontend layout, visual styling, UI components, or interaction states.

## Mandatory Rule

```text
Any UI implementation task must pass UI_ACCEPTANCE_GATE before it can be accepted or closed.
```

## Pre-Task Requirements

- `Design Source Decision` exists.
- `project-preparation/28_UI_UX_GUIDELINES.md` exists for visual UI work.
- Raw sources are saved in `project-preparation/design-source/` when applicable.
- TASK file includes UI Source, UI Rules, UI Acceptance, and Design Gap Handling.

## Gate Checklist

| Check | Required Result |
|---|---|
| UI source mode is recorded | PASS |
| `28_UI_UX_GUIDELINES.md` used as primary design source | PASS |
| No invented colors, spacing, typography, or component style | PASS |
| Component rules followed | PASS |
| Layout pattern followed | PASS |
| RTL/LTR rules followed | PASS / N/A |
| Responsive behavior matches rules | PASS / N/A |
| Accessibility baseline checked | PASS |
| Forbidden styling avoided | PASS |
| Design gaps recorded instead of guessed | PASS / N/A |
| Existing component patterns reused where available | PASS / N/A |

## Outcomes

```text
PASS
NEEDS_FIX
BLOCKED_DESIGN_GAP
```

`BLOCKED_DESIGN_GAP` means the task cannot continue until Tera or the user resolves a missing design rule.
