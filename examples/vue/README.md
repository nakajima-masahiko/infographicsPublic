# Vue example

Vue 3 の `setup` + composable 相当の構成で、`sample.sma3` indicator lifecycle を追跡する例です。

## 起動方法

```bash
python3 -m http.server 8000
# http://localhost:8000/examples/vue/index.html
```

## 確認観点

- 初回 mount で `register` / `init`
- `props相当更新(update)` で `watch(props.rows) -> chart.update(...)` と `update`
- `unmount` で `dispose` / `unregister`
