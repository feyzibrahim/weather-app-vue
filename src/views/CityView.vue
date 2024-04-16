<script setup lang="ts">
import AsyncCityView from './AsyncCityView.vue';


</script>

<template>
    <main>
        <Suspense>
            <AsyncCityView />
            <template #fallback>
                <p>Loading...</p>
            </template>
        </Suspense>
    </main>
</template>
