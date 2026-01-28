import { describe, it, expect } from "vitest";
import { setupServer, BASE_URL } from "./setup.js";

describe("チケット04: Todo 削除 API", () => {
  setupServer();

  it("DELETE /todos/:id — 正常に削除でき 204 が返る", async () => {
    // 作成
    const createRes = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "削除対象" }),
    });
    const todo = await createRes.json();

    // 削除
    const res = await fetch(`${BASE_URL}/todos/${todo.id}`, { method: "DELETE" });
    expect(res.status).toBe(204);

    // 削除後に取得すると 404
    const getRes = await fetch(`${BASE_URL}/todos/${todo.id}`);
    expect(getRes.status).toBe(404);
  });

  it("DELETE /todos/:id — 存在しない ID で 404 が返る", async () => {
    const res = await fetch(`${BASE_URL}/todos/9999`, { method: "DELETE" });
    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body.error).toBe("Todo not found");
  });

  it("DELETE /todos/:id — 削除後に一覧から消える", async () => {
    const createRes = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "消えるTodo" }),
    });
    const todo = await createRes.json();

    await fetch(`${BASE_URL}/todos/${todo.id}`, { method: "DELETE" });

    const listRes = await fetch(`${BASE_URL}/todos`);
    const body = await listRes.json();
    expect(body.todos).toHaveLength(0);
  });
});
