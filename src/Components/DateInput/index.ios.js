import React, { useState, useMemo } from 'react';
import { DatePickerIOS } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Container, DateButton, Picker, DateText } from './styles';

export default function DateInput({ date, onChange }) {
  const [oppened, setOpenned] = useState(false);

  const dateFormated = useMemo(
    () =>
      format(date, "dd 'de ' MMMM 'de' yyyy", {
        locale: pt,
      }),
    [date]
  );

  return (
    <Container>
      <DateButton onPress={setOpenned(!oppened)}>
        <Icon name="e vent" color="#fff" size={20} />
        <DateText> {dateFormated}</DateText>
      </DateButton>

      {oppened && (
        <Picker>
          <DatePickerIOS
            date={date}
            onDateChange={onChange}
            minimumDate={new Date()}
            minimumInterval={60}
            locale={pt}
            mode="date"
          />
        </Picker>
      )}
    </Container>
  );
}
