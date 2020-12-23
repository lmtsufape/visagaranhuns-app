export default class DocumentosSchema{
    static schema = {
        name: 'Documentos',
        properties: {
            inspecao_id:  'int',
            nome: 'string',
            caminho: 'string',
            data_emissao: 'string',
            data_validade: 'string',
        }
    }
}