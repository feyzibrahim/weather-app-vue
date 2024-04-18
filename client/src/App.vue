<script setup lang="ts">
import { RouterView } from 'vue-router';
import HomeNavbar from './components/HomeNavbar.vue';
</script>

<template>

  <div class="flex flex-col min-h-screen bg-gray-500">
    <HomeNavbar />
    <RouterView />
  </div>

</template>
