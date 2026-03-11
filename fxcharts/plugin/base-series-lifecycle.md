# Base Series Lifecycle Specification

本ドキュメントは、`base-series` プラグインのライフサイクル契約を定義する。実装・レビュー・テストで追跡しやすいよう、**state transition** と **dispose** を明示的に扱う。

## 1. ライフサイクル段階

`base-series` は以下の順で状態遷移する。

1. `create`
2. `mount`
3. `update`（0 回以上）
4. `unmount`
5. `dispose`

### 状態モデル

- `initialized`（`create` 直後）
- `mounted`（`mount` 完了後）
- `active`（`update` 実行中または実行後）
- `unmounted`（`unmount` 完了後）
- `disposed`（`dispose` 完了後・終端）

## 2. 各段階で許可される操作と禁止事項

### `create`

**許可**
- 設定値の正規化・バリデーション
- メモリ上の内部状態初期化
- 依存コンポーネント参照の解決（遅延解決ハンドルの保持）

**禁止**
- DOM/Canvas への描画
- 外部イベント購読開始
- Indicator 実データへのアクセス（この段階では未保証）

### `mount`

**許可**
- 描画対象（DOM/Canvas/WebGL 等）への接続
- イベント購読開始
- 初回レンダリング

**禁止**
- 破壊的な設定再初期化（`create` で確定した初期契約を壊す変更）
- `dispose` 相当のリソース破棄

### `update`

**許可**
- 入力データ差分に基づく再計算
- 必要最小限の再描画
- キャッシュ更新

**禁止**
- マウント対象の再作成（フル再マウントが必要な変更は `unmount`→`mount` で実施）
- イベント購読の重複登録

### `unmount`

**許可**
- 描画対象からの切り離し
- イベント購読停止
- 一時リソースの解放

**禁止**
- 永続キャッシュの完全破棄（再マウントを想定する場合）
- 新規 update 処理の開始

### `dispose`

**許可**
- すべてのリソース（メモリ、ハンドル、キャッシュ、購読）を最終解放
- 再利用不能状態への遷移

**禁止**
- 以降のライフサイクル再開（`disposed` は終端状態）
- 新規イベント登録・再描画

## 3. イベント順序保証

以下の順序を **厳密保証** する。

- `create` 前に `mount` / `update` / `unmount` / `dispose` は呼ばれない
- `mount` 前に `update` は呼ばれない
- `unmount` 前に `dispose` を呼んでもよいが、内部的には `unmount` 相当の後始末を先に実行する
- `dispose` 後はすべてのイベントを拒否する（no-op または明示エラー）

### 推奨 state transition テーブル

| current state | event | next state | 備考 |
|---|---|---|---|
| (none) | create | initialized | 初期化完了 |
| initialized | mount | mounted | 接続完了 |
| mounted/active | update | active | 反復可能 |
| mounted/active | unmount | unmounted | 一時停止状態 |
| initialized/mounted/active/unmounted | dispose | disposed | 終端 |
| disposed | any | disposed | 拒否（副作用なし） |

## 4. エラーハンドリング

### 途中失敗時のロールバック

- `mount` 失敗時:
  - 途中で開始した購読・確保済みリソースを巻き戻す
  - 状態は `initialized` に戻す
- `update` 失敗時:
  - 直前の整合した描画スナップショット/キャッシュに戻す
  - 状態は `active` を維持し、次回 update を受け付ける
- `unmount` 失敗時:
  - 再試行可能フラグを立てる
  - 最低限 `dispose` で完全解放できるよう、失敗箇所を記録

### 再試行ポリシー

- 一時障害（I/O、非同期依存の短期失敗）は指数バックオフで最大 N 回再試行
- 恒久障害（設定不正、API 契約違反）は即時失敗し、診断情報を返す
- `dispose` はベストエフォートで再入可能（idempotent）に実装し、複数回呼び出しで破綻しないこと

## 5. パフォーマンス指針

### 再計算タイミング

- `update` は入力差分がある場合のみ重い再計算を実施
- レイアウト変更とデータ変更を分離し、必要な処理のみ走らせる
- 高頻度更新ではフレーム境界（`requestAnimationFrame` 相当）でバッチ化する

### キャッシュ破棄

- `update`: 依存キー単位で部分無効化
- `unmount`: 再マウント想定のホットキャッシュは保持可
- `dispose`: 全キャッシュを必ず破棄

### 計測ポイント

- 各段階の処理時間（create/mount/update/unmount/dispose）
- `update` の再計算件数とスキップ件数
- キャッシュヒット率

## 6. Indicator API との接続点

`fxcharts/plugin/custom-indicator-registration-api.md` で定義された登録済み指標を参照するタイミングは以下とする。

- `create`:
  - 参照する指標 ID の存在チェックのみ（メタデータレベル）
- `mount`:
  - 実行コンテキストにバインドし、指標実体への参照を確立
- `update`:
  - 登録済み指標の計算結果を読み取り、シリーズ描画へ反映
  - 指標未登録/解除済みを検知した場合はフォールバックまたはエラーを発火
- `unmount`:
  - 指標イベント購読（あれば）を解除
- `dispose`:
  - Indicator API との参照を完全切断し、リークを防止

## 実装チェックリスト

- state transition が表通りに実装されている
- `mount` 前 `update` を拒否できる
- 失敗時ロールバックと再試行条件がログで追跡できる
- `dispose` が idempotent で、呼び出し順序に依存しない
- Indicator API の参照タイミングが段階定義と一致している
