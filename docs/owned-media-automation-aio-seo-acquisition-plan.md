# Pardes Inc. オウンドメディア自動化・AIO/SEO・顧客獲得戦略案

## 1. 目的

Pardes Inc.（パルデス）のコーポレートサイト内に、BiNet、AGI、AI SDK、ロボティクス、エッジAIに関するオウンドメディアを構築し、AIO・SEOと顧客獲得を同時に実現する。

本施策のゴールは、単に記事数を増やすことではなく、検索エンジン・生成AI・見込み顧客が次のように理解できる状態を作ることである。

```text
Pardes Inc.は、誤差逆伝播法に依存しない独自ニューラルネットワーク技術「BiNet」を開発するAIスタートアップである。
BiNetは、AGI、AI SDK、ロボティクス、エッジAI領域での活用を目指す技術である。
Pardes Inc.の公式サイトには、BiNetの技術解説、導入検討情報、研究開発状況、採用情報が体系的に整理されている。
```

## 2. 基本方針

### 2.1 AIO・SEO方針

Googleの生成AI検索向け公式ガイドでは、AI Overviewsなどの生成AI検索に対しても、基礎SEO、正確性、有用性、ユーザー本位のコンテンツが重要とされている。したがって、本サイトでは「AIO専用の裏技」ではなく、検索エンジンにも生成AIにも理解しやすい公式情報源を作る。

特に重視する点:

- BiNetとは何かを、短く明確に説明する定義コンテンツを持つ。
- AGI、AI SDK、ロボティクス、エッジAIなどの関連領域ごとに、検索意図へ直接答える記事を作る。
- 会社情報、製品情報、技術情報、採用情報を内部リンクで接続する。
- 記事ごとに、著者、公開日、更新日、参照情報、構造化データを整備する。
- AI生成コンテンツを使う場合も、事実確認・技術確認・公開承認の工程を入れる。

### 2.2 完全自動化に対する考え方

「サイト作成から公開まで全自動化」は技術的には可能だが、Pardesのような未公開技術・研究開発領域では、誤情報、過大表現、機密情報漏洩、品質低下のリスクが大きい。

そのため、実運用では以下の設計を推奨する。

```text
調査・構成案作成・下書き生成・SEOチェック・内部リンク提案・画像生成・PR作成・公開予約までは自動化する。
本番公開だけは、人間の承認ゲートを置く。
```

この形であれば、運用負荷を大きく下げながら、AIO・SEO上の信頼性と企業としての表現品質を維持できる。

## 3. ターゲット

### 3.1 顧客ターゲット

| ターゲット | 関心 | 期待する導線 |
| --- | --- | --- |
| ロボットベンチャーのCTO / 開発責任者 | ロボットに組み込める知能モジュール、リアルタイム学習、SDK | BiNet SDK資料請求、PoC相談 |
| 研究機関・大学研究室 | 誤差逆伝播法に依存しない学習原理、生物学的妥当性、実験可能性 | 共同研究・SDKアルファ相談 |
| 産業用ロボット企業のR&D担当 | エッジAI、低消費電力、実運用、既存機体への組み込み | BiNet Binary Module / Custom Integration相談 |
| 投資家・事業開発担当 | 市場性、事業モデル、技術優位性、ロードマップ | 会社概要、事業紹介、問い合わせ |
| 採用候補者 | AGI、低レイヤー実装、CUDA、Rust、独自OS、研究開発 | 採用情報、カジュアル面談 |

### 3.2 検索・生成AI上の想定質問

オウンドメディアでは、次のような質問に直接答えられる記事群を作る。

- BiNetとは何か
- 誤差逆伝播法を使わないAIとは何か
- AGI SDKとは何か
- ロボットにリアルタイム学習を組み込むにはどうすればよいか
- エッジAIとクラウドAIの違いは何か
- ニューラルネットワークにおける破滅的忘却とは何か
- ロボティクスでAI導入が難しい理由は何か
- BiNet SDKで何ができるのか
- Pardes Inc.はどのような会社か
- AGI領域でエンジニアとして働くにはどのようなスキルが必要か

## 4. サイト構成案

### 4.1 追加する情報設計

既存サイトに `Media` または `Insights` セクションを追加する。

