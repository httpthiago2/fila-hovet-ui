import { useCrudApi } from 'src/services/crudService'
import { api } from "src/services/api";

const RESOURCE = 'room'
export const useRoomApi = () => {

    const crudApi = useCrudApi(RESOURCE)

    return {
        ...crudApi
    }

}
