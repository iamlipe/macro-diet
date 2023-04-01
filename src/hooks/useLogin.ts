import authFirebase from '@react-native-firebase/auth';
import { useUserStore } from '@stores/user';
import { useCallback, useMemo, useState } from 'react';
import { getUserByDoc } from '@services/firebase/repositories/users';
import { useLoader } from './useLoader';
import { useToast } from './useToast';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { buidSchemaAuth } from '@services/firebase/models/user';
import * as Yup from 'yup';

interface LoginWithEmailDTO {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { login, logout: logoutStore, auth } = useUserStore();
  const { show: showToast } = useToast();
  const { show: showLoader, hide: hideLoader } = useLoader();

  const initialValuesLoginWithEmail = useMemo(() => {
    return {
      email: '',
      password: '',
    };
  }, []);

  const loginWithEmailSchema = useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string().email('email invalido').required(),
        password: Yup.string()
          .required()
          .min(8, 'Senha deve ter no mínimo 8 caracteres'),
      }),
    [],
  );

  const handleAuthError = useCallback(
    error => {
      if (error.message) {
        showToast({
          type: 'error',
          message: error.code,
        });
      } else {
        showToast({
          type: 'error',
          message: 'something went wrong',
        });
      }
    },
    [showToast],
  );

  const loginWithGoogle = useCallback(async () => {
    try {
      setLoading(true);
      showLoader();

      const { idToken } = await GoogleSignin.signIn();

      const googleCredential =
        authFirebase.GoogleAuthProvider.credential(idToken);

      const { user: googleAuth } = await authFirebase().signInWithCredential(
        googleCredential,
      );

      const user = await getUserByDoc({ doc: googleAuth.uid });

      if (user) {
        login(user);
      } else {
        auth(buidSchemaAuth(googleAuth));
      }
    } catch (error) {
      handleAuthError(error);
    } finally {
      setLoading(false);
      hideLoader();
    }
  }, [auth, handleAuthError, hideLoader, login, showLoader]);

  // NOTE: implement when have a developer team
  const loginWithFacebook = useCallback(async () => {
    showToast({ type: 'warning', message: 'not implemented' });
  }, [showToast]);

  // NOTE: implement when have a developer team
  const loginWithApple = useCallback(async () => {
    showToast({ type: 'warning', message: 'not implemented' });
  }, [showToast]);

  const loginWithEmail = useCallback(
    async ({ email, password }: LoginWithEmailDTO) => {
      try {
        setLoading(true);
        showLoader();

        const { user: userFirebaseAuth } =
          await authFirebase().signInWithEmailAndPassword(
            email.toLowerCase().trim(),
            password.toLowerCase().trim(),
          );

        const user = await getUserByDoc({ doc: userFirebaseAuth.uid });

        if (user) {
          login(user);
        } else {
          auth(buidSchemaAuth(userFirebaseAuth));
        }
      } catch (error) {
        handleAuthError(error);
      } finally {
        setLoading(false);
        hideLoader();
      }
    },
    [auth, handleAuthError, hideLoader, login, showLoader],
  );

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      showLoader();
      logoutStore();
    } catch (error) {
      showToast({ type: 'error', message: 'something went wrong' });
    } finally {
      setTimeout(() => {
        setLoading(false);
        hideLoader();
      }, 1000);
    }
  }, [hideLoader, logoutStore, showLoader, showToast]);

  return {
    loginWithApple,
    loginWithGoogle,
    loginWithFacebook,
    loginWithEmail,
    logout,
    initialValuesLoginWithEmail,
    loginWithEmailSchema,
    loading,
  };
};