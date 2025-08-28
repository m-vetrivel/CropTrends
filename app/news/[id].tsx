import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";

export default function NewsDetail() {
  const { url, title } = useLocalSearchParams<{ url: string; title: string }>();
  const router = useRouter();

  if (!url) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 16, color: "#666" }}>No article found</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={{ fontSize: 16 }}>← Back</Text>
      </TouchableOpacity>

      {/* WebView */}
      <WebView source={{ uri: url }} style={{ flex: 1 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backBtn: {
    padding: 12,
    backgroundColor: "#f2f2f2",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
