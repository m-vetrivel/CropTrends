import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function CropContainer({
  name,
  onPress,
}: {
  name: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.8}
    >
      <LinearGradient colors={["#ffffff", "#f0f4f8"]} style={styles.gradient}>
        <Text numberOfLines={2} style={styles.nameText}>
          {name}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    // Key Change: Use a fixed minHeight instead of relying on flex to manage size
    minHeight: 150,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#2d3748",
  },
});
