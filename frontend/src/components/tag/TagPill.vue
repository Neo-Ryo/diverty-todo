<script setup>
const props = defineProps(['color'])
</script>

<template>
    <span class="w-4 h-4 my-1 mx-2 rounded-full custom"></span>
</template>

<style scoped>
.custom {
    background-color: v-bind('props.color');
}
</style>
