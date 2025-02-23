<script>
import Tag from '../tag/Tag.vue'
import TagModal from '../tag/TagModal.vue'

export default {
    name: 'Todo',
    props: ['todo', 'updateTodo', 'deleteTodo', 'tags'],
    components: {
        Tag,
        TagModal,
    },
    data() {
        return {
            isModalVisible: false,
        }
    },
    methods: {
        // modal
        showModal() {
            this.isModalVisible = true
        },
        closeModal() {
            this.isModalVisible = false
        },
    },
}
</script>

<template>
    <span class="handle cursor-move mr-2">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 8h16M4 16h16"
            />
        </svg>
    </span>
    <!-- check box -->
    <input
        type="checkbox"
        v-model="todo.completed"
        @change="updateTodo(todo)"
        class="form-checkbox h-5 w-5 text-blue-600"
    />
    <!-- todo task -->
    <div class="flex-col">
        <div class="flex items-center">
            <span
                :class="{
                    'line-through text-gray-500': todo.completed,
                    'text-gray-900': !todo.completed,
                }"
                class="ml-2"
            >
                {{ todo.title }}
            </span>
        </div>
        <!-- tags -->
        <div class="flex flex-wrap items-center justify-between">
            <div v-for="tag in todo.tags">
                <Tag :key="tag._id" :name="tag.name" :color="tag.color" />
            </div>
        </div>
    </div>
    <div class="ml-auto min-w-12">
        <!-- tag button -->
        <button
            @click="showModal"
            class="text-gray-500 hover:text-gray-700 focus:outline-none ml-auto"
        >
            <svg
                class="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
            >
                <path
                    d="M7.0498 7.0498H7.0598M10.5118 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V10.5118C3 11.2455 3 11.6124 3.08289 11.9577C3.15638 12.2638 3.27759 12.5564 3.44208 12.8249C3.6276 13.1276 3.88703 13.387 4.40589 13.9059L9.10589 18.6059C10.2939 19.7939 10.888 20.388 11.5729 20.6105C12.1755 20.8063 12.8245 20.8063 13.4271 20.6105C14.112 20.388 14.7061 19.7939 15.8941 18.6059L18.6059 15.8941C19.7939 14.7061 20.388 14.112 20.6105 13.4271C20.8063 12.8245 20.8063 12.1755 20.6105 11.5729C20.388 10.888 19.7939 10.2939 18.6059 9.10589L13.9059 4.40589C13.387 3.88703 13.1276 3.6276 12.8249 3.44208C12.5564 3.27759 12.2638 3.15638 11.9577 3.08289C11.6124 3 11.2455 3 10.5118 3ZM7.5498 7.0498C7.5498 7.32595 7.32595 7.5498 7.0498 7.5498C6.77366 7.5498 6.5498 7.32595 6.5498 7.0498C6.5498 6.77366 6.77366 6.5498 7.0498 6.5498C7.32595 6.5498 7.5498 6.77366 7.5498 7.0498Z"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </button>
        <!-- delete button -->
        <button
            @click="deleteTodo(todo._id)"
            class="text-red-500 hover:text-red-700 focus:outline-none"
        >
            <!-- cross svg -->
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </button>
        <div class="flex w-full justify-center items-center">
            <TagModal
                v-show="isModalVisible"
                @close="closeModal"
                :todo="todo"
                :tags="tags"
            />
        </div>
    </div>
</template>

<style scoped>
.handle {
    display: flex;
    align-items: center;
}
</style>
