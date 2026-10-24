/**
 * ---------------------------------------------------------------------------
 * PORTFOLIO DATA
 * ---------------------------------------------------------------------------
 * HOW TO ADD / REPLACE ARTWORK
 *
 * 1. Host the original design image anywhere that serves a direct image URL
 *    (your own /public folder, Cloudinary, an S3 bucket, a GitHub repo...).
 *    Tip: drop a file into the project's `public/artwork/` folder and reference
 *    it as `/artwork/my-design.jpg`.
 *
 * 2. Paste that URL into the `image` field of the matching project below
 *    (extra views go into `gallery`), then update `title`, `description`,
 *    `objective` and `deliverables` with the real project details.
 *
 * 3. Delete anything you would rather not show. Categories with no projects
 *    are hidden from the filters automatically.
 *
 * Until a real `image` URL is supplied, a clearly labelled on-brand artwork
 * placeholder is displayed so the layout, filtering and lightbox can all be
 * reviewed first. Placeholder art is never presented as finished client work.
 *
 * `ratio` is width ÷ height. Set it to the artwork's true proportions so every
 * design is shown complete, with no unintended cropping.
 * ---------------------------------------------------------------------------
 */

export type CategoryId =
  | "church"
  | "birthday"
  | "wedding"
  | "event"
  | "social"
  | "logo"
  | "flyer"
  | "brand"
  | "campaign"
  | "experiments";

export type Tone = "brand" | "ink" | "paper" | "slate";

export interface Category {
  id: CategoryId;
  title: string;
  short: string;
  blurb: string;
  tone: Tone;
  variant: number;
  ratio: number;
}

export interface Project {
  id: string;
  title: string;
  category: CategoryId;
  /** Optional secondary tags so one artwork can appear in related filters. */
  also?: CategoryId[];
  ratio: number;
  format: string;
  image?: string;
  gallery?: string[];
  year?: string;
  client?: string;
  description?: string;
  objective?: string;
  deliverables?: string[];
  featured?: boolean;
  tone: Tone;
  variant: number;
}

export const categories: Category[] = [
  {
    id: "church",
    title: "Church Designs",
    short: "Church",
    blurb: "Service flyers, sermon series, conferences, revivals, youth programs and worship events.",
    tone: "brand",
    variant: 0,
    ratio: 4 / 5,
  },
  {
    id: "birthday",
    title: "Birthday Designs",
    short: "Birthday",
    blurb: "Celebration flyers, milestone posters, invitations and personalised photo graphics.",
    tone: "ink",
    variant: 1,
    ratio: 4 / 5,
  },
  {
    id: "wedding",
    title: "Wedding Designs",
    short: "Wedding",
    blurb: "Invitations, save-the-dates, engagement and traditional wedding announcements.",
    tone: "paper",
    variant: 2,
    ratio: 4 / 5,
  },
  {
    id: "event",
    title: "Event Designs",
    short: "Event",
    blurb: "Conferences, seminars, concerts, corporate events, launches and community programs.",
    tone: "brand",
    variant: 3,
    ratio: 3 / 4,
  },
  {
    id: "social",
    title: "Social Media Designs",
    short: "Social Media",
    blurb: "Instagram posts, carousels, adverts, campaign graphics and digital banners.",
    tone: "ink",
    variant: 4,
    ratio: 1,
  },
  {
    id: "logo",
    title: "Logo Design & Brand Marks",
    short: "Logo Design",
    blurb: "Logo projects, brand marks, variation sets and identity presentations.",
    tone: "brand",
    variant: 5,
    ratio: 1,
  },
  {
    id: "flyer",
    title: "Flyer Designs",
    short: "Flyers",
    blurb: "Business, promotional, sales and print-ready advertising flyers.",
    tone: "slate",
    variant: 2,
    ratio: 4 / 5,
  },
  {
    id: "brand",
    title: "Brand Identity",
    short: "Brand Identity",
    blurb: "Complete identity systems — logo variations, colour, typography, stationery, mockups.",
    tone: "ink",
    variant: 0,
    ratio: 4 / 3,
  },
  {
    id: "campaign",
    title: "Digital Campaigns",
    short: "Campaigns",
    blurb: "Coordinated creative sets built around a single campaign, event or promotion.",
    tone: "brand",
    variant: 4,
    ratio: 16 / 9,
  },
  {
    id: "experiments",
    title: "Creative Experiments",
    short: "Experiments",
    blurb: "Illustration, typography explorations and personal projects outside the main categories.",
    tone: "ink",
    variant: 5,
    ratio: 1,
  },
];

