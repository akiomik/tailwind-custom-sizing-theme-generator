<script lang="ts">
  import { browser } from '$app/env';
  import hljs from 'highlight.js';
  import 'highlight.js/styles/github-dark.css';
  import stringify from 'json-stable-stringify';

  export let object = {};

  let copyLabel = 'Copy';

  // Place string keys at the end
  type KeyValue = { key: string; value: string };
  const cmp = (a: KeyValue, b: KeyValue) => {
    const af = Number.parseFloat(a.key);
    const bf = Number.parseFloat(b.key);

    if (Number.isNaN(af) && Number.isNaN(bf)) {
      return a.key > b.key ? 1 : -1;
    } else if (Number.isNaN(af)) {
      return 1;
    } else if (Number.isNaN(bf)) {
      return -1;
    } else {
      return af > bf ? 1 : -1;
    }
  };

  $: json = stringify(object, { space: 2, cmp });
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

<div class="rounded-lg bg-slate-800 p-4 pt-0 md:p-8 md:pt-0">
  <div class="flex h-4 justify-end md:h-8 md:items-center">
    {#if canCopy}
      <button class="h-8 w-16 bg-neutral-200" on:click={onCopyButtonClick}>
        {copyLabel}
      </button>
    {/if}
  </div>
  <code class="block overflow-x-auto whitespace-pre text-neutral-200">{@html highlightedJson}</code>
</div>
