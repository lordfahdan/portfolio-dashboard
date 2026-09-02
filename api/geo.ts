type CountryInfo = {
  name: string;
  flag: string;
};

type RegionMap = Record<string, string>;

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

export function getFlag(
  countryCode: string | null | undefined,
): string {
  return getCountry(countryCode).flag;
}
