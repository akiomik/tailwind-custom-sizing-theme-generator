<script lang="ts">
  import { onMount } from 'svelte';

  import CustomizationForm from '../components/CustomizationForm.svelte';
  import JsonCodeBlock from '../components/JsonCodeBlock.svelte';
  import type { Customization } from '../entities/Customization';
  import { CustomThemeGenerator } from '../helpers/CustomThemeGenerator';

  const config = { theme: {} };

  let defaultCustomization: Customization = {
    defaultFontSize: 16,
    actualFontSize: 16,
    unit: 'rem',
  };

  function updateTheme(customization: Customization) {
    const generator = new CustomThemeGenerator(customization);
    config.theme = generator.generate();
  }

  onMount(() => {
    updateTheme(defaultCustomization);
  });
</script>

<svelte:head>
  <title>Tailwind CSS theme generator for customizing spacing/sizing scale</title>
</svelte:head>

<h1 class="mb-4 text-4xl font-extrabold tracking-tight sm:text-6xl">
  Tailwind CSS<br />
  theme generator<br />
  for customizing<br />
  spacing/sizing scale
</h1>

<CustomizationForm {defaultCustomization} on:customize={({ detail }) => updateTheme(detail)} />

<JsonCodeBlock object={config} />
