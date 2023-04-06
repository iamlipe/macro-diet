import React from 'react';
import { useGenderStore } from '@stores/gender';
import { useCreateUser } from '@hooks/index';
import { Formik } from 'formik';
import {
  Background,
  Button,
  Container,
  Option,
  Scroll,
} from '@components/index';
import * as Yup from 'yup';
import { buildOptionForm } from '@utils/help';

export const GenderCreateUser = () => {
  const { genders } = useGenderStore();
  const { handleForm } = useCreateUser();

  const initialValuesGender = {
    genderDoc: 'Por favor, selecione o seu sexo biológico',
  };

  const genderSchema = Yup.object().shape({
    genderDoc: Yup.string().required(),
  });

  return (
    <Background>
      <Formik
        initialValues={initialValuesGender}
        validationSchema={genderSchema}
        onSubmit={values =>
          handleForm({ values, navigateTo: 'HeightCreateUser' })
        }>
        {({ handleChange, values, handleSubmit, errors, touched }) => (
          <Scroll>
            <Option
              name="goalDoc"
              label="sexo"
              value={values.genderDoc}
              options={genders?.map(buildOptionForm) || []}
              onChange={handleChange('genderDoc')}
              error={
                touched.genderDoc && errors.genderDoc ? errors.genderDoc : ''
              }
            />

            <Container flex={1} justifyContent="flex-end">
              <Button
                title="Proximo"
                icon={{ name: 'long-arrow-right' }}
                onPress={handleSubmit}
              />
            </Container>
          </Scroll>
        )}
      </Formik>
    </Background>
  );
};
