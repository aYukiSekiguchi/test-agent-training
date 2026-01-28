import { describe, it, expect } from "vitest";
import { setupServer, BASE_URL } from "./setup.js";

describe("チケット01: Todo 一覧取得 API", () => {
  setupServer();

  it("GET /todos — 初期状態で空配列が返る", async () => {
    const res = await fetch(`${BASE_URL}/todos`);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ todos: [] });
  });

  it("GET /todos — 登録済みデータが返る", async () => {
    // まず1件作成
    await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "テスト" }),
    });

    const res = await fetch(`${BASE_URL}/todos`);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.todos).toHaveLength(1);
    expect(body.todos[0].title).toBe("テスト");
  });

  it("GET /todos/:id — 存在する Todo を取得できる", async () => {
    const createRes = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "個別取得テスト" }),
    });
    const created = await createRes.json();

    const res = await fetch(`${BASE_URL}/todos/${created.id}`);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.title).toBe("個別取得テスト");
    expect(body.id).toBe(created.id);
  });

  it("GET /todos/:id — 存在しない ID で 404 が返る", async () => {
    const res = await fetch(`${BASE_URL}/todos/9999`);
    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body.error).toBe("Todo not found");
  });
});
