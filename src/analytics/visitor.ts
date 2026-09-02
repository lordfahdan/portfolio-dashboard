type VisitorEvent = {
  eventType?: "NEW VISITOR" | "PAGE VIEW";
  previousPage?: string;
  duration?: number;
};

const SESSION_KEY = "lord_visitor_session";
const PAGE_VIEW_KEY = "lord_visitor_page_views";
const TRACKED_KEY = "lord_visitor_tracked";

function getSessionId(): string {
  let sessionId = sessionStorage.getItem(SESSION_KEY);

  if (!sessionId) {
    sessionId = crypto.randomUUID();

    sessionStorage.setItem(
      SESSION_KEY,
      sessionId,
    );
  }

  return sessionId;
}

function getPageViews(): number {
  const current =
    Number(
      sessionStorage.getItem(PAGE_VIEW_KEY),
    ) || 0;

  const next = current + 1;

  sessionStorage.setItem(
    PAGE_VIEW_KEY,
    String(next),
  );

  return next;
}

function detectDevice(): string {
  const width = window.innerWidth;

  if (width < 768) {
    return "Mobile";
  }

  if (width < 1024) {
    return "Tablet";
  }

  return "Desktop";
}

function detectOS(): string {
  const ua = navigator.userAgent;

  if (/Windows NT/i.test(ua)) {
    return "Windows";
  }

  if (/Android/i.test(ua)) {
    return "Android";
  }

  if (/iPhone|iPad|iPod/i.test(ua)) {
    return "iOS";
  }

  if (/Mac OS X/i.test(ua)) {
    return "macOS";
  }

  if (/Linux/i.test(ua)) {
    return "Linux";
  }

  return "Unknown";
}

function detectBrowser(): string {
  const ua = navigator.userAgent;

  if (/Edg/i.test(ua)) {
    return "Microsoft Edge";
  }

  if (/OPR|Opera/i.test(ua)) {
    return "Opera";
  }

  if (/Firefox/i.test(ua)) {
    return "Firefox";
  }

  if (/Chrome/i.test(ua)) {
    return "Chrome";
  }

  if (/Safari/i.test(ua)) {
    return "Safari";
  }

  return "Unknown";
}

export async function trackVisitor(
  event: VisitorEvent = {},
): Promise<void> {
  try {
    const sessionId = getSessionId();

    const pageViews = getPageViews();

    const isTracked =
      sessionStorage.getItem(TRACKED_KEY);

    const isNewVisitor = !isTracked;

    if (isNewVisitor) {
      sessionStorage.setItem(
        TRACKED_KEY,
        "true",
      );
    }

    const browserTimezone =
      Intl.DateTimeFormat().resolvedOptions()
        .timeZone || "Unknown";

    const language =
      navigator.language || "Unknown";

    const data = {
      eventType:
        event.eventType ||
        (isNewVisitor
          ? "NEW VISITOR"
          : "PAGE VIEW"),

      sessionId,

      pathname:
        window.location.pathname,

      title:
        document.title,

      referrer:
        document.referrer || "Direct",

      url:
        window.location.href,

      browserTimezone,

      language,

      screenWidth:
        window.screen.width,

      screenHeight:
        window.screen.height,

      device:
        detectDevice(),

      os:
        detectOS(),

      browser:
        detectBrowser(),

      pageViews,

      previousPage:
        event.previousPage,

      duration:
        event.duration,
    };

    const response = await fetch(
      "/api/visitor",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(data),

        keepalive: true,
      },
    );

    if (!response.ok) {
      console.debug(
        "Visitor API returned:",
        response.status,
      );
    }
  } catch (error) {
    console.debug(
      "Visitor tracking unavailable:",
      error,
    );
  }
}
