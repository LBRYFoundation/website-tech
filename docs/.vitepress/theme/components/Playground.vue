<!--<style>-->
<!--/*!-->
<!-- * Playground | Wrapper-->
<!-- *-->
<!-- * @class     .playground-->
<!-- * @selector  {::before}-->
<!-- * @selector  {::after}-->
<!-- * @state     {.waiting}-->
<!--**/-->

<!--.playground {-->
<!--  top: 1rem;-->
<!--  border-top: 1px solid rgba(226, 229, 233, 0.3);-->
<!--  position: relative;-->

<!--  &.waiting::before {-->
<!--    top: 0; right: 0;-->
<!--    bottom: 0; left: 0;-->

<!--    background-color: rgba(255,255,255, 0.7);-->
<!--    content: "";-->
<!--    cursor: progress;-->
<!--    position: absolute;-->
<!--    z-index: 5;-->
<!--  }-->

<!--  &::after {-->
<!--    @include clearfix;-->
<!--  }-->
<!--}-->

<!--/*!-->
<!-- * Playground | Navigation-->
<!-- *-->
<!-- * @class     .playground-navigation-->
<!-- *-->
<!-- * @class     .playground-navigation__example-->
<!-- * @selector  {::before}-->
<!-- * @selector  {:last-of-type}-->
<!-- * @state     {.active}-->
<!-- * @state     {:hover}-->
<!--**/-->

<!--.playground-navigation {-->
<!--  width: 100%;-->
<!--  list-style-type: none;-->
<!--  padding-top: 1.5rem;-->
<!--  padding-bottom: 1rem;-->

<!--  &::after {-->
<!--    @include clearfix;-->
<!--  }-->

<!--  &__example {-->
<!--    width: 33.333333%;-->
<!--    cursor: pointer;-->
<!--    float: left;-->
<!--    position: relative;-->
<!--    text-align: center;-->

<!--    &::before {-->
<!--      width: 100%; height: 2.5rem;-->
<!--      top: -0.6rem; left: 0;-->

<!--      content: "example " attr(data-example);-->
<!--      font-size: 0.6rem;-->
<!--      font-style: italic;-->
<!--      line-height: 1.1;-->
<!--      position: absolute;-->
<!--      text-align: center;-->
<!--      text-transform: uppercase;-->
<!--    }-->

<!--    &:not(.active) {-->
<!--      &::before,-->
<!--      button,-->
<!--      span {-->
<!--        color: rgb(226, 229, 233);-->
<!--      }-->
<!--    }-->

<!--    &.active,-->
<!--    &:hover {-->
<!--      button {-->
<!--        color: $lbry-teal-3;-->
<!--      }-->

<!--      &::before,-->
<!--      span {-->
<!--        color: $lbry-black;-->
<!--      }-->
<!--    }-->

<!--    &.completed {-->
<!--      &::after {-->
<!--        width: 100%; height: 100%;-->
<!--        top: 0; left: 0;-->

<!--        background-color: rgba(255,255,255, 0.7);-->
<!--        content: "✓";-->
<!--        font-size: 3rem;-->
<!--        line-height: 0.85;-->
<!--        position: absolute;-->
<!--        z-index: 10;-->
<!--      }-->
<!--    }-->

<!--    &::before,-->
<!--    button,-->
<!--    span {-->
<!--      transition: color 0.2s;-->
<!--    }-->

<!--    button {-->
<!--      background-color: transparent;-->
<!--      font-size: 1.25rem;-->
<!--      font-weight: 600;-->
<!--    }-->

<!--    span {-->
<!--      display: block;-->
<!--      font-size: 1rem;-->
<!--    }-->
<!--  }-->
<!--}-->



<!--/*!-->
<!-- * Playground | Content-->
<!-- *-->
<!-- * @class     .playground-content-->
<!-- *-->
<!-- * @class     .playground-content__meme-->
<!-- * @selector  {::after}-->
<!-- *-->
<!-- * @class     .playground-content__meme__canvas-->
<!-- *-->
<!-- * @class     .playground-content__meme__canvas__thumbnail-->
<!-- * @selector  {:last-of-type}-->
<!-- * @state     {.selected}-->
<!-- *-->
<!-- * @class     .playground-content__meme__editor-->
<!-- *-->
<!-- * @class     .playground-content__trends-->
<!-- * @selector  {::after}-->
<!-- * @state     {:empty}-->
<!-- *-->
<!-- * @class     .playground-content__trend-->
<!-- * @class     .playground-content__urlbar-->
<!--**/-->

