import { useCrudApi } from 'src/services/crudService'
import { api } from "src/services/api";

const RESOURCE = 'queue'
export const useQueueApi = () => {

    const crudApi = useCrudApi(RESOURCE)

    function openQueue(id) {
        return api.put(`/${RESOURCE}/open-queue/${id}`)
    }

    function closeQueue(id) {
        return api.put(`/${RESOURCE}/close-queue/${id}`)
    }

    return {
        ...crudApi,
        openQueue,
        closeQueue
    }

}
