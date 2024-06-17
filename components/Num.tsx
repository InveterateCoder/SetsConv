import { Text, StyleSheet, TouchableHighlight } from "react-native";
import useTheme from "../hooks/useTheme";
import { NumPadValue } from "./NumPad";

type Props = {
  value: NumPadValue;
  onPress: (btn: NumPadValue) => void;
  longValue?: NumPadValue;
  onLongPress?: (btn: NumPadValue) => void;
};

export default function (props: Props) {
  const theme = useTheme();
  return (
    <TouchableHighlight
      style={[
        styles.container,
        {
          backgroundColor: theme.btnBackground,
          borderColor: theme.text,
        },
      ]}
      activeOpacity={0.8}
      underlayColor={theme.background}
      onPress={() => props.onPress(props.value)}
      onLongPress={() =>
        props.onLongPress && props.onLongPress(props.longValue || props.value)
      }
    >
      <Text style={[styles.btnText, { color: theme.text }]}>
        {props.value + (props.longValue ? `/ ${props.longValue}` : "")}
      </Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
