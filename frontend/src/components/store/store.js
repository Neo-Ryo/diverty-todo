import { reactive, ref } from 'vue'

const tags = ref([])

export function useStore() {
    function setTags(t) {
        tags.value = t
    }
    function addNewTag(t) {
        tags.value.push(t)
    }
    return { tags, setTags, addNewTag }
}
