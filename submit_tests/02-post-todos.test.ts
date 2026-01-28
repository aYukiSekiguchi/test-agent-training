import { describe, it, expect } from "vitest";
import { setupServer, BASE_URL } from "./setup.js";

describe("チケット02: Todo 作成 API", () => {
  setupServer();

  it("POST /todos — 正常に作成でき 201 が返る", async () => {
    const res = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "新しいTodo", description: "説明文", priority: "high" }),
    });
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.id).toBe(1);
    expect(body.title).toBe("新しいTodo");
    expect(body.description).toBe("説明文");
    expect(body.priority).toBe("high");
    expect(body.completed).toBe(false);
    expect(body.createdAt).toBeTruthy();
    expect(body.updatedAt).toBeTruthy();
  });

  it("POST /todos — description と priority のデフォルト値", async () => {
    const res = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "最小限" }),
    });
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.description).toBe("");
    expect(body.priority).toBe("medium");
  });

  it("POST /todos — title 未指定で 400 が返る", async () => {
    const res = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Title is required");
  });

  it("POST /todos — title 空文字で 400 が返る", async () => {
    const res = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "" }),
    });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Title is required");
  });

  it("POST /todos — 不正な priority で 400 が返る", async () => {
    const res = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "テスト", priority: "urgent" }),
    });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Invalid priority");
  });
});
