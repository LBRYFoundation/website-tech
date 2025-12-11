<script setup>
const idRegex = /(".*")/g;
const numberRegex = /^[0-9]/g;
const renderedHeaderRegex = /(<h\d\sid.*h\d>)/g;
const titleRegex = /(>.*<)/g;

function slugify(stringToSlugify) {
  let finalString = stringToSlugify
    .toLowerCase()
    .replace(/###\s/g, "")
    .replace(/\s\/\s/g, "-")
    .replace(/\s/g, "-")
    .replace(/%/g, "")
    .replace(/\(/g, "")
    .replace(/\)/g, "")
    .replace(/,/g, "");

  if (finalString.match(numberRegex))
    finalString = `_${finalString}`;

  return `#${finalString}`;
}

const markdown = '';

const collectionOfTocElements = [];
// const tocElements = markdown.match(renderedHeaderRegex);
const tocElements = [];

for (const item of tocElements) {
  const id = item.match(idRegex)[0].replace(/"/g, "");
  const title = item.match(titleRegex)[0].replace(">", "").replace("<", "");

  collectionOfTocElements.push(`
      <li>
        <a href="${slugify(id)}" title="Go to '${title}'">${title}</a>
      </li>
    `);
}
</script>

<template>
  <ul class="component--glossary-toc" v-html="collectionOfTocElements.join('')"></ul>
</template>
