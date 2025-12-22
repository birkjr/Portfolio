"use client";

import { useEffect, useState, useCallback } from "react";
import GradientText from "./GradientText";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface CommitData {
  date: string;
  commits: number;
}

interface GitHubCommitsChartProps {
  username?: string;
  githubToken?: string;
  pollInterval?: number; // Polling interval in milliseconds (default: 5 minutes)
}

interface GitHubRepo {
  name: string;
  fork: boolean;
  size: number;
  owner?: {
    login: string;
  };
}

interface GitHubCommit {
  commit?: {
    author?: {
      name?: string;
      email?: string;
      date?: string;
    };
    committer?: {
      name?: string;
    };
  };
  author?: {
    login?: string;
  };
}

interface GitHubEvent {
  type: string;
  created_at?: string;
  payload?: {
    commits?: Array<unknown>;
  };
}

export function GitHubCommitsChart({
  username = "birkjr",
  githubToken,
  pollInterval = 5 * 60 * 1000, // Default: 5 minutes
}: GitHubCommitsChartProps) {
  const [commitData, setCommitData] = useState<CommitData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCommits = useCallback(async () => {
    try {
      // Note: Without a GitHub token, only PUBLIC repos are accessible
      // To access private repos, provide a GitHub Personal Access Token
      // Create one at: https://github.com/settings/tokens
      // Required scopes: 'repo' (for private repos) or 'public_repo' (for public repos only)

      const headers: HeadersInit = {
        Accept: "application/vnd.github.v3+json",
      };

      // Add authorization header if token is provided
      // GitHub supports both 'token' and 'Bearer' formats
      if (githubToken) {
        // Try Bearer first (for new tokens), fallback to token format
        headers.Authorization =
          githubToken.startsWith("ghp_") ||
          githubToken.startsWith("github_pat_")
            ? `Bearer ${githubToken}`
            : `token ${githubToken}`;
      }

      // Get repositories for the user
      // Use /user/repos endpoint if token is provided (includes private repos)
      // Otherwise use /users/{username}/repos (public repos only)
      const reposUrl = githubToken
        ? `https://api.github.com/user/repos?per_page=100&sort=updated&affiliation=owner`
        : `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;

      let reposResponse = await fetch(reposUrl, { headers });
      let useToken = !!githubToken;

      // If token auth fails, try without token (public repos only)
      if (!reposResponse.ok && githubToken && reposResponse.status === 401) {
        console.log(
          "Token authentication failed, falling back to public repos only"
        );
        useToken = false;
        const publicHeaders = { Accept: "application/vnd.github.v3+json" };
        reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
          { headers: publicHeaders }
        );
        // Remove authorization header for subsequent calls
        delete headers.Authorization;
      }

      if (!reposResponse.ok) {
        const errorText = await reposResponse.text().catch(() => "");
        console.error(
          "Failed to fetch repos:",
          reposResponse.status,
          errorText
        );
        setLoading(false);
        return;
      }

      const repos = await reposResponse.json();

      if (!Array.isArray(repos) || repos.length === 0) {
        console.log("No repositories found");
        setLoading(false);
        return;
      }

      console.log(`Found ${repos.length} repositories`);

      // Get commits from the last 30 days
      const commitsByDate: Record<string, number> = {};
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const sinceDate = thirtyDaysAgo.toISOString();

      // Fetch commits from recent repositories (limit to avoid rate limits)
      const recentRepos = (repos as GitHubRepo[])
        .filter((repo) => !repo.fork && repo.size > 0) // Exclude forks and empty repos
        .slice(0, 20); // Increase to 20 repos for better coverage

      console.log(
        `Fetching commits from ${recentRepos.length} repositories (since ${sinceDate})`
      );

      // Use Promise.allSettled to fetch from multiple repos in parallel
      const commitPromises = recentRepos.map(async (repo) => {
        try {
          // Use owner.login in case repo is from a different user (when using token)
          const repoOwner = repo.owner?.login || username;
          // Use headers without token if token auth failed
          const commitHeaders = useToken
            ? headers
            : { Accept: "application/vnd.github.v3+json" };
          // Remove author filter to get all commits (we'll filter by email/name if needed)
          const commitsResponse = await fetch(
            `https://api.github.com/repos/${repoOwner}/${repo.name}/commits?since=${sinceDate}&per_page=100`,
            { headers: commitHeaders }
          );

          if (!commitsResponse.ok) {
            return [];
          }

          const commits = await commitsResponse.json();
          return Array.isArray(commits) ? commits : [];
        } catch (error) {
          console.error(`Error fetching commits from ${repo.name}:`, error);
          return [];
        }
      });

      const commitResults = await Promise.allSettled(commitPromises);

      commitResults.forEach((result) => {
        if (result.status === "fulfilled" && Array.isArray(result.value)) {
          (result.value as GitHubCommit[]).forEach((commit) => {
            if (commit.commit?.author?.date) {
              // Filter commits by author if possible (check both author name and committer)
              const authorName =
                commit.commit.author?.name?.toLowerCase() || "";
              const committerName =
                commit.commit.committer?.name?.toLowerCase() || "";
              const authorEmail =
                commit.commit.author?.email?.toLowerCase() || "";
              const usernameLower = username.toLowerCase();

              // Include commit if author/committer matches username or if we can't determine
              const isUserCommit =
                authorName.includes(usernameLower) ||
                committerName.includes(usernameLower) ||
                authorEmail.includes(usernameLower) ||
                commit.author?.login?.toLowerCase() === usernameLower;

              if (isUserCommit || !commit.author) {
                const commitDate = new Date(commit.commit.author.date);
                const dateStr = commitDate.toISOString().split("T")[0];
                commitsByDate[dateStr] = (commitsByDate[dateStr] || 0) + 1;
              }
            }
          });
        }
      });

      let totalCommits = Object.values(commitsByDate).reduce(
        (a, b) => a + b,
        0
      );
      console.log("Total commits found:", totalCommits);

      // If no commits found via repos, try using events API as fallback
      if (totalCommits === 0) {
        console.log("Trying events API as fallback...");
        try {
          // Events API - use public endpoint if token failed or not provided
          const eventsHeaders = useToken
            ? headers
            : { Accept: "application/vnd.github.v3+json" };
          const eventsUrl = useToken
            ? `https://api.github.com/users/${username}/events?per_page=100`
            : `https://api.github.com/users/${username}/events/public?per_page=100`;

          const eventsResponse = await fetch(eventsUrl, {
            headers: eventsHeaders,
          });

          if (eventsResponse.ok) {
            const events = (await eventsResponse.json()) as GitHubEvent[];
            events.forEach((event) => {
              if (event.type === "PushEvent" && event.created_at) {
                const eventDate = new Date(event.created_at);
                const dateStr = eventDate.toISOString().split("T")[0];
                const daysDiff = Math.floor(
                  (Date.now() - eventDate.getTime()) / (1000 * 60 * 60 * 24)
                );

                if (daysDiff <= 30) {
                  const commitCount = event.payload?.commits?.length || 1;
                  commitsByDate[dateStr] =
                    (commitsByDate[dateStr] || 0) + commitCount;
                }
              }
            });
            totalCommits = Object.values(commitsByDate).reduce(
              (a, b) => a + b,
              0
            );
            console.log("Commits from events:", totalCommits);
          }
        } catch (eventsError) {
          console.error("Error fetching events:", eventsError);
        }
      }

      // Fill in missing dates with 0 commits and format for display
      const filledData: CommitData[] = [];
      for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split("T")[0];
        const displayDate = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        filledData.push({
          date: displayDate,
          commits: commitsByDate[dateStr] || 0,
        });
      }

      setCommitData(filledData);
    } catch (error) {
      console.error("Error fetching GitHub commits:", error);
      // Set empty data on error but still show the chart
      const emptyData: CommitData[] = [];
      for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const displayDate = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        emptyData.push({
          date: displayDate,
          commits: 0,
        });
      }
      setCommitData(emptyData);
    } finally {
      setLoading(false);
    }
  }, [username, githubToken]);

  useEffect(() => {
    // Fetch commits immediately on mount
    fetchCommits();

    // Set up polling to refresh commits periodically
    // This ensures the chart updates even when commits are made in other repos
    // without needing to commit in this project
    const intervalId = setInterval(() => {
      console.log("Polling for new commits...");
      fetchCommits();
    }, pollInterval);

    // Cleanup interval on unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [fetchCommits, pollInterval]);

  if (loading) {
    return (
      <div className="w-full h-20 flex items-center justify-center">
        <div className="text-xs text-muted-foreground">Loading commits...</div>
      </div>
    );
  }

  // Always show the chart, even if empty

  return (
    <div className="w-full h-40 mt-4">
      <GradientText
        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
        animationSpeed={4}
        showBorder={false}
        className="text-sm text-muted-foreground bg-transparent p-2"
      >
        Git commits
      </GradientText>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={commitData}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        >
          <XAxis
            dataKey="date"
            tick={{ fontSize: 8 }}
            tickCount={5}
            interval="preserveStartEnd"
          />
          <YAxis tick={{ fontSize: 8 }} width={25} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.9)",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              borderRadius: "6px",
              color: "rgb(147, 197, 253)",
              fontSize: "10px",
            }}
            labelStyle={{ color: "rgb(147, 197, 253)" }}
          />
          <Line
            type="monotone"
            dataKey="commits"
            stroke="url(#commitGradient)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 3, fill: "rgb(59, 130, 246)" }}
          />
          <defs>
            <linearGradient
              id="commitGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                stopColor="rgb(139, 92, 246)"
                stopOpacity={0.8}
              />
              <stop
                offset="100%"
                stopColor="rgb(59, 130, 246)"
                stopOpacity={0.8}
              />
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
