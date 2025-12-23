import Styles from "@/constants/appStyles";
import { getData } from "@/store/storage/dataStorage";
import { Link, router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Profile() {
  const [userData, setUserData] = useState<any>();

  ////////////////////////
  const db = useSQLiteContext();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("userData");
      // setUserData(data);
      /////////////////////////////////////////
      const users = await db.getAllAsync("SELECT * FROM users");
      setUserData(users[0]);
      
      // type UserRow = { id?: number; name?: string; email?: string };
      // for (const row of users as UserRow[]) {
      //   console.log(row.id, row.name, row.email);
      // }
    };
    fetchData();
  }, []);

  // const userData = useUserStore((state: any) => state.userData);

  return (
    <SafeAreaProvider>
      <ScrollView style={Styles.container}>
        <Text style={Styles.heading}>Name: {userData?.name}</Text>
        <Text style={Styles.heading}>Email: {userData?.email}</Text>
        <Button
          title="Click Me"
          onPress={() => {
            router.push("/(tabs)/sensor");
          }}
        />
        <View style={Styles.view}>
          <Text style={Styles.text}>Hello World</Text>
          <Text style={Styles.text}>Hello World</Text>
          <Text style={Styles.heading}>Hello World</Text>
        </View>
        <Link href="/(tabs)/sensor">
          <Text>Go to Sensor Page</Text>
        </Link>
      </ScrollView>
    </SafeAreaProvider>
  );
}