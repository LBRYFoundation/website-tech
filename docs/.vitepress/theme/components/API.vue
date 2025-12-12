<script>
export default {
  props: ['api'],
};
</script>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps(['api']);

const repository = props.api === "daemon" ?
  "lbry-sdk" :
  "lbrycrd";

const filePathBlockchain = "/contrib/devtools/generated/api_v1.json";
const filePathSdk = "docs/api.json";
const rawGitHubBase = "https://cdn.jsdelivr.net/gh/lbryfoundation/";

const tag = 'master';

const apiResponse = ref(null);

const versions = ['master'];

// async function getTags(repositoryName) {
//   const {versions: data} = await (await fetch(`https://data.jsdelivr.com/v1/packages/gh/lbryfoundation/${repositoryName}`)).json();
//
//   // const { data } = await octokit.repos.listTags({
//   //   owner: "lbryio",
//   //   repo: repositoryName
//   // });
//
//   const tags = ["master"];
//
//   // NOTE:
//   // The versioning in our repos do not make sense so extra
//   // exclusion code is needed to make this work.
//   //
//   // Documentation is only available after specific versions.
//
//   switch(true) {
//     case repositoryName === "lbry-sdk":
//       data.forEach(tag => {
//         if (tag.version >= "v0.52.0") tags.push(tag.version);
//       });
//       break;
//
//     case repositoryName === "lbrycrd":
//       data.forEach(tag => {
//         if (
//           tag.version >= "v0.17.1.0" &&
//           tag.version !== "v0.3.16" &&
//           tag.version !== "v0.3.15" &&
//           tag.version !== "v0.3-osx" &&
//           tag.version !== "v0.2-alpha"
//         )
//           tags.push(tag.version);
//       });
//       break;
//
//     default:
//       break;
//   }
//
//   return tags;
// }
//
// const tags = await getTags(repository);

function renderArguments(args) {
  const argumentContent = [];

  if (!args || args.length === 0)
    return argumentContent;

  args.forEach(arg => {
    argumentContent.push(`
      <li class="api-content__body-argument">
        <div class="left">
          <strong>${arg.name}</strong><br/>
          ${arg.is_required === true ? "" : "<span>optional</span>"}<span>${arg.type}</span>
        </div>

        <div class="right">${typeof arg.description === "string" ? arg.description.replace(/</g, "&lt;").replace(/>/g, "&gt;") : ""}</div>
      </li>
    `);
  });

  return argumentContent;
}

function renderExamples(args) {
  const exampleContent = [];

  if (!args || args.length === 0) {
    exampleContent.push("<pre><code>// example(s) to come later</code></pre>");
    return exampleContent;
  }

  args.forEach(arg => {
    exampleContent.push(`
      ${arg.title ? `<h3>${arg.title}</h3><br/>` : ""}
      ${arg.cli ? `<pre data-api-example-type="cli"><code>${arg.cli}</code></pre>` : ""}
      ${arg.curl ? `<pre data-api-example-type="curl"><code>${arg.curl}</code></pre>` : ""}
      ${arg.lbrynet ? `<pre data-api-example-type="lbrynet"><code>${arg.lbrynet}</code></pre>` : ""}
      ${arg.python ? `<pre data-api-example-type="python"><code>${arg.python}</code></pre>` : ""}

      ${arg.output ? `
        <h3>Output</h3><br/>
        <pre><code>${arg.output}</code></pre>
        <hr/>
      ` : ""}
    `);
  });

  return exampleContent;
}

function renderReturns(args) {
  let returnContent = [];

  if (!args || args.length === 0)
    return returnContent;

  returnContent = dedent(JSON.parse(JSON.stringify(args)));
  return returnContent;
}

function dedent(string) {
  // Split into lines
  const lines = string.split('\n');

  if (lines[0].trim() === '') lines.shift();
  if (lines.length > 0 && lines[lines.length - 1].trim() === '') lines.pop();
  const indents = lines
    .slice(1)
    .filter(line => line.trim() !== '')
    .map(line => line.match(/^\s*/)[0].length);
  const minIndent = indents.length > 0 ? Math.min(...indents) : 0;
  return lines.map(line => {
    const leadingWhitespace = line.match(/^\s*/)[0];
    if (leadingWhitespace.length >= minIndent) {
      return line.slice(minIndent);
    }
    return line;
  }).join('\n');
}

///

