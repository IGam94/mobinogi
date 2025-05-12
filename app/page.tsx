"use client";

import { useState } from "react";
import { Card, CardContent } from "@mui/material";
import { Tabs, Tab } from "@mui/material";
import CheckIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/RadioButtonUnchecked";
import clsx from "clsx";

type DayKey = "주간" | "월" | "화" | "수" | "목" | "금" | "토" | "일";

type Task = {
  id: number;
  name: string;
  done: boolean;
};

type TaskMap = Record<DayKey, Task[]>;

const days = ["주간", "월", "화", "수", "목", "금", "토", "일"];

const dummyData = {
  주간: [
    { id: 11, name: "주간 재료 구매", done: false },
    { id: 12, name: "마물 증표 교환", done: false },
    { id: 13, name: "임무 게시판", done: false },
    { id: 14, name: "필드 보스", done: false },
    { id: 15, name: "어비스", done: false },
    { id: 16, name: "레이드", done: false },
  ],
  월: [
    { id: 21, name: "물물 교환", done: false },
    { id: 22, name: "결계 2회", done: false },
    { id: 23, name: "검은 구멍 3회", done: false },
    { id: 24, name: "오전 알바", done: false },
    { id: 25, name: "오후 알바", done: false },
  ],
  화: [
    { id: 31, name: "물물 교환", done: false },
    { id: 32, name: "결계 2회", done: false },
    { id: 33, name: "검은 구멍 3회", done: false },
    { id: 34, name: "오전 알바", done: false },
    { id: 35, name: "오후 알바", done: false },
  ],
  수: [
    { id: 41, name: "물물 교환", done: false },
    { id: 42, name: "결계 2회", done: false },
    { id: 43, name: "검은 구멍 3회", done: false },
    { id: 44, name: "오전 알바", done: false },
    { id: 45, name: "오후 알바", done: false },
  ],
  목: [
    { id: 51, name: "물물 교환", done: false },
    { id: 52, name: "결계 2회", done: false },
    { id: 53, name: "검은 구멍 3회", done: false },
    { id: 54, name: "오전 알바", done: false },
    { id: 55, name: "오후 알바", done: false },
  ],
  금: [
    { id: 61, name: "물물 교환", done: false },
    { id: 62, name: "결계 2회", done: false },
    { id: 63, name: "검은 구멍 3회", done: false },
    { id: 64, name: "오전 알바", done: false },
    { id: 65, name: "오후 알바", done: false },
  ],
  토: [
    { id: 71, name: "물물 교환", done: false },
    { id: 72, name: "결계 2회", done: false },
    { id: 73, name: "검은 구멍 3회", done: false },
    { id: 74, name: "오전 알바", done: false },
    { id: 75, name: "오후 알바", done: false },
  ],
  일: [
    { id: 81, name: "물물 교환", done: false },
    { id: 82, name: "결계 2회", done: false },
    { id: 83, name: "검은 구멍 3회", done: false },
    { id: 84, name: "오전 알바", done: false },
    { id: 85, name: "오후 알바", done: false },
  ],
};

export default function GameHomeworkBoard() {
  const [selectedDay, setSelectedDay] = useState<DayKey>("월");
  const [tasks, setTasks] = useState<TaskMap>(dummyData);

  const toggleDone = (day: DayKey, id: number) => {
    const updatedTasks: TaskMap = {
      ...tasks,
      [day]: tasks[day].map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
    };
    setTasks(updatedTasks);
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">🧙 마비노기 모바일 숙제표</h1>

      <Tabs
        value={selectedDay}
        onChange={(e, newVal) => setSelectedDay(newVal)}
        variant="scrollable"
        scrollButtons="auto"
        textColor="primary"
        indicatorColor="primary"
        className="mb-4"
      >
        {days.map((day) => (
          <Tab key={day} label={day} value={day} />
        ))}
      </Tabs>

      <div className="space-y-3">
        {tasks[selectedDay]?.length > 0 ? (
          tasks[selectedDay].map((task) => (
            <Card
              key={task.id}
              className={clsx(
                "transition-all duration-150",
                "border border-gray-200",
                "hover:shadow-md cursor-pointer",
                "rounded-md"
              )}
              onClick={() => toggleDone(selectedDay, task.id)}
            >
              <CardContent className="flex items-center justify-between px-4 py-3">
                <div className="text-sm sm:text-base font-medium text-gray-800">{task.name}</div>
                <div className={task.done ? "text-green-500" : "text-gray-400"}>
                  {task.done ? <CheckIcon fontSize="small" /> : <CloseIcon fontSize="small" />}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 text-center py-6 text-sm sm:text-base">숙제가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
