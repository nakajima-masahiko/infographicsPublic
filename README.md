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
