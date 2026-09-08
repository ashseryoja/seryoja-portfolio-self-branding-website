"use client";

import { ArrowUpRight, Github } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const USERNAME = "ashseryoja";
const PROFILE_URL = `https://github.com/${USERNAME}`;
const CELL_COUNT = 371;

type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

type GithubActivityData = {
  username: string;
  total: number;
  activeDays: number;
  days: ContributionDay[];
};

const levelColors = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

export default function GithubActivity() {
  const [data, setData] = useState<GithubActivityData | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/github-activity", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("GitHub activity request failed");
        return response.json() as Promise<GithubActivityData>;
      })
      .then((activity) => {
        setData(activity);
        setStatus("ready");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setStatus("error");
      });

    return () => controller.abort();
  }, []);

  const dateRange = useMemo(() => {
    if (!data?.days.length) return "Last 12 months";
    return `${formatDate(data.days[0].date)} — ${formatDate(data.days[data.days.length - 1].date)}`;
  }, [data]);

  const cells = data?.days ?? Array.from({ length: CELL_COUNT }, (_, index) => ({
    date: "",
    count: 0,
    level: 0,
    placeholderIndex: index,
  }));

  return (
    <section id="github-activity" className="pb-24 md:pb-32 reveal-section scroll-mt-24" aria-labelledby="github-activity-title">
      <div className="mb-12">
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
              <span className="mt-1 block text-xs text-white/35">Public contribution graph</span>
            </span>
          </a>

          <div className="flex items-end gap-8 sm:text-right">
            <div>
              <p className="font-mono text-2xl font-medium tabular-nums text-white sm:text-3xl">
                {status === "ready" ? data?.total.toLocaleString("en-US") : "—"}
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">Contributions</p>
            </div>
            <div>
              <p className="font-mono text-2xl font-medium tabular-nums text-white sm:text-3xl">
                {status === "ready" ? data?.activeDays.toLocaleString("en-US") : "—"}
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">Active days</p>
            </div>
          </div>
        </div>

        <div className="pt-6 md:pt-8">
          <div className="overflow-x-auto pb-2 [scrollbar-color:#3f3f46_transparent] [scrollbar-width:thin]">
            <div
              className="mx-auto grid w-max grid-flow-col grid-rows-7 gap-[3px]"
              role="grid"
              aria-label={status === "ready" ? `${data?.total} GitHub contributions in the last year` : "GitHub contribution calendar is loading"}
            >
              {cells.map((day, index) => (
                <span
                  key={day.date || index}
                  role="gridcell"
                  title={day.date ? `${day.count || "No"} contribution${day.count === 1 ? "" : "s"} on ${formatDate(day.date)}` : undefined}
                  aria-label={day.date ? `${day.count || "No"} contribution${day.count === 1 ? "" : "s"} on ${formatDate(day.date)}` : undefined}
                  className={`block h-[13px] w-[13px] rounded-[3px] transition-transform duration-200 hover:scale-125 sm:h-[15px] sm:w-[15px] ${
                    status === "ready" ? "" : "animate-pulse"
                  }`}
                  style={{
                    backgroundColor: status === "ready" ? levelColors[day.level] : levelColors[0],
                    border: 0,
                    outline: 0,
                    boxShadow: "none",
                    ...(status !== "ready" ? { animationDelay: `${(index % 53) * 18}ms` } : {}),
                  }}
                />
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4 pt-4 text-[10px] text-white/30 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono uppercase tracking-[0.16em]">
              {status === "error" ? "Live data will retry on the next visit" : dateRange}
            </p>
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
