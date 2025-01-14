import { reactive, ref } from 'vue'

const tags = ref([])

export function useStore() {
    function setTags(t) {
        tags.value = t
    }
    return { tags, setTags }
}
