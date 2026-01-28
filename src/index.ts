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

// ============================================================
// TODO: 各チケットの REST API エンドポイントをここに追加してください
// ============================================================

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
