# 風呂は命の洗濯

Astro と Markdown で作る公開研究ブログです。GitHub Pages の無料 URL で公開する前提で、Obsidian vault や非公開研究ノートとは分離して運用します。

## 最重要の安全方針

このディレクトリは公開用ブログ専用です。Obsidian vault 全体、非公開研究ノート、日記、論文草稿、PDF、画像スキャンをこのリポジトリに入れないでください。

公開対象は、`src/content/posts/` に自分で明示的にコピーした Markdown ファイルだけです。ただし、GitHub の公開リポジトリに置く以上、`draft: true` の記事であっても秘密や未公開草稿を commit しないでください。

## 作成済みの構成

- Astro による静的サイト
- Markdown 記事: `src/content/posts/`
- 記事 frontmatter の型検証
- 本番ビルド時の `draft: true` 除外
- トップ、記事、カテゴリ、アーカイブ、About、404
- RSS: `/rss.xml`
- sitemap: `@astrojs/sitemap`
- GitHub Pages 用 GitHub Actions: `.github/workflows/deploy.yml`

## 最初に編集する場所

公開前に、次のプレースホルダーを編集してください。

- `src/site.config.ts`
  - サイト説明文
  - 副題
- `astro.config.mjs`
  - リポジトリ名を `wissenschaft-samono.github.io` 以外にする場合の `repositoryName`
- `src/pages/about.astro`
  - `CONTACT_LINK_PLACEHOLDER`

## 見た目を変える

外観は、まず `src/styles/theme.css` を編集してください。背景色、文字色、本文サイズ、行間、ページ幅、サイドバー幅などを一箇所で変えられます。

例:

```css
/* 本文の大きさ */
--blog-font-size: 17px;

/* 本文の行間 */
--blog-line-height: 1.9;

/* リンクの色 */
--blog-link: #245c83;
```

色は `#fdfcf9` のような文字で表します。数字を少し変えるだけでも印象が変わるので、最初は本文サイズ、行間、背景色から触るのがおすすめです。

## ヘッダー写真とアイコン

サイト名の後ろに出す写真は、次の場所に置きます。

```text
public/images/header-background.jpg
```

画像を差し替えて GitHub に送ると、ヘッダー背景写真が変わります。写真は自分で撮ったもの、または公開してよいものだけを使ってください。

ブログのアイコンは `public/favicon.png` です。今は丸い紫のピクセルアート風アイコンにしています。スマホでホーム画面に保存される場合は `public/apple-touch-icon.png` が使われます。

ユーザーサイトとして公開する場合、リポジトリ名は `<github-user>.github.io` にします。プロジェクトサイトとして公開する場合、`repositoryName` を `research-blog` などに変更すると、Astro の `base` が `/research-blog` になります。

## ローカル確認

初回だけ依存関係を入れます。

```bash
npm install
```

編集中のプレビューを開きます。

```bash
npm run dev
```

公開前の確認をします。

```bash
npm run build
npm run preview
```

## 新しい記事を追加する

1. Obsidian などで下書きを書く。
2. 公開してよい内容か確認する。
3. `src/content/posts/` に `.md` ファイルを作る。
4. ファイル名は半角英小文字とハイフンにする。
5. 既存のサンプル記事から frontmatter をコピーする。
6. ローカルで表示を確認する。
7. 公開する記事だけ `draft: false` にする。
8. `npm run build` が成功することを確認する。
9. `git status` で余計なファイルが含まれていないか確認する。
10. commit / push する。

記事を書くときは、`templates/post-template.md` をコピーして使えます。コピー先は `src/content/posts/` です。コピーしたファイル名は、英数字とハイフンだけにしてください。

例:

```text
templates/post-template.md
↓ コピー
src/content/posts/phenomenology-reading-note.md
```

frontmatter の例:

```yaml
---
title: "記事タイトル"
description: "一覧表示とOG説明用の短い要約"
publishedAt: 2026-06-01
updatedAt: 2026-06-01
category: "読書メモ"
tags:
  - "インガルテン"
  - "文学作品"
draft: false
---
```

## 公開前チェックリスト

- [ ] 未発表論文・修論の中心的な論証を完成形で先出ししていないか
- [ ] 非公開にしたい個人情報、メールアドレス、メモが含まれていないか
- [ ] 書籍・論文の引用量が過剰でないか
- [ ] 書影・PDF スキャン・論文ページ画像等を無断掲載していないか
- [ ] 既発表・既提出の自分の文章を紹介する場合、その関係を明示したか
- [ ] `draft: false` になっている記事だけが公開されることを確認したか
- [ ] `npm run build` が成功したか
- [ ] `git status` で Obsidian vault や非公開ノートが含まれていないことを確認したか

## 引用と画像の規則

- 他者の文章は必要な範囲に限って引用し、出典を明記する。
- 書籍・論文のページ画像、PDF、図表を安易に掲載しない。
- 画像を掲載する場合は、自分で作成したもの、または掲載権限が明確なものだけにする。
- 画像には必ず代替テキストを書く。
- 自分の既提出・既発表文章を再掲・要約する場合は、その旨を記事内に明示する。
- 後の論文に発展する記事については、ブログ記事との関係を記録しておく。

## GitHub Pages で公開する

1. GitHub で公開リポジトリを作る。
2. ユーザーサイトならリポジトリ名を `<github-user>.github.io` にする。
3. プロジェクトサイトならリポジトリ名を `research-blog` などにし、`astro.config.mjs` の `repositoryName` を合わせる。
4. ローカルから push する。
5. GitHub の Repository Settings → Pages を開く。
6. Source として **GitHub Actions** を選ぶ。
7. Actions の deploy が成功することを確認する。
8. 公開 URL にアクセスして表示を確認する。

公開更新時の例:

```bash
git status
git add .
git commit -m "Add new post: 記事名"
git push origin main
```

Git 操作に慣れていない場合は、commit 前に必ず `git status` を見て、公開したくないファイルが入っていないか確認してください。

## 初期サンプル記事

次の 2 件は動作確認用です。公開前に削除または書き換えてください。

- `src/content/posts/welcome.md`
- `src/content/posts/sample-reading-note.md`

## 導入していないもの

費用ゼロと管理負担の軽さを優先し、初期状態では CMS、コメント、アクセス解析、広告、課金機能、ニュースレター、独自ドメインを導入していません。
