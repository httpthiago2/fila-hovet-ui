import { api } from 'src/services/api'

export const useReadOnlyApi = (resource) => {

    function findAll() {
        return api.get(`/${resource}`)
    }
    function findById(id) {
        return api.get(`/${resource}/${id}`)
    }


    return {
        findAll,
        findById
    }
}
export const useCrudApi = (resource) => {
    const readOnlyApi = useReadOnlyApi(resource)
    function create(data) {
        return api.post(`/${resource}`, data)
    }

    function update(id, data) {
        return api.put(`/${resource}/${id}`, data)
    }

    function remove(id) {
        return api.delete(`/${resource}/${id}`)
    }

    return {
        ...readOnlyApi,
        create,
        update,
        remove
    }

}

