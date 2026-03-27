import { useState, useCallback } from "react";
import { dateKey } from "../utils/dateHelpers.js";

const STORAGE_KEY = "apex_goals";

// ── localStorage helpers ───────────────────────────────────────

function readFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeToStorage(goals) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  } catch {
    console.warn("apex: could not persist goals to localStorage");
  }
}

// ── Hook ───────────────────────────────────────────────────────

export function useGoals() {
  const [goals, setGoals] = useState(() => readFromStorage());

  // ── Actions ──────────────────────────────────────────────────

  const addGoal = useCallback((goalData) => {
    const newGoal = {
      ...goalData,
      id:      Date.now(),
      current: 0,       
      created: dateKey(),
    };

    setGoals((prev) => {
      const updated = [...prev, newGoal];
      writeToStorage(updated);
      return updated;
    });
  }, []);

  const updateGoal = useCallback((id, changes) => {
    setGoals((prev) => {
      const updated = prev.map((g) =>
        g.id === id ? { ...g, ...changes } : g
      );
      writeToStorage(updated);
      return updated;
    });
  }, []);

  const deleteGoal = useCallback((id) => {
    setGoals((prev) => {
      const updated = prev.filter((g) => g.id !== id);
      writeToStorage(updated);
      return updated;
    });
  }, []);

  return {
    goals,
    addGoal,
    updateGoal,
    deleteGoal,
  };
}