import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Image } from 'react-native';

import Background from '~/Components/Background';
import { signUpRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

import {
  Container,
  FormInput,
  Form,
  SubmitButton,
  SignLink,
  SignText,
} from './styles';

export default function SignUp({ navigation }) {
  const passwordRef = useRef();
  const emailRef = useRef();
  const dispatch = useDispatch();

  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu nome"
            returnKeyType="next"
            onChangeText={setname}
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
              passwordRef.current.focus();
            }}
            onChangeText={setEmail}
            value={email}
          />

          <FormInput
            ref={passwordRef}
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha secreta"
            returnKeyType="next"
            onSubmitEditing={handleSubmit}
            onChangeText={setPassword}
            value={password}
          />

          <SubmitButton onPress={handleSubmit}>Acessar</SubmitButton>
        </Form>

        <SignLink
          onPress={() => {
            navigation.navigate('SignIn');
          }}
        >
          <SignText> Já tenho conta </SignText>
        </SignLink>
      </Container>
    </Background>
  );
}
