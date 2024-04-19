<script setup lang="ts">
import CityViewSkelton from '@/components/CityViewSkelton.vue';
import AsyncCityView from './AsyncCityView.vue';

</script>

<template>
    <main>
        <Suspense>
            <AsyncCityView />
            <template #fallback>
                <CityViewSkelton />
            </template>
        </Suspense>
    </main>
</template>
