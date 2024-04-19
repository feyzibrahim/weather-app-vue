<script setup lang="ts">
import AnimatedPlaceholder from './AnimatedPlaceholder.vue';

</script>

<template>
    <div class="flex py-6 px-3 bg-gray-600 rounded-md shadow-md">
        <div class="flex flex-col flex-1 gap-2">
            <AnimatedPlaceholder class="max-w-[50%]" />
            <AnimatedPlaceholder class="max-w-[40%]" />
        </div>
        <div class="flex gap-2 items-end w-36">
            <AnimatedPlaceholder class="max-w-[50px] w-full" />
            <AnimatedPlaceholder class="max-w-[30px] w-full" />
        </div>
    </div>
</template>