function renderVersionSelector() {
  const options = [
    "<option disabled>Select a version</option>"
  ];

  let optionIndex = 0;

  versions.forEach(version => {
    optionIndex++;
    let selectedOption = false;

    if (tag && tag === version)
      selectedOption = true;
    else if (optionIndex === 1)
      selectedOption = true;

    options.push(
      `<option value="${props.api}-${version}"${selectedOption ? " selected" : ""}>${version}</option>`
    );
  });

  return options;
}

function createSidebar(){
  if(apiResponse.value){
    if(props.api==='daemon'){
      return createSdkSidebar(apiResponse.value);
    }
    return createApiSidebar(apiResponse.value);
  }
}

function createSdkSidebar(apiDetails) {
  const sectionTitles = Object.keys(apiDetails);
  const apiSidebar = [];

  sectionTitles.forEach(title => {
    const commands = apiDetails[title].commands;

    apiSidebar.push(`
      <ul class="api-toc__section">
        <li class="api-toc__title">${title}</li>
        ${(commands.map(command => `<li class="api-toc__command"><a href="#${command.name}" title="Go to ${command.name} section">${command.name}</a></li>`)).join("")}
      </ul>
    `);
  });

  return apiSidebar;
}

function createApiSidebar(apiDetails) {
  const apiSidebar = [];

  apiDetails.forEach(apiDetail => {
    apiSidebar.push(`
      <li class="api-toc__command">
        <a href="#${apiDetail.name}" title="Go to ${apiDetail.name} section">
          ${apiDetail.name}
        </a>
      </li>
    `);
  });

  return apiSidebar;
}

function renderCodeLanguageToggles() {
  const onSdkPage = props.api === "daemon";

  return [
    "<button class='api-content__item menu' id='toggle-menu'>menu</button>",
    !onSdkPage ? "<button class='api-content__item' id='toggle-cli' type='button'>cli</button>" : "",
    "<button class='api-content__item' id='toggle-curl' type='button'>curl</button>",
    onSdkPage ? "<button class='api-content__item' id='toggle-lbrynet' type='button'>lbrynet</button>" : "",
    onSdkPage ? "<button class='api-content__item' id='toggle-python' type='button'>python</button>" : ""
  ];
}

function createDocumentation(){
  return `
    <div><!--EMPTY--></div>
    <nav class="api-content__items">`+renderCodeLanguageToggles()+`</nav>`
    + createHeader()
    + createContent();
}

function createHeader() {
  if(props.api==='daemon'){
    return `<div class="api-content__body">
    <h2>lbry-sdk ${tag}</h2>
    <p>Methods and signatures provided by the <a href="/glossary#lbry-sdk">lbry-sdk</a> daemon are documented below. To build, download, or run the daemon, see the project <a href="https://github.com/lbryio/lbry-sdk/blob/master/README.md">README</a>.</p>
  </div>

  <div class="api-content__intro">
    <p>You can find the repo for this API on GitHub:</p>
    <pre><code>https://github.com/lbryio/lbry-sdk</code></pre>
  </div>`;
  }
  if(props.api==='blockchain'){
    return ` <div class="api-content__body">
    <h2>lbrycrd ${version}</h2>
    <p>Methods and signatures provided by the <a href="/glossary#lbrycrd">lbrycrd</a> blockchain daemon are documented below. To build, download, or run lbrycrd, see the project <a href="https://github.com/lbryio/lbrycrd/blob/master/README.md">README</a>.</p>
  </div>

  <div class="api-content__intro">
    <p>You can find the repo for this API on GitHub:</p>
    <pre><code>https://github.com/lbryio/lbrycrd</code></pre>
  </div>`;
  }
  return ``;
  // switch(slug) {
  //   case "blockchain":
  //     return headerBlockchain(apiVersion);
  //
  //   case "daemon":
  //     return headerSdk(apiVersion);
  //
  //   default:
  //     break;
  // }
}

function createContent(){
  if(apiResponse.value){
    if(props.api==='daemon'){
      return createSdkContent(apiResponse.value);
    }
    return createApiContent(apiResponse.value);
  }
}

function createSdkContent(apiDetails) {
  const apiContent = [];
  const sectionTitles = Object.keys(apiDetails);

  sectionTitles.forEach(title => {
    const commands = apiDetails[title].commands;
    const description = apiDetails[title].doc;

    apiContent.push(
      commands.length ?
        commands.map(command => createSdkContentSections(title, description, command)).join("") :
        ""
    );
  });

  return apiContent;
}

