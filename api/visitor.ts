export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: {
        Allow: "POST",
      },
    });
  }

  try {
    const body = await req.json();

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Telegram environment variables are missing");

      return new Response("Server configuration error", {
        status: 500,
      });
    }

    // IP visitor
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip =
      forwardedFor?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "Unknown";

    // Vercel geolocation headers
    const country =
      req.headers.get("x-vercel-ip-country") || "Unknown";

    const region =
      req.headers.get("x-vercel-ip-country-region") || "Unknown";

    const city =
      req.headers.get("x-vercel-ip-city") || "Unknown";

    const ipTimezone =
      req.headers.get("x-vercel-ip-timezone") || "Unknown";

    // Client data
    const {
      sessionId,
      pathname,
      title,
      referrer,
      url,
      browserTimezone,
      language,
      screenWidth,
      screenHeight,
      device,
      os,
      browser,
      eventType = "NEW VISITOR",
      pageViews = 1,
      previousPage,
      duration,
    } = body;

    const now = new Date();

    const time = new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Jakarta",
      dateStyle: "medium",
      timeStyle: "medium",
    }).format(now);

    const timezoneMatch =
      browserTimezone !== "Unknown" &&
      ipTimezone !== "Unknown"
        ? browserTimezone === ipTimezone
        : null;

    const timezoneSignal =
      timezoneMatch === null
        ? "⚪ Unknown"
        : timezoneMatch
          ? "✅ Match"
          : "⚠️ Mismatch";

    const message = `
━━━━━━━━━━━━━━━━━━━━━━━━━━
${eventType === "NEW VISITOR" ? "🔔 NEW VISITOR" : "📄 PAGE VIEW"}
━━━━━━━━━━━━━━━━━━━━━━━━━━

🕐 TIME
${time} WIB

🌐 CONNECTION
IP        : ${ip}
Country   : ${country}
Region    : ${region}
City      : ${city} ⚠️ Approx.
IP TZ     : ${ipTimezone}

💻 DEVICE
Type      : ${device || "Unknown"}
OS        : ${os || "Unknown"}
Browser   : ${browser || "Unknown"}
Screen    : ${screenWidth || "?"} × ${screenHeight || "?"}
Language  : ${language || "Unknown"}
Timezone  : ${browserTimezone || "Unknown"}

📍 GEOLOCATION
Location  : ${city}, ${region}, ${country}
Accuracy  : ⚠️ IP-based / Approximate

📄 PAGE
Path      : ${pathname || "/"}
Title     : ${title || "Unknown"}
Referrer  : ${referrer || "Direct"}
URL       : ${url || "Unknown"}

🔎 SESSION
Session ID : ${sessionId || "Unknown"}
Page Views : ${pageViews}

${previousPage ? `Previous   : ${previousPage}` : ""}
${duration ? `Duration   : ${duration}s` : ""}

⚠️ SIGNALS
IP/Timezone : ${timezoneSignal}
Language    : ${language || "Unknown"}

━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message.trim(),
          disable_web_page_preview: true,
        }),
      },
    );

    if (!telegramResponse.ok) {
      const error = await telegramResponse.text();

      console.error("Telegram API error:", error);

      return new Response("Failed to send Telegram message", {
        status: 502,
      });
    }

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error("Visitor tracking error:", error);

    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
