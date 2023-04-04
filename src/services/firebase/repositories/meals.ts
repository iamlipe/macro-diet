import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import { IMeal } from '../models/meal';

export type CreateMealDTO = {
  meal: Omit<IMeal, 'doc'>;
};

export type UpdateMealDTO = {
  doc: string;
  updatedMeal: Partial<IMeal>;
};

export const createMeal = async ({ meal }: CreateMealDTO) => {
  await firestore().collection('Meals').add(meal);
};

export const getMealsDay = async (user: string) => {
  const data = await firestore()
    .collection('Meals')
    .where('user', '==', user)
    .get();

  const meals: IMeal[] = data.docs.map(doc => {
    const meal = doc.data();

    return {
      doc: doc.id,
      foods: meal.foods,
      time: meal.time,
      title: meal.title,
      user: meal.user,
    };
  });

  const mealsDay = meals
    .filter(meal => {
      const currDate = new Date();
      const mealDate = new Date(meal.time.milliseconds);

      if (moment(mealDate).isSame(currDate, 'day')) {
        return meal;
      }
    })
    .sort((a, b) => a.time.milliseconds - b.time.milliseconds);

  return { mealsDay };
};

export const updateMeal = async ({ doc, updatedMeal }: UpdateMealDTO) => {
  await firestore().collection('Meals').doc(doc).update(updatedMeal);
};
