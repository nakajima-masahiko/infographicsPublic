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

## Playwright CLI＋Skills 実践ガイド

- [ガイドを開く](https://nakajima-masahiko.github.io/infographicsPublic/GitHub/playwright-cli-skills/)
- 保存先: `GitHub/playwright-cli-skills/index.html`
- Windows / PowerShell、GitHub Copilot、ブラウザ操作、Playwright Test、CIを全15章で解説。

## Playwright MCP＋GitHub Copilot 実践ガイド

- [ガイドを開く](https://nakajima-masahiko.github.io/infographicsPublic/GitHub/playwright-mcp-copilot/)
- 保存先: `GitHub/playwright-mcp-copilot/index.html`
- MCPの接続・設定、画面操作、認証、障害調査、回帰テストを全16章で解説。

## パスキー 徹底解説・技術ガイド

- [ガイドを開く](https://nakajima-masahiko.github.io/infographicsPublic/passkey/technical-guide/)
- 保存先: `passkey/technical-guide/index.html`
- WebAuthnの仕組み、同期型と端末固定型、RP ID / Origin、登録・認証、公開鍵保存、実装例、既存Java / BFF連携、復旧、試験、段階展開を全18章で解説。
- 目次、通信フロー切替、コードコピー、障害表の絞り込み、設計チェック保存・出力、印刷レイアウトを用意。コードは学習・設計用の例です。

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
