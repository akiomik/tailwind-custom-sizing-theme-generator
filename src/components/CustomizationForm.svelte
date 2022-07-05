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

<form class="py-8 md:w-[38rem]">
  <div class="mb-4 md:flex md:items-center">
    <label for="default-font-size" class="block font-bold md:w-1/4">Default font-size:</label>
    <div class="md:w-3/4">
      <input
        id="default-font-size"
        class="peer mr-2 rounded border-slate-900 invalid:border-red-500"
        type="number"
        min="1"
        required
        bind:value={defaultFontSize}
        on:input={onCustomizationChange}
      />px
      <div
        class="mt-2 hidden text-red-500 peer-invalid:block md:mt-0 md:ml-2 md:peer-invalid:inline"
      >
        font-size must be &gt; 0
      </div>
    </div>
  </div>

  <div class="mb-4 md:flex md:items-center">
    <label for="actual-font-size" class="block font-bold md:w-1/4">Actual font-size:</label>
    <div class="md:w-3/4">
      <input
        id="actual-font-size"
        class="peer mr-2 rounded border-slate-900 invalid:border-red-500"
        type="number"
        min="1"
        required
        bind:value={actualFontSize}
        on:input={onCustomizationChange}
      />px
      <div
        class="mt-2 hidden text-red-500 peer-invalid:block md:mt-0 md:ml-2 md:peer-invalid:inline"
      >
        font-size must be &gt; 0
      </div>
    </div>
  </div>

  <div class="md:flex md:items-center">
    <div class="font-bold md:w-1/4">Output unit:</div>
    <div class="flex gap-4 md:w-3/4">
      <label class="cursor-pointer">
        <input
          class="cursor-pointer rounded border-slate-900"
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
          class="cursor-pointer rounded border-slate-900"
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
