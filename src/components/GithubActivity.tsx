"use client";

import { ArrowUpRight, Github } from "lucide-react";

const USERNAME = "ashseryoja";
const PROFILE_URL = `https://github.com/${USERNAME}`;
const WEEK_COUNT = 16;

const levelColors = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];

const activityRows: Array<Array<number | null>> = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 1],
  [2, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 2, 3, 2],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 4, 2, 1],
  [2, 1, 2, 1, 1, 1, 1, 0, 0, 4, 3, 1, 3, 4, 2, null],
  [1, 1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 2, 3, 2, 1, null],
  [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 2, 3, 1, 2, 1, null],
  [1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 2, 1, null],
];

const activityCells = activityRows.flatMap((row, rowIndex) =>
  row.map((level, columnIndex) => ({ level, rowIndex, columnIndex })),
);

const activeDays = activityCells.filter((cell) => cell.level !== null && cell.level > 0).length;

export default function GithubActivity() {
  return (
    <section id="github-activity" className="pb-24 md:pb-32 reveal-section scroll-mt-24" aria-labelledby="github-activity-title">
      <div className="mb-6 md:mb-8">
        <h2 id="github-activity-title" className="text-center font-mono text-xl uppercase tracking-widest text-white/80">
          GitHub Activity
        </h2>
      </div>

      <div>
        <div className="flex flex-col gap-5 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noreferrer"
            className="group flex w-fit items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label={`Open ${USERNAME} on GitHub`}
          >
            <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] transition-colors group-hover:border-white/30 group-hover:bg-white/[0.07]">
              <Github className="h-5 w-5 text-white/80 transition-colors group-hover:text-white" aria-hidden="true" />
            </span>
            <span>
              <span className="flex items-center gap-1.5 font-mono text-sm text-white/90">
                @{USERNAME}
                <ArrowUpRight className="h-3.5 w-3.5 text-white/35 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" aria-hidden="true" />
              </span>
              <span className="mt-1 block text-xs text-white/35">Contribution snapshot</span>
            </span>
          </a>

          <div className="flex items-end gap-8 sm:text-right">
            <div>
              <p className="font-mono text-2xl font-medium tabular-nums text-white sm:text-3xl">
                {WEEK_COUNT}
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">Weeks</p>
            </div>
            <div>
              <p className="font-mono text-2xl font-medium tabular-nums text-white sm:text-3xl">
                {activeDays}
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">Active days</p>
            </div>
          </div>
        </div>

        <div className="pt-4 md:pt-6">
          <div className="pb-2">
            <div
              className="mx-auto grid w-full max-w-[912px] grid-cols-[repeat(16,minmax(0,1fr))] gap-[3px] sm:gap-2"
              role="grid"
              aria-label={`GitHub activity snapshot with ${activeDays} active days across ${WEEK_COUNT} weeks`}
            >
              {activityCells.map((cell) => (
                <span
                  key={`${cell.rowIndex}-${cell.columnIndex}`}
                  role="gridcell"
                  aria-label={cell.level === null ? undefined : `Week ${cell.columnIndex + 1}, day ${cell.rowIndex + 1}, activity level ${cell.level}`}
                  aria-hidden={cell.level === null ? "true" : undefined}
                  className={`block aspect-square min-w-0 rounded-[4px] transition-transform duration-200 hover:scale-105 sm:rounded-[6px] ${cell.level === null ? "invisible" : ""}`}
                  style={{
                    backgroundColor: levelColors[cell.level ?? 0],
                    border: 0,
                    outline: 0,
                    boxShadow: "none",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4 pt-4 text-[10px] text-white/30 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono uppercase tracking-[0.16em]">GitHub activity snapshot</p>
            <div className="flex items-center gap-2 font-mono uppercase tracking-[0.14em]" aria-label="Contribution intensity legend">
              <span>Less</span>
              {levelColors.map((color, index) => (
                <span
                  key={color}
                  className="block h-2.5 w-2.5 rounded-[2px]"
                  style={{ backgroundColor: color, border: 0, outline: 0, boxShadow: "none" }}
                  aria-label={`Activity level ${index}`}
                />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
