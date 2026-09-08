# GitHub Activity — Design QA

- Source visual truth: `/var/folders/6j/zzbt25dx4w94qh7jsw7c_7fw0000gn/T/codex-clipboard-bc2ab40a-4332-4233-b0fe-60123bfda77d.png`
- Mobile spacing reference: `/var/folders/6j/zzbt25dx4w94qh7jsw7c_7fw0000gn/T/codex-clipboard-37e02882-ee93-498f-9360-d43f6fdbe24e.png`
- Activity source pixels: 1125 × 581
- Implementation: `/Users/seryoja/Documents/portfolio-website/src/components/GithubActivity.tsx`
- Browser-rendered implementation evidence: Codex in-app Browser tab 1, final production preview at `http://127.0.0.1:3005/#github-activity` (browser capture emitted in the task; this browser surface does not expose a filesystem screenshot path)
- Desktop viewport and capture: 1200 × 900 CSS px, 1200 × 900 pixels, device scale factor 1
- Mobile viewport and capture: 390 × 844 CSS px, 390 × 844 pixels, device scale factor 1
- Density normalization: none required; both implementation captures were evaluated at 1×
- State: supplied 16-week activity snapshot, 84 visibly active days

## Findings

No actionable P0, P1, or P2 differences remain.

- Fonts and typography: the section heading uses the portfolio's existing `font-mono`, uppercase treatment, and tracking. Metadata, snapshot totals, and legend retain a clear size and weight hierarchy.
- Spacing and layout rhythm: the seven-row calendar preserves the reference composition, with a centered grid, compact three-pixel gaps, and small radii. The section is no longer presented as a standalone card: its background is transparent and all decorative horizontal separators have been removed.
- Colors and visual tokens: the decorative green line and green interaction accents were removed. Contribution cells now use GitHub's dark contribution palette exactly: `#161b22`, `#0e4429`, `#006d32`, `#26a641`, and `#39d353`. Cells have no border, so inactive days render as a single uninterrupted `#161b22` surface.
- Image quality and asset fidelity: the reference contains no raster imagery beyond the rendered data visualization. The implementation uses semantic contribution cells and the project's existing Lucide icon system; no placeholder asset substitutions are present.
- Copy and content: the UI clearly identifies the supplied data as a contribution snapshot. It reports only values that can be derived from the screenshot: 16 weeks and 84 active days.
- Accessibility: the section has a named heading, the GitHub link has an explicit accessible name, and visible snapshot cells expose week, weekday-position, and intensity labels.
- Responsive behavior: at 390 px the Hero occupies the first small viewport before GitHub activity begins. The 16-week graph fits the available width without horizontal clipping, and the heading-to-profile gap is compact.

## Full-view comparison evidence

The implementation reproduces the supplied snapshot as a 16-column, seven-row semantic grid, including the partial final week, while retaining the portfolio's profile identity and intensity legend.

## Focused region comparison evidence

The supplied activity crop and the rendered mobile section were inspected together. Cell positions, missing final-week cells, intensity distribution, compact title/profile rhythm, and mobile fit match the requested target.

## Comparison history

1. Initial desktop pass found the fixed profile control overlapping the small section eyebrow (P2) and the graph appearing left-weighted inside the wide card (P2).
2. Fixed by adding a 64 px heading inset and centering the graph whenever the available viewport is wider than the calendar.
3. User feedback requested removing the standalone card treatment, the top green line, the mismatched heading style, and the custom emerald palette.
4. Reworked the section as a transparent part of the page, matched the existing section-heading system, removed decorative green accents, and applied GitHub's official dark contribution colors.
5. Post-revision desktop and mobile captures show the section blending into the page while preserving clear hierarchy and readable overflow behavior.
6. Final feedback requested removing the remaining separator lines and eliminating the two-tone edge on inactive cells. Removed every section divider and all cell borders; the contribution grid now uses monolithic color fills.
7. A close-up reference revealed the browser still presenting a lighter outer edge around inactive cells. Locked every cell and legend swatch to a single inline background color and explicitly disabled border, outline, and box shadow. The refreshed production preview shows uniform inactive-day fills.
8. Mobile feedback requested a full-screen first Hero, a smaller title/profile gap, and replacement of the public 12-month GitHub response with the supplied real activity snapshot.
9. Set the mobile Hero to the remaining small-viewport height, reduced the section-heading margin, reconstructed the supplied 16-week pattern, and removed the misleading live endpoint and totals.

## Primary interactions and runtime checks

- GitHub profile CTA resolves to `https://github.com/ashseryoja`.
- Mobile Hero height, section transition, snapshot layout, and page scrolling were tested in the in-app Browser.
- No errors were observed on the current production-preview origin. The console contains only the project's pre-existing Three.js `Clock` deprecation warning.
- Production build completed successfully.

## Follow-up polish

No P3 follow-up is required for the requested scope.

final result: passed
