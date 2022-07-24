<script setup lang="ts">
import { PropType } from "vue";
// const props = defineProps(["person"]);

interface People {
    day: string;
    hour: String;
    name: string;
    present: string;
    ress: string;
    plusone: string;
    message: string;
}
defineProps({
    people: { type: Object as PropType<People>, required: true },
});
</script>

<template>
    <div class="bg-background2 my-2 flex-col py-4 px-8">
        <div class="flex-col">
            <div class="flex items-center justify-between">
                <div class="text-white text-3xl my-2">
                    {{ people.name }}
                </div>
                <div class="flex">
                    <div v-if="people.ress == 'Bof'" class="text-3xl">👎</div>
                    <div v-else class="text-3xl">👍</div>
                    <div v-if="people.present == 'Oui'" class="text-3xl">✔️</div>
                    <div v-else class="text-3xl">❌</div>
                </div>
            </div>

            <div class="text-purple">
                {{ people.day }}
            </div>
            <div class="text-purple">
                {{ people.hour }}
            </div>
            <div class="text-white my-2">{{ people.plusone }}</div>
            <div class="text-white">
                {{ people.message }}
            </div>
        </div>
    </div>
</template>
