export default class ImagensSchema {
    static schema = {
        name: 'Imagens',
        properties: {
            inspecao_id: 'int',
            path: 'string',
            nome: 'string',
            status: 'string',
            comentario: { type: 'string', default: "" },
            orientation: { type: 'int', default: 6 },
        }
    }
}