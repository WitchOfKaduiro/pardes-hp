# AIO・SEO・GEO・LLMO対策方針書

## 1. 文書概要
- 対象システム: Pardes Inc. コーポレートサイト（新規構築、7ページ構成）
- 文書種別: 検索・AI可視性対策方針書
- 版数: v1.1
- 最終更新日: 2026-07-21
- 位置づけ: `requirements_definition.md` の機能要件（9.9 検索・AI可読性対応）を補足する、施策レベルの方針書

## 2. 目的

Pardes Inc. コーポレートサイトが、従来の検索エンジン（SEO）、Google AI Overviews（AIO）、ChatGPT・Perplexity・Gemini等の生成AIエンジン（GEO）、大規模言語モデルの応答・引用（LLMO）のいずれにおいても、初期ターゲット（ロボットメーカー、SIer、大学、研究機関の技術者・研究開発責任者）から見つかりやすく、正確に引用される状態を実現するための対策方針を定める。

## 3. 対象範囲

### 3.1 対象
- 7ページ（HOME／事業紹介／会社概要／製品説明／採用情報／お知らせ／お問い合わせ）に対するSEO・AIO・GEO・LLMOの共通対策方針と個別対策方針
- 構造化データ（schema.org／JSON-LD）の適用方針
- 日本語版・英語版（`requirements_definition.md` REQ-DESIGN-07）を前提とした多言語SEOの方針
- コンテンツの抽出性・引用性を高める文章構成方針
- 運用・計測の方針

### 3.2 対象外
- 個別のキーワードリスト全件・記事カレンダーの確定（本方針書は方針レベルに留め、具体的な制作物は別途運用フェーズで作成する）
- 広告（リスティング広告・SNS広告等のペイドメディア）の方針
- 松尾工務店サイトの具体的なSEO実装（著作権上、参照対象外）

## 4. 前提

`requirements_definition.md`（v1.1）および`shared_understanding.md`（v1.1）の決定事項を前提とする。特に以下の既存決定と整合させる。

| 前提ID | 内容 | 根拠 |
| --- | --- | --- |
| PRE-S01 | 日本語版・英語版の2言語でページを提供する | `requirements_definition.md` REQ-DESIGN-07（2026-07-21ユーザー回答） |
| PRE-S02 | 製品説明ページで具体的な価格情報は掲載しない | `requirements_definition.md` REQ-PRODUCT-04（2026-07-21ユーザー回答） |
| PRE-S03 | 製品説明ページの技術詳細は既存ティザーサイト水準の抽象度に留める | `requirements_definition.md` REQ-PRODUCT-01／05（2026-07-21ユーザー回答） |
| PRE-S04 | 想定読者はロボット/AI開発企業の技術者・研究開発責任者を最優先とする | `shared_understanding.md` CHK-GOAL-02 |
| PRE-S05 | お知らせページの更新手段・更新頻度は本文書作成時点で未確定 | `shared_understanding.md` CHK-FLOW-02 |

## 5. 用語定義

| 用語 | 定義 |
| --- | --- |
| SEO（検索エンジン最適化） | Google等の従来型検索エンジンの検索結果ページでオーガニック順位・クリック率を高めるための対策 |
| AIO（AI Overview対策） | Google検索結果上部に表示されるAI生成要約（AI Overviews）に情報として引用・要約掲載されるための対策 |
| GEO（生成エンジン最適化） | ChatGPT、Perplexity、Geminiなどの生成AIエンジンに、ユーザーの質問への回答内でPardesを引用・推薦させるための対策 |
| LLMO（大規模言語モデル最適化） | LLMの学習データおよびRAG（検索拡張生成）による参照の両経路を通じて、LLMがPardesの情報を正確に認知・引用できるようにするための対策 |
| 構造化データ | schema.orgの語彙に基づき、ページ内容を機械可読な形式（JSON-LD）で記述するデータ |
| 抽出性（Extractability） | AI・検索エンジンがページ内容を誤りなく要約・引用しやすい文章構成の度合い |
| E-E-A-T | Experience（経験）・Expertise（専門性）・Authoritativeness（権威性）・Trust（信頼性）の頭文字。Googleが検索品質評価で用いる観点 |
| llms.txt | サイトのルートに設置し、AIクローラーに対して優先的に参照すべきコンテンツや名称表記を案内するための、robots.txtに類似したテキストファイル |
| カテゴリ定義コンテンツ | 「〇〇とは」のように、ある技術領域・課題領域の定義そのものを説明するコンテンツ。AI引用の起点として最も価値が高いとされる |

