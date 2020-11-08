import React from 'react';
import styled from 'styled-components/native';

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
    font-size:17px;
    font-weight:bold;
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
    return (
        <Area>
            <InfoArea>
                <NomeDoEstabelecimento>{data.empresa_nome}</NomeDoEstabelecimento>
                <TipoRequerimento>{data.tipo}</TipoRequerimento>
                <DescricaoCnae numberOfLines={1}>{data.descricao.length < 50
                    ? `${data.descricao}` : `${data.descricao.substring(0,48)}...`
                }</DescricaoCnae>
                <DataInspecao>{dia}/{mes}/{ano}</DataInspecao>
            </InfoArea>
        </Area>
    );
}