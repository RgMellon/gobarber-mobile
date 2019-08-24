import { put, call, all, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';

import { updateProfileSuccess, updateProfileFailure } from './actions';

import api from '~/services/api';

export function* updateProfileRequest({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = Object.assign(
      { name, email },
      rest.oldPassword ? rest : {}
    );

    const response = yield call(api.put, 'user', profile);

    yield put(updateProfileSuccess(response.data));

    Alert.alert('Perfil atualizado com sucesso');
  } catch (error) {
    yield put(updateProfileFailure());
  }
}

export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfileRequest),
]);