## 6. 本文

### 6.1 全体方針

SEO・AIO・GEO・LLMOは対策手段が重複する部分が大きい（構造化データ、抽出性の高い文章構成、権威性シグナルはいずれにも寄与する）。そのため個別に対策を積み上げるのではなく、共通対策を土台とし、各チャネル固有の対策を上乗せする構成で方針を定める。

優先順位は、初期ターゲット（ロボットメーカー、SIer、大学、研究機関）の情報収集行動が「生成AIへの質問」に移行している前提（GEO調査結果：B2B購買層の大半が2026年時点で生成AIツールを情報収集に利用）に基づき、次の順で投資する。

1. GEO／LLMO（生成AI・LLM引用対策）: 技術系B2B読者が最初に接触するチャネルとして最優先
2. AIO（Google AI Overviews対策）: 検索行動が残る読者層への対策として次点
3. SEO（従来型検索対策）: GEO/AIO対策の基盤（クロール可能性、構造化データ、権威性シグナル）として並行実施

**REQ-PRODUCT-04／05との整合**: 価格非公開・技術詳細非開示の方針は維持したまま、「課題定義・技術的位置づけ・比較優位性の説明」において業界内で最も包括的な情報源になることを目指す。GEOが重視する「カテゴリ定義コンテンツの掌握」は、価格や実装詳細を出さなくても達成できる（6.6章参照）。

### 6.2 SEO（検索エンジン最適化）の対策方針

**コンテンツ・キーワード方針**
- 想定読者（ロボット/AI開発企業の技術者、研究開発責任者）が実際に検索する語彙（「エッジAI 学習コスト」「破滅的忘却 対策」「誤差逆伝播法を使わないAI」「省メモリ ニューラルネットワーク」等）を各ページのtitleタグ・meta description・見出しに反映する
- 事業計画書由来の統計情報（産業ロボット市場規模等）を掲載する際は出典と参照日を明記する（REQ-BIZ-03と連携）
- Core Web Vitals（表示速度・インタラクション応答性・レイアウト安定性）を計測可能な状態にする

#### 6.2.1 robots.txt方針

サイトルートに`robots.txt`を設置する。本方針の目的はGEO/LLMO対策（生成AI・LLMからの引用獲得）であるため、AI学習用クローラーおよびAI対話時のリアルタイム参照クローラーの双方を明示的に許可する。ブランド言及の長期的な定着（学習データへの取り込み）と、ユーザーの質問に対するリアルタイム引用の両方に寄与するため、いずれか一方のみを許可する方針は取らない。

```text
User-agent: *
Allow: /

# 生成AI・LLM関連クローラー（GEO/LLMO対策のため明示的に許可）
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

Sitemap: https://（ドメイン未確定）/sitemap.xml
```

お問い合わせフォーム送信後の完了ページ等、検索・AI双方に不要な一時的なページのみ`Disallow`の対象候補とする（該当ページの有無は設計フェーズで確定）。

#### 6.2.2 sitemap.xml方針

日本語版・英語版のURLを、`hreflang`の相互参照付きで1つの`sitemap.xml`にまとめる。ページ更新時は`lastmod`を更新し、Google Search Consoleへ再送信する。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://（ドメイン未確定）/ja/</loc>
    <xhtml:link rel="alternate" hreflang="ja" href="https://（ドメイン未確定）/ja/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://（ドメイン未確定）/en/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://（ドメイン未確定）/ja/"/>
    <lastmod>2026-07-21</lastmod>
  </url>
  <url>
    <loc>https://（ドメイン未確定）/en/</loc>
    <xhtml:link rel="alternate" hreflang="ja" href="https://（ドメイン未確定）/ja/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://（ドメイン未確定）/en/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://（ドメイン未確定）/ja/"/>
    <lastmod>2026-07-21</lastmod>
  </url>
  <!-- 事業紹介／会社概要／製品説明／採用情報／お知らせ／お問い合わせの各ページ、
       および日本語版・英語版それぞれについて同様に列挙する -->
