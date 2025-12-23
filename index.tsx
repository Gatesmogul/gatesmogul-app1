import Styles from "@/constants/appStyles";
import { useLoginStore } from "@/store/loginStore";
import { storeData } from "@/store/storage/dataStorage";
import { useUserStore } from "@/store/userStore";
import { Button } from "@react-navigation/elements";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const isLoggedIn = useLoginStore((state: any) => state.isLoggedIn);
  const login = useLoginStore((state: any) => state.login);
  const setUserData = useUserStore((state: any) => state.setUserData);
  // const logout = useLoginStore((state: any) => state.logout);

  ////////////////////////////////////////////////

  const db = useSQLiteContext();

  const handleLogin = async () => {
    await storeData("userData", { name: name, email: email });
    await storeData("name", name);
    await storeData("email", email);

    await setUserData(name, email);

    ////////////////////////////////////////////

    await db.runAsync("INSERT INTO users (name, email) VALUES (?, ?);", [
      name,
      email,
    ]);

    login();
  };

  return (
    <SafeAreaProvider>
      <ScrollView style={Styles.container}>
        <View>
          <Text style={Styles.label}>Name</Text>
          <TextInput
            value={name}
            onChange={(e) => setName(e.nativeEvent.text)}
            inputMode="decimal"
            style={Styles.textinput}
            placeholder="Input your name..."
          />
        </View>
        <View>
          <Text style={Styles.label}>Email</Text>
          <TextInput
            value={email}
            onChange={(e) => setEmail(e.nativeEvent.text)}
            inputMode="decimal"
            style={Styles.textinput}
            placeholder="Input your email..."
          />
        </View>
        <View>
          <Text style={Styles.label}>Password</Text>
          <TextInput
            value={password}
            onChange={(e) => setPassword(e.nativeEvent.text)}
            keyboardType="visible-password"
            style={Styles.textinput}
            placeholder="Input your Password..."
          />
        </View>
        <View>
          <Button
            onPress={() => {
              handleLogin();
            }}
            // title="Login"
          >
             {isLoggedIn ? "Logout" : "Login"}
          </Button>

          <View>
            <Text>{isLoggedIn ? "Logged In" : "Logged Out"}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}