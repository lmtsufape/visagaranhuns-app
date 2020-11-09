import React from 'react';
import { Container, InfoArea, InfoText, CustomButtonTirarFoto, CustomButtonGaleria, CustomButtonText } from './styles';
import { Text } from 'react-native';
export default() => {
    return(
        <Container>
            <InfoArea>
                <InfoText>Câmera</InfoText>
                <CustomButtonTirarFoto>
                    <CustomButtonText>Tirar foto</CustomButtonText>
                </CustomButtonTirarFoto>
                <CustomButtonGaleria>
                    <CustomButtonText>Abrir galeria</CustomButtonText>
                </CustomButtonGaleria>
            </InfoArea>
            <Text>Imagens</Text>
        </Container>
    );
}