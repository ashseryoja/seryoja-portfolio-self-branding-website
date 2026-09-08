import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const GITHUB_USERNAME = "ashseryoja";
const CONTRIBUTIONS_URL = `https://github.com/users/${GITHUB_USERNAME}/contributions`;

type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

function parseContributions(html: string): ContributionDay[] {
  const days: ContributionDay[] = [];
  const cellPattern = /<td\b[^>]*\bdata-date="([^"]+)"[^>]*\bdata-level="([0-4])"[^>]*>/g;

  let match = cellPattern.exec(html);

  while (match) {
    const nearbyMarkup = html.slice((match.index ?? 0) + match[0].length, (match.index ?? 0) + match[0].length + 650);
    const tooltip = nearbyMarkup.match(/<tool-tip\b[^>]*>([^<]*)<\/tool-tip>/)?.[1] ?? "";
    const count = Number(tooltip.match(/([\d,]+) contributions?/)?.[1]?.replaceAll(",", "") ?? 0);

    days.push({
      date: match[1],
      count,
      level: Number(match[2]),
    });

    match = cellPattern.exec(html);
  }

  return days.sort((a, b) => a.date.localeCompare(b.date));
}

export async function GET() {
  try {
    const response = await fetch(CONTRIBUTIONS_URL, {
      headers: {
        Accept: "text/html",
        "User-Agent": "sergey-ashughyan-portfolio",
      },
      next: { revalidate: 60 * 60 },
    });

    if (!response.ok) {
      throw new Error(`GitHub responded with ${response.status}`);
    }

    const html = await response.text();
    const days = parseContributions(html);

    if (days.length < 350) {
      throw new Error("GitHub contribution calendar could not be parsed");
    }

    const declaredTotal = html.match(/<h2\b[^>]*id="js-contribution-activity-description"[^>]*>\s*([\d,]+)\s*contributions/i)?.[1];
    const total = declaredTotal
      ? Number(declaredTotal.replaceAll(",", ""))
      : days.reduce((sum, day) => sum + day.count, 0);

    return NextResponse.json(
      {
        username: GITHUB_USERNAME,
        total,
        activeDays: days.filter((day) => day.count > 0).length,
        days,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch (error) {
    console.error("Unable to load GitHub activity", error);
    return NextResponse.json({ error: "GitHub activity is temporarily unavailable" }, { status: 502 });
  }
}
