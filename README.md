# infographicsPublic

`infographicsPublic` は、**公開用インフォグラフィックを集約したリポジトリ**です。  
主用途は GitHub Pages での閲覧公開で、トピック別に HTML / Markdown コンテンツを管理しています。

## このリポジトリでできること

- `index.html` からカテゴリ別にインフォグラフィックを閲覧する
- 各ディレクトリ配下の個別ページ（`.html` / `.md`）を直接参照する


## リポジトリ構成（概要）

主要な構成は以下です。

- `index.html`  
  公開トップ（カテゴリ別リンク集）
- `docs/`  
  運用ドキュメント（公開チェックリスト、リリースポリシー等）
- `examples/`  
  indicator ライフサイクル比較のサンプル（Vanilla / React / Vue）
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
- 変更履歴: `CHANGELOG.md`

## 更新方針（README）

- 構成変更（ディレクトリ追加・公開導線変更）があった場合は README を同期更新する
