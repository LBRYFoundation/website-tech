<script setup>
import markdownit from "markdown-it";
import { onMounted } from "vue";

import chainqueryMarkdown from "/partials/overview/chainquery.md?url&raw";
import walletMarkdown from "/partials/overview/wallet-server.md?url&raw";
import lbrycrdMarkdown from "/partials/overview/lbrycrd.md?url&raw";
import lbryMarkdown from "/partials/overview/lbrysdk.md?url&raw";
import applicationsMarkdown from "/partials/overview/applications.md?url&raw";
import lighthouseMarkdown from "/partials/overview/lighthouse.md?url&raw";
import reflectorMarkdown from "/partials/overview/reflector.md?url&raw";

const md = markdownit();

function chainquery() {
  return (
    ` <div class="ecosystem__submodule chainquery">
    <h3 class="ecosystem__submodule__title" data-action="openSubmodule" data-target="chainquery">chainquery</h3>

    <div class="ecosystem__submodule__description">
      <div class="ecosystem__submodule__markdown">` +
    md.render(chainqueryMarkdown) +
    `</div>
      <ul class="__parents">
        <li class="__parent green" data-action="open" data-target="applications">Applications</li>
        <li class="__parent red" data-action="open" data-target="lbrycrd">Blockchain</li>
        <li class="__parent blue" data-action="open" data-target="lbry">Data Network</li>
        <li class="__close" data-action="close">&times;</li>
      </ul>
    </div>
  </div>`
  );
}

function wallet() {
  return (
    `<div class="ecosystem__submodule wallet">
    <h3 class="ecosystem__submodule__title" data-action="openSubmodule" data-target="wallet">wallet server</h3>

    <div class="ecosystem__submodule__description">
      <div class="ecosystem__submodule__markdown">` +
    md.render(walletMarkdown) +
    `</div>

      <ul class="__parents">
        <li class="__parent green" data-action="open" data-target="applications">Applications</li>
        <li class="__parent red" data-action="open" data-target="lbrycrd">Blockchain</li>
        <li class="__parent blue" data-action="open" data-target="lbry">Data Network</li>
        <li class="__close" data-action="close">&times;</li>
      </ul>
    </div>
  </div>`
  );
}

function lbrycrd() {
  return (
    `<div class="ecosystem__module lbrycrd">
    <span class="__close" data-action="close">&times;</span>

    <h2 class="__title">
      <span data-action="open" data-target="lbrycrd">
        Blockchain
        <em>The foundation of the LBRY protocol.</em>
      </span>

      <div>
        <span><a href="https://github.com/lbryio/lbrycrd">lbrycrd</a></span>
        <span><a href="https://github.com/lbryio/lbry-sdk">SDK</a></span>
      </div>
    </h2>

    <div class="ecosystem__module__details">` +
    md.render(lbrycrdMarkdown) +
    `</div>
  </div>`
  );
}

function lbry() {
  return (
    `<div class="ecosystem__module lbry">
    <span class="__close" data-action="close">&times;</span>

    <h2 class="__title">
      <span data-action="open" data-target="lbry">
        Data Network
        <em>What makes the LBRY blockchain useful.</em>
      </span>

      <div>
        <span><a href="https://github.com/lbryio/lbry-sdk">lbrysdk</a></span>
        <span><a href="https://github.com/lbryio/types">lbryschema</a></span>
      </div>
    </h2>

    <div class="ecosystem__module__details">` +
    md.render(lbryMarkdown) +
    `</div>
  </div>`
  );
}

function applications() {
  return (
    ` <div class="ecosystem__module applications">
    <span class="__close" data-action="close">&times;</span>

    <h2 class="__title">
      <span data-action="open" data-target="applications">
        Applications
        <em>Desktop clients, mobile apps, websites and ∞ more</em>
      </span>

      <div>
        <span><a href="https://github.com/lbryio/lbry-android" title="Android app repo">android</a></span>
        <span><a href="https://github.com/lbryio/lbry-desktop" title="Desktop app repo">desktop</a></span>
        <span><a href="https://github.com/lbryio/spee.ch" title="spee.ch repo">spee.ch</a></span>
      </div>
    </h2>

    <div class="ecosystem__module__details">` +
    md.render(applicationsMarkdown) +
    `</div>
  </div>`
  );
}

