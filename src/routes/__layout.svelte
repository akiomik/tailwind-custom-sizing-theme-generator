<script lang="ts">
  import '../app.css';
</script>

<main
  class="rounded-lg shadow-lg z-10 bg-white md:container md:mx-auto md:max-w-screen-lg p-8 text-slate-900"
>
  <slot />

  <div class="mt-4">
    &copy; 2022 AKiomi Kamakura
    <span class="mx-2 text-slate-200 select-none cursor-default">⚫︎</span>
    <a href="https://github.com/akiomik/tailwind-custom-sizing-theme-generator">Source</a>
  </div>
</main>
