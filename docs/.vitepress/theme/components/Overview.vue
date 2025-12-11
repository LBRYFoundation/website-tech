<script setup>
// import {
//   applications,
//   chainquery,
//   lbry,
//   lbrycrd,
//   lighthouse,
//   reflector,
//   wallet
// } from "./ecosystem/index.js";
</script>

<template>
  <section class="ecosystem">
    <aside class="ecosystem__submodules">
<!--      ${await chainquery()}-->
<!--      ${await wallet()}-->
    </aside>

    <section class="ecosystem__modules">
<!--      ${await lbrycrd()}-->
<!--      ${await lbry()}-->
<!--      ${await applications()}-->
    </section>

    <aside class="ecosystem__submodules">
<!--      ${await lighthouse()}-->
<!--      ${await reflector()}-->
    </aside>
  </section>
</template>
