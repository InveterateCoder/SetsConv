import { StyleSheet, Text, View } from "react-native";
import CountryFlag from "react-native-country-flag";
import useTheme from "../hooks/useTheme";

type Props = {
  currencyName: string;
  currencyValue: string;
  flagIsoCod: "ir" | "ru" | "us";
  active: boolean;
};

export default function (props: Props) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          borderColor: props.active ? theme.primary : theme.text,
          backgroundColor: props.active ? theme.btnBackground : theme.background,
        },
      ]}
    >
      <View style={styles.description}>
        <CountryFlag isoCode={props.flagIsoCod} size={25} />
        <Text style={[styles.currencyName, { color: theme.text }]}>
          {props.currencyName}
        </Text>
      </View>
      <Text style={[styles.currencyValue, { color: theme.text }]}>
        {props.currencyValue}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row",
    height: 70,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    padding: 20,
    justifyContent: "space-between",
  },
  description: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  currencyName: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "500",
  },
  currencyValue: {
    fontSize: 20,
    fontWeight: "500",
  },
});
