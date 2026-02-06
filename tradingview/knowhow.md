# TradingView チャートライブラリ理解のためのノウハウ

## 1. 全体像を理解する

### チャートライブラリの構成要素

TradingViewチャートライブラリは主に以下の3つのコンポーネントで構成されています：

1. **チャートライブラリ本体** - JavaScript/TypeScriptで書かれたフロントエンドライブラリ
2. **Datafeed API** - データソースとの通信インターフェース
3. **Widget API** - チャートを操作するためのプログラマティックAPI

### データ取得の2つの方法

| 方法 | 説明 | 適用場面 |
|------|------|----------|
| **UDF (Universal Data Feed)** | HTTPベースのシンプルなプロトコル | 小〜中規模、シンプルな実装 |
| **JS API** | JavaScriptで直接Datafeed APIを実装 | 複雑な要件、WebSocket対応など |

## 2. UDF実装のステップバイステップ

### Step 1: 最小構成から始める

まずは以下の3エンドポイントだけで動かしてみる：

```
GET /config          → サーバー設定を返す
GET /symbols?symbol= → シンボル情報を返す
GET /history         → OHLCVデータを返す
```

### Step 2: レスポンス形式を正確に

特に `/history` のレスポンスは配列形式に注意：

```json
{
  "s": "ok",
  "t": [1640995200, 1641081600],  // タイムスタンプ配列
  "o": [100.0, 101.0],            // 始値配列
  "h": [105.0, 103.0],            // 高値配列
  "l": [99.0, 100.5],             // 安値配列
  "c": [103.0, 102.0],            // 終値配列
  "v": [10000, 8000]              // 出来高配列
}
```

### Step 3: よくあるエラーと対処法

| 症状 | 原因 | 対処 |
|------|------|------|
| チャートが真っ白 | CORSエラー | `Access-Control-Allow-Origin: *` を追加 |
| データが表示されない | タイムスタンプがミリ秒 | 秒単位に変換（÷1000） |
| 価格表示がおかしい | pricescaleの設定ミス | シンボルの小数桁数に合わせる |
| 時間軸がずれる | timezone設定ミス | 正しいIANAタイムゾーンを指定 |

## 3. デバッグのコツ

### ブラウザのネットワークタブを活用

1. DevTools > Network を開く
2. XHR/Fetchでフィルタ
3. 各リクエストのURLとレスポンスを確認

### ログ出力を仕込む

バックエンド側で各エンドポイントへのリクエストをログ出力すると、
チャートライブラリがどのような順序で何を要求しているかがわかる。

```javascript
app.use((req, res, next) => {
  console.log(`[UDF] ${req.method} ${req.url}`);
  next();
});
```

## 4. 公式ドキュメントの読み方

### 重要なページ

