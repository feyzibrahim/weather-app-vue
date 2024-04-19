<script setup lang="ts">
defineProps({
    city: {
        type: Object,
        default: () => { }
    }
})
</script>

<template>
    <div class="flex py-6 px-3 bg-gray-600 rounded-md shadow-md cursor-pointer">
        <div class="flex flex-col flex-1">
            <h2 class="text-3xl">{{ city.city }}</h2>
            <h3>{{ city.state }}</h3>
        </div>
        <div class="flex gap-2 items-center">
            <span class="text-3xl">{{ city.weather.temperature }}&deg;</span>
            <img :src="`${city.weather.sky_icon}`" alt="icon" class="w-7 h-7">
        </div>
    </div>
</template>
