import { readFileSync, writeFileSync } from "fs";
import path from "path";
import {
  defineConfig,
  PageData,
  SiteConfig,
  TransformContext,
} from "vitepress";

const metaColor: string = "#222222";
const metaLogo: string = "/logo.png";

/** @type {import('vitepress').DefaultTheme.Config} */
export default defineConfig({
  buildEnd: async (siteConfig: SiteConfig): void => {
    const sitemapFile: string = path.join(siteConfig.outDir, "sitemap.xml");

    // Wait for sitemap.xml to be made
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Modify sitemap.xml
    writeFileSync(
      sitemapFile,
      readFileSync(sitemapFile)
        .toString()
        .replace(
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet href="sitemap.xsl" type="text/xsl"?>',
        ),
    );
  },
  description:
    "LBRY is a free, open, and community-controlled digital goods marketplace. Learn about technical specifics, how to contribute, API specifications, and much more.",
  head: [
    // Generic Link
    ["link", { rel: "apple-touch-icon", href: "/apple-touch-icon.png" }],
    ["link", { rel: "icon", href: metaLogo }],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    [
      "link",
      { color: metaColor, rel: "mask-icon", href: "/assets/favicon.svg" },
    ],
    ["link", { rel: "shortcut icon", href: "/favicon.ico" }],

    // Generic Meta
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    ["meta", { name: "apple-mobile-web-app-title", content: "LBRY Tech" }],
    ["meta", { name: "application-name", content: "LBRY Tech" }],
    ["meta", { name: "theme-color", content: metaColor }],
    [
      "meta",
      { name: "viewport", content: "initial-scale=1,width=device-width" },
    ],

    // MS Application
    ["meta", { name: "msapplication-TileColor", content: metaColor }],
    ["meta", { name: "msapplication-TileImage", content: metaLogo }],

    // Twitter Card
    ["meta", { name: "twitter:card", content: "summary" }],
    ["meta", { name: "twitter:image", content: metaLogo }],

    // OpenGraph
    ["meta", { property: "og:image", content: metaLogo }],
    ["meta", { property: "og:locale", content: "en_US" }],
    ["meta", { property: "og:site_name", content: "LBRY Tech" }],
    ["meta", { property: "og:type", content: "website" }],
  ],
  sitemap: {
    hostname: "https://lbry.tech",
  },
  themeConfig: {
    editLink: {
      pattern: (payload: PageData): string => {
        return `https://github.com/LBRYFoundation/website-tech/edit/master/docs/${payload.filePath}`;
      },
      text: "Edit this page on GitHub",
    },
    footer: {
      message: "With love for community",
      copyright: "© " + new Date().getFullYear() + " LBRY Foundation",
    },
    nav: [
      {
        link: "https://lbry.org",
        text: "LBRY.org",
      },
      {
        link: "/overview/",
        text: "Overview",
      },
      {
        link: "/tutorials/",
        text: "Tutorials",
      },
      {
        link: "/protocols/",
        text: "Protocols",
      },
      {
        link: "/playground/",
        text: "Playground",
      },
      {
        link: "/resources/",
        text: "Resources",
      },
      {
        link: "/community/",
        text: "Community",
      },
    ],
  },
  title: "LBRY Tech",
  transformHead: (context: TransformContext): void => {
    let path: string =
      "/" +
      context.pageData.relativePath
        .replace(/index\.md$/, "")
        .replace(/\.md$/, ".html");

    // OpenGraph
    context.head.push([
      "meta",
      {
        content: context.description,
        property: "og:description",
      },
    ]);
    context.head.push([
      "meta",
      {
        content: context.title,
        property: "og:title",
      },
    ]);
    if (!context.pageData.isNotFound) {
      context.head.push([
        "meta",
        {
          content: path,
          property: "og:url",
        },
      ]);
    }

    // Twitter Card
    context.head.push([
      "meta",
      {
        content: context.description,
        name: "twitter:description",
      },
    ]);
    context.head.push([
      "meta",
      {
        content: context.title,
        name: "twitter:title",
      },
    ]);
    if (!context.pageData.isNotFound) {
      context.head.push([
        "meta",
        {
          content: path,
          name: "twitter:url",
        },
      ]);
    }
  },
});
