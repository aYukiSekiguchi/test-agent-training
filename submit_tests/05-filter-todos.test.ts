import { describe, it, expect } from "vitest";
import { setupServer, BASE_URL } from "./setup.js";

async function seedTodos() {
  const items = [
    { title: "牛乳を買う", description: "低脂肪乳", priority: "high", },
    { title: "レポート作成", description: "月次レポート", priority: "medium" },
    { title: "散歩する", description: "公園まで", priority: "low" },
  ];
  for (const item of items) {
    await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
  }
  // 1件目を完了にする
  await fetch(`${BASE_URL}/todos/1`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: true }),
  });
}

describe("チケット05: Todo フィルタリング・検索 API", () => {
  setupServer();

  it("GET /todos?completed=true — 完了済みのみ返る", async () => {
    await seedTodos();
    const res = await fetch(`${BASE_URL}/todos?completed=true`);
    const body = await res.json();
    expect(body.todos).toHaveLength(1);
    expect(body.todos[0].title).toBe("牛乳を買う");
  });

  it("GET /todos?completed=false — 未完了のみ返る", async () => {
    await seedTodos();
    const res = await fetch(`${BASE_URL}/todos?completed=false`);
    const body = await res.json();
    expect(body.todos).toHaveLength(2);
  });

  it("GET /todos?priority=high — 高優先度のみ返る", async () => {
    await seedTodos();
    const res = await fetch(`${BASE_URL}/todos?priority=high`);
    const body = await res.json();
    expect(body.todos).toHaveLength(1);
    expect(body.todos[0].priority).toBe("high");
  });

  it("GET /todos?q=レポート — タイトルまたは説明に一致するもの", async () => {
    await seedTodos();
    const res = await fetch(`${BASE_URL}/todos?q=${encodeURIComponent("レポート")}`);
    const body = await res.json();
    expect(body.todos).toHaveLength(1);
    expect(body.todos[0].title).toBe("レポート作成");
  });

  it("GET /todos?q=... — description での一致も返る", async () => {
    await seedTodos();
    const res = await fetch(`${BASE_URL}/todos?q=${encodeURIComponent("公園")}`);
    const body = await res.json();
    expect(body.todos).toHaveLength(1);
    expect(body.todos[0].title).toBe("散歩する");
  });

  it("GET /todos?completed=false&priority=medium — AND 条件", async () => {
    await seedTodos();
    const res = await fetch(`${BASE_URL}/todos?completed=false&priority=medium`);
    const body = await res.json();
    expect(body.todos).toHaveLength(1);
    expect(body.todos[0].title).toBe("レポート作成");
  });

  it("GET /todos — パラメータなしで全件返る", async () => {
    await seedTodos();
    const res = await fetch(`${BASE_URL}/todos`);
    const body = await res.json();
    expect(body.todos).toHaveLength(3);
  });
});
