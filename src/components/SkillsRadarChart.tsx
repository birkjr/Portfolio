"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface SkillsRadarChartProps {
  skills: Skill[];
  categories: string[];
}

export function SkillsRadarChart({
  skills,
  categories,
}: SkillsRadarChartProps) {
  // Calculate average level for each category
  const chartData = categories.map((category) => {
    const categorySkills = skills.filter(
      (skill) => skill.category === category
    );
    const averageLevel =
      categorySkills.length > 0
        ? Math.round(
            categorySkills.reduce((sum, skill) => sum + skill.level, 0) /
              categorySkills.length
          )
        : 0;

    return {
      category,
      level: averageLevel,
      fullMark: 100,
    };
  });

  return (
    <div className="w-full h-[300px] sm:h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          data={chartData}
          margin={{ top: 10, right: 20, bottom: 10, left: 20 }}
        >
          <PolarGrid
            stroke="rgba(59, 130, 246, 0.2)"
            strokeWidth={1}
            gridType="polygon"
          />
          <PolarAngleAxis
            dataKey="category"
            tick={{
              fill: "rgb(147, 197, 253)",
              fontSize: 12,
              fontWeight: 500,
            }}
            tickLine={{ stroke: "rgba(59, 130, 246, 0.3)" }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{
              fill: "rgba(147, 197, 253, 0.6)",
              fontSize: 10,
            }}
            tickCount={6}
            tickFormatter={(value) => `${value}%`}
          />
          <Radar
            name="Skills"
            dataKey="level"
            stroke="url(#gradient)"
            fill="url(#gradient)"
            fillOpacity={0.6}
            strokeWidth={2}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
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
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
