<script setup lang="ts">
import { fetchWeatherApi } from 'openmeteo';
import { useRoute } from 'vue-router';

const route = useRoute()

const getWeatherData = async () => {
    try {
        const params = {
            "latitude": parseFloat(route.query.lat as string).toFixed(2),
            "longitude": parseFloat(route.query.lng as string).toFixed(2),
            "hourly": "temperature_2m"
        };
        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, params);

        // Helper function to form time ranges
        const range = (start: number, stop: number, step: number) =>
            Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

        // Process first location. Add a for-loop for multiple locations or weather models
        const response = responses[0];

        // Attributes for timezone and location
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const hourly = response.hourly()!;

        // Note: The order of weather variables in the URL query and the indices below need to match!
        const weatherData = {

            hourly: {
                time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                    (t) => new Date((t + utcOffsetSeconds) * 1000)
                ),
                temperature2m: hourly.variables(0)!.valuesArray()!,
            },

        };

        return weatherData;
    } catch (error) {
        console.log("🚀 file: -> file: AsyncCityView.vue:11 -> getWeatherData -> error", error)

    }
}

const weatherData = await getWeatherData()
console.log("🚀 file: -> file: AsyncCityView.vue:32 -> weatherData", weatherData)

</script>

<template>
    <div class="flex flex-col flex-1 items-center">
        <div v-if="route.query.preview" class="text-white p-4 bg-gray-700 w-full text-center">
            <p>You are currently previewing this city, click the "+" icon to start tracking this city</p>
        </div>
    </div>
</template>