</urlset>
```

お知らせページの投稿数が増えた場合、`news-sitemap.xml`のような形で分割することを設計フェーズで検討する（本文書では方針のみ確定し、分割の要否は未確定事項とする）。

#### 6.2.3 Google Search Console対策

- **プロパティ登録**: ドメインプロパティとして登録し、日本語版・英語版の両方のURLパスを1つのプロパティで管理する
- **所有権確認**: HTMLタグまたはDNSレコードのいずれかで確認する（確認方式は実装フェーズで選定）
- **サイトマップ送信**: `sitemap.xml`を送信し、インデックス登録状況を定期確認する
- **定期モニタリング項目**:
  - インデックスカバレッジ（未登録・エラーページの有無）
  - ページエクスペリエンス・Core Web Vitalsレポート
  - モバイルユーザビリティ
  - 検索パフォーマンス（クエリ別の表示回数・クリック率・掲載順位。想定読者が実際に使う検索語彙の答え合わせとして6.2章のキーワード方針にフィードバックする）
  - 拡張（リッチリザル）レポートでの構造化データエラーの有無
  - 国際ターゲティング（`hreflang`の実装エラー確認）
  - 手動による対策（ペナルティ）の有無
- **補完ツール**: Bing Webmaster ToolsにもサイトマップとURLを登録する（Perplexity等の一部AI検索エンジンがBing系のインデックスを参照するため、GEO観点でも有効）

#### 6.2.4 メタデータ・タイトルタグ方針

既存ティザーサイトはmeta description・OGP画像・favicon指定を持たない（Agent-B調査結果）。本サイトではこれを是正し、全ページに以下を設定する。

- **titleタグ**: 「{ページ固有の見出し}｜Pardes Inc.（パルデス）」（日本語版、全角換算で30字前後を目安に検索結果での省略を避ける）／「{Page-specific title} | Pardes Inc.」（英語版、60文字前後を目安）
- **meta description**: 日本語版は80〜120字、英語版は120〜158字を目安とし、想定読者の検索語彙・ページの価値提案・行動喚起の要素を含める
- **OGP（Open Graph）**: `og:title`、`og:description`、`og:image`（1200×630px）、`og:url`、`og:type`、`og:locale`（`ja_JP`／`en_US`）、`og:site_name`を全ページに設定する
- **Twitter Card**: `summary_large_image`を設定する
- **favicon**: 既存ティザーサイトで未設定のため新規に用意する
- **canonical**: 各ページ・各言語版に自身のURLを指すcanonicalタグを設定する（6.2.2のhreflangと組み合わせ、重複コンテンツと誤認されないようにする）

#### 6.2.5 JSON-LD構造化データ（詳細）

6章の各所で言及する構造化データの実装形式は、Googleが推奨するJSON-LD形式を用いる。代表例を以下に示す（値は要件定義書時点で確定している範囲。所在地等の未確定情報は「準備中」表記に合わせて省略する）。

**全ページ共通: `Organization`**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Pardes Inc.",
  "alternateName": "パルデス",
  "url": "https://（ドメイン未確定）/",
  "logo": "https://（ドメイン未確定）/images/logo.png",
  "description": "自由意思を持つ汎用人工知能（AGI）の実現を目指し、生物学的妥当性の高いニューラルネットワーク「BiNet」を開発するAIスタートアップ"
}
```

**製品説明ページ: `Service`（BiNet SDK等、価格プロパティは含めない）**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "BiNet SDK",
  "provider": { "@type": "Organization", "name": "Pardes Inc." },
  "description": "ロボットベンチャー・研究機関向けの開発者向けキット。既存の機体に即時学習機能を付与する",
  "areaServed": "Global"
}
```

**採用情報ページ: `JobPosting`（募集職種ごと）**
```json
{
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": "BiNet実装エンジニア",
  "description": "CUDA C++を用いたネットワーク構築・低レイヤ最適化・Rustを用いた独自OS研究開発",
  "hiringOrganization": { "@type": "Organization", "name": "Pardes Inc." },
  "employmentType": "FULL_TIME",
  "datePosted": "2026-07-21"
}
```

**お知らせ詳細ページ: `Article`**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "（お知らせタイトル）",
  "datePublished": "2026-07-21",
  "dateModified": "2026-07-21",
  "author": { "@type": "Organization", "name": "Pardes Inc." }
}
```