function lighthouse() {
  return (
    `<div class="ecosystem__submodule lighthouse">
    <h3 class="ecosystem__submodule__title" data-action="openSubmodule" data-target="lighthouse">lighthouse</h3>

    <div class="ecosystem__submodule__description">
      <div class="ecosystem__submodule__markdown">` +
    md.render(lighthouseMarkdown) +
    `</div>

      <ul class="__parents">
        <li class="__parent green" data-action="open" data-target="applications">Applications</li>
        <li class="__parent red" data-action="open" data-target="lbrycrd">Blockchain</li>
        <li class="__parent blue" data-action="open" data-target="lbry">Data Network</li>
        <li class="__close" data-action="close">&times;</li>
      </ul>
    </div>
  </div>`
  );
}

function reflector() {
  return (
    `<div class="ecosystem__submodule reflector">
    <h3 class="ecosystem__submodule__title" data-action="openSubmodule" data-target="reflector">reflector</h3>

    <div class="ecosystem__submodule__description">
      <div class="ecosystem__submodule__markdown">` +
    md.render(reflectorMarkdown) +
    `</div>

      <ul class="__parents">
        <li class="__parent green" data-action="open" data-target="applications">Applications</li>
        <li class="__parent red" data-action="open" data-target="lbrycrd">Blockchain</li>
        <li class="__parent blue" data-action="open" data-target="lbry">Data Network</li>
        <li class="__close" data-action="close">&times;</li>
      </ul>
    </div>
  </div>`
  );
}

function open(ecosystemComponentClassName) {
  switch (true) {
    case ecosystemComponentClassName === "lbrycrd":
      resetClassesAndStorage();
      document.getElementsByClassName("lbrycrd")[0].classList.add("active");
      document.getElementsByClassName("chainquery")[0].className += " on red";
      document.getElementsByClassName("lighthouse")[0].className += " on red";
      document.getElementsByClassName("wallet")[0].className += " on red";

      localStorage.setItem("LBRY Ecosystem Overview • lbrycrd is open", true);
      break;

    case ecosystemComponentClassName === "lbry":
      resetClassesAndStorage();
      document.getElementsByClassName("lbry")[0].classList.add("active");
      document.getElementsByClassName("reflector")[0].className += " on blue";
      document.getElementsByClassName("wallet")[0].className += " on blue";

      localStorage.setItem("LBRY Ecosystem Overview • lbry is open", true);
      break;

    case ecosystemComponentClassName === "applications":
      resetClassesAndStorage();
      document
        .getElementsByClassName("applications")[0]
        .classList.add("active");
      document.getElementsByClassName("chainquery")[0].className += " on green";
      document.getElementsByClassName("lighthouse")[0].className += " on green";

      localStorage.setItem(
        "LBRY Ecosystem Overview • applications is open",
        true,
      );
      break;

    default:
      break;
  }
}

function openSubmodule(ecosystemComponentClassName) {
  // if (!document.getElementsByClassName(ecosystemComponentClassName)[0].classList.contains("on")) return; // do not activate unless submodule is ".on"

  document.querySelectorAll(".ecosystem__submodule").forEach((n) => {
    n.classList.remove("active");
    n.classList.remove("on");
  });

  localStorage.removeItem("LBRY Ecosystem Overview • chainquery is open");
  localStorage.removeItem("LBRY Ecosystem Overview • wallet is open");
  localStorage.removeItem("LBRY Ecosystem Overview • lighthouse is open");
  localStorage.removeItem("LBRY Ecosystem Overview • reflector is open");

  document
    .querySelectorAll(".ecosystem__module")
    .forEach((n) => n.classList.remove("active"));

  switch (true) {
    case ecosystemComponentClassName === "chainquery":
      setSubmoduleConnectionTitle(ecosystemComponentClassName);

      document.getElementsByClassName("ecosystem")[0].className +=
        " expand-left";
      document.getElementsByClassName(
        ecosystemComponentClassName,
      )[0].className += " active";

      localStorage.setItem(
        "LBRY Ecosystem Overview • chainquery is open",
        true,
      );
      break;

    case ecosystemComponentClassName === "wallet":
      setSubmoduleConnectionTitle(ecosystemComponentClassName);

      document.getElementsByClassName("ecosystem")[0].className +=
        " expand-left";
      document.getElementsByClassName(
        ecosystemComponentClassName,
      )[0].className += " active";

      localStorage.setItem("LBRY Ecosystem Overview • wallet is open", true); // uh-oh
      break;

    case ecosystemComponentClassName === "lighthouse":
      setSubmoduleConnectionTitle(ecosystemComponentClassName);

      document.getElementsByClassName("ecosystem")[0].className +=
        " expand-right";
      document.getElementsByClassName(
        ecosystemComponentClassName,
      )[0].className += " active";

      localStorage.setItem(
        "LBRY Ecosystem Overview • lighthouse is open",
        true,
      );
      break;

    case ecosystemComponentClassName === "reflector":
      setSubmoduleConnectionTitle(ecosystemComponentClassName);

      document.getElementsByClassName("ecosystem")[0].className +=
        " expand-right";
      document.getElementsByClassName(
        ecosystemComponentClassName,
      )[0].className += " active";

      localStorage.setItem("LBRY Ecosystem Overview • reflector is open", true);
      break;

    default:
      break;
  }
}

