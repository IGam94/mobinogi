"use client";

import { useState } from "react";
import { Card, CardContent, Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/RadioButtonUnchecked";
import clsx from "clsx";

// 타입 정의

const characters = ["본캐", "부캐1", "부캐2", "부캐3"] as const;
type CharacterKey = (typeof characters)[number];

type DayKey = "주간" | "일간";
type Task = { id: number; name: string; done: boolean; count?: number; maxCount?: number };
type TaskMap = Record<DayKey, Task[]>;
type AllTasks = Record<CharacterKey, TaskMap>;

const days: DayKey[] = ["일간", "주간"];
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
  { id: 102, name: "결계 2회", done: false, count: 0, maxCount: 2 },
  { id: 103, name: "검은 구멍 3회", done: false, count: 0, maxCount: 3 },
  { id: 104, name: "오전 알바", done: false },
  { id: 105, name: "오후 알바", done: false },
  { id: 1056, name: "캐시샵(무료템/보석)", done: false },
];

const generateInitialTasks = (): AllTasks => {
  const result: AllTasks = {} as AllTasks;
  characters.forEach((char) => {
    const taskMap: TaskMap = {
      일간: dailyTasks.map((t) => ({ ...t })),
      주간: weeklyTasks.map((t) => ({ ...t })),
    };
    result[char] = taskMap;
  });
  return result;
};

export default function HomeworkBoard() {
  const [tasks, setTasks] = useState<AllTasks>(generateInitialTasks());

  const toggleDone = (char: CharacterKey, day: DayKey, id: number) => {
    const updatedTasks = tasks[char][day].map((task) => {
      if (task.id !== id) return task;

      // count 기반 태스크 처리
      if (task.maxCount) {
        if (task.count != null && task.count >= task.maxCount) {
          return {
            ...task,
            count: 0,
            done: false,
          };
        }
        const newCount = (task.count ?? 0) + 1;
        return {
          ...task,
          count: newCount,
          done: newCount >= task.maxCount,
        };
      }

      // 일반 토글
      return { ...task, done: !task.done };
    });

    setTasks({
      ...tasks,
      [char]: {
        ...tasks[char],
        [day]: updatedTasks,
      },
    });
  };

  const resetDaily = () => {
    const newTasks = generateInitialTasks();
    const updated = { ...tasks };
    characters.forEach((char) => {
      updated[char]["일간"] = newTasks[char]["일간"];
    });
    setTasks(updated);
  };
  const resetWeekly = () => {
    const newTasks = generateInitialTasks();
    const updated = { ...tasks };
    characters.forEach((char) => {
      updated[char]["주간"] = newTasks[char]["주간"];
    });
    setTasks(updated);
  };

  const getCharacterStatus = (char: CharacterKey) => {
    const dailyDone = tasks[char]["일간"].every((task) => task.done);
    const weeklyDone = tasks[char]["주간"].every((task) => task.done);

    if (dailyDone && weeklyDone) return "bg-blue-500";
    if (dailyDone) return "bg-green-500";
    return "bg-red-500";
  };

  return (
    <div className="max-w-4xl mx-auto mt-2 px-4">
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
            <h2 className="text-lg font-semibold text-center mb-2 flex items-center justify-center">
              <span className="mr-2">{char}</span>
              {/* 상태에 따라 아이콘 색상 변경 */}
              <span className={clsx("w-3 h-3 rounded-full", getCharacterStatus(char))}></span>
            </h2>
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
                      <CardContent className="flex items-center justify-between px-3 !py-4 ">
                        <span className="text-sm text-gray-800">{task.name}</span>
                        {task.count != null && task.maxCount != null && task.count < task.maxCount ? (
                          <span className="text-xs text-gray-700">
                            {task.count ?? 0}/{task.maxCount}
                          </span>
                        ) : task.done ? (
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
