<div class="md:container md:mx-auto md:max-w-screen-md p-8 text-slate-900">
  <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">
    Tailwind CSS<br />
    theme generator<br />
    for customizing<br />
    spacing/sizing scale
  </h1>

  <form class="w-96 py-8">
    <div class="md:flex md:items-center mb-4">
      <label for="base-font-size" class="block md:w-1/3 font-bold">Base font-size:</label>
      <div class="md:w-2/3">
        <input id="base-font-size" class="rounded mr-2 border-slate-900" type="text" value="16" />px
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
            checked
          />
          rem
        </label>
        <label class="cursor-pointer">
          <input
            class="rounded cursor-pointer border-slate-900"
            name="unit"
            type="radio"
            value="px"
          />
          px
        </label>
      </div>
    </div>
  </form>

  <pre>
    <code class="rounded-lg text-neutral-200 bg-slate-800 flex items-center p-8">
&#123;
  ...
&#125;
    </code>
  </pre>
</div>
