# Todo 更新 API の実装

## 概要
既存の Todo を更新する `PUT /todos/:id` エンドポイントを実装してください。

## エンドポイント仕様

### `PUT /todos/:id`

#### パスパラメータ
| パラメータ | 型 | 説明 |
|---|---|---|
| id | number | 更新対象の Todo ID |

#### リクエストボディ

部分更新 (PATCH 的な動作) をサポートします。指定されたフィールドのみ更新されます。

```json
{
  "title": "豆乳を買う",
  "completed": true,
  "priority": "high"
}
```

| フィールド | 型 | 必須 | 説明 |
|---|---|---|---|
| title | string | いいえ | Todo のタイトル (空文字不可) |
| description | string | いいえ | 詳細説明 |
| completed | boolean | いいえ | 完了状態 |
| priority | `"low"` \| `"medium"` \| `"high"` | いいえ | 優先度 |

#### レスポンス

- **200 OK** — 更新後の Todo オブジェクトを返す
- **400 Bad Request** — バリデーションエラー時
- **404 Not Found** — `{ "error": "Todo not found" }`

## バリデーションルール
1. `title` が空文字の場合は 400 `{ "error": "Title must not be empty" }`
2. `priority` が不正な値の場合は 400 `{ "error": "Invalid priority" }`

## 実装上の注意
- 更新時に `updatedAt` を現在日時に更新してください。
- リクエストボディに含まれないフィールドは変更しないでください。

## 受け入れ基準
- [ ] 正常なリクエストで Todo が更新され 200 が返る
- [ ] 部分更新ができる (title だけ変更等)
- [ ] 存在しない ID で 404 が返る
- [ ] 空文字の title で 400 が返る
- [ ] `updatedAt` が更新される
