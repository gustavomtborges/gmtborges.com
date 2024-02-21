import type {Site, SocialObjects} from "./types";

export const SITE: Site = {
  domain: "gmtborges.com",
  website: "https://gmtborges.com/",
  author: "Gustavo Martins T. Borges",
  desc: "A blog to share my thoughts on Software Engineering, Design, Quality, and Operation. Sometimes about my inner thoughts though",
  title: "G M T Borges - DevOps and Architect Consultant",
  ogImage: "profile.jpg",
  lightAndDarkMode: true,
  postPerPage: 8,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-US"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: true,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/gustavomtborges",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/gustavomtborges",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/gustavomtborges",
    linkTitle: `${SITE.title} on Twitter`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:gustavo@gmtborges.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
  {
    name: "RSS",
    href: "/rss.xml",
    linkTitle: "RSS Feed",
    active: true,
  },
  {
    name: "WhatsApp",
    href: "https://github.com/gustavomtborges",
    linkTitle: `${SITE.title} on WhatsApp`,
    active: false,
  },
  {
    name: "Telegram",
    href: "https://github.com/gustavomtborges",
    linkTitle: `${SITE.title} on Telegram`,
    active: false,
  },
];
