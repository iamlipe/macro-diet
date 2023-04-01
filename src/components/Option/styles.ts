import styled from 'styled-components/native';

interface WrapperProps {
  name: string;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

interface ContainerOptionProps {
  selected: boolean;
  lastChild: boolean;
}

interface TitleOptionProps {
  selected: boolean;
}

export const Wrapper = styled.View<WrapperProps>`
  margin-top: ${({ marginTop }) => marginTop || 0}px;
  margin-right: ${({ marginRight }) => marginRight || 0}px;
  margin-bottom: ${({ marginBottom }) => marginBottom || 0}px;
  margin-left: ${({ marginLeft }) => marginLeft || 0}px;
`;

export const ContainerOption = styled.TouchableOpacity<ContainerOptionProps>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-color: ${({ theme, selected }) =>
    selected ? theme.colors.primary[200] : theme.colors.gray.white};
  border-width: ${({ theme }) => theme.effects.border.width.df}px;
  border-radius: ${({ theme }) => theme.effects.border.radius.sm}px;
  padding: ${({ theme }) => theme.effects.spacing.md}px;
  margin-bottom: ${({ theme, lastChild }) =>
    !lastChild ? theme.effects.spacing.lg : 0}px;
`;

export const TitleOption = styled.Text<TitleOptionProps>`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.s2}px;
  color: ${({ theme, selected }) =>
    selected ? theme.colors.primary[200] : theme.fonts.color.primary};
  line-height: 24px;
`;

export const Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.s2}px;
  color: ${({ theme }) => theme.fonts.color.primary};
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const Error = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.md}px;
  color: ${({ theme }) => theme.fonts.color.secundary};
  margin-top: ${({ theme }) => theme.effects.spacing.vs}px;
`;