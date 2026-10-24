/**
 * ---------------------------------------------------------------------------
 * TEMMY TEE GRAPHICS — SITE CONFIGURATION
 * ---------------------------------------------------------------------------
 * Everything the studio owner needs to update lives in this file.
 * Change a value here and the whole site reflects it — no redesign required.
 * ---------------------------------------------------------------------------
 */

export const site = {
  name: "Temmy Tee Graphics",
  shortName: "Temmy Tee",
  tagline: "Designs That Speak. Visuals That Stand Out.",

  /** Short studio line used in the footer + meta descriptions. */
  description:
    "Creative graphics, compelling visual identities and memorable designs for churches, events, businesses and individuals.",

  /**
   * CONTACT — phone and email shown across the site.
   * `whatsapp` must be in international format with no "+" and no spaces.
   */
  contact: {
    whatsapp: "2347011295304",
    whatsappDisplay: "+234 701 129 5304",
    email: "isaiahoguntoye430@gmail.com",
    location: "Nigeria · working with clients worldwide",
    availability: "Currently accepting new projects",
  },

  /**
   * PROJECT INQUIRY FORM DELIVERY
   *
   * Option A (recommended): paste a Formspree / Getform / Basin / Web3Forms
   * endpoint below — e.g. "https://formspree.io/f/abcdwxyz". Submissions are
   * then delivered straight to the inbox connected to that service.
   *
   * Option B (works immediately): leave it empty. The form then composes the
   * full project brief and opens it in WhatsApp, so nothing is silently lost.
   */
  formEndpoint: "https://formspree.io/f/xljjdekz",

  /** Only the profiles that actually exist should stay in this list. */
  socials: [
    { label: "Pinterest — Portfolio", handle: "@temmyteegraphics_", href: "https://www.pinterest.com/temmyteegraphics_/" },
    { label: "Pinterest — Moodboard", handle: "@temmytee_graphics1", href: "https://www.pinterest.com/temmytee_graphics1/" },
    // { label: "Instagram", handle: "@temmyteegraphics", href: "https://instagram.com/..." },
    // { label: "Behance", handle: "temmyteegraphics", href: "https://behance.net/..." },
  ],

  /** Shown in the footer. Keep it honest — edit freely. */
  footnote:
    "Temmy Tee Graphics is an independent design practice. All artwork shown belongs to the studio and its clients.",
};

export const navLinks = [
  { label: "Home", href: "#/" },
  { label: "Portfolio", href: "#/portfolio" },
  { label: "Services", href: "#/services" },
  { label: "About", href: "#/about" },
  { label: "Contact", href: "#/contact" },
];

export const marqueeItems = [
  "Church Graphics",
  "Birthday Designs",
  "Wedding Graphics",
  "Event Flyers",
  "Social Media Design",
  "Logo Design",
  "Brand Identity",
  "Digital Campaigns",
  "Flyer Design",
  "Creative Experiments",
];

/* ---------------------------------------------------------------------------
 * SERVICES — nine service groups. Edit the copy whenever you like.
 * --------------------------------------------------------------------------- */

export type Service = {
  id: string;
  index: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  includes: string[];
  tone: "brand" | "ink" | "paper" | "slate";
  variant: number;
  ratio: number;
};