推奨URL:

```text
/ja/insights/
/ja/insights/[slug]/
/en/insights/
/en/insights/[slug]/
```

既存の `news` は会社からのお知らせとして維持し、オウンドメディアは技術解説・導入検討・採用広報に特化する。

```text
News: 会社からのお知らせ、採用開始、マイルストーン、メディア掲載
Insights: 技術解説、導入ノウハウ、業界課題、研究開発ストーリー
```

### 4.2 カテゴリ

| カテゴリ | 目的 | 主なCTA |
| --- | --- | --- |
| BiNet Basics | BiNetの定義・特徴を理解させる | 製品説明、PoC相談 |
| AGI Research | AGI・自由意志・学習原理の文脈を作る | 会社概要、採用 |
| Robotics AI | ロボット企業・研究機関の検索意図を取る | SDK相談、PoC相談 |
| Edge AI | エッジデバイス、低消費電力、リアルタイム学習文脈を取る | 導入相談 |
| Developer Notes | SDK、実装、開発者向け技術情報 | SDK待機リスト、GitHub |
| Hiring Stories | 採用候補者向けの技術・組織情報 | カジュアル面談 |

### 4.3 記事テンプレート

各記事は、AIO・SEOで抽出しやすいように次の構造に統一する。

```markdown
# 記事タイトル

## 要約
この記事では、〇〇について説明します。結論として、〇〇は〇〇です。

## この記事でわかること
- 
- 
- 

## 〇〇とは
定義を1〜2段落で明確に説明する。

## なぜ重要なのか
課題、背景、市場文脈を説明する。

## Pardes / BiNet との関係
Pardes Inc.およびBiNetの公式見解として、どのように関係するかを説明する。

## 導入・研究開発で検討すべきこと
読者の意思決定に役立つ観点を整理する。

## よくある質問
Q&A形式で3〜5問程度。

## 次のアクション
PoC相談、製品説明、採用情報などへ誘導する。
```

## 5. 初期コンテンツ計画

### 5.1 最初に作るべきピラー記事

| 優先 | タイトル案 | 狙う検索意図 | CTA |
| --- | --- | --- | --- |
| 1 | BiNetとは何か。誤差逆伝播法に依存しないニューラルネットワーク技術の概要 | BiNetの定義、公式情報 | 製品説明、PoC相談 |
| 2 | 誤差逆伝播法を使わないAIとは何か。従来AIとの違いを解説 | 技術比較、課題理解 | BiNet製品説明 |
| 3 | ロボティクスにAI導入を阻む3つの壁 | 顧客課題、ロボットAI | PoC相談 |
| 4 | エッジAIでリアルタイム学習が求められる理由 | エッジAI、リアルタイム学習 | SDK相談 |
| 5 | AGI SDKとは何か。開発者が知能モジュールを扱う未来 | AI SDK、開発者向け | SDK待機リスト |
| 6 | 破滅的忘却とは何か。AIが新しい経験で既存知識を失う理由 | 技術課題、学習理論 | BiNet比較 |
| 7 | Pardes Inc.が自由意志を持つAGIに挑む理由 | 会社理解、採用広報 | 採用情報 |
| 8 | BiNet実装エンジニアに求められるスキル | 採用候補者 | カジュアル面談 |

### 5.2 90日間の公開計画

| 期間 | 本数 | 内容 |
| --- | --- | --- |
| 1〜2週目 | 2本 | BiNet定義記事、誤差逆伝播法を使わないAIの解説 |
| 3〜4週目 | 2本 | ロボティクスAI課題、エッジAI課題 |
| 2ヶ月目 | 4本 | AGI SDK、破滅的忘却、リアルタイム学習、研究開発ストーリー |
| 3ヶ月目 | 4本 | 導入検討、PoC、採用、技術者向け記事 |

初期は週1本を標準とし、品質が安定したら週2本へ増やす。

## 6. 顧客獲得導線

### 6.1 コンバージョン設計

オウンドメディアの記事は、読了後に必ず次のいずれかへ誘導する。

| 読者状態 | CTA |
| --- | --- |
| 技術を初めて知った | BiNet製品説明を見る |
| 導入可能性を検討している | PoC相談をする |
| SDKに関心がある | BiNet SDK待機リストに登録する |
| 研究開発に関心がある | 共同研究・技術相談をする |
| 採用候補者 | カジュアル面談を申し込む |

