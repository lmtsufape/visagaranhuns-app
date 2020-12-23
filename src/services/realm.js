import Realm from 'realm';
import RepositorySchema from '../schemas/RepositorySchema';
import InspecoesSchema from '../schemas/InspecoesSchema';
import DocumentosSchema from '../schemas/DocumentosSchema';
import ImagensSchema from '../schemas/ImagensSchema';

export default function getRealm() {
    return Realm.open({
        
        schema:[RepositorySchema,InspecoesSchema,DocumentosSchema,ImagensSchema],
    });
}