<script lang="ts">
  import '../app.css';
</script>

<main
  class="z-10 rounded-lg bg-white p-8 text-slate-900 shadow-lg md:container md:mx-auto md:max-w-screen-lg"
>
  <slot />

  <div class="mt-4">
    &copy; 2022 AKiomi Kamakura
    <span class="mx-2 cursor-default select-none text-slate-200">⚫︎</span>
    <a href="https://github.com/akiomik/tailwind-custom-sizing-theme-generator">Source</a>
  </div>
</main>
