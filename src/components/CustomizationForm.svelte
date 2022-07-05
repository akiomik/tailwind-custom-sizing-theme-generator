<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { isUnit } from '../entities/Unit';
  import type { Customization } from '../entities/Customization';

  const dispatch = createEventDispatcher<{ customize: Customization }>();

  export let defaultCustomization: Customization;
  let { defaultFontSize, actualFontSize, unit } = defaultCustomization;

  $: valid = defaultFontSize > 0 && actualFontSize > 0 && isUnit(unit);
  $: customization = { defaultFontSize, actualFontSize, unit };

  const onCustomizationChange = () => {
    if (!valid) {
      return;
    }

    dispatch('customize', customization);
  };
</script>

<form class="md:w-[38rem] py-8">
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
      <div
        class="hidden peer-invalid:block md:peer-invalid:inline text-red-500 mt-2 md:mt-0 md:ml-2"
      >
        font-size must be &gt; 0
      </div>
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
      <div
        class="hidden peer-invalid:block md:peer-invalid:inline text-red-500 mt-2 md:mt-0 md:ml-2"
      >
        font-size must be &gt; 0
      </div>
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
