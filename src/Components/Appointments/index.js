import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import isPast from 'date-fns/isPast';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Left, Avatar, Name, Info, Time } from './styles';

export default function Appointments({ data, onCancel }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.date]);

  const isPasted = useMemo(() => {
    return isPast(parseISO(data.date));
  }, [data.date]);

  return (
    <Container past={isPasted}>
      <Left>
        <Avatar
          source={{
            uri: `https://api.adorable.io/avatar/50/${data.provider.name}.png`,
          }}
        />

        <Info>
          <Name> {data.provider.name} </Name>
          <Time> {dateParsed} </Time>
        </Info>
      </Left>

      {!isPasted && !data.canceled_at && (
        <TouchableOpacity onPress={onCancel}>
          <Icon name="event-busy" size={20} color="#f64c75" />
        </TouchableOpacity>
      )}
    </Container>
  );
}
