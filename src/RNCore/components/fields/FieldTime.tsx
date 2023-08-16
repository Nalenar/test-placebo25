import { Pressable, TextInput, Text, View } from "react-native";
import tw from "../../libs/tailwind";
import React, { useState, useEffect } from "react";
import { Row } from "../markup/markup";

interface ITimeField {
  class?: string; // tailwind classes
  value: string | null; // Если не задано отображаем --:--
  onChange?: (time: string) => void; // событие должно вызываться при снятии фокуса с компонента.
  useButtons?: boolean; // если true - отображаем кнопки "<" слева и справа ">" + или - 1 час соответственно
}

export function FieldTime(props: ITimeField) {
  const [formattedTime, setFormattedTime] = useState(props.value || "--:--");

  useEffect(() => {
    if (props.value) {
      const formatted = formatTime(props.value);
      setFormattedTime(formatted);
    }
  }, [props.value]);

  const formatTime = (time: string | null): string => {
    if (time) {
      const regExp = /\d{2}/g;
      const matches = time.match(regExp);

      if (matches) {
        const hours = parseInt(matches[0], 10);
        const minutes = parseInt(matches[1], 10);

        if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
          const formattedHours = hours.toString().padStart(2, "0");
          const formattedMinutes = minutes.toString().padStart(2, "0");
          return `${formattedHours}:${formattedMinutes}`;
        }
      }
    }
    return "--:--";
  };

  const handleBlur = (): void => {
    if (props.onChange) props.onChange(formattedTime);
    else setFormattedTime(formatTime(formattedTime));
  };

  const changeTime = (increase: boolean): void => {
    const regExp = /\d{2}/g;
    const matches = formattedTime.match(regExp);

    if (matches) {
      let hours: string | number = parseInt(matches[0], 10);
      const minutes: string = matches[1];

      if (increase) {
        if (hours === 23) {
          hours = "00";
        } else {
          hours++;
        }
      } else {
        if (hours === 0) {
          hours = "23";
        } else {
          hours--;
        }
      }

      const decreasedHours = hours.toString().padStart(2, "0");
      setFormattedTime(`${decreasedHours}:${minutes}`);
    }
  };

  return (
    <View style={tw`${props.class || ""}`}>
      <Row class="justify-center">
        {props.useButtons && (
          <Pressable onPress={() => changeTime(false)}>
            <Text>{"<"}</Text>
          </Pressable>
        )}
        <TextInput
          style={tw`${"text-center"}`}
          value={formattedTime}
          onBlur={handleBlur}
          onChangeText={(text) => setFormattedTime(text)}
        />
        {props.useButtons && (
          <Pressable onPress={() => changeTime(true)}>
            <Text>{">"}</Text>
          </Pressable>
        )}
      </Row>
    </View>
  );
}
