"use client";

import React, { useState, useEffect } from "react"; // ✅ 这里正确导入 useEffect

const RunningPaceCalculator = () => {
  const [distance, setDistance] = useState(5);
  const [time, setTime] = useState("00:30:00");
  const [pace, setPace] = useState<string | null>(null);
  const [speed, setSpeed] = useState<string | null>(null);
  const [bpm, setBpm] = useState<number | null>(null);
  const [songs, setSongs] = useState<any[]>([]); // ✅ 添加 songs 状态变量

  const calculatePace = () => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + seconds / 60;
    const pacePerKm = totalMinutes / distance;
    const speedKmH = (distance / totalMinutes) * 60;

    setPace(pacePerKm.toFixed(2));
    setSpeed(speedKmH.toFixed(2));
    setBpm(Math.round(180 - speedKmH * 10)); // 简单的 BPM 映射
  };

  // 🎵 获取推荐歌曲
  const getSpotifySongs = async (bpm: number) => {
    const response = await fetch(`/api/spotify?bpm=${bpm}`);
    const data = await response.json();
    setSongs(data.tracks);
  };

  useEffect(() => {
    if (bpm) {
      getSpotifySongs(bpm);
    }
  }, [bpm]); // ✅ 这里修正 useEffect 的依赖项

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">🏃‍♂️ 跑步配速计算器 + 音乐推荐 🎵</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="输入跑步距离 (公里)"
          value={distance}
          onChange={(e) => setDistance(Number(e.target.value))}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="输入目标时间 (hh:mm:ss)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border p-2 w-full"
        />
        <button
          onClick={calculatePace}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          计算配速
        </button>
      </div>

      {pace && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <p>📏 配速: {pace} min/km</p>
          <p>⚡ 速度: {speed} km/h</p>
          <p>🎶 推荐 BPM: {bpm}</p>
        </div>
      )}

      {/* 显示推荐的歌曲 🎵 */}
      {songs.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">🎧 推荐歌曲：</h3>
          <ul className="list-disc ml-6">
            {songs.map((song, index) => (
              <li key={index} className="text-blue-600">
                {song.name} - {song.artist}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RunningPaceCalculator;
