import { useLocalSearchParams } from "expo-router";
import {
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
} from "react-native";
import useCommodityData, {
  transformData,
} from "../../../hooks/useCommodityData";
import DetailsContainer from "../../../components/DetailsContainer";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function DetailsPage() {
  const { commodity, crop } = useLocalSearchParams();
  const { data, loading, error } = useCommodityData();

  if (loading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4caf50" />
      </View>
    );
  if (error)
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  if (!data) throw new Error("Data is required");

  const transformed = transformData(data);
  const selectedCommodity = transformed.find((c) => c.commodity === commodity);
  const selectedCrop = selectedCommodity?.crops.find((cr) => cr.crop === crop);

  return (
    <LinearGradient colors={["#f0f4f8", "#d9e2ec"]} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.header}>
          Details for "{crop}" in "{commodity}"
        </Text>
        <FlatList
          data={selectedCrop?.places || []}
          keyExtractor={(item) => item.place}
          renderItem={({ item }) => (
            <DetailsContainer
              heading={item.place}
              details={`Arrivals: ${item.Arrivals} ${
                item["Unit of Arrivals"]
              }\nVariety: ${item.Variety}\nPrices: Min ₹${
                item["Minimum Prices"] / 100
              }, Max ₹${item["Maximum Prices"] / 100}, Modal ₹${
                item["Modal Prices"] / 100
              }`}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2d3748",
    textAlign: "center",
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#e53e3e",
    fontSize: 16,
    textAlign: "center",
  },
  listContent: {
    paddingVertical: 10,
  },
});
