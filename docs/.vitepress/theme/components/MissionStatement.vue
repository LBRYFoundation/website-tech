<style>
.component--mission-statement {
  padding: 1rem 1rem 1rem 1.25rem;

  background-color: rgba(135.6,232.2,203.4,.3);
  border-left: 0.5rem solid #38d9a9;
  line-height: 1.55;
  margin-bottom: 1.5rem;
  position: relative;
  user-select: text;

  -ms-user-select: text;
  -moz-user-select: text;
  -webkit-user-select: text;

  @media (min-width: 901px) {
    font-size: 1.25rem;
  }

  @media (max-width: 900px) {
    font-size: 1.05rem;
  }
}

.component--mission-statement__title {
  color: #38d9a9;
  display: block;
  letter-spacing: 0.025rem;
  text-transform: uppercase;
}
</style>

<template>
  <div class="component--mission-statement">
    <strong class="component--mission-statement__title">Mission Statement</strong>
    To create a market for accessing and publishing information<sup><a href="#footnote-1" title="First footnote of our mission statement">1</a></sup>
    that is global<sup><a href="#footnote-2" title="Second footnote of our mission statement">2</a></sup>,
    decentralized<sup><a href="#footnote-3" title="Third footnote of our mission statement">3</a></sup>,
    robust<sup><a href="#footnote-4" title="Fourth footnote of our mission statement">4</a></sup>,
    optimal<sup><a href="#footnote-5" title="Fifth footnote of our mission statement">5</a></sup>
    and complete<sup><a href="#footnote-6" title="Sixth footnote of our mission statement">6</a></sup>.
  </div>
</template>
