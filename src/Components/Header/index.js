import React from 'react';
import {TouchableOpacity} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';
import {useTheme} from 'styled-components';
import {useRoute} from '@react-navigation/native';

import {Container, ButtonArea} from './styles';
import {useNavigation} from '@react-navigation/native';
import {useGame} from '~/Contexts/GameContext';

export default function Header({exitRoom, back}) {
  const route = useRoute();

  const navigation = useNavigation();
  const theme = useTheme();
  const {emit} = useGame();

  const handleBack = () => {
    exitRoom && exitRoom();
    navigation.goBack();
  };

  console.log('navigation', navigation);
  return (
    <Container>
      {/* {close && (
        <TouchableOpacity
          onPress={() => navigation.replace('Main')}
          style={{width: '100%'}}>
          <ButtonArea right>
            <IconFeather name="x" size={30} color={theme.colors.secondary} />
          </ButtonArea>
        </TouchableOpacity>
      )} */}
      {back && (
        <TouchableOpacity onPress={() => handleBack()}>
          <ButtonArea>
            <IconIonicons
              name="ios-arrow-back"
              size={30}
              color={theme.colors.secondary}
            />
          </ButtonArea>
        </TouchableOpacity>
      )}
    </Container>
  );
}