/** Compact factory so the list below stays easy to read and edit. */
const slot = (
  id: string,
  title: string,
  category: CategoryId,
  ratio: number,
  format: string,
  tone: Tone,
  variant: number,
  extra: Partial<Project> = {},
): Project => ({ id, title, category, ratio, format, tone, variant, ...extra });

export const projects: Project[] = [
  /* ---------------------------------------------------------- CHURCH */
  slot("church-sunday-flyer", "Sunday Service Flyer", "church", 4 / 5, "Portrait flyer · 4:5", "brand", 0, {
    featured: true,
    description:
      "A weekly service creative built around a clear typographic hierarchy so the service name, time and venue read instantly on a phone screen.",
    deliverables: ["Portrait flyer", "Instagram square crop", "Story format"],
    also: ["flyer", "social"],
  }),
  slot("church-service-square", "Sunday Service Social Post", "church", 1, "Square social post · 1:1", "ink", 3, {
    also: ["social"],
  }),
  slot("church-conference-poster", "Conference & Convention Poster", "church", 3 / 4, "Poster · 3:4", "brand", 1, {
    also: ["event", "flyer"],
  }),
  slot("church-revival-flyer", "Revival & Crusade Poster", "church", 4 / 5, "Portrait flyer · 4:5", "ink", 2, {
    also: ["event"],
  }),
  slot("church-youth-program", "Youth Program Design", "church", 16 / 9, "Landscape banner · 16:9", "brand", 4, {}),
  slot("church-sermon-series", "Sermon Series Graphic", "church", 1, "Square series graphic · 1:1", "paper", 5, {
    also: ["social"],
  }),

  /* -------------------------------------------------------- BIRTHDAY */
  slot("birthday-celebration-flyer", "Birthday Celebration Flyer", "birthday", 4 / 5, "Portrait flyer · 4:5", "ink", 1, {
    featured: true,
    description:
      "A celebratory flyer with a photo-led composition and bold display type, designed to be shared across WhatsApp and Instagram.",
    deliverables: ["Portrait flyer", "Social crop"],
    also: ["flyer"],
  }),
  slot("birthday-milestone-poster", "Milestone Birthday Poster", "birthday", 3 / 4, "Poster · 3:4", "brand", 2, {}),
  slot("birthday-invitation", "Birthday Invitation Card", "birthday", 5 / 7, "Invitation · 5:7", "paper", 3, {}),
  slot("birthday-social-graphic", "Birthday Social Graphic", "birthday", 1, "Square social post · 1:1", "brand", 4, {
    also: ["social"],
  }),

  /* --------------------------------------------------------- WEDDING */
  slot("wedding-invitation", "Wedding Invitation", "wedding", 5 / 7, "Invitation · 5:7", "paper", 0, {
    featured: true,
    description:
      "An elegant invitation built on restrained typography and generous space, with the couple's names carrying the composition.",
    deliverables: ["Print invitation", "Digital share version"],
  }),
  slot("wedding-save-the-date", "Save the Date Graphic", "wedding", 4 / 5, "Portrait · 4:5", "brand", 5, {
    also: ["social"],
  }),
  slot("wedding-traditional", "Traditional Wedding Announcement", "wedding", 1, "Square announcement · 1:1", "ink", 2, {
    also: ["social"],
  }),
  slot("wedding-engagement", "Engagement Graphic", "wedding", 16 / 9, "Landscape banner · 16:9", "paper", 1, {}),

  /* ----------------------------------------------------------- EVENT */
  slot("event-conference-flyer", "Conference Flyer", "event", 4 / 5, "Portrait flyer · 4:5", "brand", 3, {
    also: ["flyer"],
  }),
  slot("event-concert-poster", "Concert & Show Poster", "event", 2 / 3, "Poster · 2:3", "ink", 0, {
    featured: true,
    also: ["flyer"],
  }),
  slot("event-corporate-banner", "Corporate Event Banner", "event", 16 / 9, "Landscape banner · 16:9", "slate", 4, {
    also: ["brand"],
  }),
  slot("event-product-launch", "Product Launch Flyer", "event", 4 / 5, "Portrait flyer · 4:5", "brand", 5, {
    also: ["flyer", "campaign"],
  }),

  /* ---------------------------------------------------- SOCIAL MEDIA */
  slot("social-instagram-post", "Instagram Post", "social", 1, "Instagram post · 1:1", "ink", 4, {
    featured: true,
    description:
      "A feed creative designed to stop the scroll while staying inside the client's existing colour and type system.",
    deliverables: ["Instagram post", "Story adaptation"],
  }),
  slot("social-carousel-cover", "Instagram Carousel Cover", "social", 4 / 5, "Carousel · 4:5", "brand", 1, {}),
  slot("social-advert", "Promotional Ad Creative", "social", 1, "Advert · 1:1", "ink", 2, { also: ["flyer"] }),
  slot("social-banner", "Social Media Banner", "social", 3, "Wide banner · 3:1", "brand", 5, {}),

  /* ------------------------------------------------------------ LOGO */
  slot("logo-mark-presentation", "Logo Design Presentation", "logo", 1, "Identity board · 1:1", "brand", 0, {
    featured: true,
    description:
      "A mark presented as a small system: primary lockup, simplified symbol, reversed version and clear-space guidance.",
    deliverables: ["Primary logo", "Symbol", "Reversed lockup", "Export pack"],
  }),
  slot("logo-symbol-exploration", "Brand Mark Exploration", "logo", 1, "Marksheet · 1:1", "ink", 1, {}),
  slot("logo-variation-sheet", "Logo Variation Sheet", "logo", 4 / 3, "Landscape sheet · 4:3", "paper", 2, {
    also: ["brand"],
  }),
  slot("logo-business-card", "Business Card Design", "logo", 1.75, "Business card · 1.75:1", "slate", 3, {
    also: ["brand"],
  }),

  /* ----------------------------------------------------------- FLYER */
  slot("flyer-business-promo", "Business Promotional Flyer", "flyer", 4 / 5, "Portrait flyer · 4:5", "brand", 4, {
    also: ["event"],
  }),
  slot("flyer-sales-discount", "Sales & Discount Flyer", "flyer", 1, "Square flyer · 1:1", "ink", 5, {
    also: ["social"],
  }),
  slot("flyer-service-advert", "Service Advertisement", "flyer", 2 / 3, "Portrait advert · 2:3", "slate", 0, {}),
  slot("flyer-print-ready", "Print-Ready Flyer", "flyer", 0.707, "A-series flyer · 1:1.414", "paper", 1, {}),

  /* ----------------------------------------------------------- BRAND */
  slot("brand-identity-presentation", "Brand Identity Presentation", "brand", 4 / 3, "Presentation · 4:3", "ink", 0, {
    featured: true,
    description:
      "A complete identity system laid out as one presentation — mark, palette, typography and application so the brand reads consistently.",
    deliverables: ["Identity presentation", "Colour & type system", "Stationery", "Brand applications"],
  }),
  slot("brand-colour-typography", "Colour & Typography System", "brand", 16 / 9, "System board · 16:9", "paper", 3, {}),
  slot("brand-stationery", "Stationery & Collateral", "brand", 4 / 3, "Mockup board · 4:3", "slate", 5, {}),

  /* -------------------------------------------------------- CAMPAIGN */
  slot("campaign-key-visual", "Campaign Key Visual", "campaign", 1, "Key visual · 1:1", "brand", 2, {
    also: ["social"],
  }),
  slot("campaign-social-set", "Campaign Social Set", "campaign", 16 / 9, "Campaign board · 16:9", "ink", 4, {
    also: ["social"],
  }),
  slot("campaign-banner-set", "Campaign Banner Set", "campaign", 3, "Banner set · 3:1", "brand", 0, {}),

  /* ----------------------------------------------------- EXPERIMENTS */
  slot("experiment-typography", "Typography Exploration", "experiments", 4 / 5, "Specimen · 4:5", "ink", 1, {}),
  slot("experiment-composition", "Experimental Composition", "experiments", 1, "Composition · 1:1", "brand", 5, {}),
];

/* ----------------------------------------------------------- HELPERS */

export const projectsByCategory = (id: CategoryId | "all") =>
  id === "all" ? projects : projects.filter((p) => p.category === id || p.also?.includes(id));

export const countByCategory = (id: CategoryId | "all") => projectsByCategory(id).length;

export const featuredProjects = projects.filter((p) => p.featured);

export const getCategory = (id: CategoryId) => categories.find((c) => c.id === id);

export const getProject = (id: string) => projects.find((p) => p.id === id);

/** Projects that share a category — used for the "related work" rows. */
export const relatedProjects = (project: Project, limit = 4) =>
  projects
    .filter((p) => p.id !== project.id && (p.category === project.category || p.also?.includes(project.category)))
    .slice(0, limit);
