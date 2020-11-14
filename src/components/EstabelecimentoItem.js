import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

const Area = styled.TouchableOpacity`
    background-color:#fff;
    margin-bottom:20px;
    border-radius:12px;
    padding:15px;
    flex-direction:row;
    margin-left:18px;
    margin-right:18px;
    shadowOpacity: 0.27;
    elevation: 6;
`;
const InfoArea = styled.View`
    margin-left:15px;
    width:90%;
    justify-content:space-between;
`;
const NomeDoEstabelecimento = styled.Text`
    marginTop:10px;
    fontWeight:bold;
    fontSize:18px;
    marginBottom:5px;
`;
const TipoRequerimento = styled.Text`
    font-size:14px;
`;
const DescricaoCnae = styled.Text`
    font-size:14px;
`;
const DataInspecao = styled.Text`
    text-align:right;
    font-size:14px;
    color:#909090;
`;
const EnderecoDoEstabelecimento = styled.Text`
    font-size:14px;
`;
const SeeProfileButton = styled.View`
    width:85px;
    height:26px;
    border: 1px solid #4eadbe;
    border-radius:10px;
    justify-content:center;
    align-items:center;
`;
const SeeProfileButtonText = styled.Text`
    font-size:13px;
    color:#268596;
`;

export default ({data}) => {
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
        });
    }

    return (
        <Area onPress={handleClick}>
            <InfoArea>
                <NomeDoEstabelecimento>{data.empresa_nome.toUpperCase()}</NomeDoEstabelecimento>
                <TipoRequerimento>{data.tipo}</TipoRequerimento>
                <DescricaoCnae numberOfLines={1}>{data.descricao.length < 50
                    ? `${data.descricao}` : `${data.descricao.substring(0,48)}...`
                }</DescricaoCnae>
                <DataInspecao>{dia}/{mes}/{ano}</DataInspecao>
            </InfoArea>
        </Area>
    );
}