<template>
    <div>
        <form @submit.prevent="addTodo" class="flex mb-4">
            <input
                v-model="newTodo"
                type="text"
                placeholder="Ajouter une tâche"
                class="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                class="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Ajouter
            </button>
        </form>

        <div ref="sortableList" class="space-y-2">
            <transition-group>
                <li
                    v-for="todo in todos"
                    :key="todo._id"
                    class="flex items-center p-2 bg-gray-50 rounded-md shadow-sm"
                >
                    <Todo
                        :delete-todo="deleteTodo"
                        :update-todo="updateTodo"
                        :todo="todo"
                    />
                </li>
            </transition-group>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Sortable from 'sortablejs'
import Tag from '../tag/Tag.vue'
import TagModal from '../tag/TagModal.vue'
import Todo from './Todo.vue'
import { useStore } from '../store/store'
const store = useStore()
export default {
    name: 'TodoList',
    components: {
        Tag,
        TagModal,
        Todo,
    },
    data() {
        return {
            newTodo: '',
            notification: '',
            notificationClass: '',
            ...store,
        }
    },
    methods: {
        // fetch tags
        async fetchTags() {
            try {
                const response = await axios.get('/api/tags')
                this.setTags(response.data)
            } catch (error) {
                console.error(error)
                this.showNotification(
                    'Erreur lors de la récupération des tags.',
                    'bg-red-100 text-red-700'
                )
            }
        },
        // fetch todos
        async fetchTodos() {
            try {
                const response = await axios.get('/api/todos')
                // this.todos = response.data
                this.setTodos(response.data)
            } catch (error) {
                console.error(error)
                this.showNotification(
                    'Erreur lors de la récupération des tâches.',
                    'bg-red-100 text-red-700'
                )
            }
        },
        async addTodo() {
            if (this.newTodo.trim() === '') return
            try {
                const response = await axios.post('/api/todos', {
                    title: this.newTodo,
                })
                this.addATodo(response.data)
                this.newTodo = ''
                this.showNotification(
                    'Tâche ajoutée avec succès.',
                    'bg-green-100 text-green-700'
                )
            } catch (error) {
                console.error(error)
                this.showNotification(
                    "Erreur lors de l'ajout de la tâche.",
                    'bg-red-100 text-red-700'
                )
            }
        },
        async updateTodo(todo) {
            try {
                await axios.patch(`/api/todos/${todo._id}`, {
                    completed: todo.completed,
                })
                this.showNotification(
                    'Tâche mise à jour.',
                    'bg-green-100 text-green-700'
                )
            } catch (error) {
                console.error(error)
                this.showNotification(
                    'Erreur lors de la mise à jour de la tâche.',
                    'bg-red-100 text-red-700'
                )
            }
        },
        async deleteTodo(id) {
            try {
                await axios.delete(`/api/todos/${id}`)
                this.deleteATodo(id)
                this.showNotification(
                    'Tâche supprimée.',
                    'bg-green-100 text-green-700'
                )
            } catch (error) {
                console.error(error)
                this.showNotification(
                    'Erreur lors de la suppression de la tâche.',
                    'bg-red-100 text-red-700'
                )
            }
        },
        // dnd
        async onDragEnd() {
            try {
                await axios.put('/api/todos/reorder', { todos: this.todos })
                this.showNotification(
                    'Ordre des tâches mis à jour.',
                    'bg-green-100 text-green-700'
                )
            } catch (error) {
                console.error('Error updating order:', error)
                this.showNotification(
                    "Erreur lors de la mise à jour de l'ordre.",
                    'bg-red-100 text-red-700'
                )
            }
        },
        // notifs
        showNotification(message, className) {
            this.notification = message
            this.notificationClass = className
            setTimeout(() => {
                this.notification = ''
            }, 3000)
        },
    },
    mounted() {
        this.fetchTodos()
        this.fetchTags()
        // Initialiser Sortable
        Sortable.create(this.$refs.sortableList, {
            handle: '.handle',
            animation: 150,
            onEnd: this.onDragEnd,
        })
    },
}
</script>

<style scoped>
.handle {
    display: flex;
    align-items: center;
}
</style>
