import Styles from "@/constants/appStyles";
import { Button } from "@react-navigation/elements";
import { Link, router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaProvider>
      <ScrollView style={Styles.container}>
        <Link href="/(tabs)/profile">
          <Text>Go to Profile Page</Text>
        </Link>
        <View style={Styles.view}>
          <Text style={Styles.heading}>Hello World</Text>
          <Text style={Styles.text}>Hello World</Text>
          <Text style={Styles.text}>Hello World</Text>
          <Text style={Styles.heading}>Hello World</Text>
        </View>

        <View>
          <Button
            style={{ margin: 20, padding: 10 }}
            onPress={() => {
              router.push({
                pathname: "/(tabs)/profile",
                params: { name: "Donald", age: 36 },
              });
            }}
          >
            Go to Profile
          </Button>
        </View>

        <TouchableOpacity
          style={{
            margin: 20,
            padding: 10,
            backgroundColor: "lightblue",
            alignItems: "center",
          }}
          onPress={() => {
            alert("Touchable Opacity Clicked");
          }}
        >
          <Text>Touchable</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaProvider>
  );
}