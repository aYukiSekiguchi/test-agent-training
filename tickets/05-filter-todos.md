# Todo フィルタリング・検索 API の実装

## 概要
`GET /todos` にクエリパラメータを追加し、Todo のフィルタリングと検索をできるようにしてください。

## エンドポイント仕様

### `GET /todos?completed=true&priority=high&q=牛乳`

#### クエリパラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| completed | `"true"` \| `"false"` | 完了状態でフィルタ |
| priority | `"low"` \| `"medium"` \| `"high"` | 優先度でフィルタ |
| q | string | title または description に対する部分一致検索 (大文字小文字を区別しない) |

すべてのパラメータは任意で、複数指定した場合は AND 条件として動作します。

#### レスポンス

- **200 OK** — フィルタ条件に一致する Todo の配列

```json
{
  "todos": [ ... ]
}
```

## 実装上の注意
- チケット 01 で実装した `GET /todos` を拡張する形で実装してください。
- クエリパラメータが指定されていない場合は全件返す (既存の動作を維持)。
- `q` パラメータの検索は `title` と `description` の両方を対象とし、いずれかに一致すれば結果に含めてください。

## 受け入れ基準
- [ ] `completed=true` で完了済みの Todo のみ返る
- [ ] `priority=high` で高優先度の Todo のみ返る
- [ ] `q=keyword` で title または description に keyword を含む Todo のみ返る
- [ ] 複数パラメータの AND 条件が動作する
- [ ] パラメータなしの場合は全件返る (既存動作が壊れない)
