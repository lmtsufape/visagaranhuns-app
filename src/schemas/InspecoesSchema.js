export default class InspecoesSchema{
    static schema = {
        name: 'Inspecoes',
        properties: {
            inspecao_id:  'int',
            empresa_nome: 'string',
            rua: 'string',
            numero: 'string',
            bairro: 'string',
            cep: 'string',
            cnpjcpf: 'string',
            representante_legal: 'string',
            telefone1: 'string',
            telefone2: 'string',
            email: 'string',
            data: 'string',
            status: 'string',
            tipo: 'string',
            descricao: 'string',
        }
    }
}