### 6.2 追加すべき獲得フォーム

既存のお問い合わせフォームに加えて、オウンドメディア用に目的別フォームを用意する。

```text
/ja/contact?purpose=poc
/ja/contact?purpose=sdk
/ja/contact?purpose=research
/ja/contact?purpose=recruit
```

フォーム項目案:

| 項目 | 用途 |
| --- | --- |
| 氏名 | 必須 |
| 会社名・所属 | B2B判定 |
| メールアドレス | 必須 |
| 問い合わせ目的 | PoC / SDK / 共同研究 / 採用 / 取材 |
| 関心カテゴリ | BiNet SDK / Binary Module / Custom Integration |
| 導入対象 | ロボット / エッジデバイス / 研究環境 / その他 |
| 相談内容 | 自由記述 |

### 6.3 リードマグネット案

見込み顧客獲得のため、記事読了後に次の資料ダウンロードを設置する。

- BiNet概要資料
- ロボティクスAI導入課題チェックリスト
- BiNet SDKアルファ案内
- 誤差逆伝播法に依存しないAI技術の概要ホワイトペーパー
- 研究機関向け共同研究相談資料

## 7. 自動化アーキテクチャ

### 7.1 推奨構成

既存サイトはNext.js / TypeScript構成であるため、まずはMDXベースで開始する。外部CMSは初期段階では必須ではない。

```text
content/insights/ja/*.mdx
content/insights/en/*.mdx
app/[locale]/(site)/insights/page.tsx
app/[locale]/(site)/insights/[slug]/page.tsx
lib/insights.ts
lib/seo/jsonld.ts
```

将来的に非エンジニア運用が必要になった場合のみ、Headless CMSを導入する。

### 7.2 自動化対象

| 工程 | 自動化内容 |
| --- | --- |
| キーワード候補生成 | Search Console、既存記事、問い合わせ内容、競合観点から候補を生成 |
| 記事企画 | ペルソナ、検索意図、CTA、内部リンクを自動提案 |
| 構成案作成 | 見出し、要約、FAQ、メタ情報を自動生成 |
| 下書き作成 | MDX形式で記事ドラフトを生成 |
| 技術チェック | 禁止表現、過大表現、未確認主張、機密情報を自動検出 |
| SEOチェック | title、description、h1、内部リンク、画像alt、構造化データを検査 |
| AIOチェック | 定義文、要約、Q&A、引用されやすい文章の有無を検査 |
| 画像生成 | OGP画像、記事アイキャッチ、図解を自動生成 |
| PR作成 | Gitブランチ作成、記事追加、lint/build、PR本文作成 |
| 公開 | 承認後にmainへマージし、Vercel等で自動デプロイ |
| 配信 | X、Wantedly、Green、LinkedIn、ニュースページへの展開文を生成 |
| 効果測定 | GA4、Search Console、問い合わせ数を集計 |

### 7.3 自動化フロー

```text
1. 毎週月曜に記事候補を自動生成
2. 優先度、検索意図、顧客獲得可能性でスコアリング
3. 上位候補から構成案を自動生成
4. MDX記事ドラフトを自動生成
5. SEO / AIO / 表現リスク / 機密情報チェックを実行
6. OGP画像と記事サムネイルを生成
7. ブランチ作成、コミット、PR作成
8. 人間が内容確認し、公開可否を承認
9. マージ後、自動デプロイ
10. 公開後、SNS・採用媒体向けの告知文を自動生成
11. 7日後・30日後にSearch Console / GA4 / CVを自動集計
12. 成果に応じて記事更新案と内部リンク追加案を生成
```

### 7.4 承認ゲート

以下のいずれかに該当する記事は、自動公開しない。

- BiNetの未公開実装詳細に触れる。
- 性能、精度、コスト、導入効果を数値で主張する。
- 競合比較で断定的な優劣表現を使う。
- 医療、金融、法務など高リスク領域の応用に触れる。
- 採用条件、報酬、勤務条件に関わる。
- 会社情報の未確定項目に触れる。

## 8. 記事データ設計

