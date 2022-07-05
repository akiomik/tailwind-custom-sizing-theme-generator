<script lang="ts">
  import { browser } from '$app/env';
  import hljs from 'highlight.js';
  import 'highlight.js/styles/github-dark.css';

  export let object = {};

  let copyLabel = 'Copy';

  // TODO: use json-stable-stringify
  $: json = JSON.stringify(object, null, 2);
  $: highlightedJson = hljs.highlight(json, { language: 'json' }).value;
  $: canCopy = browser && !!window.navigator.clipboard;

  function onCopyButtonClick() {
    if (!canCopy) {
      return;
    }

    window.navigator.clipboard.writeText(json);
    copyLabel = 'Copied!';
  }
</script>

<div class="rounded-lg bg-slate-800 p-4 md:p-8 pt-0 md:pt-0">
  <div class="flex md:items-center justify-end h-4 md:h-8">
    {#if canCopy}
      <button class="w-16 h-8 bg-neutral-200" on:click={onCopyButtonClick}>
        {copyLabel}
      </button>
    {/if}
  </div>
  <code class="block whitespace-pre text-neutral-200 overflow-x-auto">{@html highlightedJson}</code>
</div>
