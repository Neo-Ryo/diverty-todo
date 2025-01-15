import { ref } from 'vue'

const tags = ref([])
const todos = ref([])

export function useStore() {
    function updateATodo(t) {
        todos.value = todos.value.reduce((acc, curr) => {
            if (curr._id.toString() === t._id.toString()) {
                acc.push(t)
            } else {
                acc.push(curr)
            }
            return acc
        }, [])
    }
    function deleteATodo(id) {
        todos.value = todos.value.filter((td) => td._id.toString() !== id)
    }
    function setTodos(t) {
        todos.value = t
    }
    function addATodo(t) {
        todos.value.push(t)
    }
    function setTags(t) {
        tags.value = t
    }
    function addNewTag(t) {
        tags.value.push(t)
    }
    function deleteATag(id) {
        tags.value = tags.value.filter((t) => t._id.toString() !== id)
    }
    return {
        tags,
        todos,
        setTags,
        addNewTag,
        deleteATag,
        setTodos,
        addATodo,
        deleteATodo,
        updateATodo,
    }
}
