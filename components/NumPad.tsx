import { StyleSheet, View, ViewStyle } from "react-native";
import Num from "./Num";

export enum NumPadValue {
  ONE = "1",
  TWO = "2",
  THREE = "3",
  FOUR = "4",
  FIVE = "5",
  SIX = "6",
  SEVEN = "7",
  EIGHT = "8",
  NINE = "9",
  ZERO = "0",
  BACKSPACE = "←",
  C = "C",
  DOT = ".",
}

type NumPadProps = {
  style?: ViewStyle;
  onBtnPress: (btn: NumPadValue) => void;
};

export default function (props: NumPadProps) {
  return (
    <View style={[styles.container, props.style || {}]}>
      <View style={styles.row}>
        <Num onPress={props.onBtnPress} value={NumPadValue.SEVEN} />
        <Num onPress={props.onBtnPress} value={NumPadValue.EIGHT} />
        <Num onPress={props.onBtnPress} value={NumPadValue.NINE} />
      </View>
      <View style={styles.row}>
        <Num onPress={props.onBtnPress} value={NumPadValue.FOUR} />
        <Num onPress={props.onBtnPress} value={NumPadValue.FIVE} />
        <Num onPress={props.onBtnPress} value={NumPadValue.SIX} />
      </View>
      <View style={styles.row}>
        <Num onPress={props.onBtnPress} value={NumPadValue.ONE} />
        <Num onPress={props.onBtnPress} value={NumPadValue.TWO} />
        <Num onPress={props.onBtnPress} value={NumPadValue.THREE} />
      </View>
      <View style={styles.row}>
        <Num
          onPress={props.onBtnPress}
          value={NumPadValue.BACKSPACE}
          onLongPress={props.onBtnPress}
          longValue={NumPadValue.C}
        />
        <Num onPress={props.onBtnPress} value={NumPadValue.ZERO} />
        <Num onPress={props.onBtnPress} value={NumPadValue.DOT} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 10,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10,
  },
});
