import { useEffect } from "react";

export const useRecordStorage = (isRunning: boolean, totalTime: number) => {
  useEffect(() => {
    if (!isRunning && totalTime > 0) {
      const today = new Date().toISOString().slice(0, 10);
      const prev = JSON.parse(localStorage.getItem("records") || "{}");
      const prevTime = prev[today]?.totalTimeSec || 0;
      const updated = {
        ...prev,
        [today]: {
          date: today,
          totalTimeSec: prevTime + totalTime,
        },
      };
      localStorage.setItem("records", JSON.stringify(updated));
    }
  }, [isRunning, totalTime]);
};
