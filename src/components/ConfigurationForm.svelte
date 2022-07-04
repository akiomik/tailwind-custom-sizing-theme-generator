<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let defaultFontSize;
  export let actualFontSize;
  export let unit;

  const onCustomizationChange = () => {
    dispatch('customization-change', { defaultFontSize, actualFontSize, unit });
  };
</script>

<form class="w-[28rem] py-8">
  <div class="md:flex md:items-center mb-4">
    <label for="default-font-size" class="block md:w-1/3 font-bold">Default font-size:</label>
    <div class="md:w-2/3">
      <input
        id="default-font-size"
        class="rounded mr-2 border-slate-900 invalid:border-red-500"
        type="number"
        min="1"
        required
        bind:value={defaultFontSize}
        on:input={onCustomizationChange}
      />px
    </div>
  </div>

  <div class="md:flex md:items-center mb-4">
    <label for="actual-font-size" class="block md:w-1/3 font-bold">Actual font-size:</label>
    <div class="md:w-2/3">
      <input
        id="actual-font-size"
        class="rounded mr-2 border-slate-900 invalid:border-red-500"
        type="number"
        min="1"
        required
        bind:value={actualFontSize}
        on:input={onCustomizationChange}
      />px
    </div>
  </div>

  <div class="md:flex md:items-center">
    <div class="md:w-1/3 font-bold">Output unit:</div>
    <div class="md:w-2/3 flex gap-4">
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
