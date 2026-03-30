# infographicsPublic: 生成AI向け圧縮コンテキスト

## 1) リポジトリの目的
- 本リポジトリは、公開用インフォグラフィック（主に HTML / Markdown）を集約し、GitHub Pages で閲覧提供するための静的コンテンツ集です。
- 「ライブラリ配布」ではなく「公開コンテンツ管理」が主目的です。

## 2) 主要構成（高頻度で参照する場所）
- `index.html`: 公開トップ（カテゴリ別リンク集）
- `<category>/...`: 各インフォグラフィック本体（例: `GitHub/`, `grok/`, `passkey/`, `tradingview/` など）
- `docs/`: 運用ドキュメント
- `examples/`: indicator lifecycle 比較サンプル（Vanilla / React / Vue）

## 3) 作業時の基本方針
- 変更の中心は HTML / Markdown コンテンツ。
- 構成（カテゴリ追加・導線変更）を行った場合は `README.md` と `index.html` の整合を優先確認。
- 参照リンクは相対パスを維持し、GitHub Pages 上での遷移破綻を避ける。

## 4) ローカル確認
```bash
python3 -m http.server 8000
```
- ブラウザで `http://localhost:8000/` を開き、トップから対象ページへの導線と表示を確認する。

## 5) 変更レビューのチェックポイント（最小）
- トップページ (`index.html`) に追加/削除したコンテンツへのリンクが反映されているか。
- 対象 HTML のタイトル・見出し・リンク切れがないか。
- README の構成説明が実態と一致しているか。

## 6) 非対象（このリポジトリの現在方針）
- npm 配布物（`dist/`）や `package.json` ベースの公開設定は管理対象外。
