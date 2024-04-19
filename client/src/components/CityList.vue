<script setup lang="ts">
import axios from "axios";
import { ref } from "vue"
import { URL } from "@/constant/link"
import CityCard from "./CityCard.vue";
import { useRouter } from "vue-router";

const savedCities: any = ref([])

const getCities = async () => {
    if (localStorage.getItem("savedCities")) {
        savedCities.value = JSON.parse(localStorage.getItem("savedCities") as string)
    }

    const requests: any = [];

    savedCities.value.map((city: any) => {
        requests.push(
            axios.get(`${URL}/api/weather/lat-lon?latitude=${city.coords.lat}&longitude=${city.coords.lng}`)
        )
    })

    const weatherData = await Promise.all(requests);
    weatherData.forEach((value, index) => {
        console.log("🚀 file: -> file: CityList.vue:24 -> weatherData.forEach -> value", value)
        savedCities.value[index].weather = value.data.current;
    })

}

await getCities();

const router = useRouter()
const goToCityView = (city: any) => {
    router.push(`/weather/${city.state.replaceAll(" ", "")}/${city.city.replaceAll(" ", "")}?lat=${city.coords.lat}&lng=${city.coords.lng}&id=${city.id}`)
}
</script>

<template>
    <div v-for="city in savedCities" :key="city.id">
        <CityCard :city="city" @click="goToCityView(city)" />
    </div>
    <p v-if="savedCities.length === 0">
        No cities have been added yet.
    </p>
</template>
