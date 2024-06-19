import { StatusBar } from "expo-status-bar";
import { StyleSheet, Vibration, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Display, { Currency } from "./components/Display";
import NumPad, { NumPadValue } from "./components/NumPad";
import useTheme from "./hooks/useTheme";
import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

const defaultRates: Record<Currency, number> = {
  IRR: 42087.5,
  RUB: 89.748792,
  USD: 1,
};

const RatesStorageKey = "@RatesStorageKey";
const LastActiveCurrencyKey = "@LastActiveCurrencyKey";
const InitialValue = "0";

const EmptyValues: Record<Currency, string> = Object.freeze({
  [Currency.USD]: InitialValue,
  [Currency.RUB]: InitialValue,
  [Currency.IRR]: InitialValue,
});

export default function App() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [rates, setRates] = useState<Record<Currency, number>>({
    [Currency.USD]: defaultRates[Currency.USD],
    [Currency.RUB]: defaultRates[Currency.RUB],
    [Currency.IRR]: defaultRates[Currency.IRR],
  });
  const [activeCurrency, changeActiveCurrency] = useState<Currency>(
    Currency.USD
  );
  const [values, setValues] = useState(EmptyValues);
  useEffect(() => {
    (async () => {
      const startDateTime = new Date();
      try {
        const lastActiveCurrency = await AsyncStorage.getItem(
          LastActiveCurrencyKey
        );
        if (lastActiveCurrency) {
          changeActiveCurrency(lastActiveCurrency as Currency);
        }
      } catch (err) {
        console.log(err);
        alert("Couldn't set the last active currency");
      }
      let data: StorageData | null = null;
      try {
        const dataStr = await AsyncStorage.getItem(RatesStorageKey);
        data = dataStr && JSON.parse(dataStr);
      } catch (err) {
        console.error(err);
        alert("Couldn't get locally saved rates");
      }
      const nowUnixTs = Math.floor(+new Date() / 1000);
      if (!data || nowUnixTs - data.unixts > 3600) {
        try {
          const fetchRes = await fetch(
            "http://v51933.hosted-by-vdsina.com/rates"
          );
          if (!fetchRes.ok) {
            throw new Error("Couldn't fetch rates");
          }
          const rawData = await fetchRes.json();
          data = {
            unixts: rawData.unixts,
            rates: (Object.keys(rates) as Currency[]).reduce((acc, key) => {
              acc[key] = rawData.rates[key];
              return acc;
            }, {} as Record<Currency, number>),
          };
          await AsyncStorage.setItem(RatesStorageKey, JSON.stringify(data));
        } catch (err: any) {
          console.error(err);
          alert(err?.message || "Couldn't update rates");
        }
      }
      if (data?.rates) {
        setRates(data.rates);
      }
      const passedMS = +new Date() - +startDateTime;
      const timeToWait = 1000 - passedMS;
      if (timeToWait > 0) {
        await new Promise((res) => setTimeout(res, timeToWait));
      }
      setLoading(false);
      await SplashScreen.hideAsync();
    })();
  }, []);
  const updateCurrentValue = (value: string, triggerRecalc = false) => {
    setValues((values) => {
      const newValues = { ...values };
      newValues[activeCurrency] = value;
      if (triggerRecalc) {
        if (!value.length || value === InitialValue) {
          return EmptyValues;
        }
        const valueNum = Number(value);
        if (isNaN(valueNum)) {
          alert("valueNum is not a number");
          return values;
        }
        const formatter = Intl.NumberFormat("en-US");
        const base = valueNum / rates[activeCurrency];
        (Object.keys(newValues) as Currency[])
          .filter((key) => key !== activeCurrency)
          .forEach((key) => {
            newValues[key] = formatter.format(base * rates[key]);
          });
      }
      return newValues;
    });
  };
  useEffect(() => {
    const active = values[activeCurrency];
    const refinedValue = active.match(/[\d\.]+/g)?.join("") || InitialValue;
    updateCurrentValue(refinedValue, true);
  }, [activeCurrency]);
  const vibrate = () => {
    Vibration.vibrate(70, false);
  };
  const onActiveDisplayChange = (active: Currency) => {
    vibrate();
    changeActiveCurrency(active);
    AsyncStorage.setItem(LastActiveCurrencyKey, active);
  };
  const onNumPadPress = (btn: NumPadValue) => {
    vibrate();
    const currentValue = values[activeCurrency];
    switch (btn) {
      case NumPadValue.C:
        updateCurrentValue(InitialValue, true);
        break;
      case NumPadValue.DOT:
        if (!currentValue.includes(NumPadValue.DOT)) {
          updateCurrentValue(currentValue + NumPadValue.DOT);
        }
        break;
      case NumPadValue.BACKSPACE: {
        const newValue =
          currentValue.length === 1
            ? InitialValue
            : currentValue.substring(0, currentValue.length - 1);
        const triggerRecalc = !currentValue.endsWith(NumPadValue.DOT);
        updateCurrentValue(newValue, triggerRecalc);
        break;
      }
      default: {
        const newValue =
          currentValue === NumPadValue.ZERO ? btn : currentValue + btn;
        updateCurrentValue(newValue, true);
      }
    }
  };
  if (loading) return null;
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Display
        values={values}
        activeDisplay={activeCurrency}
        onActiveDisplayChange={onActiveDisplayChange}
      />
      <NumPad onBtnPress={onNumPadPress} />
      <StatusBar
        style={theme.statusBar}
        backgroundColor={theme.background}
        translucent={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignContent: "stretch",
  },
});

type StorageData = {
  unixts: number;
  rates: Record<Currency, number>;
};
