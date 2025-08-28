import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function NewsDetailPage() {
  const { id } = useLocalSearchParams();
  const decodedUrl = decodeURIComponent(id as string);

  return (
    <LinearGradient colors={["#f0f4f8", "#d9e2ec"]} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <WebView
            source={{ uri: decodedUrl }}
            startInLoadingState
            renderLoading={() => (
              <ActivityIndicator
                size="large"
                color="#4CAF50"
                style={styles.loader}
              />
            )}
            style={styles.webView}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  webView: {
    backgroundColor: "transparent",
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -20,
    marginTop: -20,
  },
});
