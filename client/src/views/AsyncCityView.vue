<script setup lang="ts">
import { useRoute } from 'vue-router';
import axios from "axios";

const route = useRoute()

const getWeatherData = async () => {
    try {
        const lat = route.query.lat as string
        const lon = route.query.lng as string
        const weatherData = await axios.get(`http://localhost:4000/api/weather/lat-lon?latitude=${lat}&longitude=${lon}`)

        return weatherData.data;
    } catch (error) {
        console.log("🚀 file: -> file: AsyncCityView.vue:11 -> getWeatherData -> error", error);
        throw error;
    }
}


const weatherData: any = await getWeatherData()

</script>

<template>
    <div class="flex flex-col flex-1 items-center">
        <!-- Banner -->
        <div v-if="route.query.preview" class="text-white p-4 bg-gray-700 w-full text-center">
            <p>You are currently previewing this city, click the "+" icon to start tracking this city</p>
        </div>
        <!-- Overview -->
        <div class="flex flex-col items-center text-white py-12">
            <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
            <p class="text-sm mb-4">
                {{
                    new Date(weatherData.current.timestamp).toLocaleDateString("en-us", {
                        weekday: "short", day: "2-digit",
                        month: "long"
                    })
                }}
                {{
                    new Date(weatherData.current.timestamp).toLocaleTimeString("en-us", {
                        timeStyle: "short"
                    })
                }}
            </p>
            <p class="text-8xl mb-4">{{
                Math.round(weatherData.current.temperature)
                }} &deg;
            </p>
            <p>
                Feels like {{ weatherData.current.feels_like }} &deg;
            </p>
            <p>
                {{ weatherData.current.description }}
            </p>
            <img :src="`${weatherData.current.sky_icon}`" alt="icon">
        </div>
        <hr class="border-white border-opacity-10 border w-full">
        <!-- Hourly Weather -->
        <div class="max-w-screen-md w-full py-12">
            <div class="mx-8 text-white">
                <h2 class="mb-4">Hourly Weather</h2>
                <div class="flex gap-10 overflow-x-scroll ">
                    <div v-for="hourData in weatherData.hourly" :key="hourData._id"
                        class="flex flex-col gap-4 items-center">
                        <p class="whitespace-nowrap text-sm">
                            {{
                                new Date(hourData.timestamp).toLocaleTimeString("en-us", {
                                    hour: "numeric"
                                })
                            }}
                        </p>
                        <img :src="`${hourData.sky_icon}`" alt="icon" class="w-7">
                        <p>
                            {{ Math.round(hourData.temperature) }} &deg;
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!-- Weekly Weather -->
        <div class="max-w-screen-md w-full py-12">

            <div class="mx-8 text-white">
                <h2>
                    7 day forecast
                </h2>
                <div v-for="day in weatherData.daily" :key="day._id" class="flex items-center">
                    <p class="flex-1">{{
                        new Date(day.timestamp).toLocaleDateString("en-us", {
                            weekday: "long"
                        })
                    }}</p>
                    <img :src="`${day.sky_icon}`" alt="icon" class="h-8">
                </div>
            </div>

        </div>
    </div>
</template>
