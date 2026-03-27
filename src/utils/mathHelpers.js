
export const sumMins = (logs) =>
  logs.reduce((acc, log) => acc + log.duration, 0);

export const minsToHours = (mins) => Math.round((mins / 60) * 10) / 10;

export const logsForDay = (logs, day) =>
  logs.filter((l) => l.date === day);

export const logsForWeek = (logs, week) =>
  logs.filter((l) => l.week === week);


export const logsForMonth = (logs, month) =>
  logs.filter((l) => l.month === month);


export const stdDev = (arr) => {
  if (arr.length < 2) return 0;
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
  const variance = arr.reduce((a, b) => a + (b - mean) ** 2, 0) / arr.length;
  return Math.sqrt(variance);
};

export const continuityScore = (dailyMins) => {
  const dailyHours = dailyMins.map((m) => m / 60);
  const score = 10 - stdDev(dailyHours);
  return Math.max(0, Math.round(score * 100) / 100);
};


export const calcGoalProgress = (goal, logs) => {
  if (goal.metric === "time") {
    const matchingLogs = logs.filter((l) =>
      l.topic.toLowerCase().includes(goal.name.toLowerCase())
    );
    const totalHours = minsToHours(sumMins(matchingLogs));
    return Math.min((totalHours / goal.target) * 100, 100);
  }

  // For pages / topics — the user manually updates `goal.current`
  if (goal.current !== undefined && goal.target > 0) {
    return Math.min((goal.current / goal.target) * 100, 100);
  }

  return 0;
};


export const buildTrendData = (days, topics, logs) =>
  days.map((day) => {
    const entry = { date: day.slice(5) }; 
    topics.forEach((topic) => {
      entry[topic] = sumMins(
        logs.filter((l) => l.date === day && l.topic === topic)
      );
    });
    return entry;
  });

export const buildScatterData = (logs) =>
  logs.map((l) => ({
    x: l.duration,
    y: l.happiness,
    effort: l.effort,
  }));

export const buildHeatmapCounts = (logs) =>
  logs.reduce((acc, l) => {
    acc[l.date] = (acc[l.date] || 0) + 1;
    return acc;
  }, {});