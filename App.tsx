import { StatusBar } from "expo-status-bar";
import { StyleSheet, Vibration, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Display, { Currency } from "./components/Display";
import NumPad, { NumPadValue } from "./components/NumPad";
import useTheme from "./hooks/useTheme";
import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

const data = {
  disclaimer: "Usage subject to terms: https://openexchangerates.org/terms",
  license: "https://openexchangerates.org/license",
  timestamp: 1718560802,
  base: "USD",
  rates: {
    AED: 3.673,
    AFN: 70.629925,
    ALL: 93.766029,
    AMD: 387.09398,
    ANG: 1.79792,
    AOA: 855.5,
    ARS: 900.345582,
    AUD: 1.513088,
    AWG: 1.80125,
    AZN: 1.7,
    BAM: 1.825818,
    BBD: 2,
    BDT: 117.237829,
    BGN: 1.828515,
    BHD: 0.376276,
    BIF: 2867.428126,
    BMD: 1,
    BND: 1.350399,
    BOB: 6.893272,
    BRL: 5.3773,
    BSD: 1,
    BTC: 0.000015028265,
    BTN: 83.342478,
    BWP: 13.582319,
    BYN: 3.264326,
    BZD: 2.010911,
    CAD: 1.37535,
    CDF: 2819.794327,
    CHF: 0.891899,
    CLF: 0.033186,
    CLP: 915.70849,
    CNH: 7.250506,
    CNY: 7.2548,
    COP: 4140.0662,
    CRC: 525.947274,
    CUC: 1,
    CUP: 25.75,
    CVE: 102.825557,
    CZK: 23.0983,
    DJF: 177.628631,
    DKK: 6.9657,
    DOP: 59.234388,
    DZD: 134.651064,
    EGP: 47.632769,
    ERN: 15,
    ETB: 57.057587,
    EUR: 0.933053,
    FJD: 2.2387,
    FKP: 0.789921,
    GBP: 0.789921,
    GEL: 2.87,
    GGP: 0.789921,
    GHS: 15.01562,
    GIP: 0.789921,
    GMD: 67.75,
    GNF: 8588.587525,
    GTQ: 7.749335,
    GYD: 208.737801,
    HKD: 7.81055,
    HNL: 24.65706,
    HRK: 7.03975,
    HTG: 132.335527,
    HUF: 370.998343,
    IDR: 16486.5,
    ILS: 3.720893,
    IMP: 0.789921,
    INR: 83.55155,
    IQD: 1306.849431,
    IRR: 42100,
    ISK: 139.040389,
    JEP: 0.789921,
    JMD: 155.257148,
    JOD: 0.7089,
    JPY: 157.4350693,
    KES: 129.202198,
    KGS: 87.8599,
    KHR: 4108.729824,
    KMF: 457.499995,
    KPW: 900,
    KRW: 1383.27,
    KWD: 0.306225,
    KYD: 0.831445,
    KZT: 451.01908,
    LAK: 21788.785264,
    LBP: 89337.02505,
    LKR: 303.408359,
    LRD: 193.537555,
    LSL: 18.318086,
    LYD: 4.83704,
    MAD: 10.025552,
    MDL: 17.762858,
    MGA: 4440.702811,
    MKD: 57.457919,
    MMK: 2096.29,
    MNT: 3450,
    MOP: 8.026577,
    MRU: 39.295939,
    MUR: 46.788456,
    MVR: 15.41,
    MWK: 1729.752588,
    MXN: 18.4648,
    MYR: 4.719499,
    MZN: 63.899991,
    NAD: 18.318086,
    NGN: 1495.5,
    NIO: 36.723084,
    NOK: 10.68245,
    NPR: 133.348263,
    NZD: 1.626546,
    OMR: 0.384324,
    PAB: 1,
    PEN: 3.770504,
    PGK: 3.887723,
    PHP: 58.700001,
    PKR: 277.884288,
    PLN: 4.091633,
    PYG: 7503.069605,
    QAR: 3.638178,
    RON: 4.653,
    RSD: 109.1691,
    RUB: 88.823607,
    RWF: 1308.992161,
    SAR: 3.752179,
    SBD: 8.4616,
    SCR: 14.407394,
    SDG: 586,
    SEK: 10.63185,
    SGD: 1.3535,
    SHP: 0.789921,
    SLL: 20969.5,
    SOS: 570.149738,
    SRD: 31.572,
    SSP: 130.26,
    STD: 22281.8,
    STN: 22.847018,
    SVC: 8.729426,
    SYP: 2512.53,
    SZL: 18.307455,
    THB: 36.693962,
    TJS: 10.669464,
    TMT: 3.5,
    TND: 3.122488,
    TOP: 2.35645,
    TRY: 32.7375,
    TTD: 6.779503,
    TWD: 32.3458,
    TZS: 2619.02838,
    UAH: 40.593838,
    UGX: 3705.886831,
    USD: 1,
    UYU: 39.291418,
    UZS: 12584.375498,
    VES: 36.372315,
    VND: 25455.008685,
    VUV: 118.722,
    WST: 2.8,
    XAF: 612.042932,
    XAG: 0.03380837,
    XAU: 0.00042863,
    XCD: 2.70255,
    XDR: 0.756096,
    XOF: 612.042932,
    XPD: 0.00113108,
    XPF: 111.342892,
    XPT: 0.00104433,
    YER: 250.300053,
    ZAR: 18.35321,
    ZMW: 26.112743,
    ZWL: 322,
  },
};

const RatesStorageKey = "@RatesStorageKey";
const InitialValue = "0";

const EmptyValues: Record<Currency, string> = Object.freeze({
  [Currency.USD]: InitialValue,
  [Currency.RUB]: InitialValue,
  [Currency.IRR]: InitialValue,
});

export default function App() {
  const theme = useTheme();
  const [rates, setRates] = useState<Record<Currency, number>>({
    [Currency.USD]: data.rates[Currency.USD],
    [Currency.RUB]: data.rates[Currency.RUB],
    [Currency.IRR]: data.rates[Currency.IRR],
  });
  useEffect(() => {
    (async () => {
      try {
        const data = await AsyncStorage.getItem(RatesStorageKey);
        // TODO data processing
      } catch (err) {
        console.error(err);
        alert("Couldn't get AsyncStorage item");
      }
    })();
  }, []);
  const [activeCurrency, changeActiveCurrency] = useState<Currency>(
    Currency.IRR
  );
  const [values, setValues] = useState(EmptyValues);
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
  const onNumPadPress = (btn: NumPadValue) => {
    Vibration.vibrate(70, false);
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
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Display
        values={values}
        activeDisplay={activeCurrency}
        onActiveDisplayChange={(active: Currency) => {
          changeActiveCurrency(active);
        }}
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
