import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import OctIcon from 'react-native-vector-icons/Octicons';

const Area = styled.TouchableOpacity`
    background-color: #f7f7f8;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 12px;
    padding: 10px;
    flex-direction: row;
    margin-left: 18px;
    margin-right: 18px;
`;
const InfoArea = styled.View`
    margin: 5px;
    width: 95%;
    justify-content: space-between;
`;
const NomeDoEstabelecimento = styled.Text`
    marginTop: 5px;
    fontWeight: bold;
    fontSize: 18px;
    marginBottom: 5px;
`;
const TipoRequerimento = styled.Text`
    color: #909090;
    font-size: 14px;
`;
const DescricaoCnae = styled.Text`
    color: #909090;
    font-size: 14px;
`;
const DataInspecao = styled.Text`
    text-align: right;
    font-size: 12px;
    margin-left: 8px;
    color: #909090;
`;
const View = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
const DataView = styled.View`
    flex-direction: row;
    align-items: center;
`;

export default ({data}) => {
    const regex = /(<([^>]+)>)/ig;
    let dataInspecao = data.data.split('-');
    let ano = dataInspecao[0];
    let mes = dataInspecao[1];
    let dia = dataInspecao[2];

    const navigation = useNavigation();

    const handleClick = () => {
        navigation.navigate('PerfilDoEstabelecimento',{
            inspecao_id: data.inspecao_id,
            nome: data.empresa_nome,
            tipo: data.tipo,
            descricao: data.descricao,
            bairro:data.bairro,
            cep: data.cep,
            cnpjcpf: data.cnpjcpf,
            numero: data.numero,
            representante_legal: data.representante_legal,
            rua: data.rua,
            email: data.email,
            telefone1: data.telefone1,
            telefone2: data.telefone2,
            listaDocumentos: data.listaDocumentos,
            listaImagens: data.listaImagens,
        });
    }
    return (
        <Area onPress={handleClick}>
            <InfoArea>
                <View>
                    <NomeDoEstabelecimento>{data.empresa_nome.toUpperCase()}</NomeDoEstabelecimento>
                    <DataView>
                        <OctIcon name='alert' size={14} color='#ffd12d' />
                        <DataInspecao>{dia}/{mes}/{ano}</DataInspecao>
                    </DataView> 
                </View>
                <TipoRequerimento>{data.tipo}</TipoRequerimento>
                <DescricaoCnae numberOfLines={1}>{data.descricao.length < 50
                    ? `${data.descricao.replace(regex,'')}` : `${data.descricao.replace(regex,'').substring(0,48)}...`
                }</DescricaoCnae>
            </InfoArea>
        </Area>
    );
}