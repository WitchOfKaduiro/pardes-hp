import { NextResponse } from "next/server";
import { purgeExpiredContactSubmissions } from "@/lib/contact/store";

/**
 * Vercel Cron から定期実行され、保持期間（約1年）を超えたお問い合わせ
 * データを削除する（REQ-CONTACT-06）。スケジュールは vercel.json 参照。
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const result = await purgeExpiredContactSubmissions();
  return NextResponse.json(result);
}