<!--.playground-content {-->
<!--  overflow-y: visible;-->
<!--  padding-top: 1rem;-->
<!--  padding-bottom: 1rem;-->

<!--  .loader {-->
<!--    @extend .__loading;-->

<!--    &::after {-->
<!--      content: "Processing request";-->
<!--    }-->
<!--  }-->

<!--  h3 {-->
<!--    font-size: 1.5rem;-->
<!--    margin-bottom: 1rem;-->
<!--  }-->

<!--  pre {-->
<!--    font-size: 1rem;-->
<!--  }-->
<!--}-->

<!--.playground-content__meme {-->
<!--  overflow-y: auto;-->
<!--  position: relative;-->

<!--  &::after {-->
<!--    @include clearfix;-->
<!--  }-->
<!--}-->

<!--.playground-content__meme__canvas {-->
<!--  width: 48%;-->

<!--  float: left;-->
<!--  margin-right: 2%;-->
<!--  position: relative;-->

<!--  canvas {-->
<!--    width: 100%; height: 100%;-->

<!--    background-color: rgba($lbry-teal-1, 0.3);-->
<!--    margin-bottom: 1rem;-->
<!--  }-->
<!--}-->

<!--.playground-content__meme__canvas__thumbnail { // sass-lint:disable-line bem-depth // TODO: FIX THIS-->
<!--  width: 5rem; height: 5rem;-->

<!--  border-style: solid;-->
<!--  border-width: 2px;-->
<!--  cursor: pointer;-->
<!--  margin-bottom: 1rem;-->
<!--  object-fit: contain;-->
<!--  object-position: center;-->

<!--  &:not(:last-of-type) {-->
<!--    margin-right: 1rem;-->
<!--  }-->

<!--  &:not(.selected) {-->
<!--    border-color: transparent;-->
<!--  }-->

<!--  &.selected {-->
<!--    border-color: $lbry-black;-->
<!--  }-->
<!--}-->

<!--.playground-content__meme__editor {-->
<!--  width: 50%; min-height: 50vh;-->
<!--  float: right;-->
<!--  font-size: 1rem;-->
<!--}-->

