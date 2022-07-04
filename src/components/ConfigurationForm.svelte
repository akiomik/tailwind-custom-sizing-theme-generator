<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let defaultFontSize;
  export let actualFontSize;
  export let unit;

  $: valid = defaultFontSize > 0 && actualFontSize > 0 && ['rem', 'px'].includes(unit);

  const onCustomizationChange = () => {
    if (!valid) {
      return;
    }

    dispatch('customize', { defaultFontSize, actualFontSize, unit });
  };
</script>

<form class="w-[38rem] py-8">
  <div class="md:flex md:items-center mb-4">
    <label for="default-font-size" class="block md:w-1/4 font-bold">Default font-size:</label>
    <div class="md:w-3/4">
      <input
        id="default-font-size"
        class="peer rounded mr-2 border-slate-900 invalid:border-red-500"
        type="number"
        min="1"
        required
        bind:value={defaultFontSize}
        on:input={onCustomizationChange}
      />px
      <span class="invisible peer-invalid:visible text-red-500 ml-2">font-size must be &gt; 0</span>
    </div>
  </div>

  <div class="md:flex md:items-center mb-4">
    <label for="actual-font-size" class="block md:w-1/4 font-bold">Actual font-size:</label>
    <div class="md:w-3/4">
      <input
        id="actual-font-size"
        class="peer rounded mr-2 border-slate-900 invalid:border-red-500"
        type="number"
        min="1"
        required
        bind:value={actualFontSize}
        on:input={onCustomizationChange}
      />px
      <span class="invisible peer-invalid:visible text-red-500 ml-2">font-size must be &gt; 0</span>
    </div>
  </div>

  <div class="md:flex md:items-center">
    <div class="md:w-1/4 font-bold">Output unit:</div>
    <div class="md:w-3/4 flex gap-4">
      <label class="cursor-pointer">
        <input
          class="rounded cursor-pointer border-slate-900"
          name="unit"
          type="radio"
          value="rem"
          bind:group={unit}
          on:change={onCustomizationChange}
        />
        rem
      </label>
      <label class="cursor-pointer">
        <input
          class="rounded cursor-pointer border-slate-900"
          name="unit"
          type="radio"
          value="px"
          bind:group={unit}
          on:change={onCustomizationChange}
        />
        px
      </label>
    </div>
  </div>
</form>
