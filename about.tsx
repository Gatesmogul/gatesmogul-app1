import Styles from "@/constants/appStyles";
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function About() {
  return (
    <SafeAreaProvider>
      <ScrollView style={Styles.container}>
        <View style={Styles.view}>
          <Text style={Styles.heading}>Hello About Page</Text>
          <Text style={Styles.text}>Hello World</Text>
          <Text style={Styles.text}>Hello World</Text>
          <Text style={Styles.heading}>Hello World</Text>
        </View>
        <Link href="/">
          <Text>Go to About Page</Text>
        </Link>
      </ScrollView>
    </SafeAreaProvider>
  );
}