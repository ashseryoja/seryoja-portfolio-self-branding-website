# GitHub Activity — Design QA

- Source visual truth: `/Users/seryoja/Downloads/IMG_3286.jpg`
- Source pixels: 1130 × 544
- Implementation: `/Users/seryoja/Documents/portfolio-website/src/components/GithubActivity.tsx`
- Browser-rendered implementation evidence: Codex in-app Browser tab 1, final production preview at `http://127.0.0.1:3005/#github-activity` (browser capture emitted in the task; this browser surface does not expose a filesystem screenshot path)
- Desktop viewport and capture: 1200 × 900 CSS px, 1200 × 900 pixels, device scale factor 1
- Mobile viewport and capture: 390 × 844 CSS px, 390 × 844 pixels, device scale factor 1
- Density normalization: none required; both implementation captures were evaluated at 1×
- State: synced live data, 82 contributions and 28 active days

## Findings

No actionable P0, P1, or P2 differences remain.

- Fonts and typography: the section heading now uses the same `font-mono`, uppercase treatment, tracking, and divider construction as the portfolio's other section headings. Metadata, totals, and legend retain a clear size and weight hierarchy.
- Spacing and layout rhythm: the seven-row calendar preserves the reference composition, with a centered grid, compact three-pixel gaps, and small radii. The section is no longer presented as a standalone card: its background is transparent and all decorative horizontal separators have been removed.
- Colors and visual tokens: the decorative green line and green interaction accents were removed. Contribution cells now use GitHub's dark contribution palette exactly: `#161b22`, `#0e4429`, `#006d32`, `#26a641`, and `#39d353`. Cells have no border, so inactive days render as a single uninterrupted `#161b22` surface.
- Image quality and asset fidelity: the reference contains no raster imagery beyond the rendered data visualization. The implementation uses semantic contribution cells and the project's existing Lucide icon system; no placeholder asset substitutions are present.
- Copy and content: labels are concise and portfolio-appropriate. The live GitHub username, contribution total, active-day count, date range, sync state, and intensity legend are all present.
- Accessibility: the section has a named heading, GitHub link has an explicit accessible name, the calendar exposes per-day contribution labels, status is readable without relying solely on color, and focus styling is visible.
- Responsive behavior: at 390 px the transparent section stays within the page, statistics stack naturally, and the calendar is horizontally scrollable instead of compressing cells below legibility.

## Full-view comparison evidence

The reference and implementation share the same dominant structure: a black field, seven rows of rounded square cells, dark inactive states, and green intensity levels. The implementation deliberately extends the reference into a complete portfolio component with profile identity, live totals, date range, and legend without changing the graph's visual hierarchy.

## Focused region comparison evidence

The contribution grid was inspected at desktop and mobile sizes. A separate crop was unnecessary because the desktop browser capture renders the full grid at readable 1× size, while the mobile capture verifies the overflow treatment and cell scale.

## Comparison history

1. Initial desktop pass found the fixed profile control overlapping the small section eyebrow (P2) and the graph appearing left-weighted inside the wide card (P2).
2. Fixed by adding a 64 px heading inset and centering the graph whenever the available viewport is wider than the calendar.
3. User feedback requested removing the standalone card treatment, the top green line, the mismatched heading style, and the custom emerald palette.
4. Reworked the section as a transparent part of the page, matched the existing section-heading system, removed decorative green accents, and applied GitHub's official dark contribution colors.
5. Post-revision desktop and mobile captures show the section blending into the page while preserving clear hierarchy and readable overflow behavior.
6. Final feedback requested removing the remaining separator lines and eliminating the two-tone edge on inactive cells. Removed every section divider and all cell borders; the contribution grid now uses monolithic color fills.

## Primary interactions and runtime checks

- Live GitHub response reached the synced state and rendered real day-level values.
- GitHub profile CTA resolves to `https://github.com/ashseryoja`.
- Loading, synced, and delayed-sync states are implemented.
- Desktop and mobile scrolling were tested in the in-app Browser.
- No errors were observed on the current production-preview origin. The console contains only the project's pre-existing Three.js `Clock` deprecation warning.
- Production build completed successfully.

## Follow-up polish

No P3 follow-up is required for the requested scope.

final result: passed
