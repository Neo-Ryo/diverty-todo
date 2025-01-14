<script setup>
const props = defineProps(['name', 'color'])
</script>

<template>
    <div
        class="flex rounded-full p-2 m-0.5 text-sm h-5 justify-center items-center bg-opacity-30 custom"
    >
        {{ props.name }}
    </div>
</template>

<style scoped>
.custom {
    background-color: v-bind('props.color');
}
</style>
