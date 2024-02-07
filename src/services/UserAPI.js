import { useCrudApi } from 'src/services/crudService'
import { api } from "src/services/api";

const RESOURCE = 'user'
export const useUserApi = () => {

    const crudApi = useCrudApi(RESOURCE)

    return {
        ...crudApi
    }

}
