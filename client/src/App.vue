<script setup lang="ts">
import { RouterView } from 'vue-router';
import HomeNavbar from './components/HomeNavbar.vue';
</script>

<template>

  <div class="flex flex-col min-h-screen bg-gray-500">
    <HomeNavbar />
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>

</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: 600ms ease all;
}

.page-enter-from,
.page-enter-to {
  opacity: 0;
}
</style>