<script setup>
const links = [
  {
    href: "https://chat.lbry.org",
    image:
      "https://spee.ch/b432346bfd641990f3dc3dbceda057b4ededa360/discord-bg.jpg",
    title: "Chat (Discord)",
  },
  {
    href: "https://forum.lbry.org",
    image:
      "https://spee.ch/e59dcbe6a533934eb82e73bb335b7e43cb8a9f7d/atmosphere.png",
    title: "Developer Forum",
  },
  {
    href: "https://lbry.fund",
    image:
      "https://spee.ch/b29b4cb6495c9c2e6fc26113bcc92158ed408a35/pixelsunset.png",
    title: "lbry.fund (Project Funding)",
  },
  {
    href: "https://www.reddit.com/r/lbry",
    image: "https://spee.ch/2357ab1464bcbba3458f4eabdad9644bcfd6f491/lines.png",
    title: "Reddit",
  },
  //   {
  //     href: "https://lbry.com/join-us",
  //     image: "https://spee.ch/6db68b3ebf22386fcd9d04237d11bfaff5ba2a95/minimalisticrubikcube.png",
  //     title: "Join Our Team"
  //   },
  {
    href: "https://twitter.com/LBRYcom",
    image:
      "https://spee.ch/9c38db124b85736adbcca48cdf34877d2110bbcd/GeoShapes.png",
    title: "Twitter",
  },
  {
    href: "https://www.facebook.com/lbryio",
    image: "https://spee.ch/734404b89658e30af920829553b22d1742c0d99a/voice.png",
    title: "Facebook",
  },
];

function returnLinkTemplate(url, title, image) {
  return `
    <a class="feature-link" href="${url}" title="${title}">
      <h3 class="feature-link__title">
        <span class="feature-link__title-inner">${title}</span>
      </h3>

      <figure class="feature-link__background">
        ${image}
      </figure>
    </a>
  `;
}

const renderedLinks = [];
let imageLink = "";

for (const link of links) {
  if (link.image) imageLink = `<img alt="${link.title}" src="${link.image}"/>`;

  renderedLinks.push(returnLinkTemplate(link.href, link.title, imageLink));
}
</script>

<style>
.feature-links {
  list-style-type: none;
  margin-bottom: 2rem;
  padding-top: 0.5rem;

  @media (min-width: 1061px) {
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
}

.feature-link {
  background-color: #fff;
  border: 1px solid rgba(33, 37, 41, 0.1);
  border-radius: 3px;
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: box-shadow 0.2s;
  vertical-align: top;

  @media (min-width: 1061px) {
    width: 320px;
    min-height: 135px;
  }

  @media (max-width: 1060px) {
    min-height: 150px;

    &:not(:last-of-type) {
      margin-bottom: 1rem;
    }
  }

  @media (min-width: 681px) and (max-width: 1060px) {
    width: calc(50% - 1rem);

    &:nth-of-type(odd) {
      margin-right: 1rem;
    }
  }

  @media (max-width: 680px) {
    width: 100%;
  }

  &:not(:hover) {
    .feature-link__background {
      filter: brightness(0.5);
    }
  }

  &:hover {
    box-shadow: 0 0 15px rgb(225.6, 229.2, 232.8);

    .feature-link__title {
      color: #38d9a9;
    }
  }
}

.feature-link__title {
  top: 85px;

  font-size: 1rem;
  font-weight: normal;
  position: relative;
  text-align: center;
  transition: color 0.2s;
  z-index: 1;
}

.feature-link__title-inner {
  padding: 0.25rem 0.5rem;

  background-color: #fff;
  border: 1px solid rgb(225.6, 229.2, 232.8);
  border-radius: 3px;
  box-decoration-break: clone;
  box-shadow: 0 2px 5px rgba(136.8, 142, 147.2, 0.1);
  display: inline-block;
}

.feature-link__background {
  width: calc(100% + 2px);
  height: 100px;
  top: -1px;
  left: -1px;

  background-color: #38d9a9;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  overflow: hidden;
  position: absolute;
  transition: filter 0.2s;
  z-index: 0;

  img {
    width: 100%;
    height: 100%;

    object-fit: cover;
    object-position: center;
    position: absolute;
  }
}
</style>

<template>
  <div class="feature-links" v-html="renderedLinks.join('')" />
</template>
