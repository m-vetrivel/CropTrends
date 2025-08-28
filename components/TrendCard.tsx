import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Define a type for the crop data
export type Crop = {
  name: string;
  avgModalPrice: number;
  totalArrivals: number;
  regions?: string[];
};

type CropCardProps = {
  crop: Crop;
};

const TrendCard = ({ crop }: CropCardProps) => {
  return (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={["#ffffff", "#f0f4f8"]}
        style={styles.gradientBackground}
      >
        <Text style={styles.cropName}>{crop.name}</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.priceLabel}>Avg Price</Text>
            <Text style={styles.priceValue}>
              ₹{(crop.avgModalPrice / 100).toFixed(2)}/kg
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.arrivalsLabel}>Arrivals</Text>
            <Text style={styles.arrivalsValue}>
              {crop.totalArrivals.toFixed(2)} (t)
            </Text>
          </View>
        </View>
        {crop.regions && crop.regions.length > 0 && (
          <Text style={styles.regionsText}>
            📍 Regions: {crop.regions.slice(0, 3).join(", ")}
            {crop.regions.length > 3 ? "..." : ""}
          </Text>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  gradientBackground: {
    padding: 20,
  },
  cropName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a202c",
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailItem: {
    alignItems: "flex-start",
  },
  priceLabel: {
    fontSize: 14,
    color: "#4caf50",
    fontWeight: "600",
  },
  priceValue: {
    fontSize: 18,
    color: "#2e7d32",
    fontWeight: "bold",
  },
  arrivalsLabel: {
    fontSize: 14,
    color: "#2196f3",
    fontWeight: "600",
  },
  arrivalsValue: {
    fontSize: 18,
    color: "#0d47a1",
    fontWeight: "bold",
  },
  regionsText: {
    fontSize: 13,
    color: "#718096",
    fontStyle: "italic",
    marginTop: 5,
  },
});

export default TrendCard;
