import {
  KeyboardAvoidingView,
  Platform,
  Image,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { Tabs } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  SafeAreaInsetsContext,
  SafeAreaView,
} from "react-native-safe-area-context";

export default function TabLayout() {
  return (
    <SafeAreaView className="flex-1">
      <Tabs
        screenOptions={{
          tabBarItemStyle: styles.tabBarItem,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarActiveTintColor: "#4CAF50",
          tabBarInactiveTintColor: "#718096",
          tabBarHideOnKeyboard: true,
          tabBarStyle: styles.tabBar,
          tabBarBackground: () => (
            <LinearGradient
              colors={["#ffffff", "#f0f4f8"]}
              style={styles.gradientBackground}
            />
          ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("../../assets/Home.png")}
                style={{ width: 24, height: 24, tintColor: color }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="news2"
          options={{
            title: "News",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={{ uri: "https://img.icons8.com/color/48/news.png" }}
                style={{ width: 24, height: 24, tintColor: color }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="trending"
          options={{
            title: "Trending",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("../../assets/Symbol.png")}
                style={{ width: 24, height: 24, tintColor: color }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="price"
          options={{
            title: "Price",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={{
                  uri: "https://img.icons8.com/color/48/money-bag.png",
                }}
                style={{ width: 24, height: 24, tintColor: color }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={{
                  uri: "https://img.icons8.com/?size=100&id=xYWd20nBjDVh&format=png&color=000000",
                }}
                style={{ width: 24, height: 24, tintColor: color }}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "transparent",
    borderWidth: 0,
    borderTopWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 5,
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  tabBarItem: {
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
