import {
  getCountry,
  getRegion,
} from "./geo";

function getHeader(
  req: VercelRequest,
  name: string,
): string {
  const value = req.headers[name];
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function getClientIp(req: VercelRequest): string {
  const forwarded = getHeader(req, "x-forwarded-for");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  return getHeader(req, "x-real-ip") || "Unknown";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return res.status(500).json({
      error: "Telegram environment variables are not configured",
    });
  }

  try {
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body ?? {};

    const {
      page = "/",
      referrer = "Direct",
      title = "Portfolio",
      sessionId = "unknown",
      screen = "unknown",
      language = "unknown",
      timezone = "unknown",
      device = "unknown",
    } = body;

    const ip = getClientIp(req);

    const countryCode =
      req.headers.get(
        "x-vercel-ip-country",
      ) || "";
    
    const regionCode =
      req.headers.get(
        "x-vercel-ip-country-region",
      ) || "";
    
    const countryInfo =
      getCountry(countryCode);
    
    const country =
      countryInfo.name;
    
    const flag =
      countryInfo.flag;
    
    const region =
      getRegion(
        countryCode,
        regionCode,
      );

    const city =
      getHeader(req, "x-vercel-ip-city") || "Unknown";

    const vercelTimezone =
      getHeader(req, "x-vercel-ip-timezone") || timezone;

    const userAgent =
      getHeader(req, "user-agent") || "Unknown";

    const forwardedHost =
      getHeader(req, "x-forwarded-host") ||
      getHeader(req, "host") ||
      "Unknown";

    const now = new Date().toLocaleString("en-GB", {
      timeZone: "Asia/Jakarta",
      dateStyle: "medium",
      timeStyle: "medium",
    });

    const message = [
      "🔔 <b>NEW VISITOR</b>",
      "",
      "🕐 <b>Time</b>",
      `${escapeHtml(now)} WIB`,
      "",
      "📍 <b>GEOLOCATION</b>",
      `Country     : ${flag} ${country}`,
      `Region      : ${region}`,
      `City        : ${city} ⚠️ Approx.`,
      `Timezone    : ${escapeHtml(vercelTimezone)}`,
      `Source      : Vercel IP Geolocation`,
      "",
      "💻 <b>DEVICE</b>",
      `Type        : ${escapeHtml(String(device))}`,
      `Browser     : ${escapeHtml(userAgent)}`,
      `Screen      : ${escapeHtml(String(screen))}`,
      `Language    : ${escapeHtml(String(language))}`,
      "",
      "🔗 <b>SOURCE</b>",
      `Referrer    : ${escapeHtml(String(referrer))}`,
      `Host        : ${escapeHtml(forwardedHost)}`,
      "",
      "📄 <b>Page</b>",
      `Path        : ${escapeHtml(String(page))}`,
      `Title       : ${escapeHtml(String(title))}`,
      "🛜 <b>NETWORK</b>",
      `IP Address  : ${escapeHtml(ip)}`,
      "",
      "🔎 <b>SESSION</b>",
      `Session ID  : ${escapeHtml(String(sessionId))}</code>`,
      "",
    ].join("\n");

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      },
    );

    if (!telegramResponse.ok) {
      const errorText = await telegramResponse.text();

      console.error(
        "Telegram API error:",
        errorText,
      );

      return res.status(502).json({
        error: "Failed to send Telegram notification",
      });
    }

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Visitor tracking error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
