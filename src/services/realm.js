import Realm from 'realm';
import InspecoesSchema from '../schemas/InspecoesSchema';
import DocumentosSchema from '../schemas/DocumentosSchema';
import ImagensSchema from '../schemas/ImagensSchema';

export default function getRealm() {
    return Realm.open({

        schema: [InspecoesSchema, DocumentosSchema, ImagensSchema],
        schemaVersion: 4
    });
}