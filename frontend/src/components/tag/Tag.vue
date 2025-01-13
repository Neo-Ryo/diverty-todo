<script setup>
const props = defineProps(['name', 'color'])
const rgb = `10,100,10`
</script>

<template>
    <div
        class="custom flex rounded-full p-2 m-0.5 text-sm h-5 justify-center items-center bg-opacity-30"
    >
        {{ props.name }}
    </div>
</template>

<style scoped>
.custom {
    color: v-bind('props.color');
    background-color: #afff5f49;
}
</style>
