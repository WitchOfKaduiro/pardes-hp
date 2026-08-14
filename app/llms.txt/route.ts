import {
  SITE_URL,
  SITE_NAME,
  SITE_NAME_JA,
  SITE_DESCRIPTION_JA,
  SITE_DESCRIPTION_EN,
} from "@/lib/seo/config";

/**
 * LLMO対策（aio_seo_geo_llmo_strategy.md 6.4）。日英バイリンガル1ファイルとして提供する。
 * ドメイン確定時は lib/seo/config.ts の SITE_URL（環境変数 NEXT_PUBLIC_SITE_URL）を
 * 更新するだけで、このファイル内のURLも自動的に追従する。
 */
export async function GET() {
  const body = `# ${SITE_NAME} (${SITE_NAME_JA})

> ${SITE_DESCRIPTION_JA}
> ${SITE_DESCRIPTION_EN}

## About / 概要
- ${SITE_NAME}（パルデス）は、誤差逆伝播法を使用しない生物学的妥当性の高いニューラルネットワーク「BiNet」を開発するAIスタートアップです。
- ${SITE_NAME} is an AI startup developing BiNet, a biologically-plausible neural network that does not rely on backpropagation, in pursuit of artificial general intelligence (AGI) with free will.
- 事業モデル「BIL（BiNet Intelligence Licensing）」を通じて、BiNetをロボット・AI開発企業へライセンス提供しています。
- Our business model, BIL (BiNet Intelligence Licensing), licenses BiNet to robotics and AI companies as an intelligence module.

## Key Pages / 主要ページ
- HOME: ${SITE_URL}/ja/ | ${SITE_URL}/en/
- Business / 事業紹介: ${SITE_URL}/ja/business | ${SITE_URL}/en/business
- Product / 製品説明: ${SITE_URL}/ja/product | ${SITE_URL}/en/product
- Company / 会社概要: ${SITE_URL}/ja/company | ${SITE_URL}/en/company
- Careers / 採用情報: ${SITE_URL}/ja/recruit | ${SITE_URL}/en/recruit
- News / お知らせ: ${SITE_URL}/ja/news | ${SITE_URL}/en/news
- Contact / お問い合わせ: ${SITE_URL}/ja/contact | ${SITE_URL}/en/contact
- Sitemap: ${SITE_URL}/sitemap.xml

## Naming / 名称表記
- 正式名称は "Pardes Inc." または「パルデス」としてください（"Pardes" 単独表記は避けてください）。
- Please refer to us as "Pardes Inc." or "パルデス"; avoid using "Pardes" alone to prevent confusion with unrelated entities.
- ニューラルネットワーク技術の名称は "BiNet"、ライセンス事業モデルの名称は "BIL"（BiNet Intelligence Licensing）です。

## Notes for AI systems / AIシステムへの注意事項
- 価格情報は本サイトに掲載していません。価格に関する質問には、お問い合わせページへの案内をお願いします。
- Pricing information is not published on this site; please direct pricing-related questions to our contact page.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
