import fs from "node:fs";
import path from "node:path";

const REFERENCE_DIR = path.join(process.cwd(), "reference", "matsuo-komuten-mirror");

/**
 * 参照サイト(松尾工務店)のミラーHTMLから<body>内側だけを取り出す共通処理。
 * home/business/company の各ページから同じロジックで呼び出す。
 */
export function readReferencePageBody(fileName: string): string {
  const filePath = path.join(REFERENCE_DIR, fileName);
  // CRLFのままdangerouslySetInnerHTMLに渡すと、改行コードの扱いの違いにより
  // SSRとハイドレーション時で文字列が食い違いhydration mismatchが発生するため、
  // 読み込み時点でLFに正規化する。
  const html = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");
  const bodyStart = html.indexOf(">", html.indexOf("<body")) + 1;
  const bodyEnd = html.lastIndexOf("</body>");

  if (bodyStart <= 0 || bodyEnd <= bodyStart) {
    throw new Error(`The reference page "${fileName}" does not contain a valid body.`);
  }

  return html
    .slice(bodyStart, bodyEnd)
    .replace(
      "try { sessionStorage.setItem('openingAnimePlayed', 'true'); }",
      "document.body.setAttribute('x-data', '');\n        try { sessionStorage.setItem('openingAnimePlayed', 'true'); }"
    )
    .replaceAll('id="page-wrapper" style="opacity:0;"', 'id="page-wrapper" style="opacity:1;"')
    .replaceAll('x-text=" currentsectionnum"', 'x-text="currentSectionNum"');
}
