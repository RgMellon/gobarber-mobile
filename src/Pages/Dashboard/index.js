import React, { useState, useEffect } from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import { Container, Title, List } from './styles';

import Background from '~/Components/Background';
import Appointments from '~/Components/Appointments';

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function loadStores() {
      const response = await api.get('appointments');

      setAppointments(response.data);
    }

    loadStores();
  }, []);

  async function handleCancel(id) {
    const response = await api.delete(`appointments/${id}`);

    setAppointments(
      appointments.map(appointment =>
        appointment.id === id
          ? {
              ...appointment,
              canceled_at: response.data.canceled_at,
            }
          : appointment
      )
    );
  }

  return (
    <Background>
      <Container>
        <Title> Agendamentos </Title>

        <List
          data={appointments}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Appointments onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};
