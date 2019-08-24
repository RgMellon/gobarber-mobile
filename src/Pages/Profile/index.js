import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/Components/Background';

import {
  Container,
  FormInput,
  Form,
  Title,
  Separator,
  SubmitButton,
  LogoutButton,
} from './styles';

import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    setOldPassword('');
    setConfirmPassword('');
    setPassword('');
  }, [profile]);

  function handleSubmit() {
    dispatch(
      updateProfileRequest({
        name,
        email,
        password,
        oldPassword,
        confirmPassword,
      })
    );
  }

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Background>
      <Container>
        <Title> Meu Perfil </Title>

        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu nome"
            returnKeyType="next"
            onChangeText={setName}
            value={name}
            onSubmitEditing={() => {
              emailRef.current.focus();
            }}
          />

          <FormInput
            ref={emailRef}
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu email"
            returnKeyType="next"
            onSubmitEditing={() => {
              oldPasswordRef.current.focus();
            }}
            onChangeText={setEmail}
            value={email}
          />

          <Separator />

          <FormInput
            ref={oldPasswordRef}
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha atual"
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordRef.current.focus();
            }}
            onChangeText={setOldPassword}
            value={oldPassword}
          />

          <FormInput
            ref={passwordRef}
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua nova senha"
            returnKeyType="next"
            onSubmitEditing={() => {
              confirmPasswordRef.current.focus();
            }}
            onChangeText={setPassword}
            value={password}
          />

          <FormInput
            ref={confirmPasswordRef}
            icon="lock-outline"
            secureTextEntry
            placeholder="Confirmação da nova senha"
            returnKeyType="next"
            onSubmitEditing={handleSubmit}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />

          <SubmitButton onPress={handleSubmit}>Atualizar perfil</SubmitButton>
          <LogoutButton onPress={handleLogout}> Logout </LogoutButton>
        </Form>
      </Container>
    </Background>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu Perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
