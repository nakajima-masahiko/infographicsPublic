# Phase 4: Indicator Registration API 仕様（Custom Indicator Registration API）

本ドキュメントは、`fxcharts/technical-indicators-demo.html` を参照実装として、カスタム指標を拡張可能にする **Indicator Registration API** の Phase 4 仕様を定義します。

---

## 1. Indicator Registration API: 登録関数シグネチャ

### 1.1 公開 API

```ts
registerIndicator(definition: IndicatorDefinition): RegisteredIndicator
```

- `definition`: 登録対象の指標定義。
- 戻り値 `RegisteredIndicator`:
  - `id: string`
  - `name: string`
  - `version?: string`
  - `unregister(): void`（登録解除）

### 1.2 引数スキーマ（`IndicatorDefinition`）

```ts
interface IndicatorDefinition {
  id: string;
  name: string;
  description?: string;
  version?: string;
  inputs: IndicatorInput[];
  outputs: IndicatorOutput[];
  defaults?: Record<string, unknown>;
  calculate: (ctx: CalculateContext) => CalculateResult;
  hooks?: IndicatorHooks;
  tags?: string[];
}

interface IndicatorInput {
  key: string;
  type: 'number' | 'boolean' | 'string' | 'priceSeries' | 'timeSeries';
  required?: boolean; // 省略時 true
  min?: number;
  max?: number;
  enum?: string[];
  description?: string;
}

interface IndicatorOutput {
  key: string;
  type: 'numberSeries' | 'signalSeries' | 'bandSeries';
  label?: string;
  color?: string;
}

interface CalculateContext {
  candles: Array<{ time: string; open: number; high: number; low: number; close: number }>;
  params: Record<string, unknown>;
  previous?: Record<string, unknown>; // 前回計算キャッシュ
}

type CalculateResult = {
  values: Record<string, Array<number | null>>;
  cache?: Record<string, unknown>;
};

interface IndicatorHooks {
  onInit?: (ctx: LifecycleContext) => void;
  onUpdate?: (ctx: LifecycleContext) => void;
  onDispose?: (ctx: LifecycleContext) => void;
}

interface LifecycleContext {
  indicatorId: string;
  symbol: string;
  timeframe: string;
  params: Record<string, unknown>;
}
```

---

## 2. 必須フィールド（id, name, inputs, outputs, calculate）

`registerIndicator(definition)` は、最低限以下を必須とします。

- `id: string`
  - システム内で一意な識別子。
  - 推奨フォーマット: `vendor.indicatorName`（例: `custom.sma`）。
- `name: string`
  - UI 表示名。
- `inputs: IndicatorInput[]`
  - 1件以上を推奨。
  - 指標パラメータや入力系列を宣言。
- `outputs: IndicatorOutput[]`
  - 1件以上必須。
  - 描画対象系列（ライン、シグナル、バンド）を宣言。
- `calculate(ctx): CalculateResult`
  - 計算ロジック本体。
  - `outputs[].key` と `values` のキー整合が必須。

---

## 3. バリデーションルール

登録時（`registerIndicator` 呼び出し時）に以下を検証します。

### 3.1 重複 ID

- 既に同一 `id` が登録済みの場合は失敗。
- エラー例:
  - `DuplicateIndicatorIdError: indicator id "custom.sma" already exists`

### 3.2 型不一致

- `inputs[].type` / `outputs[].type` が定義済み enum 以外の場合は失敗。
- `calculate` が関数でない場合は失敗。
- `calculate` 実行結果 `values` が配列でない、または数値/`null` 以外を含む場合は失敗。
- エラー例:
  - `InvalidFieldTypeError: outputs[0].type must be one of ['numberSeries','signalSeries','bandSeries']`

### 3.3 必須欠落

- 必須フィールド（`id`, `name`, `inputs`, `outputs`, `calculate`）の欠落時は失敗。
- `outputs` が空配列の場合は失敗。
- エラー例:
  - `MissingRequiredFieldError: definition.calculate is required`