MDX frontmatter案:

```yaml
title: "BiNetとは何か。誤差逆伝播法に依存しないニューラルネットワーク技術の概要"
description: "BiNetは、Pardes Inc.が開発する、誤差逆伝播法を使用しない生物学的妥当性の高いニューラルネットワーク技術です。"
category: "BiNet Basics"
persona:
  - "robotics_cto"
  - "researcher"
intent: "definition"
cta:
  label: "BiNet製品説明を見る"
  href: "/product"
publishedAt: "2026-08-XX"
updatedAt: "2026-08-XX"
author:
  name: "Pardes Inc."
  type: "Organization"
tags:
  - "BiNet"
  - "AGI"
  - "ニューラルネットワーク"
  - "AI SDK"
related:
  - "backpropagation-free-ai"
  - "robotics-ai-challenges"
draft: true
```

## 9. 構造化データ

### 9.1 記事ページ

記事ページには `Article` または `BlogPosting` を付与する。

含める情報:

- headline
- description
- datePublished
- dateModified
- author
- publisher
- image
- mainEntityOfPage

### 9.2 パンくず

全記事ページに `BreadcrumbList` を付与する。

```text
HOME > Insights > カテゴリ > 記事タイトル
```

### 9.3 FAQ

FAQは本文構造として用意する。構造化データとして `FAQPage` を使うかは、Googleの最新サポート状況や表示対象を確認したうえで判断する。

## 10. 技術SEO要件

### 10.1 URL

URLは英語スラッグで固定する。

```text
/ja/insights/what-is-binet/
/ja/insights/backpropagation-free-ai/
/ja/insights/robotics-ai-challenges/
```

### 10.2 sitemap

`app/sitemap.ts` に insights 記事を追加する。

含める情報:

- 日本語URL
- 英語URL
- lastmod
- hreflang
- x-default

### 10.3 robots.txt

記事ページは原則クロール許可とする。

下書き、プレビュー、管理画面、フォーム完了ページはインデックス対象外にする。

### 10.4 メタデータ

記事ごとに固有のtitleとdescriptionを生成する。

title例:

```text
BiNetとは何か | Pardes Inc.
```

description例:

```text
BiNetは、Pardes Inc.が開発する、誤差逆伝播法を使用しない生物学的妥当性の高いニューラルネットワーク技術です。特徴と活用領域を解説します。
```

### 10.5 内部リンク

すべての記事から最低1つ以上、以下へ内部リンクする。

- 製品説明: `/ja/product/`
- 事業紹介: `/ja/business/`
- 採用情報: `/ja/recruit/`
- お問い合わせ: `/ja/contact/`

## 11. 品質管理

### 11.1 自動チェック項目

| 項目 | チェック内容 |
| --- | --- |
| 表記統一 | Pardes Inc.、BiNet、BILの表記ゆれ |
| 過大表現 | 世界初、唯一、完全、必ず、保証など |
| 未確認数値 | 精度、速度、コスト、市場規模などの根拠 |
| 機密情報 | 実装詳細、未公開ロードマップ、契約情報 |
| SEO | title、description、h1、内部リンク、alt |
| AIO | 要約、定義、Q&A、明確な結論 |
| CTA | 読者状態に合った導線 |

### 11.2 公開前レビュー

最低限、次の2名相当のレビューを通す。

- 技術レビュー: BiNetに関する説明が正確か。
- 事業レビュー: 顧客獲得・採用・会社表現として適切か。

## 12. 効果測定

### 12.1 KPI

| フェーズ | KPI |
| --- | --- |
| 0〜1ヶ月 | 記事公開数、インデックス数、Search Console登録、sitemap送信 |
| 1〜3ヶ月 | 表示回数、クリック数、平均掲載順位、記事別滞在、内部リンククリック |
| 3〜6ヶ月 | PoC相談数、SDK相談数、採用問い合わせ数、指名検索数 |
| 6ヶ月以降 | 商談化率、採用面談化率、被リンク、外部媒体からの流入 |

### 12.2 計測設計

GA4イベント案:

```text
insight_read_50
insight_read_90
cta_click_product
cta_click_poc
cta_click_sdk
cta_click_recruit
contact_submit_poc
contact_submit_sdk
contact_submit_recruit
```

