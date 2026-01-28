# Todo 作成 API の実装

## 概要
新しい Todo を作成する `POST /todos` エンドポイントを実装してください。

## エンドポイント仕様

### `POST /todos`

#### リクエストボディ

```json
{
  "title": "牛乳を買う",
  "description": "低脂肪乳 1L",
  "priority": "medium"
}
```

| フィールド | 型 | 必須 | デフォルト | 説明 |
|---|---|---|---|---|
| title | string | はい | — | Todo のタイトル (空文字不可) |
| description | string | いいえ | `""` | 詳細説明 |
| priority | `"low"` \| `"medium"` \| `"high"` | いいえ | `"medium"` | 優先度 |

#### レスポンス

- **201 Created** — 作成された Todo オブジェクトを返す
- **400 Bad Request** — バリデーションエラー時 `{ "error": "Title is required" }`

## バリデーションルール
1. `title` が未指定または空文字の場合は 400 を返す
2. `priority` が指定されていて `"low"`, `"medium"`, `"high"` 以外の場合は 400 を返す
   - エラーメッセージ: `{ "error": "Invalid priority" }`

## 実装上の注意
- `id` は `getNextId()` で採番してください。
- `completed` は初期値 `false` としてください。
- `createdAt`, `updatedAt` は作成時の ISO 8601 形式の日時文字列を設定してください。

## 受け入れ基準
- [ ] 正常なリクエストで Todo が作成され 201 が返る
- [ ] title 未指定で 400 が返る
- [ ] 不正な priority で 400 が返る
