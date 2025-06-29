import { useCallback, useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { RecordData } from "../../type/RecordData";
import { useNavigate } from "react-router-dom";

export const RecordView = () => {

  //{ date: "YYYY-MM-DD", minutes: 数値 }で記録表示に使う配列を用意
  const [graphData, setGraphData] = useState<{ date: string; minutes: number }[]>([]);
  const navigate = useNavigate();

  const onClickBack = useCallback(() => {
    navigate("/")
  }, [])


  useEffect(() => {
    const raw = JSON.parse(localStorage.getItem("records") || "{}") as {
      [key: string]: RecordData
    };

    // Object.entries(オブジェクト):オブジェクトを [キー, 値] のペアの配列に変換する
    //グラフに表示するための配列オブジェクトに変換
    const formatted = Object.entries(raw).map(([key, value]) => ({
      date: key,
      minutes: Math.floor(value.totalTimeSec / 60),
    }));

    // 日付順に並べる（新しい順なら.reverse()つけてもOK）
    formatted.sort((a, b) => a.date.localeCompare(b.date));
    setGraphData(formatted);
  }, []);

  return (
    <>
      <div className="pt-7 min-h-screen flex flex-col items-center justify-center w-full h-80 p-4 bg-teal-50">
        <h2 className="text-3xl font-mono text-teal-600 mb-8"> 努力の記録</h2>
        <ResponsiveContainer width="100%" height="50%">
          <BarChart data={graphData} barSize={40}>
            <XAxis dataKey="date" stroke="#319795" />
            <YAxis stroke="#319795" label={{ value: "分", angle: -90, position: "insideLeft", fill: "#319795" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#e6fffa", borderColor: "#81e6d9", borderRadius: 10 }}
              cursor={{ fill: "rgba(56, 178, 172, 0.1)" }}
            />
            <Bar
              dataKey="minutes"
              fill="#38b2ac"
              radius={[10, 10, 0, 0]}
              isAnimationActive={true}
            />
          </BarChart>
        </ResponsiveContainer>
        <button className="mt-10 bg-white border border-emerald-300 px-8 py-5 rounded-full shadow text-teal-700 hover:bg-teal-100"
        onClick = {onClickBack}
        >
          ホーム画面に戻る
        </button>
        </div>

      </>

      );
};