function createSdkContentSections(sectionTitle, sectionDescription, sectionDetails) {
  return `
    <div class="api-content__body">
      <h2 id="${sectionDetails.name}">${sectionDetails.name}</h2>
      <p>${sectionDetails.description}</p>

      <h3>Arguments</h3>
      <ul class="api-content__body-arguments">
        ${renderArguments(sectionDetails.arguments).join("")}
      </ul>

      <h3>Returns</h3>
      <pre><code>${renderReturns(sectionDetails.returns)}</code></pre>
    </div>

    <div class="api-content__example">
      ${renderExamples(sectionDetails.examples).join("")}
    </div>
  `;
}

function createApiContent(apiDetails) {
  const apiContent = [];

  apiDetails.forEach(apiDetail => {
    let apiDetailsReturns = "";

    if (apiDetail.returns)
      apiDetailsReturns = JSON.parse(JSON.stringify(apiDetail.returns));

    apiContent.push(`
      <div class="api-content__body">
        <h2 id="${apiDetail.name}">${apiDetail.name}</h2>
        <p>${apiDetail.description}</p>

        ${apiDetail.arguments.length ? `<h3>Arguments</h3><ul class="api-content__body-arguments">${renderArguments(apiDetail.arguments).join("")}</ul>` : ""}
        ${apiDetail.returns ? `<h3>Returns</h3><pre><code>${dedent(apiDetailsReturns)}</code></pre>` : ""}
      </div>

      <div class="api-content__example">
        ${apiDetail.examples && apiDetail.examples.length ? renderExamples(apiDetail.examples).join("") : `<pre><code>// example(s) for ${apiDetail.name} to come later</code></pre>`}
      </div>
    `);
  });

  return apiContent;
}

////

function createAPIReferenceURL(repository,tag){
  const baseURLRepository = `${rawGitHubBase}${repository}@${tag}/`;

  if(repository === 'lbrycrd'){
    return `${baseURLRepository}${filePathBlockchain}`;
  }
  if(repository === 'lbry-sdk'){
    return `${baseURLRepository}${filePathSdk}`;
  }

  throw new Error("Failed to create API Reference URL.");
}

async function fetchAPIReferenceJSON(url){
  const response = await fetch(url);
  try{
    return await response.json();
  }catch(ex){
    throw new Error("Failed parsing JSON");
  }
}

onMounted(async() => {
  const url = createAPIReferenceURL(repository,tag);
  apiResponse.value = await fetchAPIReferenceJSON(url);

  if(props.api==='blockchain'){
    document.getElementById("toggle-cli").click();
  }else{
    document.getElementById("toggle-curl").click();
  }
});
</script>

<style>
.__slate {
  width: 100%;
  height: 100%;
  position: relative;

  &::after {
    @include clearfix;
  }
}

.api-header {
  padding: 2rem;
  position: relative;

  &::after {
    width: 100%; height: 1px;
    bottom: -1px; left: 0;

    background-color: #888;
    content: "";
    position: absolute;
  }
}

.api-toc {
  width: 200px; height: calc(100vh - 4rem); /* navigation is 4rem tall*/
  bottom: 0;

  background-color:  #fff;
  border-right: 1px solid #888;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  z-index: 3;

  @media (min-width: 801px) {
    left: 0;
  }

  @media (max-width: 800px) {
    height: calc(100% - 4rem);
    top: 4rem;
    padding-top: 3.5rem;
    transition: left 0.2s;

    -webkit-overflow-scrolling: touch;

    &:not(.active) {
      left: -200px;
    }

    &.active {
      left: 0;
    }
  }
}

.api-toc__select,
.api-toc__search-field {
  width: 100%;

  border-top: none;
  border-right: none;
  border-bottom: 1px solid #888;
  border-left: none;
}

.api-toc__select {
  background-position-x: 95%;
}

.api-toc__search {
  position: relative;
}

.api-toc__search-field {
  padding: 0.25rem calc(2rem + 4px) 0.25rem 0.75rem;

  border-radius: 0; /* TODO: Put this rule in components on inputs*/
  font-size: 0.8rem;
  line-height: 2rem;
}

.api-toc__search-clear {
  width: 1.25rem; height: 1.25rem;
  top: 0.6rem; right: 0.75rem;

  background-color: #000;
  border-radius: 50%;
  color:  #fff;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1.15;
  position: absolute;
  text-align: center;
  transition: opacity 0.2s;

  &:not(.active) {
    opacity: 0;
    visibility: hidden;
  }

  &.active {
    opacity: 1;
    visibility: visible;
  }
}

.api-toc__title {
  padding: 0.25rem 0.5rem 0.25rem 0.75rem;
  opacity: 0.3;
  pointer-events: none;
  text-transform: uppercase;
}

.api-toc__commands {
  font-size: 0.8rem;
  line-height: 1.33;
  list-style-type: none;
  padding-top: 0.25rem;
  padding-bottom: 1rem;
}

.api-toc__command {
  &:hover {
    background-color: #888;
  }

  a {
    padding: 0.25rem 0.5rem 0.25rem 0.75rem;
    display: block;
  }
}

.api-content {
  @media (min-width: 801px) {
    width: calc(100% - 200px);
    float: right;
  }
}

.api-documentation {
  display: grid;

  @media (min-width: 1201px) {
    grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));

    div {
      &:empty {
        display: none;
      }
    }
  }

  h1 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  h3 {
    font-size: 0.8rem;
    letter-spacing: 0.1rem;
    margin-bottom: 0.25rem;
    text-transform: uppercase;
  }

  p,
  ol,
  ul {
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  ol,
  ul {
    @media (min-width: 801px) {
      font-size: 1rem;
    }

    @media (max-width: 800px) {
      font-size: 0.8rem;
    }
  }

  p {
    font-size: 1rem;
  }

  pre {
    font-size: 0.8rem;
  }

  table {
    width: 100%;

    border: 1px solid rgba( 255,255,255, 0.1);
    border-radius: 0.3rem;
    border-spacing: 0;
    font-size: 0.8rem;
    line-height: 1.33;
  }

  thead {
    display: none;
  }

  th,
  td {
    padding: 0.5rem 1rem 0.5rem 0.5rem;
  }

  th {
    border-bottom: 1px solid rgba( 255,255,255, 0.1);
  }

  tr:nth-child(even) {
    background-color: rgba( 255,255,255, 0.1);
  }
}

.api-content__body {
  padding: 2rem;
  border-bottom: 1px solid #888;

  a {
    transition: color 0.2s;

    &:not(:hover) {
      color: #220088;
    }

    &:hover {
      color: #220088;
    }
  }
}

.api-content__body-arguments {
  border: 1px solid #888;
  border-radius: 3px;
  list-style-type: none;
}

.api-content__body-argument {
  display: flex;

  &:not(:last-of-type) {
    border-bottom: 1px solid #888;
  }

  &:nth-child(even) {
    background-color: rgba(127,127,127, 0.2);
  }

  .left,
  .right {
    padding: 0.5rem 0.75rem;
  }

  .left {
    width: 30%;
    float: left;
    word-wrap: break-word;

    @media (min-width: 801px) {
      border-right: 1px solid #888;
    }

    span {
      color: #888;
      font-size: 0.8rem;

      &:not(:first-of-type) {
        margin-left: 0.5rem;
      }
    }
  }

  .right {
    width: 70%;
    float: right;
    word-wrap: break-word;
  }

  /*&::after {
  //  @include clearfix;
  //}*/
}

.api-content__example,
.api-content__intro {
  padding: 2rem;
  background-color: rgba(0,0,0, 0.9);
  border-bottom: 1px solid rgba( 255,255,255, 0.1);
  color:  #fff;
  position: relative;

  pre {
    background-color: #000;
  }
}



.api-content__items {
  width: 100%;
  padding: 1rem 2rem;
  top: 4rem; right: 0;

  background-color: #000;
  color:  #fff;
  position: sticky;
  z-index: 10;

   /*GOOD OL' SAFARI*/
  position: -webkit-sticky; /* sass-lint:disable-line no-duplicate-properties*/
}

.api-content__item {
  padding: 0.25rem 0.75rem;
  border-radius: 0.2rem;
  display: inline-block;
  font-size: 0.8rem;
  transition: background-color 0.2s;

  &.menu {
    @media (min-width: 801px) {
      display: none;
    }
  }

  &:not(:last-of-type) {
    margin-right: 0.5rem;
  }

  &:not(:hover) {
    background-color: #888;
  }

  &.active,
  &:hover {
    background-color: #220088;
  }
}

pre {
  &[data-api-example-type] {
    &:not(.active) {
      display: none;
    }
  }
}
</style>

<template>
  <div class="__slate">
    <aside class="api-toc">
      <select class="api-toc__select" onchange="changeDocumentationVersion(value);" v-html="renderVersionSelector()"></select>
      <div class="api-toc__search">
        <input class="api-toc__search-field" id="input-search" placeholder="Search" type="search"/>
        <div class="api-toc__search-clear" id="clear-search" title="Clear search query">&times;</div>
        <ul class="api-toc__search-results"></ul>
      </div>
      <ul class="api-toc__commands" id="toc" role="navigation" v-html="createSidebar()"></ul>
    </aside>

    <section class="api-content">
      <div class="api-documentation" id="toc-content" v-html="createDocumentation()">
      </div>
    </section>
  </div>
</template>
