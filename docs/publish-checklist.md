# Publish Checklist

ライブラリ公開前に、公開面と配布物が想定どおりかを確認するための手順です。

## 1. 公開API入口の確認

`package.json` の `exports` で、次の入口が固定されていることを確認します。

- `.`
- `./react`
- `./vue`

## 2. パッケージ内容の確認（pack）

ルートで以下を実行し、生成される tarball に不要ファイルが含まれていないことを確認します。

```bash
npm pack --dry-run
```

必要に応じて実際に tarball を作って中身を確認します。

```bash
npm pack

tar -tf infographics-public-*.tgz
```

## 3. 含める/除外するファイルの確認

このリポジトリでは `package.json` の `files` フィールドで配布物を管理します。

- 含める: `dist/`, `README.md`
- 除外: 上記以外（HTMLコンテンツ、開発用資料など）

## 4. エントリポイントの読み込み確認

ローカルで ESM/CJS の解決を確認します。

```bash
node --input-type=module -e "import('infographics-public').then(m => console.log(m.packageName))"
node -e "console.log(require('./dist/index.cjs').packageName)"
```

## 5. リリース直前チェック

- `version` が更新されている
- `README.md` の利用例が `exports` と一致している
- `npm pack --dry-run` の結果に意図しない差分がない
