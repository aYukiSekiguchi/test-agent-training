import { describe, it, expect } from "vitest";
import { setupServer, BASE_URL } from "./setup.js";

async function createTodo(data: Record<string, unknown> = { title: "元のタイトル", description: "元の説明", priority: "low" }) {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

describe("チケット03: Todo 更新 API", () => {
  setupServer();

  it("PUT /todos/:id — title を更新できる", async () => {
    const todo = await createTodo();
    const res = await fetch(`${BASE_URL}/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "更新後タイトル" }),
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.title).toBe("更新後タイトル");
    expect(body.description).toBe("元の説明"); // 変更していないフィールドは維持
  });

  it("PUT /todos/:id — completed を更新できる", async () => {
    const todo = await createTodo();
    const res = await fetch(`${BASE_URL}/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true }),
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.completed).toBe(true);
  });

  it("PUT /todos/:id — updatedAt が更新される", async () => {
    const todo = await createTodo();
    // 少し待って時刻差を確保
    await new Promise((r) => setTimeout(r, 10));
    const res = await fetch(`${BASE_URL}/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "更新" }),
    });
    const body = await res.json();
    expect(new Date(body.updatedAt).getTime()).toBeGreaterThan(new Date(todo.updatedAt).getTime());
  });

  it("PUT /todos/:id — 存在しない ID で 404", async () => {
    const res = await fetch(`${BASE_URL}/todos/9999`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "test" }),
    });
    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body.error).toBe("Todo not found");
  });

  it("PUT /todos/:id — 空文字 title で 400", async () => {
    const todo = await createTodo();
    const res = await fetch(`${BASE_URL}/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "" }),
    });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Title must not be empty");
  });

  it("PUT /todos/:id — 不正な priority で 400", async () => {
    const todo = await createTodo();
    const res = await fetch(`${BASE_URL}/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priority: "critical" }),
    });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Invalid priority");
  });
});
