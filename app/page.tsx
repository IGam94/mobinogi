"use client";

import { useState } from "react";
import { Card, CardContent, Button, Tabs, Tab } from "@mui/material";
import CheckIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/RadioButtonUnchecked";
import clsx from "clsx";

// 타입 정의

const characters = ["본캐", "부캐1", "부캐2", "부캐3"] as const;
type CharacterKey = (typeof characters)[number];

type DayKey = "주간" | "일간";
type Task = { id: number; name: string; done: boolean };
type TaskMap = Record<DayKey, Task[]>;
type AllTasks = Record<CharacterKey, TaskMap>;

const days: DayKey[] = ["주간", "일간"];
const weeklyTasks: Task[] = [
  { id: 1, name: "주간 재료 구매", done: false },
  { id: 2, name: "마물 증표 교환", done: false },
  { id: 3, name: "임무 게시판", done: false },
  { id: 4, name: "필드 보스", done: false },
  { id: 5, name: "어비스", done: false },
  { id: 6, name: "레이드", done: false },
];

const dailyTasks: Task[] = [
  { id: 101, name: "물물 교환", done: false },
  { id: 102, name: "결계 2회", done: false },
  { id: 103, name: "검은 구멍 3회", done: false },
  { id: 104, name: "오전 알바", done: false },
  { id: 105, name: "오후 알바", done: false },
];

const generateInitialTasks = (): AllTasks => {
  const result: AllTasks = {} as AllTasks;
  characters.forEach((char) => {
    const taskMap: TaskMap = {
      주간: weeklyTasks.map((t) => ({ ...t })),
      일간: dailyTasks.map((t) => ({ ...t })),
    };
    result[char] = taskMap;
  });
  return result;
};

export default function HomeworkBoard() {
  const [tasks, setTasks] = useState<AllTasks>(generateInitialTasks());

  const toggleDone = (char: CharacterKey, day: DayKey, id: number) => {
    const updatedCharTasks = {
      ...tasks[char],
      [day]: tasks[char][day].map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
    };
    setTasks({ ...tasks, [char]: updatedCharTasks });
  };

  const resetWeekly = () => {
    const newTasks = generateInitialTasks();
    const updated = { ...tasks };
    characters.forEach((char) => {
      updated[char]["주간"] = newTasks[char]["주간"];
    });
    setTasks(updated);
  };

  const resetDaily = () => {
    const newTasks = generateInitialTasks();
    const updated = { ...tasks };
    characters.forEach((char) => {
      updated[char]["일간"] = newTasks[char]["일간"];
    });
    setTasks(updated);
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">🧙 마비노기 숙제표</h1>

      <div className="flex justify-end gap-2 mb-4">
        <Button variant="outlined" onClick={resetWeekly} color="primary">
          주간 초기화
        </Button>
        <Button variant="outlined" onClick={resetDaily} color="secondary">
          일간 초기화
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {characters.map((char) => (
          <div key={char}>
            <h2 className="text-lg font-semibold text-center mb-2">{char}</h2>
            {days.map((day) => (
              <div key={day} className="mb-4">
                <div className="font-medium text-gray-600 mb-1">{day}</div>
                <div className="space-y-2">
                  {tasks[char][day]?.map((task) => (
                    <Card
                      key={task.id}
                      onClick={() => toggleDone(char, day, task.id)}
                      className={clsx(
                        "transition-all cursor-pointer",
                        "border border-gray-200 rounded-md",
                        task.done ? "bg-green-50" : "bg-white"
                      )}
                    >
                      <CardContent className="flex items-center justify-between px-3 py-2">
                        <span className="text-sm text-gray-800">{task.name}</span>
                        {task.done ? (
                          <CheckIcon fontSize="small" className="text-green-500" />
                        ) : (
                          <CloseIcon fontSize="small" className="text-gray-400" />
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
