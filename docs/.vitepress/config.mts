import {defineConfig} from 'vitepress';

/** @type {import('vitepress').DefaultTheme.Config} */
export default defineConfig({
  //color: "#222"
  description: 'LBRY is a free, open, and community-controlled digital goods marketplace. Learn about technical specifics, how to contribute, API specifications, and much more.',
  themeConfig: {
    editLink: {
      pattern: (payload: PageData): string => {
        return `https://github.com/LBRYFoundation/website-tech/edit/master/docs/${payload.filePath}`;
      },
      text: 'Edit this page on GitHub',
    },
    nav: [
      {
        link: 'https://lbry.org',
        text: 'LBRY.org',
      },
      {
        link: "/overview",
        text: "Overview",
      },
      {
        link: "/tutorials",
        text: "Tutorials",
      },
      {
        link: "/protocols",
        text: "Protocols",
      },
      {
        link: "/playground",
        text: "Playground",
      },
      {
        link: "/resources",
        text: "Resources",
      },
      {
        link: "/community",
        text: "Community",
      },
    ],
  },
  title: 'LBRY Tech',
  ignoreDeadLinks: true,
});
