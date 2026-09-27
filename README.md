# toi toi toi

AT（支援技術）で学びの入口をひらく、個人の発信サイトです。
公開先：https://toitoitoi-lab.github.io/

## 記事の追加のしかた（ブラウザだけでできます）

1. AI に記事を書いてもらう（渡す文章は `docs/article-template.md`）
2. GitHub でこのリポジトリを開き、`src/content/articles/` フォルダに移動する
3. 「Add file」→「Create new file」を押す
4. ファイル名を英小文字とハイフンで付ける（例：`voice-input-basics.md`）
5. AI が書いた Markdown を貼り付けて、「Commit changes」を押す
6. 数分で自動的にサイトに反映される（「Actions」タブで進み具合が見られます）

下書きのまま置いておきたいときは、前付けを `draft: true` にします。

## 「準備中」をはずすとき

`src/data/site.ts` の中で、そのページの `ready: false` を `ready: true` に変えます。
トップページのカード、サイトマップの「準備中」の印が、まとめて消えます。

## 手元で確認するとき

```
npm install
npm run dev
```

ブラウザで http://localhost:4321/ を開きます。

## 設計

配色・フォント・アクセシビリティの方針は `docs/design-spec.md` にまとめています。

## ライセンス

- プログラムのコード：MIT ライセンス（`LICENSE`）
- 記事・教材・イラスト（`src/content/` と `src/data/site.ts` のイラスト）：著作権は運営者に帰属します。MIT ライセンスの対象外です。利用ルールはサイトの「利用ルール」ページをご覧ください。
