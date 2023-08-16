import { Col1 } from "./src/RNCore/components/markup/markup";
import { FieldTime } from "./src/RNCore/components/fields/FieldTime";
import { EDate } from "./src/RNCore/sugar/date";
import { Text } from "react-native";
import React from "react";

export default function App() {
  return (
    <Col1 class={"m-5"}>
      <Text>
        Привет! Ниже должно быть по больше примеров использования готового
        компонента.{" "}
      </Text>
      <Text>Разной ширины, с разным фоном и цветом шрифта</Text>
      <FieldTime class={"mt-2 bg-primary"} value={null} />
      <FieldTime
        class={"mt-2 bg-danger"}
        value={new EDate().isoTime()}
        useButtons
      />
      <FieldTime
        value={"14:56"}
        class={"w-50 mt-2 bg-success text-warning"}
        useButtons
      />
      <FieldTime
        value={null}
        class={"w-[57rem] mt-2 bg-successLight text-white"}
      />
      <FieldTime value={null} class={"w-[30rem] mt-2 bg-successDark "} />
      <FieldTime
        value={"12:30"}
        useButtons
        class={"w-[70rem] mt-2 bg-warning "}
      />
    </Col1>
  );
}
