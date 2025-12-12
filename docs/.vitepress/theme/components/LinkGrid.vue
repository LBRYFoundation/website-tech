<script>
export default {
  props: ['links'],
};
</script>

<script setup>
const props = defineProps(['links']);

function returnLinkTemplate(title, description, destination, label) {
  return `
    <li class="link-grid__link">
     <p class="link-grid__title"><strong>${title}</strong></p>
     <p class="link-grid__description">${description}</p>
     <a class="link-grid__cta" href="${destination}">${label}</a>
    </li>
  `;
}

const renderedLinks = props.links.map(link => returnLinkTemplate(link.title, link.description, link.destination, link.label));
</script>

<style>
.link-grid {
  align-content: center;
  display: flex;
  flex-flow: row wrap;
}

.link-grid__link {
  flex-grow: 1;
  margin-bottom: 2rem;
  position: relative;
  text-align: center;
  vertical-align: top;
  list-style-type: none;

  @media (min-width: 651px) {
    width: 50%;
  }

  @media (max-width: 650px) {
    width: 100%;

    &:first-of-type {
      padding-bottom: 1rem;
    }

    &:last-of-type {
      padding-top: 1rem;
    }
  }
}

.link-grid__title {
  margin-bottom: 0.5rem;

  @media (min-width: 501px) {
    font-size: 2rem;
  }

  @media (max-width: 500px) {
    font-size: 1.5rem;
  }
}

.link-grid__description {
  width: 80%;
  left: 10%;

  font-size: 1rem;
  margin-bottom: 1rem;
  position: relative;
}

.link-grid__cta {
  display: inline-block;
  font-size: 1rem;
  position: relative;
}

</style>

<template>
  <ul class="link-grid" v-html="renderedLinks.join('')"></ul>
</template>
