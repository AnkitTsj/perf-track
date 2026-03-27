
import { useState, useCallback, useMemo } from "react";
import { dateKey, weekKey, monthKey } from "../utils/dateHelpers.js";

const STORAGE_KEY = "apex_logs";
const MAX_TOPICS_FOR_CHART = 5; // how many topics to show in the trend chart


function readFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeToStorage(logs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  } catch {
    console.warn("apex: could not persist logs to localStorage");
  }
}

// ── Hook ───────────────────────────────────────────────────────

export function useLogs() {
  const [logs, setLogs] = useState(() => readFromStorage());

  // ── Actions ──────────────────────────────────────────────────


  const addLog = useCallback((entry) => {
    const newLog = {
      ...entry,
      id:    Date.now(),           
      date:  dateKey(),
      week:  weekKey(),
      month: monthKey(),
      ts:    Date.now(),
    };

    setLogs((prev) => {
      const updated = [newLog, ...prev];
      writeToStorage(updated);
      return updated;
    });
  }, []);

  const deleteLog = useCallback((id) => {
    setLogs((prev) => {
      const updated = prev.filter((l) => l.id !== id);
      writeToStorage(updated);
      return updated;
    });
  }, []);
  const clearAllLogs = useCallback(() => {
    setLogs([]);
    writeToStorage([]);
  }, []);

  // ── Derived data ──────────────────────────────────────────────
  const topTopics = useMemo(() => {
    const totals = logs.reduce((acc, l) => {
      acc[l.topic] = (acc[l.topic] || 0) + l.duration;
      return acc;
    }, {});

    return Object.entries(totals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, MAX_TOPICS_FOR_CHART)
      .map(([topic]) => topic);
  }, [logs]);

  const allTopics = useMemo(
    () => [...new Set(logs.map((l) => l.topic))],
    [logs]
  );

  return {
    logs,
    addLog,
    deleteLog,
    clearAllLogs,
    topTopics,
    allTopics,
  };
}