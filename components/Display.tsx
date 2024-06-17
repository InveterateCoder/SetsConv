import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import CurrencyDisplay from "./CurrencyDisplay";

export enum Currency {
  IRR = "IRR",
  USD = "USD",
  RUB = "RUB",
}

type DisplayProps = {
  style?: ViewStyle;
  activeDisplay: Currency;
  values: Record<Currency, string>;
  onActiveDisplayChange: (active: Currency) => void;
};

export default function (props: DisplayProps) {
  return (
    <View style={[styles.container, props.style || {}]}>
      <Pressable onPress={() => props.onActiveDisplayChange(Currency.USD)}>
        <CurrencyDisplay
          active={props.activeDisplay === Currency.USD}
          currencyName={Currency.USD}
          flagIsoCod="us"
          currencyValue={props.values[Currency.USD]}
        />
      </Pressable>
      <Pressable onPress={() => props.onActiveDisplayChange(Currency.RUB)}>
        <CurrencyDisplay
          active={props.activeDisplay === Currency.RUB}
          currencyName={Currency.RUB}
          flagIsoCod="ru"
          currencyValue={props.values[Currency.RUB]}
        />
      </Pressable>
      <Pressable onPress={() => props.onActiveDisplayChange(Currency.IRR)}>
        <CurrencyDisplay
          active={props.activeDisplay === Currency.IRR}
          currencyName={Currency.IRR}
          flagIsoCod="ir"
          currencyValue={props.values[Currency.IRR]}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: "space-evenly",
  },
});
