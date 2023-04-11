import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';
import { IFood } from '@services/firebase/models/food';
import { useUserStore } from '@stores/index';
import { IMeal } from '@services/firebase/models/meal';
import {
  Notifications,
  UserInfo,
  AddMeal,
  Favorites,
  Goal,
  Help,
  History,
  GoalResult,
  ChoseFoodToAddInMeal,
  DetailsMealsDay,
  EditMeal,
  UpdateFoodInMeal,
  AddFood,
  Routine,
  Settings,
  EditUserInfo,
} from '@screens/index';
import { AppStack } from './app';
import { CreateUserStack } from './createUserStack';

export type LoggedStackParamsList = {
  CreateUser: undefined;
  App: undefined;
  DetailsMealsDay: undefined;
  ChoseFoodToAddInMeal: { meal: IMeal };
  UpdateFoodInMeal: { type: 'add' | 'edit'; meal: IMeal; food: IFood };
  EditMeal: { meal?: IMeal; updatedMeal?: IMeal };
  AddMeal: undefined;
  Favorites: undefined;
  Goal: undefined;
  Help: undefined;
  History: undefined;
  UserInfo: undefined;
  Notifications: undefined;
  GoalResult: undefined;
  AddFood: undefined;
  Routine: undefined;
  Settings: undefined;
  EditUserInfo: undefined;
};

const Logged = createNativeStackNavigator<LoggedStackParamsList>();

export const LoggedStack = () => {
  const { user } = useUserStore();
  const { colors } = useTheme();

  return (
    <Logged.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background.dark },
      }}>
      {!user?.info ? (
        <Logged.Screen name="CreateUser" component={CreateUserStack} />
      ) : (
        <Logged.Screen name="App" component={AppStack} />
      )}
      <Logged.Screen name="DetailsMealsDay" component={DetailsMealsDay} />
      <Logged.Screen name="UpdateFoodInMeal" component={UpdateFoodInMeal} />
      <Logged.Screen
        name="ChoseFoodToAddInMeal"
        component={ChoseFoodToAddInMeal}
      />
      <Logged.Screen name="EditMeal" component={EditMeal} />
      <Logged.Screen name="AddMeal" component={AddMeal} />
      <Logged.Screen name="Favorites" component={Favorites} />
      <Logged.Screen name="Goal" component={Goal} />
      <Logged.Screen name="Help" component={Help} />
      <Logged.Screen name="History" component={History} />
      <Logged.Screen name="UserInfo" component={UserInfo} />
      <Logged.Screen name="Notifications" component={Notifications} />
      <Logged.Screen name="GoalResult" component={GoalResult} />
      <Logged.Screen name="AddFood" component={AddFood} />
      <Logged.Screen name="Routine" component={Routine} />
      <Logged.Screen name="Settings" component={Settings} />
      <Logged.Screen name="EditUserInfo" component={EditUserInfo} />
    </Logged.Navigator>
  );
};

export type NavPropsLogged = NativeStackNavigationProp<LoggedStackParamsList>;
