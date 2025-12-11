<script setup>
import { onMounted } from 'vue';

const baseURLSpec = "https://spec.lbry.com";

function updateHistory(ev){
  const iframe = document.getElementById("spec");

  if(ev.origin!==baseURLSpec || ev.source!==iframe.contentWindow){
    // Security
    return;
  }

  const iframeHash = ev.data;

  const url = window.location.href.substring(0,window.location.href.lastIndexOf("#"));
  history.replaceState(null,null,url + '#' + iframeHash);
}

function updateIframe(){
  const iframe = document.getElementById("spec");
  iframe.src = baseURLSpec + window.location.hash;
}

window.addEventListener('hashchange',updateIframe);

window.addEventListener('message',updateHistory);

onMounted(updateIframe);
</script>

<style>
.frame-viewer {
  width: 100%; height: calc(100vh - 4rem);
  display: block;
}

.frame-viewer iframe {
  border: 0;
  height: 100%;
  width: 100%;
}

</style>

<template>
  <div class="frame-viewer">
    <iframe id="spec"></iframe>
  </div>
</template>
