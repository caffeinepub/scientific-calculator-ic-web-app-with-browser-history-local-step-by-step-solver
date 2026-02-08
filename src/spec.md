# Specification

## Summary
**Goal:** Add the uploaded logo to the calculator header alongside the existing “Soumyajit Dutta” text, preserving the current premium white/light theme and header functionality.

**Planned changes:**
- Add the uploaded image (file_00000000b77c72089c9effad0d4cec39.png) to the frontend static assets and reference it from the header UI.
- Update the header layout in `frontend/src/features/calculator/CalculatorPage.tsx` to display the logo together with “Soumyajit Dutta” as a cohesive identity block (logo next to or above the name), without replacing the text.
- Ensure the logo is responsive (keeps aspect ratio, no stretching/overflow on small screens) and includes appropriate English alt text, while keeping existing header elements (including the History/Calculator toggle) intact.

**User-visible outcome:** The app header shows the new logo alongside “Soumyajit Dutta” in both Calculator and History views, with the same premium light look and fully working header controls.
