<script setup>
import { ref } from 'vue'
import axios from 'axios'
import TagPill from './TagPill.vue'
import { useStore } from '../store/store'

const props = defineProps(['todo'])

const store = useStore()

let inputSearch = ref('')
let color = ref('#1c71d8')
let newTag = ref(null)
const isSelected = (tagId) => {
    return props.todo.tags.map((e) => e._id.toString()).includes(tagId)
}

function handleNewTag() {
    newTag.value = { name: '', color }
}

async function createTag() {
    if (newTag.value.name.trim() === '') return
    try {
        const response = await axios.post('/api/tags', {
            name: newTag.value.name,
            color: newTag.value.color,
        })
        store.addNewTag(response.data)
        newTag.value = null
    } catch (error) {
        console.error(error)
    }
}

async function deleteTag(id) {
    try {
        const response = await axios.delete(`/api/tags/${id}`)
        if (response.status === 200) {
            store.deleteATag(id)
        }
    } catch (error) {
        console.error(error)
    }
}

async function assignOrUnassignTagToTodo(todoId, tagId) {
    try {
        const response = await axios.put(`/api/todos/${todoId}/tags/${tagId}`)
        if (response.status === 200) {
            store.updateATodo(response.data)
        }
    } catch (error) {
        console.error(error)
    }
}

function cancelTagCreation() {
    newTag.value = null
}
</script>

<template>
    <div class="modal-backdrop">
        <div class="flex flex-col min-w-80 min-h-80 rounded-md border bg-white">
            <!-- search bar + color selecto + create button -->
            <div class="flex justify-between items-center m-2 p-2">
                <input
                    class="border rounded-md p-0.5"
                    type="text"
                    placeholder="Search"
                    v-model="inputSearch"
                />
                <input
                    type="color"
                    name="color"
                    class="w-4 h-6"
                    :value="color"
                    id=""
                    :onchange="(e) => (color = e.target.value)"
                />

                <button
                    class="flex justify-center items-center text-blue-500 text-2xl"
                    :onclick="handleNewTag"
                >
                    +
                </button>
            </div>

            <li
                v-for="tag in store.tags.value"
                :key="tag._id"
                class="list-none"
            >
                <!-- filter tags with search in v-if -->
                <div
                    class="flex items-center p-2 rounded-md shadow-sm hover:cursor-pointer hover:bg-slate-200 group"
                    v-if="
                        inputSearch === '' ||
                        tag.name
                            .toLowerCase()
                            .includes(inputSearch.toLowerCase())
                    "
                    @click="assignOrUnassignTagToTodo(props.todo._id, tag._id)"
                >
                    <TagPill :color="tag.color" />
                    {{ tag.name }}
                    <div
                        v-if="isSelected(tag._id.toString())"
                        class="h-6 w-6 mx-2 text-blue-500"
                    >
                        <!-- check mark -->
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect width="24" height="24" />
                            <path
                                d="M5 13.3636L8.03559 16.3204C8.42388 16.6986 9.04279 16.6986 9.43108 16.3204L19 7"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                            />
                        </svg>
                    </div>
                    <!-- delete a tag -->
                    <div
                        class="hidden group-hover:flex group-hover:justify-center group-hover:items-center w-4 h-4 ml-auto text-red-500 hover:text-red-700"
                        @click="deleteTag(tag._id.toString())"
                    >
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
                    </div>
                </div>
            </li>
            <!-- tag creation part -->
            <div
                class="flex items-center p-2 rounded-md shadow-sm"
                v-if="newTag"
            >
                <TagPill :color="newTag.color" />
                <input
                    class="appearance-none"
                    type="text"
                    v-model="newTag.name"
                />
                <!-- create tag -->
                <button
                    class="h-6 w-6 mx-2 text-green-500"
                    type="button"
                    @click="createTag()"
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
                            stroke-width="2"
                        />
                    </svg>
                </button>
                <!-- cancel -->
                <button class="text-red-500" @click="cancelTagCreation()">
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
            </div>
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
