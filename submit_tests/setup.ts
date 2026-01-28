import { type Server } from "http";
import { app, resetTodos } from "../src/index.js";
import { beforeEach, afterAll } from "vitest";

let server: Server;
export const BASE_URL = "http://localhost:3099";

export function setupServer() {
  beforeEach(() => {
    resetTodos();
  });

  server = app.listen(3099);

  afterAll(() => {
    server.close();
  });
}
