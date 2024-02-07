

export default {
    buscarEspecies() {
        return [
            { value: 'FELINE', description: 'Felino' },
            { value: 'CANINE', description: 'Canino' }
        ]
    },
    buscarGeneros() {
        return [
            { value: 'MALE', description: 'Masculino' },
            { value: 'FEMALE', description: 'Feminino' }
        ]
    },
    buscarStatus() {
        return [
            { value: 'ATTENDED', description: 'Atendido' },
            { value: 'PENDING', description: 'Pendente' }
        ]
    }
} 