function close() {
  resetClassesAndStorage();
}

function setSubmoduleConnectionTitle(submoduleClass) {
  switch (true) {
    case document
      .getElementsByClassName(submoduleClass)[0]
      .classList.contains("blue"):
      document.querySelector(`.${submoduleClass} .__parent.blue`).className +=
        " active";
      break;

    case document
      .getElementsByClassName(submoduleClass)[0]
      .classList.contains("green"):
      document.querySelector(`.${submoduleClass} .__parent.green`).className +=
        " active";
      break;

    case document
      .getElementsByClassName(submoduleClass)[0]
      .classList.contains("red"):
      document.querySelector(`.${submoduleClass} .__parent.red`).className +=
        " active";
      break;

    default:
      document
        .getElementsByClassName(submoduleClass)[0]
        .classList.add("single");
      break;
  }
}

function resetClassesAndStorage() {
  document.querySelectorAll(".ecosystem__submodule").forEach((n) => {
    n.classList.remove("active");
    n.classList.remove("blue");
    n.classList.remove("green");
    n.classList.remove("on");
    n.classList.remove("red");
    n.classList.remove("single");
  });

  document
    .querySelectorAll(".ecosystem__module")
    .forEach((n) => n.classList.remove("active"));

  document.querySelectorAll(".ecosystem").forEach((n) => {
    n.classList.remove("expand-left");
    n.classList.remove("expand-right");
  });

  document
    .querySelectorAll(".__parent")
    .forEach((n) => n.classList.remove("active"));

  // Clear localStorage
  localStorage.removeItem("LBRY Ecosystem Overview • lbrycrd is open");
  localStorage.removeItem("LBRY Ecosystem Overview • lbry is open");
  localStorage.removeItem("LBRY Ecosystem Overview • applications is open");
  localStorage.removeItem("LBRY Ecosystem Overview • chainquery is open");
  localStorage.removeItem("LBRY Ecosystem Overview • wallet is open");
  localStorage.removeItem("LBRY Ecosystem Overview • lighthouse is open");
  localStorage.removeItem("LBRY Ecosystem Overview • reflector is open");
}

function onClick(event) {
  if (!event.target.dataset.action) {
    return;
  }

  event.preventDefault();
  const data = event.target.dataset;

  switch (data.action) {
    case "open":
      open(data.target);
      break;

    case "openSubmodule":
      openSubmodule(data.target);
      break;

    case "close":
      close();
      break;

    default:
      break;
  }
}

