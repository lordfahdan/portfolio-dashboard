const SESSION_KEY = "portfolio_session_id";
const SESSION_STARTED_KEY = "portfolio_session_started";

function getSessionId(): string {
  const existing = sessionStorage.getItem(SESSION_KEY);

  if (existing) {
    return existing;
  }

  const id =
    crypto.randomUUID?.() ??
    `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}`;

  sessionStorage.setItem(SESSION_KEY, id);
  sessionStorage.setItem(
    SESSION_STARTED_KEY,
    Date.now().toString(),
  );

  return id;
}

function getDevice(): string {
  const width = window.innerWidth;

  if (width < 640) return "Mobile";
  if (width < 1024) return "Tablet";

  return "Desktop";
}

function getReferrer(): string {
  if (!document.referrer) {
    return "Direct";
  }

  try {
    const url = new URL(document.referrer);

    return url.hostname;
  } catch {
    return document.referrer;
  }
}

export async function trackVisitor(): Promise<void> {
  try {
    const payload = {
      page: window.location.pathname,
      title: document.title,
      referrer: getReferrer(),

      sessionId: getSessionId(),

      screen: `${window.screen.width} × ${window.screen.height}`,

      language: navigator.language,

      timezone:
        Intl.DateTimeFormat().resolvedOptions()
          .timeZone,

      device: getDevice(),
    };

    await fetch("/api/visitor", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),

      keepalive: true,
    });
  } catch (error) {
    // Analytics must NEVER break the portfolio.
    console.debug(
      "Visitor tracking unavailable:",
      error,
    );
  }
}
