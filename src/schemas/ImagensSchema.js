export default class ImagensSchema{
    static schema = {
        name: 'Imagens',
        properties: {
            inspecao_id:  'int',
            path: 'string',
            status: 'string',
            comentario: 'string',
        }
    }
}