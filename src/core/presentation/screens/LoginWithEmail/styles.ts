import styled from 'styled-components/native';
import Input from '@/core/presentation/shared/Input';

export const StyledScroll = styled.ScrollView.attrs(({ theme }) => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: theme.effects.spacing.vl,
    paddingHorizontal: theme.effects.spacing.md,
  },
}))``;

export const StyledInput = styled(Input).attrs(({ theme }) => ({
  wrapperStyle: {
    flex: 1,
    marginBottom: theme.effects.spacing.md,
  },
}))``;

export const StyledWrapperButtonSubmit = styled.View`
  flex: 1;
  justify-content: flex-end;
`;
