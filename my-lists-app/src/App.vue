<template>
  <div>
    <div className="navbar bg-base-100 shadow-sm">
      <RouterLink
        v-for="page in pages"
        :to="page.route"
        class="flex items-center gap-2 hover:underline"
        className="btn btn-ghost text-xl"
        ><img :src="page.icon" :alt="page.iconSlt" class="w-8 h-8" />{{
          page.title
        }}</RouterLink
      >
    </div>
    <nav class="p-3 flex gap-4">
      <RouterLink
        v-for="page in pages"
        :to="page.route"
        class="flex items-center gap-2 hover:underline"
        ><img :src="page.icon" :alt="page.iconAlt" class="w-8 h-8" />{{
          page.title
        }}</RouterLink
      >
    </nav>
    <main class="p-4">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";

const pages = ref("");
onMounted(() => {
  fetch("/pages.json")
    .then((response) => response.json())
    .then((json) => (pages.value = json));
});
</script>