1. **[Connecting Data](https://www.tradingview.com/charting-library-docs/latest/connecting_data/)**
   - データ接続の概要

2. **[UDF](https://www.tradingview.com/charting-library-docs/latest/connecting_data/UDF/)**
   - UDFプロトコルの詳細仕様

3. **[Datafeed API](https://www.tradingview.com/charting-library-docs/latest/connecting_data/Datafeed-API/)**
   - JS APIの詳細

4. **[Symbol Info](https://www.tradingview.com/charting-library-docs/latest/core_concepts/Symbol-Info/)**
   - シンボル情報のフィールド詳細

### 読解のポイント

- `SymbolInfo` オブジェクトの各フィールドの意味を把握する
- `supports_*` フラグで機能の有効/無効を制御できる
- サンプル実装（GitHubで公開されているもの）を参照する

## 5. 実装パターン

### パターン1: 静的データ（ヒストリカルのみ）

- リアルタイム更新不要
- /history でデータベースから取得
- シンプルだが、最新価格の反映に再読み込みが必要

### パターン2: ポーリング更新

- setIntervalでフロントエンドから定期的にリクエスト
- 実装は簡単だがサーバー負荷が高い
- UDFでも実現可能

### パターン3: WebSocket + JS API

- リアルタイム更新が必要な場合
- UDFではなくJS APIを直接実装
- `subscribeBars` / `unsubscribeBars` を実装

## 6. よくある質問（FAQ）

### Q: UDFとJS APIどちらを使うべき？

**A:** 以下の基準で判断：
- リアルタイム更新が必要 → JS API
- シンプルに始めたい → UDF
- 既存のREST APIがある → UDF
- 複雑なデータ変換が必要 → JS API

### Q: supported_resolutionsは何を指定すべき？

**A:** データソースが実際に持っている時間足のみを指定。
例えば日足データしかない場合は `["D"]` のみ。

### Q: timezoneはどう設定する？

**A:** データソースのタイムゾーンを指定。
- 東京証券取引所 → `"Asia/Tokyo"`
- NYSE → `"America/New_York"`
- 暗号通貨（UTC） → `"Etc/UTC"`

### Q: セッション（session）のフォーマットは？

**A:** `"HHMM-HHMM"` 形式。複数セッションは `,` で区切る。
- 日本株: `"0900-1130,1230-1500"`
- 米国株: `"0930-1600"`
- 24時間: `"24x7"`

## 7. 参考リソース

### 公式

- [TradingView Charting Library Documentation](https://www.tradingview.com/charting-library-docs/)
- [TradingView GitHub Examples](https://github.com/tradingview)

### コミュニティ実装例

- [tradingview-udf-binance-node](https://github.com/bergusman/tradingview-udf-binance-node) - Binance用UDF実装
- [tradingview-udf-provider](https://github.com/Marfusios/tradingview-udf-provider) - C#/ASP.NET Core用

### デバッグツール

- ブラウザのDevTools（Network, Console）
- Postman/Insomnia（APIテスト）
- [JSONLint](https://jsonlint.com/)（レスポンス検証）

## 8. チェックリスト

実装時に確認すべき項目：

- [ ] CORSヘッダーが正しく設定されているか
- [ ] タイムスタンプが秒単位になっているか
- [ ] pricescaleが適切に設定されているか
- [ ] timezoneがIANA形式で正しいか
- [ ] supported_resolutionsがデータソースと一致しているか
- [ ] /historyのレスポンスで配列の長さが揃っているか
- [ ] エラー時に適切なレスポンス（`{"s": "error"}`等）を返しているか

## 9. Datafeed APIの要点（JS API）

### Datafeed APIとは

Charting Library がデータを取得するための JavaScript インターフェース。UDF のような HTTP プロトコルではなく、**フロントエンドが直接 datafeed オブジェクトのメソッドを呼び出す**方式。

### 基本の呼び出しフロー

1. **onReady** で datafeed の機能一覧（`supports_*`）と対応時間足を返す
2. **resolveSymbol** でシンボル情報（`SymbolInfo`）を返す
3. **getBars** で履歴データ（OHLCV）を返す
4. **subscribeBars / unsubscribeBars** でリアルタイム更新

### 必須メソッドの役割

| メソッド | 役割 | 重要ポイント |
|---|---|---|
| `onReady(callback)` | 初期化時に設定を返す | `supports_search` や `supported_resolutions` を正確に |
| `resolveSymbol(symbolName, onResolve, onError)` | 銘柄情報の解決 | `pricescale`, `session`, `timezone` を正しく設定 |
| `getBars(symbolInfo, resolution, periodParams, onHistory, onError)` | 過去データ取得 | `periodParams.from/to` は UNIX 秒、`noData` を返せる |
| `subscribeBars(symbolInfo, resolution, onRealtime, subscriberUID, onResetCache)` | リアルタイム購読 | 価格更新のタイミングを一定にする |
| `unsubscribeBars(subscriberUID)` | リアルタイム購読解除 | `subscriberUID` をキーに解除 |

※ `searchSymbols` や `getServerTime` は要件に応じて実装。

### 実装の勘所

- **時間の単位は必ず秒**：ミリ秒だとチャートが崩れる
- **バー配列の長さを揃える**：`t/o/h/l/c/v` の要素数は完全一致
- **noData を活用**：データがない場合は `onHistory([], { noData: true })`
- **supports_* の整合性**：未実装の機能は false にする
- **キャッシュのリセット**：銘柄切替や再購読時は `onResetCache` を適切に呼ぶ

### エラー時の振る舞い

- `onError` にメッセージを渡す（例: "Symbol not found"）
- 一時的なエラーはリトライ戦略を検討
- Charting Library 側の挙動はコンソールログで確認

### 公式ドキュメントの読み解き方

- **Datafeed API** は JS API の最重要ページ
- `SymbolInfo` と `HistoryData` の型定義を把握すると理解が進む
- 公式サンプルの datafeed 実装を読むと全体像が掴める
