"use client";

import { ArrowUpRight, Github } from "lucide-react";
import GlassSurface from "@/components/liquid/GlassSurface";

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
    <section id="github-activity" className="pb-24 md:pb-32 scroll-mt-24" aria-labelledby="github-activity-title">
      <div className="mb-8 flex justify-center md:mb-10">
        <GlassSurface data-reveal tone="clear" display="inline-flex" className="rounded-full" contentClassName="px-6 py-2.5">
          <h2 id="github-activity-title" className="text-center font-mono text-sm uppercase tracking-[0.28em] text-white/90 sm:text-lg">
            GitHub Activity
          </h2>
        </GlassSurface>
      </div>

      <div>
        <div data-reveal className="flex flex-col gap-5 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noreferrer"
            className="group flex w-fit items-center gap-4 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label={`Open ${USERNAME} on GitHub`}
          >
            <span className="glass-lite grid h-12 w-12 place-items-center rounded-full backdrop-blur-md transition-all duration-500 group-hover:bg-white/15 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_0_24px_rgba(255,255,255,0.25)]">
              <Github className="h-5 w-5 text-white/80 transition-colors group-hover:text-white" aria-hidden="true" />
            </span>
            <span>
              <span className="flex items-center gap-1.5 font-mono text-sm text-white/90">
                @{USERNAME}
                <ArrowUpRight className="h-3.5 w-3.5 text-white/50 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" aria-hidden="true" />
              </span>
              <span className="mt-1 block text-xs text-white/55">Contribution snapshot</span>
            </span>
          </a>

          <div className="flex items-end gap-8 sm:text-right">
            <div>
              <p className="font-mono text-2xl font-medium tabular-nums text-white sm:text-3xl">
                {WEEK_COUNT}
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">Weeks</p>
            </div>
            <div>
              <p className="font-mono text-2xl font-medium tabular-nums text-white sm:text-3xl">
                {activeDays}
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">Active days</p>
            </div>
          </div>
        </div>

        <div className="pt-4 md:pt-6">
          <div data-reveal className="pb-2">
            <div
              className="github-activity-grid mx-auto grid w-max"
              role="grid"
              aria-label={`GitHub activity snapshot with ${activeDays} active days across ${WEEK_COUNT} weeks`}
            >
              {activityCells.map((cell) => (
                <span
                  key={`${cell.rowIndex}-${cell.columnIndex}`}
                  role="gridcell"
                  aria-label={cell.level === null ? undefined : `Week ${cell.columnIndex + 1}, day ${cell.rowIndex + 1}, activity level ${cell.level}`}
                  aria-hidden={cell.level === null ? "true" : undefined}
                  className={`block aspect-square rounded-[4px] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-125 ${cell.level === null ? "invisible" : ""}`}
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

          <div data-reveal className="mt-5 flex flex-col gap-4 pt-4 text-[10px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono uppercase tracking-[0.16em]">GitHub activity snapshot</p>
            <div className="flex items-center gap-2 font-mono uppercase tracking-[0.14em]" aria-label="Contribution intensity legend">
              <span>Less</span>
              {levelColors.map((color, index) => (
                <span
                  key={color}
                  className="block h-2.5 w-2.5 rounded-[3px]"
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
