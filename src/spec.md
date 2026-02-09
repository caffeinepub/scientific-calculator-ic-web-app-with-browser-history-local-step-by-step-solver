# Specification

## Summary
**Goal:** Add a UPI-based Premium section under the Step-by-Step Solution panel and locally unlock a premium step solver mode that gates detailed steps.

**Planned changes:**
- Add a “Premium” section directly below the Step-by-Step Solution panel on the Calculator view only, shown when steps are visible.
- Include two buttons in the Premium section that open the provided UPI deep links in a new tab/window: one for “Unlock Premium AI Step Solver (₹50)” and one for “Donate via UPI”.
- Implement a browser-local premium unlock state (persisted via local storage) with an in-app, user-driven confirmation action after the user initiates the UPI unlock flow.
- Gate the Steps panel: show a limited/basic subset of steps plus an English prompt when premium is locked; show the full detailed step list when premium is unlocked, updating immediately when the unlock state changes.
- Update UI cues so premium status is clearly indicated and the unlock button is replaced/disabled once premium is unlocked.

**User-visible outcome:** Users see a Premium section beneath the steps on the calculator, can open UPI links to unlock or donate, can confirm they paid to unlock premium locally, and then view full step-by-step solutions (otherwise they see a basic step view with a premium prompt).
