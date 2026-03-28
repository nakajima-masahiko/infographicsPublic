# infographicsPublic

`infographicsPublic` は、**公開用インフォグラフィックを集約したリポジトリ**です。  
主用途は GitHub Pages での閲覧公開で、トピック別に HTML / Markdown コンテンツを管理しています。

このリポジトリにはあわせて、`dist/` 配下に **npm 配布用の成果物**（CJS / ESM / 型定義）も含まれます。

## このリポジトリでできること

- `index.html` からカテゴリ別にインフォグラフィックを閲覧する
- 各ディレクトリ配下の個別ページ（`.html` / `.md`）を直接参照する
- `package.json` の `exports` を通じて `dist/` 配布物を利用する（`.`, `./react`, `./vue`）

> `index.html` には「絵文字 3つを選んで合計 9 にする」オーバーレイがあります。  
> これは軽い閲覧導線のための UI 要素であり、セキュリティ機能ではありません。

## リポジトリ構成（概要）

主要な構成は以下です。

- `index.html`  
  公開トップ（カテゴリ別リンク集）
- `docs/`  
  運用ドキュメント（公開チェックリスト、リリースポリシー等）
- `examples/`  
  indicator ライフサイクル比較のサンプル（Vanilla / React / Vue）
- `dist/`  
  npm 配布対象成果物（`files` で公開対象に含まれる）
- 各カテゴリディレクトリ（例: `GitHub/`, `grok/`, `passkey/`, `tradingview/`, `nutrition/` など）  
  個別インフォグラフィック本体

## 公開ページ（GitHub Pages）

GitHub Pages を有効化している場合、以下で公開されます。

- `https://<username>.github.io/infographicsPublic/`

例:
- `https://nakajima-masahiko.github.io/infographicsPublic/`

## ローカル確認

ビルド不要で、静的サーバーで確認できます。

```bash
python3 -m http.server 8000
```

その後、`http://localhost:8000/` を開いて確認してください。

## npm パッケージとしての配布情報

`package.json` の公開設定は次のとおりです。

- パッケージ名: `infographics-public`
- 公開エントリポイント（`exports`）:
  - `.`
  - `./react`
  - `./vue`
- 配布対象（`files`）:
  - `dist/`
  - `README.md`

配布前確認の詳細は `docs/publish-checklist.md` を参照してください。

## 収録コンテンツの例

カテゴリ例:

- `GitHub/`（GitHub 運用・AI エージェント関連）
- `grok/`, `xAI/`（xAI / Grok 関連）
- `passkey/`（Passkey / AAGUID / 再認証）
- `tradingview/`, `fxcharts/`（チャート / 指標関連）
- `generativeAI/`, `aiAgent/`, `Claude/`（生成 AI・エージェント関連）
- `chemistry/`, `nutrition/`, `manufacturing/` ほか

最新の一覧は `index.html` を参照してください。

## ドキュメント

- リリース方針: `docs/release-policy.md`
- 公開前チェック: `docs/publish-checklist.md`
- 変更履歴: `CHANGELOG.md`

## 更新方針（README）

- 構成変更（ディレクトリ追加・配布対象変更）があった場合は README を同期更新する
- `package.json` の `exports` / `files` を変更した場合は README と `docs/publish-checklist.md` の整合を必ず確認する
