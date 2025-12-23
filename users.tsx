import styles from "@/constants/appStyles";
import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const axiosInstance = axios.create({
  baseURL: "https://randomuser.me/api",
  });
  
  useEffect(() => {
    axiosInstance
      .get("/?results=100")
      .then((response) => {
        setUsers(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        console.log("ERROR:", error.message);
      });
  }, []);

  const renderItem = ({ item }: any) => (
    <View
      style={{
        padding: 10,
        borderColor: "red",
        borderWidth: 1,
        borderRadius: 15,
        margin: 10,
      }}
    >
      <View
        style={{
          width: 70,
          height: 70,
          backgroundColor: "green",
          borderRadius: 50,
        }}
      ></View>
      <View style={styles.view}>
        <Text style={{ fontWeight: "bold" }}>Name:</Text>
        <Text>{item.name.first}</Text>
      </View>
      <View style={styles.view}>
        <Text style={{ fontWeight: "bold" }}>age:</Text>
        <Text>{item.dob.age}</Text>
      </View>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {JSON.stringify(error)}</Text>;
  }

  return (
    <SafeAreaProvider>
      <FlatList
      numColumns={3}
        data={users}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.login.uuid}
      />
    </SafeAreaProvider>
  );
}