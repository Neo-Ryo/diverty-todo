<script setup>
const props = defineProps(['name', 'color'])
const customClass = `flex rounded-full p-2 m-0.5 text-sm h-5 justify-center items-center bg-opacity-30 bg-${props.color}-500 text-${props.color}-500`
</script>

<template>
    <div :class="customClass">
        {{ props.name }}
    </div>
</template>

<style scoped></style>
