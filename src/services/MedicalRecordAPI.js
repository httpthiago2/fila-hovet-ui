import { useCrudApi } from 'src/services/crudService';

const RESOURCE = 'medical-record'
export const useMedicalRecordApi = () => {

    const crudApi = useCrudApi(RESOURCE)

    return {
        ...crudApi
    }

}