export const services: Service[] = [
  {
    id: "church",
    index: "01",
    title: "Church & Ministry Graphics",
    category: "Church Designs",
    summary: "Service flyers, sermon series, conferences, revivals and youth programs.",
    description:
      "Graphics that help a ministry communicate clearly and beautifully — from weekly Sunday service creatives and sermon series artwork to conventions, revival nights, crusades, youth programs and worship events. Typography, imagery and colour are balanced so the message lands first.",
    includes: [
      "Sunday service & weekly creatives",
      "Conference, convention & revival posters",
      "Sermon series & special programs",
      "Youth and worship event designs",
    ],
    tone: "brand",
    variant: 0,
    ratio: 4 / 5,
  },
  {
    id: "birthday",
    index: "02",
    title: "Birthday & Celebration Designs",
    category: "Birthday Designs",
    summary: "Celebration flyers, milestone posters, invitations and photo compositions.",
    description:
      "Birthday graphics that feel personal. Whether the brief calls for elegant and minimal or colourful and expressive, each design is built around the celebrant — photo compositions, milestone posters, invitations and social-ready celebration creatives.",
    includes: [
      "Birthday celebration flyers",
      "Milestone birthday posters",
      "Invitations & personalised posters",
      "Photo composition and retouching",
    ],
    tone: "ink",
    variant: 1,
    ratio: 4 / 5,
  },
  {
    id: "wedding",
    index: "03",
    title: "Wedding Design",
    category: "Wedding Designs",
    summary: "Invitations, save-the-dates, engagement and traditional wedding graphics.",
    description:
      "Refined wedding graphics with balanced typography and a carefully chosen palette — invitations, save-the-date announcements, engagement graphics, traditional wedding creatives, ceremony programs and anniversary designs.",
    includes: [
      "Invitations & save-the-dates",
      "Engagement & traditional wedding graphics",
      "Ceremony programs",
      "Anniversary designs",
    ],
    tone: "paper",
    variant: 2,
    ratio: 4 / 5,
  },
  {
    id: "event",
    index: "04",
    title: "Event Promotional Graphics",
    category: "Event Designs",
    summary: "Conferences, concerts, seminars, corporate events and product launches.",
    description:
      "Promotional design that fills seats. Event graphics are built to be read in a scroll and understood in a second — clear hierarchy for the event name, date, venue and speakers, adapted across every size the event needs.",
    includes: [
      "Conference & seminar flyers",
      "Concert, show & concert posters",
      "Corporate events & product launches",
      "Community programs and special celebrations",
    ],
    tone: "brand",
    variant: 3,
    ratio: 4 / 5,
  },
  {
    id: "social",
    index: "05",
    title: "Social Media Design",
    category: "Social Media Designs",
    summary: "Instagram posts, carousels, adverts, campaign creatives and banners.",
    description:
      "Consistent, scroll-stopping creatives for every digital format — Instagram posts and carousels, promotional and educational posts, business adverts, campaign graphics and profile or cover banners that stay on brand.",
    includes: [
      "Instagram posts & carousels",
      "Business adverts & promotional posts",
      "Educational and campaign graphics",
      "Profile, cover & story banners",
    ],
    tone: "ink",
    variant: 4,
    ratio: 1,
  },
  {
    id: "flyer",
    index: "06",
    title: "Flyer & Advertising Design",
    category: "Flyer Designs",
    summary: "Business, promotional, sales and print-ready flyer design.",
    description:
      "Flyers built to perform in print and on screens. Strong headline hierarchy, clean product or photo treatment and considered detail blocks — delivered in the exact dimensions and bleed your printer or platform requires.",
    includes: [
      "Business & promotional flyers",
      "Product and service advertisements",
      "Sales and discount flyers",
      "Print-ready and digital formats",
    ],
    tone: "slate",
    variant: 5,
    ratio: 4 / 5,
  },
  {
    id: "logo",
    index: "07",
    title: "Logo Design",
    category: "Logo & Brand Marks",
    summary: "Distinctive marks, symbol systems and logo variation sets.",
    description:
      "A logo is the smallest possible version of a story. Marks are drawn with intent — geometric, memorable and legible at every size — and presented as a complete system with primary, secondary and simplified variations.",
    includes: [
      "Primary & secondary logo marks",
      "Symbol and monogram exploration",
      "Logo variations & clear-space rules",
      "Favicon, avatar and app icon exports",
    ],
    tone: "brand",
    variant: 0,
    ratio: 1,
  },
  {
    id: "brand",
    index: "08",
    title: "Complete Brand Identity",
    category: "Brand Identity",
    summary: "Colour, typography, stationery and full identity systems.",
    description:
      "Everything that surrounds the logo so a business looks like itself everywhere. Identity systems bring together the mark, colour palette, typography, stationery, marketing materials and branded merchandise into one coherent visual language.",
    includes: [
      "Identity presentation & logo variations",
      "Colour palette & typography system",
      "Stationery & marketing collateral",
      "Branded mockups and applications",
    ],
    tone: "ink",
    variant: 1,
    ratio: 4 / 3,
  },
  {
    id: "campaign",
    index: "09",
    title: "Digital Campaign Graphics",
    category: "Digital Campaigns",
    summary: "Coordinated creative sets for one campaign, launch or promotion.",
    description:
      "One idea, carried consistently across every placement. Campaign graphics keep the same visual language across posts, adverts, banners and story formats so a launch or promotion reads as one voice.",
    includes: [
      "Campaign key visual",
      "Coordinated post & advert sets",
      "Banner and story variations",
      "Format resizing for each platform",
    ],
    tone: "brand",
    variant: 2,
    ratio: 4 / 3,
  },
];

/* ---------------------------------------------------------------------------
 * ABOUT — starter copy. Replace with the designer's real story at any time.
 * --------------------------------------------------------------------------- */

export const about = {
  headline: "Creative Thinking. Intentional Design.",
  intro:
    "Temmy Tee Graphics is a creative design brand focused on transforming ideas into clear, engaging and memorable visual experiences. From church and event graphics to social media creatives and brand identity, every project is an opportunity to communicate a message through thoughtful design.",

  /** Designer biography — add the real background, experience and story here. */
  biography:
    "[ Designer biography — add your background, how you started designing, the kind of work you enjoy most, and what a client can expect when they work with you. ]",

  philosophy: [
    {
      title: "Message before decoration",
      body: "Every design starts with what has to be communicated. Once the message is clear, the colour, type and imagery follow with a reason.",
    },
    {
      title: "Craft in the details",
      body: "Spacing, alignment, hierarchy and consistency are what separate a graphic from a design. Those details are never rushed.",
    },
    {
      title: "Built for where it lives",
      body: "A flyer for print, a post for a feed and a banner for a stage each behave differently — every artwork is designed for the place it will actually be seen.",
    },
  ],

  /** Edit or extend these lists to reflect reality. Nothing here is invented. */
  tools: [
    "Adobe Photoshop",
    "Adobe Illustrator",
    "CorelDRAW",
    "Adobe InDesign",
    "Figma",
    "Photo retouching & compositing",
    "Print-ready file preparation",
  ],

  clientTypes: [
    "Churches & ministries",
    "Event organisers",
    "Small businesses & brands",
    "Celebrants & families",
    "Creatives & personal brands",
    "Organisations & schools",
  ],

  /** Add real details — remove any field you would rather not publish. */
  details: [
    { label: "Based in", value: site.contact.location },
    { label: "Availability", value: site.contact.availability },
    { label: "Working style", value: "Remote-first, with clear communication at every stage" },
  ],
};

/* ---------------------------------------------------------------------------
 * NAVIGATION + SHARED LABELS
 * --------------------------------------------------------------------------- */

export const cta = {
  startProject: "Start a Project",
  viewPortfolio: "View Portfolio",
  exploreWork: "Explore My Work",
  workTogether: "Let's Work Together",
};