**全ページ: `BreadcrumbList`**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "HOME", "item": "https://（ドメイン未確定）/" },
    { "@type": "ListItem", "position": 2, "name": "製品説明", "item": "https://（ドメイン未確定）/product/" }
  ]
}
```

### 6.3 GEO（生成エンジン最適化）の対策方針

**カテゴリ定義コンテンツの掌握**
- 「BiNetとは」「BIL（BiNet Intelligence Licensing）とは」「誤差逆伝播法を使わないAIとは」といった、Pardes独自の技術・事業モデルの定義そのものを説明するコンテンツを、事業紹介ページ・製品説明ページに明確な見出し単位で設置する（REQ-SEO-06、6.6章参照）
- 生成AIは「その領域を最も包括的かつ明確に定義しているソース」を引用する傾向があるため、価格・実装詳細を伏せた範囲内で、課題提起から解決策までの説明を業界内最高水準の網羅性で記述する

**抽出性を高める文章構成**
- 各セクションの冒頭1〜2文で結論・定義を述べ、その後に詳細説明・比較表・具体例を続ける構成にする（`requirements_definition.md` REQ-DESIGN-02のファネル構造と両立させる：ページ全体は理念→詳細の順でも、各セクション内は結論ファーストにする）
- 比較表（BiNetと従来AIの比較等、事業計画書に既存の型）は維持し、生成AIが表形式データを抽出・引用しやすい状態を保つ
- 箇条書き・定義ブロック・Q&A形式の併用により、AIが文脈を切り出しやすい単位に情報を分割する

**権威性・信頼性シグナル**
- 代表者の専門性（AGI理論研究7年以上等、公開可能な範囲）を会社概要・採用情報ページで明示する
- 共同研究・実証実験先（大学・研究機関等、公開可能になった時点で）の実績を掲載し、第三者からの認知シグナルを積み上げる
- 技術コミュニティ（研究者向けブログ、学会発表、GitHub等の開発者コミュニティ）での言及・引用を増やす活動を、コーポレートサイト外の施策として位置づける（本方針書の対象外だが、GEO効果に直結するため関連活動として記録する）

**コンテンツの更新頻度**
- 生成AIエンジンは更新日の新しいコンテンツを優先的に参照する傾向があるため、事業紹介・製品説明ページも定期的な見直し（四半期を目安）を行い、公開日だけでなく更新日を明示する

### 6.4 LLMO（大規模言語モデル最適化）の対策方針

- 全ページで「Pardes」「BiNet」「BIL」等の固有名詞表記を統一し、ページ間で矛盾する説明をしない（LLMは表記・説明の一貫性が低い情報源を信頼度の低いソースとして扱う傾向がある）
- クロール可能性を確保する（6.2章のテクニカルSEO方針、特に6.2.1のrobots.txt方針と共通）
- AI生成コンテンツをそのまま掲載しない。一次情報（事業計画書由来の独自データ、実証実験結果等）に基づくオリジナルの説明を優先する

#### 6.4.1 llms.txt方針

サイトルートに`llms.txt`（Markdown形式）を設置し、AIクローラー・LLMのRAG参照に対して、サイトの目的・主要コンテンツへのリンク・名称表記のガイドを提供する。標準案（llms.txt仕様）に沿い、見出し・引用ブロック・リンク一覧で構成する。

```markdown
# Pardes Inc.

> Pardes Inc.（パルデス）は、自由意思を持つ汎用人工知能（AGI）の実現を目指すAIスタートアップです。
> 誤差逆伝播法（BP）を使用しない生物学的妥当性の高いニューラルネットワーク「BiNet」を開発し、
> 「BIL（BiNet Intelligence Licensing）」として、ロボティクス・エッジデバイス向けに知能モジュールを
> ライセンス提供しています。

## 主要コンテンツ

