<script>
export default {
    name: 'Modal',
    props: ['tags'],
    methods: {
        close() {
            this.$emit('close')
        },
    },
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
                v-for="tag in tags"
                :key="tag._id"
                class="flex items-center p-2 bg-gray-50 rounded-md shadow-sm"
            >
                {{ tag }}
            </li>
            <button type="button" class="self-end m-2" @click="close">x</button>
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