onMounted(() => {
  const mainModules = [
    {
      applications: localStorage.getItem(
        "LBRY Ecosystem Overview • applications is open",
      ),
    },
    { lbry: localStorage.getItem("LBRY Ecosystem Overview • lbry is open") },
    {
      lbrycrd: localStorage.getItem(
        "LBRY Ecosystem Overview • lbrycrd is open",
      ),
    },
  ];

  const subModules = [
    {
      chainquery: localStorage.getItem(
        "LBRY Ecosystem Overview • chainquery is open",
      ),
    },
    {
      lighthouse: localStorage.getItem(
        "LBRY Ecosystem Overview • lighthouse is open",
      ),
    },
    {
      reflector: localStorage.getItem(
        "LBRY Ecosystem Overview • reflector is open",
      ),
    },
    {
      wallet: localStorage.getItem("LBRY Ecosystem Overview • wallet is open"),
    },
  ];

  for (const module of mainModules) {
    if (
      module[Object.keys(module)] === "true" &&
      document.querySelector(
        `.ecosystem__module.${Object.keys(module)} h2 span`,
      )
    )
      document
        .querySelector(`.ecosystem__module.${Object.keys(module)} h2 span`)
        .click();
  }

  for (const subModule of subModules) {
    if (
      subModule[Object.keys(subModule)] === "true" &&
      document.querySelector(
        `.ecosystem__submodule.${Object.keys(subModule)} h3`,
      )
    )
      document
        .querySelector(`.ecosystem__submodule.${Object.keys(subModule)} h3`)
        .click();
  }

  document.addEventListener("click", onClick);
});
</script>

<style>
.ecosystem {
  font-size: 1rem;
  margin-bottom: 2rem;
  padding-top: 1rem;

  @media (min-width: 951px) {
    display: grid;
    grid-gap: 1rem;
  }

  &:not(.expand-left):not(.expand-right) {
    @media (min-width: 951px) {
      grid-template-columns: 144px auto 144px;

      .ecosystem__submodules {
        padding-top: 2.5rem;
      }
    }

    @media (max-width: 950px) {
      .ecosystem__submodules {
        display: flex;
        justify-content: space-between;
      }
    }
  }

  &.expand-left {
    grid-template-columns: 50% auto;

    .ecosystem__submodules:last-of-type,
    .ecosystem__submodule:not(.active) {
      display: none;
    }
  }

  &.expand-right {
    grid-template-columns: auto 50%;

    .ecosystem__submodules:first-of-type,
    .ecosystem__submodule:not(.active) {
      display: none;
    }
  }
}

