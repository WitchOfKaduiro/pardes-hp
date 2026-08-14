const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Cloudflare Turnstileでの検証（REQ-CONTACT-04）。
 * TURNSTILE_SECRET_KEY が未設定の場合（ローカル開発・キー未取得の段階）は、
 * 本番以外の環境に限り検証をスキップする。
 */
export async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    console.warn(
      "[contact] TURNSTILE_SECRET_KEY is not set. Skipping spam verification (non-production fallback)."
    );
    return process.env.NODE_ENV !== "production";
  }

  const response = await fetch(VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });

  const data = (await response.json()) as { success: boolean };
  return data.success;
}
