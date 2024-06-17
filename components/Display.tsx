import { StyleSheet, View, ViewStyle } from "react-native";
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
      <CurrencyDisplay
        active={props.activeDisplay === Currency.USD}
        currency={Currency.USD}
        flagIsoCod="us"
        currencyValue={props.values[Currency.USD]}
        onPress={props.onActiveDisplayChange}
      />
      <CurrencyDisplay
        active={props.activeDisplay === Currency.RUB}
        currency={Currency.RUB}
        flagIsoCod="ru"
        currencyValue={props.values[Currency.RUB]}
        onPress={props.onActiveDisplayChange}
      />
      <CurrencyDisplay
        active={props.activeDisplay === Currency.IRR}
        currency={Currency.IRR}
        flagIsoCod="ir"
        currencyValue={props.values[Currency.IRR]}
        onPress={props.onActiveDisplayChange}
      />
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
