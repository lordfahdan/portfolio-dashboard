export async function trackVisitor(
  event: VisitorEvent = {},
) {
  try {
    const isTracked =
      sessionStorage.getItem(TRACKED_KEY);

    const sessionId = getSessionId();
    const pageViews = getPageViews();

    const isNewVisitor = !isTracked;

    if (isNewVisitor) {
      sessionStorage.setItem(
        TRACKED_KEY,
        "true",
      );
    }

    const browserTimezone =
      Intl.DateTimeFormat().resolvedOptions().timeZone ||
      "Unknown";

    const language =
      navigator.language || "Unknown";

    const data = {
      eventType:
        event.eventType ||
        (isNewVisitor
          ? "NEW VISITOR"
          : "PAGE VIEW"),

      sessionId,

      pathname: window.location.pathname,

      title: document.title,

      referrer:
        document.referrer || "Direct",

      url: window.location.href,

      browserTimezone,

      language,

      screenWidth: window.screen.width,

      screenHeight: window.screen.height,

      device: detectDevice(),

      os: detectOS(),

      browser: detectBrowser(),

      pageViews,

      previousPage:
        event.previousPage || undefined,

      duration:
        event.duration || undefined,
    };

    await fetch("/api/visitor", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),

      keepalive: true,
    });
  } catch (error) {
    console.debug(
      "Visitor tracking unavailable:",
      error,
    );
  }
}
