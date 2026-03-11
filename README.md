# infographicsPublic

公開用の **インフォグラフィック（HTML/Markdown）置き場** です。GitHub Pages で配布することを前提に、トピック別ディレクトリに整理しています。

- 入口ページ: `index.html`（カテゴリ別リンク集）
- コンテンツ: 各ディレクトリ配下の `.html` / `.md`

> ※ `index.html` には「絵文字 3つを選んで合計 9 にする」簡易オーバーレイがあります。**これは軽い閲覧制御用の遊び要素で、セキュリティ用途ではありません。**

---

## 公開ページ（GitHub Pages）

GitHub Pages を有効化している場合、次の URL で閲覧できます。

- `https://<username>.github.io/infographicsPublic/`

（ユーザー名が `nakajima-masahiko` の場合は `https://nakajima-masahiko.github.io/infographicsPublic/`）

---

## 収録カテゴリ（例）

`index.html` からアクセスできる主なカテゴリは次の通りです。

- `GitHub/` … AIエージェント導入、ChatGPT Codex × GitHub 連動フロー
- `nocode/` … ノーコード/AIアプリビルダー比較 など
- `passkey/` … Passkey / AAGUID / 再認証 など
- `grok/` … Grok / xAI 関連
- `xAI/` … ファイナンス × X アカウントガイド
- `tradingview/` … TradingView Datafeed/UDF/ノウハウ
- `fxcharts/` … FX テクニカル指標デモ（ECharts など）

---

## 更新方法（新しいインフォグラフィックを追加する）

1. 対象カテゴリのディレクトリに `*.html`（必要なら `*.md`）を追加
2. `index.html` にリンクカードを追加（カテゴリ・タイトル・パス）
3. GitHub Pages で公開内容を確認

### 命名の目安

- パスは英小文字 + ハイフン推奨（例: `tradingview/datafeed-api-guide.html`）
- 日本語ファイル名も使えますが、URL エンコードされるため運用上は英数字推奨です

---

## ローカルでの閲覧

ビルド不要です。ローカルで確認するだけなら、任意の静的サーバーで OK。

例（Python）:

```bash
python -m http.server 8000
```

---

## ライブラリとして利用する（公開API入口）

> 将来的に `src/` と `dist/` を分離しても、利用者は `exports` で固定した公開入口（`.`, `./react`, `./vue`）のみを参照する想定です。

---

## 領域分離ポリシー（インフォグラフィック領域 / プロダクト開発領域）

このリポジトリは今後、**静的公開物（インフォグラフィック）** と **npm 配布向けプロダクト開発物** を明確に分離して運用します。先に「どこに何を置くか」を固定し、設計・実装・公開手順の迷いを防ぎます。

### 1) プロダクト開発領域の新設方針

- `packages/chart-plugin-core/`（または同等の `packages/*`）を新設し、ライブラリ本体の設計・実装・テストを集約する
- `dist/` は配布成果物（ビルド結果）であり、実装ソースの一次編集先にしない
- 既存のインフォグラフィック用ディレクトリ（`GitHub/`, `passkey/`, `grok/` など）とは責務を混在させない

### 2) ドキュメント先行時の配置ルール

- 実装前に仕様/品質基準のみを先行する場合は `docs/plugin-quality/` を作成する
- **Phase 4 の成果物（品質基準、受け入れ条件、検証手順、リリース判定資料など）は `docs/plugin-quality/` に固定配置**する
- これにより、実装有無に関係なくレビュー対象を一箇所に集約する

### 3) `index.html` 静的公開物と npm 配布物の責務境界

- `index.html` と各カテゴリ配下の `.html` / `.md` は **GitHub Pages 向け静的公開物**
- npm 配布物（`infographics-public`, `infographics-public/react`, `infographics-public/vue`）は **開発者向けライブラリ提供物**
- 静的公開物の変更（見せ方・導線）と npm 配布物の変更（API・ビルド・互換性）は、同一PRに混在させないことを原則とする
- `dist/` の配布内容は npm 文脈で管理し、Pages 向けコンテンツ更新の主対象は `index.html` と各コンテンツディレクトリとする

### 4) 以後の Issue / PR で使うラベル・ディレクトリ規約

#### ラベル規約（推奨）

- `area:infographic` : `index.html` やカテゴリ配下の公開コンテンツに関する変更
- `area:product` : `packages/*`, `src/*`, `dist/*`, `exports` など npm 配布物に関する変更
- `area:docs-plugin-quality` : `docs/plugin-quality/*` の品質ドキュメント変更
- `phase:1` / `phase:2` / `phase:3` / `phase:4` : 開発フェーズ識別
- `type:design` / `type:implementation` / `type:release` : 作業タイプ識別

#### ディレクトリ規約（固定）

- インフォグラフィック公開物: ルート直下のカテゴリディレクトリ + `index.html`
- プロダクト開発物: `packages/chart-plugin-core/`（または `packages/*`）
- 品質/工程ドキュメント: `docs/plugin-quality/`

> 以後は、Issue 作成時に「対象ディレクトリ」と「適用ラベル」を明記し、PR では同じ責務境界を維持すること。

### インストール

```bash
npm install infographics-public
```

### import 例（ESM）

```ts
import { packageName } from 'infographics-public';
import { packageName as reactPackageName } from 'infographics-public/react';
import { packageName as vuePackageName } from 'infographics-public/vue';

console.log(packageName, reactPackageName, vuePackageName);
```

### require 例（CJS）

```js
const { packageName } = require('infographics-public');
const { packageName: reactPackageName } = require('infographics-public/react');
const { packageName: vuePackageName } = require('infographics-public/vue');
```
