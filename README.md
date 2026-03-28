1| # infographicsPublic
2| 
3| 公開用の **インフォグラフィック（HTML/Markdown）置き場** です。GitHub Pages で配布することを前提に、トピック別ディレクトリに整理しています。
4| 
5| - 入口ページ: `index.html`（カテゴリ別リンク集）
6| - コンテンツ: 各ディレクトリ配下の `.html` / `.md`
7| 
8| > ＊ `index.html` には「絵文字 3つを選んで合計 9 にする」簡易オーバーレイがあります。**これは軽い閲覧制御用の遊び要素で、セキュリティ用途ではありません。**
9| 
10| ---
11| 
12| ## 公開ページ（GitHub Pages）
13| 
14| GitHub Pages を有効化している場合、次の URL で閲覧できます。
15| 
16| - `https://<username>.github.io/infographicsPublic/`
17| 
18| （ユーザー名が `nakajima-masahiko` の場合は `https://nakajima-masahiko.github.io/infographicsPublic/`）
19| 
20| ---
21| 
22| ## 収録カテゴリ（例）
23| 
24| `index.html` からアクセスできる主なカテゴリは次の通りです。
25| 
26| - `GitHub/` … AIエージェント導入、ChatGPT Codex × GitHub 連動フロー
27| - `nocode/` … ノーコード/AIアプリビルダー比較 など
28| - `passkey/` … Passkey / AAGUID / 再認証 など
29| - `grok/` … Grok / xAI 関連
30| - `xAI/` … ファイナンス × X アカウントガイド
31| - `tradingview/` … TradingView Datafeed/UDF/ノウハウ
32| - `fxcharts/` … FX テクニカル指標デモ（ECharts など）
33| - `manufacturing/` … 使用事例や解説（例: 機械設計） など
34| 
35| ---
36| 
37| Update logs and guidelines, if applicable, can be inserted here.
38| 
39| ---
40| 
41| ## ローカルでの閲覧
42| 
43| ビルド不要です。ローカルで確認するだけなら、任意の静的サーバーで OK。
44| 
45| 例（Python）:
46| 
47| ```bash
48| python -m http.server 8000
49| ```
50| 
51| ---
52| 
53| ## ライブラリとして利用する（公開API入り口）
54| 
55| > 将来的に `src/` と `dist/` を分離しても、利用者は `exports` で固定した公開入り口（`./react`, `./vue`）のみを参照する想定です。
56| 
57| ---
58| 
59| Update documentation updates as needed when functionality changes take effect.
60| 
61| ---