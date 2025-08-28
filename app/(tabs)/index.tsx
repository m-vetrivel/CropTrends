import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1">
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#211134",
        }}
      >
        {/* <Text className="text-4xl font-bold text-blue-500">🏠 Home Screen</Text> */}
        <View className="absolute  z-50 w-full h-[50px] shrink-0 items-center flex-row px-5 py-3 border-b border-white/10 bg-white/5 rounded-xl shadow-md overflow-hidden">
          <Text className="text-white text-lg font-semibold">Settings</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
