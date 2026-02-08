# Specification

## Summary
**Goal:** Build a mobile-friendly, single-page Internet Computer scientific calculator web app with a premium light theme, browser-saved history, and a local rule-based step-by-step solver.

**Planned changes:**
- Create an app-shell style, mobile-first single-page UI (header + main content) suitable for home-screen-like use.
- Implement a scientific calculator keypad and input/display supporting: AC, backspace, parentheses, sin, cos, tan, √, log, ln, x², x^y, digits, decimal point, ±, +, −, ×, ÷, π, e, factorial (!), and =.
- Add a safe expression parser/evaluator (no JavaScript `eval`) with correct precedence and parentheses; validate factorial inputs (non-negative integers only) and show errors for invalid cases.
- Persist calculation history locally in the browser; provide a history view and a clear-history control.
- Implement a local, rule-based step-by-step solver that shows multi-step explanations after evaluation and provides helpful error explanations for invalid expressions.
- Apply one coherent premium white/light visual direction across the app (typography, spacing, surfaces, button hierarchy, and focus/active states).
- Display the name “Soumyajit Dutta” prominently in the main UI (e.g., header/title area) without overlapping on mobile.
- Keep the Internet Computer backend canister minimal and deployable, with no backend persistence or sync for history.

**User-visible outcome:** Users can use a polished mobile-friendly scientific calculator, see “Soumyajit Dutta” in the UI, evaluate expressions with correct math behavior, view a locally generated step-by-step explanation for results, and review/clear a calculation history that persists in their browser across reloads.
