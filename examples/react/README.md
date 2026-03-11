# React example

`sample.sma3` indicator を使い、React の mount/unmount と indicator lifecycle の対応を明示した例です。

## 起動方法

```bash
python3 -m http.server 8000
# http://localhost:8000/examples/react/index.html
```

## 確認観点

- `mount` 時に `register` / `init` が出る
- `props更新(update)` ボタンで `rows` props が変わり、`props update -> chart.update(...)` と `update` が出る
- `unmount` で `dispose` と `unregister` が cleanup から呼ばれる