.ecosystem__modules {
  @media (max-width: 950px) {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
}

.ecosystem__module {
  width: 100%;
  position: relative;

  > * {
    z-index: 1;
  }

  h2 {
    width: 100%;
    position: relative;

    > div {
      font-size: 1rem;
      padding-top: 1.95rem;
      position: relative;

      @media (min-width: 951px) {
        float: right;
        padding-right: 3rem;
        text-align: right;
      }

      &::before {
        @include font-serif;
        width: 100%;
        top: 0.9rem;

        content: "key repositories";
        font-size: 80%;
        font-style: italic;
        opacity: 0.3;
        position: absolute;

        @media (min-width: 951px) {
          right: 3rem;
          text-align: right;
        }

        @media (max-width: 950px) {
          left: 0;
        }
      }

      span {
        cursor: pointer;
        display: inline-block;
        position: relative;

        &:not(:last-of-type) {
          margin-right: 1rem;

          &::after {
            top: 0;
            right: -0.7rem;

            color: #888;
            content: "/";
            font-style: italic;
            position: absolute;
          }
        }
      }
    }
  }

  h3 {
    position: relative;
  }

  &::before {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    content: "";
    position: absolute;
    z-index: 0;
  }

  &:not(.active) {
    @include center;

    h2 {
      font-size: 1.5rem;
      text-align: center;

      > span {
        padding: 1.9rem 2rem;

        cursor: pointer;
        display: block;

        em {
          display: block;
          font-size: 70%;
          font-weight: normal;
        }
      }

      > div {
        display: none;
      }
    }

    .ecosystem__module__details {
      display: none;
    }

    .__close {
      transform: translateY(-0.25rem) rotate(45deg);
      z-index: 0;

      @media (max-width: 950px) {
        display: none;
      }
    }
  }

  &.active {
    padding: 2rem;

    h2 {
      margin-bottom: 1rem;

      @media (min-width: 951px) {
        font-size: 3rem;
      }

      @media (max-width: 950px) {
        font-size: 1.5rem;
      }

      > span {
        cursor: default;

        em {
          display: none;
        }
      }
    }

    &::before {
      background-color: #fff;
    }

    .__close {
      transform: translateY(-0.25rem);
      z-index: 3;
    }
  }

  &.lbrycrd,
  &.lbry {
    margin-bottom: 1rem;
  }

  &.lbrycrd,
  &.lbry,
  &.applications {
    &:not(.active) {
      h2 {
        margin-bottom: 0.5rem;

        &::after {
          width: 100%;
          bottom: 1rem;
          left: 0;

          font-size: 0.5rem;
          letter-spacing: 0.1rem;
          position: absolute;
          z-index: -1;
        }
      }
    }
  }

  &.lbrycrd {
    &:not(.active) {
      &::before {
        background-color: red;
      }

      h2::after {
        content: "◼︎";
      }
    }

    &.active::before {
      border: 2px solid red;
    }
  }

  &.lbry {
    &:not(.active) {
      &::before {
        background-color: #0000ff;
      }

      h2::after {
        content: "◼︎◼︎";
      }
    }

    &.active::before {
      border: 2px solid #0000ff;
    }
  }

  &.applications {
    &:not(.active) {
      &::before {
        background-color: green;
      }

      h2::after {
        content: "◼︎◼︎◼︎︎";
      }
    }

    &.active::before {
      border: 2px solid green;
    }
  }
}

.ecosystem__module__details,
.ecosystem__submodule__markdown {
  @extend %markdown;
}

.ecosystem__module__piece {
  width: 80%;
  left: 10%;

  background-color: white;
  line-height: 2;
  position: relative;

  &:not(:last-of-type) {
    margin-bottom: 0.5rem;
  }
}

.ecosystem__submodule {
  border-width: 2px;
  cursor: default;
  position: relative;
  transition: border-color 0.2s;
  z-index: 2;

  &:not(:last-of-type) {
    @media (min-width: 951px) {
      margin-bottom: 1rem;
    }
  }

  &:not(.on):not(.active) {
    color: gray;
  }

  &:not(.active) {
    @include center;
    width: 144px;
    height: 144px;

    border-radius: 50%;
    border-style: dashed;

    .ecosystem__submodule__title {
      width: 100%;
      height: 100%;

      line-height: 140px;
      text-align: center;
    }

    .ecosystem__submodule__description {
      display: none;
    }
  }

  &.active {
    width: 100%;
    height: 100%;
    padding: 2rem;

    border-style: solid;
    overflow-y: auto;

    .ecosystem__submodule__title {
      line-height: 1.33;
      margin-bottom: 1rem;
    }
  }

  &:not(.blue):not(.green):not(.red) {
    border-color: gray;
  }

  &.blue,
  &.green,
  &.red {
    &:not(.active) {
      cursor: pointer;
    }
  }

  &.blue {
    background-color: rgba(0, 0, 255, 0.05);
    border-color: blue;
  }

  &.green {
    background-color: rgba(0, 255, 0, 0.05);
    border-color: green;
  }

  &.red {
    background-color: rgba(255, 0, 0, 0.05);
    border-color: red;
  }
}

.ecosystem__submodule__title {
  font-size: 1.15rem;
}

.ecosystem__submodule__description {
  margin-bottom: 2rem;

  .__close {
    width: 1.3rem;
    top: -0.7rem;
    left: 0;
  }
}

.__parents {
  font-size: 1.15rem;
  line-height: 1.33;
  list-style-type: none;
  padding-left: 6.5rem;
  position: relative;
  z-index: 1;

  &::before,
  &::after {
    position: absolute;
  }

  &::before {
    @include font-serif;
    top: 0.3rem;
    left: 3rem;

    color: gray;
    content: "back to";
    font-size: 0.8rem;
    font-style: italic;
    font-weight: 700;
  }

  &::after {
    width: 2px;
    height: 100%;
    top: 0;
    left: 2rem;

    background-color: gray;
    content: "";
  }

  .single & {
    &::before,
    &::after {
      display: none;
    }
  }
}

.__parent {
  font-weight: 700;

  &:not(.active) {
    display: none;
  }

  &.active {
    cursor: pointer;
  }
}

.__close {
  right: 2rem;

  cursor: pointer;
  font-size: 2rem;
  position: absolute;
  transition: all 0.2s;
}
</style>

<template>
  <section class="ecosystem">
    <aside
      class="ecosystem__submodules"
      v-html="chainquery() + wallet()"
    ></aside>
    <section
      class="ecosystem__modules"
      v-html="lbrycrd() + lbry() + applications()"
    ></section>
    <aside
      class="ecosystem__submodules"
      v-html="lighthouse() + reflector()"
    ></aside>
  </section>
</template>
