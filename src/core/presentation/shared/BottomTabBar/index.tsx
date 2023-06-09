import React, { useMemo } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components/native';
import Icon from '@/core/presentation/shared/Icon';
import { StyledContainerTab, StyledTitleTab, StyledWrapper } from './styles';

const BottomTabBar = ({ state, insets, navigation }: BottomTabBarProps) => {
  const { colors } = useTheme();

  const routeName: Record<string, string> = useMemo(() => {
    return {
      DietStack: 'Dieta',
      ProfileStack: 'Menu',
    };
  }, []);

  const iconName: Record<string, string> = useMemo(() => {
    return {
      DietStack: 'cutlery',
      ProfileStack: 'menu',
    };
  }, []);

  return (
    <StyledWrapper insets={insets}>
      {state.routes.map(route => (
        <StyledContainerTab
          key={route.key}
          insets={insets}
          onPress={() => navigation.navigate(route.name)}>
          {state.history[state.history.length - 1].key === route.key && (
            <Icon name={iconName[route.name]} color={colors.white} size={26} />
          )}

          <StyledTitleTab>{routeName[route.name]}</StyledTitleTab>
        </StyledContainerTab>
      ))}
    </StyledWrapper>
  );
};

export default BottomTabBar;
