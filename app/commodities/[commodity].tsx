import { useLocalSearchParams, useRouter } from "expo-router";
import {
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
} from "react-native";
import useCommodityData, { transformData } from "../../hooks/useCommodityData";
import CropContainer from "../../components/CropContainer";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function CropsPage() {
  const { commodity } = useLocalSearchParams();
  const { data, loading, error } = useCommodityData();
  const router = useRouter();

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

  const selected = transformed.find((c) => c.commodity === commodity);

  return (
    <LinearGradient colors={["#f0f4f8", "#d9e2ec"]} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.header}>Crops for "{commodity}"</Text>
        <FlatList
          data={selected?.crops || []}
          keyExtractor={(item) => item.crop}
          renderItem={({ item }) => (
            <CropContainer
              name={item.crop}
              onPress={() =>
                router.push(`/commodities/${commodity}/${item.crop}`)
              }
            />
          )}
          // --- BEGIN 2-COLUMN LAYOUT CHANGES ---
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          // --- END 2-COLUMN LAYOUT CHANGES ---
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
    fontSize: 28,
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
    paddingHorizontal: 8, // Added horizontal padding for better spacing
  },
  // --- BEGIN 2-COLUMN LAYOUT STYLES ---
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
  // --- END 2-COLUMN LAYOUT STYLES ---
});
