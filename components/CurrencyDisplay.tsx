import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import CountryFlag from "react-native-country-flag";
import useTheme from "../hooks/useTheme";
import { Currency } from "./Display";
import { useRef } from "react";

type Props = {
  currency: Currency;
  currencyValue: string;
  flagIsoCod: "ir" | "ru" | "us";
  active: boolean;
  onPress: (currency: Currency) => void;
};

export default function (props: Props) {
  const theme = useTheme();
  const scrollViewRef: any = useRef(null);
  return (
    <View
      style={[
        styles.container,
        {
          borderColor: props.active ? theme.primary : theme.text,
          backgroundColor: props.active
            ? theme.btnBackground
            : theme.background,
        },
      ]}
    >
      <Pressable onPress={() => props.onPress(props.currency)}>
        <View
          style={[
            styles.description,
            {
              backgroundColor: theme.btnBackground,
              borderColor: props.active ? theme.btnBackground : theme.text,
            },
          ]}
        >
          <CountryFlag isoCode={props.flagIsoCod} size={23} />
          <Text style={[styles.currency, { color: theme.text }]}>
            {props.currency}
          </Text>
        </View>
      </Pressable>
      <ScrollView
        style={styles.currencyScrollView}
        horizontal
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: false })
        }
      >
        <Text
          selectable={true}
          style={[styles.currencyValue, { color: theme.text }]}
        >
          {props.currencyValue}
        </Text>
      </ScrollView>
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
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
  },
  currency: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "500",
  },
  currencyScrollView: {
    marginLeft: 10,
    flexGrow: 0,
  },
  currencyValue: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "right",
  },
});
