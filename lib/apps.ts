export type Platform = "Android" | "iPhone" | "Desktop" | "Web"

export interface AppData {
  slug: string
  name: string
  /** One short line, the app's promise in plain words. */
  tagline: string
  /** One or two sentences on what it does. */
  summary: string
  /** The open-source app it was rebuilt from; omit for apps built from scratch. */
  origin?: { name: string; author?: string; url: string }
  platforms: Platform[]
  /** Omit while the repository is private, so the page never links to a 404. */
  repoUrl?: string
  demoUrl?: string
  playUrl?: string
  /** Screenshots in /public/<slug>/, first one leads the hero. */
  /** `backdrop` fills the frame around an image that is wider than 40:21. */
  images: { file: string; alt: string; backdrop?: string }[]
}

export const apps: AppData[] = [
  {
    slug: "keepout",
    name: "Keepout",
    tagline: "See every connection. Stop the ones you didn't ask for.",
    summary:
      "A firewall, encrypted DNS and VPN for Android, no root needed. Block any app on Wi-Fi or mobile data and read where each app went.",
    origin: {
      name: "Rethink DNS + Firewall",
      author: "Celzero",
      url: "https://github.com/celzero/rethink-app",
    },
    platforms: ["Android"],
    repoUrl: "https://github.com/bernaferrari/rethink-app",
    images: [
      { file: "hero", alt: "Keepout's network log, Home with protection on, and the app list" },
      {
        file: "tools",
        alt: "An app cut off on Wi-Fi and mobile data, DNS in use, and the most blocked apps",
      },
      { file: "before-after", alt: "Rethink's home and app list beside Keepout's" },
      { file: "big-screen", alt: "Keepout on a tablet" },
    ],
  },
  {
    slug: "quietguard",
    name: "QuietGuard",
    tagline: "Decide which apps reach the internet.",
    summary:
      "A private firewall for Android. No root, no account, and nothing leaves your phone. The filtering engine is rewritten in Rust.",
    origin: {
      name: "NetGuard",
      author: "Marcel Bokhorst",
      url: "https://github.com/M66B/NetGuard",
    },
    platforms: ["Android", "Web"],
    repoUrl: "https://github.com/bernaferrari/QuietGuard",
    demoUrl: "https://quietguard.vercel.app/",
    images: [
      { file: "hero", alt: "QuietGuard's firewall with apps allowed and blocked" },
      {
        file: "rules",
        alt: "Per-app rules, the log of blocked connections, and lockdown settings",
      },
      { file: "before-after", alt: "NetGuard beside QuietGuard" },
      {
        file: "big-screen",
        alt: "QuietGuard on a tablet with the app list beside one app's rules",
      },
    ],
  },
  {
    slug: "wordkeep",
    name: "Wordkeep",
    tagline: "Every note, a plain file.",
    summary:
      "Markdown notes and to-do lists. Write with highlighting, read a clean preview, and keep every word in a file you own.",
    origin: {
      name: "Markor",
      author: "Gregor Santner",
      url: "https://github.com/gsantner/markor",
    },
    platforms: ["Android", "iPhone", "Web"],
    repoUrl: "https://github.com/bernaferrari/markor",
    demoUrl: "https://markor-five.vercel.app/",
    images: [
      {
        file: "hero",
        alt: "The whole notebook on a tablet, and a note written in plain Markdown on a phone",
      },
      {
        file: "notebook-1",
        alt: "Plain-file notes, a clean preview, checklists and search",
        backdrop: "#f8f0e5",
      },
      { file: "notebook-2", alt: "Note colors, real folders and themes", backdrop: "#f8f0e5" },
      { file: "before-after", alt: "Markor beside Wordkeep" },
      { file: "big-screen", alt: "Wordkeep on a tablet" },
    ],
  },
  {
    slug: "calcula",
    name: "Calcula",
    tagline: "Flick a key. Get a function.",
    summary:
      "A calculator with scientific functions a flick away, answers that update as you type, graphs, unit conversion and a history you can reuse.",
    origin: {
      name: "Calculator++",
      author: "Sergey Solovyev",
      url: "https://github.com/serso/android-calculatorpp",
    },
    platforms: ["Android", "iPhone", "Web"],
    repoUrl: "https://github.com/bernaferrari/calcula",
    images: [
      {
        file: "hero",
        alt: "A graph, units, the 7 key mid-flick with sin chosen, programmer mode and themes",
      },
      {
        file: "tools",
        alt: "Graphing functions, converting temperature and working in hexadecimal",
      },
      { file: "customize", alt: "Calcula's themes and keypad options" },
      { file: "before-after", alt: "Calculator++ beside Calcula" },
      { file: "big-screen", alt: "Calcula on a tablet" },
    ],
  },
  {
    slug: "changedetection",
    name: "ChangeDetection",
    tagline: "Stop refreshing. See what changed.",
    summary:
      "Watch prices, restocks, deadlines or any page you keep checking. Get an alert, open it, and see exactly what moved.",
    origin: {
      name: "its own 2018 app",
      url: "https://github.com/bernaferrari/ChangeDetection/tree/2.2",
    },
    platforms: ["Android", "iPhone", "Desktop", "Web"],
    repoUrl: "https://github.com/bernaferrari/ChangeDetection",
    playUrl: "https://play.google.com/store/apps/details?id=com.bernaferrari.changedetection",
    images: [
      { file: "banner", alt: "ChangeDetection watching a set of pages" },
      {
        file: "what-changed",
        alt: "A product page with its new price marked, and a deadline that moved",
      },
      { file: "tools", alt: "An alert, fast checks every 30 seconds, and every saved version" },
      { file: "big-screen", alt: "ChangeDetection on a tablet" },
    ],
  },
  {
    slug: "wifi-weakspot",
    name: "WiFi Weakspot",
    tagline: "See where your Wi-Fi gets weak, room by room.",
    summary:
      "A Wi-Fi analyzer that draws every nearby network as a wave, suggests a quieter channel and maps your home from weak to strong.",
    platforms: ["Android"],
    repoUrl: "https://github.com/bernaferrari/wifi-weakspot",
    images: [
      { file: "channels", alt: "Nearby networks drawn as waves across 2.4, 5 and 6 GHz" },
      { file: "tools", alt: "Router check and the devices on your Wi-Fi" },
      { file: "big-screen", alt: "A coverage map of a home on a tablet" },
    ],
  },
  {
    slug: "lumina",
    name: "Lumina",
    tagline: "Your Hyprland desktop, in your pocket.",
    summary:
      "A remote desktop made for Omarchy and Hyprland. Your workspaces, windows, keyboard and menu from a phone, tablet, computer or browser. No account, no cloud.",
    platforms: ["Android", "iPhone", "Desktop", "Web"],
    images: [
      {
        file: "hero",
        alt: "Saved computers, a live session above Lumina's keyboard, and its themes",
      },
      {
        file: "tools",
        alt: "Adding a computer, windows grouped by workspace, and the Omarchy menu",
      },
      { file: "big-screen", alt: "Lumina on a tablet" },
    ],
  },
]

export const imageSrc = (app: AppData, file: string) => `/${app.slug}/${file}.webp`
export const iconSrc = (app: AppData) => `/${app.slug}/icon.png`