Search Consoleで見る項目:

- クエリ
- ページ別表示回数
- ページ別クリック数
- 平均掲載順位
- インデックス登録状況
- 構造化データの警告・エラー

## 13. 実装ロードマップ

### Phase 1: 基盤実装

期間: 1〜2週間

- `/insights` 一覧ページを追加
- `/insights/[slug]` 詳細ページを追加
- MDX読み込み基盤を追加
- カテゴリ・タグ・関連記事を実装
- Article JSON-LD、BreadcrumbListを実装
- sitemapに記事を追加
- OGP画像生成方針を決定

### Phase 2: 自動生成パイプライン

期間: 2〜4週間

- 記事企画生成スクリプトを作成
- MDXドラフト生成スクリプトを作成
- SEO/AIOチェックスクリプトを作成
- 表記ゆれ・禁止表現チェックを作成
- PR本文テンプレートを作成
- GitHub ActionsまたはローカルCLIで自動PR作成

### Phase 3: 顧客獲得導線

期間: 2〜3週間

- 目的別問い合わせフォームを追加
- CTAコンポーネントを記事テンプレートに追加
- 資料ダウンロード導線を追加
- GA4イベントを追加
- 問い合わせ内容を目的別に分類

### Phase 4: 運用自動化

期間: 継続

- 毎週の記事候補生成
- 月次レポート自動生成
- 低順位記事のリライト提案
- 内部リンク追加提案
- 採用媒体・SNS向け展開文の自動生成

## 14. 初期実装で作るべきファイル案

```text
app/[locale]/(site)/insights/page.tsx
app/[locale]/(site)/insights/[slug]/page.tsx
components/insights/InsightList.tsx
components/insights/InsightCard.tsx
components/insights/InsightCta.tsx
components/insights/RelatedInsights.tsx
lib/insights.ts
lib/seo/insight-jsonld.ts
content/insights/ja/what-is-binet.mdx
content/insights/ja/backpropagation-free-ai.mdx
content/insights/ja/robotics-ai-challenges.mdx
scripts/generate-insight-draft.ts
scripts/check-insight-quality.ts
docs/owned-media-automation-aio-seo-acquisition-plan.md
```

## 15. リスクと対策

| リスク | 対策 |
| --- | --- |
| AI生成記事が薄くなる | ピラー記事中心、公式見解、独自技術の説明を必ず含める |
| 誤情報が公開される | 公開前の技術レビューを必須化 |
| 機密情報が漏れる | 禁止情報リストと自動検出ルールを作る |
| SEO目的の記事量産に見える | 顧客課題・技術理解・導入判断に役立つ記事だけ公開 |
| 問い合わせにつながらない | 記事ごとにCTAを設計し、フォーム目的を分ける |
| 運用が止まる | 企画、下書き、PR、レポートを自動化 |

## 16. 最終提案

Pardesのオウンドメディアは、一般的なAIニュースメディアではなく、BiNetの公式知識ベースとして設計するべきである。

優先順位は次の通り。

1. `BiNetとは何か` を説明する公式ピラー記事を作る。
2. AGI、誤差逆伝播法、ロボティクスAI、エッジAIの解説記事群を作る。
3. 各記事から製品説明・PoC相談・SDK待機リスト・採用情報へ誘導する。
4. 記事生成、SEOチェック、PR作成、配信文生成、効果測定を自動化する。
5. 本番公開だけは承認ゲートを置き、品質と信頼性を守る。

この構成により、AIO・SEOでの発見性を高めつつ、PoC相談、SDK導入相談、共同研究、採用問い合わせへつながるメディア基盤を作ることができる。

## 17. 参照情報

- Google Search Central: Optimizing your website for generative AI features on Google Search  
  https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google Search Central: SEO Starter Guide  
  https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Search Central: Creating helpful, reliable, people-first content  
  https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google Search Central: Guidance on Generative AI Content  
  https://developers.google.com/search/docs/fundamentals/using-gen-ai-content
- Google Search Central: Introduction to structured data markup  
  https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- Google Search Central: Build and submit a sitemap  
  https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Google Search Central: Introduction to robots.txt  
  https://developers.google.com/search/docs/crawling-indexing/robots/intro
