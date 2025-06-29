import { useState } from "react";
import { Sun, CloudSun, Cloud,CloudMoon,Moon } from "lucide-react";

export const MoodSelector = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const moods = [
    { label: "嫌な気持ち", emoji: <Moon className="text-slate-600" />, value: "bad" },
    { label: "ちょっと嫌な気持ち", emoji: <CloudMoon className="text-slate-600" />, value: "slightly-bad" },
    { label: "普通", emoji: <Cloud className="text-slate-600"/> ,value: "neutral" },
    { label: "ちょっと元気", emoji: <CloudSun className="text-slate-600"/>, value: "slightly-good" },
    { label: "元気", emoji: <Sun className="text-slate-600"/>, value: "good" },
  ];

  return (
    <div className="p-4 bg-emerald-300 rounded-2xl shadow-sm max-w-md mx-auto">
      <h2 className="text-2xl font-mono text-center text-slate-50 mb-4">今の気分はどう？</h2>
      <div className="space-y-3">
        {moods.map((mood) => (
          <label
            key={mood.value}
            className={`flex font-mono items-center space-x-3 p-3 rounded-xl cursor-pointer transition ${
              selectedMood === mood.value
                ? "bg-blue-100 border border-blue-400"
                : "bg-white border border-gray-200 hover:bg-blue-50"
            }`}
          >
            <input
              type="checkbox"
              checked={selectedMood === mood.value}
              onChange={() =>
                setSelectedMood(selectedMood === mood.value ? null : mood.value)
              }
              className="form-checkbox h-5 w-5 text-blue-500"
            />
            <span className="text-xl">{mood.emoji}</span>
            <span className="text-lg font-mono text-gray-600">{mood.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
