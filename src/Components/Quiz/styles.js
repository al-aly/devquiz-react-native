import styled from 'styled-components/native';
import {hpx, wpx} from '~/Utils/styles';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

export const QuestionContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: ${(props) =>
    props.small ? props.theme.hpx(150) : props.theme.hpx(250)};
`;

export const Question = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
  text-align: center;
  font-size: ${(props) => props.theme.fonts.xxlarge};
  padding: ${hpx(10)} ${wpx(20)};
`;

export const Image = styled.Image`
  min-height: ${hpx(220)};
  min-width: 90%;
  resize-mode: contain;
`;