<!--.playground-content__trends {-->
<!--  @extend .media-grid;-->
<!--  @include create-grid;-->

<!--  min-width: 0; min-height: 0;-->
<!--  grid-gap: var(&#45;&#45;spacing-m);-->
<!--  position: relative;-->

<!--  &:empty {-->
<!--    @extend .__loading;-->

<!--    &::after {-->
<!--      content: "Fetching content from LBRY";-->
<!--    }-->
<!--  }-->
<!--}-->

<!--.playground-content__trend {-->
<!--  @extend .media;-->

<!--  .media__subtitle {-->
<!--    font-size: 0.8rem;-->
<!--  }-->

<!--  .media__thumb {-->
<!--    background-image: linear-gradient(135deg, var(&#45;&#45;lbry-teal-2), var(&#45;&#45;lbry-blue-3) 100%);-->
<!--    background-position: center;-->
<!--    background-repeat: no-repeat;-->
<!--    background-size: cover;-->
<!--    margin-bottom: 0.5rem;-->
<!--  }-->

<!--  .media__title {-->
<!--    @include line-clamp(2.4rem, 2);-->
<!--    font-size: 1rem;-->
<!--    margin-bottom: 0.25rem;-->
<!--  }-->
<!--}-->

<!--.playground-content__urlbar {-->
<!--  height: 2.5rem;-->
<!--  border: 1px solid 226, 229, 233;-->
<!--  display: flex;-->
<!--  margin-bottom: 1rem;-->

<!--  button,-->
<!--  input,-->
<!--  span {-->
<!--    float: left;-->
<!--    vertical-align: middle;-->
<!--  }-->

<!--  button,-->
<!--  span {-->
<!--    height: 100%;-->
<!--  }-->

<!--  button {-->
<!--    width: 6rem;-->
<!--    text-transform: lowercase;-->
<!--    z-index: 1;-->
<!--  }-->

<!--  input {-->
<!--    width: calc(100% - 9.5rem);-->
<!--    border: none;-->
<!--    font-size: 1rem;-->

<!--    &::placeholder {-->
<!--      color: $lbry-gray-4;-->
<!--      opacity: 1;-->
<!--    }-->
<!--  }-->

<!--  span {-->
<!--    @include no-user-select;-->
<!--    width: 3.5rem; height: 2.5rem;-->

<!--    color: $lbry-gray-4;-->
<!--    cursor: default;-->
<!--    font-size: 1rem;-->
<!--    line-height: 2.4;-->
<!--    text-align: right;-->
<!--  }-->
<!--}-->

<!--/*!-->
<!-- * Playground | Description-->
<!-- *-->
<!-- * @class .playground__description-->
<!--**/-->

<!--.playground__description {-->
<!--  padding: 1rem;-->

<!--  cursor: default;-->
<!--  font-size: 1rem;-->
<!--  line-height: 1.33;-->

<!--  &:not(.success) {-->
<!--    background-color: rgba(226, 229, 233, 0.3);-->
<!--    text-align: center;-->
<!--  }-->

<!--  &.success {-->
<!--    background-color: rgba($lbry-teal-1, 0.3);-->

<!--    strong {-->
<!--      display: block;-->
<!--      text-transform: uppercase;-->
<!--    }-->
<!--  }-->

<!--  code {-->
<!--    padding: 2px 5px;-->
<!--    background-color: $lbry-black;-->
<!--    border-radius: 0.2rem;-->
<!--    color: #fff;-->
<!--    font-size: 0.8rem;-->
<!--  }-->

<!--  a {-->
<!--    font-weight: 700;-->
<!--  }-->
<!--}-->

<!--</style>-->

<template>
  <section class="playground">
    <ul class="playground-navigation">
      <li
        class="playground-navigation__example"
        data-action="playground, example 1"
        data-description="In this example, you can see what runs under the hood when selecting content to view in the LBRY app."
        data-example="1"
        data-success="<strong>Success</strong> You resolved a claim, which is a <em>fancy</em> way of saying you searched for a piece of content and got back all the metadata associated with it (if it exists)."
      >
        <button type="button">Resolve</button>
        <span>Get details of media (aka, "claim" metadata)</span>
      </li>

      <li
        class="playground-navigation__example"
        data-action="playground, example 2"
        data-description="Sometimes you want to create content, not just consume it. In this example, you can create a meme and upload it to LBRY!"
        data-example="2"
        data-success="<strong>Meme-a-riffic</strong> You've just contributed to the growing expanse that is the meme industry. Where will your meme go next? YOU DECIDE!"
      >
        <button type="button">Publish</button>
        <span>Create a meme and upload it to the LBRY blockchain</span>
      </li>

      <li
        class="playground-navigation__example"
        data-action="playground, example 3"
        data-description="In the LBRY app, you can financially support your favorite creators by donating LBRY Credits (LBC). In this example, we are donating LBC in your stead."
        data-example="3"
        data-success="<strong>Kudos</strong> You've just supported a creator with LBC (LBRY Credits) with our own stash of LBC (you'd use your own IRL). You're basically saying, 'thanks for this great content, please continue!' and that's awesome. You're awesome."
      >
        <button type="button">Support</button>
        <span>Support creators on LBRY with a tip, on us!</span>
      </li>
    </ul>
    <p class="playground__description" id="playground-example-description"></p>
    <section class="playground-content">
      <input-submit class="playground-content__urlbar" id="playground-url">
        <span>lbry://</span><input id="fetch-claim-uri" placeholder="&thinsp;Enter a LBRY address or select a video below" type="text"/>
        <button class="button" data-action="execute claim" type="button">Resolve</button>
      </input-submit>

      <div class="playground-content__trends" id="playground-loader"></div>
      <div id="playground-results"></div>

<!--      <script>-->
<!--        document.getElementById("playground-example-description").textContent = document.querySelector("[data-action='playground, example 1']").dataset.description-->
<!--      </script>-->
    </section>
  </section>
</template>
