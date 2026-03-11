# Indicator lifecycle examples

3 つの実装（Vanilla / React / Vue）で同一 indicator `sample.sma3` を利用し、
`register -> init(render) -> update -> dispose(+unregister)` の流れを比較できます。

- Vanilla: `examples/vanilla/index.html`
- React: `examples/react/index.html`
- Vue: `examples/vue/index.html`

## 起動

```bash
python3 -m http.server 8000
```

ブラウザで各ページを開いて lifecycle log を比較してください。
