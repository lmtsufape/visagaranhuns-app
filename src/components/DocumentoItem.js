import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import Api from '../Api';

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
    let dataEmissao = data.data_emissao.split('-');
    let ano_dataEmissoa = dataEmissao[0];
    let mes_dataEmissoa = dataEmissao[1];
    let dia_dataEmissoa = dataEmissao[2];

    let ano_dataValidade = '';
    let mes_dataValidade = '';
    let dia_dataValidade = '';

    if( data.data_validade != null){
        let dataValidade = data.data_validade.split('-');
        ano_dataValidade = dataValidade[0];
        mes_dataValidade = dataValidade[1];
        dia_dataValidade = dataValidade[2];
    }
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
    const handleClickPDF = async () => {
        Api.getDoc(data.caminho);
        //console.log(data.caminho);
       
    }

    return (
        <Area onPress={handleClickPDF}>
            <InfoArea>
                <NomeDoEstabelecimento>{data.nome}</NomeDoEstabelecimento>
                {data.data_validade 
                    ? <TipoRequerimento>{dia_dataEmissoa}/{mes_dataEmissoa}/{ano_dataEmissoa} - {dia_dataValidade}/{mes_dataValidade}/{ano_dataValidade}</TipoRequerimento>
                    : <TipoRequerimento>{dia_dataEmissoa}/{mes_dataEmissoa}/{ano_dataEmissoa}</TipoRequerimento>
                }
            </InfoArea>
        </Area>
    );
}