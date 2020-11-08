import React, {useState} from 'react';
import { Text } from 'react-native';
import { Container, InfoAreaEstabelecimentoText, InfoAreaInspecaoText, InfoCardText, InfoAreaEstabelecimento, InfoAreaInspecao, CustomButtonDocumentacao, CustomButtonText, CustomButtonInspecao } from './styles';
import {useRoute} from '@react-navigation/native';

import LocalizarIcon from '../../assets/logo_localizar'
import PapelIcon from '../../assets/logo_papel'

export default () => {
    const route = useRoute();
    const [useInfo] = useState({
        inspecao_id: route.params.inspecao_id,
        nome: route.params.nome,
        tipo: route.params.tipo,
        descricao: route.params.descricao,
        telefone1: route.params.telefone1,
        telefone2: route.params.telefone2,
        email: route.params.email,
        //endereco
        bairro: route.params.bairro,
        cep: route.params.cep,
        cnpjcpf: route.params.cnpjcpf,
        numero: route.params.numero,
        representante_legal: route.params.representante_legal,
        rua: route.params.rua,

    });
    const handleDocumentacaoClick = async () =>{
       navigation.navigate("Documentacao")
    }
    const handleInspecionarClick = async () =>{
        navigation.navigate("Inspecao")
     }

    return (
        <Container>
            <InfoAreaEstabelecimento>
                <InfoAreaEstabelecimentoText>ESTABELECIMENTO</InfoAreaEstabelecimentoText>
                <InfoCardText>CNPJ/CPF: {useInfo.cnpjcpf}</InfoCardText>
                <InfoCardText>Representante Legal: {useInfo.representante_legal}</InfoCardText>
                <InfoCardText>E-mail: {useInfo.email}</InfoCardText>
                <InfoCardText>Telefone 1: {useInfo.telefone1}</InfoCardText>
                {useInfo.telefone2 
                    ? <InfoCardText>Telefone 2: {useInfo.telefone2}</InfoCardText>  
                    : <InfoCardText></InfoCardText> 
                }
                <InfoAreaEstabelecimentoText>ENDEREÇO</InfoAreaEstabelecimentoText>
                <InfoCardText>Bairro: {useInfo.bairro}</InfoCardText>
                <InfoCardText>Rua: {useInfo.rua} - Nº: {useInfo.numero}</InfoCardText>
                <InfoCardText>CEP: {useInfo.cep}</InfoCardText>
            </InfoAreaEstabelecimento>
            <InfoAreaInspecao>
                <InfoAreaInspecaoText>INSPEÇÃO</InfoAreaInspecaoText>
                <InfoCardText>Tipo: {useInfo.tipo}</InfoCardText>
                <InfoCardText>CNAE: {useInfo.descricao}</InfoCardText>
                <CustomButtonDocumentacao onPress={handleDocumentacaoClick}>
                    <CustomButtonText>Documentação</CustomButtonText>
                    <PapelIcon width="50" />
                </CustomButtonDocumentacao>
                <CustomButtonInspecao onPress={handleInspecionarClick}>
                    <CustomButtonText>Inspecionar</CustomButtonText>
                    <LocalizarIcon width="50" />
                </CustomButtonInspecao>
            </InfoAreaInspecao>
        </Container>
    );
}