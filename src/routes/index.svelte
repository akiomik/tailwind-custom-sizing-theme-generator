<script>
  import { onMount } from 'svelte';

  import ConfigurationForm from '../components/ConfigurationForm.svelte';
  import JsonCodeBlock from '../components/JsonCodeBlock.svelte';
  import CustomThemeGenerator from '../helpers/CustomThemeGenerator.mjs';

  const config = { theme: {} };

  let defaultFontSize = 16;
  let actualFontSize = 16;
  let unit = 'rem';

  function updateTheme(customization) {
    const generator = new CustomThemeGenerator(customization);
    config.theme = generator.generate();
  }

  onMount(() => {
    updateTheme({ defaultFontSize, actualFontSize, unit });
  });
</script>

<svelte:head>
  <title>Tailwind CSS theme generator for customizing spacing/sizing scale</title>
</svelte:head>

<h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">
  Tailwind CSS<br />
  theme generator<br />
  for customizing<br />
  spacing/sizing scale
</h1>

<ConfigurationForm
  {defaultFontSize}
  {actualFontSize}
  {unit}
  on:customize={({ detail }) => updateTheme(detail)}
/>

<JsonCodeBlock object={config} />
