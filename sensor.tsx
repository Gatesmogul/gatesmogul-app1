import Styles from "@/constants/appStyles";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Sensor() {
  return (
    <SafeAreaProvider>
      <ScrollView style={Styles.container}>
        <View style={Styles.view}>
          <Text style={Styles.heading}>Hello   Profile Page</Text>
          <Text style={Styles.text}>Hello World</Text>
          <Text style={Styles.text}>Hello World</Text>
          <Text style={Styles.heading}>Hello World</Text>
        </View>
         {/* ✅ Correct usage of Link */}
        {/* <Link href="">
          <Text>Go to home Page</Text>
        </Link> */}
      </ScrollView>
    </SafeAreaProvider>
  );
}

       
        