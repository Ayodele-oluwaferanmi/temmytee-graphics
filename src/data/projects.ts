/**
 * ---------------------------------------------------------------------------
 * PORTFOLIO DATA
 * ---------------------------------------------------------------------------
 * HOW TO ADD / REPLACE ARTWORK
 *
 * 1. Put the original design image in its matching folder under
 *    `public/images/`, then reference it as `/images/category/my-design.jpg`.
 *
 * 2. Paste that URL into the `image` field of the matching project below
 *    (extra views go into `gallery`), then update `title`, `description`,
 *    `objective` and `deliverables` with the real project details.
 *
 * 3. Delete anything you would rather not show. Categories with no projects
 *    are hidden from the filters automatically.
 *
 * Until a real `image` URL is supplied, a clearly labelled on-brand artwork
 * placeholder is displayed. Placeholder art is never presented as finished work.
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
    image: "/images/church/20260424_072133.jpg",
    featured: true,
    description:
      "A weekly service creative built around a clear typographic hierarchy so the service name, time and venue read instantly on a phone screen.",
    deliverables: ["Portrait flyer", "Instagram square crop", "Story format"],
    also: ["flyer", "social"],
  }),
  slot("church-service-square", "Sunday Service Social Post", "church", 1, "Square social post · 1:1", "ink", 3, {
    image: "/images/church/20260512_140311.jpg",
    also: ["social"],
  }),
  slot("church-conference-poster", "Conference & Convention Poster", "church", 4 / 5, "Portrait poster · 4:5", "brand", 1, {
    image: "/images/church/20260515_193027.jpg",
    also: ["event", "flyer"],
  }),
  slot("church-revival-flyer", "Revival & Crusade Poster", "church", 4 / 5, "Portrait flyer · 4:5", "ink", 2, {
    image: "/images/church/20260930_183240.jpg",
    also: ["event"],
  }),
  slot("church-youth-program", "Youth Program Design", "church", 4 / 5, "Portrait flyer · 4:5", "brand", 4, {
    image: "/images/church/20260515_200242.jpg",
  }),
  slot("church-sermon-series", "Sermon Series Graphic", "church", 4 / 5, "Portrait poster · 4:5", "paper", 5, {
    image: "/images/church/20260822_134725.jpg",
    also: ["social"],
  }),

  /* -------------------------------------------------------- BIRTHDAY */
  slot("birthday-celebration-flyer", "Birthday Celebration Flyer", "birthday", 4 / 5, "Portrait flyer · 4:5", "ink", 1, {
    image: "/images/birthday/18167.jpeg",
    featured: true,
    description:
      "A celebratory flyer with a photo-led composition and bold display type, designed to be shared across WhatsApp and Instagram.",
    deliverables: ["Portrait flyer", "Social crop"],
    also: ["flyer"],
  }),
  slot("birthday-milestone-poster", "Milestone Birthday Poster", "birthday", 4 / 5, "Portrait poster · 4:5", "brand", 2, {
    image: "/images/birthday/20260820_171722.jpg",
  }),
  slot("birthday-invitation", "Birthday Invitation Card", "birthday", 4 / 5, "Portrait invitation · 4:5", "paper", 3, {
    image: "/images/birthday/20260918_074620.jpg",
  }),
  slot("birthday-social-graphic", "Birthday Social Graphic", "birthday", 1, "Square social post · 1:1", "brand", 4, {
    image: "/images/birthday/20260922_170019.jpg",
    also: ["social"],
  }),

  /* --------------------------------------------------------- WEDDING */
  slot("wedding-invitation", "Wedding Invitation", "wedding", 5 / 7, "Invitation · 5:7", "paper", 0, {
    image: "/images/wedding/20260531_103747.jpg",
    featured: true,
    description:
      "An elegant invitation built on restrained typography and generous space, with the couple's names carrying the composition.",
    deliverables: ["Print invitation", "Digital share version"],
  }),
  slot("wedding-save-the-date", "Save the Date Graphic", "wedding", 4 / 5, "Portrait · 4:5", "brand", 5, {
    image: "/images/wedding/20260719_133811.jpg",
    also: ["social"],
  }),
  slot("wedding-traditional", "Traditional Wedding Announcement", "wedding", 4 / 5, "Portrait announcement · 4:5", "ink", 2, {
    image: "/images/wedding/20260823_130236.jpg",
    also: ["social"],
  }),
  slot("wedding-engagement", "Engagement Graphic", "wedding", 4 / 5, "Portrait graphic · 4:5", "paper", 1, {
    image: "/images/wedding/20260823_222853.jpg",
  }),

  /* ----------------------------------------------------------- EVENT */
  slot("event-conference-flyer", "Conference Flyer", "event", 4 / 5, "Portrait flyer · 4:5", "brand", 3, {
    image: "/images/business-events/20260908_122426.jpg",
    also: ["flyer"],
  }),
  slot("event-concert-poster", "Concert & Show Poster", "event", 2 / 3, "Poster · 2:3", "ink", 0, {
    image: "/images/business-events/20251204_115028.png",
    featured: true,
    also: ["flyer"],
  }),
  slot("event-corporate-banner", "Corporate Event Banner", "event", 4 / 5, "Portrait event graphic · 4:5", "slate", 4, {
    image: "/images/business-events/20260513_193331.png",
  }),
  slot("event-product-launch", "Product Launch Flyer", "event", 4 / 5, "Portrait flyer · 4:5", "brand", 5, {
    image: "/images/business-events/20260911_112817.jpg",
    also: ["flyer", "campaign"],
  }),

  /* ---------------------------------------------------- SOCIAL MEDIA */
  slot("social-instagram-post", "Instagram Post", "social", 1, "Instagram post · 1:1", "ink", 4, {
    image: "/images/social%20media%20designs/20260721_225315.jpg",
    featured: true,
    description:
      "A feed creative designed to stop the scroll while staying inside the client's existing colour and type system.",
    deliverables: ["Instagram post", "Story adaptation"],
  }),
  slot("social-carousel-cover", "Instagram Carousel Cover", "social", 4 / 5, "Carousel · 4:5", "brand", 1, {
    image: "/images/social%20media%20designs/20260816_124746.jpg",
  }),
  slot("social-advert", "Promotional Ad Creative", "social", 4 / 5, "Advert · 4:5", "ink", 2, {
    image: "/images/social%20media%20designs/20260901_190108.jpg",
    also: ["flyer"],
  }),
  slot("social-banner", "Social Media Banner", "social", 4 / 5, "Social graphic · 4:5", "brand", 5, {
    image: "/images/social%20media%20designs/20260904_042953.jpg",
  }),

  /* ------------------------------------------------------------ LOGO */
  slot("logo-mark-presentation", "Logo Design Presentation", "logo", 1, "Logo mark · 1:1", "paper", 0, {
    image: "/images/logo/1.png",
    featured: true,
    description:
      "A mark presented as a small system: primary lockup, simplified symbol, reversed version and clear-space guidance.",
    deliverables: ["Primary logo", "Symbol", "Reversed lockup", "Export pack"],
  }),
  slot("logo-symbol-exploration", "Brand Mark Exploration", "logo", 1, "Reversed logo mark · 1:1", "brand", 1, {
    image: "/images/logo/2.png",
  }),
  slot("logo-variation-sheet", "Logo Variation Sheet", "logo", 1, "Logo variation · 1:1", "paper", 2, {
    image: "/images/logo/4.png",
  }),
  slot("logo-business-card", "Logo Lockup", "logo", 1, "Logo lockup · 1:1", "brand", 3, {
    image: "/images/logo/3.png",
  }),

  /* ----------------------------------------------------------- FLYER */
  slot("flyer-business-promo", "Business Promotional Flyer", "flyer", 4 / 5, "Portrait flyer · 4:5", "brand", 4, {
    image: "/images/business-events/20250806_225505.jpg",
    also: ["event"],
  }),
  slot("flyer-sales-discount", "Sales & Discount Flyer", "flyer", 1, "Square flyer · 1:1", "ink", 5, {
    image: "/images/business-events/20251202_172517.png",
    also: ["social"],
  }),
  slot("flyer-service-advert", "Service Advertisement", "flyer", 3 / 4, "Portrait advert · 3:4", "slate", 0, {
    image: "/images/business-events/20251118_140751.png",
  }),
  slot("flyer-print-ready", "Print-Ready Flyer", "flyer", 0.772, "Portrait flyer · 0.77:1", "paper", 1, {
    image: "/images/business-events/20251124_171516_1.png",
  }),

  /* ----------------------------------------------------------- BRAND */
  slot("brand-identity-presentation", "Brand Identity Presentation", "brand", 4 / 3, "Presentation · 4:3", "ink", 0, {
    image: "/images/logo-brand%20identity/20260920_210718.png",
    featured: true,
    description:
      "A complete identity system laid out as one presentation — mark, palette, typography and application so the brand reads consistently.",
    deliverables: ["Identity presentation", "Colour & type system", "Stationery", "Brand applications"],
  }),
  slot("brand-colour-typography", "Colour & Typography System", "brand", 0.75, "Brand system · 3:4", "paper", 3, {
    image: "/images/logo-brand%20identity/20261010_085934.png",
  }),
  slot("brand-stationery", "Stationery & Collateral", "brand", 4 / 5, "Brand presentation · 4:5", "slate", 5, {
    image: "/images/logo-brand%20identity/20260920_132547.png",
  }),

  /* -------------------------------------------------------- CAMPAIGN */
  slot("campaign-key-visual", "Campaign Key Visual", "campaign", 1, "Key visual · 1:1", "brand", 2, {
    image: "/images/social%20media%20designs/345218%20(1).jpeg",
    also: ["social"],
  }),
  slot("campaign-social-set", "Campaign Social Set", "campaign", 4 / 5, "Campaign graphic · 4:5", "ink", 4, {
    image: "/images/social%20media%20designs/347760.jpeg",
    also: ["social"],
  }),
  slot("campaign-banner-set", "Campaign Banner Set", "campaign", 4 / 5, "Campaign graphic · 4:5", "brand", 0, {
    image: "/images/social%20media%20designs/369593.jpeg",
  }),

  /* ----------------------------------------------------- EXPERIMENTS */
  slot("experiment-typography", "Typography Exploration", "experiments", 1, "Logo exploration · 1:1", "ink", 1, {
    image: "/images/logo-brand%20identity/20260909_002532.png",
  }),
  slot("experiment-composition", "Experimental Composition", "experiments", 1, "Mark exploration · 1:1", "brand", 5, {
    image: "/images/logo-brand%20identity/20261004_125438.png",
  }),
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