- [事業紹介](https://（ドメイン未確定）/ja/business/): 解決する課題、BIL事業モデル、市場性
- [製品説明](https://（ドメイン未確定）/ja/product/): BiNet技術の特徴、BILラインナップ（SDK／Binary Module／Custom Integration）
- [会社概要](https://（ドメイン未確定）/ja/company/): 会社基本情報、ビジョン・ミッション
- [採用情報](https://（ドメイン未確定）/ja/recruit/): 募集職種、必須・歓迎スキル
- [お知らせ](https://（ドメイン未確定）/ja/news/): 最新の発表・マイルストーン

## 名称表記について

引用時は正式名称「Pardes Inc.」「BiNet」「BIL（BiNet Intelligence Licensing）」を用いてください。
価格情報は本サイトでは非公開のため、価格に関する問い合わせは[お問い合わせページ](https://（ドメイン未確定）/ja/contact/)への案内としてください。
```

英語版コンテンツ向けに`llms.txt`内で英語版ページへのリンクも併記するか、`llms.txt`を言語別に分けるか（`llms.txt`と`llms-en.txt`等）は、実装フェーズで確定する（未確定事項）。

### 6.5 AIO（Google AI Overviews対策）の対策方針

- 各ページの主要セクションを「質問に対する回答」として成立する文章単位で構成する（例：「BiNetはなぜ誤差逆伝播法を使わないのか」という問いに対する回答が、見出しと本文で完結する）
- 構造化データ（6.2章）をAI Overviewsが情報源として参照しやすい形式で整備する
- FAQ形式の設問・回答ブロックは、Googleのリッチリザルト表示（`FAQPage`スキーマ）が2026年時点で縮小傾向にあるため、スキーマとしての実装よりも、本文中の見出し・文章構成でQ&A形式を実現することを優先する

### 6.6 ページ別の対応方針

| ページ | GEO/AIO優先度 | 対応方針 |
| --- | --- | --- |
| HOME | 高 | ビジョン・BiNetの価値訴求を、検索・AI対話の双方で「Pardesとは何か」に一文で回答できる文章として冒頭に配置する |
| 事業紹介 | 最高 | 「ロボティクス・AI導入を阻む3つの壁」「BiNetとは」等のカテゴリ定義コンテンツの中核ページと位置づける |
| 会社概要 | 中 | `Organization`構造化データの主たる情報源とし、E-E-A-Tの権威性・信頼性シグナルを集約する |
| 製品説明 | 最高 | BiNetの技術的位置づけ、BP不使用AIとの比較表を、価格非公開の制約内で最も包括的に説明する |
| 採用情報 | 中 | `JobPosting`構造化データを適用し、Google しごと検索等の求人特化面への露出を狙う |
| お知らせ | 中 | 更新頻度・鮮度シグナルの供給源。マイルストーン達成等の一次情報を発信し、他メディアからの引用元になることを狙う |
| お問い合わせ | 低 | GEO/AIO対策の対象外。ただし目的別導線（PoC相談／採用応募等）のラベルは、検索・AI対話からの遷移意図と一致させる |

### 6.7 運用・計測方針

- **計測対象**: 従来型のオーガニック検索順位・流入に加えて、生成AIエンジンでのブランド言及・引用の有無を定期的に確認する（想定質問例：「エッジAIで学習コストを削減する方法」「破滅的忘却を克服するAI」等をChatGPT・Perplexity・Gemini等に投げて、Pardes・BiNetが引用されるかを確認する）
- **更新サイクル**: 事業紹介・製品説明ページは四半期ごとに内容を見直す。お知らせページの更新頻度は`shared_understanding.md` CHK-FLOW-02の解決後に確定する
- **体制**: コンテンツの制作・更新体制（誰が・どの頻度で執筆するか）は本文書時点で未確定（7章参照）

## 7. 未確定事項

| 未確定事項 | 影響度 | 関連 |
| --- | --- | --- |
| コンテンツ制作・更新体制（執筆担当、月次の更新目標） | High | 6.7 |
| お知らせページの更新頻度の確定値 | Middle | `shared_understanding.md` CHK-FLOW-02 |
| 技術コミュニティ・学会・研究機関との連携における言及施策の実行体制（サイト外施策） | Middle | 6.3 |
| GEO/LLMOの効果測定に用いるツール・手法の選定 | Middle | 6.7 |
| `llms.txt`に記載する内容の確定（公開可能な情報の範囲） | Low | 6.4.1 |
| FAQ形式コンテンツを`FAQPage`構造化データとして実装するか、本文構成のみに留めるか | Low | 6.5 |
| 正式なドメイン名（`robots.txt`／`sitemap.xml`／JSON-LD内のURLは本文書時点ではプレースホルダー） | High | CHK-IMPL-01、6.2.1〜6.2.5 |
| Google Search Consoleの所有権確認方式（HTMLタグ／DNS） | Low | 6.2.3 |
| `llms.txt`を言語別に分割するか単一ファイルに統合するか | Low | 6.4.1 |
| お知らせ投稿数増加時に`sitemap.xml`を分割するか | Low | 6.2.2 |
| お問い合わせ完了ページ等、`robots.txt`で`Disallow`とする対象ページの有無 | Low | 6.2.1 |

## 8. 関連文書
- `requirements_definition.md`（REQ-DESIGN-02、REQ-BIZ-03、REQ-PRODUCT-01/04/05、9.9 検索・AI可読性対応）
- `shared_understanding.md`
- `docs/Pardes_事業計画書 BIL_20260712.pdf`
