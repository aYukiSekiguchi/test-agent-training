import express from "express";

const app = express();
app.use(express.json());

// --- In-memory データストア ---
export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
}

let nextId = 1;
export let todos: Todo[] = [];

/** テスト用: データをリセットする */
export function resetTodos() {
  nextId = 1;
  todos = [];
}

/** 新しい ID を発行する */
export function getNextId() {
  return nextId++;
}

// --- ヘルスチェック ---
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// --- Todo 一覧取得 ---
app.get("/todos", (_req, res) => {
  res.json({ todos });
});

// --- Todo 作成 ---
app.post("/todos", (req, res) => {
  const { title, description, priority } = req.body;

  if (!title || (typeof title === "string" && title.trim() === "")) {
    res.status(400).json({ error: "Title is required" });
    return;
  }

  const validPriorities = ["low", "medium", "high"];
  if (priority !== undefined && !validPriorities.includes(priority)) {
    res.status(400).json({ error: "Invalid priority" });
    return;
  }

  const now = new Date().toISOString();
  const todo: Todo = {
    id: getNextId(),
    title,
    description: description ?? "",
    completed: false,
    priority: priority ?? "medium",
    createdAt: now,
    updatedAt: now,
  };

  todos.push(todo);
  res.status(201).json(todo);
});

// --- Todo 個別取得 ---
app.get("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === Number(req.params.id));
  if (!todo) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }
  res.json(todo);
});

// --- Todo 更新 ---
app.put("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === Number(req.params.id));
  if (!todo) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }

  const { title, description, completed, priority } = req.body;

  if (title !== undefined && (typeof title !== "string" || title.trim() === "")) {
    res.status(400).json({ error: "Title must not be empty" });
    return;
  }

  const validPriorities = ["low", "medium", "high"];
  if (priority !== undefined && !validPriorities.includes(priority)) {
    res.status(400).json({ error: "Invalid priority" });
    return;
  }

  if (title !== undefined) todo.title = title;
  if (description !== undefined) todo.description = description;
  if (completed !== undefined) todo.completed = completed;
  if (priority !== undefined) todo.priority = priority;
  todo.updatedAt = new Date().toISOString();

  res.json(todo);
});

// --- Todo 削除 ---
app.delete("/todos/:id", (req, res) => {
  const index = todos.findIndex((t) => t.id === Number(req.params.id));
  if (index === -1) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }
  todos.splice(index, 1);
  res.status(204).send();
});

export { app };

// 直接実行時のみサーバを起動
const isDirectRun =
  process.argv[1] &&
  new URL(import.meta.url).pathname === process.argv[1];

if (isDirectRun) {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}
