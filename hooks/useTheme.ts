import { useColorScheme } from "react-native";

type Theme = {
  name: "light" | "dark";
  statusBar: "light" | "dark";
  text: string;
  background: string;
  btnBackground: string;
  primary: string;
};

const LightTheme: Theme = Object.freeze({
  name: "light",
  statusBar: "dark",
  text: "#11181C",
  background: "#eee",
  btnBackground: "#fff",
  primary: "blue",
});
const DarkTheme: Theme = Object.freeze({
  name: "dark",
  statusBar: "light",
  text: "#ECEDEE",
  background: "#151718",
  btnBackground: "#000",
  primary: "deepskyblue",
});

export default function (): Theme {
  const schema = useColorScheme();
  if (schema === "dark") return DarkTheme;
  return LightTheme;
}
