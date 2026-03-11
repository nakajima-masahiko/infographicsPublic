# Vanilla example

純 JavaScript で `sample.sma3` indicator を **登録 → 描画 → 更新 → 破棄** する最小構成です。

## 起動方法

リポジトリルートで静的サーバーを起動して `examples/vanilla/index.html` を開きます。

```bash
python3 -m http.server 8000
# http://localhost:8000/examples/vanilla/index.html
```

## 確認観点

- 初期表示で chart が描画され、`init` が log に出る
- `update` ボタンでデータ行が 1 行増え、`update` が log に出る
- `dispose` で描画が破棄され、`dispose` と `unregister` が log に出る
