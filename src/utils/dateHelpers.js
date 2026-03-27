
export const pad = (n) => String(n).padStart(2, "0");


export const fmtTime = (totalSeconds) => {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
};


export const toMins = (seconds) => Math.round(seconds / 60);

export const dateKey = (d = new Date()) => d.toISOString().slice(0, 10);

export const weekKey = (d = new Date()) => {
  const jan1 = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil(((d - jan1) / 86400000 + jan1.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${pad(week)}`;
};

export const monthKey = (d = new Date()) => d.toISOString().slice(0, 7);

export const getLastNDays = (n = 7) =>
  Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (n - 1 - i));
    return dateKey(d);
  });

export const getLast84Days = () => getLastNDays(84);

export const shortDateLabel = (dateStr) => {
  const d = new Date(dateStr + "T00:00:00"); // force local time parse
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};