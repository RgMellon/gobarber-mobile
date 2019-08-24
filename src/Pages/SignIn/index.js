import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch } from 'react-redux';

import { sigInRequest } from '~/store/modules/auth/actions';

import Background from '~/Components/Background';

import logo from '~/assets/logo.png';

import {
  Container,
  FormInput,
  Form,
  SubmitButton,
  SignLink,
  SignText,
} from './styles';

export default function SignIn({ navigation }) {
  const refPassword = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  function handleSubmit() {
    dispatch(sigInRequest(email, password));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu email"
            returnKeyType="next"
            onSubmitEditing={() => refPassword.current.focus()}
            onChangeText={setEmail}
            value={email}
          />

          <FormInput
            ref={refPassword}
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha secreta"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            onChangeText={setPassword}
            value={password}
          />

          <SubmitButton onPress={handleSubmit}>Acessar</SubmitButton>
        </Form>

        <SignLink
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        >
          <SignText> Criar conta gratuita</SignText>
        </SignLink>
      </Container>
    </Background>
  );
}
