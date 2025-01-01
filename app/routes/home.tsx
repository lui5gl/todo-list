import { useEffect, useState } from "react";
import Card from "./components/card";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export function meta() {
  return [
    { title: "Todo List" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
    }
  };

  const updateTask = (id: string, updatedTitle: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, title: updatedTitle } : task,
    );
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
    setTasks(updatedTasks);
  };

  return (
    <main className="flex min-h-screen justify-center bg-neutral-100 p-10">
      <section className="flex w-full max-w-xl flex-col">
        <h1 className="mb-5 text-3xl font-bold">Today</h1>
        {tasks.map((task) => (
          <div key={task.id}>
            <hr className="border-b" />
            <Card
              title={task.title}
              checked={task.completed}
              onTitleChange={(title) => updateTask(task.id, title)}
              onCheckChange={() => toggleTaskCompletion(task.id)}
            />
          </div>
        ))}
        <div className="flex items-center">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="flex-1 rounded-sm px-2 py-1 focus:outline-none"
            placeholder="New task title"
          />
          <button
            onClick={addTask}
            className="rounded-sm bg-neutral-800 px-3 py-1 text-neutral-100"
          >
            Add
          </button>
        </div>
      </section>
    </main>
  );
}
