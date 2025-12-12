<script lang="ts" setup>
import {onMounted, ref} from 'vue';

const baseURLSpec: string = "https://spec.lbry.com";

const iframe = ref<HTMLIFrameElement|null>(null);

function updateHistory(ev: MessageEvent): void{
  if(ev.origin!==baseURLSpec || ev.source!==iframe.value.contentWindow){
    // Security
    return;
  }

  const iframeHash: string = ev.data;

  const url: string = window.location.href.substring(0,window.location.href.lastIndexOf("#"));
  history.replaceState(null,null,url + '#' + iframeHash);
}

function updateIframe(): void{
  iframe.value.src = baseURLSpec + window.location.hash;
}

onMounted((): void => {
  updateIframe();

  window.addEventListener('hashchange',updateIframe);

  window.addEventListener('message',updateHistory);
});
</script>

<style>
.frame-viewer {
  display: block;
  height: calc(100vh - 4rem);
  width: 100%;
}

.frame-viewer iframe {
  border: 0;
  height: 100%;
  width: 100%;
}
</style>

<template>
  <div class="frame-viewer">
    <iframe ref="iframe"></iframe>
  </div>
</template>
