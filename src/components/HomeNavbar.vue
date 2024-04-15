<script setup lang="ts">
import { RouterLink } from 'vue-router';
import BaseModal from './BaseModal.vue';
import { ref } from "vue"

const modalActive: any = ref(null)

const toggleModal = () => {
    modalActive.value = !modalActive.value;
}

</script>

<template>
    <header class="sticky top-0 bg-gray-400 shadow-lg">
        <nav class="container flex flex-col md:flex-row items-center gap-5 text-white py-6">
            <RouterLink to="/">
                <div class="flex flex-1 items-center gap-2">
                    <v-icon name="bi-cloud-sun" scale="2" />
                    <h1 class=" text-2xl">Weather App</h1>
                </div>
            </RouterLink>
            <div class="flex items-center gap-1 flex-1 justify-end">
                <i class="hover:opacity-60 cursor-pointer ">
                    <v-icon name="bi-info-circle-fill" @click="toggleModal" />
                </i>
                <i class="hover:opacity-60 cursor-pointer ">
                    <v-icon name="bi-plus" scale="2" />
                </i>
            </div>
            <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
                <div class="text-black">
                    <h1 class="text-2xl mb-1">About:</h1>
                    <p class="mb-4">
                        The Local Weather allows you to track the current and
                        future weather of cities of your choosing.
                    </p>
                    <h2 class="text-2xl">How it works:</h2>
                    <ol class="list-decimal list-inside mb-4">
                        <li>
                            Search for your city by entering the name into the
                            search bar.
                        </li>
                        <li>
                            Select a city within the results, this will take
                            you to the current weather for your selection.
                        </li>
                        <li>
                            Track the city by clicking on the "+" icon in the
                            top right. This will save the city to view at a
                            later time on the home page.
                        </li>
                    </ol>

                    <h2 class="text-2xl">Removing a city</h2>
                    <p>
                        If you no longer wish to track a city, simply select
                        the city within the home page. At the bottom of the
                        page, there will be am option to delete the city.
                    </p>
                </div>
            </BaseModal>
        </nav>
    </header>
</template>
