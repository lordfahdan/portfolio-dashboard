const COUNTRIES: Record<string, CountryInfo> = {
  ID: {
    name: "Indonesia",
    flag: "🇮🇩",
  },

  SG: {
    name: "Singapore",
    flag: "🇸🇬",
  },

  MY: {
    name: "Malaysia",
    flag: "🇲🇾",
  },

  TH: {
    name: "Thailand",
    flag: "🇹🇭",
  },

  VN: {
    name: "Vietnam",
    flag: "🇻🇳",
  },

  PH: {
    name: "Philippines",
    flag: "🇵🇭",
  },

  JP: {
    name: "Japan",
    flag: "🇯🇵",
  },

  KR: {
    name: "South Korea",
    flag: "🇰🇷",
  },

  CN: {
    name: "China",
    flag: "🇨🇳",
  },

  IN: {
    name: "India",
    flag: "🇮🇳",
  },

  AU: {
    name: "Australia",
    flag: "🇦🇺",
  },

  US: {
    name: "United States",
    flag: "🇺🇸",
  },

  CA: {
    name: "Canada",
    flag: "🇨🇦",
  },

  GB: {
    name: "United Kingdom",
    flag: "🇬🇧",
  },

  DE: {
    name: "Germany",
    flag: "🇩🇪",
  },

  FR: {
    name: "France",
    flag: "🇫🇷",
  },

  NL: {
    name: "Netherlands",
    flag: "🇳🇱",
  },

  IT: {
    name: "Italy",
    flag: "🇮🇹",
  },

  ES: {
    name: "Spain",
    flag: "🇪🇸",
  },

  BR: {
    name: "Brazil",
    flag: "🇧🇷",
  },

  RU: {
    name: "Russia",
    flag: "🇷🇺",
  },

  TR: {
    name: "Turkey",
    flag: "🇹🇷",
  },

  AE: {
    name: "United Arab Emirates",
    flag: "🇦🇪",
  },

  SA: {
    name: "Saudi Arabia",
    flag: "🇸🇦",
  },
};

/*
 * Indonesia
 *
 * ISO 3166-2:
 * ID-AC = Aceh
 * ID-SU = Sumatera Utara
 * etc.
 */

const INDONESIA_REGIONS: RegionMap = {
  AC: "Aceh",
  SU: "Sumatera Utara",
  SB: "Sumatera Barat",
  RI: "Riau",
  KR: "Kepulauan Riau",
  JA: "Jambi",
  SS: "Sumatera Selatan",
  BE: "Bengkulu",
  LA: "Lampung",
  BB: "Kepulauan Bangka Belitung",

  JK: "DKI Jakarta",
  JB: "Jawa Barat",
  BT: "Banten",
  JT: "Jawa Tengah",
  YO: "DI Yogyakarta",
  JI: "Jawa Timur",

  BA: "Bali",
  NB: "Nusa Tenggara Barat",
  NT: "Nusa Tenggara Timur",

  KB: "Kalimantan Barat",
  KT: "Kalimantan Tengah",
  KS: "Kalimantan Selatan",
  KI: "Kalimantan Timur",
  KU: "Kalimantan Utara",

  SA: "Sulawesi Utara",
  ST: "Sulawesi Tengah",
  SN: "Sulawesi Selatan",
  SG: "Sulawesi Tenggara",
  GO: "Gorontalo",
  SR: "Sulawesi Barat",

  MA: "Maluku",
  MU: "Maluku Utara",

  PA: "Papua",
  PB: "Papua Barat",
  PS: "Papua Selatan",
  PT: "Papua Tengah",
  PE: "Papua Pegunungan",
  PJ: "Papua Barat Daya",
};

function normalizeCode(
  value: string | null | undefined,
): string {
  if (!value) {
    return "";
  }

  return value
    .trim()
    .toUpperCase();
}

export function getCountry(
  countryCode: string | null | undefined,
): CountryInfo {
  const code =
    normalizeCode(countryCode);

  return (
    COUNTRIES[code] || {
      name: code || "Unknown",
      flag: "🌐",
    }
  );
}

export function getRegion(
  countryCode: string | null | undefined,
  regionCode: string | null | undefined,
): string {
  const country =
    normalizeCode(countryCode);

  let region =
    normalizeCode(regionCode);

  /*
   * Handle:
   *
   * SU
   * ID-SU
   * id-su
   */

  if (
    region.startsWith(
      `${country}-`,
    )
  ) {
    region = region.slice(
      country.length + 1,
    );
  }

  if (country === "ID") {
    return (
      INDONESIA_REGIONS[region] ||
      region ||
      "Unknown"
    );
  }

  return region || "Unknown";
}

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

    const countryCode = req.headers["x-vercel-ip-country"] || "";
    
    const regionCode = req.headers["x-vercel-ip-country-region"] || "";
    
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
      `Country     : ${escapeHtml(flag)} ${escapeHtml(country)}`,
      `Region      : ${escapeHtml(region)}`,
      `City        : ${escapeHtml(city)} ⚠️ Approx.`,
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
