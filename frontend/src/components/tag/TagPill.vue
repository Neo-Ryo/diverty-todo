<script setup>
const props = defineProps(['color'])
</script>

<template>
    <span class="w-2 h-2 m-2 rounded-full custom"></span>
</template>

<style scoped>
.custom {
    background-color: v-bind('props.color');
}
</style>
