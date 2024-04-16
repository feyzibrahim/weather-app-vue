<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const MAP_BOX_API = "pk.eyJ1IjoiZmFpei1pYnJhaGltIiwiYSI6ImNrZmt4aTRpMDFqZmwyeXMyd25iNGQ2ZHcifQ.wWgSKtfXkj6o3tBKw7FkRQ";

const router = useRouter()
const searchQuery = ref("")
const queryTimeout: any = ref(null);
const mapBoxSearchResult: any = ref(null);
const searchError: any = ref(null);

const getSearchResults = () => {
    clearTimeout(queryTimeout.value)
    queryTimeout.value = setTimeout(async () => {
        if (searchQuery.value !== "") {
            try {
                const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${MAP_BOX_API}&types=place`)
                mapBoxSearchResult.value = result.data.features;
            } catch {
                searchError.value = true
            }
            return;
        }
        mapBoxSearchResult.value = null;
    }, 300)
}

const previewCity = (data: any) => {
    const [city, state] = data.place_name.split(",");
    router.push(`/weather/${state.replaceAll(" ", "")}/${city.replaceAll(" ", "")}?lat=${data.geometry.coordinates[1]}&lng=${data.geometry.coordinates[0]}`)
}

</script>

<template>
    <main class="container">

        <div class="pt-4 mb-8 relative">
            <input type="text" placeholder="Search..."
                class="py-2 px-1 w-full bg-transparent border-b focus:border-gray-600 focus:outline-none"
                v-model="searchQuery" @input="getSearchResults" />
            <ul class="absolute bg-gray-200 w-full shadow-md py-2 px-1 top-[66px]" v-if="mapBoxSearchResult">
                <p v-if="searchError">Sorry, something went wrong, please try again</p>
                <p v-if="mapBoxSearchResult.length === 0">No results match your query, try different term.</p>
                <template v-else>
                    <li v-for="searchResult in mapBoxSearchResult" :key="searchResult.id" class="py-2 cursor-pointer"
                        @click="previewCity(searchResult)">
                        {{ searchResult.place_name }}
                    </li>
                </template>
            </ul>
        </div>

    </main>
</template>