### 3.4 整合性チェック

- `outputs[].key` が重複していたら失敗。
- `calculate(...).values` に `outputs` 未定義キーが含まれていたら失敗。
- `outputs` 定義キーが `values` に存在しない場合は失敗。

---

## 4. ライフサイクル連携点（初期化・更新・破棄）

**Indicator Registration API** はチャートのライフサイクルと連携するため、以下フックを提供します。

- `hooks.onInit(ctx)`
  - 指標インスタンス初期化時に 1 回呼び出し。
  - 利用例: 初期キャッシュ、外部リソース確保。
- `hooks.onUpdate(ctx)`
  - データ更新・パラメータ更新のたびに呼び出し。
  - 利用例: 増分計算の準備、状態更新。
- `hooks.onDispose(ctx)`
  - 指標削除・チャート破棄時に呼び出し。
  - 利用例: タイマー解除、購読解除、メモリ解放。

実行順序（標準）:
1. `onInit`
2. `calculate`（初回）
3. （更新ごとに）`onUpdate` → `calculate`
4. `onDispose`

---

## 5. 最小実装例（SMA: 単純移動平均）

```js
registerIndicator({
  id: 'custom.sma',
  name: 'Simple Moving Average',
  inputs: [
    { key: 'period', type: 'number', required: true, min: 1 },
    { key: 'source', type: 'priceSeries', required: true }
  ],
  outputs: [
    { key: 'sma', type: 'numberSeries', label: 'SMA' }
  ],
  defaults: {
    period: 5,
    source: 'close'
  },
  calculate: ({ candles, params }) => {
    const period = Number(params.period ?? 5);
    const source = params.source ?? 'close';
    const values = [];

    for (let i = 0; i < candles.length; i += 1) {
      if (i + 1 < period) {
        values.push(null);
        continue;
      }
      let sum = 0;
      for (let j = i - period + 1; j <= i; j += 1) {
        sum += Number(candles[j][source]);
      }
      values.push(sum / period);
    }

    return {
      values: {
        sma: values
      }
    };
  },
  hooks: {
    onInit: ({ indicatorId }) => console.debug(`[${indicatorId}] init`),
    onUpdate: ({ indicatorId }) => console.debug(`[${indicatorId}] update`),
    onDispose: ({ indicatorId }) => console.debug(`[${indicatorId}] dispose`)
  }
});
```

---

## 6. 互換性ポリシー（Backward Compatibility）

### 6.1 セマンティックバージョニング

- `MAJOR`: 後方互換を壊す変更（Breaking Changes）
- `MINOR`: 後方互換を維持した機能追加
- `PATCH`: バグ修正・文言修正

### 6.2 Breaking Changes の扱い

以下は Breaking Change とみなします。

- 必須フィールドの追加。
- 既存フィールドの型変更。
- `calculate` の契約（入出力スキーマ）変更。
- フック呼び出し順序の変更。

対応方針:

1. `vN` → `vN+1` の MAJOR 更新として提供。
2. 最低 1 リリース期間の deprecation（非推奨）警告を維持。
3. 移行ガイド（旧 API → 新 API）を同時公開。

### 6.3 非推奨化（Deprecation）ルール

- 非推奨項目には、警告メッセージと代替手段を必ず提示。
- 削除は次 MAJOR まで行わない。

---

## 7. `technical-indicators-demo.html` との対応メモ

`fxcharts/technical-indicators-demo.html` では SMA/RSI/MACD/ストキャスティクス/ボリンジャーバンド/一目均衡表を固定実装で描画しているため、本 API 導入後は以下方針で移行可能です。

- 既存の各指標計算関数を `calculate` として段階的にプラグイン化。
- 描画設定（色・系列名）を `outputs` メタデータへ寄せる。
- 指標追加時に HTML 側を改修せず、登録定義だけで拡張可能にする。
