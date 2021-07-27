import React, { useState } from 'react';
import { View } from 'react-native';
import { Container, InfoArea, Div, Title, Text, DataView, TitleView, ButtonsView, CustomButtonText, CustomButton } from './styles';
import { useRoute, useNavigation } from '@react-navigation/native';
import OctIcon from 'react-native-vector-icons/Octicons';
import IonIcon from 'react-native-vector-icons/Ionicons';

export default () => {
    const regex = /(<([^>]+)>)/ig;
    const route = useRoute();
    const navigation = useNavigation();
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
    const handleDocumentacaoClick = async () => {
        navigation.navigate("Documentacao", {
            inspecao_id: route.params.inspecao_id,
        })
    }
    const handleInspecionarClick = async () => {
        navigation.navigate("Inspecionar", {
            inspecao_id: route.params.inspecao_id,
        })
    }

    return (
        <Container>
            {useInfo.cnpjcpf != ""
                ? <View>
                    <InfoArea>
                        <Title>{useInfo.nome.toUpperCase()}</Title>
                        <DataView>
                            <Text color='#909090'>CNPJ/CPF: </Text>
                            <Text color='#000'>{useInfo.cnpjcpf}</Text>
                        </DataView>
                        <DataView>
                            <Text color='#909090'>Representante Legal: </Text>
                            <Text color='#000'>{useInfo.representante_legal}</Text>
                        </DataView>
                        <Div />
                        <Title>Endereço e Contato</Title>
                        <DataView>
                            <Text color='#909090'>Bairro: </Text>
                            <Text color='#000'>{useInfo.bairro}</Text>
                        </DataView>
                        <DataView>
                            <Text color='#909090'>Rua: </Text>
                            <Text color='#000'>{useInfo.rua} - Nº: {useInfo.numero}</Text>
                        </DataView>
                        <DataView>
                            <Text color='#909090'>CEP: </Text>
                            <Text color='#000'>{useInfo.cep}</Text>
                        </DataView>
                        <DataView>
                            <Text color='#909090'>Email: </Text>
                            <Text color='#000'>{useInfo.email}</Text>
                        </DataView>
                        <DataView>
                            <Text color='#909090'>Telefone 1: </Text>
                            <Text color='#000'>{useInfo.telefone1}</Text>
                        </DataView>
                        {useInfo.telefone2 != "null"
                            ? <DataView>
                                <Text color='#909090'>Telefone 2: </Text>
                                <Text color='#000'>{useInfo.telefone2}</Text>
                            </DataView>
                            : <Text></Text>
                        }
                        <Div />
                        <TitleView>
                            <Title>Inspeção</Title>
                            <DataView>
                                <OctIcon name='alert' size={14} color='#ffd12d' />
                                <Text color='#909090'>25/05/2021</Text >
                            </DataView>
                        </TitleView>
                        <DataView>
                            <Text color='#909090'>Tipo: </Text>
                            <Text color='#000'>{useInfo.tipo}</Text>
                        </DataView>
                        {useInfo.tipo != "Denuncia"
                            ? <DataView>
                                <Text color='#909090'>CNAE: </Text>
                                <Text color='#000'>{useInfo.descricao}</Text>
                            </DataView>
                            : <DataView>
                                <Text color='#909090'>Motivo: </Text>
                                <Text color='#000'>{useInfo.descricao.replace(regex, '')}</Text>
                            </DataView>
                        }
                        <Div />
                        <ButtonsView>
                            {useInfo.tipo != "Denuncia"
                                ? <CustomButton color='#d6eeff' onPress={handleDocumentacaoClick}>
                                    <IonIcon name='document-sharp' size={35} color='#039aff' />
                                    <CustomButtonText color='#039aff'>Documentos</CustomButtonText>
                                </CustomButton>
                                : <View></View>
                            }
                            <CustomButton color='#d7ffd6' onPress={handleInspecionarClick}>
                                <IonIcon name='camera' size={35} color='#4ecc22' />
                                <CustomButtonText color='#4ecc22'>Fotografar</CustomButtonText>
                            </CustomButton>
                        </ButtonsView>
                    </InfoArea>
                </View>
                : <View>
                    <InfoArea>
                        <Title>{useInfo.nome.toUpperCase()}</Title>
                        <Div />
                        <Title>Endereço</Title>
                        <DataView>
                            <Text color='#909090'>Rua: </Text>
                            <Text color='#000'>{useInfo.rua} - Nº: {useInfo.numero}</Text>
                        </DataView>
                        <Div />
                        <Title>Inspeção</Title>
                        <DataView>
                            <Text color='#909090'>Tipo: </Text>
                            <Text color='#000'>Denúncia</Text>
                        </DataView>
                        <DataView>
                            <Text color='#909090'>Motivo: </Text>
                            <Text color='#000'>{useInfo.descricao.replace(regex, '')}</Text>
                        </DataView>
                        <Div />
                        <CustomButton color='#d7ffd6' onPress={handleInspecionarClick}>
                            <IonIcon name='camera' size={50} color='#4ecc22' />
                            <CustomButtonText color='#4ecc22'>Fotografar</CustomButtonText>
                        </CustomButton>
                    </InfoArea>
                </View>
            }
        </Container>
    );
}