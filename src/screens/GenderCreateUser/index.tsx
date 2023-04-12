import React from 'react';
import * as Yup from 'yup';
import { buildOptionForm } from '@utils/help';
import { useGenderStore } from '@stores/index';
import { useUser } from '@hooks/index';
import { Formik } from 'formik';
import { Background, Button, Option } from '@components/index';
import { StyledScroll, StyledWrapperButtonSubmit } from './styles';

const GenderCreateUser = () => {
  const { genders } = useGenderStore();
  const { handleFormCreateUser } = useUser();

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
          handleFormCreateUser({ values, navigateTo: 'BirthDateCreateUser' })
        }>
        {({ handleChange, values, handleSubmit, errors, touched }) => (
          <StyledScroll>
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

            <StyledWrapperButtonSubmit>
              <Button title="Proximo" onPress={handleSubmit} />
            </StyledWrapperButtonSubmit>
          </StyledScroll>
        )}
      </Formik>
    </Background>
  );
};

export default GenderCreateUser;
