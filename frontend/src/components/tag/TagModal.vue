<script setup>
const props = defineProps(['tags', 'todo'])
const isSelected = (tagId) => {
    return props.todo.tags.map((e) => e._id.toString()).includes(tagId)
}

function pillColor(color) {
    return `bg-${color}-500 w-2 h-2 rounded-full`
}
</script>

<template>
    <div class="modal-backdrop">
        <div class="flex flex-col min-w-80 min-h-80 rounded-md border bg-white">
            <!-- search bar + color selecto + create button -->
            <div class="flex justify-between items-center m-2 p-2">
                <input class="border" type="text" />
                <div class="w-4 h-4 bg-blue-500"></div>
                <button>+</button>
            </div>

            <li
                v-for="tag in props.tags"
                :key="tag._id"
                class="flex items-center p-2 bg-gray-50 rounded-md shadow-sm"
            >
                <span :class="pillColor(tag.color)" class="m-2"></span>
                {{ tag.name }}
                <div
                    v-if="isSelected(tag._id.toString())"
                    class="h-6 w-6 mx-2 text-blue-500"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect width="24" height="24" fill="white" />
                        <path
                            d="M5 13.3636L8.03559 16.3204C8.42388 16.6986 9.04279 16.6986 9.43108 16.3204L19 7"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>
            </li>
            <button type="button" class="self-end m-2" @click="$emit('close')">
                x
            </button>
        </div>
    </div>
</template>

<style>
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
