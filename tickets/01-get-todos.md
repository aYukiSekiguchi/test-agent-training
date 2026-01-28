# Todo 一覧取得 API の実装

## 概要
登録されている Todo の一覧を取得する `GET /todos` エンドポイントを実装してください。

## エンドポイント仕様

### `GET /todos`

#### レスポンス

- **200 OK**

```json
{
  "todos": [
    {
      "id": 1,
      "title": "牛乳を買う",
      "description": "低脂肪乳 1L",
      "completed": false,
      "priority": "medium",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

### `GET /todos/:id`

#### パスパラメータ
| パラメータ | 型 | 説明 |
|---|---|---|
| id | number | Todo の ID |

#### レスポンス

- **200 OK** — 該当する Todo オブジェクトを返す
- **404 Not Found** — `{ "error": "Todo not found" }`

## 実装上の注意
- データは `src/index.ts` で定義されているインメモリ配列 `todos` を使用してください。
- レスポンスの Content-Type は `application/json` としてください。

## 受け入れ基準
- [ ] `GET /todos` で全件取得できる
- [ ] `GET /todos/:id` で 1 件取得できる
- [ ] 存在しない ID を指定すると 404 が返る
